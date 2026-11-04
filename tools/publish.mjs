import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const owner = 'root50643';
const name = 'mchose-offline';
const repository = `${owner}/${name}`;
const command = process.argv[2] || 'status';
const raw = execFileSync('git', ['credential', 'fill'], {
  input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8',
  env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
  stdio: ['pipe', 'pipe', 'pipe'],
});
const credential = Object.fromEntries(raw.trim().split('\n').map(line => {
  const separator = line.indexOf('=');
  return [line.slice(0, separator), line.slice(separator + 1)];
}));
if (!credential.password) throw new Error('No existing GitHub credential is available.');

async function api(endpoint, method = 'GET', body, allowed = []) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${credential.password}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok && !allowed.includes(response.status)) {
    throw new Error(`${method} ${endpoint}: ${response.status} ${data?.message || ''}`);
  }
  return { status: response.status, data };
}

function git(args) {
  const result = spawnSync('git', args, {
    cwd: root, encoding: 'utf8',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
  });
  if (result.status !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr || result.stdout}`);
  return result.stdout.trim();
}

const profile = (await api('/user')).data;
if (profile.login !== owner) throw new Error(`Expected GitHub account ${owner}; found ${profile.login}.`);

if (command === 'publish') {
  const acceptancePath = path.join(root, 'reports', 'acceptance.json');
  if (!fs.existsSync(acceptancePath)) throw new Error('Missing reports/acceptance.json; run acceptance before publishing.');
  const acceptance = JSON.parse(fs.readFileSync(acceptancePath, 'utf8'));
  if (acceptance.passed !== true) throw new Error('Acceptance has not passed. Publication is blocked.');
  const offlineManifest = JSON.parse(fs.readFileSync(path.join(root, 'site', 'offline-manifest.json'), 'utf8'));
  if (acceptance.offlineVersion !== offlineManifest.version) throw new Error('Acceptance does not match the current offline build.');
  const verification = JSON.parse(fs.readFileSync(path.join(root, 'reports', 'static-verification.json'), 'utf8'));
  if (verification.passed !== true) throw new Error('Static verification has not passed.');
  const fresh = spawnSync(process.execPath, ['tools/build-offline.mjs', '--check'], { cwd: root, encoding: 'utf8' });
  if (fresh.status !== 0) throw new Error(`Offline build is stale: ${fresh.stderr || fresh.stdout}`);
  let repo = await api(`/repos/${repository}`, 'GET', undefined, [404]);
  if (repo.status === 404) {
    repo = await api('/user/repos', 'POST', {
      name, private: false,
      description: 'Unofficial offline M HUB mouse configuration archive. No cloud services or telemetry.',
      auto_init: false,
    });
  }
  if (repo.data.private !== false) throw new Error('Existing repository is private; do not change its visibility automatically.');
  if (!fs.existsSync(path.join(root, '.git'))) git(['init', '-b', 'main']);
  const origin = spawnSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' });
  const expected = `https://github.com/${repository}.git`;
  if (origin.status === 0 && origin.stdout.trim() !== expected) throw new Error('Unexpected Git origin.');
  if (origin.status !== 0) git(['remote', 'add', 'origin', expected]);
  git(['add', '.']);
  const changes = git(['status', '--porcelain']);
  if (changes) git(['-c', `user.name=${profile.name || owner}`, '-c', `user.email=${profile.id}+${owner}@users.noreply.github.com`, 'commit', '-m', 'Build verified offline M HUB mouse configurator']);
  git(['push', '-u', 'origin', 'main']);
  const pages = await api(`/repos/${repository}/pages`, 'GET', undefined, [404]);
  await api(`/repos/${repository}/pages`, pages.status === 404 ? 'POST' : 'PUT', { build_type: 'workflow' });
  console.log(JSON.stringify({ repository: `https://github.com/${repository}`, pages: `https://${owner}.github.io/${name}/`, commit: git(['rev-parse', 'HEAD']) }, null, 2));
} else if (command === 'status') {
  const repo = await api(`/repos/${repository}`, 'GET', undefined, [404]);
  const pages = await api(`/repos/${repository}/pages`, 'GET', undefined, [404]);
  const runs = repo.status === 404 ? null : (await api(`/repos/${repository}/actions/runs?per_page=3`)).data;
  console.log(JSON.stringify({ repository: repo.status === 404 ? null : repo.data.html_url, pages: pages.data, runs: runs?.workflow_runs?.map(run => ({ id: run.id, status: run.status, conclusion: run.conclusion, url: run.html_url, sha: run.head_sha })) }, null, 2));
} else if (command === 'dispatch') {
  await api(`/repos/${repository}/actions/workflows/pages.yml/dispatches`, 'POST', { ref: 'main' });
  console.log('Pages workflow dispatched.');
} else if (command === 'release') {
  const tag = 'v1.0.0';
  const archive = path.join(root, 'artifacts', 'mchose-offline.zip');
  if (!fs.existsSync(archive)) throw new Error('Run tools/package.ps1 first.');
  const acceptance = JSON.parse(fs.readFileSync(path.join(root, 'reports', 'acceptance.json'), 'utf8'));
  if (acceptance.passed !== true) throw new Error('Acceptance has not passed.');
  let release = await api(`/repos/${repository}/releases/tags/${tag}`, 'GET', undefined, [404]);
  if (release.status === 404) release = await api(`/repos/${repository}/releases`, 'POST', {
    tag_name: tag, target_commitish: 'main', name: 'M HUB 滑鼠離線版 1.0.0', draft: false, prerelease: false,
    body: '完整離線包：解壓縮後在 Windows 按兩下 start-offline.cmd，以 Chrome／Edge 開啟。包含公開前端快照、所有滑鼠所需資源、可取得的韌體與測試紀錄。非官方專案；不含雲端服務或遙測。原站已失效的韌體列於來源清單，驗收不刷寫韌體。',
  });
  const uploader = release.data.upload_url.replace(/\{.*$/, '');
  const links = [];
  for (const asset of [archive, archive + '.sha256']) {
    const filename = path.basename(asset);
    const size = fs.statSync(asset).size;
    const hash = crypto.createHash('sha256');
    for await (const chunk of fs.createReadStream(asset)) hash.update(chunk);
    const sha = `sha256:${hash.digest('hex')}`;
    const existing = release.data.assets?.find(item => item.name === filename);
    if (existing) {
      if (existing.size !== size || (existing.digest && existing.digest !== sha)) throw new Error(`Existing release asset differs: ${filename}`);
      links.push(existing.browser_download_url);
      continue;
    }
    const response = await fetch(`${uploader}?name=${encodeURIComponent(filename)}`, {
      method: 'POST', duplex: 'half', body: fs.createReadStream(asset),
      headers: { Authorization: `Bearer ${credential.password}`, Accept: 'application/vnd.github+json', 'Content-Type': filename.endsWith('.zip') ? 'application/zip' : 'text/plain', 'Content-Length': String(size) },
    });
    const uploaded = await response.json();
    if (!response.ok) throw new Error(`Release upload failed: ${response.status} ${uploaded.message || ''}`);
    if (uploaded.size !== size || (uploaded.digest && uploaded.digest !== sha)) throw new Error(`Release integrity mismatch: ${filename}`);
    links.push(uploaded.browser_download_url);
  }
  console.log(JSON.stringify({ release: release.data.html_url, assets: links }, null, 2));
} else {
  throw new Error('Usage: node tools/publish.mjs [status|publish|dispatch|release]');
}
