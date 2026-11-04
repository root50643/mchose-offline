(() => {
  'use strict';
  const DATA = /*__MIRROR_DATA__*/{};
  const base = new URL('.', document.currentScript.src).href;
  const ownOrigin = new URL(base).origin;
  /*__MIRROR_STORAGE__*/

  function canonical(value) {
    const url = new URL(value, base);
    if (DATA.hosts.includes(url.hostname)) url.protocol = 'https:';
    url.search = ''; url.hash = '';
    return url.href;
  }
  function assetUrl(value) {
    if (value == null || typeof value !== 'string' || /^(?:data:|blob:|#)/i.test(value)) return value;
    let url;
    try { url = new URL(value, base); } catch { return value; }
    const revision = url.searchParams.get('hash');
    if (/\/customPage\/driver-ui\//.test(url.pathname) && revision && revision !== DATA.driverUiVersion) return value;
    const local = DATA.map[canonical(url.href)];
    return local ? new URL(local, base).href + url.search + url.hash : value;
  }
  function rewriteText(value) {
    return String(value).replace(/(?:https?:)?\/\/(?:cdn\.mchose\.com\.cn|www\.mchose\.com\.cn|www\.maicong\.cn)\/[^\s"'<>`()]+/g, assetUrl);
  }
  function mapResourceData(value) {
    const memo = new WeakMap();
    const mapString = text => {
      const mapStatic = original => {
        const candidate = /^(?:configCenter(?:-test)?|customPage)\//.test(original) ? 'https://cdn.mchose.com.cn/' + original : original;
        let url;
        try { url = new URL(candidate, base); } catch { return original; }
        // Origins, IDs and API endpoints are data identities, not resource paths.
        if (!/\.(?:html|m?js|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i.test(url.pathname)) return original;
        const mapped = assetUrl(candidate);
        return mapped === candidate ? original : mapped;
      };
      const direct = mapStatic(text);
      return direct !== text ? direct : text.replace(/(?:https?:)?\/\/(?:cdn\.mchose\.com\.cn|www\.mchose\.com\.cn|www\.maicong\.cn)\/[^\s"'<>`()]+/g, mapStatic);
    };
    const visit = item => {
      if (typeof item === 'string') return mapString(item);
      if (!item || typeof item !== 'object') return item;
      if (memo.has(item)) return memo.get(item);
      const prototype = Object.getPrototypeOf(item);
      if (!Array.isArray(item) && prototype !== null && prototype.constructor?.name !== 'Object') return item;
      memo.set(item, item);
      let changed = false;
      const entries = Object.entries(item).map(([key, original]) => {
        const mapped = visit(original); changed ||= mapped !== original; return [key, mapped];
      });
      if (!changed) return item;
      const mapped = Array.isArray(item) ? new Array(item.length) : Object.create(prototype);
      for (const [key, data] of entries) Object.defineProperty(mapped, key, { value: data, enumerable: true, writable: true, configurable: true });
      memo.set(item, mapped);
      return mapped;
    };
    return visit(value);
  }
  function projectPath(value) {
    return new URL(String(value).replace(/^\/+/, ''), base).pathname;
  }
  window.__MC_CIZHOU_ROOT_PATH__ = projectPath('cizhou');
  function customAppUrl(name, fallback) {
    const key = String(name).replace(/^.*\//, '');
    if (DATA.subapps[key]) return new URL(DATA.subapps[key], base).href;
    if (key === 'gmouse' || key === 'g7max') return `https://www.mchose.com.cn/${key}/`;
    return fallback;
  }
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, options) => {
    const method = String(options?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') return nativeFetch(input, options);
    const raw = input instanceof Request ? input.url : String(input);
    const mapped = assetUrl(raw);
    // The factory SDK already falls back to its bundled keyboard definitions on
    // network failure. Bound only its optional updates so an unavailable CDN
    // cannot hold the entire mouse application behind a long TCP timeout.
    let url;
    try { url = new URL(raw, base); } catch { return nativeFetch(input, options); }
    if (mapped === raw && url.hostname === 'cdn.mchose.com.cn' && /^\/configCenter\/custom\/keyboard(?:Config|Preset)\.json$/.test(url.pathname)) {
      const controller = new AbortController();
      const upstreamSignal = options?.signal || (input instanceof Request ? input.signal : null);
      const abort = () => controller.abort(upstreamSignal.reason);
      if (upstreamSignal?.aborted) abort();
      else upstreamSignal?.addEventListener('abort', abort, { once: true });
      const timer = setTimeout(() => controller.abort(new DOMException('Optional factory configuration timed out', 'TimeoutError')), 5000);
      return nativeFetch(input, { ...options, signal: controller.signal }).finally(() => {
        clearTimeout(timer); upstreamSignal?.removeEventListener('abort', abort);
      });
    }
    if (mapped === raw) return nativeFetch(input, options);
    return nativeFetch(input instanceof Request ? new Request(mapped, input) : mapped, options);
  };
  const nativeOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, value, ...rest) {
    const readOnly = /^(?:GET|HEAD)$/i.test(String(method));
    return nativeOpen.call(this, method, readOnly ? assetUrl(String(value)) : value, ...rest);
  };
  window.__mchoseMirror = Object.freeze({ base, assetUrl, rewriteText, mapResourceData, projectPath, customAppUrl });
})();
