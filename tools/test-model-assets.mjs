import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {parse} from './vendor/acorn.mjs';

// Independent, offline reverse-reference audit. Only AST literals, known URL
// helpers and simple model-selection expressions are interpreted. The app,
// imports, browser APIs and HID routines are never executed.
const root=path.resolve(import.meta.dirname,'..');
const original='upstream/www.mchose.com.cn/assets/main-DnvOpr5S.js';
const source=await fs.readFile(path.join(root,original),'utf8');
const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'});
const urlMap=JSON.parse(await fs.readFile(path.join(root,'snapshots/url-map.json'),'utf8'));
const sourceManifest=JSON.parse(await fs.readFile(path.join(root,'snapshots/source-manifest.json'),'utf8'));
const sourceRecords=new Map(sourceManifest.files.map(record=>[record.url,record]));
const acceptKnownSource404=process.argv.includes('--accept-known-source-404');
const knownUnavailableManuals=new Set([
  'https://www.mchose.com.cn/pdf/zh_CN/G3.pdf',
  'https://www.mchose.com.cn/pdf/en_US/G3.pdf',
]);
const U=Symbol('unresolved');
const bindings=new Map(),cache=new Map(),resolving=new Set();
for(const statement of ast.body)for(const declaration of statement.declarations||[])if(declaration.id.type==='Identifier')bindings.set(declaration.id.name,declaration.init);
const code=node=>source.slice(node.start,node.end);
const nodes=[];
function walk(node,parent=null){
  if(!node?.type)return;
  nodes.push({node,parent});
  for(const value of Object.values(node))if(Array.isArray(value)){for(const child of value)if(child?.type)walk(child,node);}else if(value?.type)walk(value,node);
}
walk(ast);
function decode(text){const key='mchose_secret_2024';return [...Buffer.from(text,'base64')].map((c,i)=>String.fromCharCode(c^key.charCodeAt(i%key.length))).join('');}
function globalValue(name){
  if(cache.has(name))return cache.get(name);
  if(!bindings.has(name)||resolving.has(name))return U;
  resolving.add(name);const result=evaluate(bindings.get(name),new Map());resolving.delete(name);cache.set(name,result);return result;
}
function propertyName(property,env){return property.computed?evaluate(property.key,env):property.key.name??property.key.value;}
function evaluate(node,env){
  if(!node)return U;
  switch(node.type){
    case 'Literal':return node.value;
    case 'Identifier':return env.has(node.name)?env.get(node.name):globalValue(node.name);
    case 'ArrayExpression':return node.elements.map(item=>evaluate(item,env));
    case 'ObjectExpression':{
      const result={};for(const prop of node.properties)if(prop.type==='Property'){const key=propertyName(prop,env);if(key!==U)result[key]=evaluate(prop.value,env);}return result;
    }
    case 'TemplateLiteral':{
      let result=node.quasis[0].value.cooked;for(let i=0;i<node.expressions.length;i++){const v=evaluate(node.expressions[i],env);if(v===U)return U;result+=v+node.quasis[i+1].value.cooked;}return result;
    }
    case 'MemberExpression':{
      const object=evaluate(node.object,env),key=node.computed?evaluate(node.property,env):node.property.name;
      if(object===U){if(['THEME','HOME_PRESENTATION_MODE'].includes(node.object.name))return key;return U;}
      return object?.[key]??U;
    }
    case 'UnaryExpression':{
      const value=evaluate(node.argument,env);if(value===U)return U;
      if(node.operator==='!')return !value;if(node.operator==='-')return -value;if(node.operator==='+')return +value;return U;
    }
    case 'BinaryExpression':{
      const l=evaluate(node.left,env),r=evaluate(node.right,env);if(l===U||r===U)return U;
      switch(node.operator){case '+':return l+r;case '-':return l-r;case '===':return l===r;case '!==':return l!==r;case '==':return l==r;case '!=':return l!=r;case '>':return l>r;case '<':return l<r;case '>=':return l>=r;case '<=':return l<=r;default:return U;}
    }
    case 'LogicalExpression':{
      const left=evaluate(node.left,env);if(left===U)return U;
      if(node.operator==='&&')return left?evaluate(node.right,env):left;
      if(node.operator==='||')return left||evaluate(node.right,env);
      return left??evaluate(node.right,env);
    }
    case 'ConditionalExpression':{
      const test=evaluate(node.test,env);if(test===U)throw new Error('Unresolved model-selection condition: '+code(node.test));
      return evaluate(test?node.consequent:node.alternate,env);
    }
    case 'SequenceExpression':{let result;for(const expression of node.expressions)result=evaluate(expression,env);return result;}
    case 'AssignmentExpression':{
      if(node.operator!=='='||node.left.type!=='Identifier')return U;
      const result=evaluate(node.right,env);env.set(node.left.name,result);return result;
    }
    case 'CallExpression':{
      const text=code(node.callee);
      if(text==='lLRkAWLi'||text.includes('?globalThis.lLRkAWLi:lLRkAWLi'))return decode(evaluate(node.arguments[0],env));
      if(text==='atob')return Buffer.from(evaluate(node.arguments[0],env),'base64').toString('binary');
      if(['getAssetsCdnUrl','assets'].includes(text))return 'https://cdn.mchose.com.cn/configCenter/assets'+evaluate(node.arguments[0],env);
      if(text==='getStaticUrl')return 'https://cdn.mchose.com.cn/configCenter/public'+evaluate(node.arguments[0],env);
      if(text==='Object.freeze'||text==='freezeVariants')return evaluate(node.arguments[0],env);
      if(text==='lang.getLang')return env.get('__lang');
      if(node.callee.type==='MemberExpression'){
        const object=evaluate(node.callee.object,env),method=node.callee.computed?evaluate(node.callee.property,env):node.callee.property.name;
        const args=node.arguments.map(argument=>evaluate(argument,env));
        if(object===U||args.some(v=>v===U))return U;
        if(typeof object==='string'&&['includes','indexOf','startsWith','endsWith','replace','trim','toUpperCase','toLowerCase','split'].includes(method))return String.prototype[method].apply(object,args);
        if(Array.isArray(object)&&['push','includes','join'].includes(method))return Array.prototype[method].apply(object,args);
      }
      return U;
    }
    case 'ChainExpression':return evaluate(node.expression,env);
    default:return U;
  }
}
function urls(value,field='',result=[]){
  if(typeof value==='string'&&/^https?:\/\//.test(value))result.push({field,url:value});
  else if(Array.isArray(value))value.forEach((item,i)=>urls(item,field+'['+i+']',result));
  else if(value&&typeof value==='object')Object.entries(value).forEach(([key,item])=>urls(item,field?field+'.'+key:key,result));
  return result;
}
const models=globalValue('deviceList').mouse;
assert.equal(models.length,39,'Upstream mouse catalog changed; review the audit');
assert.equal(new Set(models).size,39);
const images=globalValue('deviceImageMap');
const newRouteNames=new Set(globalValue('allowUpdateDevice'));
const routes={};
for(const {node} of nodes)if(node.type==='ObjectExpression'){
  const properties=new Map(node.properties.filter(p=>p.type==='Property'&&!p.computed).map(p=>[p.key.name??p.key.value,p.value]));
  const name=properties.get('name'),pathname=properties.get('path');
  if(name?.type==='Literal'&&['Mouse','NewMouse'].includes(name.value)&&pathname?.type==='Literal')routes[name.value]=pathname.value;
}
assert.deepEqual(routes,{Mouse:'/detail',NewMouse:'/newMouse'});
const mouseBlock=nodes.find(({node})=>node.type==='BlockStatement'&&node.body.some(st=>st.type==='VariableDeclaration'&&st.declarations.some(d=>d.id.name==='ur'&&d.init?.type==='ArrayExpression'))&&node.body.some(st=>st.type==='VariableDeclaration'&&st.declarations.some(d=>d.id.name==='Ca'&&code(d.init).startsWith('oa.replace'))))?.node;
assert.ok(mouseBlock,'Mouse color-selection block not found');
const colorSelection=mouseBlock.body.find(st=>st.type==='ExpressionStatement'&&code(st.expression).startsWith('xa?'))?.expression;
assert.ok(colorSelection,'Mouse color-selection conditional not found');
const docSelectors=nodes.filter(({node})=>node.type==='ArrowFunctionExpression'&&node.body.type==='BlockStatement'&&node.end-node.start<10000&&/https:\/\/cdn\.mchose\.com\.cn\/configCenter\/static\/documents\//.test(code(node.body))&&code(node.body).includes('.value.includes('));
assert.equal(docSelectors.length,2,'Expected old and new mouse PDF selectors');
const selectors=globalValue('DROP_ZONE_SELECTORS');
assert.deepEqual(Object.keys(selectors),['left','forward','retreat','right','mid','dpi']);
const mainCss='assets/main-C4JepROK.css';
const cssText=await fs.readFile(path.join(root,'site',mainCss),'utf8');
for(const [button,selector] of Object.entries(selectors))assert.ok(cssText.includes(selector),'Button overlay CSS missing: '+button);
const configFiles=['snapshots/config/mouseConfig.json','snapshots/config/newMouseConfig.json'];
const configurations=await Promise.all(configFiles.map(file=>fs.readFile(path.join(root,file),'utf8').then(JSON.parse)));
const missing=[],warnings=[];
function canonical(input){const u=new URL(input);u.hash='';u.search='';return u.href;}
async function verifyReference(reference){
  const url=canonical(reference.url),sitePath=urlMap[url];
  const result={...reference,url,sitePath:sitePath??null,status:'ok'};
  if(!sitePath){
    const record=sourceRecords.get(url);
    result.status=record?.status==='error'?'upstream-unavailable':'missing-url-map';
    if(record?.error)result.sourceError=record.error;
    missing.push(result);return result;
  }
  try{
    const full=path.resolve(root,'site',sitePath),inside=path.relative(path.join(root,'site'),full);
    if(inside.startsWith('..')||path.isAbsolute(inside))throw new Error('Mapped path escapes site');
    const file=await fs.readFile(full);if(!file.length)throw new Error('Empty file');
    result.bytes=file.length;
    if(/\.png$/i.test(sitePath)&&file.subarray(1,4).toString()==='PNG')result.pngAlphaChannel=[4,6].includes(file[25]);
    if(/\.pdf$/i.test(sitePath)&&!file.subarray(0,1024).includes(Buffer.from('%PDF-')))throw new Error('File is not a PDF document');
  }catch(error){result.status='missing-site-file';result.error=String(error);missing.push(result);}
  return result;
}
const results=[];
const entrypointResources=await Promise.all([
  'https://www.mchose.com.cn/',
  'https://www.mchose.com.cn/assets/main-CWbC7lIt.js',
  'https://www.mchose.com.cn/assets/main-DnvOpr5S.js',
  'https://www.mchose.com.cn/assets/main-C4JepROK.css',
].map(url=>verifyReference({category:'shared-entrypoint',url})));
const deployedMain=await fs.readFile(path.join(root,'site/assets/main-DnvOpr5S.js'),'utf8');
for(const [name,pathname] of Object.entries(routes))assert.ok(deployedMain.includes('path:'+JSON.stringify(pathname)+',name:'+JSON.stringify(name)),'Deployed setting route missing: '+name);
for(const model of models){
  const productName='MCHOSE '+model,routeName=newRouteNames.has(productName)?'NewMouse':'Mouse';
  const imageObject=images[model];assert.ok(imageObject,'No upstream fallback image for '+model);
  const mainImage=await Promise.all(urls(imageObject,'deviceImageMap.'+model).map(reference=>verifyReference({...reference,model,category:'main-mouse-image'})));
  assert.ok(mainImage.length>=2,'Expected light and dark image references for '+model);
  const env=new Map([['oa',productName],['ca',14391],['ua',0]]);
  for(const statement of mouseBlock.body)if(statement.type==='VariableDeclaration')for(const declaration of statement.declarations)if(declaration.id.type==='Identifier')env.set(declaration.id.name,evaluate(declaration.init,env));
  evaluate(colorSelection.type==='SequenceExpression'?colorSelection.expressions[0]:colorSelection,env);
  const colors=env.get('ur');assert.ok(Array.isArray(colors),'Could not statically select color images for '+model);
  const colorImages=await Promise.all(urls(colors,'buildDeviceAppendList.colors').map(reference=>verifyReference({...reference,model,category:reference.field.includes('homeImmersive')?'immersive-background':'mouse-color-image'})));
  const manuals=[];
  for(const language of ['zh_CN','en_US'])for(const {node} of [docSelectors[routeName==='NewMouse'?1:0]]){
    const local=new Map([['__lang',language]]);
    for(const match of code(node).matchAll(/([A-Za-z_$][\w$]*)\.value\.includes\(/g))local.set(match[1],{value:productName});
    for(const statement of node.body.body){
      if(statement.type==='VariableDeclaration'){
        for(const declaration of statement.declarations)if(declaration.id.type==='Identifier')local.set(declaration.id.name,evaluate(declaration.init,local));
      }else if(statement.type==='ExpressionStatement')evaluate(statement.expression,local);
    }
    for(const [name,value] of local)if(typeof value==='string'&&value.endsWith('.pdf'))manuals.push(await verifyReference({model,category:'manual',field:language+'.'+name,rawReference:value,url:new URL(value,'https://www.mchose.com.cn/').href}));
  }
  const uniqueManuals=manuals.filter((item,i)=>manuals.findIndex(other=>other.url===item.url&&other.field===item.field)===i);
  if(!uniqueManuals.length)warnings.push({model,kind:'no-upstream-manual-branch',message:'The original PDF selectors provide no manual for this model; no filename was invented.'});
  if(colors.length===0)warnings.push({model,kind:'upstream-empty-color-list',message:'Original color-selection branch is empty; model still has light/dark fallback images.'});
  const firmwareConfig=configurations.map((configuration,i)=>({source:configFiles[i],keys:Object.keys(configuration).filter(key=>key===productName||key.toLowerCase()===model.toLowerCase())})).filter(item=>item.keys.length);
  results.push({model,productName,entry:{routeName,path:routes[routeName],hash: '#'+routes[routeName]+'?deviceName='+encodeURIComponent(productName),implementation:'assets/main-DnvOpr5S.js'},mainImage,colorImages,manuals:uniqueManuals,buttonVisuals:{kind:'DOM/CSS overlay over the main mouse image',source:'DROP_ZONE_SELECTORS',buttons:selectors,stylesheet:mainCss,externalPerModelButtonBitmap:false},firmwareConfig,upstreamEmptyColorList:colors.length===0});
}
// Negative control: prove this check starts from model references and detects a
// missing resource even when every remaining entry in url-map exists.
const reference=results[0].mainImage[0],saved=urlMap[reference.url];
delete urlMap[reference.url];
const before=missing.length;await verifyReference(reference);
assert.equal(missing.length,before+1);assert.equal(missing.at(-1).status,'missing-url-map');
missing.pop();urlMap[reference.url]=saved;
function isKnownSource404(reference){
  return reference.model==='G3 S'&&reference.category==='manual'&&knownUnavailableManuals.has(reference.url)&&reference.status==='upstream-unavailable'&&/\bHTTP 404\b/.test(reference.sourceError||'');
}
assert.equal(isKnownSource404(reference),false,'Negative control must not receive the manual exception');
assert.equal(isKnownSource404({...reference,model:'G3 S',category:'manual',url:'https://www.mchose.com.cn/pdf/en_US/UNEXPECTED.pdf',status:'upstream-unavailable',sourceError:'HTTP 404 Not Found'}),false,'Unknown missing manuals must not receive the exception');
const runtimeGuard={checked:acceptKnownSource404,field:'missingResources',covered:[],missing:[],error:null};
if(acceptKnownSource404){
  try{
    const runtimeSource=await fs.readFile(path.join(root,'site/offline-runtime.js'),'utf8');
    const runtimeAst=parse(runtimeSource,{ecmaVersion:'latest',sourceType:'script'});
    let dataLiteral;
    function findData(node){
      if(!node?.type)return;
      if(node.type==='VariableDeclarator'&&node.id.type==='Identifier'&&node.id.name==='DATA')dataLiteral=node.init;
      for(const value of Object.values(node))if(Array.isArray(value)){for(const child of value)if(child?.type)findData(child);}else if(value?.type)findData(value);
    }
    findData(runtimeAst);
    assert.ok(dataLiteral,'Deployment runtime DATA literal not found');
    const data=JSON.parse(runtimeSource.slice(dataLiteral.start,dataLiteral.end));
    assert.ok(data.missingResources&&typeof data.missingResources==='object'&&!Array.isArray(data.missingResources),'Deployment runtime missingResources table is missing');
    const declared=new Set();
    for(const url of knownUnavailableManuals){
      const relative=new URL(url).pathname.replace(/^\//,'');
      const entry=data.missingResources[relative];
      if(entry?.sourceUrl===url&&/\bHTTP 404\b/.test(entry.error||''))declared.add(url);
    }
    runtimeGuard.covered=[...knownUnavailableManuals].filter(url=>declared.has(url));
    runtimeGuard.missing=[...knownUnavailableManuals].filter(url=>!declared.has(url));
  }catch(error){runtimeGuard.error=String(error);runtimeGuard.missing=[...knownUnavailableManuals];}
}
const acceptedMissing=acceptKnownSource404?missing.filter(isKnownSource404):[];
const unacceptedMissing=missing.filter(reference=>!acceptedMissing.includes(reference));
const runtimeGuardPassed=!acceptKnownSource404||(!runtimeGuard.error&&runtimeGuard.missing.length===0);
const passed=unacceptedMissing.length===0&&runtimeGuardPassed;
const uniqueRequired=new Set(results.flatMap(item=>[...item.mainImage,...item.colorImages,...item.manuals].map(ref=>ref.url)));
const report={formatVersion:1,checkedAt:new Date().toISOString(),source:original,method:'Acorn AST: literal catalog, static URL helpers, model-condition color/PDF selectors; no application execution, network or HID',summary:{passed,acceptKnownSource404,models:models.length,uniqueRequiredResources:uniqueRequired.size,missingRequiredResources:missing.length,upstreamUnavailableManuals:missing.filter(x=>x.category==='manual'&&x.status==='upstream-unavailable').length,acceptedKnownSource404Count:acceptedMissing.length,unacceptedMissingResources:unacceptedMissing.length,runtimeUnavailableListVerified:acceptKnownSource404&&runtimeGuardPassed,manualModelCount:results.filter(x=>x.manuals.length).length,manualPdfCount:new Set(results.flatMap(x=>x.manuals.map(y=>y.url))).size,negativeControlPassed:true},runtimeGuard,entrypointResources,models:results,warnings,missing};
await fs.mkdir(path.join(root,'reports'),{recursive:true});
await fs.writeFile(path.join(root,'reports/model-assets.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.summary));
if(missing.length)console.error(JSON.stringify(missing,null,2));
if(!runtimeGuardPassed)console.error(JSON.stringify({runtimeGuard},null,2));
if(!passed)process.exitCode=1;
