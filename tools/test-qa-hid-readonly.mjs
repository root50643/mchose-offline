import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import net from 'node:net';
import vm from 'node:vm';
import { spawn } from 'node:child_process';
import { parse } from './vendor/acorn.mjs';

const tools = import.meta.dirname;
const source = await fs.readFile(path.join(tools, 'qa-hid-readonly.js'), 'utf8');
const forbidden = new Set(['sendReport', 'sendFeatureReport', 'requestDevice', 'setDpiInfo', 'setMouseAllInfo', 'mcSetCommand', 'setTemplateIndex', 'fetch', 'XMLHttpRequest', 'WebSocket', 'eval', 'Function']);
function walk(node, visit) {
  if (!node?.type) return;
  visit(node);
  for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(child => walk(child, visit));
  else if (value?.type) walk(value, visit);
}
walk(parse(source, { ecmaVersion: 'latest' }), node => {
  if (['CallExpression', 'NewExpression'].includes(node.type)) assert.ok(!forbidden.has(node.callee.name ?? node.callee.property?.name), 'The QA hook may only call the existing factory read function; no mutation or remote transport API.');
});

function harness({ hostname = '127.0.0.1', ready = true } = {}) {
  const nodes = [], domListeners = new Map(), timers = new Map();
  let clock = 0, timerId = 0, reads = 0;
  class Element {
    constructor(tag) { this.localName = tag; this.style = {}; this.handlers = new Map(); this.disabled = false; nodes.push(this); }
    append() {}
    addEventListener(name, callback) { this.handlers.set(name, callback); }
    getAttribute(name) { return name === 'value' ? '0' : null; }
    querySelector() { return null; }
    getClientRects() { return [{}]; }
  }
  const shownInput = new Element('du-input'); shownInput.value = 0;
  shownInput.shadowRoot = { querySelector: () => ({ value: '400' }) };
  const hiddenInput = new Element('du-input'); hiddenInput.value = 0; hiddenInput.getClientRects = () => [];
  const document = {
    body: ready ? new Element('body') : null,
    getElementById: id => nodes.find(node => node.id === id),
    createElement: tag => new Element(tag),
    querySelectorAll: () => [shownInput, hiddenInput],
    addEventListener: (name, callback) => domListeners.set(name, callback),
  };
  class Device extends EventTarget {
    constructor() { super(); this.vendorId = 0x3837; this.productId = 0x1018; this.productName = 'MCHOSE A7 V3 Ultra+'; this.opened = true; this.inputListeners = new Set(); }
    addEventListener(name, callback, options) { if (name === 'inputreport') this.inputListeners.add(callback); super.addEventListener(name, callback, options); }
    removeEventListener(name, callback, options) { if (name === 'inputreport') this.inputListeners.delete(callback); super.removeEventListener(name, callback, options); }
    sendReport() { throw new Error('QA must not call a native device command.'); }
  }
  const device = new Device(), dpi = [400, 800, 1600, 3200, 6400, 50000];
  const snapshot = { profileIndex: 0, usbDpiIndex: 2, dpiSum: 6, dpiDirection: 0, dpiHasY: 0, ...Object.fromEntries(dpi.map((value, index) => ['dpi' + index, value])) };
  const cache = JSON.stringify({ 'MCHOSE A7 V3 Ultra+': { templateIndex: 0, templateList: [snapshot] } });
  const window = { location: { hostname }, getComputedStyle: () => ({ visibility: 'visible' }),
    localStorage: { getItem(name) { assert.equal(name, 'mouse'); return cache; } },
    readMouseAllInfo: async () => { reads++; emit(0x0002, [0, 2, 0, 0, 0]); emit(0x0003, [0, 0, 6, 2, 0, ...dpi.flatMap(value => [value & 255, value >> 8])]); return snapshot; },
  };
  function emit(command, payload, { byteOffset = 4, short = false } = {}) {
    const buffer = new Uint8Array(byteOffset + 64);
    buffer[byteOffset + 3] = command & 255; buffer[byteOffset + 4] = command >> 8;
    buffer.set(payload, byteOffset + 7);
    const event = new Event('inputreport');
    Object.assign(event, { reportId: 77, data: new DataView(buffer.buffer, byteOffset, short ? 6 : 64) });
    device.dispatchEvent(event);
  }
  const context = vm.createContext({ window, document, navigator: { device }, console, performance: { now: () => clock },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout(id) { timers.delete(id); } });
  const load = () => vm.runInContext(source, context);
  load();
  const button = () => document.getElementById('qa-hid-readonly-run');
  const result = () => JSON.parse(document.getElementById('qa-hid-readonly-result').textContent);
  return { window, document, device, nodes, domListeners, timers, emit, load, button, result, get reads() { return reads; },
    reader(fn) { window.readMouseAllInfo = async () => { reads++; return fn(); }; },
    tick() { clock = 12000; for (const timer of timers.values()) timer.callback(); }, snapshot };
}

