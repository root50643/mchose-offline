import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';
import { localStaticPath } from './mirror-resource-policy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const build = JSON.parse(await fs.readFile(path.join(root, 'reports/mirror-build.json'), 'utf8'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const errors = [], fallbackReferences = new Set(), unavailableReferences = [];
const unavailablePaths = new Map();
const source = new Map();
for (const name of ['source-manifest.json', 'mirror-source-manifest.json']) {
  let manifest;
  try { manifest = JSON.parse(await fs.readFile(path.join(root, 'snapshots', name), 'utf8')); } catch { continue; }
  for (const file of manifest.files) {
    if (file.status === 'ok') source.set(file.url, file);
    else if (/HTTP 404\b/.test(file.error || '') || file.sourceResponse?.httpStatus === 200 && file.sourceResponse?.contentLength === 0) {
      const local = localStaticPath(new URL(file.url));
      if (local) unavailablePaths.set(local, { url: file.url, error: file.error, sourceResponse: file.sourceResponse });
    }
  }
}
for (const record of source.values()) {
  try {
    const bytes = await fs.readFile(path.join(root, record.upstreamPath));
    if (bytes.length !== record.bytes || sha(bytes) !== record.sha256) errors.push('Source integrity: ' + record.upstreamPath);
  } catch { errors.push('Missing source: ' + record.upstreamPath); }
}
async function inventory(directory, relative = '') {
  const output = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) output.push(...await inventory(path.join(directory, entry.name), name));
    else output.push(name);
  } return output.sort();
}
const files = await inventory(site), expected = new Set(build.files.map(file => file.path));
for (const file of ['index.html', 'mirror-runtime.js', 'mirror-bootstrap.js', 'mirror-cleanup.js', 'sw.js']) if (!expected.has(file)) errors.push('Missing required entry: ' + file);
if (!build.entry || !expected.has(build.entry.replace(/^\.\//, ''))) errors.push('Invalid factory bootstrap entry.');
if (files.length !== expected.size || files.some(file => !expected.has(file))) errors.push('Build inventory does not match site files.');
function reference(value, file) {
  if (!value || /^(?:data:|blob:|#|mailto:|tel:|javascript:)/i.test(value)) return;
  if (/^(?:https?:)?\/\//.test(value)) { fallbackReferences.add(value); return; }
  const base = new URL(file, 'https://mirror.test/mchose-offline/');
  try {
    const url = new URL(value, base);
    if (!url.pathname.startsWith('/mchose-offline/')) { errors.push(`Project path escape: ${file} -> ${value}`); return; }
    let target = decodeURIComponent(url.pathname.slice('/mchose-offline/'.length));
    if (target.endsWith('/')) target += 'index.html';
    if (!expected.has(target)) {
      const unavailable = unavailablePaths.get(target);
      if (unavailable) unavailableReferences.push({ file, reference: value, localPath: target, ...unavailable });
      else errors.push(`Missing relative reference: ${file} -> ${value}`);
    }
  } catch { errors.push(`Invalid reference: ${file} -> ${value}`); }
}
let bytesTotal = 0, syntaxChecks = 0;
for (const file of build.files) {
  try {
    const bytes = await fs.readFile(path.join(site, file.path)); bytesTotal += bytes.length;
    if (bytes.length !== file.bytes || sha(bytes) !== file.sha256) errors.push('Deployment integrity: ' + file.path);
    if (bytes.length >= 100_000_000) errors.push('GitHub file limit: ' + file.path);
    const text = /\.(?:m?js|html|css)$/.test(file.path) ? bytes.toString('utf8') : '';
    if (/\.m?js$/.test(file.path)) {
      try { parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true }); syntaxChecks++; }
      catch (error) { errors.push(`Syntax: ${file.path}: ${error.message}`); }
      for (const match of text.matchAll(/\b(?:from\s*|import\s*\()\s*["'](\.{1,2}\/[^"']+)["']/g)) reference(match[1], file.path);
    }
    if (file.path.endsWith('.html')) {
      for (const match of text.matchAll(/<(?:script|link|img|source|video)\b[^>]*?\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) reference(match[1], file.path);
      if (/serviceWorker\.getRegistrations/.test(text) && /\.unregister\(/.test(text)) errors.push('Unscoped worker removal: ' + file.path);
    }
    if (file.path.endsWith('.css')) {
      for (const match of text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g)) reference((match[1] ?? match[2] ?? match[3]).trim(), file.path);
    }
  } catch (error) { errors.push(`${file.path}: ${error.message}`); }
}
for (const filename of ['offline-manifest.json', 'offline-runtime.js', 'offline-shell.js', 'offline-shell.css']) if (expected.has(filename)) errors.push('Obsolete offline resource: ' + filename);
if (bytesTotal !== build.totalBytes || bytesTotal >= 1_000_000_000) errors.push('Deployment size mismatch or Pages limit exceeded.');
if (sha(JSON.stringify(build.files)) !== build.version) errors.push('Build version mismatch.');
const result = {
  mode: 'mirror', passed: errors.length === 0, version: build.version, generatedAt: new Date().toISOString(),
  sourceFiles: source.size, publishedFiles: files.length, publishedBytes: bytesTotal, syntaxChecks,
  externalFallbackReferences: [...fallbackReferences].sort(), unavailableReferences, errors,
  limitations: ['Static verification covers mirrored files and references. Proven unavailable source files remain local 404 responses; no source file is fabricated. Manufacturer services and explicit downloads retain their original URLs. Browser checks are recorded separately.'],
};
await fs.writeFile(path.join(root, 'reports/mirror-verification.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ passed: result.passed, sourceFiles: source.size, publishedFiles: files.length, publishedBytes: bytesTotal, syntaxChecks, errors }));
if (errors.length) process.exitCode = 1;
