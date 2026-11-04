import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { parse } from './vendor/acorn.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimeText = await readFile(path.join(root, 'site', 'offline-runtime.js'), 'utf8');
const ast = parse(runtimeText, { ecmaVersion: 'latest', sourceType: 'script' });
let dataNode;
function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'VariableDeclarator' && node.id?.name === 'DATA') dataNode = node.init;
  for (const item of Object.values(node)) {
    if (Array.isArray(item)) item.forEach(walk);
    else if (item && typeof item === 'object') walk(item);
  }
}
walk(ast);
assert.ok(dataNode, 'The generated runtime must include frozen snapshot DATA.');
const data = JSON.parse(runtimeText.slice(dataNode.start, dataNode.end));
assert.ok(Object.keys(data.urlMap || {}).length, 'Run tools/patch-app.mjs before the runtime tests.');
const mappedFiles = Object.entries(data.urlMap);
const collisions = mappedFiles.filter(([url, local]) => local.includes('.__url_') && new URL(url).pathname.endsWith('.bin'));
assert.ok(collisions.length >= 2, 'The snapshot should retain the known pair of case-colliding dongle firmware files.');

class MemoryStorage {
  constructor(values = {}) { Object.assign(this, values); }
  getItem(key) { return Object.hasOwn(this, key) ? String(this[key]) : null; }
  setItem(key, value) { this[key] = String(value); }
  removeItem(key) { delete this[key]; }
}
function harness(base) {
  const calls = { fetch: [], beacon: [], xhr: [], open: [], dispatched: [] };
  const eventListeners = new Map();
  const elements = new Map();
  const localStorage = new MemoryStorage({
    'webdriver-auth': JSON.stringify({ user: { token: 'test-only-old-token' }, sessionStatus: 'authenticated' }),
    userConfig: JSON.stringify({ token: 'test-only-legacy-token' }),
    global: JSON.stringify({ userConfig: { token: 'test-only-nested-token' }, theme: 'dark', otherPreference: 7 }),
  });
  const locationUrl = new URL(base);
  const location = { href: locationUrl.href, origin: locationUrl.origin, pathname: locationUrl.pathname, hash: '', replace(value) { this.href = value; } };
  const document = {
    currentScript: { src: new URL('offline-runtime.js', base).href }, readyState: 'loading',
    getElementById(id) { return elements.get(id) || null; },
    createElement(tag) { return { tagName: tag.toUpperCase(), style: {}, setAttribute(name, value) { this[name] = value; } }; },
    body: { append(...nodes) { for (const node of nodes) if (node.id) elements.set(node.id, node); } },
    addEventListener(type, callback) { eventListeners.set(type, callback); },
  };
  class MockXhr { open(...arguments_) { calls.xhr.push(arguments_); } }
  class MockCustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } }
  class MockPerformanceObserver { constructor(callback) { this.callback = callback; } observe() {} }
  const window = {
    location, document, localStorage,
    fetch: async (input, options) => {
      calls.fetch.push({ url: input instanceof Request ? input.url : String(input), method: options?.method || (input instanceof Request ? input.method : 'GET') });
      return new Response('native local fixture', { status: 200 });
    },
    open(...arguments_) { calls.open.push(arguments_); return { opened: arguments_[0] }; },
    dispatchEvent(event) { calls.dispatched.push(event.type); },
    addEventListener(type, callback) { eventListeners.set(type, callback); },
  };
  const navigator = { sendBeacon(...arguments_) { calls.beacon.push(arguments_); return true; } };
  const context = vm.createContext({
    window, document, localStorage, location, navigator, XMLHttpRequest: MockXhr,
    URL, URLSearchParams, Request, Response, Headers, DOMException, CustomEvent: MockCustomEvent,
    PerformanceObserver: MockPerformanceObserver,
    performance: { getEntriesByType: () => [], timeOrigin: 1, now: () => 0 },
    console, setTimeout, clearTimeout, setInterval, clearInterval,
  });
  vm.runInContext(runtimeText, context, { filename: 'site/offline-runtime.js', timeout: 5000 });
  return { calls, context, window, navigator, localStorage, elements, eventListeners, location, runtime: window.__mchoseOffline };
}

