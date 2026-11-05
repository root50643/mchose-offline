import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// Read-only source-byte and case-sensitive path verification. The only output
// written is the integrity report; no network, browser, app code, or HID runs.
const ROOT=path.resolve(import.meta.dirname,'..');
const read=async relative=>JSON.parse(await fs.readFile(path.join(ROOT,relative),'utf8'));
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const manifest=await read('snapshots/mirror-source-manifest.json');
const map=await read('snapshots/mirror-url-map.json');
const sourceV1=await read('snapshots/source-manifest.json');
const dynamic=await read('snapshots/mirror-discovery-seeds.json');
const audit=await read('reports/mirror-dependencies.json');
const versions=await read('snapshots/mirror-version-check.json');
const historic=(await fs.readFile(path.join(ROOT,'artifacts/mchose-cdn-unmirrored-urls.txt'),'utf8')).trim().split(/\r?\n/).map(url=>{const parsed=new URL(url);parsed.hash='';parsed.search='';return parsed.href;});
const records=new Map(manifest.files.map(file=>[file.url,file]));
const missing=[],hashErrors=[],caseErrors=[],collisions=[],mapErrors=[];
const dirs=new Map(),paths=new Map(),verified=new Map();
async function exactPath(relative){
  const parts=relative.replaceAll('\\','/').split('/');
  let absolute=ROOT;
  for(const part of parts){
    let names=dirs.get(absolute);
    if(!names){names=await fs.readdir(absolute);dirs.set(absolute,names);}
    if(!names.includes(part))return {expected:relative,actual:names.find(name=>name.toLowerCase()===part.toLowerCase())||null,segment:part};
    absolute=path.join(absolute,part);
  }
  return null;
}
const ok=manifest.files.filter(file=>file.status==='ok');
const archived=manifest.files.filter(file=>file.status==='excluded-desktop-service'&&file.archived&&file.sha256);
for(const file of [...ok,...archived]){
  const absolute=path.resolve(ROOT,file.upstreamPath||'');
  if(!absolute.startsWith(path.join(ROOT,'upstream')+path.sep)){missing.push({url:file.url,path:file.upstreamPath,error:'Outside upstream archive'});continue;}
  const key=file.upstreamPath.toLowerCase(),prior=paths.get(key);
  if(prior&&prior.sha256!==file.sha256)collisions.push({first:prior.url,second:file.url,path:file.upstreamPath});
  paths.set(key,file);
  try{
    const casing=await exactPath(file.upstreamPath);
    if(casing)caseErrors.push({url:file.url,...casing});
    let actual=verified.get(absolute);
    if(!actual){const bytes=await fs.readFile(absolute);actual={bytes:bytes.length,sha256:hash(bytes)};verified.set(absolute,actual);}
    if(actual.bytes!==file.bytes||actual.sha256!==file.sha256)hashErrors.push({url:file.url,path:file.upstreamPath,expected:{bytes:file.bytes,sha256:file.sha256},actual});
  }catch(error){missing.push({url:file.url,path:file.upstreamPath,error:String(error)});}
}
const deploy=ok.filter(file=>!file.liveConfigSnapshot);
for(const file of deploy)for(const url of [file.url,...file.urlAliases||[]])if(map[url]!==file.sitePath)mapErrors.push({url,expected:file.sitePath,actual:map[url]||null});
for(const [url,sitePath]of Object.entries(map)){
  const file=records.get(url)||deploy.find(candidate=>(candidate.urlAliases||[]).includes(url));
  if(!file||file.status!=='ok'||file.liveConfigSnapshot||file.sitePath!==sitePath)mapErrors.push({url,actual:sitePath,error:'URL map is not backed by a captured deployable source'});
}
const byHash=new Map();
for(const file of deploy){const group=byHash.get(file.sha256)||[];group.push(file);byHash.set(file.sha256,group);}
const duplicateGroups=[...byHash.values()].filter(group=>group.length>1).map(group=>({sha256:group[0].sha256,bytes:group[0].bytes,copies:group.length,savingBytes:(group.length-1)*group[0].bytes,urls:group.map(file=>file.url)})).sort((a,b)=>b.savingBytes-a.savingBytes);
const unavailable=manifest.files.filter(file=>['error','fallback-html','version-conflict','deferred-upstream'].includes(file.status)).map(file=>({url:file.url,status:file.status,error:file.error,reason:file.reason,capturedAt:file.capturedAt,sourceResponse:file.sourceResponse}));
const auditMissing=audit.dependencies.filter(dependency=>records.get(dependency.url)?.status!=='ok').map(dependency=>({url:dependency.url,certainty:dependency.certainty,status:records.get(dependency.url)?.status||'absent',error:records.get(dependency.url)?.error||null}));
const deploymentBytes=deploy.reduce((sum,file)=>sum+file.bytes,0),deduplicationSavingBytes=duplicateGroups.reduce((sum,group)=>sum+group.savingBytes,0);
const transient=unavailable.filter(file=>!/HTTP (?:403|404|410)\b/.test(file.error||'')&&!(file.sourceResponse?.httpStatus===200&&file.sourceResponse?.contentLength===0));
const report={
  checkedAt:new Date().toISOString(),mode:'Source-byte verification of original full browser mirror; no network, HID, or application execution',
  sourceManifestUpdatedAt:manifest.updatedAt,sourceFiles:ok.length,archivedDesktopFilesChecked:archived.length,
  deploymentBytes,sourceBytes:ok.reduce((sum,file)=>sum+file.bytes,0),
  missing,hashErrors,caseErrors,collisions,mapErrors,
  auditedDynamicSeeds:dynamic.urls.length,auditedDynamicSeedsAbsent:dynamic.urls.filter(url=>records.get(url)?.status!=='ok'),
  independentAudit:{generatedAt:audit.generatedAt,dependencies:audit.dependencies.length,uncaptured:auditMissing},
  canonicalEntries:{root:map['https://www.mchose.com.cn/'],rootIndexAlias:map['https://www.mchose.com.cn/index.html'],gmouse:map['https://www.mchose.com.cn/gmouse/'],g7max:map['https://www.mchose.com.cn/g7max/']},
  pending:manifest.pending.length,deferredUpstream:unavailable.filter(file=>file.status==='deferred-upstream').length,transientRetrievalErrors:transient,
  unavailable,statusCounts:manifest.files.reduce((counts,file)=>(counts[file.status]=(counts[file.status]||0)+1,counts),{}),
  previousCdnBacklog:{listedUrls:historic.length,currentStatus:historic.reduce((counts,url)=>{const status=records.get(url)?.status||'absent';counts[status]=(counts[status]||0)+1;return counts;},{})},
  statusByHost:manifest.files.reduce((hosts,file)=>{const host=new URL(file.url).hostname;hosts[host]||={};hosts[host][file.status]=(hosts[host][file.status]||0)+1;return hosts;},{}),
  originalUnavailableRecheck:sourceV1.files.filter(file=>file.status==='error').map(file=>{const current=records.get(file.url);return{url:file.url,previousError:file.error,currentStatus:current?.status||'absent',currentError:current?.error||null,checkedAt:current?.capturedAt||null};}),
  packaging:{maxFileBytes:Math.max(...deploy.map(file=>file.bytes)),maxAllowedFileBytes:manifest.limits.maxFileBytes,publishedSafetyBudget:manifest.limits.maxDeploymentBytes,rawExceedsPublishedSafetyBudget:deploymentBytes>manifest.limits.maxDeploymentBytes,deduplicationSavingBytes,uniqueContentBytes:deploymentBytes-deduplicationSavingBytes,uniqueContentFitsPublishedSafetyBudget:deploymentBytes-deduplicationSavingBytes<=manifest.limits.maxDeploymentBytes,largestDuplicateGroups:duplicateGroups.slice(0,20),note:'Deduplication is an estimate from exact SHA256 identity, not proof the final deployment has applied it.'},
  desktopScopeExclusion:manifest.desktopScopeExclusion,
  versionPolicy:{...manifest.versionPolicy,currentProbeCheckedAt:versions.checkedAt,currentProbeVersionDifferences:versions.probes.map(probe=>({url:probe.url,differences:probe.differences}))},
};
report.integrityPassed=![missing,hashErrors,caseErrors,collisions,mapErrors,report.auditedDynamicSeedsAbsent].some(items=>items.length);
report.retrievalFinished=manifest.pending.length===0&&transient.length===0;
report.allSourceResourcesAvailable=unavailable.length===0;
await fs.writeFile(path.join(ROOT,'snapshots/mirror-integrity-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({integrityPassed:report.integrityPassed,retrievalFinished:report.retrievalFinished,sourceFiles:ok.length,sourceUnavailable:unavailable.length,pending:manifest.pending.length,transientErrors:transient.length,integrityErrors:missing.length+hashErrors.length+caseErrors.length+collisions.length+mapErrors.length,rawDeploymentMiB:deploymentBytes/1048576,uniqueContentMiB:(deploymentBytes-deduplicationSavingBytes)/1048576}));
if(!report.integrityPassed||!report.retrievalFinished)process.exitCode=1;
