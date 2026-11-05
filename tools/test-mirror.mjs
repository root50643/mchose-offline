import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtime = await fs.readFile(path.join(root, 'site/mirror-runtime.js'), 'utf8');
const report = JSON.parse(await fs.readFile(path.join(root, 'reports/mirror-build.json'), 'utf8'));
const ast = parse(runtime, { ecmaVersion: 'latest' });
let data;
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(item => walk(item, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
walk(ast, node => { if (node.type === 'VariableDeclarator' && node.id?.name === 'DATA') data = JSON.parse(runtime.slice(node.init.start, node.init.end)); });
assert.ok(Object.keys(data.map).length > 600);
function harness(base, options = {}) {
  const backings = new WeakMap();
  class Storage {
    getItem(key) { return backings.get(this).get(String(key)) ?? null; }
    setItem(key, value) { backings.get(this).set(String(key), String(value)); }
    removeItem(key) { backings.get(this).delete(String(key)); }
    key(index) { return [...backings.get(this).keys()][index] ?? null; }
    clear() { backings.get(this).clear(); }
    get length() { return backings.get(this).size; }
  }
  const rawLocal = new Storage(), rawSession = new Storage();
  backings.set(rawLocal, new Map([['another-project', 'keep']])); backings.set(rawSession, new Map());
  const calls = { fetch: [], xhr: [], beacon: [], socket: [], open: [] };
  const document = { currentScript: { src: new URL('mirror-runtime.js', base).href } };
  class Xhr { open(...args) { calls.xhr.push(args); } }
  function Socket(...args) { calls.socket.push(args); }
  const navigator = { sendBeacon(...args) { calls.beacon.push(args); } };
  const window = Object.assign(new EventTarget(), {
    localStorage: rawLocal, sessionStorage: rawSession,
    fetch: async (...args) => {
      calls.fetch.push(args);
      if (options.waitForAbort) return new Promise((resolve, reject) => args[1].signal.addEventListener('abort', () => reject(args[1].signal.reason), { once: true }));
      return new Response('real network fixture');
    },
    WebSocket: Socket, EventSource: Socket,
    open(...args) { calls.open.push(args); },
  });
  const original = { socket: window.WebSocket, event: window.EventSource, open: window.open, beacon: navigator.sendBeacon };
  const context = vm.createContext({ window, document, navigator, XMLHttpRequest: Xhr, URL, Request, Response, Storage, EventTarget, Event, AbortController, DOMException, setTimeout: options.setTimeout || setTimeout, clearTimeout: options.clearTimeout || clearTimeout, console });
  vm.runInContext(runtime, context, { timeout: 5000 });
  return { window, navigator, context, calls, original, rawLocal, api: window.__mchoseMirror };
}
let mappings = 0;
for (const base of ['http://127.0.0.1:8765/', 'https://root50643.github.io/mchose-offline/']) {
  const h = harness(base);
  assert.equal(h.api.base, base);
  assert.equal(h.window.__MC_CIZHOU_ROOT_PATH__, new URL('cizhou', base).pathname, 'Shared SDK must honor the GitHub project prefix.');
  for (const [source, local] of Object.entries(data.map)) {
    assert.equal(h.api.assetUrl(source), new URL(local, base).href, source);
    mappings++;
  }
  const sample = Object.entries(data.map).find(([url]) => url.endsWith('global.json'));
  assert.ok(sample, 'Original compressed configuration file is copied.');
  assert.equal(h.api.assetUrl(sample[0] + '?t=123#value'), new URL(sample[1], base).href + '?t=123#value');
  const driver = 'https://cdn.mchose.com.cn/customPage/driver-ui/driver-ui.global.js';
  assert.equal(h.api.assetUrl(driver + '?hash=new-unknown-version'), new URL('_mirror_missing/driver-ui/new-unknown-version/driver-ui.global.js?hash=new-unknown-version', base).href);
  assert.equal(h.api.assetUrl(driver + '?hash=' + data.driverUiVersion), new URL(data.map[driver], base).href + '?hash=' + data.driverUiVersion);
  const backend = [
    'https://www.maicong.cn/mchose/official?name=A7V3Ultra%2B',
    'https://www.maicong.cn/mchose/cloud/search',
    'https://serverapi.maicong.cn/user/info',
    'https://chat.maicong.cn/register/client/node',
  ];
  for (const url of backend) {
    assert.equal(h.api.assetUrl(url), url);
    const result = await h.window.fetch(url, { method: 'POST', body: 'factory-payload' });
    assert.equal(await result.text(), 'real network fixture');
    assert.equal(h.calls.fetch.at(-1)[0], url);
    assert.equal(h.calls.fetch.at(-1)[1].body, 'factory-payload');
  }
  const missing = 'https://cdn.mchose.com.cn/unknown-new-model.bin';
  assert.equal(h.api.assetUrl(missing), new URL('vendor/cdn.mchose.com.cn/unknown-new-model.bin', base).href);
  await h.window.fetch(missing);
  assert.equal(h.calls.fetch.at(-1)[0], new URL('vendor/cdn.mchose.com.cn/unknown-new-model.bin', base).href, 'Uncaptured static assets must not silently return to the manufacturer CDN.');
  for (const filename of ['keyboardConfig', 'keyboardPreset']) {
    const source = `https://cdn.mchose.com.cn/configCenter/custom/${filename}.json`;
    assert.ok(data.map[source], 'Required shared SDK configuration must be captured: ' + source);
    await h.window.fetch(source);
    assert.equal(h.calls.fetch.at(-1)[0], new URL(data.map[source], base).href);
  }
  const request = new Request(sample[0], { method: 'HEAD', headers: { 'X-Test': 'preserve' } });
  await h.window.fetch(request);
  assert.equal(h.calls.fetch.at(-1)[0].url, new URL(sample[1], base).href);
  assert.equal(h.calls.fetch.at(-1)[0].method, 'HEAD');
  assert.equal(h.calls.fetch.at(-1)[0].headers.get('X-Test'), 'preserve');
  const xhr = new h.context.XMLHttpRequest(); xhr.open('GET', sample[0], true);
  assert.equal(h.calls.xhr.at(-1)[1], new URL(sample[1], base).href);
  await h.window.fetch(sample[0], { method: 'POST', body: 'write-passthrough' });
  assert.equal(h.calls.fetch.at(-1)[0], sample[0]);
  xhr.open('POST', sample[0], true);
  assert.equal(h.calls.xhr.at(-1)[1], sample[0]);
  assert.equal(h.window.WebSocket, h.original.socket);
  assert.equal(h.window.EventSource, h.original.event);
  assert.equal(h.window.open, h.original.open);
  assert.equal(h.navigator.sendBeacon, h.original.beacon);
  assert.equal(h.api.customAppUrl('gmouse', '/gmouse'), new URL(data.subapps.gmouse, base).href);
  assert.equal(h.api.customAppUrl('g7max', '/g7max'), new URL(data.subapps.g7max, base).href);
  assert.equal(h.api.assetUrl('data:image/png;base64,AA=='), 'data:image/png;base64,AA==');
  h.window.localStorage.setItem('webdriver-auth', 'factory-session');
  assert.equal(h.window.localStorage.getItem('webdriver-auth'), 'factory-session', 'Mirror must preserve login data.');
  h.context.Storage.prototype.setItem.call(h.window.localStorage, 'mouse', 'saved-settings');
  assert.equal(h.window.localStorage.mouse, 'saved-settings');
  assert.equal(h.rawLocal.getItem('another-project'), 'keep');
  h.window.localStorage.clear();
  assert.equal(h.rawLocal.getItem('another-project'), 'keep', 'Project clear must not erase other Pages applications.');
}
const mainPath = 'assets/main-DnvOpr5S.js';
const upstream = await fs.readFile(path.join(root, 'upstream/www.mchose.com.cn', mainPath), 'utf8');
const output = await fs.readFile(path.join(root, 'site', mainPath), 'utf8');
const functions = text => {
  const found = new Map(); walk(parse(text, { ecmaVersion: 'latest', sourceType: 'module' }), node => {
    if (node.type === 'FunctionDeclaration' && node.id) found.set(node.id.name, text.slice(node.body.start, node.body.end));
  }); return found;
};
const before = functions(upstream), after = functions(output);
for (const name of ['trackInit', '_track', 'getAuthToken', 'getAuthUser', 'getUserData']) {
  assert.ok(before.has(name), `Factory function exists: ${name}`);
  assert.equal(after.get(name), before.get(name), `Factory behavior preserved: ${name}`);
}
assert.equal(after.get('getCurrentApiConfig'), '{return API_CONFIGS.production;}');
assert.ok(!output.includes('window.__mchoseOffline'));
assert.ok(!output.includes('offline-hid-diagnostics'));
assert.ok(!/\b(?:return|throw|case|typeof|void)window\b/.test(output), 'Resource expressions must preserve minified keyword boundaries.');
assert.ok(!/\.keyboard\s*=\s*\[\]/.test(output));
const html = await fs.readFile(path.join(root, 'site/index.html'), 'utf8');
assert.ok(html.includes('<title>M HUB 迈从科技 官方驱动</title>'));
assert.ok(!/非官方|離線|离线|offline-shell|diagnostics|Content-Security-Policy/.test(html));
assert.ok(!html.includes('document.write'));
assert.equal(report.precache, false);
assert.equal(report.behaviorPatches.length, 3);
console.log(`PASS mirror: ${mappings} static URL mappings, live API passthrough, original auth/tracking, scoped settings, factory title, subpath device apps; no precache UI.`);
