import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const storageCode = await fs.readFile(path.join(root, 'tools/mirror-storage.js'), 'utf8');
const upstream = await fs.readFile(path.join(root, 'upstream/www.mchose.com.cn/assets/main-DnvOpr5S.js'), 'utf8');
const factoryClass = parse(upstream, { ecmaVersion: 'latest', sourceType: 'module' }).body.find(node => node.type === 'ClassDeclaration' && node.id.name === 'AuthSessionRuntime');
const factoryMethod = factoryClass.body.body.find(node => node.key?.name === 'handleStorageEvent');
const factoryHandler = upstream.slice(factoryMethod.start, factoryMethod.end);
assert.match(factoryHandler, /AUTH_BROWSER_STORAGE_KEY/);

function harness(base) {
  const stores = new WeakMap();
  class Storage {
    getItem(key) { return stores.get(this).get(String(key)) ?? null; }
    setItem(key, value) { stores.get(this).set(String(key), String(value)); }
    removeItem(key) { stores.get(this).delete(String(key)); }
    clear() { stores.get(this).clear(); }
    key(index) { return [...stores.get(this).keys()][Number(index) >>> 0] ?? null; }
    get length() { return stores.get(this).size; }
  }
  const rawLocal = new Storage(), rawSession = new Storage(), foreignStorage = new Storage();
  for (const store of [rawLocal, rawSession, foreignStorage]) stores.set(store, new Map());
  class StorageEvent extends Event {
    constructor(type, init = {}) {
      super(type);
      if (init.storageArea != null && !stores.has(init.storageArea)) throw new TypeError('StorageEvent requires a native Storage receiver.');
      for (const [key, value] of Object.entries({ key: init.key ?? null, oldValue: init.oldValue ?? null, newValue: init.newValue ?? null, url: init.url ?? '', storageArea: init.storageArea ?? null })) {
        Object.defineProperty(this, key, { configurable: true, enumerable: true, value });
      }
    }
  }
  const window = new EventTarget();
  Object.assign(window, { localStorage: rawLocal, sessionStorage: rawSession });
  const context = vm.createContext({ window, URL, EventTarget, Event, StorageEvent, Storage, console,
    AUTH_BROWSER_STORAGE_KEY: 'webdriver-auth', normalizeAuthUser: user => user ?? {}, normalizeAuthRevision: revision => revision ?? null });
  vm.runInContext(`(() => { const base = ${JSON.stringify(base)}; ${storageCode} })()`, context);
  const authHandler = vm.runInContext(`({${factoryHandler}}).handleStorageEvent`, context);
  const namespace = `mchose-offline:v1:${encodeURIComponent(new URL(base).pathname)}:data:`;
  const sourceURL = new URL('index.html?tab=second', base).href;
  const send = (key, overrides = {}) => window.dispatchEvent(new StorageEvent('storage', { key, oldValue: 'old', newValue: 'new', url: sourceURL, storageArea: rawLocal, ...overrides }));
  return { window, rawLocal, rawSession, foreignStorage, StorageEvent, namespace, sourceURL, send, authHandler };
}

