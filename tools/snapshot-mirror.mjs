import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {spawn} from 'node:child_process';
import {parse} from './vendor/acorn.mjs';

// Full public browser frontend archive. This tool never writes site/, rewrites
// source code/configuration, contacts accounts, or operates hardware.
const ROOT=path.resolve(import.meta.dirname,'..');
const SNAPSHOTS=path.join(ROOT,'snapshots');
const MANIFEST=path.join(SNAPSHOTS,'mirror-source-manifest.json');
const MAP=path.join(SNAPSHOTS,'mirror-url-map.json');
const WWW='https://www.mchose.com.cn';
const CDN='https://cdn.mchose.com.cn';
const CONCURRENCY=Number(process.env.MIRROR_CONCURRENCY||2);
const ATTEMPTS=Number(process.env.MIRROR_ATTEMPTS||3);
const TIMEOUT=Number(process.env.MIRROR_TIMEOUT||45000);
const TRANSPORT=process.env.MIRROR_TRANSPORT||(process.platform==='win32'?'curl':'fetch');
const MAX_FILE=Number(process.env.MIRROR_MAX_FILE_MIB||95)*1048576;
const MAX_TOTAL=Number(process.env.MIRROR_MAX_TOTAL_MIB||950)*1048576;
// Raw provenance may exceed the published budget before exact-byte deduplication
// or lossless packaging. Keep both limits explicit; this tool never publishes.
const MAX_CAPTURE=Number(process.env.MIRROR_MAX_CAPTURE_MIB||process.env.MIRROR_MAX_TOTAL_MIB||950)*1048576;
const retryKnown=process.argv.includes('--retry-known-errors');
const primaryOnly=process.argv.includes('--primary-only');
const wwwOnly=process.argv.includes('--www-only');
const curlWwwErrorsOnly=process.argv.includes('--curl-www-errors-only');
const MAX_SECONDS=Number(process.env.MIRROR_MAX_SECONDS||0);
const startedMs=Date.now();
const STATIC_HOSTS=new Set(['www.mchose.com.cn','cdn.mchose.com.cn','www.maicong.cn','ioss.maicong.cn','mchose-bbs.oss-cn-shenzhen.aliyuncs.com','cdn.jsdelivr.net','unpkg.com','cdnjs.cloudflare.com','api.mapbox.com']);
const ASSET=/\.(?:html|js|mjs|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i;
const ARCHIVE_DOWNLOAD=/\.(?:exe|msi|dmg|pkg|rar|7z|psd|apk)$/i;
const queue=[],queued=new Set(),records=new Map(),skipped=new Map(),cacheRecords=new Map(),owners=new Map(),collisions=new Set();
const exportedHelpers=new Map();
let pinnedVersions={},pinnedDriverCommit=null;
let active=0,newFiles=0,reused=0,stopRequested=false,completedBytes=0;
const startedAt=new Date().toISOString();
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const liveConfig=url=>/\/configCenter(?:-test)?\/(?:custom\/|config\/)/.test(new URL(url).pathname);
const desktopOnly=url=>/\/(?:customPage\/(?:pre|prod)|(?:customPage\/)?systemRepair)\//.test(new URL(url).pathname);
const desktopEvidence=[
  'assets/index-BfDJf4mL.js: browser getRendererBuildInfo returns canUpdate:false; urlRenderer is desktop environment metadata',
  'assets/main-DnvOpr5S.js: renderer updater returns before getEnvConfigs when canUpdate!==true; renderer OTA events are isInElectron-gated',
  'assets/index-Dpp9-y81.js: systemRepair/prod is an explicit native THX repair/install openBrowser service',
];
function requestedVersion(url){
  const pathname=new URL(url).pathname;
  if(/^\/customPage\/driver-ui\//.test(pathname))return {key:'__duVersion',hash:pinnedVersions.__duVersion};
  const match=/\/configCenter\/(?:custom|config)\/([^/]+)\.json$/.exec(pathname);
  if(match)return {key:match[1],hash:pinnedVersions[match[1]]};
  return null;
}
function requestSource(input,base){
  const u=new URL(input,base),version=requestedVersion(u.href);
  if(version?.hash)u.searchParams.set('hash',version.hash);
  return u.href;
}

function canonical(input,base=WWW+'/'){
  try{const u=new URL(input.replace(/&amp;/g,'&'),base);if(!['https:','http:'].includes(u.protocol))return null;u.hash='';u.search='';if(u.hostname==='www.mchose.com.cn'&&/^\/(?:index\.html|(?:gmouse|g7max)\/index\.html)$/.test(u.pathname))u.pathname=u.pathname.slice(0,-10);if(u.hostname==='cdn.mchose.com.cn')u.protocol='https:';return u.href;}catch{return null;}
}
function baseLocation(url){
  const u=new URL(url);let relative=decodeURIComponent(u.pathname).replace(/^\/+/, '');
  if(!relative||relative.endsWith('/'))relative+='index.html';
  if(relative.split('/').some(p=>!p||p==='.'||p==='..'||/[<>:"|?*\x00-\x1f]/.test(p)))throw new Error('Unsafe asset path: '+url);
  return {host:u.hostname,relative};
}
function location(url){
  const {host,relative:raw}=baseLocation(url),identity=(host+'/'+raw).toLowerCase();
  if(host==='www.mchose.com.cn'&&['index.html','gmouse/index.html','g7max/index.html'].includes(raw))return {upstreamPath:'upstream/'+host+'/'+raw,sitePath:raw};
  const previous=owners.get(identity);
  if(previous&&previous!==url){collisions.add(previous);collisions.add(url);}else owners.set(identity,url);
  const cached=cacheRecords.get(url);
  let relative=raw;
  if(cached?.upstreamPath?.includes('.__url_')){
    return {upstreamPath:cached.upstreamPath,sitePath:cached.sitePath};
  }
  if(collisions.has(url)){const ext=path.posix.extname(relative);relative=relative.slice(0,relative.length-ext.length)+'.__url_'+sha(Buffer.from(url)).slice(0,16)+ext;}
  return {upstreamPath:'upstream/'+host+'/'+relative,sitePath:host==='www.mchose.com.cn'?relative:'vendor/'+host+'/'+relative};
}
function include(url){
  const u=new URL(url),name=decodeURIComponent(u.pathname);
  if(!STATIC_HOSTS.has(u.hostname)){skipped.set(url,'External service or documentation link; preserve original URL');return false;}
  if(desktopOnly(url)){skipped.set(url,'Desktop renderer updater or native repair service; preserve official external link');return false;}
  if(/[{}]/.test(name)||name.includes('`')||name.startsWith('/config/'))return false;
  if(ARCHIVE_DOWNLOAD.test(name)||/MCHOSE_HUB_installer|VC_redist|vc_redist|Firmwaretool[^/]*\.zip$|\/exe\/|\/static\/archives\//i.test(name)){
    skipped.set(url,'Official installer, archive download, or design source; preserve official download link');return false;
  }
  if(name==='/'&&u.hostname==='www.mchose.com.cn')return true;
  if(name.endsWith('/')&&u.hostname==='www.mchose.com.cn')return /^\/(?:gmouse|g7max|cizhou)\//.test(name);
  if(!ASSET.test(name))return false;
  return true;
}
function enqueue(input,base=WWW+'/',reason='discovered-resource',force=false){
  const url=canonical(input,base);
  if(!url||queued.has(url))return;
  if(!force&&!include(url)){
    if(desktopOnly(url)){
      const old=cacheRecords.get(url);
      records.set(url,{...old,url,sourceUrl:old?.sourceUrl||new URL(input,base).href,reason,status:'excluded-desktop-service',previousStatus:old?.status,exclusionReason:'Not part of active WWW/gmouse/g7max browser frontend',scopeEvidence:desktopEvidence,archived:!!old?.sha256});
    }
    return;
  }
  try{location(url);}catch(error){skipped.set(url,error.message);return;}
  const cached=cacheRecords.get(url),p=new URL(url).pathname;
  if(wwwOnly&&new URL(url).hostname!=='www.mchose.com.cn'&&cached?.status!=='ok'){
    queued.add(url);
    const permanent=cached?.status==='error'&&/HTTP (?:403|404|410)/.test(cached.error||'');
    records.set(url,{...cached,url,sourceUrl:requestSource(input,base),reason,status:permanent?'error':'deferred-upstream',...location(url),fallbackUrl:requestSource(input,base),liveConfigSnapshot:liveConfig(url),error:cached?.error||'Deferred during bounded mirror capture; browser must use the original official URL'});
    return;
  }
  const priority=cached?.status==='ok'?0:new URL(url).hostname==='www.mchose.com.cn'?1:/\.bin$/i.test(p)?4:/\.(?:glb|gltf)$/i.test(p)?3:2;
  queued.add(url);queue.push({url,sourceUrl:requestSource(input,base),reason,priority});
}
function embeddedConfig(value){
  if(!value||typeof value!=='object'||typeof value.__compressBase64__!=='string')return value;
  const zip=Buffer.from(value.__compressBase64__,'base64');
  if(zip.readUInt32LE(0)!==0x04034b50)throw new Error('Invalid embedded configuration ZIP');
  const offset=30+zip.readUInt16LE(26)+zip.readUInt16LE(28),size=zip.readUInt32LE(18),data=zip.subarray(offset,size?offset+size:undefined);
  return JSON.parse((zip.readUInt16LE(8)===8?zlib.inflateRawSync(data):data).toString('utf8'));
}
function strings(value,out=[]){if(typeof value==='string')out.push(value);else if(Array.isArray(value))value.forEach(v=>strings(v,out));else if(value&&typeof value==='object')Object.values(value).forEach(v=>strings(v,out));return out;}
function scanValue(value,url,manifest=false){
  for(const str of strings(value)){
    if(/^https?:\/\//.test(str)||str.startsWith('//'))enqueue(str,url,'config-asset');
    else if(/^(?:configCenter(?:-test)?|OTA)\//.test(str))enqueue('/'+str,CDN,'config-asset');
    else if(/^custom\/[^/]+\.json$/.test(str))enqueue('/configCenter/'+str,CDN,'bare-config-reference');
    else if(/^(?:pcAssets|assets|public)\//.test(str))enqueue('/configCenter/'+str,CDN,'config-asset');
    else if((manifest||/^\.\.?\//.test(str))&&ASSET.test(str)&&!/[\s{}]/.test(str))enqueue(str,url,manifest?'sdk-manifest-entry':'config-relative-asset');
  }
  if(new URL(url).pathname.endsWith('/mouseConfig.json'))for(const item of Object.values(value)){
    if(typeof item==='string')for(const part of ['offer','payload'])enqueue(CDN+'/configCenter/public/newBin/'+encodeURIComponent(item)+'.'+part+'.bin',url,'declared-mouse-firmware');
  }
}
function nodeWalk(node,visit,parent=null){if(!node?.type)return;visit(node,parent);for(const value of Object.values(node))if(Array.isArray(value)){for(const child of value)if(child?.type)nodeWalk(child,visit,node);}else if(value?.type)nodeWalk(value,visit,node);}
function staticString(node){
  if(node?.type==='Literal'&&typeof node.value==='string')return node.value;
  if(node?.type==='TemplateLiteral'&&!node.expressions.length)return node.quasis[0].value.cooked;
  return null;
}
const namedPrefixes=new Map([
  ['getStaticUrl',CDN+'/configCenter/public'],
  ['getAssetsCdnUrl',CDN+'/configCenter/assets'],
  ['assets',CDN+'/configCenter/assets'],
  ['getRealImageUrl',CDN+'/'],
]);
function moduleHelpers(tree,url){
  const local=new Map(namedPrefixes);
  for(const statement of tree.body||[])if(statement.type==='ImportDeclaration'){
    const sourceUrl=canonical(statement.source.value,url),exports=exportedHelpers.get(sourceUrl);
    if(exports)for(const specifier of statement.specifiers)if(specifier.type==='ImportSpecifier'){
      const prefix=exports.get(specifier.imported.name??specifier.imported.value);if(prefix)local.set(specifier.local.name,prefix);
    }
  }
  const exports=new Map();
  for(const statement of tree.body||[])if(statement.type==='ExportNamedDeclaration')for(const specifier of statement.specifiers||[]){
    const prefix=local.get(specifier.local.name);if(prefix)exports.set(specifier.exported.name??specifier.exported.value,prefix);
  }
  if(exports.size)exportedHelpers.set(url,exports);
  return local;
}
function assetBase(url){
  const u=new URL(url);
  if(u.hostname==='www.mchose.com.cn')for(const name of ['gmouse','g7max'])if(u.pathname.startsWith('/'+name+'/'))return WWW+'/'+name+'/';
  return url;
}
async function scan(job,buffer,type){
  const url=job.url,p=new URL(url).pathname;
  if(primaryOnly)return;
  if(/\.glb$/i.test(p)&&buffer.subarray(0,4).toString()==='glTF'){
    let at=12;while(at+8<=buffer.length){const length=buffer.readUInt32LE(at),kind=buffer.readUInt32LE(at+4);if(kind===0x4e4f534a){try{scanValue(JSON.parse(buffer.subarray(at+8,at+8+length).toString().trim()),url,true);}catch{}}at+=8+length;}return;
  }
  if(/\.gltf$/i.test(p)){try{scanValue(JSON.parse(buffer.toString()),url,true);}catch{}return;}
  const textFile=/\.(?:js|mjs|css|json|svg|html)$/i.test(p)||p.endsWith('/')||/text\/|javascript|application\/json/.test(type);
  if(!textFile)return;
  const text=buffer.toString('utf8');
  if(/\.json$/i.test(p)){
    try{const value=embeddedConfig(JSON.parse(text));scanValue(value,url,p.endsWith('/asset-manifest.json'));if(p.endsWith('/global.json'))records.get(url).version=value.version??null;}catch(error){records.get(url).scanWarning=String(error);}
    return;
  }
  if(/\.(?:js|mjs)$/i.test(p)){
    try{
      const tree=parse(text,{ecmaVersion:'latest',sourceType:'module',allowReturnOutsideFunction:true});
      const helpers=moduleHelpers(tree,url);
      nodeWalk(tree,(node,parent)=>{
        if(node.type==='ImportDeclaration'||node.type==='ExportAllDeclaration'||node.type==='ExportNamedDeclaration'){if(node.source?.value)enqueue(node.source.value,url,'esm-import');}
        if(node.type==='ImportExpression'){const str=staticString(node.source);if(str)enqueue(str,url,'dynamic-import');}
        if(node.type==='CallExpression'&&node.callee.type==='Identifier'){
          const str=staticString(node.arguments[0]);
          const prefix=helpers.get(node.callee.name);
          if(str&&prefix)enqueue(/^https?:\/\//.test(str)?str:prefix+str,url,'static-url-helper');
        }
        if(node.type==='NewExpression'&&node.callee.type==='Identifier'&&node.callee.name==='URL'){
          const str=staticString(node.arguments[0]);if(str&&ASSET.test(str))enqueue(str,url,'new-url-resource');
        }
        const str=staticString(node);
        if(str!==null){
          if(/^https?:\/\//.test(str))enqueue(str,url,'absolute-asset-literal');
          else if(/^custom\/[^/]+\.json$/.test(str))enqueue('/configCenter/'+str,CDN,'bare-config-reference');
          else if(/^(?:configCenter(?:-test)?|OTA)\//.test(str))enqueue('/'+str,CDN,'prefixed-asset-literal');
          else if(/^\.\.?\//.test(str)&&ASSET.test(str)&&!(parent?.type==='Property'&&parent.key===node)&&!(parent?.type==='NewExpression'&&parent.callee?.name==='URL'))enqueue(str,/\.(?:js|mjs|css)$/i.test(str)?url:assetBase(url),'relative-asset-literal');
          else if(str.startsWith('/')&&ASSET.test(str)&&!(parent?.type==='CallExpression'&&helpers.has(parent.callee?.name)))enqueue(str,url,'root-asset-literal');
          else if(/^(?:img|image|images|fonts|media|audio|video|assets|static|3D)\//.test(str)&&ASSET.test(str))enqueue(str,assetBase(url),'public-path-asset');
        }
      });
    }catch(error){records.get(url).scanWarning='JavaScript AST: '+error.message;}
  }
  if(/\.(?:css|svg)$/i.test(p)){
    for(const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g))if(!match[1].startsWith('data:')&&!match[1].startsWith('#'))enqueue(match[1],url,'css-resource');
    for(const match of text.matchAll(/@import\s*["']([^"']+)["']/g))enqueue(match[1],url,'css-import');
  }
  if(/\.(?:svg|html)$/i.test(p)||p.endsWith('/')){
    for(const match of text.matchAll(/(?:src|href|poster)\s*=\s*["']([^"']+)["']/g))if(!match[1].startsWith('#'))enqueue(match[1],url,'markup-resource');
    for(const match of text.matchAll(/https?:\/\/[^\s"'<>`\\]+/g))enqueue(match[0].replace(/[;,]+$/,''),url,'markup-absolute-resource');
  }
}

async function download(job){
  if(TRANSPORT==='curl'){
    let last;
    for(let attempt=0;attempt<ATTEMPTS;attempt++){
      try{
        let record;
        try{record=await nativeWwwDownload({url:job.url,sourceUrl:job.sourceUrl,reason:job.reason});}
        catch(error){
          if(!/HTTP 403\b/.test(error.message))throw error;
          record=await nativeWwwDownload({url:job.url,sourceUrl:job.sourceUrl,reason:job.reason,officialRefererRetry:true});
        }
        return {...record,buffer:await fs.readFile(path.join(ROOT,record.upstreamPath)),redirected:record.finalUrl!==job.sourceUrl};
      }catch(error){last=error;if(/HTTP (?:403|404|410)|exceeds.*budget/.test(error.message))break;if(attempt+1<ATTEMPTS)await new Promise(r=>setTimeout(r,1000*2**attempt));}
    }
    throw last;
  }
  const loc=location(job.url),destination=path.join(ROOT,loc.upstreamPath),partial=destination+'.mirror-part';
  await fs.mkdir(path.dirname(destination),{recursive:true});let last;
  for(let attempt=0;attempt<ATTEMPTS;attempt++){
    let existing=0;try{existing=(await fs.stat(partial)).size;}catch{}
    try{
      const headers={'User-Agent':'Mozilla/5.0','Accept-Encoding':'identity'};if(existing)headers.Range='bytes='+existing+'-';
      const response=await fetch(job.sourceUrl,{headers,signal:AbortSignal.timeout(TIMEOUT)});
      if(response.status===416&&existing){await fs.rm(partial,{force:true});throw new Error('Range rejected; retry full file');}
      if(!response.ok)throw new Error('HTTP '+response.status+' '+response.statusText);
      const length=response.headers.get('content-length');
      if(length!==null&&Number(length)>MAX_FILE)throw new Error('Asset exceeds GitHub per-file budget ('+MAX_FILE+' bytes)');
      let range=null;
      if(response.status===206){range=/^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get('content-range')||'');if(!range||Number(range[1])!==existing){await response.body.cancel();await fs.rm(partial,{force:true});throw new Error('Invalid Content-Range');}}
      else existing=0;
      const handle=await fs.open(partial,existing?'a':'w');let received=existing;
      try{for await(const chunk of response.body){received+=chunk.length;if(received>MAX_FILE)throw new Error('Asset exceeds per-file budget');await handle.write(chunk);}}finally{await handle.close();}
      const buffer=await fs.readFile(partial),transferred=buffer.length-existing;
      if(!buffer.length)throw new Error('Empty response');
      if(length!==null&&Number(length)!==transferred)throw new Error('Content-Length mismatch');
      if(range&&(transferred!==Number(range[2])-Number(range[1])+1||buffer.length!==Number(range[3])))throw new Error('Content-Range total mismatch');
      if(!/\.html$/i.test(new URL(job.url).pathname)&&!new URL(job.url).pathname.endsWith('/')&&/^\s*(?:<!doctype|<html)/i.test(buffer.subarray(0,200).toString())){await fs.rm(partial,{force:true});throw new Error('Upstream returned HTML instead of an asset');}
      if(/\.pdf$/i.test(new URL(job.url).pathname)&&!buffer.subarray(0,1024).includes(Buffer.from('%PDF-'))){await fs.rm(partial,{force:true});throw new Error('Invalid PDF response');}
      if(completedBytes+buffer.length>MAX_CAPTURE){stopRequested=true;throw new Error('Mirror total exceeds raw capture budget; remaining queue retained in manifest');}
      await fs.rename(partial,destination);
      return {buffer,...loc,contentType:response.headers.get('content-type')||'',etag:response.headers.get('etag'),lastModified:response.headers.get('last-modified'),finalUrl:response.url,redirected:response.redirected};
    }catch(error){last=error;if(error.cause?.code)last=new Error(error.message+' ['+error.cause.code+': '+error.cause.message+']');if(/HTTP (?:403|404|410)|exceeds.*budget/.test(error.message))break;if(attempt+1<ATTEMPTS)await new Promise(r=>setTimeout(r,1000*2**attempt));}
  }
  throw last;
}
async function processJob(job,refresh=false){
  const known=records.get(job.url)||cacheRecords.get(job.url);
  if(!refresh&&known?.status==='error'&&!retryKnown&&/HTTP (?:403|404|410)/.test(known.error||'')){records.set(job.url,{...known,reason:job.reason,reusedFailureRecord:true});return;}
  if(!refresh&&known?.sha256&&known.upstreamPath){
    try{
      const buffer=await fs.readFile(path.join(ROOT,known.upstreamPath));
      if(buffer.length===known.bytes&&sha(buffer)===known.sha256){
        const loc=location(job.url);
        if(loc.upstreamPath!==known.upstreamPath&&/^https:\/\/www\.mchose\.com\.cn\/(?:gmouse\/|g7max\/)?$/.test(job.url))await copyVerifiedEntry(buffer,loc.upstreamPath,known.sha256);
        const selected=/^https:\/\/www\.mchose\.com\.cn\/(?:gmouse\/|g7max\/)?$/.test(job.url)?loc:{upstreamPath:known.upstreamPath,sitePath:known.sitePath};
        records.set(job.url,{...known,...selected,status:'ok',reason:job.reason,reused:true,liveConfigSnapshot:liveConfig(job.url),verifiedAt:new Date().toISOString()});
        completedBytes+=buffer.length;reused++;await scan(job,buffer,known.contentType||'');return;
      }
    }catch{}
  }
  const loc=location(job.url);
  if(wwwOnly&&new URL(job.url).hostname!=='www.mchose.com.cn'){
    records.set(job.url,{...known,url:job.url,sourceUrl:job.sourceUrl,reason:job.reason,status:'deferred-upstream',...loc,fallbackUrl:job.sourceUrl,error:'Cached file did not verify; official URL retained during bounded capture'});return;
  }
  try{
    const got=await download(job);
    const record={url:job.url,sourceUrl:job.sourceUrl,reason:job.reason,status:'ok',...loc,bytes:got.buffer.length,sha256:sha(got.buffer),contentType:got.contentType,etag:got.etag,lastModified:got.lastModified,capturedAt:new Date().toISOString(),liveConfigSnapshot:liveConfig(job.url),finalUrl:got.finalUrl,redirected:got.redirected,transport:got.transport||TRANSPORT};
    const version=requestedVersion(job.url);if(version?.hash)record.requestedVersion={...version,source:'archived global.json'};
    if(/\/customPage\/driver-ui\/.*\.js$/.test(new URL(job.url).pathname)){
      const commit=/@mchose\/driver-ui commit:\s*([a-f0-9]+)/.exec(got.buffer.subarray(0,300).toString())?.[1]||null;
      record.driverUiCommit=commit;
      if(pinnedDriverCommit&&commit&&commit!==pinnedDriverCommit){record.status='version-conflict';record.error='Driver UI commit differs from archived global/Vue UI: '+commit+' vs '+pinnedDriverCommit;records.set(job.url,record);console.error('VERSION CONFLICT '+job.url+' '+record.error);return;}
    }
    if(/\/(?:gmouse|g7max)\/$/.test(new URL(job.url).pathname)){
      const text=got.buffer.toString('utf8');record.entryEvidence={title:/<title[^>]*>([\s\S]*?)<\/title>/i.exec(text)?.[1]||null,scripts:[...text.matchAll(/<script[^>]*\bsrc=["']([^"']+)["']/g)].map(m=>m[1])};
      const homepage=records.get(WWW+'/')||cacheRecords.get(WWW+'/');
      if(record.sha256===homepage?.sha256){record.status='fallback-html';record.error='Subsite URL returned the root application HTML';records.set(job.url,record);console.error('FALLBACK HTML '+job.url+' '+JSON.stringify(record.entryEvidence));return;}
    }
    records.set(job.url,record);completedBytes+=got.buffer.length;newFiles++;await scan(job,got.buffer,got.contentType);
    if(newFiles<=12||newFiles%20===0)console.log(JSON.stringify({newFiles,reused,queued:queue.length,MiB:Math.round(completedBytes/1048576*100)/100,url:job.url,bytes:got.buffer.length}));
  }catch(error){records.set(job.url,{url:job.url,sourceUrl:job.sourceUrl,reason:job.reason,status:'error',...loc,error:String(error),...error.sourceResponse?{sourceResponse:error.sourceResponse}:{},capturedAt:new Date().toISOString()});console.error('FAILED '+job.url+' '+error.message);}
}
async function repairCollisions(){
  for(const record of records.values())location(record.url);
  for(const url of collisions){const record=records.get(url);if(record?.status!=='ok')continue;const desired=location(url);if(record.upstreamPath===desired.upstreamPath)continue;
    const oldBytes=record.bytes;completedBytes-=oldBytes;await processJob({url,sourceUrl:record.sourceUrl||url,reason:record.reason},true);
  }
}
async function copyVerifiedEntry(buffer,relative,expected){
  const destination=path.join(ROOT,relative);
  try{const existing=await fs.readFile(destination);if(sha(existing)!==expected)throw new Error('Canonical HTML entry differs from archived source: '+relative);}
  catch(error){if(error.code!=='ENOENT')throw error;await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,buffer,{flag:'wx'});}
}
async function nativeWwwDownload(record){
  const loc=location(record.url),destination=path.join(ROOT,loc.upstreamPath),partial=destination+'.mirror-native-part',headerPath=destination+'.mirror-native-head.tmp';
  await fs.mkdir(path.dirname(destination),{recursive:true});
  const executable=process.platform==='win32'?'curl.exe':'curl';
  let previousSize=0,previousEtag;
  try{previousSize=(await fs.stat(partial)).size;previousEtag=/^etag:\s*(.+)/im.exec(await fs.readFile(headerPath,'utf8'))?.[1]?.trim();}catch{}
  const args=['--silent','--show-error','--location','--fail','--connect-timeout','8','--max-time',String(Math.ceil(TIMEOUT/1000)),'--max-filesize',String(MAX_FILE),'--header','Accept-Encoding: identity','--dump-header',headerPath,'--output',partial,'--write-out','%{json}'];
  if(record.officialRefererRetry)args.push('--referer',WWW+'/','--user-agent','Mozilla/5.0');
  if(previousSize){args.push('--continue-at','-');if(previousEtag)args.push('--header','If-Range: '+previousEtag);}
  args.push(record.sourceUrl||record.url);
  const metadata=await new Promise((resolve,reject)=>{
    const child=spawn(executable,args,{stdio:['ignore','pipe','pipe'],windowsHide:true});let stdout='',stderr='';
    child.stdout.on('data',chunk=>{stdout+=chunk;});child.stderr.on('data',chunk=>{stderr+=chunk;});
    child.on('error',reject);child.on('close',code=>{let meta;try{meta=JSON.parse(stdout);}catch{}if(code!==0){
      const fail=async()=>{if(code===33||meta?.http_code===416)await fs.rm(partial,{force:true});const message=meta?.http_code>=400?'HTTP '+meta.http_code+' '+stderr.trim():'Native curl '+code+': '+stderr.trim();reject(new Error(message));};fail().catch(reject);
    }else if(meta)resolve(meta);else reject(new Error('Native transport did not return metadata'));});
  });
  const buffer=await fs.readFile(partial),header=await fs.readFile(headerPath,'utf8');
  // curl can report exit 0 for an already-complete -C range with HTTP 416.
  // Re-fetch from zero rather than accepting unproven bytes or looping forever.
  if(metadata.http_code>=400){
    if(metadata.http_code===416)await fs.rm(partial,{force:true});
    throw new Error('HTTP '+metadata.http_code+' from native transport');
  }
  if(!buffer.length){
    const error=new Error('Source returned HTTP '+metadata.http_code+' with an empty body');
    const last=header.trim().split(/\r?\n\r?\n/).at(-1);
    error.sourceResponse={httpStatus:metadata.http_code,contentLength:0,etag:/^etag:\s*(.+)/im.exec(last)?.[1]?.trim()||null,lastModified:/^last-modified:\s*(.+)/im.exec(last)?.[1]?.trim()||null,contentType:metadata.content_type,finalUrl:metadata.url_effective};
    throw error;
  }
  const pathname=new URL(record.url).pathname;
  if(!/\.html$/i.test(pathname)&&!pathname.endsWith('/')&&/^\s*(?:<!doctype|<html)/i.test(buffer.subarray(0,200).toString())){await fs.rm(partial,{force:true});throw new Error('Native transport returned HTML instead of an asset');}
  if(/\.pdf$/i.test(pathname)&&!buffer.subarray(0,1024).includes(Buffer.from('%PDF-'))){await fs.rm(partial,{force:true});throw new Error('Native transport returned invalid PDF bytes');}
  const blocks=header.trim().split(/\r?\n\r?\n/),last=blocks.at(-1),contentLength=/^content-length:\s*(\d+)/im.exec(last);
  const range=/^content-range:\s*bytes (\d+)-(\d+)\/(\d+)/im.exec(last);
  if(range){if(Number(range[1])!==previousSize||Number(range[3])!==buffer.length||Number(range[2])-Number(range[1])+1!==buffer.length-previousSize){await fs.rm(partial,{force:true});throw new Error('Native transport Content-Range mismatch');}}
  else if(previousSize){await fs.rm(partial,{force:true});throw new Error('Native transport resumed without a valid Content-Range');}
  if(contentLength&&Number(contentLength[1])!==buffer.length-previousSize)throw new Error('Native transport Content-Length mismatch');
  if(buffer.length>MAX_FILE)throw new Error('Asset exceeds GitHub per-file budget');
  if(completedBytes+buffer.length>MAX_CAPTURE){stopRequested=true;throw new Error('Mirror total exceeds raw capture budget');}
  await fs.rename(partial,destination);await fs.rm(headerPath,{force:true});
  return {...record,...loc,status:'ok',bytes:buffer.length,sha256:sha(buffer),contentType:metadata.content_type,finalUrl:metadata.url_effective,etag:/^etag:\s*(.+)/im.exec(last)?.[1]?.trim()||null,lastModified:/^last-modified:\s*(.+)/im.exec(last)?.[1]?.trim()||null,transport:'system-curl',capturedAt:new Date().toISOString(),error:undefined,reusedFailureRecord:undefined,liveConfigSnapshot:liveConfig(record.url)};
}
function remember(record){
  const normalized=canonical(record.url),alias=normalized!==record.url,existing=cacheRecords.get(normalized);
  if(alias&&existing){existing.urlAliases=[...new Set([...(existing.urlAliases||[]),record.url])];return;}
  cacheRecords.set(normalized,{...record,url:normalized,...alias?{urlAliases:[...(record.urlAliases||[]),record.url]}:{}});
}
async function repairWwwErrorsWithCurl(previous){
  for(const old of previous.files){const normalized=canonical(old.url),entry=cacheRecords.get(normalized);if(!records.has(normalized)||old.url===normalized)records.set(normalized,{...entry});}
  for(const record of records.values())if(record.status==='ok'){
    const buffer=await fs.readFile(path.join(ROOT,record.upstreamPath));if(buffer.length!==record.bytes||sha(buffer)!==record.sha256)throw new Error('Archive integrity failed: '+record.url);
    const loc=location(record.url);
    if(/^https:\/\/www\.mchose\.com\.cn\/(?:gmouse\/|g7max\/)?$/.test(record.url)){await copyVerifiedEntry(buffer,loc.upstreamPath,record.sha256);record.upstreamPath=loc.upstreamPath;record.sitePath=loc.sitePath;}
  }
  const targets=[...records.values()].filter(record=>record.status==='error'&&new URL(record.url).hostname==='www.mchose.com.cn'&&/\.js$/.test(new URL(record.url).pathname)&&/CONNECT_TIMEOUT|aborted due to timeout/.test(record.error||''));
  for(const target of targets){
    try{const updated=await nativeWwwDownload(target);records.set(updated.url,updated);await scan({url:updated.url,sourceUrl:updated.sourceUrl,reason:updated.reason},await fs.readFile(path.join(ROOT,updated.upstreamPath)),updated.contentType);console.log(JSON.stringify({nativeRepaired:updated.url,bytes:updated.bytes}));}
    catch(error){target.error=String(error);console.error('NATIVE FAILED '+target.url+' '+error.message);}
  }
  const remaining=queue.filter(job=>records.get(job.url)?.status!=='ok');queue.splice(0,queue.length,...remaining);
  await save();
  return {targets:targets.length,failed:targets.filter(target=>records.get(target.url)?.status!=='ok').length};
}
async function save(){
  const files=[...records.values()].sort((a,b)=>a.url.localeCompare(b.url));
  const deploy=files.filter(x=>x.status==='ok'&&!x.liveConfigSnapshot);
  const totalBytes=files.filter(x=>x.status==='ok').reduce((n,x)=>n+x.bytes,0),deploymentBytes=deploy.reduce((n,x)=>n+x.bytes,0);
  const excluded=files.filter(x=>x.status==='excluded-desktop-service');
  const result={formatVersion:1,mode:'Original full frontend acceleration mirror; lazy browser loading; no service worker or precache',startedAt,updatedAt:new Date().toISOString(),totalBytes,deploymentBytes,desktopScopeExclusion:{files:excluded.length,archivedBytes:excluded.reduce((n,x)=>n+(x.bytes||0),0),evidence:desktopEvidence},versionPolicy:{globalSnapshot:'upstream/cdn.mchose.com.cn/configCenter/config/global.json',savedVersions:pinnedVersions,driverUiCommit:pinnedDriverCommit,note:'Existing hash-verified files are reused; new versioned configuration/UI requests use the archived global version hash. No live global metadata is silently substituted.'},limits:{maxFileBytes:MAX_FILE,maxDeploymentBytes:MAX_TOTAL,maxCaptureBytes:MAX_CAPTURE,deploymentBudgetExceeded:deploymentBytes>MAX_TOTAL,maxSeconds:MAX_SECONDS||null,wwwOnly},files,skipped:[...skipped].map(([url,reason])=>({url,reason})),pending:queue.map(x=>({url:x.url,sourceUrl:x.sourceUrl,reason:x.reason})),deferredUpstream:files.filter(x=>x.status==='deferred-upstream').map(x=>({url:x.url,sourceUrl:x.sourceUrl,reason:x.reason,error:x.error}))};
  await fs.writeFile(MANIFEST,JSON.stringify(result,null,2)+'\n');
  await fs.writeFile(MAP,JSON.stringify(Object.fromEntries(deploy.flatMap(x=>[[x.url,x.sitePath],...(x.urlAliases||[]).map(alias=>[alias,x.sitePath])])),null,2)+'\n');
  console.log(JSON.stringify({saved:true,ok:files.filter(x=>x.status==='ok').length,errors:files.filter(x=>x.status==='error').length,deferredUpstream:result.deferredUpstream.length,fallbackHtml:files.filter(x=>x.status==='fallback-html').length,totalMiB:Math.round(totalBytes/1048576*100)/100,deploymentMiB:Math.round(deploymentBytes/1048576*100)/100,queued:queue.length}));
}

const v1=JSON.parse(await fs.readFile(path.join(SNAPSHOTS,'source-manifest.json'),'utf8'));
try{const raw=JSON.parse(await fs.readFile(path.join(ROOT,'upstream/cdn.mchose.com.cn/configCenter/config/global.json'),'utf8'));pinnedVersions=embeddedConfig(raw).version||{};}catch(error){throw new Error('Cannot read archived global version policy: '+error.message);}
try{const raw=await fs.readFile(path.join(ROOT,'upstream/cdn.mchose.com.cn/customPage/driver-ui/driver-ui.global.js'),'utf8');pinnedDriverCommit=/@mchose\/driver-ui commit:\s*([a-f0-9]+)/.exec(raw)?.[1]||null;}catch{}
for(const record of v1.files)remember(record);
let previousMirror;
try{previousMirror=JSON.parse(await fs.readFile(MANIFEST,'utf8'));for(const record of previousMirror.files||[])remember(record);}catch{}
for(const url of cacheRecords.keys())location(url);
for(const url of [WWW+'/assets/main-DnvOpr5S.js']){
  const record=cacheRecords.get(url);
  if(record)try{const text=await fs.readFile(path.join(ROOT,record.upstreamPath),'utf8');moduleHelpers(parse(text,{ecmaVersion:'latest',sourceType:'module'}),url);}catch{}
}
if(curlWwwErrorsOnly){if(!previousMirror)throw new Error('No mirror manifest to repair');const repair=await repairWwwErrorsWithCurl(previousMirror);process.exit(repair.failed?2:0);}
const seeds=[WWW+'/',WWW+'/gmouse/',WWW+'/g7max/',CDN+'/configCenter/config/globalLoader.js',CDN+'/configCenter/config/global.json',CDN+'/configCenter/custom/cardList.json',CDN+'/configCenter/custom/keyboardConfig.json',CDN+'/configCenter/custom/keyboardPreset.json',CDN+'/configCenter/custom/mouseConfig.json',CDN+'/configCenter/custom/newMouseConfig.json',CDN+'/customPage/driver-ui/driver-ui.css',CDN+'/customPage/driver-ui/driver-ui.global.js',CDN+'/customPage/driver-ui/vue/driver-ui.vue.js',CDN+'/customPage/driver-ui/react/driver-ui.react.js',CDN+'/customPage/iconfont/iconfont.css',CDN+'/customPage/iconfont/iconfont.js',WWW+'/cizhou/CZ_SHARED_DATA/loader.js?v=4',WWW+'/cizhou/CZ_SHARED_DATA/asset-manifest.json'];
for(const seed of seeds)enqueue(seed,WWW+'/','seed',true);
try{
  const discovery=JSON.parse(await fs.readFile(path.join(SNAPSHOTS,'mirror-discovery-seeds.json'),'utf8'));
  for(const url of discovery.urls||[])enqueue(url,WWW+'/','audited-dynamic-chunk');
}catch(error){if(error.code!=='ENOENT')throw error;}
try{
  // Persistent audited closure, including computed locale/model paths. The
  // live audit's missing-seed list becomes empty once retrieval succeeds.
  const audit=JSON.parse(await fs.readFile(path.join(SNAPSHOTS,'mirror-audited-resource-seeds.json'),'utf8'));
  for(const url of audit.urls||[])enqueue(url,WWW+'/','source-audited-helper');
}catch(error){if(error.code!=='ENOENT')throw error;}
try{
  const audit=JSON.parse(await fs.readFile(path.join(ROOT,'reports/mirror-dependency-seeds.json'),'utf8'));
  for(const url of audit.urls||[])enqueue(url,WWW+'/','source-audited-helper');
}catch(error){if(error.code!=='ENOENT')throw error;}
if(!primaryOnly)for(const record of cacheRecords.values())enqueue(record.sourceUrl||record.url,WWW+'/',record.reason||'v1-discovery');
process.on('SIGINT',()=>{stopRequested=true;console.log('Stopping after active downloads; resume with the same command.');});
let saving=Promise.resolve();const timer=setInterval(()=>{saving=saving.then(save).catch(console.error);},15000);
try{
  await new Promise(resolve=>{const pump=()=>{if(MAX_SECONDS&&Date.now()-startedMs>=MAX_SECONDS*1000)stopRequested=true;queue.sort((a,b)=>(a.priority??2)-(b.priority??2));while(!stopRequested&&active<CONCURRENCY&&queue.length){const job=queue.shift();active++;processJob(job).finally(()=>{active--;pump();});}if(!active&&(!queue.length||stopRequested))resolve();};pump();});
}finally{clearInterval(timer);await saving;await repairCollisions();await save();}
if([...records.values()].some(x=>['error','fallback-html','deferred-upstream','version-conflict'].includes(x.status))||queue.length)process.exitCode=2;