let assertions = 0;
for (const base of ['http://127.0.0.1:8765/', 'https://root50643.github.io/mchose-offline/']) {
  const h = harness(base);
  const api = h.runtime;
  assert.ok(api);
  assert.equal(api.base, base);
  for (const [original, local] of mappedFiles) {
    const expected = new URL(local, base).href;
    assert.equal(api.resourceUrl(original), expected, `Wrong mirror URL for ${original} at ${base}`);
    assertions++;
  }
  const originFiles = mappedFiles.filter(([url]) => new URL(url).hostname === 'www.mchose.com.cn');
  assert.ok(originFiles.length > 0);
  for (const [original, local] of collisions) {
    const source = new URL(original);
    const expected = new URL(local, base).href;
    assert.equal(api.resourceUrl('//' + source.host + source.pathname), expected, 'Protocol-relative URLs must preserve collision-safe filenames even on localhost HTTP.');
    assert.equal(api.resourceUrl('http://' + source.host + source.pathname), expected, 'HTTP resource aliases must preserve exact mapped filenames.');
    const constructed = new URL('vendor/' + source.host + source.pathname, base).href;
    assert.equal(api.resourceUrl(constructed), expected, 'Constructed same-origin vendor paths must resolve the exact map.');
    assert.equal(api.resourceUrl(original + '?hash=pinned#fragment'), expected + '?hash=pinned#fragment');
    assert.equal(api.resourceUrl(expected), expected, 'Already mapped paths must remain stable.');
    assertions += 5;
  }
  assert.notEqual(api.resourceUrl(collisions[0][0]), api.resourceUrl(collisions[1][0]));
  assert.equal(api.resourceOrigin('//cdn.mchose.com.cn'), new URL('vendor/cdn.mchose.com.cn', base).href);
  assert.equal(api.resourceUrl('/assets/example.js'), new URL('assets/example.js', base).href);
  assert.equal(api.resourceUrl('data:image/png;base64,AA=='), 'data:image/png;base64,AA==');
  assert.equal(api.resourceUrl('blob:' + new URL(base).origin + '/test-id'), 'blob:' + new URL(base).origin + '/test-id');

  for (const [name, suffix] of [['global', 'GLOBAL'], ['cardList', 'CARD_LIST'], ['mouseConfig', 'MOUSE_CONFIG'], ['newMouseConfig', 'NEW_MOUSE_CONFIG']]) {
    for (const environment of ['PROD', 'TEST', 'PRE']) {
      const loader = h.window[`MC_CONFIG_${suffix}_${environment}_LOADER`];
      assert.equal(typeof loader?.getValue, 'function', `Missing ${name} ${environment} loader.`);
      assert.equal(typeof loader.reload, 'function');
      assert.equal(typeof loader.markDirty, 'function');
      const expected = JSON.stringify(api.getConfig(name));
      assert.equal(JSON.stringify(await loader.getValue()), expected);
      assert.equal(JSON.stringify(await loader.reload()), expected);
      loader.markDirty();
      assertions += 5;
    }
  }
  assert.equal(h.calls.fetch.length, 0, 'Config initialization must not contact a server.');
  assert.equal(h.localStorage.getItem('webdriver-auth'), null, 'The real persisted auth key must not restore a session.');
  assert.equal(h.localStorage.getItem('userConfig'), null, 'Legacy user configuration must not restore a session.');
  const globalPreferences = JSON.parse(h.localStorage.getItem('global'));
  assert.equal(globalPreferences.userConfig, undefined, 'Nested legacy auth data must be removed.');
  assert.equal(globalPreferences.theme, 'dark', 'Offline auth cleanup must preserve local non-auth preferences.');
  assert.equal(globalPreferences.otherPreference, 7);

  const [sampleOriginal, sampleLocal] = collisions[0];
  await h.window.fetch(new Request(sampleOriginal, { method: 'HEAD' }));
  assert.equal(h.calls.fetch.at(-1).url, new URL(sampleLocal, base).href);
  assert.equal(h.calls.fetch.at(-1).method, 'HEAD');
  const nativeCount = h.calls.fetch.length;
  for (const url of [
    api.apiBase + '/official?name=A7V3Ultra%2B',
    api.apiBase + '/official/games?name=A7V3Ultra%2B',
    api.apiBase + '/local?name=A7V3Ultra%2B',
    api.apiBase + '/cloud/search',
    'https://www.maicong.cn/mchose/official?name=A7V3Ultra%2B',
    'https://192.168.150.157/mchose/official?name=A7V3Ultra%2B',
    'https://chat.maicong.cn/register/client/node',
  ]) {
    const response = await h.window.fetch(url);
    assert.equal(response.status, 200);
    assert.ok((await response.json()).code !== undefined);
    assert.equal(h.calls.fetch.length, nativeCount, 'Offline APIs must be answered locally: ' + url);
    assertions += 3;
  }
  const beforeBlocked = api.network.blockedExternalAttempts;
  await assert.rejects(h.window.fetch('https://unexpected.example/tracking'), /blocked an external request/);
  assert.equal(h.navigator.sendBeacon('https://unexpected.example/beacon', 'payload'), false);
  assert.throws(() => new h.window.WebSocket('wss://unexpected.example/socket'), /disabled/);
  assert.throws(() => new h.window.EventSource('https://unexpected.example/events'), /disabled/);
  const xhr = new h.context.XMLHttpRequest();
  assert.throws(() => xhr.open('GET', 'https://unexpected.example/xhr'), /disabled/);
  assert.equal(api.network.blockedExternalAttempts, beforeBlocked + 5);
  assert.equal(h.calls.fetch.length, nativeCount, 'Rejected external requests must never reach native fetch.');
  assert.equal(h.calls.beacon.length, 0, 'Rejected beacons must never reach native sendBeacon.');
  assert.equal(h.calls.xhr.length, 0, 'Rejected XHR must never reach native open.');
  const missingManuals = Object.keys(data.missingResources || {}).filter(filename => /\.pdf$/i.test(filename));
  assert.equal(missingManuals.length, 2, 'Both unavailable G3 S manuals must have explicit local handling.');
  const nativeOpenCount = h.calls.open.length;
  const missingFetchCount = h.calls.fetch.length;
  const missingXhrCount = h.calls.xhr.length;
  const missingExternalCount = api.network.blockedExternalAttempts;
  const originalPage = h.location.href;
  for (const filename of missingManuals) {
    const localUrl = new URL(filename, base).href + '?download=1#manual';
    assert.equal(h.window.open(localUrl, '_blank'), null);
    assert.equal(h.calls.open.length, nativeOpenCount, 'Unavailable manuals must not reach native window.open.');
    let prevented = false, stopped = false;
    h.eventListeners.get('click')({
      target: { closest(selector) { return selector === 'a[href]' ? { href: localUrl } : null; } },
      preventDefault() { prevented = true; }, stopImmediatePropagation() { stopped = true; },
    });
    assert.ok(prevented && stopped, 'Unavailable manual anchors must cancel navigation.');
    await assert.rejects(h.window.fetch(localUrl), /unavailable at the upstream source/);
    const missingXhr = new h.context.XMLHttpRequest();
    assert.throws(() => missingXhr.open('GET', localUrl), /not available from the upstream source/);
    const notice = h.elements.get('offline-resource-unavailable');
    assert.ok(notice, 'The missing manual must show a local explanatory notice.');
    assert.match(notice.textContent, /說明書無法取得/);
    assert.ok(notice.textContent.includes(filename.split('/').pop()));
    assert.equal(h.calls.fetch.length, missingFetchCount);
    assert.equal(h.calls.xhr.length, missingXhrCount);
    assert.equal(h.location.href, originalPage, 'Missing manual handling must preserve the current application page.');
    assert.equal(api.network.blockedExternalAttempts, missingExternalCount, 'Missing local resources are not external attempts.');
  }
  const availableManual = mappedFiles.find(([url]) => /\.pdf$/i.test(new URL(url).pathname));
  assert.ok(availableManual);
  h.window.open(new URL(availableManual[1], base).href, '_blank');
  assert.equal(h.calls.open.length, nativeOpenCount + 1, 'Available local manuals should still open normally.');
  console.log(`PASS runtime ${base}: exact mirror map, case collisions, protocol-relative URLs, config loaders, auth cleanup, local APIs, blocked external transports`);
  console.log(`PASS missing-manual handling ${base}: window.open, anchor, fetch and XHR use a local notice without native requests or navigation`);
}
console.log(`Runtime assertions: ${assertions}+`);

