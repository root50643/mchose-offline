import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const snapshots = path.join(root, 'snapshots');
const urlMap = JSON.parse(await fs.readFile(path.join(snapshots, 'url-map.json'), 'utf8'));
const manifest = JSON.parse(await fs.readFile(path.join(snapshots, 'source-manifest.json'), 'utf8'));
const report = { generatedAt: new Date().toISOString(), patches: [], resources: [], skipped: [] };
const resourceHosts = [...new Set(Object.keys(urlMap).map(url => new URL(url).host))];
const resourceOrigins = resourceHosts.flatMap(host => [`https://${host}`, `http://${host}`, `//${host}`]);
const missingResources = Object.fromEntries((manifest.files || []).filter(item => item.status === 'error' && item.sitePath).map(item => [decodeURIComponent(item.sitePath), { sourceUrl: item.sourceUrl || item.url, error: item.error || 'Unavailable upstream' }]));
report.missingResources = missingResources;
const firmwareFiles = {};
for (const item of manifest.files || []) if (item.status === 'ok' && /\.bin$/i.test(item.sitePath || '')) firmwareFiles[decodeURIComponent(item.sitePath)] = { bytes: item.bytes, sha256: item.sha256 };
const configs = {};
for (const name of ['global', 'cardList', 'mouseConfig', 'newMouseConfig']) {
  configs[name] = JSON.parse(await fs.readFile(path.join(snapshots, 'config', `${name}.json`), 'utf8'));
}
configs.keyboardConfig = {};
// The device engine still initializes CZ, but no keyboard or audio products enter its catalog.
if (Array.isArray(configs.cardList)) configs.cardList = configs.cardList.filter(item => [2, 5].includes(item?.webdriverEnum?.deviceType ?? item?.deviceType));
else if (Array.isArray(configs.cardList?.data)) configs.cardList.data = configs.cardList.data.filter(item => [2, 5].includes(item?.webdriverEnum?.deviceType ?? item?.deviceType));
configs.global.refreshTime = -1;
configs.global.customFields ||= {};
configs.global.customFields.headerBtnConfigs = [];
configs.global.customFields.isRemoteLang = false;
configs.global.customFields.gtConfig = {};
configs.global.customFields.firstGuide = Object.fromEntries(Object.entries(configs.global.customFields.firstGuide || {}).filter(([name]) => /A7|A5|K7|K5|M7|L7|G3|V7|R7|AX5|MagDock/i.test(name)));
let officialTemplates = {};
try { officialTemplates = JSON.parse(await fs.readFile(path.join(snapshots, 'official-templates.json'), 'utf8')); } catch {}
const firmwareBundles = {};
for (const [name, config] of Object.entries(configs.newMouseConfig)) firmwareBundles[name] = Object.values(config).filter(value => typeof value === 'string' && /\.bin$/i.test(value)).map(value => value.startsWith('http') ? value : 'https://cdn.mchose.com.cn/' + value);
for (const [name, config] of Object.entries(configs.mouseConfig)) {
  const files = typeof config === 'string' ? ['offer', 'payload'].map(kind => `https://cdn.mchose.com.cn/configCenter/public/newBin/${encodeURIComponent(config)}.${kind}.bin`) : [config.offer, config.payload].filter(Boolean).map(value => value.startsWith('http') ? value : 'https://cdn.mchose.com.cn/' + value);
  firmwareBundles[name] ||= files;
}
firmwareBundles['MCHOSE MagDock'] = ['https://cdn.mchose.com.cn/configCenter/public/newBin/MagDock0004.bin'];

function replaceOnce(text, before, after, label) {
  const at = text.indexOf(before);
  if (at < 0 || text.indexOf(before, at + before.length) >= 0) throw new Error(`Expected exactly one patch anchor: ${label}`);
  report.patches.push(label);
  return text.slice(0, at) + after + text.slice(at + before.length);
}

function walk(node, visit, parent = null) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') visit(node, parent);
  for (const [key, value] of Object.entries(node)) {
    if (key === 'start' || key === 'end') continue;
    if (Array.isArray(value)) for (const item of value) walk(item, visit, node);
    else if (value && typeof value === 'object') walk(value, visit, node);
  }
}

