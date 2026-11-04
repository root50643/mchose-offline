import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

// Reproducible browser-side snapshot. No dependencies, browser login, or HID I/O.
const ROOT = path.resolve(import.meta.dirname, '..');
const UPSTREAM = path.join(ROOT, 'upstream');
const SITE = path.join(ROOT, 'site');
const SNAPSHOTS = path.join(ROOT, 'snapshots');
const ORIGIN = 'https://www.mchose.com.cn';
const CDN = 'https://cdn.mchose.com.cn';
const args = new Set(process.argv.slice(2));
const seedOnly = args.has('--seed-only');
const retryErrors = args.has('--retry-errors');
const copyOnly = args.has('--copy-only');
const knownManualsOnly = args.has('--known-mouse-manuals-only');
const CONCURRENCY = Number(process.env.SNAPSHOT_CONCURRENCY || 3);
const ATTEMPTS = Number(process.env.SNAPSHOT_ATTEMPTS || 4);
const REQUEST_TIMEOUT = Number(process.env.SNAPSHOT_TIMEOUT || 35000);
const MAX_FILE_BYTES = 95 * 1024 * 1024;
const startedAt = new Date().toISOString();
const MANIFEST_FILE = path.join(SNAPSHOTS, 'source-manifest.json');
const MAP_FILE = path.join(SNAPSHOTS, 'url-map.json');
const queue = [];
const queued = new Set();
const records = new Map();
const excluded = new Map();
const outOfScopeAssets = new Set();
const pathOwners = new Map();
const collisionUrls = new Set();
let active = 0;
let completed = 0;
let stopRequested = false;

function canonical(input, base = ORIGIN + '/') {
  try {
    const u = new URL(input.replace(/&amp;/g, '&'), base);
    if (!['https:', 'http:'].includes(u.protocol)) return null;
    u.hash = '';
    u.search = '';
    return u.href;
  } catch { return null; }
}

