(() => {
  'use strict';
  // Served by the local QA server only; never included in the production build.
  // No device access occurs until the existing page's user clicks the button.
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(window.location.hostname)) return;
  if (document.getElementById('qa-hid-readonly')) return;
  const fields = ['profileIndex', 'usbDpiIndex', 'dpiDirection', 'dpiSum', 'dpiHasY', 'usbRateIndex', 'gRateIndex', ...Array.from({ length: 6 }, (_, index) => 'dpi' + index), ...Array.from({ length: 6 }, (_, index) => 'dpiY' + index)];
  const select = value => Object.fromEntries(fields.filter(key => Object.hasOwn(value ?? {}, key)).map(key => [key, value[key]]));
  function uiValues() {
    return [...document.querySelectorAll('.dpi-setting du-input-number,.dpi-setting du-input,.dpi-setting du-slider')].map(element => ({
      tag: element.localName, value: typeof element.value === 'number' || typeof element.value === 'string' ? element.value : null,
      attribute: element.getAttribute('value'),
    }));
  }
  function cachedProfiles(device) {
    try {
      const mouse = JSON.parse(window.localStorage.getItem('mouse') ?? '{}');
      const name = Object.keys(mouse).find(key => key === device.productName) ?? Object.keys(mouse).find(key => key.includes('A7 V3 Ultra+'));
      const entry = name ? mouse[name] : null;
      return { deviceName: name ?? null, templateIndex: entry?.templateIndex ?? null, profiles: (entry?.templateList ?? []).slice(0, 3).map(profile => select(profile)) };
    } catch (error) { return { error: String(error) }; }
  }
  function decodeDpi(payload) {
    if (payload.length < 17) return { error: 'DPI payload is shorter than 17 bytes.' };
    const result = { profileIndex: payload[0], dpiDirection: payload[1], dpiSum: payload[2], usbDpiIndex: payload[3], dpiHasY: payload[4] };
    for (let index = 0; index < 6; index++) result['dpi' + (payload[1] === 0 ? '' : 'Y') + index] = payload[5 + index * 2] | payload[6 + index * 2] << 8;
    return result;
  }
  function mount() {
    const panel = document.createElement('details');
    panel.id = 'qa-hid-readonly'; panel.open = true;
    panel.style.cssText = 'position:fixed;bottom:8px;right:8px;z-index:2147483647;max-width:560px;max-height:55vh;overflow:auto;background:#10151e;color:#fff;border:1px solid #8390a4;border-radius:8px;padding:8px;font:12px monospace';
    const summary = document.createElement('summary'); summary.textContent = '本機 QA：A7 DPI 唯讀封包';
    const button = document.createElement('button'); button.id = 'qa-hid-readonly-run'; button.type = 'button'; button.textContent = '讀取 DPI 與原始回應（不改設定）';
    button.style.cssText = 'margin:8px 0;padding:6px 10px;color:#111;background:#eef3ff;border-radius:4px';
    const output = document.createElement('pre'); output.id = 'qa-hid-readonly-result'; output.style.cssText = 'white-space:pre-wrap;word-break:break-all;margin:0';
    output.textContent = JSON.stringify({ status: 'idle', automaticReads: false, call: 'window.readMouseAllInfo()', hardwareWritesRequested: false });
    panel.append(summary, button, output); document.body.append(panel);
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      const device = navigator.device;
      const result = { status: 'running', mode: 'read-only', call: 'window.readMouseAllInfo()', hardwareWritesRequested: false, frames: [] };
      const render = () => { output.textContent = JSON.stringify(result, null, 2); };
      if (!device || device.vendorId !== 0x3837 || device.productId !== 0x1018 || !device.productName?.includes('A7 V3 Ultra+')) {
        result.status = 'refused'; result.error = 'The existing page must already be connected to A7 V3 Ultra+ VID3837/PID1018.'; render(); return;
      }
      if (typeof window.readMouseAllInfo !== 'function') { result.status = 'refused'; result.error = 'The factory readMouseAllInfo export is not ready.'; render(); return; }
      button.disabled = true;
      result.device = { productName: device.productName, vendorId: device.vendorId, productId: device.productId, opened: device.opened };
      result.uiBefore = uiValues(); result.cacheBefore = cachedProfiles(device);
      const started = performance.now();
      const capture = event => {
        const bytes = Array.from(new Uint8Array(event.data.buffer, event.data.byteOffset, event.data.byteLength));
        if (bytes.length < 7) return;
        const command = bytes[3] | bytes[4] << 8;
        if (![0x0002, 0x0003].includes(command) || result.frames.length >= 100) return;
        const payload = bytes.slice(7);
        const frame = { afterMs: Math.round(performance.now() - started), reportId: event.reportId,
          dataByteOffset: event.data.byteOffset, dataByteLength: event.data.byteLength, bufferByteLength: event.data.buffer.byteLength,
          command: '0x' + command.toString(16).padStart(4, '0'),
          hex: bytes.map(value => value.toString(16).padStart(2, '0')).join(' '), payloadHex: payload.map(value => value.toString(16).padStart(2, '0')).join(' '),
          firstPayloadIsFF: payload[0] === 255 };
        if (command === 0x0003) frame.decodedUsingFactoryOffsets = decodeDpi(payload);
        else frame.profileIndex = payload[0];
        result.frames.push(frame); render();
      };
      device.addEventListener('inputreport', capture);
      const timeout = setTimeout(() => {
        result.status = 'still-awaiting-factory-read'; result.elapsedMs = Math.round(performance.now() - started);
        result.note = 'No extra read or retry was started by QA. The button stays disabled until the factory promise settles.'; render();
      }, 12000);
      render();
      try {
        // This original function reads performance, keys, DPI, LOD, firmware
        // version, and optional adaptive-power information. Its only persistence
        // side effect is the factory's local "mouse" cache update.
        const value = await window.readMouseAllInfo();
        result.decoded = select(value);
        result.dpiValuesValid = Array.from({ length: 6 }, (_, index) => value?.['dpi' + index]).every(value => Number.isInteger(value) && value >= 200 && value <= 50000);
        result.status = 'completed';
      } catch (error) { result.status = 'error'; result.error = { name: error?.name, message: error?.message ?? String(error) }; }
      finally {
        clearTimeout(timeout); device.removeEventListener('inputreport', capture);
        result.elapsedMs = Math.round(performance.now() - started); result.uiAfter = uiValues(); result.cacheAfter = cachedProfiles(device);
        result.ffResponses = result.frames.filter(frame => frame.firstPayloadIsFF).length;
        render(); button.disabled = false;
      }
    });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount, { once: true });
})();
