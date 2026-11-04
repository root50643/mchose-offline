import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = new URL('https://root50643.github.io/mchose-offline/');
const local = JSON.parse(await fs.readFile(path.join(root, 'site/offline-manifest.json'), 'utf8'));
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function read(url) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  throw lastError;
}
const remote = JSON.parse((await read(new URL('offline-manifest.json', base))).toString('utf8'));
if (remote.version !== local.version || JSON.stringify(remote.files) !== JSON.stringify(local.files)) throw new Error('Live manifest does not match the local verified build.');
const failures = [];
let next = 0;
let verified = 0;
let totalBytes = 0;
async function worker() {
  while (next < local.files.length) {
    const file = local.files[next++];
    try {
      const bytes = await read(new URL(file.url, base));
      if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) throw new Error('Content SHA-256 or length does not match.');
      verified++;
      totalBytes += bytes.length;
      if (verified % 100 === 0) console.log(JSON.stringify({ verified, total: local.files.length }));
    } catch (error) { failures.push({ path: file.path, error: error.message }); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
const remoteWorker = await read(new URL('sw.js', base));
const expectedWorker = await fs.readFile(path.join(root, 'site/sw.js'));
const workerMatches = sha256(remoteWorker) === sha256(expectedWorker);
if (!workerMatches) failures.push({ path: 'sw.js', error: 'Live worker differs from the verified build.' });
const report = {
  checkedAt: new Date().toISOString(), url: base.href, offlineVersion: local.version,
  passed: failures.length === 0 && verified === local.files.length,
  filesVerified: verified, totalBytes, serviceWorkerMatches: workerMatches,
  failures,
  method: 'Read each public deployment resource and verify its SHA-256 and byte length against the local complete offline manifest.',
  limitations: ['This verifies deployed resources, not browser network emulation. Physical-device and browser offline checks are documented separately.'],
};
await fs.writeFile(path.join(root, 'reports/live-integrity.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.passed ? 0 : 1;
