import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';
import { localStaticPath } from './mirror-resource-policy.mjs';
import { decodeFactoryConfig } from './factory-config.mjs';
import { gzipSync, gunzipSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const primaryOrigin = 'https://www.mchose.com.cn';
const knownHosts = ['cdn.mchose.com.cn', 'www.mchose.com.cn', 'www.maicong.cn'];
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const originalManifest = JSON.parse(await fs.readFile(path.join(root, 'snapshots/source-manifest.json'), 'utf8'));
let manifest;
try { manifest = JSON.parse(await fs.readFile(path.join(root, 'snapshots/mirror-source-manifest.json'), 'utf8')); }
catch { manifest = { files: [] }; }
const combined = new Map(originalManifest.files.filter(file => file.status === 'ok').map(file => [file.url, file]));
for (const file of manifest.files) if (file.status === 'ok') combined.set(file.url, file);
const desktopUpdates = [...combined.values()].filter(file => /^https:\/\/cdn\.mchose\.com\.cn(?:\/customPage\/(?:pre|prod)(?:\/|$)|\/systemRepair\/)/.test(file.url));
const records = [...combined.values()].filter(file => !desktopUpdates.includes(file)).map(file => {
  const entry = { 'https://www.mchose.com.cn/': 'index.html', 'https://www.mchose.com.cn/gmouse/': 'gmouse/index.html', 'https://www.mchose.com.cn/g7max/': 'g7max/index.html' }[file.url];
  return entry ? { ...file, sitePath: entry } : file;
}).sort((a, b) => a.url.localeCompare(b.url));
const map = Object.fromEntries(records.map(file => [file.url, file.sitePath]));
const physicalPaths = new Map(records.map(file => [file.url, file.sitePath]));
const fontRepresentatives = new Map(), fontAliases = [], skippedFontCopies = new Set();
for (const file of records) {
  if (!/\.(?:woff2?|ttf|otf|eot)$/i.test(file.sitePath)) continue;
  const representative = fontRepresentatives.get(file.sha256);
  if (!representative) fontRepresentatives.set(file.sha256, file);
  else {
    map[file.url] = representative.sitePath; physicalPaths.set(file.url, representative.sitePath); skippedFontCopies.add(file.url);
    fontAliases.push({ url: file.url, originalPath: file.sitePath, sharedPath: representative.sitePath, bytesSaved: file.bytes, sha256: file.sha256 });
  }
}
const presetRecord = records.find(file => file.url === 'https://cdn.mchose.com.cn/configCenter/custom/keyboardPreset.json');
if (!presetRecord) throw new Error('The captured factory keyboard preset index is required.');
const presetIndex = decodeFactoryConfig(await fs.readFile(path.join(root, presetRecord.upstreamPath)));
const presetUrls = new Set(Object.values(presetIndex).filter(value => typeof value === 'string' && /^https?:/.test(value)).map(value => { const url = new URL(value); url.search = ''; url.hash = ''; return url.href; }));
const compressed = {}, packedPayloads = new Map();
for (const file of records) {
  if (!presetUrls.has(file.url) || !/\.json$/i.test(file.sitePath)) continue;
  const bytes = await fs.readFile(path.join(root, file.upstreamPath));
  if (bytes.length !== file.bytes || sha(bytes) !== file.sha256) throw new Error('Preset source integrity failed: ' + file.url);
  const packed = gzipSync(bytes, { level: 9 }); packed[9] = 255;
  if (packed.length >= bytes.length) continue;
  if (!gunzipSync(packed).equals(bytes)) throw new Error('Preset compression is not lossless: ' + file.url);
  const physicalPath = file.sitePath + '.gz';
  map[file.url] = physicalPath; physicalPaths.set(file.url, physicalPath); packedPayloads.set(file.url, packed);
  compressed[physicalPath] = { bytes: file.bytes, sha256: file.sha256, sourceUrl: file.url };
}
const globalRecord = records.find(file => file.url === 'https://cdn.mchose.com.cn/configCenter/config/global.json');
if (!globalRecord) throw new Error('The captured factory global configuration is required.');
const globalConfig = decodeFactoryConfig(await fs.readFile(path.join(root, globalRecord.upstreamPath)));
const subapps = {};
for (const name of ['gmouse', 'g7max']) {
  const record = records.find(file => file.sitePath === `${name}/index.html`);
  if (record) subapps[name] = record.sitePath;
}
const report = { mode: 'mirror', generatedAt: new Date().toISOString(), sourceFiles: records.length, desktopUpdateFilesExcluded: desktopUpdates.length, fontAliases, compressedPresetPayloads: compressed, behaviorPatches: [], resourceRewrites: [], configurationRewrites: [], subapps, factoryConfigurationLoaders: true, staticConfiguration: 'original-copied-files', staticResourcePolicy: 'same-origin-only', precache: false };

function walk(node, visit, parent = null) {
  if (!node || typeof node !== 'object') return;
  if (node.type && visit(node, parent) === false) return;
  for (const [key, value] of Object.entries(node)) {
    if (key === 'start' || key === 'end') continue;
    if (Array.isArray(value)) for (const child of value) walk(child, visit, node);
    else if (value && typeof value === 'object') walk(value, visit, node);
  }
}
function editsApplied(text, edits) {
  let end = text.length;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    if (edit.end > end) throw new Error('Overlapping mirror patches.');
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end); end = edit.start;
  }
  return text;
}
function parseJs(text) { return parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true }); }
function patchCompatibility(text, file) {
  if (!text.includes('async function initializeApp()') || !text.includes('window.readMouseAllInfo=')) return text;
  const edits = [];
  walk(parseJs(text), node => {
    if (node.type === 'FunctionDeclaration' && node.id?.name === 'getCurrentApiConfig') {
      edits.push({ start: node.body.start + 1, end: node.body.end - 1, text: 'return API_CONFIGS.production;' });
      report.behaviorPatches.push({ file, name: 'getCurrentApiConfig', reason: 'Use the original production API on the mirror and local preview.' });
    }
    if (node.type === 'VariableDeclarator' && node.id?.name === 'AUDIO_WEB_ORIGIN') {
      edits.push({ start: node.init.start, end: node.init.end, text: 'window.location.origin' });
      report.behaviorPatches.push({ file, name: 'AUDIO_WEB_ORIGIN', reason: 'Use a valid current origin for the unchanged device catalog validation.' });
    }
    if (node.type === 'FunctionDeclaration' && node.id?.name === 'resolveCustomPageAppUrl') {
      const [name, fallback] = node.params.map(parameter => parameter.name);
      edits.push({ start: node.body.start + 1, end: node.body.end - 1, text: `return window.__mchoseMirror.customAppUrl(${name},${fallback});` });
      report.behaviorPatches.push({ file, name: 'resolveCustomPageAppUrl', reason: 'Keep custom device applications inside the GitHub Pages project path.' });
    }
    if (node.type === 'FunctionDeclaration' && node.id?.name === 'loadConfigFromUrl') {
      let returns = 0;
      walk(node.body, child => {
        if (['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(child.type)) return false;
        if (child.type !== 'ReturnStatement' || !child.argument) return;
        const argument = child.argument;
        edits.push({ start: argument.start, end: argument.end, text: `window.__mchoseMirror.mapResourceData((${text.slice(argument.start, argument.end)}))` });
        returns++;
      });
      report.configurationRewrites.push({ file, name: 'loadConfigFromUrl', returns });
    }
  });
  return editsApplied(text, edits);
}
function patchConfigLoaderResults(text, file) {
  if (!/\/configCenter(?:-test)?\/(?:config|custom)\/[^/]*Loader\.js$/i.test(file) || !text.includes('MC_CONFIG_')) return text;
  const edits = [];
  walk(parseJs(text), node => {
    if (node.type !== 'AssignmentExpression' || node.left.type !== 'Identifier' || node.left.name !== 'activeValue') return;
    edits.push({ start: node.right.start, end: node.right.end, text: `window.__mchoseMirror.mapResourceData((${text.slice(node.right.start, node.right.end)}))` });
  });
  if (edits.length) report.configurationRewrites.push({ file, name: 'loaderActiveValue', assignments: edits.length });
  return editsApplied(text, edits);
}
function patchCzConfigResults(text, file) {
  if (!/^cizhou\/CZ_SHARED_DATA\/main\.[^/]+\.js$/.test(file)) return text;
  const modules = new Map(), edits = [];
  walk(parseJs(text), node => {
    if (node.type === 'Property' && [71024, 27122].includes(node.key?.value)) modules.set(node.key.value, node.value);
  });
  if (modules.size !== 2) throw new Error('Factory CZ configuration module boundaries changed.');
  const mapDecodedAssignment = (node, name) => {
    let count = 0;
    walk(node, child => {
      if (child.type !== 'AssignmentExpression' || child.left.type !== 'Identifier' || child.left.name !== 'n'
          || child.right.type !== 'MemberExpression' || child.right.object.name !== 'e' || child.right.property.name !== 'sent') return;
      edits.push({ start: child.right.start, end: child.right.end, text: `window.__mchoseMirror.mapResourceData(${text.slice(child.right.start, child.right.end)})` }); count++;
    });
    if (count !== 1) throw new Error(`Factory CZ ${name} decoding boundary changed (${count}).`);
    report.configurationRewrites.push({ file, name, assignments: count });
  };
  mapDecodedAssignment(modules.get(71024), 'czKeyboardConfig');
  let preset, payload;
  walk(modules.get(27122), node => {
    if (node.type !== 'VariableDeclarator' || !node.init) return;
    if (text.slice(node.init.start, node.init.end).includes('custom/keyboardPreset.json')) preset = node.init;
    if (node.id.name === 'w') payload = node.init;
  });
  if (!preset || !payload) throw new Error('Factory CZ preset loaders changed.');
  mapDecodedAssignment(preset, 'czKeyboardPresetIndex');
  let payloadReturns = 0;
  walk(payload, node => {
    if (node.type !== 'CallExpression' || node.callee.type !== 'MemberExpression' || node.callee.property.name !== 'abrupt'
        || node.arguments[0]?.value !== 'return' || node.arguments[1]?.type !== 'CallExpression'
        || node.arguments[1].callee.type !== 'MemberExpression' || node.arguments[1].callee.property.name !== 'json') return;
    const result = node.arguments[1];
    edits.push({ start: result.start, end: result.end, text: `window.__mchoseMirror.readStaticJson(${text.slice(result.callee.object.start, result.callee.object.end)}).then(window.__mchoseMirror.mapResourceData)` }); payloadReturns++;
  });
  if (payloadReturns !== 1) throw new Error('Factory CZ preset payload boundary changed.');
  report.configurationRewrites.push({ file, name: 'czKeyboardPresetPayload', returns: payloadReturns });
  return editsApplied(text, edits);
}
function rewriteJs(text, file) {
  const edits = [];
  walk(parseJs(text), (node, parent) => {
    if (node.type === 'TemplateLiteral') {
      const original = text.slice(node.start, node.end);
      if (knownHosts.some(host => original.includes(host))) {
        edits.push({ start: node.start, end: node.end, text: `(window.__mchoseMirror.rewriteText(${original}))` }); return false;
      }
    }
    if (node.type !== 'Literal' || typeof node.value !== 'string') return;
    const value = node.value;
    if (parent?.key === node && !parent.computed) return;
    if (parent?.type === 'ImportDeclaration' || parent?.type?.startsWith('Export')) {
      const target = map[value.split(/[?#]/)[0]];
      if (target) {
        let relative = path.posix.relative(path.posix.dirname(file), target); if (!relative.startsWith('.')) relative = './' + relative;
        edits.push({ start: node.start, end: node.end, text: JSON.stringify(relative) });
      }
      return;
    }
    if (/^\/(?:gmouse|g7max)(?:\/|$)/.test(value)) {
      edits.push({ start: node.start, end: node.end, text: `(window.__mchoseMirror.projectPath(${JSON.stringify(value)}))` }); return;
    }
    if (/^\/(?!\/).+\.(?:js|css|png|jpe?g|svg|ico|webp|woff2?|pdf|glb|bin)(?:[?#].*)?$/i.test(value)) {
      const absolute = new URL(value, primaryOrigin).href;
      edits.push({ start: node.start, end: node.end, text: `(window.__mchoseMirror.assetUrl(${JSON.stringify(absolute)}))` }); return;
    }
    if (!knownHosts.some(host => value.includes(host))) return;
    let url;
    try { url = new URL(value); } catch {}
    // Origin constants remain valid origins; fetch maps known static files later.
    if (url && url.pathname === '/') return;
    const expression = url && /^https?:$/.test(url.protocol) ? 'assetUrl' : 'rewriteText';
    edits.push({ start: node.start, end: node.end, text: `(window.__mchoseMirror.${expression}(${JSON.stringify(value)}))` });
  });
  report.resourceRewrites.push({ file, count: edits.length });
  const output = editsApplied(text, edits); parseJs(output); return output;
}
function localReference(value, sourceUrl, outputPath) {
  if (/^(?:data:|blob:|#)/.test(value)) return value;
  let url;
  try { url = new URL(value, sourceUrl); } catch { return value; }
  const target = map[url.href.split(/[?#]/)[0]] || localStaticPath(url);
  if (!target) return ['https:', 'http:'].includes(url.protocol) ? url.href : value;
  let relative = path.posix.relative(path.posix.dirname(outputPath), target); if (!relative.startsWith('.')) relative = './' + relative;
  return relative + url.search + url.hash;
}
function rewriteCss(text, record) {
  text = text.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g, (whole, a, b, c) => {
    const raw = (a ?? b ?? c).trim(); return raw.startsWith('data:') ? whole : `url(${JSON.stringify(localReference(raw, record.url, record.sitePath))})`;
  });
  return text.replace(/@import\s*(["'])([^"']+)\1/g, (whole, quote, value) => `@import ${JSON.stringify(localReference(value, record.url, record.sitePath))}`);
}
function rewriteHtml(text, record) {
  // React Flight text chunks carry byte-length framing. Changing URLs inside
  // those opaque strings corrupts hydration. The executable Next script queue
  // is rewritten separately, before the factory idempotent boot script runs.
  const flight = [];
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, script => {
    if (!/self\.__next_f(?:\s*=|\.push\()/.test(script)) return script;
    const key = `<!--MCHOSE_PRESERVED_FLIGHT_${flight.length}-->`; flight.push(script); return key;
  });
  const prefix = path.posix.relative(path.posix.dirname(record.sitePath), '.') || '.';
  text = text.replace(/    <script>\s*\/\/ 注销 Service Worker[\s\S]*?    <\/script>/, '');
  text = text.replace(/\b(src|href|poster)=(['"])([^'"]+)\2/g, (whole, attribute, quote, value) => `${attribute}=${quote}${localReference(value, record.url, record.sitePath)}${quote}`);
  if (record.sitePath === 'index.html') {
    const entry = text.match(/<script type="module" crossorigin src="([^"']+)"><\/script>/)?.[1];
    if (!entry) throw new Error('Factory module entry was not found.');
    report.entry = entry;
    text = text.replace(/    <script>\s*\(function \(\) \{[\s\S]*?    <\/script>/, '');
    text = text.replace(/<script type="module" crossorigin src="[^"']+"><\/script>/, '<script type="module" src="./mirror-bootstrap.js"></script>');
  }
  let inlineScript = 0;
  text = text.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attributes, source) => {
    if (/\bsrc\s*=/i.test(attributes) || !source.trim()) return whole;
    const type = attributes.match(/\btype\s*=\s*(['"])(.*?)\1/i)?.[2];
    if (type && !/^(?:module|(?:text|application)\/javascript)$/i.test(type)) return whole;
    return `<script${attributes}>${rewriteJs(source, `${record.sitePath}#inline-${++inlineScript}`)}</script>`;
  });
  text = text.replace('<head>', `<head>\n    <script src="${prefix}/mirror-runtime.js"></script>\n    <script src="${prefix}/mirror-cleanup.js" defer></script>`);
  text = text.replace(/<!--MCHOSE_PRESERVED_FLIGHT_(\d+)-->/g, (whole, index) => flight[Number(index)]);
  return text;
}

await fs.mkdir(site, { recursive: true });
const realRoot = await fs.realpath(root), realSite = await fs.realpath(site);
if (realSite !== path.join(realRoot, 'site') || (await fs.lstat(site)).isSymbolicLink()) throw new Error('Refusing to replace a website directory outside this project.');
await fs.rm(site, { recursive: true, force: true });
await fs.mkdir(site);
for (const record of records) {
  if (skippedFontCopies.has(record.url)) continue;
  if (!record.sitePath || !record.upstreamPath) throw new Error(`Incomplete source record: ${record.url}`);
  const input = await fs.readFile(path.join(root, record.upstreamPath));
  if (input.length !== record.bytes || sha(input) !== record.sha256) throw new Error(`Source integrity mismatch: ${record.url}`);
  let output = input;
  if (packedPayloads.has(record.url)) output = packedPayloads.get(record.url);
  else if (/\.m?js$/i.test(record.sitePath)) output = Buffer.from(rewriteJs(patchCzConfigResults(patchConfigLoaderResults(patchCompatibility(input.toString('utf8'), record.sitePath), record.sitePath), record.sitePath), record.sitePath));
  else if (/\.css$/i.test(record.sitePath)) output = Buffer.from(rewriteCss(input.toString('utf8'), record));
  else if (/\.html$/i.test(record.sitePath)) output = Buffer.from(rewriteHtml(input.toString('utf8'), record));
  const destination = path.resolve(site, physicalPaths.get(record.url));
  if (!destination.startsWith(site + path.sep)) throw new Error('Invalid deployment path.');
  await fs.mkdir(path.dirname(destination), { recursive: true }); await fs.writeFile(destination, output);
}
const storage = await fs.readFile(path.join(root, 'tools/mirror-storage.js'), 'utf8');
const template = await fs.readFile(path.join(root, 'tools/mirror-runtime.template.js'), 'utf8');
const runtime = template.replace('/*__MIRROR_STORAGE__*/', () => storage).replace('/*__MIRROR_RESOURCE_POLICY__*/', () => localStaticPath.toString()).replace('/*__MIRROR_DATA__*/{}', () => JSON.stringify({ map, compressed, hosts: knownHosts, subapps, driverUiVersion: String(globalConfig.version?.__duVersion || '') }));
parseJs(runtime); await fs.writeFile(path.join(site, 'mirror-runtime.js'), runtime);
const cleanup = await fs.readFile(path.join(root, 'tools/mirror-cleanup-template.js'));
await fs.writeFile(path.join(site, 'mirror-cleanup.js'), cleanup); await fs.writeFile(path.join(site, 'sw.js'), cleanup);
const bootstrap = `const original='https://cdn.mchose.com.cn/customPage/driver-ui/';\nconst loader=window.MC_CONFIG_GLOBAL_PROD_LOADER;\nlet value;try{value=await loader?.getValue();}catch{}\nconst version=value?.version?.__duVersion;\nconst url=name=>window.__mchoseMirror.assetUrl(original+name+(version?'?hash='+encodeURIComponent(version):''));\nconst css=document.createElement('link');css.rel='stylesheet';css.href=url('driver-ui.css');document.head.append(css);\nconst load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.append(s);});\nawait load(url('driver-ui.global.js'));\nawait load(url('vue/driver-ui.vue.js'));\nawait import(${JSON.stringify(report.entry)});\n`;
if (!report.entry) throw new Error('Root factory entry was not generated.');
await fs.writeFile(path.join(site, 'mirror-bootstrap.js'), bootstrap);
async function inventory(directory, relative = '') {
  const files = [];
  for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await inventory(path.join(directory, entry.name), filename));
    else { const bytes = await fs.readFile(path.join(directory, entry.name)); files.push({ path: filename, bytes: bytes.length, sha256: sha(bytes) }); }
  }
  return files;
}
report.files = await inventory(site);
report.totalBytes = report.files.reduce((sum, file) => sum + file.bytes, 0);
report.version = sha(JSON.stringify(report.files));
if (report.totalBytes >= 1_000_000_000) throw new Error(`Published mirror exceeds 1 GB: ${report.totalBytes}`);
await fs.mkdir(path.join(root, 'reports'), { recursive: true });
await fs.writeFile(path.join(root, 'reports/mirror-build.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ mode: report.mode, sourceFiles: report.sourceFiles, files: report.files.length, totalBytes: report.totalBytes, version: report.version, compatibilityPatches: report.behaviorPatches }));
