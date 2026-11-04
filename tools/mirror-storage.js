// Keep existing project settings isolated from other GitHub Pages projects.
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

  // Browser events contain the backing key, but the factory auth listener expects
  // "webdriver-auth". Dispatch only this project's events with the public scoped
  // key and Storage proxy. A separate EventTarget preserves once/signal/removal
  // behavior without consuming listeners on another project's storage changes.
  if (typeof window.addEventListener === 'function' && typeof window.removeEventListener === 'function' && typeof EventTarget === 'function' && typeof Event === 'function') {
    const nativeAdd = window.addEventListener;
    const nativeRemove = window.removeEventListener;
    const scopedEvents = new EventTarget();
    const listeners = new WeakMap();
    const projectURL = new URL(base);
    const listenerFor = listener => {
      if (listener == null || (typeof listener !== 'function' && typeof listener !== 'object')) return listener;
      if (!listeners.has(listener)) listeners.set(listener, function (event) {
        if (typeof listener === 'function') Reflect.apply(listener, window, [event]);
        else Reflect.apply(listener.handleEvent, listener, [event]);
      });
      return listeners.get(listener);
    };
    const eventType = type => {
      if (typeof type === 'symbol') throw new TypeError('Cannot convert a Symbol value to a string');
      return String(type);
    };
    Object.defineProperty(window, 'addEventListener', { configurable: true, writable: true, value: function (type, listener, options) {
      if (arguments.length < 2 || (this !== window && this != null)) return Reflect.apply(nativeAdd, this, arguments);
      const name = eventType(type);
      if (name === 'storage') return scopedEvents.addEventListener(name, listenerFor(listener), options);
      return Reflect.apply(nativeAdd, window, [name, listener, options]);
    } });
    Object.defineProperty(window, 'removeEventListener', { configurable: true, writable: true, value: function (type, listener, options) {
      if (arguments.length < 2 || (this !== window && this != null)) return Reflect.apply(nativeRemove, this, arguments);
      const name = eventType(type);
      if (name === 'storage') return scopedEvents.removeEventListener(name, listenerFor(listener), options);
      return Reflect.apply(nativeRemove, window, [name, listener, options]);
    } });
    Reflect.apply(nativeAdd, window, ['storage', event => {
      const storageArea = event.storageArea === rawLocalStorage ? scopedLocalStorage.proxy : event.storageArea === rawSessionStorage ? scopedSessionStorage.proxy : null;
      if (!storageArea || (event.key !== null && (typeof event.key !== 'string' || !event.key.startsWith(storageNamespace)))) return;
      let sourceURL;
      try { sourceURL = new URL(event.url); } catch { return; }
      if (sourceURL.origin !== projectURL.origin || !sourceURL.pathname.startsWith(projectURL.pathname)) return;
      const key = event.key === null ? null : event.key.slice(storageNamespace.length);
      const init = { key, oldValue: event.oldValue, newValue: event.newValue, url: event.url, storageArea: event.storageArea };
      const translated = typeof StorageEvent === 'function' ? new StorageEvent('storage', init) : new Event('storage');
      let dispatching = false;
      Object.defineProperties(translated, {
        key: { value: key, enumerable: true },
        oldValue: { value: event.oldValue, enumerable: true },
        newValue: { value: event.newValue, enumerable: true },
        url: { value: event.url, enumerable: true },
        storageArea: { value: storageArea, enumerable: true },
        target: { get: () => window },
        currentTarget: { get: () => dispatching ? window : null },
      });
      dispatching = true;
      try { scopedEvents.dispatchEvent(translated); } finally { dispatching = false; }
    }]);
  }
