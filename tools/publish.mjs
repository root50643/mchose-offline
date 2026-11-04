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
const description = 'M HUB frontend static asset mirror';
if (!['check', 'status', 'publish', 'dispatch'].includes(command)) throw new Error('Usage: node tools/publish.mjs [check|status|publish|dispatch]');
let credential;

function redact(value) {
  const text = String(value);
  return credential?.password ? text.split(credential.password).join('[redacted]') : text;
}

function loadCredential() {
  let raw;
  try {
    raw = execFileSync('git', ['credential', 'fill'], {
      input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8',
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch {
    // A child-process error can include stdout. Never expose credential output.
    throw new Error('Could not load an existing GitHub credential from Git Credential Manager.');
  }
  const value = Object.fromEntries(raw.trim().split(/\r?\n/).filter(line => line.includes('=')).map(line => {
    const separator = line.indexOf('=');
    return [line.slice(0, separator), line.slice(separator + 1)];
  }));
  if (!value.password) throw new Error('No existing GitHub credential is available.');
  return value;
}

async function verifyMirrorBuild() {
  const readReport = filename => {
    const location = path.join(root, 'reports', filename);
    if (!fs.existsSync(location)) throw new Error(`Missing reports/${filename}; complete mirror verification and acceptance before publishing.`);
    return JSON.parse(fs.readFileSync(location, 'utf8'));
  };
  const build = readReport('mirror-build.json');
  if (build.mode !== 'mirror' || build.precache !== false || !Array.isArray(build.files) || !build.files.length) throw new Error('The current build is not a frontend mirror without precaching.');
  const version = crypto.createHash('sha256').update(JSON.stringify(build.files)).digest('hex');
  if (build.version !== version) throw new Error('Mirror build inventory does not match its recorded version.');
  for (const filename of ['mirror-verification.json', 'mirror-acceptance.json']) {
    const report = readReport(filename);
    if (report.mode !== 'mirror' || report.passed !== true) throw new Error(`reports/${filename} has not passed mirror validation.`);
    if (report.version !== version) throw new Error(`reports/${filename} does not match the current mirror build.`);
  }
  const website = path.join(root, 'site');
  if (!fs.existsSync(website) || fs.lstatSync(website).isSymbolicLink()) throw new Error('The mirror website directory is missing or is a symbolic link.');
  const realSite = fs.realpathSync(website);
  const expectedPaths = new Set();
  for (const file of build.files) {
    if (typeof file.path !== 'string' || !file.path || file.path.includes('\\') || file.path.includes(':') || file.path.split('/').some(part => !part || part === '.' || part === '..') || path.isAbsolute(file.path)) throw new Error('Invalid path in the mirror build inventory.');
    if (expectedPaths.has(file.path)) throw new Error(`Duplicate mirror inventory path: ${file.path}`);
    expectedPaths.add(file.path);
    const absolute = path.resolve(website, file.path);
    if (!fs.existsSync(absolute) || !fs.realpathSync(absolute).startsWith(realSite + path.sep) || !fs.statSync(absolute).isFile()) throw new Error(`Mirror file is missing or outside the website: ${file.path}`);
    if (fs.statSync(absolute).size !== file.bytes) throw new Error(`Mirror file size has changed: ${file.path}`);
    const digest = crypto.createHash('sha256');
    for await (const chunk of fs.createReadStream(absolute)) digest.update(chunk);
    if (digest.digest('hex') !== file.sha256) throw new Error(`Mirror file integrity has changed: ${file.path}`);
  }
  function inspect(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not allowed in the mirror website: ${relative}`);
      if (entry.isDirectory()) inspect(path.join(directory, entry.name), relative + '/');
      else if (!entry.isFile() || !expectedPaths.has(relative)) throw new Error(`Unverified file in the mirror website: ${relative}`);
    }
  }
  inspect(website);
  return build;
}

const mirrorBuild = ['publish', 'check'].includes(command) ? await verifyMirrorBuild() : null;
if (command === 'check') {
  console.log(JSON.stringify({ mode: 'mirror', passed: true, version: mirrorBuild.version, files: mirrorBuild.files.length }, null, 2));
  process.exit(0);
}
credential = loadCredential();

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
    throw new Error(redact(`${method} ${endpoint}: ${response.status} ${data?.message || ''}`));
  }
  return { status: response.status, data };
}

function git(args) {
  const result = spawnSync('git', args, {
    cwd: root, encoding: 'utf8',
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
  });
  if (result.status !== 0) throw new Error(redact(`git ${args[0]} failed: ${result.stderr || result.stdout}`));
  return result.stdout.trim();
}

const profile = (await api('/user')).data;
if (profile.login !== owner) throw new Error(`Expected GitHub account ${owner}; found ${profile.login}.`);

if (command === 'publish') {
  let repo = await api(`/repos/${repository}`, 'GET', undefined, [404]);
  if (repo.status === 404) {
    repo = await api('/user/repos', 'POST', {
      name, private: false,
      description,
      auto_init: false,
    });
  }
  if (repo.data.private !== false) throw new Error('Existing repository is private; do not change its visibility automatically.');
  if (repo.data.description !== description) await api(`/repos/${repository}`, 'PATCH', { description });
  if (!fs.existsSync(path.join(root, '.git'))) git(['init', '-b', 'main']);
  if (git(['branch', '--show-current']) !== 'main') throw new Error('Publish the verified mirror from the main branch.');
  const origin = spawnSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' });
  const expected = `https://github.com/${repository}.git`;
  if (origin.status === 0 && origin.stdout.trim() !== expected) throw new Error('Unexpected Git origin.');
  if (origin.status !== 0) git(['remote', 'add', 'origin', expected]);
  git(['add', '.']);
  const changes = git(['status', '--porcelain']);
  if (changes) git(['-c', `user.name=${profile.name || owner}`, '-c', `user.email=${profile.id}+${owner}@users.noreply.github.com`, 'commit', '-m', 'Publish verified M HUB frontend static asset mirror']);
  git(['push', '-u', 'origin', 'main']);
  const pages = await api(`/repos/${repository}/pages`, 'GET', undefined, [404]);
  await api(`/repos/${repository}/pages`, pages.status === 404 ? 'POST' : 'PUT', { build_type: 'workflow' });
  console.log(JSON.stringify({ mode: 'mirror', version: mirrorBuild.version, repository: `https://github.com/${repository}`, pages: `https://${owner}.github.io/${name}/`, commit: git(['rev-parse', 'HEAD']) }, null, 2));
} else if (command === 'status') {
  const repo = await api(`/repos/${repository}`, 'GET', undefined, [404]);
  const pages = await api(`/repos/${repository}/pages`, 'GET', undefined, [404]);
  const runs = repo.status === 404 ? null : (await api(`/repos/${repository}/actions/runs?per_page=3`)).data;
  console.log(JSON.stringify({ repository: repo.status === 404 ? null : repo.data.html_url, pages: pages.data, runs: runs?.workflow_runs?.map(run => ({ id: run.id, status: run.status, conclusion: run.conclusion, url: run.html_url, sha: run.head_sha })) }, null, 2));
} else if (command === 'dispatch') {
  await api(`/repos/${repository}/actions/workflows/pages.yml/dispatches`, 'POST', { ref: 'main' });
  console.log('Pages workflow dispatched.');
} else {
  throw new Error('Usage: node tools/publish.mjs [check|status|publish|dispatch]');
}
