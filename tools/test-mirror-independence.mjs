import fs from 'node:fs/promises';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { createHash, webcrypto } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { parse } from './vendor/acorn.mjs';

// Real loopback HTTP checks plus an independent source graph. No manufacturer
// requests, browser profile, accounts, user data or HID are used by this test.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const errors = new Set();
const fail = message => errors.add(message);
const digest = value => createHash('sha256').update(value).digest('hex');
const staticPath = /\.(?:html|m?js|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i;
const installerPath = /\.(?:exe|msi|dmg|pkg|rar|7z|psd|apk)$/i;
const report = {
  mode: 'factory-static-independence', generatedAt: new Date().toISOString(), passed: false,
  scope: 'Captured source dependency graph, original nested configurations and actual local HTTP delivery; manufacturer services remain live.',
  browserAndHardwareExecuted: false, precache: false, origins: [], availability: { unavailableAtSource: [], source404: [], sourceEmpty: [], unresolved: [] },
  localHttp: [], nestedConfiguration: [], compressedPresetConsumption: [], servicePassthrough: [], errors: [],
  limitations: ['This does not execute the full UI or issue HID commands. Browser and physical checks are recorded separately.', 'A permanent source 404 is reported as unavailable, never as a working mirrored feature.', 'Live account, OAuth, community, notification and user-upload services are excluded from static independence and are not contacted by this test.'],
};

function visit(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (node.type) callback(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(item => visit(item, callback));
    else if (value && typeof value === 'object') visit(value, callback);
  }
}
function canonical(value, base) {
  try { const url = new URL(value, base); url.search = ''; url.hash = ''; return url.href; } catch { return null; }
}
function permanent404(record) { return /(?:HTTP|status(?:code)?[=: ]*)\s*404\b/i.test(record?.error || ''); }
function provenEmpty(record, dependency) {
  const proof = record?.sourceResponse, reported = dependency?.sourceResponse;
  const emptyMd5 = value => String(value || '').replace(/^W\//, '').replaceAll('"', '').toLowerCase() === 'd41d8cd98f00b204e9800998ecf8427e';
  return dependency?.status === 'upstream-empty' && dependency.usable === false && record?.status !== 'ok'
    && /HTTP 200.*empty body/i.test(record?.error || '')
    && proof?.httpStatus === 200 && proof.contentLength === 0 && emptyMd5(proof.etag)
    && reported?.httpStatus === proof.httpStatus && reported.contentLength === proof.contentLength && emptyMd5(reported.etag)
    && canonical(proof.finalUrl) === canonical(dependency.url);
}
function decodeConfig(bytes) {
  const envelope = JSON.parse(bytes.toString('utf8'));
  if (!envelope || typeof envelope.__compressBase64__ !== 'string') return envelope;
  const zip = Buffer.from(envelope.__compressBase64__, 'base64');
  for (let at = 0; at + 46 <= zip.length; at++) {
    if (zip.readUInt32LE(at) !== 0x02014b50) continue;
    const nameLength = zip.readUInt16LE(at + 28);
    if (zip.subarray(at + 46, at + 46 + nameLength).toString() !== 'data.json') continue;
    const local = zip.readUInt32LE(at + 42), size = zip.readUInt32LE(at + 20), method = zip.readUInt16LE(at + 10);
    if (local + 30 > zip.length || zip.readUInt32LE(local) !== 0x04034b50) throw new Error('Invalid config ZIP local header.');
    const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
    if (start + size > zip.length) throw new Error('Invalid config ZIP bounds.');
    const compressed = zip.subarray(start, start + size);
    const content = method === 8 ? inflateRawSync(compressed, { maxOutputLength: 64 * 1024 * 1024 }) : method === 0 ? compressed : null;
    if (!content) throw new Error('Unsupported config ZIP method: ' + method);
    const { __compressBase64__, ...metadata } = envelope;
    return { ...metadata, ...JSON.parse(content.toString('utf8')) };
  }
  throw new Error('Config ZIP has no data.json entry.');
}
function configResources(value, source, output = [], trail = []) {
  if (typeof value === 'string') {
    let values = [...value.matchAll(/(?:https?:)?\/\/[^\s"'<>`()]+/g)].map(match => match[0]);
    if (/^(?:\/?configCenter(?:-test)?|customPage)\//.test(value)) values.push('https://cdn.mchose.com.cn/' + value.replace(/^\/+/, ''));
    for (const raw of values) {
      const url = canonical(raw, source);
      if (!url || !staticPath.test(new URL(url).pathname) || installerPath.test(new URL(url).pathname) || /[{}]/.test(url)) continue;
      output.push({ url, trail });
    }
  } else if (Array.isArray(value)) value.forEach((item, index) => configResources(item, source, output, [...trail, index]));
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) configResources(item, source, output, [...trail, key]);
  return output;
}
function valueAt(object, trail) { return trail.reduce((current, key) => current?.[key], object); }
async function freePort() {
  const server = net.createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
async function localServer(prefix, run) {
  const port = await freePort();
  const child = spawn(process.execPath, [path.join(root, 'tools/dev-server.mjs'), '--port', String(port), ...(prefix ? ['--prefix', prefix] : [])], { cwd: root, windowsHide: true });
  let output = '';
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Local server did not start: ' + output)), 10000);
      child.stdout.on('data', chunk => { output += chunk; if (output.includes('Local:')) { clearTimeout(timer); resolve(); } });
      child.stderr.on('data', chunk => { output += chunk; });
      child.once('error', reject);
      child.once('exit', code => { clearTimeout(timer); reject(new Error('Local server exited: ' + code)); });
    });
    await run(`http://127.0.0.1:${port}${prefix}/`);
  } finally {
    child.kill();
    await new Promise(resolve => { const timer = setTimeout(resolve, 1000); child.once('close', () => { clearTimeout(timer); resolve(); }); if (child.exitCode !== null) { clearTimeout(timer); resolve(); } });
  }
}
async function each(items, concurrency, callback) {
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) await callback(items[index++]);
  }));
}