function edit(text, edits) {
  edits.sort((a, b) => b.start - a.start);
  let last = text.length;
  for (const item of edits) {
    if (item.end > last) throw new Error('Overlapping source patches');
    text = text.slice(0, item.start) + item.text + text.slice(item.end);
    last = item.start;
  }
  return text;
}

function replaceBodies(text, bodyMap) {
  const edits = [];
  const found = new Set();
  const ast = parse(text, { ecmaVersion: 'latest', sourceType: 'module' });
  walk(ast, node => {
    if (node.type !== 'FunctionDeclaration' || !node.id || !Object.hasOwn(bodyMap, node.id.name)) return;
    edits.push({ start: node.body.start + 1, end: node.body.end - 1, text: bodyMap[node.id.name] });
    found.add(node.id.name);
  });
  for (const name of Object.keys(bodyMap)) {
    if (!found.has(name)) throw new Error(`Missing upstream function for patch: ${name}`);
    report.patches.push(`function:${name}`);
  }
  return edit(text, edits);
}

function replaceInitializers(text, initializers) {
  const edits = [], found = new Set();
  walk(parse(text, { ecmaVersion: 'latest', sourceType: 'module' }), node => {
    if (node.type !== 'VariableDeclarator' || !node.id?.name || !Object.hasOwn(initializers, node.id.name)) return;
    edits.push({ start: node.init.start, end: node.init.end, text: initializers[node.id.name] });
    found.add(node.id.name);
  });
  for (const name of Object.keys(initializers)) {
    if (!found.has(name)) throw new Error(`Missing upstream initializer: ${name}`);
    report.patches.push(`initializer:${name}`);
  }
  return edit(text, edits);
}