const keyTestName = 'index-BbOLO0T8.js';
const originalKeyTest = await readFile(path.join(root, 'upstream', 'www.mchose.com.cn', 'assets', keyTestName), 'utf8');
const deployedKeyTest = await readFile(path.join(root, 'site', 'assets', keyTestName), 'utf8');
function extensionProbeCount(text) {
  let count = 0;
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'CallExpression' && node.callee?.type === 'Identifier' && node.callee.name === 'fetch'
      && node.arguments?.[0]?.type === 'Literal' && String(node.arguments[0].value).startsWith('chrome-extension://')) count++;
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(parse(text, { ecmaVersion: 'latest', sourceType: 'module' }));
  return count;
}
assert.equal(extensionProbeCount(originalKeyTest), 3, 'This regression test must cover the three original browser extension probes.');
assert.equal(extensionProbeCount(deployedKeyTest), 0, 'The deployed key-test page must not probe extensions.');
assert.ok(!deployedKeyTest.includes('chrome-extension://'));
assert.equal(deployedKeyTest.split('Extension detection is disabled in offline mode.').length - 1, 3);
console.log('PASS key-test browser detection: all three upstream extension fetch probes are removed from deployed code');

// Exercise the exact deployed diagnostics against a fake device engine. This never opens HID.
const patchText = await readFile(path.join(root, 'tools', 'patch-app.mjs'), 'utf8');
const patchAst = parse(patchText, { ecmaVersion: 'latest', sourceType: 'module' });
let diagnosticNode;
function findDiagnostic(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'VariableDeclarator' && node.id?.name === 'diagnosticBinding') diagnosticNode = node.init;
  for (const item of Object.values(node)) {
    if (Array.isArray(item)) item.forEach(findDiagnostic);
    else if (item && typeof item === 'object') findDiagnostic(item);
  }
}
findDiagnostic(patchAst);
assert.equal(diagnosticNode?.type, 'TemplateLiteral');
assert.equal(diagnosticNode.expressions.length, 0, 'Update this test if the diagnostics template gains interpolation.');
const diagnosticText = diagnosticNode.quasis[0].value.cooked;
const mainNames = (await readdir(path.join(root, 'site', 'assets'))).filter(name => /^main-.*\.js$/.test(name));
let deployedDiagnostics = false;
for (const name of mainNames) if ((await readFile(path.join(root, 'site', 'assets', name), 'utf8')).includes(diagnosticText)) deployedDiagnostics = true;
assert.ok(deployedDiagnostics, 'Diagnostics tests must match the exact code deployed in the main bundle. Re-run tools/patch-app.mjs.');

