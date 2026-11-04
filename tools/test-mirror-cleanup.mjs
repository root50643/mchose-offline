import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(root, 'tools', 'mirror-cleanup-template.js'), 'utf8');
const base = 'https://root50643.github.io/mchose-offline/';
const prefix = 'mchose-offline:' + encodeURIComponent(base) + ':';
const otherBase = 'https://root50643.github.io/another-project/';
const otherPrefix = 'mchose-offline:' + encodeURIComponent(otherBase) + ':';

function cacheFixture() {
  const names = new Set([prefix + 'old-v1', prefix + 'older-v1', otherPrefix + 'keep', 'unrelated-cache']);
  const removed = [];
  const calls = { open: 0, fetch: 0 };
  return {
    names, removed, calls,
    caches: {
      async keys() { return [...names]; },
      async delete(name) { removed.push(name); return names.delete(name); },
      async open() { calls.open++; throw new Error('Migration must never open or fill caches.'); },
    },
    fetch() { calls.fetch++; throw new Error('Migration must never download assets.'); },
  };
}
function assertOnlyOwnCachesRemoved(fixture) {
  assert.ok(!fixture.names.has(prefix + 'old-v1'));
  assert.ok(!fixture.names.has(prefix + 'older-v1'));
  assert.ok(fixture.names.has(otherPrefix + 'keep'));
  assert.ok(fixture.names.has('unrelated-cache'));
  assert.ok(fixture.removed.every(name => name.startsWith(prefix)));
  assert.equal(fixture.calls.open, 0);
  assert.equal(fixture.calls.fetch, 0);
}

async function workerLifecycle() {
  const cache = cacheFixture();
  const handlers = new Map();
  const navigations = [];
  const calls = { skipWaiting: 0, claim: 0, unregister: 0 };
  const urls = [base + '#/mouse', base + '?language=en', otherBase, 'https://root50643.github.io/mchose-offline-backup/', 'https://external.example/mchose-offline/'];
  const self = {
    location: { href: base + 'sw.js', origin: new URL(base).origin },
    registration: { scope: base, async unregister() { calls.unregister++; return true; } },
    addEventListener(type, callback) { handlers.set(type, callback); },
    async skipWaiting() { calls.skipWaiting++; },
    clients: {
      async claim() { calls.claim++; },
      async matchAll(options) {
        assert.equal(options.type, 'window'); assert.equal(options.includeUncontrolled, true);
        return urls.map(url => ({ url, async navigate(target) { navigations.push(target); } }));
      },
    },
  };
  vm.runInNewContext(source, { self, caches: cache.caches, fetch: cache.fetch, URL, Promise }, { filename: 'tombstone-sw.js' });
  assert.deepEqual([...handlers.keys()].sort(), ['activate', 'install'], 'A tombstone must never intercept resource fetches.');
  let install;
  handlers.get('install')({ waitUntil(promise) { install = promise; } });
  await install;
  assert.equal(calls.skipWaiting, 1, 'Existing active v1 must be replaced without waiting for every old tab to close.');
  let activation;
  handlers.get('activate')({ waitUntil(promise) { activation = promise; } });
  await activation;
  assert.equal(calls.claim, 1); assert.equal(calls.unregister, 1);
  assert.deepEqual(navigations.sort(), urls.slice(0, 2).sort(), 'Only this project windows should refresh to the same URL.');
  assertOnlyOwnCachesRemoved(cache);
  console.log('PASS tombstone lifecycle: skipWaiting, exact-project cache cleanup, unregister itself, same-project refresh, no fetch interception/precache');
}

function fakeWorker(scriptURL, state = 'activated') {
  const listeners = new Set();
  return {
    scriptURL, state,
    addEventListener(type, callback) { assert.equal(type, 'statechange'); listeners.add(callback); },
    removeEventListener(type, callback) { listeners.delete(callback); },
    changeState(next) { this.state = next; for (const callback of [...listeners]) callback(); },
  };
}

async function pageCleanup(mode) {
  const cache = cacheFixture();
  const calls = { update: 0, unregister: 0, otherUpdate: 0, otherUnregister: 0, register: 0, reload: 0 };
  const active = fakeWorker(base + 'sw.js');
  const ownRegistration = {
    scope: base, active, installing: null, waiting: null,
    async update() {
      calls.update++;
      if (mode === 'failed-update') throw new Error('Network unavailable.');
      if (mode === 'unchanged' || mode === 'no-registration' || mode === 'foreign-controller') return;
      const next = fakeWorker(base + 'sw.js', mode === 'redundant' ? 'redundant' : 'installing');
      this.installing = next;
      if (mode !== 'redundant' && mode !== 'timeout') setTimeout(() => {
        this.active = next; this.installing = null; next.changeState('activated');
      }, 1);
    },
    async unregister() { calls.unregister++; return true; },
  };
  const otherRegistration = {
    scope: otherBase, active: fakeWorker(otherBase + 'sw.js'),
    async update() { calls.otherUpdate++; }, async unregister() { calls.otherUnregister++; },
  };
  const unrelatedOwnScopeRegistration = {
    scope: base, active: fakeWorker(base + 'different-worker.js'),
    async update() { calls.otherUpdate++; }, async unregister() { calls.otherUnregister++; },
  };
  const location = { href: base + '#/mouse', reload() { calls.reload++; } };
  const serviceWorker = {
    controller: mode === 'foreign-controller' ? otherRegistration.active : active,
    async getRegistrations() { return mode === 'no-registration' ? [otherRegistration, unrelatedOwnScopeRegistration] : [ownRegistration, otherRegistration]; },
    async register() { calls.register++; throw new Error('New pages must not register a permanent service worker.'); },
  };
  const window = { location, navigator: { serviceWorker } };
  const document = { currentScript: { src: base + 'mirror-cleanup.js' } };
  const completion = vm.runInNewContext(source, {
    window, document, location, navigator: window.navigator, caches: cache.caches, fetch: cache.fetch, URL, Promise,
    setTimeout: mode === 'timeout' ? callback => setTimeout(callback, 0) : setTimeout, clearTimeout,
  }, { filename: 'mirror-cleanup.js' });
  await completion;
  assert.equal(calls.register, 0);
  assert.equal(calls.otherUpdate, 0); assert.equal(calls.otherUnregister, 0);
  assert.equal(calls.update, mode === 'no-registration' ? 0 : 1);
  assert.equal(calls.unregister, mode === 'no-registration' ? 0 : 1);
  assert.equal(calls.reload, ['failed-update', 'unchanged', 'redundant', 'timeout'].includes(mode) ? 1 : 0);
  assertOnlyOwnCachesRemoved(cache);
}

await workerLifecycle();
for (const mode of ['activated', 'failed-update', 'unchanged', 'redundant', 'timeout', 'no-registration', 'foreign-controller']) await pageCleanup(mode);
console.log('PASS page migration: update/activation/failure/timeout/orphan cleanup, no registrations or downloads, preserves other projects and foreign controllers');
