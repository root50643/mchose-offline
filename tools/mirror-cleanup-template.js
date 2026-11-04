/* One-time migration from this project's former cached version. No resources are cached. */
(() => {
  'use strict';

  const isWorker = typeof window === 'undefined' && typeof self !== 'undefined'
    && self.registration && self.clients;
  const projectBase = new URL('./', isWorker ? self.location.href : document.currentScript?.src || location.href);
  const cachePrefix = 'mchose-offline:' + encodeURIComponent(projectBase.href) + ':';
  const workerUrl = new URL('sw.js', projectBase);

  function ownWorker(worker) {
    if (!worker?.scriptURL) return false;
    try {
      const url = new URL(worker.scriptURL);
      return url.origin === workerUrl.origin && url.pathname === workerUrl.pathname;
    } catch { return false; }
  }

  async function removeProjectCaches() {
    if (typeof caches === 'undefined') return;
    const names = await caches.keys();
    await Promise.allSettled(names.filter(name => name.startsWith(cachePrefix)).map(name => caches.delete(name)));
  }

  if (isWorker) {
    self.addEventListener('install', event => {
      event.waitUntil(self.skipWaiting());
    });
    self.addEventListener('activate', event => {
      event.waitUntil((async () => {
        try { await removeProjectCaches(); } catch {}
        try { await self.clients.claim(); } catch {}
        try { await self.registration.unregister(); } catch {}
        let clients = [];
        try { clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true }); } catch {}
        await Promise.allSettled(clients.filter(client => {
          try {
            const url = new URL(client.url);
            return url.origin === projectBase.origin && url.href.startsWith(projectBase.href);
          } catch { return false; }
        }).map(client => client.navigate(client.url)));
      })());
    });
    return;
  }

  function waitForActivation(worker) {
    if (!worker || worker.state === 'redundant') return Promise.resolve(false);
    if (worker.state === 'activated') return Promise.resolve(true);
    return new Promise(resolve => {
      let timer;
      const finish = activated => {
        clearTimeout(timer);
        worker.removeEventListener('statechange', changed);
        resolve(activated);
      };
      const changed = () => {
        if (worker.state === 'activated') finish(true);
        else if (worker.state === 'redundant') finish(false);
      };
      worker.addEventListener('statechange', changed);
      timer = setTimeout(() => finish(false), 5000);
      changed();
    });
  }

  async function cleanPage() {
    let reloadCurrent = false;
    if ('serviceWorker' in navigator) {
      let registrations = [];
      try { registrations = await navigator.serviceWorker.getRegistrations(); } catch {}
      const owned = registrations.filter(registration => registration.scope === projectBase.href
        && [registration.active, registration.waiting, registration.installing].some(ownWorker));
      for (const registration of owned) {
        const oldActive = registration.active;
        let tombstoneActivated = false;
        try {
          await registration.update();
          const next = registration.installing || registration.waiting;
          tombstoneActivated = next ? await waitForActivation(next)
            : !!(registration.active && registration.active !== oldActive && registration.active.state === 'activated');
        } catch {}
        try { await registration.unregister(); } catch {}
        if (!tombstoneActivated && oldActive && navigator.serviceWorker.controller === oldActive) reloadCurrent = true;
      }
    }
    try { await removeProjectCaches(); } catch {}
    if (reloadCurrent) location.reload();
  }

  return cleanPage().catch(() => {});
})();
