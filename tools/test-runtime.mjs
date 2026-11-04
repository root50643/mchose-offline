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

const otherProjectValues = {
  'webdriver-auth': JSON.stringify({ user: { token: 'test-only-old-token' }, sessionStatus: 'authenticated' }),
  userConfig: JSON.stringify({ token: 'test-only-legacy-token' }),
  global: JSON.stringify({ userConfig: { token: 'test-only-nested-token' }, theme: 'dark', otherPreference: 7 }),
  mouse: JSON.stringify({ otherProjectMouse: 'preserve-this-value' }),
  unrelated: 'another application owns this value',
};
function createNativeStorage(localBacking, sessionBacking) {
  const state = new WeakMap();
  const reads = { local: [], session: [] };
  function data(receiver) {
    const result = state.get(receiver);
    if (!result) throw new TypeError('Illegal invocation: Storage receiver required.');
    return result;
  }
  class NativeStorage {
    getItem(key) { const backing = data(this); reads[backing === localBacking ? 'local' : 'session'].push(String(key)); return backing.get(String(key)) ?? null; }
    setItem(key, value) { data(this).set(String(key), String(value)); }
    removeItem(key) { data(this).delete(String(key)); }
    clear() { data(this).clear(); }
    key(index) { return [...data(this).keys()][Number(index)] ?? null; }
    get length() { return data(this).size; }
  }
  function instance(backing) {
    const target = new NativeStorage();
    const proxy = new Proxy(target, {
      get(object, key, receiver) {
        return typeof key === 'string' && !Reflect.has(object, key) && backing.has(key) ? backing.get(key) : Reflect.get(object, key, receiver);
      },
      set(object, key, value) { backing.set(String(key), String(value)); return true; },
      deleteProperty(object, key) { backing.delete(String(key)); return true; },
      has(object, key) { return backing.has(String(key)) || Reflect.has(object, key); },
      ownKeys() { return [...backing.keys()]; },
      getOwnPropertyDescriptor(object, key) {
        return typeof key === 'string' && backing.has(key)
          ? { value: backing.get(key), enumerable: true, configurable: true, writable: true }
          : Reflect.getOwnPropertyDescriptor(object, key);
      },
    });
    state.set(target, backing); state.set(proxy, backing);
    return proxy;
  }
  return { Storage: NativeStorage, local: instance(localBacking), session: instance(sessionBacking), reads };
}
function harness(base, options = {}) {
  const calls = { fetch: [], beacon: [], xhr: [], open: [], dispatched: [] };
  const eventListeners = new Map();
  const elements = new Map();
  const localBacking = options.localBacking || new Map(Object.entries(otherProjectValues));
  const sessionBacking = options.sessionBacking || new Map(Object.entries({ ...otherProjectValues, tabSession: 'preserve session value' }));
  const nativeStorage = createNativeStorage(localBacking, sessionBacking);
  const locationUrl = new URL(base);
  const location = { href: locationUrl.href, origin: locationUrl.origin, hostname: locationUrl.hostname, protocol: locationUrl.protocol, port: locationUrl.port, pathname: locationUrl.pathname, hash: '', replace(value) { this.href = value; } };
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
    location, document, localStorage: nativeStorage.local, sessionStorage: nativeStorage.session, Storage: nativeStorage.Storage,
    fetch: async (input, options) => {
      calls.fetch.push({ url: input instanceof Request ? input.url : String(input), method: options?.method || (input instanceof Request ? input.method : 'GET') });
      return new Response('native local fixture', { status: 200 });
    },
    open(...arguments_) { calls.open.push(arguments_); return { opened: arguments_[0] }; },
    dispatchEvent(event) { calls.dispatched.push(event.type); },
    addEventListener(type, callback) { eventListeners.set(type, callback); },
  };
  const navigator = { sendBeacon(...arguments_) { calls.beacon.push(arguments_); return true; } };
  const globals = {
    window, document, location, navigator, XMLHttpRequest: MockXhr, Storage: nativeStorage.Storage,
    URL, URLSearchParams, Request, Response, Headers, DOMException, CustomEvent: MockCustomEvent,
    PerformanceObserver: MockPerformanceObserver,
    performance: { getEntriesByType: () => [], timeOrigin: 1, now: () => 0 },
    console, setTimeout, clearTimeout, setInterval, clearInterval,
  };
  for (const name of ['localStorage', 'sessionStorage']) Object.defineProperty(globals, name, {
    configurable: true, get() { return window[name]; }, set(value) { window[name] = value; },
  });
  const context = vm.createContext(globals);
  vm.runInContext(runtimeText, context, { filename: 'site/offline-runtime.js', timeout: 5000 });
  return { calls, context, window, navigator, localBacking, sessionBacking,
    nativeStorageReads: nativeStorage.reads,
    rawLocalStorage: nativeStorage.local, rawSessionStorage: nativeStorage.session,
    get localStorage() { return window.localStorage; }, get sessionStorage() { return window.sessionStorage; },
    elements, eventListeners, location, runtime: window.__mchoseOffline };
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
  assert.equal(h.localStorage.getItem('global'), null, 'Unmarked origin-wide preferences must not enter this project namespace.');
  assert.equal(h.localStorage.getItem('mouse'), null, 'Unmarked origin-wide mouse data must not enter this project namespace.');
  for (const [key, value] of Object.entries(otherProjectValues)) {
    assert.equal(h.rawLocalStorage.getItem(key), value, 'Other projects localStorage must remain unchanged: ' + key);
    assert.equal(h.rawSessionStorage.getItem(key), value, 'Other projects sessionStorage must remain unchanged: ' + key);
  }

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