let scenarios = 0;
for (const base of ['http://127.0.0.1:8765/', 'https://root50643.github.io/mchose-offline/']) {
  const h = harness(base);
  const { window, namespace, send } = h;
  const seen = [];
  function observe(event) {
    assert.equal(this, window, 'Window listeners retain their receiver.');
    assert.equal(event.target, window);
    assert.equal(event.currentTarget, window);
    seen.push(event);
  }
  window.addEventListener('storage', observe);
  const ignored = [
    ['webdriver-auth', {}],
    ['mchose-offline:v1:%2Fother%2F:data:webdriver-auth', {}],
    [namespace.replace(/data:$/, 'meta:legacy-migrated-v1'), {}],
    [namespace + 'webdriver-auth', { storageArea: null }],
    [namespace + 'webdriver-auth', { storageArea: h.foreignStorage }],
    [namespace + 'webdriver-auth', { url: 'https://unrelated.example/mchose-offline/' }],
    [namespace + 'webdriver-auth', { url: 'invalid-url' }],
  ];
  if (new URL(base).pathname !== '/') ignored.push([namespace + 'webdriver-auth', { url: new URL('/another-project/', base).href }], [namespace + 'webdriver-auth', { url: new URL('/mchose-offline-sibling/', base).href }]);
  for (const [key, overrides] of ignored) send(key, overrides);
  assert.equal(seen.length, 0, 'Other projects, metadata, foreign areas, and invalid sources never trigger a scoped listener.');
  scenarios += ignored.length;

  h.rawLocal.setItem(namespace + 'webdriver-auth', 'scoped value');
  h.rawLocal.setItem('webdriver-auth', 'another project value');
  send(namespace + 'webdriver-auth');
  assert.equal(seen.length, 1);
  const event = seen[0];
  assert.ok(event instanceof h.StorageEvent);
  assert.equal(event.key, 'webdriver-auth');
  assert.equal(event.oldValue, 'old');
  assert.equal(event.newValue, 'new');
  assert.equal(event.url, h.sourceURL);
  assert.equal(event.currentTarget, null, 'currentTarget ends with dispatch.');
  assert.equal(event.storageArea, window.localStorage);
  assert.equal(event.storageArea.getItem('webdriver-auth'), 'scoped value');
  event.storageArea.setItem('event-setting', 'isolated');
  assert.equal(h.rawLocal.getItem(namespace + 'event-setting'), 'isolated');
  assert.equal(h.rawLocal.getItem('event-setting'), null);
  assert.equal(h.rawLocal.getItem('webdriver-auth'), 'another project value');
  send(namespace + 'session-key', { storageArea: h.rawSession });
  assert.equal(seen[1].storageArea, window.sessionStorage);
  assert.equal(seen[1].key, 'session-key');
  send(null);
  assert.equal(seen[2].key, null, 'An own-project backing clear retains its native null key.');
  window.removeEventListener('storage', observe);
  send(namespace + 'removed');
  assert.equal(seen.length, 3);
  scenarios += 4;

  let onceCount = 0;
  window.addEventListener('storage', () => onceCount++, { once: true });
  send('unrelated');
  send(namespace + 'valid');
  send(namespace + 'valid');
  assert.equal(onceCount, 1, 'An unrelated native event must not consume once.');
  let duplicates = 0;
  const duplicateListener = () => duplicates++;
  window.addEventListener('storage', duplicateListener);
  window.addEventListener(new String('storage'), duplicateListener);
  send(namespace + 'deduplicated');
  assert.equal(duplicates, 1);
  window.removeEventListener('storage', duplicateListener);
  send(namespace + 'removed');
  assert.equal(duplicates, 1);
  scenarios += 3;

  let objectCalls = 0;
  const listenerObject = { handleEvent(event) { assert.equal(this, listenerObject); assert.equal(event.key, 'object'); objectCalls++; } };
  window.addEventListener('storage', listenerObject);
  send(namespace + 'object');
  listenerObject.handleEvent = function () { assert.equal(this, listenerObject); objectCalls += 10; };
  send(namespace + 'object');
  window.removeEventListener('storage', listenerObject);
  send(namespace + 'object');
  assert.equal(objectCalls, 11, 'Object listeners are resolved at dispatch and remove by their original identity.');
  let abortedCalls = 0;
  const abort = new AbortController();
  window.addEventListener('storage', () => abortedCalls++, { signal: abort.signal });
  abort.abort();
  send(namespace + 'aborted');
  assert.equal(abortedCalls, 0);
  window.addEventListener('storage', () => abortedCalls++, { signal: abort.signal });
  send(namespace + 'already-aborted');
  assert.equal(abortedCalls, 0);
  let ordinaryCalls = 0;
  function ordinary() { assert.equal(this, window); ordinaryCalls++; }
  window.addEventListener('factory-notification', ordinary);
  window.dispatchEvent(new Event('factory-notification'));
  window.removeEventListener('factory-notification', ordinary);
  window.dispatchEvent(new Event('factory-notification'));
  assert.equal(ordinaryCalls, 1, 'Other browser events retain native dispatch and removal.');
  scenarios += 4;

  const snapshots = [];
  const runtime = { applyExternalSnapshot(snapshot, options) { snapshots.push(JSON.parse(JSON.stringify({ snapshot, options }))); } };
  const factoryListener = h.authHandler.bind(runtime);
  window.addEventListener('storage', factoryListener);
  send(namespace + 'webdriver-auth', { newValue: JSON.stringify({ sessionStatus: 'authenticated', user: { id: 'factory-user' }, revision: 'r2' }) });
  send('webdriver-auth', { newValue: null });
  send(namespace + 'another-setting', { newValue: null });
  assert.equal(snapshots.length, 1);
  assert.deepEqual(snapshots[0], { snapshot: { status: 'authenticated', user: { id: 'factory-user' }, revision: 'r2' } });
  send(namespace + 'webdriver-auth', { newValue: null });
  assert.deepEqual(snapshots[1], { snapshot: { status: 'anonymous', user: {}, revision: null }, options: { force: true } });
  send(namespace + 'webdriver-auth', { newValue: 'invalid JSON' });
  assert.equal(snapshots.length, 2);
  window.removeEventListener('storage', factoryListener);
  send(namespace + 'webdriver-auth', { newValue: null });
  assert.equal(snapshots.length, 2, 'The unmodified factory auth handler supports cross-tab login/logout and disposal.');
  scenarios += 5;
}
console.log(`Scoped storage event regression passed (${scenarios} scenarios, factory auth handler, two project origins).`);
