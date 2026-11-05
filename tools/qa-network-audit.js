/* Local dev-server --audit only. This file is never copied to site/. */
(() => {
  'use strict';
  const started = performance.now();
  const ownOrigin = location.origin;
  const auditElement = document.currentScript || document.getElementById('mchose-network-audit');
  if (auditElement) auditElement.id = 'mchose-network-audit';
  const scope = new URL('./', auditElement?.src || location.href).pathname;
  const distributionHosts = new Set(['cdn.mchose.com.cn', 'www.mchose.com.cn', 'mchose.com.cn', 'www.maicong.cn', 'ioss.maicong.cn', 'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com', 'api.mapbox.com']);
  const extension = /\.(?:html|m?js|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i;
  const attempts = new Map(), failures = new Map(), apiOrigins = new Set(), frames = new Map(), observedResources = new Set();
  const resources = { total: 0, local: 0, externalStatic: 0, otherExternal: 0, byType: {} };
  const xhrState = new WeakMap();
  const nativeFetch = window.fetch.bind(window);
  const nativeOpen = XMLHttpRequest.prototype.open;
  let rendered;

  function urlOf(value) { try { return new URL(value && typeof value.url === 'string' ? value.url : String(value), location.href); } catch { return null; } }
  function installer(url) { return /\.(?:exe|msi|dmg|pkg|apk|7z|rar|psd)$/i.test(url.pathname) || /\/static\/archives\/|MCHOSE_HUB_installer|VC_redist|Firmwaretool[^/]*\.zip$/i.test(url.pathname); }
  function userContent(url) { return url.hostname === 'mchose-bbs.oss-cn-shenzhen.aliyuncs.com' || /\/(?:uploads?|user-upload|usercontent|avatars?)(?:\/|$)/i.test(url.pathname); }
  function service(url) {
    return ['serverapi.maicong.cn', 'chat.maicong.cn', 'open.weixin.qq.com', 'mp.weixin.qq.com', 'wx.qq.com', 'login.weixin.qq.com'].includes(url.hostname)
      || /\/(?:mchose|app-api|api|oauth|auth|official|community)(?:\/|$)/i.test(url.pathname);
  }
  function externalStatic(url) {
    return !!url && /^https?:$/.test(url.protocol) && url.origin !== ownOrigin && distributionHosts.has(url.hostname)
      && !installer(url) && !userContent(url) && !service(url)
      && (extension.test(url.pathname) || (url.hostname === 'www.mchose.com.cn' && /^\/(?:gmouse|g7max)\/?$/.test(url.pathname)));
  }
  function localStatic(url) {
    if (!url || url.origin !== ownOrigin || !url.pathname.startsWith(scope)) return false;
    let pathname = url.pathname; try { pathname = decodeURIComponent(pathname); } catch {}
    return extension.test(pathname) || /\/(?:__mirror[^/]*|mirror-unavailable)(?:\/|$)/.test(pathname);
  }
  function publicUrl(url) {
    const copy = new URL(url.href);
    copy.username = ''; copy.password = ''; copy.hash = '';
    for (const key of [...copy.searchParams.keys()]) if (/token|authorization|password|secret|session|signature|^(?:code|state|key)$/i.test(key)) copy.searchParams.set(key, '[redacted]');
    return copy.href;
  }
  function observeService(url) { if (url && url.origin !== ownOrigin && service(url) && !installer(url) && !userContent(url)) apiOrigins.add(url.origin); }
  function attempted(channel, url, potentialStatic = false) {
    if (!externalStatic(url) && !potentialStatic) return;
    const key = publicUrl(url);
    const item = attempts.get(key) || { url: key, channels: [] };
    if (!item.channels.includes(channel)) item.channels.push(channel);
    attempts.set(key, item);
  }
  function failed(channel, url, status, message, potentialStatic = false) {
    if (!url || (!externalStatic(url) && !localStatic(url) && !potentialStatic)) return;
    const key = `${channel}:${publicUrl(url)}:${status}`;
    if (!failures.has(key)) failures.set(key, { channel, url: publicUrl(url), status, message: String(message || '').slice(0, 180) });
  }
  function snapshot() {
    const allAttempts = new Map(attempts), allFailures = [...failures.values()], allOrigins = new Set(apiOrigins);
    const counts = { ...resources, byType: { ...resources.byType } };
    for (const frame of frames.values()) {
      for (const item of frame.attempts || []) if (!allAttempts.has(item.url)) allAttempts.set(item.url, item);
      allFailures.push(...(frame.failures || []));
      for (const origin of frame.apiOrigins || []) allOrigins.add(origin);
      for (const key of ['total', 'local', 'externalStatic', 'otherExternal']) counts[key] += frame.resources?.[key] || 0;
      for (const [key, value] of Object.entries(frame.resources?.byType || {})) counts.byType[key] = (counts.byType[key] || 0) + value;
    }
    return {
      elapsed: Math.floor((performance.now() - started) / 1000), staticExternalAttempts: allAttempts.size,
      failures: allFailures.slice(-50), apiOrigins: [...allOrigins].sort(), resources: counts,
      attempts: [...allAttempts.values()].slice(-50), auditedFrames: frames.size,
      coverage: 'Document fetch/XHR, resource timing and CSP; same-origin audited frames are included.',
    };
  }
  function render() {
    const output = auditElement || document.getElementById('mchose-network-audit');
    if (!output) return;
    const data = snapshot();
    const text = JSON.stringify(data, null, 2);
    // Keep React/Next's body and framed Flight text byte-for-byte untouched.
    if (text !== rendered) { rendered = text; output.setAttribute('data-report', text); }
    if (window.parent && window.parent !== window) window.parent.postMessage({ __mchoseQaNetworkAudit: 1, scope, data }, ownOrigin);
  }
  window.fetch = async (input, options) => {
    const url = urlOf(input); observeService(url);
    if (externalStatic(url)) { attempted('fetch-blocked', url); failed('fetch-blocked', url, 0, 'External factory static request blocked by local audit.'); render(); throw new TypeError('QA blocked external static resource: ' + publicUrl(url)); }
    try {
      const response = await nativeFetch(input, options);
      if (response.status >= 400) failed('fetch', url, response.status, response.statusText);
      render(); return response;
    } catch (error) { failed('fetch', url, 0, error.message); render(); throw error; }
  };
  XMLHttpRequest.prototype.open = function (method, value, ...rest) {
    const url = urlOf(value); observeService(url);
    if (externalStatic(url)) { attempted('xhr-blocked', url); failed('xhr-blocked', url, 0, 'External factory static request blocked by local audit.'); render(); throw new DOMException('QA blocked external static resource.', 'SecurityError'); }
    xhrState.set(this, url);
    this.addEventListener('loadend', () => {
      const current = xhrState.get(this);
      if (this.status === 0 || this.status >= 400) failed('xhr', current, this.status, this.statusText || 'XHR failed');
      render();
    }, { once: true });
    return nativeOpen.call(this, method, value, ...rest);
  };
  function resource(entry) {
    const key = `${entry.name}:${entry.startTime}:${entry.duration}:${entry.initiatorType}`;
    if (observedResources.has(key)) return;
    observedResources.add(key);
    const url = urlOf(entry.name); if (!url || !/^https?:$/.test(url.protocol)) return;
    resources.total++;
    const type = entry.initiatorType || 'other'; resources.byType[type] = (resources.byType[type] || 0) + 1;
    if (url.origin === ownOrigin) resources.local++;
    else if (externalStatic(url)) { resources.externalStatic++; attempted('resource', url); }
    else resources.otherExternal++;
    observeService(url);
    if (entry.responseStatus >= 400) failed('resource', url, entry.responseStatus, 'Resource response failed');
  }
  for (const entry of performance.getEntriesByType('resource')) resource(entry);
  try { new PerformanceObserver(list => { for (const entry of list.getEntries()) resource(entry); render(); }).observe({ type: 'resource', buffered: true }); } catch {}
  window.addEventListener('securitypolicyviolation', event => {
    const url = urlOf(event.blockedURI); observeService(url);
    // Browsers may redact a cross-origin blockedURI to its origin. Dedicated
    // distribution origins still identify a potential static request; mixed
    // manufacturer API origins do not, avoiding false account/API failures.
    const originOnlyStatic = url && url.origin !== ownOrigin && url.pathname === '/' && !url.search
      && ['cdn.mchose.com.cn', 'www.mchose.com.cn', 'mchose.com.cn', 'ioss.maicong.cn', 'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com'].includes(url.hostname);
    if (externalStatic(url) || originOnlyStatic) { attempted('csp:' + event.effectiveDirective, url, originOnlyStatic); failed('csp', url, 0, event.effectiveDirective, originOnlyStatic); }
    render();
  });
  window.addEventListener('error', event => {
    const target = event.target;
    const url = urlOf(target?.currentSrc || target?.src || target?.href || '');
    if (target && target !== window) { attempted('element-error', url); failed('element', url, 0, target.tagName || 'Resource element failed'); }
    render();
  }, true);
  window.addEventListener('message', event => {
    if (event.origin !== ownOrigin || event.data?.__mchoseQaNetworkAudit !== 1 || event.data.scope !== scope || !event.data.data) return;
    if (frames.size < 20 || frames.has(event.source)) frames.set(event.source, event.data.data);
    render();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  render(); setInterval(render, 1000);
})();
