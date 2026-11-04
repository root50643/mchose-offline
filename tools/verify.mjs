import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const errors = [];
const warnings = [];
const digest = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}
function requireFile(relative) {
  if (!fs.existsSync(path.join(site, relative))) errors.push(`Missing site/${relative}`);
}
function resolveReference(reference, source, kind) {
  if (!reference || /^(?:data:|blob:|#|mailto:|tel:|javascript:)/i.test(reference)) return;
  if (/^(?:https?:)?\/\//i.test(reference)) {
    errors.push(`External ${kind}: ${path.relative(site, source)} -> ${reference}`);
    return;
  }
  try {
    const base = new URL(path.relative(site, source).replaceAll('\\', '/'), 'https://offline.invalid/mchose-offline/');
    const url = new URL(reference, base);
    if (!url.pathname.startsWith('/mchose-offline/')) {
      errors.push(`Project-prefix escape: ${path.relative(site, source)} -> ${reference}`);
      return;
    }
    let relative = decodeURIComponent(url.pathname.slice('/mchose-offline/'.length));
    if (relative.endsWith('/')) relative += 'index.html';
    if (!fs.existsSync(path.join(site, relative))) errors.push(`Missing ${kind}: ${path.relative(site, source)} -> ${reference}`);
  } catch (error) {
    errors.push(`Invalid ${kind} in ${path.relative(site, source)}: ${error.message}`);
  }
}

const manifest = readJson('snapshots/source-manifest.json');
let upstreamBytes = 0;
let verifiedFiles = 0;
let officialSnapshots = 0;
for (const entry of manifest.files) {
  if (entry.status === 'excluded') continue;
  if (entry.status !== 'ok') {
    warnings.push({ url: entry.url, reason: entry.reason, error: entry.error });
    const excluded = manifest.exclusions?.some(item => item.url === entry.url);
    const sourceGone = /HTTP (?:404|410)\b/.test(entry.error || '');
    const unavailableFirmware = /\.bin$/i.test(new URL(entry.url).pathname) && sourceGone;
    const unavailableManual = /^https:\/\/www\.mchose\.com\.cn\/pdf\/(?:zh_CN|en_US)\/G3\.pdf$/.test(entry.url) && sourceGone;
    if (!excluded && !unavailableFirmware && !unavailableManual) errors.push(`Unresolved required download: ${entry.url} (${entry.error || entry.status})`);
    continue;
  }
  const source = path.join(root, entry.upstreamPath);
  if (!fs.existsSync(source)) { errors.push(`Missing archived source ${entry.upstreamPath}`); continue; }
  const bytes = fs.readFileSync(source);
  if (bytes.length !== entry.bytes || digest(bytes) !== entry.sha256) errors.push(`Archive integrity mismatch: ${entry.upstreamPath}`);
  if (!fs.existsSync(path.join(site, entry.sitePath))) errors.push(`Missing deployment copy: ${entry.sitePath}`);
  if (/\.(?:bin|woff2?|ttf|png|jpe?g|webp|mp4|ico)$/i.test(entry.sitePath) && /^\s*(?:<!doctype html|<html)/i.test(bytes.subarray(0, 150).toString())) errors.push(`HTML received for binary asset: ${entry.url}`);
  upstreamBytes += bytes.length;
  verifiedFiles++;
}
const officialManifest = readJson('snapshots/official/source-manifest.json');
for (const entry of officialManifest.files) {
  if (entry.status !== 'ok') { errors.push(`Missing official-template snapshot: ${entry.sourceUrl}`); continue; }
  if (!fs.existsSync(path.join(root, entry.path))) { errors.push(`Missing ${entry.path}`); continue; }
  const bytes = fs.readFileSync(path.join(root, entry.path));
  if (bytes.length !== entry.bytes || digest(bytes) !== entry.sha256) errors.push(`Official-template snapshot integrity mismatch: ${entry.path}`);
  officialSnapshots++;
}

for (const relative of ['index.html', 'offline-runtime.js', 'offline-shell.js', 'offline-shell.css', 'sw.js', 'offline-manifest.json']) requireFile(relative);
const siteFiles = walk(site);
let publishedBytes = 0;
for (const absolute of siteFiles) {
  publishedBytes += fs.statSync(absolute).size;
  const relative = path.relative(site, absolute).replaceAll('\\', '/');
  if (relative.endsWith('.html')) {
    const html = fs.readFileSync(absolute, 'utf8');
    for (const match of html.matchAll(/<(?:script|link|img|source|video)\b[^>]*?\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) resolveReference(match[1], absolute, 'HTML resource');
    if (/serviceWorker\.getRegistrations/.test(html) && /\.unregister\(/.test(html)) errors.push(`Global service-worker removal remains: ${relative}`);
  } else if (relative.endsWith('.css')) {
    const css = fs.readFileSync(absolute, 'utf8');
    for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g)) resolveReference((match[1] ?? match[2] ?? match[3]).trim(), absolute, 'CSS resource');
    for (const match of css.matchAll(/@import\s+["']([^"']+)["']/g)) resolveReference(match[1], absolute, 'CSS import');
  } else if (relative.endsWith('.js') || relative.endsWith('.mjs')) {
    const js = fs.readFileSync(absolute, 'utf8');
    for (const match of js.matchAll(/\b(?:from\s*|import\s*\()\s*["'](\.{1,2}\/[^"']+)["']/g)) resolveReference(match[1], absolute, 'JavaScript import');
  }
}
if (publishedBytes >= 1_000_000_000) errors.push(`Published site exceeds conservative 1 GB limit: ${publishedBytes}`);

const checkFiles = [...walk(path.join(root, 'tools')).filter(file => /\.m?js$/.test(file)), ...siteFiles.filter(file => /\.m?js$/.test(file))];
for (const file of checkFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) errors.push(`JavaScript syntax error: ${path.relative(root, file)}\n${result.stderr}`);
}
if (fs.existsSync(path.join(site, 'offline-manifest.json'))) {
  const cached = readJson('site/offline-manifest.json');
  const entries = Array.isArray(cached) ? cached : cached.files || cached.assets || [];
  if (entries.length === 0) errors.push('Offline precache manifest is empty.');
}

const report = {
  generatedAt: new Date().toISOString(), passed: errors.length === 0,
  archivedFiles: verifiedFiles, archivedBytes: upstreamBytes,
  officialTemplateSnapshots: officialSnapshots,
  scopeExcludedFiles: manifest.files.filter(entry => entry.status === 'excluded').length,
  publishedFiles: siteFiles.length, publishedBytes,
  syntaxChecks: checkFiles.length,
  unresolvedDownloads: warnings,
  errors,
  limitations: ['This check verifies files and static references. Browser, network and physical-device acceptance are reported separately.'],
};
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports', 'static-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.passed ? 0 : 1;
