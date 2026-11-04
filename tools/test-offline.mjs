import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { webcrypto } from 'node:crypto';
import vm from 'node:vm';

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'mchose-offline-test-'));
const fixture = path.join(temporaryRoot, 'site');
await mkdir(path.join(fixture, 'assets'), { recursive: true });
const bodies = new Map([
  ['index.html', Buffer.from('<!doctype html><title>Offline fixture</title>')],
  ['assets/app.js', Buffer.from('window.fixture = true;')],
  ['assets/font.woff2', Buffer.from([0x77, 0x4f, 0x46, 0x32])],
  ['assets/device.bin', Buffer.from([0, 255, 127, 13, 10])],
  ['assets/module.wasm', Buffer.from([0, 97, 115, 109])],
  ['assets/manual.pdf', Buffer.from('%PDF-1.7\nOffline fixture\n%%EOF')],
  ['assets/name with spaces.txt', Buffer.from('space')],
]);
for (const [name, bytes] of bodies) await writeFile(path.join(fixture, name), bytes);

function command(commandName, arguments_) {
  return new Promise(resolve => {
    const child = spawn(commandName, arguments_, { windowsHide: true });
    let stdout = '', stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', error => resolve({ code: -1, stdout, stderr: error.message }));
    child.on('close', code => resolve({ code, stdout, stderr }));
  });
}
async function build(check = false) {
  const result = await command(process.execPath, [path.join(toolsDirectory, 'build-offline.mjs'), '--site', fixture, ...(check ? ['--check'] : [])]);
  return result;
}
async function freePort() {
  const server = net.createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
function request(port, requestPath, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path: requestPath, method, timeout: 5000 }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', reject); req.on('timeout', () => req.destroy(new Error('HTTP request timed out'))); req.end();
  });
}
async function withServer(commandName, arguments_, readyText, test) {
  const child = spawn(commandName, arguments_, { windowsHide: true });
  let output = '';
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server did not become ready: ' + output)), 12000);
      child.stdout.on('data', chunk => { output += chunk; if (output.includes(readyText)) { clearTimeout(timer); resolve(); } });
      child.stderr.on('data', chunk => { output += chunk; });
      child.on('error', reject);
      child.on('exit', code => { clearTimeout(timer); reject(new Error(`Server exited (${code}): ${output}`)); });
    });
    await test();
  } finally {
    child.kill();
    await new Promise(resolve => { if (child.exitCode !== null) resolve(); else { child.on('close', resolve); setTimeout(resolve, 3000); } });
  }
}
function workerHarness(workerText, failPath = '', corruptPath = '') {
  const scope = 'https://example.test/mchose-offline/';
  const ownPrefix = 'mchose-offline:' + encodeURIComponent(scope) + ':';
  const stores = new Map([
    ['unrelated-app-cache', new Map()],
    ['mchose-offline:' + encodeURIComponent('https://example.test/another/') + ':old', new Map()],
    [ownPrefix + 'old', new Map()],
  ]);
  const cacheStorage = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async match(url) { return store.get(String(url))?.clone(); },
        async put(url, response) { store.set(String(url), response.clone()); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
  };
  const messages = [];
  const unrelatedMessages = [];
  const handlers = new Map();
  let networkRequests = 0;
  let skips = 0;
  const self = {
    registration: { scope, active: null }, location: { origin: 'https://example.test' },
    addEventListener(type, callback) { handlers.set(type, callback); },
    async skipWaiting() { skips++; },
    clients: {
      async matchAll() { return [{ url: scope, postMessage: message => messages.push(message) }, { url: 'https://example.test/another/', postMessage: message => unrelatedMessages.push(message) }]; },
      async claim() {},
    },
  };
  const context = vm.createContext({ self, caches: cacheStorage, URL, Response, Request, crypto: webcrypto, Date, console,
    async fetch(url) {
      networkRequests++;
      const relative = decodeURIComponent(String(url).slice(scope.length));
      if (relative === failPath) return new Response('missing', { status: 503 });
      if (relative === corruptPath) return new Response('corrupted bytes');
      assert.ok(bodies.has(relative), 'Worker fetched an undeclared file: ' + relative);
      return new Response(bodies.get(relative));
    },
  });
  vm.runInContext(workerText, context, { filename: 'generated-sw.js' });
  async function dispatch(type, extras = {}) {
    const tasks = [];
    let response;
    handlers.get(type)({ ...extras, waitUntil(promise) { tasks.push(promise); }, respondWith(promise) { response = promise; } });
    await Promise.all(tasks);
    return response ? await response : undefined;
  }
  return { scope, ownPrefix, stores, messages, unrelatedMessages, self, dispatch, requests: () => networkRequests, skips: () => skips };
}