try {
  const build = JSON.parse(await fs.readFile(path.join(root, 'reports/mirror-build.json'), 'utf8'));
  report.version = build.version;
  const inventory = new Map(build.files.map(file => [file.path, file]));
  const publishedBytes = build.files.reduce((sum, file) => sum + file.bytes, 0);
  report.publishedFiles = inventory.size; report.publishedBytes = publishedBytes;
  if (publishedBytes >= 1_000_000_000 || publishedBytes !== build.totalBytes) fail('Published site must match its inventory and stay below 1 GB.');
  if (build.precache !== false) fail('The mirror build must not enable precache.');
  for (const file of ['offline-runtime.js', 'offline-shell.js', 'offline-shell.css', 'offline-manifest.json']) if (inventory.has(file)) fail('Retired preload/UI resource remains: ' + file);
  for (const file of build.files) if (file.bytes >= 100_000_000) fail('File exceeds ordinary GitHub file size: ' + file.path);
  const source = new Map(), manifestHashes = {};
  for (const name of ['source-manifest.json', 'mirror-source-manifest.json']) {
    const text = await fs.readFile(path.join(root, 'snapshots', name), 'utf8');
    manifestHashes[name] = digest(text);
    for (const record of JSON.parse(text).files) if (!source.has(record.url) || record.status === 'ok' || source.get(record.url).status !== 'ok') source.set(record.url, record);
  }
  const audit = JSON.parse(await fs.readFile(path.join(root, 'reports/mirror-dependencies.json'), 'utf8'));
  report.sourceAudit = { generatedAt: audit.generatedAt, sourceCount: audit.sourceCount, dependencies: audit.dependencies.length, unresolvedPatterns: audit.unresolvedPatterns.length, scanErrors: audit.scanErrors };
  if (audit.passed !== true) fail('Independent source dependency/component audit has not passed.');
  for (const [name, hash] of Object.entries(manifestHashes)) {
    const expected = audit.manifestHashes?.[name];
    if (expected !== hash) fail('Dependency audit is stale; run node tools/audit-mirror-dependencies.mjs: ' + name);
  }
  if (audit.scanErrors?.length) fail('Independent source audit contains parse/scan errors.');
  if (audit.unresolvedPatterns?.length) fail('Independent source audit contains unresolved resource construction patterns.');
  if (audit.componentCoverage?.passed === false || audit.reactChildCoverage?.passed === false) fail('Factory UI component/child-application dependency coverage has not passed.');
  const required = [
    'https://www.mchose.com.cn/', 'https://www.mchose.com.cn/gmouse/', 'https://www.mchose.com.cn/g7max/',
    'https://www.mchose.com.cn/cizhou/CZ_SHARED_DATA/asset-manifest.json',
    ...['global.json', 'globalLoader.js'].map(name => 'https://cdn.mchose.com.cn/configCenter/config/' + name),
    ...['cardList', 'mouseConfig', 'newMouseConfig', 'keyboardConfig', 'keyboardPreset'].map(name => 'https://cdn.mchose.com.cn/configCenter/custom/' + name + '.json'),
    ...['driver-ui.css', 'driver-ui.global.js', 'vue/driver-ui.vue.js', 'react/driver-ui.react.js'].map(name => 'https://cdn.mchose.com.cn/customPage/driver-ui/' + name),
  ];
  const explicitSeeds = JSON.parse(await fs.readFile(path.join(root, 'snapshots/mirror-discovery-seeds.json'), 'utf8')).urls;
  report.requiredStartupDependencies = required.length; report.explicitDynamicSeeds = explicitSeeds.length;
  for (const url of [...required, ...explicitSeeds]) if (source.get(url)?.status !== 'ok') fail('Required startup/dynamic source is not captured: ' + url);
  for (const dependency of audit.dependencies) {
    const record = source.get(dependency.url);
    if (dependency.status === 'upstream-empty') {
      if (!provenEmpty(record, dependency)) { fail('Empty-source firmware lacks its exact original response proof: ' + dependency.url); continue; }
      const entry = { kind: 'source-empty', usable: false, url: dependency.url, error: record.error, sourceResponse: record.sourceResponse, evidence: dependency.evidence };
      report.availability.unavailableAtSource.push(entry); report.availability.sourceEmpty.push(entry);
      continue;
    }
    if (record?.status === 'ok') continue;
    if (permanent404(record)) {
      const entry = { kind: 'source-404', usable: false, url: dependency.url, error: record.error, evidence: dependency.evidence };
      report.availability.unavailableAtSource.push(entry); report.availability.source404.push(entry);
    }
    else { report.availability.unresolved.push({ url: dependency.url, status: record?.status || dependency.status || 'not-captured', error: record?.error, evidence: dependency.evidence }); fail('Static source closure is incomplete: ' + dependency.url); }
  }

  const runtimeText = await fs.readFile(path.join(site, 'mirror-runtime.js'), 'utf8');
  const storageText = await fs.readFile(path.join(root, 'tools/mirror-storage.js'), 'utf8');
  if (!runtimeText.includes(storageText)) throw new Error('Mirror runtime is stale relative to the storage source; rebuild before this test.');
  const networkRuntime = runtimeText.replace(storageText, '');
  let data;
  visit(parse(networkRuntime, { ecmaVersion: 'latest' }), node => { if (node.type === 'VariableDeclarator' && node.id?.name === 'DATA') data = JSON.parse(networkRuntime.slice(node.init.start, node.init.end)); });
  if (!data?.map || !Object.keys(data.map).length) throw new Error('No generated factory resource map.');
  if (!data.compressed || typeof data.compressed !== 'object') fail('Generated runtime is missing explicit compressed-preset metadata.');
  if (/Optional factory configuration timed out/.test(networkRuntime)) fail('Remove the optional five-second keyboard configuration timeout now that factory files are local.');
  const mapEntries = Object.entries(data.map);
  report.resourceMapEntries = mapEntries.length;
  const activeAuditSources = new Set(audit.inputFiles.map(file => file.url));
  const configRecords = [...source.values()].filter(record => record.status === 'ok' && activeAuditSources.has(record.url) && /\/configCenter(?:-test)?\/(?:config|custom)\/[^/]+\.json$/.test(new URL(record.url).pathname));
  const decoded = [];
  for (const record of configRecords) {
    try {
      const bytes = await fs.readFile(path.join(root, record.upstreamPath));
      decoded.push({ record, value: decodeConfig(bytes), bytes });
    } catch (error) { fail('Original static config cannot be decoded: ' + record.url + ': ' + error.message); }
  }
  report.originalStaticConfigs = decoded.length;
  report.fontAliases = { checked: 0 };
  for (const [url, filename] of mapEntries) {
    if (!/\.(?:woff2?|ttf|otf|eot)$/i.test(new URL(url).pathname)) continue;
    const original = source.get(url), physical = inventory.get(filename);
    if (!original || !physical || original.sha256 !== physical.sha256 || original.bytes !== physical.bytes) fail('Font aliases must point only to byte-identical captured fonts: ' + url);
    else report.fontAliases.checked++;
  }
  for (const dependency of audit.dependencies.filter(item => item.status === 'upstream-empty')) {
    if (data.map[dependency.url] || inventory.has(dependency.sitePath)) fail('Unusable empty-source firmware must not be published as a fake empty artifact: ' + dependency.url);
  }

  for (const prefix of ['', '/mchose-offline']) await localServer(prefix, async base => {
    const calls = { local: 0, manufacturer: [], externalStatic: [] };
    const factoryServices = [
      'https://www.maicong.cn/mchose/official?name=A7V3Ultra%2B',
      'https://www.maicong.cn/mchose/cloud/search',
      'https://www.maicong.cn/app-api/member/user/get',
      'https://serverapi.maicong.cn/user/info',
      'https://chat.maicong.cn/register/client/node',
    ];
    const allowed = new Set(factoryServices);
    async function nativeFetch(input, options) {
      const url = input instanceof Request ? input.url : String(input);
      if (new URL(url, base).origin === new URL(base).origin) { calls.local++; return fetch(input, options); }
      if (allowed.has(url)) { calls.manufacturer.push({ url, method: options?.method || (input instanceof Request ? input.method : 'GET'), body: options?.body }); return new Response(JSON.stringify({ manufacturerServiceFixture: true })); }
      calls.externalStatic.push(url);
      throw new Error('The normal static path attempted an external request: ' + url);
    }
    class Xhr { open() {} }
    const window = { fetch: nativeFetch, location: new URL(base), WebSocket: function () {}, EventSource: function () {}, open() {} };
    const navigator = { sendBeacon() { return true; } };
    const originals = { socket: window.WebSocket, events: window.EventSource, open: window.open, beacon: navigator.sendBeacon };
    const context = vm.createContext({ window, navigator, location: window.location, document: { currentScript: { src: new URL('mirror-runtime.js', base).href } }, fetch: (...args) => window.fetch(...args), XMLHttpRequest: Xhr, URL, Request, Response, Headers, Blob, TextDecoder, ReadableStream, DecompressionStream, crypto: webcrypto, AbortController, DOMException, setTimeout, clearTimeout, console });
    vm.runInContext(networkRuntime, context, { timeout: 5000 });
    const api = window.__mchoseMirror;
    const local = value => {
      try { const url = new URL(value, base); return url.origin === new URL(base).origin && url.pathname.startsWith(new URL(base).pathname); } catch { return false; }
    };
    let capturedChecks = 0, unavailableChecks = 0, nestedChecks = 0;
    await each(mapEntries, 8, async ([url, filename]) => {
      const target = new URL(filename, base).href;
      if (!inventory.has(filename)) { fail('Captured resource map references an absent deployment file: ' + url); return; }
      try {
        let response;
        if (staticPath.test(new URL(url).pathname)) {
          if (!local(api.assetUrl(url))) { fail('Captured static URL still leaves this project: ' + url); return; }
          response = await window.fetch(url, { method: 'HEAD' });
        } else response = await fetch(target, { method: 'HEAD' });
        if (response.status !== 200 || Number(response.headers.get('content-length')) !== inventory.get(filename).bytes) fail('Local static HTTP response differs from captured inventory: ' + url + ' -> ' + response.status);
        else capturedChecks++;
      } catch (error) { fail(error.message); }
    });
    for (const dependency of audit.dependencies) {
      const mapped = api.assetUrl(dependency.url);
      if (!local(mapped)) { fail('Known source dependency can still request an external static server: ' + dependency.url); continue; }
      if (source.get(dependency.url)?.status === 'ok') continue;
      try {
        const response = await window.fetch(dependency.url, { method: 'HEAD' });
        if (response.status !== 404) fail('Unavailable source must remain an honest same-origin 404: ' + dependency.url);
        else unavailableChecks++;
      } catch (error) { fail(error.message); }
    }
    for (const { record, value, bytes } of decoded) {
      const mapped = api.mapResourceData(value);
      for (const dependency of configResources(value, record.url)) {
        const hostname = new URL(dependency.url).hostname;
        const factoryStatic = hostname === 'cdn.mchose.com.cn' || (hostname === 'www.mchose.com.cn' && /^\/(?:assets|cizhou|gmouse|g7max)\//.test(new URL(dependency.url).pathname));
        if (!factoryStatic && !data.map[dependency.url] && !audit.dependencies.some(item => item.url === dependency.url)) continue;
        const target = api.assetUrl(dependency.url);
        if (!local(target)) { fail('Nested static configuration resource still leaves the project: ' + dependency.url); continue; }
        const actual = valueAt(mapped, dependency.trail);
        if (typeof actual !== 'string' || !actual.includes(target)) fail('Decoded config DOM value bypasses static mapping: ' + record.url + ' @ ' + dependency.trail.join('.'));
        nestedChecks++;
      }
      try {
        const response = await window.fetch(record.url);
        const served = Buffer.from(await response.arrayBuffer());
        if (response.status !== 200 || !served.equals(bytes)) fail('Static config HTTP must preserve the original bytes/envelope: ' + record.url);
      } catch (error) { fail(error.message); }
    }
    let compressedChecks = 0, autoDecodedChecks = 0, logicalBytes = 0, compressedBytes = 0;
    const presetIndex = decoded.find(item => item.record.url === 'https://cdn.mchose.com.cn/configCenter/custom/keyboardPreset.json');
    const mappedPresetIndex = presetIndex ? api.mapResourceData(presetIndex.value) : null;
    for (const [physicalPath, metadata] of Object.entries(data.compressed || {})) {
      const original = source.get(metadata.sourceUrl), physical = inventory.get(physicalPath);
      if (!original || !physical || data.map[metadata.sourceUrl] !== physicalPath) { fail('Compressed preset metadata is not linked to its exact logical source and physical inventory: ' + physicalPath); continue; }
      if (/\/configCenter(?:-test)?\/(?:config|custom)\/[^/]+\.json$/.test(new URL(metadata.sourceUrl).pathname)) fail('Core factory config envelopes must not be replaced by compressed deployment payloads: ' + metadata.sourceUrl);
      try {
        const originalBytes = await fs.readFile(path.join(root, original.upstreamPath));
        if (metadata.bytes !== originalBytes.length || metadata.sha256 !== digest(originalBytes) || metadata.sha256 !== original.sha256) fail('Compressed preset original hash/length differs from the captured source: ' + metadata.sourceUrl);
        const indexEntry = presetIndex && Object.entries(presetIndex.value).find(([, value]) => typeof value === 'string' && canonical(value) === canonical(metadata.sourceUrl));
        if (!indexEntry) { fail('Compression must be limited to payload URLs declared by the factory keyboard preset index: ' + metadata.sourceUrl); continue; }
        const requestUrl = mappedPresetIndex[indexEntry[0]];
        if (!local(requestUrl) || new URL(requestUrl, base).pathname !== new URL(physicalPath, base).pathname) fail('Factory preset index does not resolve to its declared compressed payload: ' + metadata.sourceUrl);
        const response = await window.fetch(requestUrl);
        if (response.status !== 200 || Number(response.headers.get('content-length')) !== physical.bytes) fail('Compressed preset physical HTTP response differs from the build inventory: ' + physicalPath);
        if (typeof api.readStaticJson !== 'function') throw new Error('Runtime must expose its narrow readStaticJson preset consumer.');
        const logical = await api.readStaticJson(response);
        if (JSON.stringify(logical) !== JSON.stringify(JSON.parse(originalBytes.toString('utf8')))) fail('Actual HTTP gzip preset consumption changed the original JSON payload: ' + metadata.sourceUrl);
        else { compressedChecks++; logicalBytes += originalBytes.length; compressedBytes += physical.bytes; }
        // Browsers can expose an already-decoded body while retaining the .gz
        // response URL and Content-Encoding/encoded Content-Length headers.
        const automaticallyDecoded = new Response(originalBytes, { headers: {
          'Content-Type': 'application/json', 'Content-Encoding': 'gzip', 'Content-Length': String(physical.bytes),
        } });
        Object.defineProperty(automaticallyDecoded, 'url', { value: new URL(requestUrl, base).href });
        const decodedLogical = await api.readStaticJson(automaticallyDecoded);
        if (JSON.stringify(decodedLogical) !== JSON.stringify(JSON.parse(originalBytes.toString('utf8')))) fail('Hosting auto-decoded gzip must not be decoded twice: ' + metadata.sourceUrl);
        else autoDecodedChecks++;
      } catch (error) { fail('Compressed preset consumption failed: ' + metadata.sourceUrl + ': ' + error.message); }
    }
    // The helper must leave ordinary config JSON on its original response.json path.
    if (typeof api.readStaticJson === 'function') {
      const ordinary = await api.readStaticJson(await window.fetch('https://cdn.mchose.com.cn/configCenter/config/global.json'));
      const global = decoded.find(item => item.record.url === 'https://cdn.mchose.com.cn/configCenter/config/global.json');
      if (JSON.stringify(ordinary) !== JSON.stringify(JSON.parse(global.bytes.toString('utf8')))) fail('Ordinary static JSON handling changed while adding preset gzip support.');
    }
    const currentGlobal = decoded.find(item => item.record.url === 'https://cdn.mchose.com.cn/configCenter/config/global.json');
    if (currentGlobal?.value?.version?.__duVersion && currentGlobal.value.version.__duVersion !== data.driverUiVersion) fail('Generated driver UI revision differs from the actually captured global.json.');
    try {
      const loaderSource = await (await window.fetch('https://cdn.mchose.com.cn/configCenter/config/globalLoader.js')).text();
      vm.runInContext(loaderSource, context, { timeout: 5000 });
      const globalValue = await window.MC_CONFIG_GLOBAL_PROD_LOADER.getValue();
      if (globalValue?.version?.__duVersion !== data.driverUiVersion) fail('Captured globalLoader.js normal startup revision differs from the generated driver UI gate.');
    } catch (error) { fail('Factory global loader startup failed: ' + error.message); }
    for (const url of [
      'https://cdn.mchose.com.cn/configCenter/static/images/uncaptured-new-model-for-test.png',
      'https://cdn.mchose.com.cn/configCenter/custom/uncaptured-config-for-test.json',
      'https://cdn.mchose.com.cn/configCenter/static/binaries/uncaptured-firmware-for-test.bin',
      'https://cdn.mchose.com.cn/customPage/driver-ui/driver-ui.global.js?hash=uncaptured-revision-for-test',
    ]) {
      if (!local(api.assetUrl(url))) { fail('Unknown factory static/version URLs must fail locally rather than use the manufacturer CDN: ' + url); continue; }
      try {
        const response = await window.fetch(url);
        if (response.status !== 404) fail('Unknown factory static/version URLs must not reuse a different resource: ' + url);
      } catch (error) { fail(error.message); }
    }
    for (const url of factoryServices) {
      if (api.assetUrl(url) !== url) fail('Manufacturer service was incorrectly rewritten as a static resource: ' + url);
      const method = url.includes('/cloud/') ? 'POST' : 'GET';
      const response = await window.fetch(url, { method, ...(method === 'POST' ? { body: 'original-community-request' } : {}) });
      if (!(await response.json()).manufacturerServiceFixture) fail('Manufacturer service must use the original transport, not fabricated app data: ' + url);
    }
    for (const url of ['https://cdn.mchose.com.cn/software/MCHOSE_HUB_installer.exe', 'https://user-upload.example/avatar.png', 'https://mchose-bbs.oss-cn-shenzhen.aliyuncs.com/user-upload-not-captured.png']) {
      if (api.assetUrl(url) !== url) fail('Explicit installer or user-upload URLs must retain original behavior: ' + url);
    }
    if (window.WebSocket !== originals.socket || window.EventSource !== originals.events || window.open !== originals.open || navigator.sendBeacon !== originals.beacon) fail('Live manufacturer transports must remain original.');
    if (calls.externalStatic.length) fail('Static request attempts escaped loopback: ' + calls.externalStatic.join(', '));
    report.origins.push(base);
    report.localHttp.push({ prefix: prefix || '/', capturedResources: capturedChecks, expectedMapEntries: mapEntries.length, unavailableSameOrigin404: unavailableChecks, actualLocalRequests: calls.local, externalStaticAttempts: calls.externalStatic });
    report.nestedConfiguration.push({ prefix: prefix || '/', configFiles: decoded.length, staticDOMValues: nestedChecks });
    report.compressedPresetConsumption.push({ prefix: prefix || '/', logicalPayloads: compressedChecks, hostingAutoDecodedPayloads: autoDecodedChecks, expectedPayloads: Object.keys(data.compressed || {}).length, logicalBytes, physicalBytes: compressedBytes });
    report.servicePassthrough.push({ prefix: prefix || '/', fixtures: calls.manufacturer, contactedManufacturer: false });
    console.log(`Checked ${prefix || '/'}: ${capturedChecks} local static responses, ${nestedChecks} nested config values, ${calls.externalStatic.length} external static attempts`);
  });
} catch (error) { fail(error.stack || error.message); }

report.errors = [...errors];
report.passed = report.errors.length === 0;
report.availability.complete = report.availability.unresolved.length === 0 && report.availability.unavailableAtSource.length === 0;
await fs.mkdir(path.join(root, 'reports'), { recursive: true });
await fs.writeFile(path.join(root, 'reports/mirror-independence.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ passed: report.passed, availabilityComplete: report.availability.complete, publishedBytes: report.publishedBytes, capturedGraph: report.sourceAudit?.dependencies, errors: report.errors.length, firstErrors: report.errors.slice(0, 10) }));
if (!report.passed) process.exitCode = 1;