const h = harness();
assert.equal(h.reads, 0); assert.equal(h.device.inputListeners.size, 0, 'Loading must not touch the device.');
h.load(); assert.equal(h.nodes.filter(node => node.id === 'qa-hid-readonly').length, 1, 'Repeated inclusion must not duplicate the QA panel.');
await h.button().handlers.get('click')();
let result = h.result();
assert.equal(h.reads, 1); assert.equal(result.status, 'completed'); assert.equal(result.dpiValuesValid, true); assert.equal(result.hardwareWritesRequested, false);
assert.equal(result.frames.length, 2); assert.equal(result.frames[1].decodedUsingFactoryOffsets.dpi5, 50000);
assert.equal(result.frames[1].dataByteOffset, 4); assert.equal(result.frames[1].dataByteLength, 64);
assert.equal(result.uiBefore[0].value, 0); assert.equal(result.uiBefore[0].attribute, '0');
assert.equal(h.device.inputListeners.size, 0); assert.equal(h.timers.size, 0);
for (const property of ['productId', 'vendorId', 'productName']) {
  const original = h.device[property]; h.device[property] = property === 'productName' ? 'Other mouse' : 0;
  await h.button().handlers.get('click')(); assert.equal(h.result().status, 'refused'); assert.equal(h.reads, 1);
  h.device[property] = original;
}
const originalReader = h.window.readMouseAllInfo; h.window.readMouseAllInfo = undefined;
await h.button().handlers.get('click')(); assert.equal(h.result().status, 'refused'); assert.equal(h.reads, 1); h.window.readMouseAllInfo = originalReader;
h.reader(() => { throw new Error('Fixture read failed.'); });
await h.button().handlers.get('click')(); assert.equal(h.result().status, 'error'); assert.equal(h.device.inputListeners.size, 0); assert.equal(h.button().disabled, false);
let finish;
h.reader(() => new Promise(resolve => { finish = resolve; }));
const pending = h.button().handlers.get('click')(); assert.equal(h.button().disabled, true);
const readCount = h.reads; await h.button().handlers.get('click')(); assert.equal(h.reads, readCount, 'Do not enqueue repeated reads while the factory promise is pending.');
h.tick(); assert.equal(h.result().status, 'still-awaiting-factory-read'); assert.equal(h.button().disabled, true); assert.equal(h.reads, readCount, 'Timeout reporting must not retry.');
h.emit(0x0003, [255, 0, 0, 0, 0, ...Array(12).fill(0)]);
h.emit(0x0002, [0], { short: true }); h.emit(0x0103, Array(17).fill(0));
finish(h.snapshot); await pending;
assert.equal(h.result().ffResponses, 1); assert.equal(h.result().frames.length, 1); assert.equal(h.device.inputListeners.size, 0); assert.equal(h.timers.size, 0);
const remote = harness({ hostname: 'root50643.github.io' }); assert.equal(remote.button(), undefined); assert.equal(remote.reads, 0); assert.equal(remote.device.inputListeners.size, 0);
const loading = harness({ ready: false }); assert.equal(loading.button(), undefined); assert.equal(loading.reads, 0);
loading.document.body = { append() {} }; loading.domListeners.get('DOMContentLoaded')(); assert.ok(loading.button()); assert.equal(loading.reads, 0);
console.log('PASS read-only QA hook: no automatic I/O, exact hardware gate, native mutation/remote API denylist, packet offsets, cleanup, and no timeout retries.');

