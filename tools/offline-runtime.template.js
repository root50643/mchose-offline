/* MCHOSE offline runtime. Generated data is injected by tools/patch-app.mjs. */
(() => {
  'use strict';
  const DATA = /*__OFFLINE_DATA__*/{};
  const base = new URL('.', document.currentScript.src).href;
  const ownOrigin = new URL(base).origin;
  // GitHub Pages projects share an origin. Install storage isolation before any
  // upstream code or the offline auth cleanup can inspect generic storage keys.
  const storageNamespaceRoot = `mchose-offline:v1:${encodeURIComponent(new URL(base).pathname)}:`;
  const storageNamespace = storageNamespaceRoot + 'data:';
  const storageBridges = new WeakMap();
  const rawLocalStorage = window.localStorage;
  const rawSessionStorage = window.sessionStorage;
  const legacyLocalKeys = [
    'mchose-offline-language-initialized', 'cz@keyboardConfig@v1', 'cz@keyboardConfig@v1@reloadedAt',
    'global', 'mouse', 'lang', 'test-tool-lang', 'theme', 'deviceName', 'deviceInfoMap', 'lastMouseProductKey',
    'lockIndexMap', 'activeMacroM7', 'macroListM7', 'keyMacroMap', 'leftKeyDebounce', 'rightKeyDebounce',
    'listTempAfter', 'newMouseUpgradeEnabled', 'rateNoTip', 'trackDeviceName', 'connectDeviceViewType',
    'dockMusicStore', 'settingConfigStore', 'pcConfigStore', 'web-main-store', 'webAppearance',
    'webAppearancePreset', 'wallpaperStore', 'homeDeviceOrder', 'firstGuideStore', 'debugMode', 'debugEnabled',
    '__HID__', '__DEVICE_SYSTEM_HID_TRACE__', '__check_cz_sdk_failed_at__', 'hasSyncOldConfigData',
  ];

  function installScopedStorage(kind, backing, legacyKeys) {
    const prototype = Object.getPrototypeOf(backing);
    const native = Object.fromEntries(['getItem', 'setItem', 'removeItem', 'clear', 'key'].map(name => [name, backing[name].bind(backing)]));
    const metadataKey = storageNamespaceRoot + 'meta:legacy-migrated-v1';
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname);
    // Only this app's identifiable older loopback copy is eligible. Public Pages
    // never read unprefixed values, including credentials belonging to other apps.
    if (kind === 'localStorage' && loopback && native.getItem('mchose-offline-language-initialized') === '1' && native.getItem('cz@keyboardConfig@v1') !== null && native.getItem(metadataKey) === null) {
      for (const key of legacyKeys) {
        const value = native.getItem(key);
        if (value !== null && native.getItem(storageNamespace + key) === null) native.setItem(storageNamespace + key, value);
      }
      native.setItem(metadataKey, 'known-loopback-keys-copied');
    }
    const keys = () => {
      const scoped = [];
      for (let index = 0; index < backing.length; index++) {
        const key = native.key(index);
        if (key?.startsWith(storageNamespace)) scoped.push(key.slice(storageNamespace.length));
      }
      return scoped;
    };
    const asString = value => {
      if (typeof value === 'symbol') throw new TypeError('Cannot convert a Symbol value to a string');
      return String(value);
    };
    const required = (method, args, count) => {
      if (args.length < count) throw new TypeError(`Storage.${method} requires ${count} argument(s).`);
    };
    const methods = {
      getItem(...args) { required('getItem', args, 1); return native.getItem(storageNamespace + asString(args[0])); },
      setItem(...args) { required('setItem', args, 2); native.setItem(storageNamespace + asString(args[0]), asString(args[1])); },
      removeItem(...args) { required('removeItem', args, 1); native.removeItem(storageNamespace + asString(args[0])); },
      clear() { for (const key of keys()) native.removeItem(storageNamespace + key); },
      key(...args) { required('key', args, 1); return keys()[Number(args[0]) >>> 0] ?? null; },
    };
    const target = Object.create(prototype);
    const proxy = new Proxy(target, {
      get(object, property, receiver) {
        if (property === 'length') return keys().length;
        if (Object.hasOwn(methods, property)) return methods[property];
        if (typeof property === 'symbol' || property in object) return Reflect.get(object, property, receiver);
        return methods.getItem(property) ?? undefined;
      },
      set(object, property, value) {
        if (typeof property === 'symbol') return Reflect.set(object, property, value);
        methods.setItem(property, value); return true;
      },
      deleteProperty(object, property) {
        if (typeof property === 'symbol') return Reflect.deleteProperty(object, property);
        methods.removeItem(property); return true;
      },
      has(object, property) { return property in object || (typeof property === 'string' && methods.getItem(property) !== null); },
      ownKeys(object) { return [...Reflect.ownKeys(object), ...keys()]; },
      getOwnPropertyDescriptor(object, property) {
        if (typeof property === 'symbol') return Reflect.getOwnPropertyDescriptor(object, property);
        const value = methods.getItem(property);
        return value === null ? undefined : { value, writable: true, enumerable: true, configurable: true };
      },
      defineProperty(object, property, descriptor) {
        if (typeof property === 'symbol') return Reflect.defineProperty(object, property, descriptor);
        if (!Object.hasOwn(descriptor, 'value') || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) return false;
        methods.setItem(property, descriptor.value); return true;
      },
      preventExtensions() { return false; },
      setPrototypeOf() { return false; },
    });
    storageBridges.set(proxy, { methods, length: () => keys().length });
    const descriptor = Object.getOwnPropertyDescriptor(window, kind);
    Object.defineProperty(window, kind, { configurable: true, enumerable: descriptor?.enumerable ?? true, get: () => proxy });
    return { prototype, proxy };
  }

  const scopedLocalStorage = installScopedStorage('localStorage', rawLocalStorage, legacyLocalKeys);
  const scopedSessionStorage = installScopedStorage('sessionStorage', rawSessionStorage, []);
  // Native prototype calls also accept our proxies, while real Storage receivers
  // retain their original behavior. Captured native methods always use the real
  // backing receiver, avoiding browser "Illegal invocation" errors.
  for (const prototype of new Set([scopedLocalStorage.prototype, scopedSessionStorage.prototype])) {
    for (const name of ['getItem', 'setItem', 'removeItem', 'clear', 'key']) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      if (typeof descriptor?.value !== 'function') continue;
      const original = descriptor.value;
      Object.defineProperty(prototype, name, { ...descriptor, value: function (...args) {
        const bridge = storageBridges.get(this);
        return bridge ? bridge.methods[name](...args) : Reflect.apply(original, this, args);
      } });
    }
    const descriptor = Object.getOwnPropertyDescriptor(prototype, 'length');
    if (typeof descriptor?.get === 'function') Object.defineProperty(prototype, 'length', { ...descriptor, get: function () {
      const bridge = storageBridges.get(this);
      return bridge ? bridge.length() : Reflect.apply(descriptor.get, this, []);
    } });
  }
  const nativeFetch = window.fetch.bind(window);
  const network = { blockedExternalAttempts: 0, localResourceRemaps: 0, apiRequests: 0, events: [], cspViolations: [] };
  const diagnostics = new URL(location.href).searchParams.get('diagnostics') === '1';
  const resourceHosts = new Set(DATA.resourceHosts || []);
  let hidApi = null;
  let testing = false;

  function renderNetwork() {
    const output = document.getElementById('offline-network-result');
    if (!output) return;
    const resources = performance.getEntriesByType('resource').map(entry => ({ url: entry.name, initiatorType: entry.initiatorType }));
    const origins = [...new Set(resources.map(entry => { try { return new URL(entry.url).origin; } catch { return ''; } }))];
    output.textContent = JSON.stringify({
      startedAt: performance.timeOrigin, elapsedSeconds: Math.round(performance.now() / 1000),
      blockedExternalAttempts: network.blockedExternalAttempts, localResourceRemaps: network.localResourceRemaps,
      apiRequests: network.apiRequests, origins, externalResources: resources.filter(entry => /^https?:/.test(entry.url) && new URL(entry.url).origin !== ownOrigin),
      cspViolations: network.cspViolations, events: network.events,
    }, null, 2);
  }

  function report(kind, url) {
    if (kind === 'blocked') network.blockedExternalAttempts++;
    if (kind === 'mapped') network.localResourceRemaps++;
    if (kind === 'api') network.apiRequests++;
    if (kind !== 'mapped') {
      network.events.push({ kind, url: String(url), at: new Date().toISOString() });
      if (network.events.length > 100) network.events.shift();
    }
    const counter = document.getElementById('offline-external-attempt-count');
    if (counter) counter.textContent = String(network.blockedExternalAttempts);
    renderNetwork();
    window.dispatchEvent(new CustomEvent('mchose-offline-network', { detail: { ...network } }));
  }

  function canonical(value) {
    const url = new URL(value, base);
    if (resourceHosts.has(url.host)) url.protocol = 'https:';
    url.search = '';
    url.hash = '';
    return url.href;
  }

  function resourceUrl(value) {
    if (value == null || value === '') return value;
    const text = String(value);
    if (/^(?:data:|blob:|#)/i.test(text)) return text;
    let url;
    try { url = new URL(text, base); } catch { return text; }
    url.pathname = url.pathname.replace(/\/{2,}/g, '/');
    if (url.origin === ownOrigin) {
      const root = new URL(base).pathname;
      // Re-resolve constructed vendor paths through the exact map (case-colliding
      // upstream names may have distinct hash-suffixed Windows filenames).
      if (url.pathname.startsWith(root + 'vendor/')) {
        const parts = url.pathname.slice((root + 'vendor/').length).split('/');
        const host = parts.shift();
        const original = canonical('https://' + host + '/' + parts.join('/'));
        const mapped = DATA.urlMap[original];
        if (mapped) return new URL(mapped, base).href + url.search + url.hash;
      }
      if (text.startsWith('/') && !url.pathname.startsWith(root)) return new URL(text.replace(/^\/+/, ''), base).href;
      return url.href;
    }
    const local = DATA.urlMap[canonical(url.href)];
    if (local) return new URL(local, base).href + url.search + url.hash;
    if (resourceHosts.has(url.host)) {
      const prefix = url.host === 'www.mchose.com.cn' ? '' : `vendor/${url.host}/`;
      return new URL(prefix + url.pathname.replace(/^\/+/, ''), base).href + url.search + url.hash;
    }
    return text;
  }

  function resourceOrigin(origin) {
    const url = new URL(origin, base);
    return new URL(url.host === 'www.mchose.com.cn' ? '.' : `vendor/${url.host}/`, base).href.replace(/\/$/, '');
  }

  function unavailableResource(value) {
    if (value == null || value === '') return null;
    const target = new URL(resourceUrl(value), base);
    if (target.origin !== ownOrigin || !target.pathname.startsWith(new URL(base).pathname)) return null;
    const relative = decodeURIComponent(target.pathname.slice(new URL(base).pathname.length));
    return DATA.missingResources?.[relative] ? { path: relative, ...DATA.missingResources[relative] } : null;
  }

  function showUnavailableResource(resource) {
    let notice = document.getElementById('offline-resource-unavailable');
    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'offline-resource-unavailable';
      notice.setAttribute('role', 'alert');
      notice.style.cssText = 'position:fixed;top:48px;left:20px;right:20px;padding:12px;background:#fff3cd;color:#443400;z-index:2147483647;border:1px solid #c99;border-radius:6px';
      document.body.append(notice);
    }
    const kind = /\.pdf$/i.test(resource.path) ? '說明書' : '檔案';
    notice.textContent = `${kind}無法取得：${resource.path.split('/').pop()}。原廠來源未提供此檔案，離線版無法開啟；滑鼠參數設定仍可使用。`;
    window.dispatchEvent(new CustomEvent('mchose-offline-resource-unavailable', { detail: { path: resource.path } }));
  }

  const nativeWindowOpen = typeof window.open === 'function' ? window.open.bind(window) : null;
  window.open = (value, ...args) => {
    const missing = unavailableResource(value);
    if (missing) { showUnavailableResource(missing); return null; }
    if (value != null && value !== '') {
      const target = new URL(resourceUrl(value), base);
      if (/^https?:$/.test(target.protocol) && target.origin !== ownOrigin) {
        report('blocked', target.href);
        disabledFeature();
        return null;
      }
      return nativeWindowOpen?.(target.href, ...args) ?? null;
    }
    return nativeWindowOpen?.(value, ...args) ?? null;
  };

  function localize(value) {
    if (typeof value === 'string') {
      if (/^https?:\/\//i.test(value) || value.startsWith('//')) return resourceUrl(value);
      if (/^(?:configCenter(?:-test)?|customPage)\//.test(value)) return resourceUrl('https://cdn.mchose.com.cn/' + value);
      return value;
    }
    if (Array.isArray(value)) return value.map(localize);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item)]));
    return value;
  }

  const apiBase = new URL('offline-api', base).href;
  const apiHosts = new Set(['www.maicong.cn', 'serverapi.maicong.cn', 'chat.maicong.cn', '192.168.150.157', '192.168.150.164']);
  function isApi(url) {
    return url.href.startsWith(apiBase) || (apiHosts.has(url.hostname) && !DATA.urlMap[canonical(url.href)]);
  }

  async function localApi(url, options = {}) {
    report('api', url.href);
    const pathname = url.href.startsWith(apiBase) ? url.pathname.slice(new URL(apiBase).pathname.length) : url.pathname.replace(/^\/mchose/, '');
    const method = (options.method || 'GET').toUpperCase();
    let body;
    if (pathname === '/official' && method === 'GET') {
      const name = url.searchParams.get('name') || '';
      const saved = DATA.officialTemplates?.[name];
      body = saved || { code: 200, data: { game: [] }, message: 'Offline snapshot: no official template was available for this model.' };
      body = { ...body, data: { ...(body.data || {}), game: Array.isArray(body.data?.game) ? body.data.game : [] } };
    } else if (pathname === '/official/games') {
      body = { code: 200, data: { games: [] } };
    } else if (pathname === '/local' && method === 'GET') {
      body = { code: 200, data: { local: [], official: [], cloud: [] } };
    } else if (/^\/cloud\//.test(pathname)) {
      body = { code: 200, data: { list: [], total: 0, games: [] }, offline: true };
    } else if (/questionnaire|satisfy|notification|advertisement|register\/client/.test(pathname)) {
      body = { code: 200, data: null, offline: true };
    } else {
      body = { code: 503, data: null, offline: true, message: '此功能需要原廠伺服器，離線版已停用。' };
    }
    return new Response(JSON.stringify(localize(body)), { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  }

  const verifiedFirmware = new Map();
  function bundleFiles(device) {
    if (!device) return [];
    let name = String(device.productName || '').replace(/Realtek.*$/i, '').trim();
    if (name.includes('AX5 V2')) name = device.productId === 161 ? 'MCHOSE AX5 V2 old' : 'MCHOSE AX5 V2 new';
    return DATA.firmwareBundles?.[name] || DATA.firmwareBundles?.[String(device.productId)] || [];
  }
  function firmwareAvailability(device) {
    const files = bundleFiles(device);
    const missing = files.filter(file => {
      const target = new URL(resourceUrl(file), base);
      return !DATA.firmwareFiles?.[decodeURIComponent(target.pathname.slice(new URL(base).pathname.length))];
    });
    return { available: files.length > 0 && missing.length === 0, missing, required: files.length };
  }
  async function readFirmware(value) {
    const resolved = resourceUrl(value);
    const target = new URL(resolved, base);
    const relative = decodeURIComponent(target.pathname.slice(new URL(base).pathname.length));
    const entry = DATA.firmwareFiles?.[relative];
    if (!entry) throw new Error('此韌體檔案未完整封存，離線更新已停用：' + target.pathname.split('/').pop());
    if (!verifiedFirmware.has(relative)) verifiedFirmware.set(relative, (async () => {
      const response = await nativeFetch(target.href, { cache: 'no-store' });
      if (!response.ok) throw new Error('封存韌體檔案無法讀取：' + response.status);
      const bytes = await response.arrayBuffer();
      const digest = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
      if (bytes.byteLength !== entry.bytes || digest !== entry.sha256) throw new Error('封存韌體完整性檢查失敗，未傳送升級命令。');
      return bytes;
    })().catch(error => { verifiedFirmware.delete(relative); throw error; }));
    return new Uint8Array(await verifiedFirmware.get(relative));
  }

  async function preflightFirmware(devices) {
    const list = (Array.isArray(devices) ? devices : [devices]).filter(Boolean);
    if (!list.length) throw new Error('未連接可辨識的韌體更新裝置。');
    const files = new Set();
    for (const device of list) {
      const bundle = bundleFiles(device);
      if (!bundle.length) throw new Error('此裝置的韌體封存不完整，離線更新已停用：' + device.productName);
      for (const file of bundle) files.add(file);
    }
    // Verify every required mouse/receiver image before the first OTA HID command.
    await Promise.all([...files].map(readFirmware));
    return true;
  }

  window.fetch = async (input, options = {}) => {
    const raw = input instanceof Request ? input.url : String(input);
    const original = new URL(raw, base);
    if (isApi(original)) return localApi(original, { ...(input instanceof Request ? { method: input.method } : {}), ...options });
    const mapped = resourceUrl(raw);
    const target = new URL(mapped, base);
    const missing = unavailableResource(mapped);
    if (missing) {
      if (/\.pdf$/i.test(missing.path)) showUnavailableResource(missing);
      throw new TypeError('This resource was unavailable at the upstream source: ' + missing.path);
    }
    if (!['data:', 'blob:'].includes(target.protocol) && target.origin !== ownOrigin) {
      report('blocked', original.href);
      throw new TypeError(`Offline mode blocked an external request: ${original.origin}`);
    }
    if (target.href !== original.href) report('mapped', original.href);
    const request = input instanceof Request ? new Request(target.href, input) : target.href;
    return nativeFetch(request, options);
  };

  const nativeOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, value, ...rest) {
    const original = new URL(String(value), base);
    const target = new URL(resourceUrl(value), base);
    const missing = unavailableResource(target.href);
    if (missing) {
      if (/\.pdf$/i.test(missing.path)) showUnavailableResource(missing);
      throw new DOMException('This resource was not available from the upstream source.', 'NotFoundError');
    }
    if (target.origin !== ownOrigin) {
      report('blocked', original.href);
      throw new DOMException('External requests are disabled in offline mode.', 'SecurityError');
    }
    return nativeOpen.call(this, method, target.href, ...rest);
  };
  window.WebSocket = class OfflineWebSocket {
    constructor(url) { report('blocked', url); throw new DOMException('WebSocket is disabled in offline mode.', 'SecurityError'); }
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
  };
  window.EventSource = class OfflineEventSource {
    constructor(url) { report('blocked', url); throw new DOMException('EventSource is disabled in offline mode.', 'SecurityError'); }
  };
  if (navigator.sendBeacon) navigator.sendBeacon = url => {
    const target = new URL(resourceUrl(url), base);
    if (target.origin !== ownOrigin) report('blocked', url);
    return false;
  };

  // Config loaders retain the upstream interface but operate on the frozen snapshot.
  function installConfig(name, value) {
    const suffix = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase();
    const frozen = localize(value);
    const loader = Object.freeze({
      getValue: async () => frozen,
      reload: async () => frozen,
      markDirty() {},
    });
    for (const environment of ['PROD', 'TEST', 'PRE']) window[`MC_CONFIG_${suffix}_${environment}_LOADER`] = loader;
    return loader;
  }
  for (const [name, value] of Object.entries(DATA.configs || {})) installConfig(name, value);

  function disabledFeature() {
    window.dispatchEvent(new CustomEvent('mchose-offline-feature-disabled'));
    return Promise.resolve(false);
  }

  document.addEventListener('securitypolicyviolation', event => {
    network.cspViolations.push({ directive: event.effectiveDirective, blockedURI: event.blockedURI, sourceFile: event.sourceFile, line: event.lineNumber });
    renderNetwork();
  });
  try { new PerformanceObserver(renderNetwork).observe({ type: 'resource', buffered: true }); } catch {}

  function ensureDiagnostics() {
    if (!document.body) return;
    let counter = document.getElementById('offline-external-attempt-count');
    if (!counter) {
      counter = document.createElement('output');
      counter.id = 'offline-external-attempt-count';
      counter.hidden = true;
      counter.textContent = String(network.blockedExternalAttempts);
      document.body.append(counter);
    }
    if (!diagnostics || document.getElementById('offline-hid-diagnostics')) return;
    const panel = document.createElement('section');
    panel.id = 'offline-hid-diagnostics';
    panel.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:2147483646;max-width:min(760px,calc(100vw - 24px));max-height:55vh;overflow:auto;padding:12px;background:#fff;color:#15202b;border:1px solid #999;border-radius:8px;font:13px/1.5 system-ui;box-shadow:0 2px 20px #0003';
    const label = document.createElement('p');
    label.textContent = '診斷：請先在首頁授權並進入滑鼠設定。DPI 測試會暫時調整一個值，隨後讀回並還原；不會修改按鍵、巨集或韌體。';
    const button = document.createElement('button');
    button.id = 'offline-hid-test-button';
    button.textContent = 'DPI 讀寫並還原測試';
    button.style.cssText = 'padding:6px 12px;background:#005ac8;color:#fff;border:0;border-radius:4px;cursor:pointer';
    const output = document.createElement('pre');
    output.id = 'offline-hid-test-result';
    output.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.4 monospace';
    output.textContent = JSON.stringify({ status: 'waiting', passed: false }, null, 2);
    button.addEventListener('click', async () => {
      if (testing) return;
      testing = true;
      button.disabled = true;
      output.textContent = JSON.stringify({ status: 'running', passed: false }, null, 2);
      try {
        if (!hidApi) throw new Error('滑鼠應用程式尚未載入。');
        output.textContent = JSON.stringify(await hidApi.testDpi(), null, 2);
      } catch (error) {
        output.textContent = JSON.stringify({ status: 'failed', passed: false, error: error?.message || String(error) }, null, 2);
      } finally {
        testing = false;
        button.disabled = false;
      }
    });
    const networkOutput = document.createElement('pre');
    networkOutput.id = 'offline-network-result';
    networkOutput.style.cssText = output.style.cssText;
    panel.append(label, button, output, networkOutput);
    document.body.append(panel);
    renderNetwork();
    setInterval(renderNetwork, 1000);
  }

  window.__mchoseOffline = Object.freeze({
    base, apiBase, network, storageNamespace, resourceUrl, resourceOrigin, localize, installConfig, disabledFeature, readFirmware, preflightFirmware, firmwareAvailability,
    bindHidDiagnostics(api) { hidApi = api; ensureDiagnostics(); },
    getConfig(name) { return localize(DATA.configs[name]); },
  });

  // A new origin starts without a session. Never restore a server session in this copy.
  if (!localStorage.getItem('mchose-offline-language-initialized')) {
    localStorage.setItem('lang', 'zh_CN');
    localStorage.setItem('mchose-offline-language-initialized', '1');
  }
  if (!localStorage.getItem('cz@keyboardConfig@v1')) localStorage.setItem('cz@keyboardConfig@v1', '{}');
  for (const key of Object.keys(localStorage)) if (/^(?:auth|webdriver-auth|userConfig|userToken|accessToken|refreshToken|clientId)$/i.test(key)) localStorage.removeItem(key);
  try {
    const settings = JSON.parse(localStorage.getItem('global'));
    if (settings && typeof settings === 'object') {
      for (const key of ['userConfig', 'wechatOauthIntent']) delete settings[key];
      localStorage.setItem('global', JSON.stringify(settings));
    }
  } catch {}
  document.addEventListener('click', event => {
    const upgrade = event.target?.closest?.('button,[role="button"],du-button');
    if (upgrade && /(?:升级|升級|更新韌體|更新固件|upgrade\s*(?:now|firmware)|update\s*firmware)/i.test(upgrade.textContent || '') && navigator.device) {
      const availability = firmwareAvailability(navigator.device);
      if (!availability.available) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let notice = document.getElementById('offline-firmware-unavailable');
        if (!notice) {
          notice = document.createElement('div');
          notice.id = 'offline-firmware-unavailable';
          notice.setAttribute('role', 'alert');
          notice.style.cssText = 'position:fixed;top:48px;left:20px;right:20px;padding:12px;background:#fff3cd;color:#443400;z-index:2147483647;border:1px solid #c99;border-radius:6px';
          document.body.append(notice);
        }
        notice.textContent = '此型號所需的原廠韌體檔案未完整封存，離線更新已停用。滑鼠參數設定仍可使用。';
      }
    }
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor) return;
    const missing = unavailableResource(anchor.href);
    if (missing) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showUnavailableResource(missing);
      return;
    }
    const url = new URL(anchor.href, base);
    if (/^https?:$/.test(url.protocol) && url.origin !== ownOrigin) {
      event.preventDefault();
      disabledFeature();
    }
  }, true);
  const preventUnsupportedRoute = () => {
    if (/^#\/(?:keyboard|audio|headset|speaker|feedback|cloud)/i.test(location.hash)) location.replace(base + '#/connectDevice');
  };
  window.addEventListener('hashchange', preventUnsupportedRoute);
  preventUnsupportedRoute();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureDiagnostics, { once: true });
  else ensureDiagnostics();
})();
