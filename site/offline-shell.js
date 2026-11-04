(() => {
  'use strict';
  const script = document.currentScript;
  const base = new URL('./', script?.src || document.baseURI);
  const bar = document.createElement('aside');
  bar.id = 'mchose-offline-status';
  bar.dataset.state = 'loading';
  bar.setAttribute('aria-label', '離線版狀態');
  const dot = document.createElement('span'); dot.className = 'offline-dot'; dot.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span'); label.className = 'offline-label'; label.textContent = '非官方離線版';
  const message = document.createElement('span'); message.className = 'offline-message'; message.setAttribute('role', 'status'); message.setAttribute('aria-live', 'polite');
  const retry = document.createElement('button'); retry.type = 'button'; retry.hidden = true; retry.textContent = '重試快取';
  bar.append(dot, label, message, retry);
  document.body.append(bar);
  let registration;
  let lastProgress = -1;
  function setState(state, text, allowRetry = false) {
    bar.dataset.state = state; message.textContent = text; retry.hidden = !allowRetry;
  }
  function acceptStatus(data) {
    if (!data || !String(data.type || '').startsWith('MCHOSE_OFFLINE_')) return;
    if (data.type === 'MCHOSE_OFFLINE_PROGRESS') {
      const percent = data.total ? Math.floor(data.loaded / data.total * 100) : 0;
      if (percent === lastProgress && data.loaded !== data.total) return;
      lastProgress = percent;
      setState('loading', `完整離線快取下載中 ${percent}%（${data.loaded}/${data.total}）`);
    } else if (data.type === 'MCHOSE_OFFLINE_READY' || (data.type === 'MCHOSE_OFFLINE_STATUS' && data.ready)) {
      setState('ready', `完整快取已就緒，可斷網使用 · ${String(data.version).slice(0, 8)}`);
    } else if (data.type === 'MCHOSE_OFFLINE_ERROR') {
      setState('error', `離線快取未完成：${data.message || '請確認本站檔案完整及磁碟空間'}`, true);
    } else if (data.type === 'MCHOSE_OFFLINE_STATUS' && !data.ready) {
      setState('error', '離線快取不完整；本機檔案仍可使用，請重試快取', true);
    }
  }
  function requestStatus() {
    const worker = registration?.active || navigator.serviceWorker.controller;
    if (worker) worker.postMessage({ type: 'MCHOSE_OFFLINE_GET_STATUS' });
  }
  retry.addEventListener('click', async () => {
    retry.hidden = true; lastProgress = -1;
    setState('loading', '正在重新建立完整離線快取…');
    try {
      if (registration?.active) registration.active.postMessage({ type: 'MCHOSE_OFFLINE_REPAIR' });
      else { registration = await navigator.serviceWorker.register(new URL('sw.js', base), { scope: base.pathname, updateViaCache: 'none' }); await registration.update(); }
    } catch (error) { setState('error', `無法建立快取：${error.message}`, true); }
  });
  if (!('serviceWorker' in navigator) || !window.isSecureContext) {
    setState('error', '請使用 Chrome／Edge，從本機啟動器或 HTTPS 網址開啟；無法建立離線快取');
    return;
  }
  setState('loading', '正在檢查完整離線快取…');
  navigator.serviceWorker.addEventListener('message', event => {
    const sourceUrl = event.source?.scriptURL;
    if (sourceUrl && new URL(sourceUrl).href !== new URL('sw.js', base).href) return;
    acceptStatus(event.data);
  });
  navigator.serviceWorker.addEventListener('controllerchange', requestStatus);
  navigator.serviceWorker.register(new URL('sw.js', base), { scope: base.pathname, updateViaCache: 'none' })
    .then(value => {
      registration = value;
      if (value.active) requestStatus();
      if (value.waiting) setState('ready', '新版本完整快取已下載；關閉本站分頁後重新開啟即可使用');
      value.addEventListener('updatefound', () => {
        const installing = value.installing;
        installing?.addEventListener('statechange', () => {
          if (installing.state === 'redundant') setState('error', '完整快取下載失敗，請重試；目前頁面仍可使用', true);
          if (installing.state === 'installed' && value.active && value.waiting) setState('ready', '新版本完整快取已下載；關閉本站分頁後重新開啟即可使用');
        });
      });
    })
    .catch(error => setState('error', `離線快取未啟用：${error.message}`, true));
})();