const legacyMarkers = { 'mchose-offline-language-initialized': '1', 'cz@keyboardConfig@v1': '{}' };
const sharedLocalSeed = { ...otherProjectValues, ...legacyMarkers };
const sharedSessionSeed = { ...otherProjectValues, sessionOnly: 'another app session' };
const sharedLocal = new Map(Object.entries(sharedLocalSeed));
const sharedSession = new Map(Object.entries(sharedSessionSeed));
const namespaceA = harness('https://root50643.github.io/mchose-offline/', { localBacking: sharedLocal, sessionBacking: sharedSession });
const namespaceB = harness('https://root50643.github.io/another-project/', { localBacking: sharedLocal, sessionBacking: sharedSession });
assert.notEqual(namespaceA.runtime.storageNamespace, namespaceB.runtime.storageNamespace, 'Different Pages project paths need distinct storage namespaces.');
assert.equal(namespaceA.runtime.storageNamespace, 'mchose-offline:v1:%2Fmchose-offline%2F:data:');
assert.equal(namespaceA.localStorage.getItem('mouse'), null, 'GitHub Pages must not migrate origin-wide mouse data even when legacy markers exist.');
assert.equal(namespaceB.localStorage.getItem('global'), null);
for (const h of [namespaceA, namespaceB]) {
  assert.ok(h.nativeStorageReads.local.every(key => key.startsWith('mchose-offline:v1:')), 'GitHub Pages must not read unprefixed localStorage values.');
  assert.ok(h.nativeStorageReads.session.every(key => key.startsWith('mchose-offline:v1:')), 'GitHub Pages must not read unprefixed sessionStorage values.');
}
for (const storageName of ['localStorage', 'sessionStorage']) {
  const a = namespaceA[storageName], b = namespaceB[storageName];
  a.setItem('method', 'project A ' + storageName);
  b.setItem('method', 'project B ' + storageName);
  a.setItem('numeric', 37);
  assert.equal(a.getItem('numeric'), '37');
  assert.equal(a.getItem.call(a, 'method'), 'project A ' + storageName);
  const detachedGet = a.getItem;
  assert.equal(detachedGet('method'), 'project A ' + storageName, 'Scoped methods must retain the native receiver.');
  assert.equal(namespaceA.context.Storage.prototype.getItem.call(a, 'method'), 'project A ' + storageName);
  namespaceA.context.Storage.prototype.setItem.call(a, 'prototypeMethod', 'project A prototype');
  assert.equal(a.getItem('prototypeMethod'), 'project A prototype');
  assert.equal(b.getItem('prototypeMethod'), null);
  a.property = 'project A property'; b.property = 'project B property';
  assert.equal(a.property, 'project A property');
  assert.equal(b.property, 'project B property');
  assert.ok(Object.keys(a).includes('property'));
  assert.ok(!Object.keys(a).includes('unrelated'));
  assert.ok(Object.prototype.hasOwnProperty.call(a, 'property'));
  assert.ok('property' in a);
  assert.equal(Object.getOwnPropertyDescriptor(a, 'property').value, 'project A property');
  const keys = Array.from({ length: a.length }, (_, index) => a.key(index));
  assert.deepEqual([...keys].sort(), Object.keys(a).sort());
  assert.equal(namespaceA.context.Storage.prototype.key.call(a, 0), a.key(0));
  assert.equal(a.key(a.length), null);
  const nativeLength = Object.getOwnPropertyDescriptor(namespaceA.context.Storage.prototype, 'length').get;
  assert.equal(nativeLength.call(a), a.length);
  delete a.property;
  assert.equal(a.property, undefined);
  assert.equal(b.property, 'project B property');
  a.removeItem('method');
  assert.equal(a.getItem('method'), null);
  assert.equal(b.getItem('method'), 'project B ' + storageName);
  namespaceA.context.Storage.prototype.removeItem.call(a, 'prototypeMethod');
  assert.equal(a.getItem('prototypeMethod'), null);
  a.clear();
  assert.equal(a.length, 0); assert.equal(a.key(0), null); assert.deepEqual(Object.keys(a), []);
  a.setItem('prototypeClear', 'only project A');
  namespaceA.context.Storage.prototype.clear.call(a);
  assert.equal(a.length, 0);
  assert.equal(b.getItem('method'), 'project B ' + storageName, 'clear() must preserve other project namespaces.');
}
namespaceA.localStorage.setItem('separate', 'local');
assert.equal(namespaceA.sessionStorage.getItem('separate'), null);
namespaceA.sessionStorage.setItem('separate', 'session');
assert.equal(namespaceA.localStorage.getItem('separate'), 'local');
for (const [key, value] of Object.entries(sharedLocalSeed)) assert.equal(sharedLocal.get(key), value, 'Origin-wide local data changed: ' + key);
for (const [key, value] of Object.entries(sharedSessionSeed)) assert.equal(sharedSession.get(key), value, 'Origin-wide session data changed: ' + key);
namespaceA.localStorage.setItem('webdriver-auth', otherProjectValues['webdriver-auth']);
namespaceA.localStorage.setItem('userConfig', otherProjectValues.userConfig);
namespaceA.localStorage.setItem('global', otherProjectValues.global);
const namespaceAReloaded = harness('https://root50643.github.io/mchose-offline/', { localBacking: sharedLocal, sessionBacking: sharedSession });
assert.equal(namespaceAReloaded.localStorage.getItem('webdriver-auth'), null);
assert.equal(namespaceAReloaded.localStorage.getItem('userConfig'), null);
const ownPreferences = JSON.parse(namespaceAReloaded.localStorage.getItem('global'));
assert.equal(ownPreferences.userConfig, undefined);
assert.equal(ownPreferences.theme, 'dark'); assert.equal(ownPreferences.otherPreference, 7);
assert.equal(sharedLocal.get('webdriver-auth'), otherProjectValues['webdriver-auth']);
assert.equal(sharedLocal.get('userConfig'), otherProjectValues.userConfig);
assert.equal(sharedLocal.get('global'), otherProjectValues.global);
assert.equal(namespaceAReloaded.localStorage.getItem('separate'), 'local', 'Namespaces must remain stable across reloads.');
console.log('PASS Storage isolation: shared Pages local/session data preserved, distinct project namespaces, all methods/prototype calls/properties/enumeration/clear, scoped auth cleanup');

