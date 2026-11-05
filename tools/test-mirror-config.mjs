import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/acorn.mjs';
import { localStaticPath } from './mirror-resource-policy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceOnly = process.argv.includes('--source-only');
function functions(text) {
  const result = new Map();
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'FunctionDeclaration' && node.id) result.set(node.id.name, text.slice(node.start, node.end));
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true }));
  return result;
}
const originalManifest = JSON.parse(await fs.readFile(path.join(root, 'snapshots/source-manifest.json'), 'utf8'));
const mirrorManifest = JSON.parse(await fs.readFile(path.join(root, 'snapshots/mirror-source-manifest.json'), 'utf8'));
const records = new Map(originalManifest.files.filter(file => file.status === 'ok').map(file => [file.url, file]));
for (const file of mirrorManifest.files) if (file.status === 'ok') records.set(file.url, file);
const map = Object.fromEntries([...records.values()].map(file => [file.url, file.sitePath]));
const globalConfig = JSON.parse(await fs.readFile(path.join(root, 'snapshots/config/global.json'), 'utf8'));
const data = { map, hosts: ['cdn.mchose.com.cn', 'www.mchose.com.cn', 'www.maicong.cn'], driverUiVersion: String(globalConfig.version?.__duVersion || '') };
const runtimeText = await fs.readFile(path.join(root, sourceOnly ? 'tools/mirror-runtime.template.js' : 'site/mirror-runtime.js'), 'utf8');
const runtimeFunctions = functions(runtimeText);
const builderText = await fs.readFile(path.join(root, 'tools/build-mirror.mjs'), 'utf8');
const builderFunctions = functions(builderText);
const report = { behaviorPatches: [], configurationRewrites: [], resourceRewrites: [] };
const builderContext = vm.createContext({ parse, report, map, knownHosts: data.hosts, primaryOrigin: 'https://www.mchose.com.cn', path, localStaticPath });
vm.runInContext(['walk', 'editsApplied', 'parseJs', 'patchCompatibility', 'patchConfigLoaderResults', 'rewriteJs', 'localReference', 'rewriteHtml'].map(name => builderFunctions.get(name)).join('\n')
  + '\nglobalThis.builder = {patchCompatibility,patchConfigLoaderResults,rewriteHtml};', builderContext);
const sample = Object.entries(map).find(([url]) => /^https:\/\/cdn\.mchose\.com\.cn\/configCenter\/static\/.*\.png$/i.test(url));
assert.ok(sample, 'A copied static image is needed for the config regression.');
const [imageSource, imagePath] = sample;
const unknown = 'https://cdn.mchose.com.cn/not-in-this-snapshot.png';
const payload = {
  nested: [{ image: imageSource, css: `background-image:url("${imageSource}")` }],
  relative: new URL(imageSource).pathname.slice(1),
  protocolRelative: imageSource.replace('https:', ''),
  supportedWebOrigins: ['https://www.mchose.com.cn', 'https://www.mchose.com.cn/'],
  api: 'https://www.maicong.cn/mchose/official?name=A7', unknown, version: 'unchanged-factory-version',
};
const originalMain = await fs.readFile(path.join(root, 'upstream/www.mchose.com.cn/assets/main-DnvOpr5S.js'), 'utf8');
const originalFunctions = functions(originalMain);
const sourceFixture = 'async function initializeApp(){};window.readMouseAllInfo=()=>{};\n'
  + originalFunctions.get('smartDecompressJSON') + '\n' + originalFunctions.get('loadConfigFromUrl');
const compatibilityFixture = builderContext.builder.patchCompatibility(sourceFixture, 'assets/main-fixture.js');
const patchedFunctions = functions(compatibilityFixture);
assert.equal(patchedFunctions.get('smartDecompressJSON'), originalFunctions.get('smartDecompressJSON'), 'The shared cloud/user decoder must remain unchanged.');
assert.equal(report.configurationRewrites.find(item => item.name === 'loadConfigFromUrl').returns, 3);
const nestedFixture = 'async function initializeApp(){};window.readMouseAllInfo=()=>{};async function loadConfigFromUrl(){function nested(){return "factory-nested-return"}return (0,{value:"ok"});}';
assert.ok(builderContext.builder.patchCompatibility(nestedFixture, 'assets/nested-fixture.js').includes('function nested(){return "factory-nested-return"}'), 'Nested functions must not receive config-return wrappers.');