function rewriteJavaScript(text, file) {
  let ast;
  try { ast = parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true }); }
  catch (error) { throw new Error(`${file}: ${error.message}; context: ${text.slice(error.pos - 150, error.pos + 150)}`, { cause: error }); }
  const edits = [];
  let count = 0;
  const originsPattern = new RegExp(resourceOrigins.map(origin => origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length).join('|'), 'g');
  walk(ast, (node, parent) => {
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'fetch' && node.arguments[0]?.type === 'Literal' && /^chrome-extension:\/\//.test(node.arguments[0].value)) {
      // Browser-brand fingerprinting is unrelated to the key tester. Preserve
      // the library's existing rejection/catch path without issuing a request.
      edits.push({ start: node.start, end: node.end, text: 'Promise.reject(new TypeError("Extension detection is disabled in offline mode."))' });
      report.patches.push(`disable extension probe:${file}:${node.arguments[0].value}`);
    } else if (node.type === 'Literal' && typeof node.value === 'string') {
      const value = node.value;
      if (!resourceOrigins.some(origin => value.includes(origin))) return;
      if ((parent?.type === 'Property' || parent?.type === 'MethodDefinition') && parent.key === node && !parent.computed) return;
      if (parent?.type === 'ImportDeclaration' || parent?.type?.startsWith('Export')) {
        const target = urlMap[value.split(/[?#]/)[0]];
        if (!target) throw new Error(`Unmirrored static import ${value}`);
        let relative = path.posix.relative(path.posix.dirname(file), target);
        if (!relative.startsWith('.')) relative = './' + relative;
        edits.push({ start: node.start, end: node.end, text: JSON.stringify(relative) });
      } else {
        let expression;
        if (resourceOrigins.some(origin => value.startsWith(origin)) && !/[\s<>"']/.test(value)) {
          expression = `window.__mchoseOffline.${resourceOrigins.includes(value) ? 'resourceOrigin' : 'resourceUrl'}(${JSON.stringify(value)})`;
        } else {
          const parts = []; let offset = 0;
          for (const match of value.matchAll(originsPattern)) {
            parts.push(JSON.stringify(value.slice(offset, match.index)), `window.__mchoseOffline.resourceOrigin(${JSON.stringify(match[0])})`);
            offset = match.index + match[0].length;
          }
          parts.push(JSON.stringify(value.slice(offset)));
          expression = `(${parts.join('+')})`;
        }
        edits.push({ start: node.start, end: node.end, text: expression });
      }
      count++;
    } else if (node.type === 'TemplateElement') {
      const raw = node.value.raw;
      if (!resourceOrigins.some(origin => raw.includes(origin))) return;
      const localized = raw.replace(originsPattern, match => '${window.__mchoseOffline.resourceOrigin(' + JSON.stringify(match) + ')}');
      edits.push({ start: node.start, end: node.end, text: localized });
      count++;
    }
  });
  report.resources.push({ file, rewrites: count });
  return edit(text, edits);
}

const diagnosticBinding = `window.__mchoseOffline.bindHidDiagnostics({testDpi:async()=>{
 const result={status:'running',passed:false,before:null,changed:null,readBack:null,restored:null};
 const device=navigator.device;
 if(!device||device.vendorId!==14391||device.productId!==4120||!device.productName.includes('A7 V3 Ultra+')) throw new Error('請先連接 A7 V3 Ultra+（VID 3837 / PID 1018）。');
 if(state$6.progressVisible) throw new Error('韌體更新中無法測試。');
 const before=await readMouseAllInfo(); result.before=JSON.parse(JSON.stringify(before));
 const profileIndex=before.profileIndex, index=before.usbDpiIndex, key='dpi'+index;
 const dpiMax=mouseDiffConfig[removeRealTek(device.productName)]?.dpiMax;
 if(!Number.isInteger(dpiMax)||dpiMax<200||dpiMax>65535) throw new Error('找不到此型號的有效 DPI 上限，未進行寫入。');
 const validDpi=value=>Number.isInteger(value)&&value>=200&&value<=dpiMax;
 const validValues=Array.from({length:6},(_,i)=>before['dpi'+i]).every(validDpi)&&(before.dpiHasY!==1||Array.from({length:6},(_,i)=>before['dpiY'+i]).every(validDpi));
 if(!Number.isInteger(profileIndex)||profileIndex<0||profileIndex>2||!Number.isInteger(before.dpiSum)||before.dpiSum<1||before.dpiSum>6||![0,1].includes(before.dpiHasY)||!Number.isInteger(index)||index<0||index>=before.dpiSum||!validValues) throw new Error('裝置回傳的完整 DPI 快照無效，未進行寫入。');
 const temporary=before[key]+100<=dpiMax?before[key]+100:before[key]-100;
 const changed={...before,[key]:temporary}; result.changed=changed;
 const dpiKeys=['profileIndex','dpiSum','usbDpiIndex','dpiHasY',...Array.from({length:6},(_,i)=>'dpi'+i),...(before.dpiHasY===1?Array.from({length:6},(_,i)=>'dpiY'+i):[])];
 const equivalent=(a,b)=>dpiKeys.every(k=>Number(a[k])===Number(b[k]));
 let attempted=false,readVerified=false,restoreVerified=false;
 try{
  attempted=true; await setDpiInfo(changed,device);
  result.readBack=await readDpiInfo({profileIndex},device);
  readVerified=equivalent(changed,result.readBack);
  if(!readVerified) throw new Error('暫時 DPI 寫入後讀回不符。');
 }catch(error){result.error=error?.message||String(error);}
 finally{
  if(attempted){try{
   await setDpiInfo(before,device);
   result.restored=await readDpiInfo({profileIndex},device);
   result.afterPerformance=await readPerformanceInfo(device);
   restoreVerified=equivalent(before,result.restored)&&result.afterPerformance.profileIndex===profileIndex&&result.afterPerformance.usbDpiIndex===index;
   if(!restoreVerified) result.restoreError='還原後 DPI 讀回不符。';
  }catch(error){result.restoreError=error?.message||String(error);}}
 }
 result.passed=readVerified&&restoreVerified;
 result.status=result.passed?'passed':'failed';
 result.externalAttempts=window.__mchoseOffline.network.blockedExternalAttempts;
 return result;
}});`;

function patchMain(text) {
  text = replaceBodies(text, {
    trackInit: 'initialized$1=!0;return;',
    _track: 'return;',
    trackElementClick: 'return;',
    getApiBaseUrl: 'return window.__mchoseOffline.apiBase;',
    getMemberUserApiBaseUrl: 'return window.__mchoseOffline.apiBase;',
    getCurrentApiConfig: 'return {...API_CONFIGS.production,baseUrl:window.__mchoseOffline.apiBase,enableLog:!1,retryCount:0};',
    getAuthToken: 'return "";',
    getAuthUser: 'return {};',
    getUserData: 'return {clientId:"offline"};',
    createHomeAdvertisementMock: 'return {};',
    loadConfigFromUrl: `const name=extractFileBaseName(ea),saved=window.__mchoseOffline.getConfig(name);if(saved!==undefined)return saved;const url=window.__mchoseOffline.resourceUrl(buildCdnConfigUrl(ea));const response=await fetch(url,{credentials:'omit'});if(!response.ok)throw new Error('Offline config unavailable: '+name);let value=await response.json();if(value.__compressBase64__)value=await smartDecompressJSON(value);return window.__mchoseOffline.localize(value);`,
  });
  text = replaceInitializers(text, {
    getFeedbackConfig: 'async()=>({code:200,data:null,offline:!0})',
    getFeedbackConfigDetail: 'async()=>({code:200,data:null,offline:!0})',
    loadAudioOtaAppConfig: 'async()=>({})',
    HeaderUserAction: '{render:()=>null}',
    DownloadClient: '{render:()=>null}',
    AUDIO_WEB_ORIGIN: 'window.location.origin',
  });
  text = replaceOnce(text, 'otaStart=async(ea,ta,na)=>{const ra=', 'otaStart=async(ea,ta,na)=>{await window.__mchoseOffline.preflightFirmware([ea,navigator.device,navigator.device2]);const ra=', 'preflight new mouse and receiver firmware');
  text = replaceOnce(text, 'Vr=async Cr=>{const Er=await(await fetch(Cr)).arrayBuffer();return[...new Uint8Array(Er)].map(kr=>kr.toString(16).padStart(2,"0"))}', 'Vr=async Cr=>[...await window.__mchoseOffline.readFirmware(Cr)].map(kr=>kr.toString(16).padStart(2,"0"))', 'verify legacy offer and payload contents');
  text = replaceOnce(text, 'gi=async()=>{var ur,yr;await ta.start([navigator.device,navigator.device2,...Fa?[magDockDInfo$1]:[]])', 'gi=async()=>{var ur,yr;await window.__mchoseOffline.preflightFirmware([navigator.device,navigator.device2,...Fa?[magDockDInfo$1]:[]]);await ta.start([navigator.device,navigator.device2,...Fa?[magDockDInfo$1]:[]])', 'preflight complete legacy update before device changes');
  text = replaceOnce(text, 'initSocket=async()=>{if(reconnectFailureTier', 'initSocket=async()=>{return;if(reconnectFailureTier', 'disable WebSocket initialization');
  text = replaceOnce(text, 'sendTrackingData=async ea=>{try{', 'sendTrackingData=async ea=>{return;try{', 'disable queued WebSocket telemetry');
  text = replaceOnce(text, 'setFinalDeviceList(ea){this.finalDeviceList=lodashExports.uniqBy(ea.filter(ta=>ta.vendorId!=null&&ta.productId!=null)', 'setFinalDeviceList(ea){this.finalDeviceList=lodashExports.uniqBy(ea.filter(ta=>[DEVICETYPE.MOUSE,DEVICETYPE.MOUSE_DOCK].includes(ta.deviceType)&&ta.vendorId!=null&&ta.productId!=null)', 'filter device catalog to mice and docks');
  text = replaceOnce(text, 'czRemoteConfigList.modifyDeviceList(deviceList);', 'czRemoteConfigList.modifyDeviceList(deviceList);deviceList.keyboard=[];deviceList.audio=[];', 'remove keyboard and audio category entries');
  text = replaceOnce(text, 'fa=computed(()=>(ta.primaryActions??ua.value).filter(Ca=>Ca!=="lightSync"||aa))', 'fa=computed(()=>(ta.primaryActions??ua.value).filter(Ca=>!["cloud","mall","lightSync"].includes(Ca)))', 'remove cloud and store header actions');
  text = replaceOnce(text, 'pa=computed(()=>(ta.utilityActions??da.value).filter(Ca=>Ca!=="lightSync"||aa))', 'pa=computed(()=>(ta.utilityActions??da.value).filter(Ca=>!["user","reload","updater","lightSync"].includes(Ca)))', 'remove server account and updater utility actions');
  text = replaceOnce(text, 'ea.showClientDownload&&!na.value?', '!1?', 'remove desktop client download entry');
  text = replaceOnce(text, 'createAudioHidAuthorizationFilters(),{vendorId:', '[],{vendorId:', 'remove audio HID authorization filters');
  // Disable login launch points while retaining local template persistence.
  text = replaceOnce(text, 'openLogin:ea=>getRuntime().openLogin(ea)', 'openLogin:ea=>window.__mchoseOffline.disabledFeature()', 'disable login');
  text = replaceOnce(text, 'openAccount:(ea,ta)=>getRuntime().openAccount(ea,ta)', 'openAccount:(ea,ta)=>window.__mchoseOffline.disabledFeature()', 'disable account dialog');
  text = replaceOnce(text, 'setShowCloudCommunity(ea){let ta=', 'setShowCloudCommunity(ea){this.showCloudCommunity=!1;return;let ta=', 'disable community dialog');
  text = replaceOnce(text, 'isLoggedIn:ea=>{var ta;return ea.sessionStatus==="authenticated"&&!!((ta=ea.user)!=null&&ta.token)}', 'isLoggedIn:()=>!1', 'disable authenticated state');
  text = replaceOnce(text, 'deviceSystem.start().then(()=>{va.acceptAudioSnapshot(Ca.value,{initialized:!0})})', 'Promise.resolve().then(()=>{va.acceptAudioSnapshot([],{initialized:!0})})', 'disable audio device enumeration');
  text = replaceOnce(text, 'await authService.initialize(),window.addEventListener("pagehide"', 'useAuthStore().$reset(),await authService.initialize(),window.addEventListener("pagehide"', 'force offline session');
  text = replaceOnce(text, 'window.$router=router}', `window.$router=router;${diagnosticBinding}}`, 'bind explicit DPI diagnostics');
  return text;
}

function patchHtml(text) {
  text = text.replace(/<meta (?:property="og:image"|name="twitter:image")[^>]+>/g, '');
  text = text.replace(/<script src="https:\/\/cdn\.mchose\.com\.cn\/configCenter\/config\/globalLoader\.js"[^>]*><\/script>/, '<script src="./offline-runtime.js"></script>');
  // The original loader uses document.write after an async callback. Use ordered local scripts.
  text = text.replace(/    <script>\s*\(function \(\) \{[\s\S]*?    <\/script>/, `    <link rel="stylesheet" href="./vendor/cdn.mchose.com.cn/customPage/driver-ui/driver-ui.css">\n    <script src="./vendor/cdn.mchose.com.cn/customPage/driver-ui/driver-ui.global.js"></script>\n    <script src="./vendor/cdn.mchose.com.cn/customPage/driver-ui/vue/driver-ui.vue.js"></script>`);
  text = text.replace(/    <script>\s*\/\/ 注销 Service Worker[\s\S]*?    <\/script>/, '');
  text = text.replace('<head>', `<head>\n    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">\n    <link rel="stylesheet" href="./offline-shell.css">\n    <script src="./offline-shell.js" defer></script>`);
  text = text.replace('M HUB 迈从科技 官方驱动', 'M HUB 滑鼠離線版');
  return text;
}

const entries = Object.entries(urlMap);
for (const [url, sitePath] of entries) {
  const parsed = new URL(url);
  const upstreamPath = path.join(root, 'upstream', parsed.host, ...decodeURIComponent(parsed.pathname).split('/').filter(Boolean));
  let input = upstreamPath;
  if (parsed.pathname === '/') input = path.join(upstreamPath, 'index.html');
  const ext = path.extname(sitePath).toLowerCase();
  if (!['.js', '.mjs', '.css', '.html'].includes(ext)) continue;
  let text;
  try { text = await fs.readFile(input, 'utf8'); } catch { report.skipped.push({ url, reason: 'upstream file absent' }); continue; }
  if (sitePath === 'index.html') text = patchHtml(text);
  else if (/\/globalLoader\.js$/.test(sitePath)) {
    text = '/* Frozen offline config. The original loader is archived under upstream/. */\nwindow.__mchoseOffline.installConfig("global",window.__mchoseOffline.getConfig("global"));\n';
  } else if (ext === '.js' || ext === '.mjs') {
    if (text.includes('async function initializeApp()') && text.includes('window.readMouseAllInfo=')) text = patchMain(text);
    text = rewriteJavaScript(text, sitePath);
    try { parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true }); }
    catch (error) { throw new Error(`${sitePath} after URL rewrite: ${error.message}; context: ${text.slice(error.pos - 150, error.pos + 150)}`, { cause: error }); }
  } else if (ext === '.css') {
    text = text.replace(/url\(\s*(['"]?)(https?:\/\/[^)'"\s]+|\/\/[^)'"\s]+)\1\s*\)/g, (whole, quote, raw) => {
      const full = raw.startsWith('//') ? 'https:' + raw : raw;
      const target = urlMap[full.split(/[?#]/)[0]];
      if (!target) return whole;
      let relative = path.posix.relative(path.posix.dirname(sitePath), target);
      if (!relative.startsWith('.')) relative = './' + relative;
      return `url(${JSON.stringify(relative)})`;
    });
    text = text.replace(/@import\s*(['"])(https?:\/\/[^'"]+|\/\/[^'"]+)\1/g, (whole, quote, raw) => {
      const full = raw.startsWith('//') ? 'https:' + raw : raw;
      const target = urlMap[full.split(/[?#]/)[0]];
      if (!target) return whole;
      let relative = path.posix.relative(path.posix.dirname(sitePath), target);
      if (!relative.startsWith('.')) relative = './' + relative;
      return '@import ' + JSON.stringify(relative);
    });
    text = text.replace(/https?:\/\/[^\s'"()<>;]+/g, raw => {
      let parsed;
      try { parsed = new URL(raw); } catch { return raw; }
      if (!resourceHosts.includes(parsed.host)) return raw;
      const canonical = parsed.origin + parsed.pathname;
      const target = urlMap[canonical];
      if (!target) {
        report.resources.push({ file: sitePath, omittedBackground: raw });
        return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      }
      let relative = path.posix.relative(path.posix.dirname(sitePath), target);
      return relative.startsWith('.') ? relative : './' + relative;
    });
  }
  const output = path.join(site, sitePath);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, text);
}
// Human-readable deployment configs; the runtime supplies origin-correct values to the app.
const staticLocalize = value => {
  if (typeof value === 'string') {
    const target = urlMap[value.split(/[?#]/)[0]];
    return target ? './' + target : value;
  }
  if (Array.isArray(value)) return value.map(staticLocalize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, staticLocalize(item)]));
  return value;
};
for (const [name, value] of Object.entries(configs)) {
  const source = name === 'global' ? 'config' : 'custom';
  await fs.writeFile(path.join(site, 'vendor', 'cdn.mchose.com.cn', 'configCenter', source, name + '.json'), JSON.stringify(staticLocalize(value)));
}
const template = await fs.readFile(path.join(root, 'tools', 'offline-runtime.template.js'), 'utf8');
const runtime = template.replace('/*__OFFLINE_DATA__*/{}', () => JSON.stringify({ urlMap, resourceHosts, configs, officialTemplates, firmwareFiles, firmwareBundles, missingResources }));
parse(runtime, { ecmaVersion: 'latest', sourceType: 'script' });
await fs.writeFile(path.join(site, 'offline-runtime.js'), runtime);
await fs.mkdir(path.join(root, 'reports'), { recursive: true });
await fs.writeFile(path.join(root, 'reports', 'patch-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ patched: report.patches.length, files: report.resources.length, skipped: report.skipped.length }));