function diagnosticHarness(scenario = 'normal', snapshotChanges = {}) {
  const before = {
    profileIndex: 1, usbDpiIndex: 5, dpiSum: 6, dpiHasY: 1, dpiDirection: 0,
    dpi0: 400, dpi1: 800, dpi2: 1600, dpi3: 3200, dpi4: 6400, dpi5: 50000,
    dpiY0: 400, dpiY1: 800, dpiY2: 1600, dpiY3: 3200, dpiY4: 6400, dpiY5: 50000,
    usbRateIndex: 2, gRateIndex: 2, ...snapshotChanges,
  };
  const device = { vendorId: 14391, productId: 4120, productName: 'MCHOSE A7 V3 Ultra+' };
  let current = structuredClone(before);
  let diagnostics;
  let reads = 0;
  const writes = [];
  const context = vm.createContext({
    window: { __mchoseOffline: { bindHidDiagnostics(api) { diagnostics = api; }, network: { blockedExternalAttempts: 0 } } },
    navigator: { device }, state$6: { progressVisible: false },
    mouseDiffConfig: { 'MCHOSE A7 V3 Ultra+': { dpiMax: 50000 } }, removeRealTek: name => name,
    readMouseAllInfo: async () => structuredClone(before),
    setDpiInfo: async (value, selectedDevice) => {
      assert.equal(selectedDevice, device);
      writes.push(structuredClone(value)); current = structuredClone(value);
      if ((scenario === 'writeFailure' && writes.length === 1) || (scenario === 'restoreFailure' && writes.length === 2)) throw new Error('Simulated acknowledgement timeout.');
    },
    readDpiInfo: async (selection, selectedDevice) => {
      assert.equal(selectedDevice, device); assert.equal(selection.profileIndex, before.profileIndex);
      reads++;
      const value = structuredClone(current);
      if (scenario === 'wrongRead' && reads === 1) value['dpi' + value.usbDpiIndex] += 100;
      return value;
    },
    readPerformanceInfo: async selectedDevice => {
      assert.equal(selectedDevice, device);
      return { profileIndex: scenario === 'profileMismatch' ? 2 : current.profileIndex, usbDpiIndex: current.usbDpiIndex };
    },
    console,
  });
  vm.runInContext(diagnosticText, context, { filename: 'deployed-dpi-diagnostics.js', timeout: 5000 });
  return { before, writes, test: () => diagnostics.testDpi(), state: () => current };
}

