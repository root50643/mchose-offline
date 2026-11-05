import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const tools = path.dirname(fileURLToPath(import.meta.url));
const auditSource = await fs.readFile(path.join(tools, 'qa-network-audit.js'), 'utf8');
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'mchose-qa-audit-'));
const html = '<!doctype html><html><head><script src="./runtime.js"></script></head><body><div id="app">Factory</div></body></html>';
await fs.writeFile(path.join(temporary, 'index.html'), html);
await fs.writeFile(path.join(temporary, 'runtime.js'), 'window.factory=true;');
async function port() {
  const server = net.createServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const value = server.address().port; await new Promise(resolve => server.close(resolve)); return value;
}
async function serve(audit, prefix, run) {
  const number = await port();
  const child = spawn(process.execPath, [path.join(tools, 'dev-server.mjs'), '--root', temporary, '--port', String(number), ...(prefix ? ['--prefix', prefix] : []), ...(audit ? ['--audit'] : [])], { windowsHide: true });
  try {
    await new Promise((resolve, reject) => {
      let output = ''; const timer = setTimeout(() => reject(new Error('Server timeout: ' + output)), 10000);
      child.stdout.on('data', chunk => { output += chunk; if (output.includes('Local:')) { clearTimeout(timer); resolve(); } });
      child.stderr.on('data', chunk => { output += chunk; });
      child.once('error', reject); child.once('exit', code => { clearTimeout(timer); reject(new Error('Server exited: ' + code)); });
    });
    await run(`http://127.0.0.1:${number}${prefix}/`);
  } finally {
    child.kill(); await new Promise(resolve => { const timer = setTimeout(resolve, 1000); child.once('close', () => { clearTimeout(timer); resolve(); }); if (child.exitCode !== null) { clearTimeout(timer); resolve(); } });
  }
}
try {
  await serve(false, '', async base => {
    const response = await fetch(base);
    assert.equal(await response.text(), html);
    assert.equal(response.headers.get('content-security-policy'), null);
    assert.equal((await fetch(base + '__qa-network-audit.js')).status, 404);
  });
  for (const prefix of ['', '/mchose-offline']) await serve(true, prefix, async base => {
    const response = await fetch(base);
    const body = await response.text();
    assert.ok(body.indexOf('__qa-network-audit.js') < body.indexOf('./runtime.js'));
    assert.ok(body.includes(`src="${prefix}/__qa-network-audit.js"`));
    assert.ok(body.includes('id="mchose-network-audit"'));
    assert.equal(body.slice(body.indexOf('<body>')), html.slice(html.indexOf('<body>')), 'Audit injection must not change the React/Next body.');
    assert.equal(Number(response.headers.get('content-length')), Buffer.byteLength(body));
    const policy = response.headers.get('content-security-policy');
    assert.match(policy, /script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:/);
    assert.match(policy, /connect-src 'self' https: wss:/);
    for (const type of ['img', 'font', 'media']) assert.ok(policy.includes(type + "-src 'self' data: blob:"));
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const script = await fetch(base + '__qa-network-audit.js');
    assert.equal(script.status, 200); assert.equal(await script.text(), auditSource);
    assert.equal(await (await fetch(base + 'runtime.js')).text(), 'window.factory=true;');
    assert.equal(Number((await fetch(base, { method: 'HEAD' })).headers.get('content-length')), Buffer.byteLength(body));
  });
  console.log('PASS QA server: opt-in only, root/prefix injection before runtime, tools-only route, correct lengths and audit-only CSP');

  const base = 'http://127.0.0.1:8765/mchose-offline/';
  const elements = new Map(), listeners = new Map(), intervals = [], observers = [];
  const calls = { fetch: [], xhr: [] }; let now = 0;
  const attributes = new Map();
  const auditElement = { id: 'mchose-network-audit', src: base + '__qa-network-audit.js', setAttribute(name, value) { attributes.set(name, value); }, getAttribute(name) { return attributes.get(name) ?? null; } };
  elements.set('mchose-network-audit', auditElement);
  const document = {
    currentScript: auditElement, readyState: 'complete',
    getElementById: id => elements.get(id), createElement() { throw new Error('Audit reporter must not create DOM nodes.'); },
    body: { append() { throw new Error('Audit reporter must not change the body.'); } }, addEventListener() {},
  };
  class Xhr {
    open(...args) { calls.xhr.push(args); this.url = args[1]; }
    addEventListener(type, callback) { this.callback = callback; }
    send() { this.status = this.url.includes('missing') ? 404 : 200; this.statusText = 'Fixture'; this.callback(); }
  }
  class Observer { constructor(callback) { observers.push(callback); } observe() {} }
  const window = {
    fetch: async (...args) => { calls.fetch.push(args); const url = String(args[0]); return new Response('unchanged response', { status: url.includes('missing') ? 404 : 200 }); },
    addEventListener(type, callback) { const values = listeners.get(type) || []; values.push(callback); listeners.set(type, values); },
  };
  window.parent = window;
  vm.runInNewContext(auditSource, {
    window, document, location: new URL(base), URL, Request, Response, DOMException, XMLHttpRequest: Xhr, PerformanceObserver: Observer,
    performance: { now: () => now, getEntriesByType: () => [{ name: base + 'runtime.js', startTime: 0, duration: 1, initiatorType: 'script', responseStatus: 200 }] },
    setInterval(callback) { intervals.push(callback); return intervals.length; },
  });
  const snapshot = () => { intervals.forEach(callback => callback()); return JSON.parse(elements.get('mchose-network-audit').getAttribute('data-report')); };
  assert.equal(snapshot().staticExternalAttempts, 0);
  const options = { method: 'GET', headers: { 'X-Test': 'preserve' } };
  assert.equal(await (await window.fetch(base + 'runtime.js', options)).text(), 'unchanged response');
  assert.equal(calls.fetch[0][1], options);
  await assert.rejects(window.fetch('https://cdn.mchose.com.cn/configCenter/custom/keyboardConfig.json'), /blocked external static/);
  assert.equal(calls.fetch.length, 1);
  const xhr = new Xhr(); assert.throws(() => xhr.open('GET', 'https://www.mchose.com.cn/assets/app.js'), /blocked external static/);
  assert.equal(calls.xhr.length, 0);
  await window.fetch('https://www.maicong.cn/mchose/official?name=A7');
  await window.fetch('https://cdn.mchose.com.cn/software/MCHOSE_HUB_installer.exe');
  await window.fetch('https://mchose-bbs.oss-cn-shenzhen.aliyuncs.com/user-upload.png');
  assert.ok(snapshot().apiOrigins.includes('https://www.maicong.cn'));
  const beforeIgnoredCsp = snapshot().staticExternalAttempts;
  for (const callback of listeners.get('securitypolicyviolation')) callback({ blockedURI: 'https://www.maicong.cn/app-api/member/user/get', effectiveDirective: 'connect-src' });
  for (const callback of listeners.get('securitypolicyviolation')) callback({ blockedURI: 'https://www.maicong.cn', effectiveDirective: 'frame-src' });
  assert.equal(snapshot().staticExternalAttempts, beforeIgnoredCsp, 'Manufacturer API events are not static failures.');
  for (const callback of listeners.get('securitypolicyviolation')) callback({ blockedURI: 'https://cdn.mchose.com.cn/font.woff2', effectiveDirective: 'font-src' });
  for (const callback of listeners.get('securitypolicyviolation')) callback({ blockedURI: 'https://cdn.mchose.com.cn', effectiveDirective: 'font-src' });
  observers[0]({ getEntries: () => [{ name: 'https://cdn.mchose.com.cn/image.png', startTime: 5, duration: 2, initiatorType: 'img', responseStatus: 200 }] });
  await window.fetch(base + 'missing.png');
  const missingXhr = new Xhr(); missingXhr.open('GET', base + 'missing.json'); missingXhr.send();
  now = 65000;
  const result = snapshot();
  assert.equal(result.elapsed, 65); assert.equal(result.staticExternalAttempts, 5);
  assert.ok(result.failures.some(item => item.channel === 'fetch' && item.status === 404));
  assert.ok(result.failures.some(item => item.channel === 'xhr' && item.status === 404));
  assert.equal(result.resources.total, 2); assert.equal(result.resources.local, 1); assert.equal(result.resources.externalStatic, 1);
  for (const callback of listeners.get('message')) callback({ origin: new URL(base).origin, source: {}, data: { __mchoseQaNetworkAudit: 1, scope: '/mchose-offline/', data: { attempts: [{ url: 'https://cdn.mchose.com.cn/frame.png', channels: ['resource'] }], failures: [], apiOrigins: ['https://chat.maicong.cn'], resources: { total: 1, local: 0, externalStatic: 1, otherExternal: 0, byType: { img: 1 } } } } });
  assert.equal(snapshot().staticExternalAttempts, 6); assert.ok(snapshot().apiOrigins.includes('https://chat.maicong.cn'));
  console.log('PASS QA script: real transport preserved, static fetch/XHR blocked, local failures/CSP/resources/frame summaries recorded, APIs/installers/user content excluded');
} finally {
  const target = path.resolve(temporary), safeParent = path.resolve(os.tmpdir()) + path.sep;
  if (!target.startsWith(safeParent) || !path.basename(target).startsWith('mchose-qa-audit-')) throw new Error('Refusing cleanup outside this QA fixture.');
  await fs.rm(target, { recursive: true, force: true });
}
