import http from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
}
const port = Number(option('--port', '8765'));
const root = await realpath(path.resolve(option('--root', fileURLToPath(new URL('../site', import.meta.url)))));
const inputPrefix = option('--prefix', '');
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid --port.');
if (inputPrefix && (!/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*\/?$/.test(inputPrefix))) throw new Error('Invalid --prefix.');
const prefix = inputPrefix.replace(/\/$/, '');
const audit = args.includes('--audit');
const hidReadonly = audit && args.includes('--hid-readonly');
const auditScriptPath = fileURLToPath(new URL('./qa-network-audit.js', import.meta.url));
const hidScriptPath = fileURLToPath(new URL('./qa-hid-readonly.js', import.meta.url));
const auditCsp = [
  "default-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
  "style-src 'self' 'unsafe-inline' blob: data:",
  "font-src 'self' data: blob:", "img-src 'self' data: blob:", "media-src 'self' data: blob:",
  "worker-src 'self' blob: data:", "connect-src 'self' https: wss: data: blob:",
  "frame-src 'self' data: blob: https://open.weixin.qq.com https://mp.weixin.qq.com https://wx.qq.com https://login.weixin.qq.com",
  "object-src 'self' data: blob:", "base-uri 'self'",
].join('; ');
const auditHeaders = audit ? { 'Content-Security-Policy': auditCsp } : {};
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf', '.wasm': 'application/wasm', '.bin': 'application/octet-stream',
  '.zip': 'application/zip', '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json; charset=utf-8',
};
function withinRoot(value) { return value === root || value.startsWith(root + path.sep); }
const server = http.createServer(async (request, response) => {
  function fail(status, message) {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': audit ? 'no-store' : 'no-cache', ...auditHeaders });
    response.end(request.method === 'HEAD' ? undefined : message);
  }
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') return fail(405, 'Only GET and HEAD are supported.');
    const rawPath = (request.url ?? '/').split(/[?#]/, 1)[0];
    let decoded;
    try { decoded = decodeURIComponent(rawPath); } catch { return fail(400, 'Invalid URL.'); }
    if (!decoded.startsWith('/') || /[\\\0:]/.test(decoded)) return fail(400, 'Invalid path.');
    if (prefix && decoded === prefix) {
      response.writeHead(308, { Location: prefix + '/', ...auditHeaders });
      return response.end();
    }
    if (prefix && !decoded.startsWith(prefix + '/')) return fail(404, 'Outside the configured website prefix.');
    const relative = decoded.slice(prefix.length).replace(/^\/+/, '');
    if (audit && (relative === '__qa-network-audit.js' || hidReadonly && relative === '__qa-hid-readonly.js')) {
      const bytes = await readFile(relative === '__qa-hid-readonly.js' ? hidScriptPath : auditScriptPath);
      response.writeHead(200, { 'Content-Type': mime['.js'], 'Content-Length': bytes.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...auditHeaders });
      return response.end(request.method === 'HEAD' ? undefined : bytes);
    }
    let file = path.resolve(root, relative || 'index.html');
    if (!withinRoot(file)) return fail(403, 'Path outside website root.');
    let info;
    try {
      info = await stat(file);
      if (info.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file); }
      file = await realpath(file);
    } catch { return fail(404, 'File not found.'); }
    if (!withinRoot(file) || !info.isFile()) return fail(403, 'Path outside website root.');
    let instrumented;
    if (audit && path.extname(file).toLowerCase() === '.html') {
      const original = await readFile(file, 'utf8');
      const hidScript = hidReadonly && file === path.join(root, 'index.html') ? `<script defer src="${prefix}/__qa-hid-readonly.js"></script>` : '';
      const script = `<script id="mchose-network-audit" src="${prefix}/__qa-network-audit.js"></script>${hidScript}`;
      instrumented = Buffer.from(/<head\b[^>]*>/i.test(original) ? original.replace(/<head\b[^>]*>/i, head => head + '\n' + script) : script + '\n' + original);
    }
    response.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': instrumented?.length ?? info.size, 'Cache-Control': audit ? 'no-store' : 'no-cache', 'X-Content-Type-Options': 'nosniff', ...auditHeaders,
    });
    if (request.method === 'HEAD') return response.end();
    if (instrumented) return response.end(instrumented);
    createReadStream(file).on('error', () => response.destroy()).pipe(response);
  } catch (error) { if (!response.headersSent) fail(500, 'Server error.'); else response.destroy(error); }
});
server.on('error', error => { console.error(`Cannot start local server on port ${port}: ${error.message}`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => {
  console.log(`Local: http://127.0.0.1:${port}${prefix}/`);
  if (audit) console.log('QA: network audit is available in #mchose-network-audit[data-report]; external factory static fetch/XHR requests are blocked.');
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