const dpi = diagnosticHarness();
const successful = await dpi.test();
assert.equal(successful.passed, true, 'The real A7 V3 Ultra+ default 50,000 DPI slot must be supported.');
assert.equal(dpi.writes.length, 2);
assert.equal(dpi.writes[0].dpi5, 49900);
assert.deepEqual(dpi.writes[1], dpi.before);
assert.deepEqual(dpi.state(), dpi.before);
const changedFields = Object.keys(dpi.before).filter(key => dpi.writes[0][key] !== dpi.before[key]);
assert.deepEqual(changedFields, ['dpi5'], 'The test must change only the selected X DPI value.');
for (const scenario of ['writeFailure', 'wrongRead']) {
  const failed = diagnosticHarness(scenario);
  const result = await failed.test();
  assert.equal(result.passed, false);
  assert.equal(failed.writes.length, 2, 'A failed write or read must still attempt restoration.');
  assert.deepEqual(failed.state(), failed.before);
}
for (const scenario of ['restoreFailure', 'profileMismatch']) {
  const failed = diagnosticHarness(scenario);
  const result = await failed.test();
  assert.equal(result.passed, false, 'Failed restore or changed active profile must never pass.');
  assert.ok(result.restoreError);
}
for (const invalid of [{ dpi0: Number.NaN }, { dpiY4: undefined }, { dpiSum: 0 }, { usbDpiIndex: 6 }, { profileIndex: 3 }]) {
  const invalidDevice = diagnosticHarness('normal', invalid);
  await assert.rejects(invalidDevice.test(), /快照無效/);
  assert.equal(invalidDevice.writes.length, 0, 'Invalid full snapshots must be rejected before any write.');
}
console.log('PASS mock-device diagnostics: 50,000 DPI, one-field change, finally restoration after write/read failure, profile verification, invalid full-snapshot rejection');