for (const partialMarkers of [{}, { 'mchose-offline-language-initialized': '1' }, { 'cz@keyboardConfig@v1': '{}' }, { ...legacyMarkers, 'mchose-offline-language-initialized': '0' }]) {
  const seed = { ...otherProjectValues, ...partialMarkers };
  const backing = new Map(Object.entries(seed));
  const h = harness('http://127.0.0.1:8765/', { localBacking: backing });
  assert.equal(h.localStorage.getItem('mouse'), null, 'Loopback migration requires both exact legacy markers.');
  for (const [key, value] of Object.entries(seed)) assert.equal(backing.get(key), value);
}
for (const base of ['http://127.0.0.1:8765/', 'http://localhost:8765/', 'http://[::1]:8765/']) {
  const seed = { ...otherProjectValues, ...legacyMarkers, unknownLegacyField: 'do not import this' };
  const backing = new Map(Object.entries(seed));
  const h = harness(base, { localBacking: backing });
  assert.equal(h.localStorage.getItem('mouse'), otherProjectValues.mouse, 'Recognized loopback data should be copied into the project namespace.');
  assert.equal(h.localStorage.getItem('unknownLegacyField'), null, 'Migration must copy only allowlisted app keys.');
  assert.equal(h.localStorage.getItem('unrelated'), null);
  assert.equal(h.localStorage.getItem('webdriver-auth'), null);
  assert.equal(h.localStorage.getItem('userConfig'), null);
  const preferences = JSON.parse(h.localStorage.getItem('global'));
  assert.equal(preferences.userConfig, undefined); assert.equal(preferences.theme, 'dark');
  for (const [key, value] of Object.entries(seed)) assert.equal(backing.get(key), value, 'Migration must preserve every original unprefixed key.');
  h.localStorage.clear();
  const reloaded = harness(base, { localBacking: backing });
  assert.equal(reloaded.localStorage.getItem('mouse'), null, 'Clearing scoped data must not re-import the old unprefixed snapshot on reload.');
  for (const [key, value] of Object.entries(seed)) assert.equal(backing.get(key), value);
}
const newerBacking = new Map(Object.entries({ ...otherProjectValues, ...legacyMarkers }));
newerBacking.set('mchose-offline:v1:%2F:data:mouse', 'newer namespaced mouse preferences');
const newer = harness('http://127.0.0.1:8765/', { localBacking: newerBacking });
assert.equal(newer.localStorage.getItem('mouse'), 'newer namespaced mouse preferences', 'Legacy migration must not overwrite newer scoped values.');
console.log('PASS loopback migration: exact two-marker gate, allowlist only, no source deletion, no overwrite, no re-import after scoped clear');
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