function safeRelative(u) {
  const pathname = decodeURIComponent(u.pathname).replace(/^\/+/, '') || 'index.html';
  const parts = pathname.split('/');
  if (parts.some(p => !p || p === '.' || p === '..' || /[<>:"|?*\x00-\x1f]/.test(p))) {
    throw new Error('Unsupported or unsafe asset pathname: ' + u.pathname);
  }
  return parts.join('/');
}

function locations(url) {
  const u = new URL(url);
  let relative = safeRelative(u);
  const identity=(u.hostname+'/'+relative).toLowerCase();
  const previous=pathOwners.get(identity);
  if(previous && previous !== url){collisionUrls.add(previous);collisionUrls.add(url);}
  else pathOwners.set(identity,url);
  if(collisionUrls.has(url)){
    const ext=path.posix.extname(relative);
    relative=relative.slice(0,relative.length-ext.length)+'.__url_'+crypto.createHash('sha256').update(url).digest('hex').slice(0,16)+ext;
  }
  return {
    upstreamPath: 'upstream/' + u.hostname + '/' + relative,
    sitePath: u.hostname === 'www.mchose.com.cn' ? relative : 'vendor/' + u.hostname + '/' + relative,
  };
}

const KNOWN_HOSTS = new Set(['www.mchose.com.cn', 'cdn.mchose.com.cn']);
const KEYBOARD = /(?:keyboard|ace[_ -]?(?:60|68|75)|zero75|jet75|mix87|god[_ -]?60|gt[_ -]?75|(?:^|[\/_.-]|[^\x00-\x7f])(?:K87|K99|KX75|G75|G87|G98|GX87|UT98|X75|Z75))/i;
const AUDIO = /(?:headset|headphone|speaker|audition|AudioTHX|\/audio\/|\/sounds\/|\/sound\/|\/static\/videos\/7\.1_|eqAudition|connected_speaker|connected_headphones|(?:^|[\/_.-])(?:K20|G20|S9[-_]?Pro|G9[-_]?(?:Pro|Line|Wired)|X9[-_]|R9[-_]|V9[-_]?))/i;
const IGNORED_EXT = /\.(?:exe|msi|rar|7z|psd|dmg|pkg|map)$/i;
const ASSET_EXT = /\.(?:js|mjs|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt)$/i;

function exclusion(url, reason) { excluded.set(url, reason); }

function shouldInclude(url, reason = '') {
  const u = new URL(url);
  const pathname = decodeURIComponent(u.pathname);
  if (!KNOWN_HOSTS.has(u.hostname)) { exclusion(url, 'External service or non-distribution host'); return false; }
  if (pathname.includes('${') || pathname.includes('`') || /[{}]/.test(pathname)) return false;
  if (u.pathname === '/') {
    if(u.hostname === 'www.mchose.com.cn')return true;
    exclusion(url,'CDN origin constant, not an asset request');return false;
  }
  if (outOfScopeAssets.has(url)) { exclusion(url, 'Asset declared by keyboard-only card configuration'); return false; }
  if (!ASSET_EXT.test(pathname)) return false;
  // Retain code and configuration even if shared by keyboard or audio screens.
  if (/\.(?:js|mjs|css|json|wasm|txt)$/i.test(pathname)) {
    if (/\/config\/(?:fullKeyCode|G75_Pro|G75_V2|G87_V2|G98_Pro|G98_V2|G98|GX87_V2|GX87|K87|K99_V2|K99|KX75|UT98|X75_V2|X75|Z75|Z75S)\.js$/i.test(pathname)) {
      exclusion(url, 'Bundler virtual keyboard module identifier'); return false;
    }
    if (/\/(?:layout-|default-keys-)/.test(pathname)) { exclusion(url, 'Keyboard layout chunk'); return false; }
    return true;
  }
  if (IGNORED_EXT.test(pathname)) { exclusion(url, 'Installer, source map, or design source outside mouse configuration'); return false; }
  if (/\/img\/global\//i.test(pathname)) return true;
  if (KEYBOARD.test(pathname) || AUDIO.test(pathname)) { exclusion(url, 'Keyboard or audio-specific asset'); return false; }
  if (/\/OTA\/PC\//i.test(pathname)) { exclusion(url, 'Desktop or audio OTA package'); return false; }
  if (/\/configCenter-test\//i.test(pathname) && !reason.includes('mouse-firmware')) { exclusion(url, 'Test environment asset'); return false; }
  return true;
}

function enqueue(input, base, reason = 'dependency', options = {}) {
  const url = canonical(input, base);
  if (!url || queued.has(url)) return;
  if (!options.force && !shouldInclude(url, reason)) return;
  try { locations(url); } catch (error) { exclusion(url, error.message); return; }
  queued.add(url);
  queue.push({url, sourceUrl: new URL(input, base || ORIGIN + '/').href, reason, ...options});
}

function digest(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex'); }
function decodeModelName(input) {
  const key = 'mchose_secret_2024';
  const data = Buffer.from(input,'base64');
  return [...data].map((c,i)=>String.fromCharCode(c ^ key.charCodeAt(i%key.length))).join('');
}

async function snapshotOfficial() {
  const main = await fs.readFile(path.join(UPSTREAM,'www.mchose.com.cn/assets/main-DnvOpr5S.js'),'utf8');
  const found = /const deviceList=\{keyboard:\[\],mouse:\[([\s\S]*?)\],audio:/.exec(main);
  if (!found) throw new Error('Could not locate upstream mouse model catalog');
  const list = JSON.parse('['+found[1].replace(/lLRkAWLi\("([^"]+)"\)/g,(_,x)=>JSON.stringify(decodeModelName(x)))+']');
  const versions = JSON.parse(await fs.readFile(path.join(SNAPSHOTS,'config/mouseConfig.json'),'utf8'));
  for(const name of Object.keys(versions)) if(!/^\d+$/.test(name)) list.push(name.replace(/^MCHOSE\s+/i,''));
  list.push('G3','G3 A','G3 Pro','G3 Ultra','G3 Ultra 4K','G3 Ultra 8K','G7','A5','A5 Pro','A5 Ultra','A5 V2 Pro','AX5 V2','MagDock');
  const models=[...new Set(list)].sort();
  await fs.writeFile(path.join(SNAPSHOTS,'mouse-models.json'),JSON.stringify({source:'upstream/www.mchose.com.cn/assets/main-DnvOpr5S.js deviceList.mouse + mouseConfig keys + legacy model aliases',models},null,2)+'\n');
  const directory=path.join(SNAPSHOTS,'official');
  await fs.mkdir(directory,{recursive:true});
  const apiRecords=[];
  const replies={};
  for(const model of models){
    const name=model.replace(/\s+/g,'');
    for(const requested of [name,...(/^MCHOSE/i.test(name)?[]:['MCHOSE'+name])]){
      const sourceUrl='https://www.maicong.cn/mchose/official?name='+encodeURIComponent(requested);
      const relative='snapshots/official/'+encodeURIComponent(requested)+'.json';
      const file=path.join(ROOT,relative);
      let buffer,reply,error;
      try{
        try{buffer=await fs.readFile(file);reply=JSON.parse(buffer);}catch{}
        if(!reply){
          for(let attempt=0;attempt<3;attempt++){
            try{
              const response=await fetch(sourceUrl,{headers:{'Content-Type':'application/json','token':'','User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(20000)});
              if(!response.ok)throw new Error('HTTP '+response.status);
              buffer=Buffer.from(await response.arrayBuffer());reply=JSON.parse(buffer);
              if(reply.code!==200)throw new Error('API code '+reply.code);
              await fs.writeFile(file,buffer);break;
            }catch(e){error=e;if(attempt===2)throw e;await new Promise(r=>setTimeout(r,1000*(attempt+1)));}
          }
        }
        apiRecords.push({model,name:requested,sourceUrl,path:relative,status:'ok',bytes:buffer.length,sha256:digest(buffer),capturedAt:new Date().toISOString(),empty:Object.keys(reply.data||{}).length===0});
        replies[requested]=reply;
      }catch(e){apiRecords.push({model,name:requested,sourceUrl,path:relative,status:'error',error:String(e)});}
    }
    if(apiRecords.length%20===0)console.log(JSON.stringify({officialQueries:apiRecords.length,models:models.length}));
  }
  await fs.writeFile(path.join(directory,'source-manifest.json'),JSON.stringify({formatVersion:1,updatedAt:new Date().toISOString(),files:apiRecords},null,2)+'\n');
  await fs.writeFile(path.join(SNAPSHOTS,'official-templates.json'),JSON.stringify(replies,null,2)+'\n');
  console.log(JSON.stringify({officialQueries:apiRecords.length,ok:apiRecords.filter(x=>x.status==='ok').length,empty:apiRecords.filter(x=>x.empty).length,errors:apiRecords.filter(x=>x.status==='error').length}));
}
function isText(url, contentType) {
  return /\.(?:html|js|mjs|css|json|txt)$/i.test(new URL(url).pathname) || /(?:javascript|json|text\/)/i.test(contentType);
}
function unpackConfig(value) {
  if (!value || typeof value !== 'object' || typeof value.__compressBase64__ !== 'string') return value;
  const zip = Buffer.from(value.__compressBase64__, 'base64');
  if (zip.readUInt32LE(0) !== 0x04034b50) throw new Error('Invalid embedded ZIP');
  const offset = 30 + zip.readUInt16LE(26) + zip.readUInt16LE(28);
  const compression = zip.readUInt16LE(8);
  const compressedSize = zip.readUInt32LE(18);
  const compressed = zip.subarray(offset, compressedSize ? offset + compressedSize : undefined);
  const plain = compression === 8 ? zlib.inflateRawSync(compressed) : compressed;
  return JSON.parse(plain.toString('utf8'));
}

function stringsIn(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach(x => stringsIn(x, out));
  else if (value && typeof value === 'object') Object.values(value).forEach(x => stringsIn(x, out));
  return out;
}

async function scanJson(url, text) {
  let value;
  try { value = unpackConfig(JSON.parse(text)); } catch { return; }
  const basename = path.posix.basename(new URL(url).pathname);
  if (/(?:global|cardList|mouseConfig|newMouseConfig|keyboardConfig|otaConfigApp_prod)\.json$/i.test(basename)) {
    const out = path.join(SNAPSHOTS, 'config', basename);
    await fs.mkdir(path.dirname(out), {recursive:true});
    await fs.writeFile(out, JSON.stringify(value, null, 2) + '\n');
  }
  if (basename === 'global.json') {
    records.get(url).version = value.version ?? null;
    records.get(url).applicationVersion = value.webVersion ?? null;
  }
  if (basename === 'cardList.json') {
    const cards = Array.isArray(value) ? value : value.data || [];
    for (const card of cards) if (card.webdriverEnum?.deviceType === 1) {
      for (const str of stringsIn(card)) if (/^https?:\/\//.test(str)) {
        const target = canonical(str,url);
        outOfScopeAssets.add(target);
        exclusion(target,'Asset declared by keyboard-only card configuration');
      }
    }
    if (cards.every(card=>card.webdriverEnum?.deviceType === 1)) return;
  }
  if (seedOnly && basename !== 'asset-manifest.json') return;
  for (const str of stringsIn(value)) {
    if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('//')) enqueue(str, url, 'json-resource');
    else if (/^(?:configCenter|configCenter-test)\//.test(str)) enqueue('/' + str, CDN, 'json-resource');
    else if (/\.(?:js|css|woff2?|ttf|json|wasm)$/i.test(str) && !str.includes(' ')) enqueue(str, url, 'manifest-entry');
  }
  if (basename === 'mouseConfig.json') {
    for (const item of Object.values(value)) {
      if (typeof item === 'string') {
        for (const part of ['offer', 'payload']) enqueue(CDN + '/configCenter/public/newBin/' + encodeURIComponent(item) + '.' + part + '.bin', url, 'mouse-firmware-legacy');
      } else if (item && typeof item === 'object') {
        for (const part of ['offer', 'payload']) if (item[part]) enqueue('/' + item[part], CDN, 'mouse-firmware-legacy', {force: true});
      }
    }
  }
  if (basename === 'newMouseConfig.json') {
    for (const item of Object.values(value)) for (const str of Object.values(item)) {
      if (typeof str === 'string' && str.endsWith('.bin')) enqueue('/' + str, CDN, 'mouse-firmware-modern', {force: true});
    }
  }
}

async function scan(url, buffer, contentType) {
  if (!isText(url, contentType)) return;
  const text = buffer.toString('utf8');
  const pathname = new URL(url).pathname;
  if (/\.json$/i.test(pathname)) await scanJson(url, text);
  if (seedOnly) {
    if (pathname === '/' || /\.html$/i.test(pathname)) for (const match of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) enqueue(match[1], url, 'html-resource');
    if (/\.(?:js|mjs)$/i.test(pathname)) for (const match of text.matchAll(/["'](\.\.?\/[^"'<>\s]+\.(?:js|mjs|css))["']/g)) enqueue(match[1], url, 'module-import');
    return;
  }
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>`\\]+/g)) {
    const candidate = match[0].replace(/[;,]+$/, '');
    if (!candidate.includes('${') && !/\.css$/i.test(pathname)) enqueue(candidate, url, 'absolute-resource');
  }
  if (/\.(?:js|mjs)$/i.test(pathname)) {
    // Vite import/dependency tables use relative, quoted filenames.
    for (const match of text.matchAll(/["'](\.\.?\/[^"'<>\s]+\.(?:js|mjs|css|json|wasm))["']/g)) enqueue(match[1], url, 'module-import');
    for (const match of text.matchAll(/getStaticUrl\(["']([^"']+)["']\)/g)) enqueue(CDN + '/configCenter/public' + match[1], url, 'static-helper');
    for (const match of text.matchAll(/getAssetsCdnUrl\(["']([^"']+)["']\)/g)) enqueue(CDN + '/configCenter/assets' + match[1], url, 'assets-helper');
    for (const match of text.matchAll(/assets\(["']([^"']+)["']\)/g)) enqueue(CDN + '/configCenter/assets' + match[1], url, 'assets-helper');
  }
  if (/\.css$/i.test(pathname)) {
    for (const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) if (!match[1].startsWith('data:')) enqueue(match[1], url, 'css-resource');
    for (const match of text.matchAll(/@import\s*["']([^"']+)["']/g)) enqueue(match[1], url, 'css-import');
  }
  if (pathname === '/' || /\.html$/i.test(pathname)) {
    for (const match of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) enqueue(match[1], url, 'html-resource');
  }
}

async function existingRecord(job) {
  const old = records.get(job.url);
  if (old?.status === 'error' && !retryErrors) return old;
  if (old?.status !== 'ok') return null;
  try {
    const buffer = await fs.readFile(path.join(ROOT, old.upstreamPath));
    if (buffer.length !== old.bytes || digest(buffer) !== old.sha256) return null;
    return {old, buffer};
  } catch { return null; }
}

async function fetchBuffer(job) {
  const loc = locations(job.url);
  const dest = path.join(ROOT, loc.upstreamPath);
  const partial = dest + '.part';
  await fs.mkdir(path.dirname(dest), {recursive:true});
  let lastError;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    let partialSize = 0;
    try { partialSize = (await fs.stat(partial)).size; } catch {}
    try {
      const headers = {'User-Agent':'Mozilla/5.0 (compatible; MCHOSE-offline-snapshot/1.0)', 'Accept-Encoding':'identity'};
      if (partialSize) headers.Range = 'bytes=' + partialSize + '-';
      const response = await fetch(job.sourceUrl, {headers, signal:AbortSignal.timeout(REQUEST_TIMEOUT)});
      if (response.status === 416 && partialSize) {
        await fs.rm(partial,{force:true});
        throw new Error('Partial range was rejected; restarting the complete asset');
      }
      if (!response.ok) throw new Error('HTTP ' + response.status + ' ' + response.statusText);
      const contentType = response.headers.get('content-type') || '';
      if (response.headers.get('content-length') > MAX_FILE_BYTES) throw new Error('File exceeds snapshot per-file safety limit');
      const append = response.status === 206 && partialSize > 0;
      const contentRange = response.headers.get('content-range');
      let range;
      if (response.status === 206) {
        range = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(contentRange || '');
        if (!range || Number(range[1]) !== partialSize || Number(range[2]) < Number(range[1])) {
          await response.body.cancel();
          await fs.rm(partial,{force:true});
          throw new Error('Invalid Content-Range for resumable download');
        }
      }
      if (!append) partialSize = 0;
      const handle = await fs.open(partial, append ? 'a' : 'w');
      let received = partialSize;
      try {
        for await (const chunk of response.body) {
          received += chunk.length;
          if (received > MAX_FILE_BYTES) throw new Error('File exceeds snapshot per-file safety limit');
          await handle.write(chunk);
        }
      } finally { await handle.close(); }
      const buffer = await fs.readFile(partial);
      if (buffer.length < 1) throw new Error('Empty response');
      const contentLength = response.headers.get('content-length');
      const transferred = buffer.length - partialSize;
      if (contentLength !== null && Number(contentLength) !== transferred) throw new Error('Incomplete response: Content-Length mismatch');
      if (range && (transferred !== Number(range[2])-Number(range[1])+1 || buffer.length !== Number(range[3]))) throw new Error('Incomplete response: Content-Range total mismatch');
      if (/\.(?:js|css|json|bin|woff2?|pdf)$/i.test(new URL(job.url).pathname) && /^\s*(?:<!doctype|<html)/i.test(buffer.subarray(0,200).toString())) {
        await fs.rm(partial, {force:true});
        throw new Error('Server returned HTML instead of asset');
      }
      if (/\.pdf$/i.test(new URL(job.url).pathname) && !buffer.subarray(0,1024).includes(Buffer.from('%PDF-'))) {
        await fs.rm(partial,{force:true});
        throw new Error('Server did not return a PDF document');
      }
      await fs.rename(partial, dest);
      return {buffer, contentType, etag:response.headers.get('etag'), lastModified:response.headers.get('last-modified'), ...loc};
    } catch (error) {
      lastError = error;
      if (attempt + 1 < ATTEMPTS) await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
    }
  }
  throw lastError;
}

async function copyInitial(buffer, sitePath) {
  const dest = path.join(SITE, sitePath);
  await fs.mkdir(path.dirname(dest), {recursive:true});
  try { await fs.writeFile(dest, buffer, {flag:'wx'}); } catch (e) { if (e.code !== 'EEXIST') throw e; }
}

async function processJob(job) {
  const cached = job.refresh ? null : await existingRecord(job);
  if (cached?.status === 'error') return;
  if (cached?.buffer) {
    await copyInitial(cached.buffer, cached.old.sitePath);
    await scan(job.url, cached.buffer, cached.old.contentType);
    return;
  }
  const loc = locations(job.url);
  try {
    const got = await fetchBuffer(job);
    records.set(job.url, {url:job.url, sourceUrl:job.sourceUrl, reason:job.reason, status:'ok', ...loc, bytes:got.buffer.length, sha256:digest(got.buffer), contentType:got.contentType, etag:got.etag, lastModified:got.lastModified, capturedAt:new Date().toISOString()});
    await copyInitial(got.buffer, loc.sitePath);
    await scan(job.url, got.buffer, got.contentType);
    completed++;
    if (completed <= 15 || completed % 10 === 0) console.log(JSON.stringify({downloaded:completed, queued:queue.length, bytes:got.buffer.length, url:job.url}));
  } catch(error) {
    records.set(job.url, {url:job.url, sourceUrl:job.sourceUrl, reason:job.reason, status:'error', ...loc, error:String(error), capturedAt:new Date().toISOString()});
    console.error('FAILED ' + job.url + ' ' + error.message);
  }
}

async function save() {
  const files = [...records.values()].sort((a,b)=>a.url.localeCompare(b.url));
  const totalBytes = files.reduce((sum,item)=>sum+(item.status === 'ok' ? item.bytes : 0),0);
  const manifest = {formatVersion:1, origin:ORIGIN, startedAt, updatedAt:new Date().toISOString(), scope:'All browser-supported mice, receivers, and docks; shared application runtime. No keyboard or audio-specific large assets.', totalBytes, files, exclusions:[...excluded.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([url,reason])=>({url,reason}))};
  await fs.mkdir(SNAPSHOTS, {recursive:true});
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2)+'\n');
  const map = Object.fromEntries(files.filter(x=>x.status === 'ok').map(x=>[x.url,x.sitePath]));
  await fs.writeFile(MAP_FILE, JSON.stringify(map, null, 2)+'\n');
  console.log(JSON.stringify({saved:true, files:files.length, ok:files.filter(x=>x.status==='ok').length, errors:files.filter(x=>x.status==='error').length, totalMiB:Math.round(totalBytes/1048576*100)/100, queued:queue.length}));
}

async function pruneOutOfScope() {
  for(const record of records.values()) {
    if(record.status !== 'ok' && record.status !== 'error') continue;
    if(shouldInclude(record.url,record.reason)) continue;
    const exclusionReason=excluded.get(record.url)||'Outside mouse configuration';
    if(record.status === 'ok') {
      const destination=path.join(SITE,record.sitePath);
      try {
        const current=await fs.readFile(destination);
        if(digest(current)===record.sha256)await fs.rm(destination);
        else record.preservedModifiedSiteCopy=true;
      }catch(error){if(error.code!=='ENOENT')throw error;}
    }
    record.status='excluded';
    record.exclusionReason=exclusionReason;
  }
}

async function repairPathCollisions() {
  // Windows is case-insensitive, while CDN paths can name different objects.
  // Give every member of a collision group a deterministic, source-specific path.
  for(const record of records.values())locations(record.url);
  const obsolete=new Set();
  for(const url of collisionUrls){
    const record=records.get(url);
    if(!record || record.status !== 'ok')continue;
    const wanted=locations(url);
    if(record.upstreamPath===wanted.upstreamPath && record.sitePath===wanted.sitePath)continue;
    obsolete.add(record.upstreamPath);obsolete.add('site/'+record.sitePath);
    await processJob({url,sourceUrl:record.sourceUrl,reason:record.reason,refresh:true});
    const updated=records.get(url);
    if(updated.status==='ok')updated.pathCollision={originalUpstreamPath:record.upstreamPath,originalSitePath:record.sitePath,strategy:'source-URL SHA256 suffix; every group member is independent'};
  }
  // These names are ambiguous and no longer referenced by successful records.
  const referenced=new Set([...records.values()].filter(x=>x.status==='ok').flatMap(x=>[x.upstreamPath,'site/'+x.sitePath]));
  for(const relative of obsolete)if(!referenced.has(relative))await fs.rm(path.join(ROOT,relative),{force:true});
}

async function pruneExcludedArchives() {
  const root=await fs.realpath(UPSTREAM);
  const references=new Map();
  for(const record of records.values()){
    const identity=path.resolve(ROOT,record.upstreamPath).toLowerCase();
    references.set(identity,(references.get(identity)||0)+1);
  }
  let removedFiles=0,removedBytes=0;
  for(const record of records.values()){
    if(record.status!=='excluded')continue;
    const target=path.resolve(ROOT,record.upstreamPath);
    try{await fs.access(target);}catch(e){if(e.code==='ENOENT'){record.archived=false;continue;}throw e;}
    if(/\.(?:html|js|mjs|css|json|txt|map)$/i.test(record.upstreamPath)){record.archived=true;continue;}
    if(references.get(target.toLowerCase())!==1){record.archivePruneSkipped='Shared or colliding source path';continue;}
    let actual,buffer;
    try{actual=await fs.realpath(target);buffer=await fs.readFile(actual);}catch(e){if(e.code==='ENOENT'){record.archived=false;continue;}throw e;}
    const relative=path.relative(root,actual);
    if(relative==='' || relative==='..' || relative.startsWith('..'+path.sep) || path.isAbsolute(relative))throw new Error('Archive prune target escapes upstream: '+actual);
    if(buffer.length!==record.bytes || digest(buffer)!==record.sha256){record.archivePruneSkipped='Source hash or size differs from recorded download';continue;}
    await fs.rm(actual);
    record.archived=false;
    record.archiveRemovedAt=new Date().toISOString();
    record.archiveRemovalReason='Out-of-scope keyboard/audio asset; source metadata and SHA256 retained';
    removedFiles++;removedBytes+=buffer.length;
  }
  console.log(JSON.stringify({prunedArchiveFiles:removedFiles,prunedArchiveMiB:Math.round(removedBytes/1048576*100)/100}));
}

await fs.mkdir(SNAPSHOTS,{recursive:true});
if(args.has('--official-only')){await snapshotOfficial();process.exit(0);}
try { const old = JSON.parse(await fs.readFile(MANIFEST_FILE,'utf8')); for (const item of old.files || []) records.set(item.url,item); } catch {}
await repairPathCollisions();
if(args.has('--prune-excluded-archives')){await pruneExcludedArchives();await save();process.exit(0);}
if (copyOnly) {
  for (const record of records.values()) if (record.status === 'ok') {
    const buffer = await fs.readFile(path.join(ROOT,record.upstreamPath));
    if (buffer.length !== record.bytes || digest(buffer) !== record.sha256) throw new Error('Upstream integrity check failed: '+record.url);
    await copyInitial(buffer,record.sitePath);
  }
  console.log('Restored missing deployment copies from upstream; existing site files were preserved.');
  process.exit(0);
}
const seeds = [
  ORIGIN+'/',
  CDN+'/configCenter/config/globalLoader.js',
  CDN+'/configCenter/config/global.json',
  CDN+'/configCenter/custom/cardList.json',
  CDN+'/configCenter/custom/mouseConfig.json',
  CDN+'/configCenter/custom/newMouseConfig.json',
  CDN+'/customPage/driver-ui/driver-ui.css',
  CDN+'/customPage/driver-ui/driver-ui.global.js',
  CDN+'/customPage/driver-ui/vue/driver-ui.vue.js',
  CDN+'/customPage/iconfont/iconfont.css',
  CDN+'/customPage/iconfont/iconfont.js',
  ORIGIN+'/cizhou/CZ_SHARED_DATA/loader.js?v=4',
  ORIGIN+'/cizhou/CZ_SHARED_DATA/asset-manifest.json',
  // NewMouse's G3 S manual branch constructs ./pdf/${language}/G3.pdf.
  // The reverse model-reference audit identifies these dynamic dependencies.
  ORIGIN+'/pdf/zh_CN/G3.pdf',
  ORIGIN+'/pdf/en_US/G3.pdf',
];
for (const seed of knownManualsOnly?seeds.slice(-2):seeds) enqueue(seed, ORIGIN+'/', 'seed', {force:true});
if (retryErrors) for (const record of records.values()) if (record.status === 'error') enqueue(record.sourceUrl || record.url, ORIGIN+'/', record.reason);
process.on('SIGINT',()=>{stopRequested=true;console.log('Stopping after active downloads; snapshot is resumable.');});
let savePromise = Promise.resolve();
const timer = setInterval(()=>{savePromise=savePromise.then(save).catch(console.error);},15000);
try {
  await new Promise(resolve=>{
    const pump=()=>{
      while(!stopRequested && active < CONCURRENCY && queue.length){
        const job=queue.shift();active++;
        processJob(job).finally(()=>{active--;pump();});
      }
      if(!active && (!queue.length || stopRequested))resolve();
    };pump();
  });
} finally { clearInterval(timer);await savePromise;await repairPathCollisions();await pruneOutOfScope();await save(); }
if ([...records.values()].some(x=>x.status==='error'))process.exitCode=2;
