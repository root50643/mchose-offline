import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';

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
const records = [...combined.values()].map(file => {
  const entry = { 'https://www.mchose.com.cn/': 'index.html', 'https://www.mchose.com.cn/gmouse/': 'gmouse/index.html', 'https://www.mchose.com.cn/g7max/': 'g7max/index.html' }[file.url];
  return entry ? { ...file, sitePath: entry } : file;
}).sort((a, b) => a.url.localeCompare(b.url));
const map = Object.fromEntries(records.map(file => [file.url, file.sitePath]));
const globalConfig = JSON.parse(await fs.readFile(path.join(root, 'snapshots/config/global.json'), 'utf8'));
const subapps = {};
for (const name of ['gmouse', 'g7max']) {
  const record = records.find(file => file.sitePath === `${name}/index.html`);
  if (record) subapps[name] = record.sitePath;
}
const report = { mode: 'mirror', generatedAt: new Date().toISOString(), sourceFiles: records.length, behaviorPatches: [], resourceRewrites: [], configurationRewrites: [], subapps, factoryConfigurationLoaders: true, staticConfiguration: 'original-copied-files', optionalKeyboardConfigTimeoutMs: 5000, precache: false };

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
  const target = map[url.href.split(/[?#]/)[0]];
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
  return text;
}

await fs.mkdir(site, { recursive: true });
const realRoot = await fs.realpath(root), realSite = await fs.realpath(site);
if (realSite !== path.join(realRoot, 'site') || (await fs.lstat(site)).isSymbolicLink()) throw new Error('Refusing to replace a website directory outside this project.');
await fs.rm(site, { recursive: true, force: true });
await fs.mkdir(site);
for (const record of records) {
  if (!record.sitePath || !record.upstreamPath) throw new Error(`Incomplete source record: ${record.url}`);
  const input = await fs.readFile(path.join(root, record.upstreamPath));
  if (input.length !== record.bytes || sha(input) !== record.sha256) throw new Error(`Source integrity mismatch: ${record.url}`);
  let output = input;
  if (/\.m?js$/i.test(record.sitePath)) output = Buffer.from(rewriteJs(patchConfigLoaderResults(patchCompatibility(input.toString('utf8'), record.sitePath), record.sitePath), record.sitePath));
  else if (/\.css$/i.test(record.sitePath)) output = Buffer.from(rewriteCss(input.toString('utf8'), record));
  else if (/\.html$/i.test(record.sitePath)) output = Buffer.from(rewriteHtml(input.toString('utf8'), record));
  const destination = path.resolve(site, record.sitePath);
  if (!destination.startsWith(site + path.sep)) throw new Error('Invalid deployment path.');
  await fs.mkdir(path.dirname(destination), { recursive: true }); await fs.writeFile(destination, output);
}
const storage = await fs.readFile(path.join(root, 'tools/mirror-storage.js'), 'utf8');
const template = await fs.readFile(path.join(root, 'tools/mirror-runtime.template.js'), 'utf8');
const runtime = template.replace('/*__MIRROR_STORAGE__*/', () => storage).replace('/*__MIRROR_DATA__*/{}', () => JSON.stringify({ map, hosts: knownHosts, subapps, driverUiVersion: String(globalConfig.version?.__duVersion || '') }));
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