const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'mchose-hid-readonly-qa-'));
const html = '<!doctype html><html><head><script src="./factory.js"></script></head><body><div id="app">Factory</div></body></html>';
await fs.writeFile(path.join(temporary, 'index.html'), html);
await fs.mkdir(path.join(temporary, 'gmouse'));
await fs.writeFile(path.join(temporary, 'gmouse/index.html'), html);
async function freePort() {
  const server = net.createServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const value = server.address().port; await new Promise(resolve => server.close(resolve)); return value;
}
async function serverCase(flags, prefix = '') {
  const port = await freePort();
  const child = spawn(process.execPath, [path.join(tools, 'dev-server.mjs'), '--root', temporary, '--port', String(port), ...(prefix ? ['--prefix', prefix] : []), ...flags], { windowsHide: true });
  try {
    await new Promise((resolve, reject) => {
      let output = ''; const timer = setTimeout(() => reject(new Error('QA server startup timeout: ' + output)), 10000);
      child.stdout.on('data', chunk => { output += chunk; if (output.includes(`http://127.0.0.1:${port}`)) { clearTimeout(timer); resolve(); } });
      child.stderr.on('data', chunk => { output += chunk; });
      child.once('error', reject); child.once('exit', code => { clearTimeout(timer); reject(new Error('QA server exited: ' + code)); });
    });
    const base = `http://127.0.0.1:${port}${prefix}/`, enabled = flags.includes('--audit') && flags.includes('--hid-readonly');
    const response = await fetch(base), body = await response.text();
    assert.equal(body.includes('__qa-hid-readonly.js'), enabled, '--hid-readonly requires explicit --audit.');
    assert.equal(body.slice(body.indexOf('<body>')), html.slice(html.indexOf('<body>')), 'QA injection must not rewrite the factory body.');
    assert.equal(Number(response.headers.get('content-length')), Buffer.byteLength(body));
    const scriptResponse = await fetch(base + '__qa-hid-readonly.js');
    assert.equal(scriptResponse.status, enabled ? 200 : 404);
    if (enabled) {
      assert.equal(await scriptResponse.text(), source); assert.equal(scriptResponse.headers.get('cache-control'), 'no-store');
      assert.equal(scriptResponse.headers.get('x-content-type-options'), 'nosniff');
      assert.ok(body.includes(`defer src="${prefix}/__qa-hid-readonly.js"`));
      const head = await fetch(base + '__qa-hid-readonly.js', { method: 'HEAD' });
      assert.equal(Number(head.headers.get('content-length')), Buffer.byteLength(source)); assert.equal(await head.text(), '');
    }
    assert.equal((await fetch(base + '__qa-hid-readonly.js', { method: 'POST' })).status, 405);
    const subapp = await (await fetch(base + 'gmouse/')).text();
    assert.ok(!subapp.includes('__qa-hid-readonly.js'), 'The HID hook must only be injected in the factory root UI.');
    if (prefix) assert.equal((await fetch(`http://127.0.0.1:${port}/__qa-hid-readonly.js`)).status, 404);
    assert.equal(await fs.readFile(path.join(temporary, 'index.html'), 'utf8'), html, 'Server instrumentation must not alter files.');
  } finally {
    child.kill(); await new Promise(resolve => { const timer = setTimeout(resolve, 1000); child.once('close', () => { clearTimeout(timer); resolve(); }); if (child.exitCode !== null) { clearTimeout(timer); resolve(); } });
  }
}
try {
  for (const flags of [[], ['--hid-readonly'], ['--audit'], ['--audit', '--hid-readonly']]) await serverCase(flags);
  await serverCase(['--audit', '--hid-readonly'], '/mchose-offline');
  const build = JSON.parse(await fs.readFile(path.join(tools, '../reports/mirror-build.json'), 'utf8'));
  assert.ok(build.files.every(file => !/qa-hid-readonly|__qa-/.test(file.path)), 'QA tools must never enter the deployment inventory.');
  assert.ok(!(await fs.readFile(path.join(tools, '../site/index.html'), 'utf8')).includes('__qa-hid-readonly'));
  console.log('PASS server isolation: loopback listener, both opt-in flags required, root UI only, project-prefix scoped, GET/HEAD only, no-store, unchanged files, and no production inventory entry.');
} finally {
  const target = path.resolve(temporary), safeParent = path.resolve(os.tmpdir()) + path.sep;
  if (!target.startsWith(safeParent) || !path.basename(target).startsWith('mchose-hid-readonly-qa-')) throw new Error('Refusing cleanup outside the QA fixture.');
  await fs.rm(target, { recursive: true, force: true });
}