for (const base of ['http://127.0.0.1:8765/', 'https://root50643.github.io/mchose-offline/']) {
  const context = vm.createContext({ DATA: data, base, URL, localStaticPath });
  vm.runInContext(['canonical', 'assetUrl', 'rewriteText', 'mapResourceData'].map(name => runtimeFunctions.get(name)).join('\n')
    + '\nglobalThis.api={assetUrl,rewriteText,mapResourceData};', context);
  const api = context.api;
  const expected = new URL(imagePath, base).href;
  const mapped = api.mapResourceData(payload);
  assert.equal(mapped.nested[0].image, expected);
  assert.equal(mapped.nested[0].css, `background-image:url("${expected}")`);
  assert.equal(mapped.relative, expected); assert.equal(mapped.protocolRelative, expected);
  assert.equal(mapped.api, payload.api); assert.equal(mapped.unknown, new URL('vendor/cdn.mchose.com.cn/not-in-this-snapshot.png', base).href); assert.equal(mapped.version, payload.version);
  assert.equal(mapped.supportedWebOrigins, payload.supportedWebOrigins, 'Bare origins must remain origins, including a trailing slash.');
  assert.equal(payload.nested[0].image, imageSource, 'Resource mapping must not mutate the original config payload.');
  const unchanged = { code: 200, user: { token: 'factory-session', supportedWebOrigins: payload.supportedWebOrigins }, api: payload.api };
  assert.equal(api.mapResourceData(unchanged), unchanged, 'Unchanged data must preserve object identity.');
  assert.equal(api.mapResourceData(mapped), mapped, 'Already-localized config values must preserve identity.');
  const cycle = {}; cycle.self = cycle; assert.equal(api.mapResourceData(cycle), cycle);
  const date = new Date(0); assert.equal(api.mapResourceData(date), date);

  for (const mode of ['loader-plain', 'loader-compressed', 'fetch-plain', 'fetch-compressed', 'zip']) {
    const compressed = { __compressBase64__: 'factory-zip-token' };
    const configContext = vm.createContext({
      window: { __mchoseMirror: api }, console, Response,
      resolveEnvFromBaseUrl: () => 'prod', extractFileBaseName: () => 'global',
      getCdnConfigLoader: () => mode.startsWith('loader') ? {} : undefined,
      fetchConfig: async () => mode === 'loader-compressed' ? { ...compressed } : structuredClone(payload),
      buildCdnConfigUrl: () => 'https://cdn.mchose.com.cn/configCenter/config/global.json',
      setUrlHashQuery: url => url, wrapCdnConfigUrl: async url => url,
      fetch: async () => new Response(mode === 'zip' ? 'zip fixture bytes' : JSON.stringify(mode === 'fetch-compressed' ? compressed : payload), { headers: { 'Content-Type': mode === 'zip' ? 'application/zip' : 'application/json' } }),
      arrayBufferToBase64: () => 'factory-zip-token', smartDecompressJSON: async () => structuredClone(payload),
    });
    vm.runInContext(patchedFunctions.get('loadConfigFromUrl'), configContext);
    const value = await configContext.loadConfigFromUrl(mode === 'zip' ? 'custom/fixture.zip' : 'custom/fixture.json', mode.startsWith('fetch') ? { hash: 'factory-hash' } : '');
    assert.equal(value.nested[0].image, expected, 'Decoded config path failed: ' + mode);
    assert.equal(value.api, payload.api); assert.equal(value.unknown, new URL('vendor/cdn.mchose.com.cn/not-in-this-snapshot.png', base).href);
    assert.equal(value.supportedWebOrigins[0], 'https://www.mchose.com.cn');
  }
  const nestedContext = vm.createContext({ window: { __mchoseMirror: api } });
  vm.runInContext(functions(builderContext.builder.patchCompatibility(nestedFixture, 'assets/nested-fixture.js')).get('loadConfigFromUrl'), nestedContext);
  assert.equal((await nestedContext.loadConfigFromUrl()).value, 'ok', 'Sequence-expression returns must retain their final value.');

  const loaderFile = 'vendor/cdn.mchose.com.cn/configCenter/config/globalLoader.js';
  const originalLoader = await fs.readFile(path.join(root, 'upstream/cdn.mchose.com.cn/configCenter/config/globalLoader.js'), 'utf8');
  const loaderText = sourceOnly ? builderContext.builder.patchConfigLoaderResults(originalLoader, loaderFile) : await fs.readFile(path.join(root, 'site', loaderFile), 'utf8');
  let fetches = 0;
  const loaderWindow = { __mchoseMirror: api };
  vm.runInNewContext(loaderText, { window: loaderWindow, fetch: async () => { fetches++; return new Response(JSON.stringify(payload)); } }, { timeout: 5000 });
  const loader = loaderWindow.MC_CONFIG_GLOBAL_PROD_LOADER;
  assert.equal(typeof loader.markDirty, 'function'); assert.equal(typeof loader.getValue, 'function');
  const first = loader.reload(), concurrent = loader.reload();
  assert.equal(first, concurrent, 'Factory concurrent reload calls must share the same promise.');
  const value = await first;
  assert.equal(value.nested[0].image, expected); assert.equal(await loader.getValue(), value, 'Loader activeValue identity must remain stable.');
  assert.equal(fetches, 1); loader.markDirty(); assert.equal((await loader.getValue()).nested[0].image, expected); assert.equal(fetches, 2);

  const htmlRecord = records.get('https://www.mchose.com.cn/gmouse/');
  assert.ok(htmlRecord);
  const originalHtml = await fs.readFile(path.join(root, htmlRecord.upstreamPath), 'utf8');
  const html = sourceOnly ? builderContext.builder.rewriteHtml(originalHtml, { ...htmlRecord, sitePath: 'gmouse/index.html' }) : await fs.readFile(path.join(root, 'site/gmouse/index.html'), 'utf8');
  const boot = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].find(match => match[1].includes('driver-ui-boot'))?.[1];
  assert.ok(boot, 'The factory Next script boot queue must be retained.');
  const self = { __next_s: [] };
  vm.runInNewContext(boot, { self, window: { __mchoseMirror: api } }, { timeout: 5000 });
  const children = self.__next_s.find(item => item[1]?.id === 'driver-ui-boot')?.[1]?.children;
  assert.equal(typeof children, 'string');
  for (const resource of ['driver-ui.css', 'driver-ui.global.js', 'react/driver-ui.react.js']) {
    const source = 'https://cdn.mchose.com.cn/customPage/driver-ui/' + resource;
    assert.ok(children.includes(api.assetUrl(source)), 'Inline factory boot resource must use exact mirror/factory fallback: ' + resource);
  }
  assert.ok(html.includes('mirror-runtime.js'));
  const flight = value => [...value.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)].map(match => match[0]).filter(script => /self\.__next_f(?:\s*=|\.push\()/.test(script));
  assert.deepEqual(flight(html), flight(originalHtml), 'Length-framed React Flight records must remain byte-identical during URL rewriting.');
  console.log(`PASS config/inline resources ${base}: decoded returns, nested DOM data, origins/unknowns preserved, loader reload identity, original Next driver boot`);
}

if (!sourceOnly) {
  const main = await fs.readFile(path.join(root, 'site/assets/main-DnvOpr5S.js'), 'utf8');
  const currentFunctions = functions(main);
  assert.equal(currentFunctions.get('smartDecompressJSON'), originalFunctions.get('smartDecompressJSON'));
  assert.equal((currentFunctions.get('loadConfigFromUrl').match(/mapResourceData/g) || []).length, 3);
  let rawConfigs = 0;
  for (const record of records.values()) {
    if (!/\/configCenter(?:-test)?\/(?:config|custom)\/[^/]+\.json$/.test(new URL(record.url).pathname)) continue;
    assert.ok((await fs.readFile(path.join(root, record.upstreamPath))).equals(await fs.readFile(path.join(root, 'site', record.sitePath))), 'Factory compressed config bytes changed: ' + record.url);
    rawConfigs++;
  }
  assert.ok(rawConfigs >= 4);
  console.log(`PASS deployed config boundaries and ${rawConfigs} byte-identical factory configuration files`);
}