try {
  let result = await build();
  assert.equal(result.code, 0, result.stderr);
  let manifest = JSON.parse(await readFile(path.join(fixture, 'offline-manifest.json'), 'utf8'));
  assert.equal(manifest.fileCount, bodies.size);
  assert.equal(manifest.totalBytes, [...bodies.values()].reduce((sum, bytes) => sum + bytes.length, 0));
  assert.equal((await build(true)).code, 0);
  const originalVersion = manifest.version;
  bodies.set('assets/app.js', Buffer.from('window.fixture = "changed";'));
  await writeFile(path.join(fixture, 'assets/app.js'), bodies.get('assets/app.js'));
  assert.notEqual((await build(true)).code, 0, 'Stale manifests must fail --check.');
  assert.equal((await build()).code, 0);
  manifest = JSON.parse(await readFile(path.join(fixture, 'offline-manifest.json'), 'utf8'));
  assert.notEqual(manifest.version, originalVersion);
  const workerText = await readFile(path.join(fixture, 'sw.js'), 'utf8');

  const worker = workerHarness(workerText);
  await worker.dispatch('install');
  assert.equal(worker.skips(), 1);
  assert.ok(worker.messages.some(message => message.type === 'MCHOSE_OFFLINE_READY'));
  assert.equal(worker.unrelatedMessages.length, 0, 'Other application scopes must not receive status messages.');
  await worker.dispatch('activate');
  assert.ok(worker.stores.has('unrelated-app-cache'));
  assert.ok(worker.stores.has('mchose-offline:' + encodeURIComponent('https://example.test/another/') + ':old'));
  assert.ok(!worker.stores.has(worker.ownPrefix + 'old'), 'Only this scope old cache should be removed.');
  const requestsBeforeOffline = worker.requests();
  const binary = await worker.dispatch('fetch', { request: new Request(worker.scope + 'assets/device.bin?hash=snapshot') });
  assert.deepEqual(Buffer.from(await binary.arrayBuffer()), bodies.get('assets/device.bin'));
  const head = await worker.dispatch('fetch', { request: new Request(worker.scope + 'assets/device.bin', { method: 'HEAD' }) });
  assert.equal(head.status, 200);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
  const navigation = await worker.dispatch('fetch', { request: { url: worker.scope + 'settings', mode: 'navigate', method: 'GET' } });
  assert.equal(await navigation.text(), bodies.get('index.html').toString());
  const manual = await worker.dispatch('fetch', { request: { url: worker.scope + 'assets/manual.pdf', mode: 'navigate', method: 'GET' } });
  assert.deepEqual(Buffer.from(await manual.arrayBuffer()), bodies.get('assets/manual.pdf'), 'A cached PDF must keep its binary response.');
  for (const filename of ['missing.pdf', 'missing.bin', 'missing.other', 'missing%2Epdf']) {
    const unavailable = await worker.dispatch('fetch', { request: { url: worker.scope + filename, mode: 'navigate', method: 'GET' } });
    assert.equal(unavailable.status, 404, 'Unlisted document/asset navigation must not fall back to the application: ' + filename);
    assert.ok(!(await unavailable.text()).includes('<!doctype html>'));
  }
  const post = await worker.dispatch('fetch', { request: new Request(worker.scope + 'api', { method: 'POST' }) });
  assert.equal(post.status, 405);
  const missing = await worker.dispatch('fetch', { request: new Request(worker.scope + 'missing.json') });
  assert.equal(missing.status, 404);
  const external = await worker.dispatch('fetch', { request: new Request('https://external.test/tracker.js') });
  assert.equal(external.type, 'error');
  assert.equal(worker.requests(), requestsBeforeOffline, 'Cached or blocked requests must not access the network.');
  const ownCache = worker.stores.get(worker.ownPrefix + manifest.version);
  ownCache.delete(worker.scope + 'assets/device.bin');
  let currentStatus;
  await worker.dispatch('message', { data: { type: 'MCHOSE_OFFLINE_GET_STATUS' }, source: { url: worker.scope, postMessage: value => { currentStatus = value; } } });
  assert.equal(currentStatus.ready, false, 'Missing file must clear offline readiness.');
  await worker.dispatch('message', { data: { type: 'MCHOSE_OFFLINE_REPAIR' }, source: { url: worker.scope, postMessage() {} } });
  assert.ok(ownCache.has(worker.scope + 'assets/device.bin'));
  const failedWorker = workerHarness(workerText, 'assets/device.bin');
  await assert.rejects(failedWorker.dispatch('install'));
  assert.ok(!failedWorker.messages.some(message => message.type === 'MCHOSE_OFFLINE_READY'), 'A partial cache must never become ready.');
  assert.ok(!failedWorker.stores.has(failedWorker.ownPrefix + manifest.version));
  assert.ok(failedWorker.stores.has(failedWorker.ownPrefix + 'old'), 'Failed install must preserve the previous version.');
  const corruptWorker = workerHarness(workerText, '', 'assets/device.bin');
  await assert.rejects(corruptWorker.dispatch('install'), /integrity mismatch/);
  assert.ok(!corruptWorker.messages.some(message => message.type === 'MCHOSE_OFFLINE_READY'));
  console.log('PASS build manifest, stale detection, integrity, SW cache readiness/repair/failure, scope isolation, zero-network fetch');

  const nodePort = await freePort();
  await withServer(process.execPath, [path.join(toolsDirectory, 'dev-server.mjs'), '--root', fixture, '--port', String(nodePort), '--prefix', '/mchose-offline'], 'Local:', async () => {
    assert.equal((await request(nodePort, '/mchose-offline/')).status, 200);
    assert.equal((await request(nodePort, '/mchose-offline')).status, 308);
    assert.equal((await request(nodePort, '/index.html')).status, 404);
    assert.equal((await request(nodePort, '/mchose-offline/%2e%2e/%2e%2e/secret')).status, 403);
    assert.equal((await request(nodePort, '/mchose-offline/assets/%5csecret')).status, 400);
    assert.equal((await request(nodePort, '/mchose-offline/assets/name%20with%20spaces.txt')).body.toString(), 'space');
    assert.equal((await request(nodePort, '/mchose-offline/assets/font.woff2', 'HEAD')).headers['content-type'], 'font/woff2');
    assert.equal((await request(nodePort, '/mchose-offline/assets/module.wasm')).headers['content-type'], 'application/wasm');
    assert.equal((await request(nodePort, '/mchose-offline/assets/manual.pdf')).headers['content-type'], 'application/pdf');
    assert.deepEqual((await request(nodePort, '/mchose-offline/assets/device.bin')).body, bodies.get('assets/device.bin'));
  });
  console.log('PASS Node server prefix, MIME, encoded paths, path traversal rejection, binary responses');

  if (process.platform === 'win32') {
    const psPort = await freePort();
    await withServer('powershell.exe', ['-NoLogo', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(toolsDirectory, 'serve.ps1'), '-SiteDirectory', fixture, '-Port', String(psPort), '-NoBrowser'], 'MCHOSE offline server:', async () => {
      assert.equal((await request(psPort, '/')).status, 200);
      assert.equal((await request(psPort, '/%2e%2e/secret')).status, 403);
      assert.equal((await request(psPort, '/assets/%5csecret')).status, 400);
      assert.equal((await request(psPort, '/assets/name%20with%20spaces.txt')).body.toString(), 'space');
      assert.equal((await request(psPort, '/assets/font.woff2', 'HEAD')).headers['content-type'], 'font/woff2');
      assert.equal((await request(psPort, '/assets/module.wasm')).headers['content-type'], 'application/wasm');
      assert.equal((await request(psPort, '/assets/manual.pdf')).headers['content-type'], 'application/pdf');
      assert.deepEqual((await request(psPort, '/assets/device.bin')).body, bodies.get('assets/device.bin'));
    });
    console.log('PASS Windows PowerShell loopback server root, MIME, traversal rejection, binary responses');
  }
} finally {
  const safeParent = path.resolve(os.tmpdir()) + path.sep;
  const safeTarget = path.resolve(temporaryRoot);
  if (!safeTarget.startsWith(safeParent) || !path.basename(safeTarget).startsWith('mchose-offline-test-')) throw new Error('Refusing cleanup outside this test temporary directory.');
  await rm(safeTarget, { recursive: true, force: true });
}
