import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';
import { parse } from './vendor/acorn.mjs';

// Independent source audit: no downloads, app execution, account access, or HID.
// Resolve static expressions and inspect embedded data instead of trusting the
// snapshot scanner's queue or the generated site's resource map.
const root = path.resolve(import.meta.dirname, '..');
const staticHosts = new Set(['www.mchose.com.cn', 'cdn.mchose.com.cn', 'www.maicong.cn', 'ioss.maicong.cn', 'mchose-bbs.oss-cn-shenzhen.aliyuncs.com', 'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com']);
const asset = /\.(?:html|js|mjs|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i;
const installer = /\.(?:exe|msi|dmg|pkg|rar|7z|psd|apk)$/i;
const helpers = new Map([['getStaticUrl', 'https://cdn.mchose.com.cn/configCenter/public'], ['getAssetsCdnUrl', 'https://cdn.mchose.com.cn/configCenter/assets'], ['getRealImageUrl', 'https://cdn.mchose.com.cn/'], ['assets', 'https://cdn.mchose.com.cn/configCenter/assets']]);
const dependencies = new Map(), unresolved = new Map(), excluded = new Map(), inputFiles = [], scanErrors = [];
const excludedSources = [];
const counters = { javascript: 0, css: 0, html: 0, json: 0, embeddedJson: 0, compressedJson: 0, gltf: 0, resolvedExpressions: 0, webpackChunks: 0 };
const exportedHelpers = new Map();
const sourceFacts = new Map();
const semanticResolutions = [];
const dataPathCandidates = new Map();
const factoryLocales = new Set(['zh_CN', 'en_US', 'ru_RU', 'de_DE', 'fr_FR', 'ja_JP', 'ko_KR', 'es_ES', 'pl_PL']);
const desktopDistribution = url => /\/customPage\/(?:pre|prod)(?:\/|$)|\/systemRepair\/|\/configCenter\/custom\/(?:pre-newMouseConfig|cardList-pre)\.json$/.test(new URL(url).pathname);
const digest = value => crypto.createHash('sha256').update(value).digest('hex');

function canonical(value, base) {
  try {
    const url = new URL(value.replace(/&amp;/g, '&'), base);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (staticHosts.has(url.hostname)) url.protocol = 'https:';
    url.hash = ''; url.search = '';
    if (url.hostname === 'www.mchose.com.cn' && /\/(?:index\.html)$/.test(url.pathname)) url.pathname = url.pathname.slice(0, -10);
    return url.href;
  } catch { return null; }
}
function documentBase(url) {
  const parsed = new URL(url);
  const subapp = parsed.pathname.match(/^\/(gmouse|g7max)\//)?.[1];
  return subapp ? `${parsed.origin}/${subapp}/` : url;
}
function add(value, source, offset, kind, base = source) {
  if (typeof value !== 'string' || !value || /^(?:data:|blob:|#)/i.test(value) || /[{}\r\n]/.test(value) || (!/^(?:https?:)?\/\//.test(value) && /\s/.test(value))) return;
  const url = canonical(value, base);
  if (!url) return;
  const parsed = new URL(url);
  if (/[:*]/.test(decodeURIComponent(parsed.pathname))) return;
  if (!asset.test(decodeURIComponent(parsed.pathname))) return;
  if (desktopDistribution(url)) { excluded.set(url, 'Desktop renderer distribution or explicitly opened native-system repair tool'); return; }
  if (!staticHosts.has(parsed.hostname) || installer.test(parsed.pathname) || /MCHOSE_HUB_installer|VC_redist|Firmwaretool[^/]*\.zip$|\/exe\/|\/static\/archives\//i.test(parsed.pathname)) {
    excluded.set(url, 'Original service, user content, or explicit installer/archive download'); return;
  }
  // These are factory REST endpoints, not static distribution paths.
  if (/\/(?:mchose|api|oauth|auth|official|uploads?)\//i.test(parsed.pathname) && !/\/(?:configCenter|customPage|assets|_next)\//.test(parsed.pathname)) {
    excluded.set(url, 'Factory backend or user content'); return;
  }
  const item = dependencies.get(url) ?? { url, kinds: new Set(), evidence: [] };
  item.kinds.add(kind);
  if (item.evidence.length < 8 && !item.evidence.some(entry => entry.source === source && entry.offset === offset)) item.evidence.push({ source, offset, pattern: kind });
  dependencies.set(url, item);
}
function inspectString(value, source, offset, kind = 'literal', base = source) {
  if (typeof value !== 'string') return;
  const text = value.trim();
  if (/^(?:https?:)?\/\//.test(text)) add(text, source, offset, kind, base);
  else if (/^(?:\/?configCenter(?:-test)?|\/?OTA)\//.test(text)) add('/' + text.replace(/^\/+/, ''), source, offset, kind, 'https://cdn.mchose.com.cn/');
  else if (/^\/?custom\/[\w.-]+\.json$/i.test(text)) add(text.replace(/^\/+/, ''), source, offset, kind, 'https://cdn.mchose.com.cn/configCenter/');
  else if (/^(?:pcAssets|public)\//.test(text)) add(text, source, offset, kind, 'https://cdn.mchose.com.cn/configCenter/');
  else if (/^(?:\.\.?\/|\/)/.test(text)) add(text, source, offset, kind, /\.(?:m?js|css)(?:[?#]|$)/i.test(text) ? source : documentBase(base));
  else if (/^static\/(?:chunks|css)\//.test(text) && /\/gmouse\/_next\//.test(source)) add(text, source, offset, kind, 'https://www.mchose.com.cn/gmouse/_next/');
  else if (/^assets\//.test(text) && /\/(?:gmouse|g7max)\//.test(source)) add(text, source, offset, kind, documentBase(source));
  else if (source.endsWith('/asset-manifest.json') && asset.test(text)) add(text, source, offset, 'sdk-manifest');
  if (text.length > 1 && text.length < 10_000_000 && /^[{[]/.test(text)) {
    try { const value = JSON.parse(text); counters.embeddedJson++; inspectData(value, source, offset, 'embedded-json'); } catch {}
  }
}
function unzipJSON(base64) {
  const zip = Buffer.from(base64, 'base64');
  // Read central entries; this also supports ZIP data descriptors and metadata.
  for (let at = 0; at + 46 <= zip.length; at++) {
    if (zip.readUInt32LE(at) !== 0x02014b50) continue;
    const length = zip.readUInt16LE(at + 28), name = zip.subarray(at + 46, at + 46 + length).toString();
    if (name !== 'data.json') continue;
    const size = zip.readUInt32LE(at + 20), local = zip.readUInt32LE(at + 42);
    const dataAt = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
    const bytes = zip.subarray(dataAt, dataAt + size), method = zip.readUInt16LE(at + 10);
    return JSON.parse((method === 8 ? zlib.inflateRawSync(bytes) : bytes).toString('utf8'));
  }
  throw new Error('Embedded ZIP has no data.json entry');
}
function inspectData(value, source, offset = 0, kind = 'json', seen = new Set()) {
  if (typeof value === 'string') {
    if (value.includes('/') && asset.test(value) && !/^(?:[a-z][\w+.-]*:|\/|\.\.?\/|configCenter|pcAssets|public|OTA)/i.test(value) && !/\s/.test(value)) dataPathCandidates.set(source + ':' + value, { source, offset, value });
    inspectString(value, source, offset, kind); return;
  }
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (typeof value.__compressBase64__ === 'string') {
    try { counters.compressedJson++; inspectData(unzipJSON(value.__compressBase64__), source, offset, 'compressed-json', seen); }
    catch (error) { scanErrors.push({ source, offset, error: String(error) }); }
  }
  // Lottie image assets split a relative directory (u) and filename (p).
  if (typeof value.u === 'string' && typeof value.p === 'string' && value.p && !value.e) add(value.u + value.p, source, offset, 'lottie-image', source);
  for (const [key, child] of Object.entries(value)) if (key !== '__compressBase64__') {
    if (key === 'uri' && typeof child === 'string' && /\.gltf?$|\.glb$/i.test(source)) add(child, source, offset, 'gltf-resource');
    inspectData(child, source, offset, kind, seen);
  }
}
function walk(node, visitor, parent = null) {
  if (!node?.type) return;
  if (visitor(node, parent) === false) return;
  for (const value of Object.values(node)) if (Array.isArray(value)) { for (const child of value) walk(child, visitor, node); }
  else if (value?.type) walk(value, visitor, node);
}
function expressionResolver(tree) {
  const scopes = new WeakMap(), cache = new WeakMap();
  const top = { parent: null, function: true, bindings: new Map() };
  const declare = (scope, name, init, declarationScope = scope) => {
    const entries = scope.bindings.get(name) ?? [];
    entries.push({ init, scope: declarationScope, writes: 0 }); scope.bindings.set(name, entries);
  };
  const boundNames = pattern => {
    if (!pattern) return [];
    if (pattern.type === 'Identifier') return [pattern.name];
    if (pattern.type === 'RestElement') return boundNames(pattern.argument);
    if (pattern.type === 'AssignmentPattern') return boundNames(pattern.left);
    if (pattern.type === 'ArrayPattern') return pattern.elements.flatMap(boundNames);
    if (pattern.type === 'ObjectPattern') return pattern.properties.flatMap(property => boundNames(property.type === 'RestElement' ? property.argument : property.value));
    return [];
  };
  function visit(node, scope, parent) {
    if (!node?.type) return;
    if (node.type === 'FunctionDeclaration' && node.id) declare(scope, node.id.name, node);
    if (['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(node.type)) {
      scope = { parent: scope, function: true, bindings: new Map() };
      if (node.type === 'FunctionExpression' && node.id) declare(scope, node.id.name, null);
      for (const param of node.params) for (const name of boundNames(param)) declare(scope, name, null);
    } else if (node.type === 'BlockStatement' || node.type === 'CatchClause') scope = { parent: scope, function: false, bindings: new Map() };
    scopes.set(node, scope);
    if (node.type === 'VariableDeclarator') {
      let destination = scope;
      if (parent.kind === 'var') while (!destination.function) destination = destination.parent;
      for (const name of boundNames(node.id)) declare(destination, name, node.id.type === 'Identifier' ? node.init : null, scope);
    }
    if (node.type === 'CatchClause' && node.param?.type === 'Identifier') declare(scope, node.param.name, null);
    for (const value of Object.values(node)) if (Array.isArray(value)) { for (const child of value) visit(child, scope, node); }
    else if (value?.type) visit(value, scope, node);
  }
  visit(tree, top);
  function binding(name, scope) { for (; scope; scope = scope.parent) if (scope.bindings.has(name)) { const entries = scope.bindings.get(name); return entries.length === 1 ? entries[0] : null; } return null; }
  walk(tree, node => {
    const identifier = node.type === 'AssignmentExpression' ? node.left : node.type === 'UpdateExpression' ? node.argument : null;
    if (identifier?.type === 'Identifier') { const item = binding(identifier.name, scopes.get(node)); if (item) item.writes++; }
  });
  const product = (left, right, fn) => { const values = []; for (const a of left) for (const b of right) { if (values.length > 64) return []; try { values.push(fn(a, b)); } catch {} } return values; };
  const unique = values => [...new Set(values)].slice(0, 64);
  function evaluate(node, scope = scopes.get(node), env = null, depth = 0) {
    if (!node || depth > 18) return [];
    if (!env && cache.has(node)) return cache.get(node);
    const ev = child => evaluate(child, scopes.get(child) ?? scope, env, depth + 1);
    let values = [];
    switch (node.type) {
      case 'Literal': values = [node.value]; break;
      case 'Identifier': {
        if (env && Object.hasOwn(env, node.name)) values = [env[node.name]];
        else { const item = binding(node.name, scope); if (item?.init && !item.writes) values = evaluate(item.init, item.scope, env, depth + 1); }
        break;
      }
      case 'TemplateLiteral': {
        values = [node.quasis[0].value.cooked];
        for (let index = 0; index < node.expressions.length; index++) values = product(values, ev(node.expressions[index]), (a, b) => a + String(b) + node.quasis[index + 1].value.cooked);
        break;
      }
      case 'BinaryExpression': {
        const operators = { '+': (a, b) => a + b, '===': (a, b) => a === b, '!==': (a, b) => a !== b, '==': (a, b) => a == b, '!=': (a, b) => a != b, '<': (a, b) => a < b, '>': (a, b) => a > b };
        if (operators[node.operator]) values = product(ev(node.left), ev(node.right), operators[node.operator]);
        break;
      }
      case 'LogicalExpression': {
        const left = ev(node.left), right = ev(node.right);
        values = left.length ? left.flatMap(a => node.operator === '||' ? a ? [a] : right : node.operator === '&&' ? a ? right : [a] : a == null ? right : [a]) : right;
        break;
      }
      case 'ConditionalExpression': { const test = ev(node.test); values = test.length ? test.flatMap(value => ev(value ? node.consequent : node.alternate)) : [...ev(node.consequent), ...ev(node.alternate)]; break; }
      case 'ObjectExpression': {
        const object = Object.create(null);
        for (const property of node.properties) if (property.type === 'Property' && !property.computed) { const value = ev(property.value); if (value.length === 1) object[property.key.name ?? property.key.value] = value[0]; }
        values = [object]; break;
      }
      case 'MemberExpression': { const properties = node.computed ? ev(node.property) : [node.property.name]; values = product(ev(node.object), properties, (object, key) => object == null ? undefined : object[key]); break; }
      case 'CallExpression': {
        if (node.callee.type === 'Identifier' && ['encodeURIComponent', 'String'].includes(node.callee.name)) values = ev(node.arguments[0]).flatMap(value => { try { return [node.callee.name === 'String' ? String(value) : encodeURIComponent(value)]; } catch { return []; } });
        else if (node.callee.type === 'Identifier') {
          const item = binding(node.callee.name, scope), fn = item?.init;
          if (!item?.writes && fn?.type === 'FunctionDeclaration' && fn.params.every(param => param.type === 'Identifier') && fn.body.body.length === 1 && fn.body.body[0].type === 'ReturnStatement') {
            const argumentsValues = node.arguments.map(ev);
            if (argumentsValues.every(options => options.length === 1)) {
              const functionEnv = { ...env, ...Object.fromEntries(fn.params.map((param, index) => [param.name, argumentsValues[index]?.[0]])) };
              values = evaluate(fn.body.body[0].argument, scopes.get(fn.body), functionEnv, depth + 1);
            }
          }
        }
        else if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'concat') {
          values = ev(node.callee.object);
          for (const argument of node.arguments) values = product(values, ev(argument), (a, b) => typeof a === 'string' ? a + String(b) : undefined);
        }
        break;
      }
      case 'SequenceExpression': values = ev(node.expressions.at(-1)); break;
    }
    values = unique(values);
    if (!env) cache.set(node, values);
    return values;
  }
  evaluate.declarationForIdentifier = node => node?.type === 'Identifier' ? binding(node.name, scopes.get(node))?.init : null;
  return evaluate;
}

function scanJavaScript(text, source) {
  const tree = parse(text, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true });
  const evaluate = expressionResolver(tree), localHelpers = new Map(helpers), exports = new Map();
  const facts = sourceFacts.get(source) ?? { driverClasses: new Set(), wrapperClasses: new Set(), wrapperApis: new Set(), childReactApis: new Set(), libraryPathMentions: 0 };
  facts.libraryPathMentions += [...text.matchAll(/\bgetDriverUILibraryPath\b/g)].length;
  sourceFacts.set(source, facts);
  if (text.includes('async function initializeApp()') && text.includes('window.readMouseAllInfo=')) facts.backgroundConsumerUsesOnlyV2 = /\.bgConfigV2\b/.test(text) && !/\.bgConfig\b|["']bgConfig["']/.test(text);
  if (/\/gmouse\/_next\//.test(source) && text.includes('"G3 V2 Pro"===i?"G3 V2":i') && text.includes('_User_Guide_en.pdf')) {
    const models = ['G3_A', 'G3_V2', 'G7', 'G7_Pro', 'A7e', 'A7e_Pro'];
    for (const model of models) for (const suffix of ['', '_en']) add(`./pdf/${model}_User_Guide${suffix}.pdf`, source, text.indexOf('_User_Guide.pdf'), 'gmouse-manual', documentBase(source));
    semanticResolutions.push({ source, pattern: 'gmouse e3 model selector → manual filename', values: models, proof: 'G3 V2 Pro reuses G3 V2 manual; other e1 labels and fallback G3 A replace spaces with underscores; zh_CN selects Chinese, other languages English.' });
  }
  for (const node of tree.body ?? []) if (node.type === 'ImportDeclaration') {
    const imported = exportedHelpers.get(canonical(node.source.value, source));
    for (const specifier of node.specifiers) { const prefix = imported?.get(specifier.imported?.name); if (prefix) localHelpers.set(specifier.local.name, prefix); }
  }
  walk(tree, (node, parent) => {
    if (/\/driver-ui(?:_test)?\/driver-ui\.global\.js$/.test(source) && node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && /^Du[A-Z]/.test(node.left.property.name ?? '')) facts.driverClasses.add(node.left.property.name);
    if (/\/driver-ui(?:_test)?\/(?:react|vue)\/driver-ui\.(?:react|vue)\.js$/.test(source)) {
      if (node.type === 'CallExpression' && typeof node.arguments[0]?.value === 'string' && /^du-/.test(node.arguments[0].value) && /^Du[A-Z]/.test(node.arguments[1]?.value ?? '')) facts.wrapperClasses.add(node.arguments[1].value);
      if (node.type === 'ReturnStatement' && node.argument?.type === 'ObjectExpression' && node.argument.properties.length > 20) for (const property of node.argument.properties) if (property.type === 'Property' && property.key.type === 'Identifier') facts.wrapperApis.add(property.key.name);
    }
    if (/\/gmouse\/_next\//.test(source) && node.type === 'CallExpression' && node.callee.type === 'Identifier' && typeof node.arguments[0]?.value === 'string') {
      const declaration = evaluate.declarationForIdentifier(node.callee);
      if (declaration?.type === 'FunctionDeclaration' && text.slice(declaration.start, declaration.end).includes('DriverUI.React.')) facts.childReactApis.add(node.arguments[0].value);
    }
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration') { if (typeof node.source?.value === 'string') add(node.source.value, source, node.start, 'esm-import'); }
    if (node.type === 'ImportExpression' && typeof node.source.value === 'string') add(node.source.value, source, node.start, 'dynamic-import');
    if (node.type === 'ExportNamedDeclaration') for (const specifier of node.specifiers ?? []) { const prefix = localHelpers.get(specifier.local.name); if (prefix) exports.set(specifier.exported.name, prefix); }
    if (node.type === 'Property' && !node.computed && (node.key.name ?? node.key.value) === '__compressBase64__') {
      const values = evaluate(node.value);
      for (const value of values) if (typeof value === 'string') inspectData({ __compressBase64__: value }, source, node.start);
    }
    const isConfigHelper = name => ['loadConfigFromUrl', 'wrapCdnConfigUrl', 'buildCdnConfigUrl'].includes(name);
    const isHelperArg = parent?.type === 'CallExpression' && parent.arguments[0] === node && (localHelpers.has(parent.callee.name) || isConfigHelper(parent.callee.name));
    const fragment = parent?.type === 'BinaryExpression' || (parent?.type === 'CallExpression' && parent.callee.type === 'MemberExpression' && parent.callee.property.name === 'concat');
    if (node.type === 'Literal' && typeof node.value === 'string' && !(parent?.type === 'Property' && parent.key === node && !parent.computed) && !isHelperArg && !fragment) inspectString(node.value, source, node.start);
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
      const prefix = localHelpers.get(node.callee.name);
      if (prefix || isConfigHelper(node.callee.name)) {
        for (const value of evaluate(node.arguments[0])) if (typeof value === 'string') {
          const url = prefix ? /^(?:https?:)?\/\//.test(value) ? value : prefix.replace(/\/$/, '') + '/' + value.replace(/^\//, '') : value;
          if (prefix) add(url, source, node.start, 'url-helper');
          else add(value, source, node.start, 'config-loader', 'https://cdn.mchose.com.cn/configCenter/');
        }
      }
    }
    if (['TemplateLiteral', 'BinaryExpression', 'CallExpression'].includes(node.type)) {
      const values = evaluate(node).filter(value => typeof value === 'string' && value.length < 20000);
      if (values.some(value => /(?:mchose|maicong|driver-ui|configCenter|_next)/.test(value))) {
        counters.resolvedExpressions++;
        for (const value of values) inspectString(value, source, node.start, 'resolved-expression');
      }
      const dynamicExpression = node.type === 'TemplateLiteral' || node.type === 'BinaryExpression' || (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.property.name === 'concat');
      if (!values.length && dynamicExpression) {
        const expression = text.slice(node.start, node.end);
        const localizedGuide = expression.match(/^`(https:\/\/cdn\.mchose\.com\.cn\/configCenter\/pcPublic\/publicResources\/lang_img\/)\$\{[^}]+\}\/(open_(?:mic|speaker)_guide\.svg)`$/);
        if (localizedGuide) {
          for (const locale of factoryLocales) add(localizedGuide[1] + locale + '/' + localizedGuide[2], source, node.start, 'localized-guide');
          semanticResolutions.push({ source, offset: node.start, pattern: 'Vue locale image template', values: [...factoryLocales], proof: 'Factory messagesByLocale declares these nine locale codes; the image template uses the current locale without a fallback.' });
        }
        if (expression === '"".concat(E,"/custom/keyboardConfig.json")' && /\/cizhou\/CZ_SHARED_DATA\//.test(source)) add('https://cdn.mchose.com.cn/configCenter/custom/keyboardConfig.json', source, node.start, 'sdk-production-config');
        if (expression.length < 500 && /(?:https?:|configCenter|driver-ui|custom\/|newBin\/|\/pdf\/|_next\/)/.test(expression) && /\.(?:json|js|css|bin|pdf|png|svg|webm|mp4)["'`)]?/.test(expression)) unresolved.set(`${source}:${node.start}`, { source, offset: node.start, expression });
      }
    }
    // The concrete chunk tables include lazily loaded locales, React pages, and
    // CSS. Resolve every declared numeric table key, not only startup imports.
    if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && ['u', 'miniCssF'].includes(node.left.property.name) && ['FunctionExpression', 'ArrowFunctionExpression'].includes(node.right.type)) {
      const parameter = node.right.params[0]?.name;
      const statement = node.right.body.body?.find(child => child.type === 'ReturnStatement');
      if (!parameter || !statement || !/\/gmouse\/_next\//.test(source)) return;
      const ids = new Set();
      walk(statement, child => { if (child.type === 'Property' && /^\d+$/.test(String(child.key.value ?? child.key.name))) ids.add(Number(child.key.value ?? child.key.name)); });
      walk(statement, child => { if (child.type === 'BinaryExpression') { const literal = child.left.type === 'Literal' ? child.left : child.right.type === 'Literal' ? child.right : null; if (typeof literal?.value === 'number') ids.add(literal.value); } });
      for (const id of ids) for (const value of evaluate(statement.argument, undefined, { [parameter]: id })) if (typeof value === 'string' && !value.includes('undefined')) { add(value, source, node.start, 'webpack-chunk-table', 'https://www.mchose.com.cn/gmouse/_next/'); counters.webpackChunks++; }
    }
  });
  if (exports.size) exportedHelpers.set(source, exports);
}
function scanText(text, source, type) {
  if (type === 'js') { counters.javascript++; scanJavaScript(text, source); return; }
  if (type === 'json') {
    counters.json++;
    const value = JSON.parse(text); inspectData(value, source);
    if (source.endsWith('/mouseConfig.json')) {
      const decoded = typeof value.__compressBase64__ === 'string' ? unzipJSON(value.__compressBase64__) : value;
      for (const version of Object.values(decoded)) if (typeof version === 'string' && version && !version.includes('://')) for (const part of ['offer', 'payload']) add(`https://cdn.mchose.com.cn/configCenter/public/newBin/${encodeURIComponent(version)}.${part}.bin`, source, 0, 'legacy-mouse-firmware');
    }
    return;
  }
  if (type === 'css') {
    counters.css++;
    for (const match of text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)|@import\s*["']([^"']+)["']/g)) add(match[1] ?? match[2] ?? match[3] ?? match[4], source, match.index, 'css-resource');
    return;
  }
  if (type === 'html' || type === 'svg') {
    counters.html++;
    for (const match of text.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)) add(match[1], source, match.index, 'html-resource');
    for (const match of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) if (!/\bsrc\s*=|application\/(?:ld\+)?json/i.test(match[1]) && match[2].trim()) scanJavaScript(match[2], source);
  }
}

function selfTest() {
  const prefix = 'https://cdn.mchose.com.cn/configCenter/public/';
  const fixture = `const base=${JSON.stringify(prefix)};const x=base.concat('newBin/probe.bin'); const y=\`\${base}pdf/\${unknown?'zh_CN':'en_US'}/probe.pdf\`; const raw='{"image":"https://cdn.mchose.com.cn/configCenter/static/images/nested.png"}';`;
  scanJavaScript(fixture, 'https://www.mchose.com.cn/assets/audit-fixture.js');
  for (const value of ['newBin/probe.bin', 'pdf/zh_CN/probe.pdf', 'pdf/en_US/probe.pdf']) assert.ok(dependencies.has(prefix + value));
  assert.ok(dependencies.has('https://cdn.mchose.com.cn/configCenter/static/images/nested.png'));
  assert.ok(!dependencies.has('https://www.mchose.com.cn/assets/newBin/probe.bin'));
  const payload = Buffer.from('{"image":"https://cdn.mchose.com.cn/configCenter/static/images/compressed.png"}');
  const compressed = zlib.deflateRawSync(payload), filename = Buffer.from('data.json');
  const header = Buffer.alloc(30), central = Buffer.alloc(46);
  header.writeUInt32LE(0x04034b50); header.writeUInt16LE(8, 8); header.writeUInt16LE(filename.length, 26);
  central.writeUInt32LE(0x02014b50); central.writeUInt16LE(8, 10); central.writeUInt32LE(compressed.length, 20); central.writeUInt16LE(filename.length, 28);
  inspectData({ __compressBase64__: Buffer.concat([header, filename, compressed, central, filename]).toString('base64') }, 'https://cdn.mchose.com.cn/configCenter/custom/probe.json');
  assert.ok(dependencies.has('https://cdn.mchose.com.cn/configCenter/static/images/compressed.png'));
  scanJavaScript('const origin="https://cdn.mchose.com.cn/configCenter/assets";function image(name){return `${origin}/product_bg/${name}`}const picture=image("probe/white.png");', 'https://www.mchose.com.cn/assets/audit-helper.js');
  assert.ok(dependencies.has('https://cdn.mchose.com.cn/configCenter/assets/product_bg/probe/white.png'));
  assert.ok(!dependencies.has('https://www.mchose.com.cn/assets/probe/white.png'));
  scanJavaScript('p.u=function(e){return "static/chunks/"+e+"."+({12:"hash"})[e]+".js"}', 'https://www.mchose.com.cn/gmouse/_next/static/chunks/webpack-test.js');
  assert.ok(dependencies.has('https://www.mchose.com.cn/gmouse/_next/static/chunks/12.hash.js'));
  scanJavaScript('const pending=`https://cdn.mchose.com.cn/new-path/${state}.json`;', 'https://www.mchose.com.cn/assets/audit-unknown.js');
  assert.ok([...unresolved.values()].some(item => item.expression.includes('new-path/')), 'An unknown dynamic static path remains a failed review obligation.');
  dependencies.clear(); unresolved.clear(); excluded.clear();
  sourceFacts.clear();
  dataPathCandidates.clear();
  semanticResolutions.length = 0;
  for (const key of Object.keys(counters)) counters[key] = 0;
}
selfTest();
if (process.argv.includes('--self-test')) { console.log('Mirror dependency audit self-test passed (concat, template alternatives, lexical helper calls, nested/compressed JSON, lazy webpack chunks).'); process.exit(0); }

const manifests = await Promise.all(['source-manifest.json', 'mirror-source-manifest.json'].map(async name => ({ name, bytes: await fs.readFile(path.join(root, 'snapshots', name)) })));
const allRecords = new Map(), captured = new Map();
for (const manifest of manifests) for (const record of JSON.parse(manifest.bytes).files) {
  const url = canonical(record.url);
  allRecords.set(url, record);
  if (record.status === 'ok') captured.set(url, record);
}
// Helper exports are declared in the large application entry; parse it first.
const records = [...captured.entries()].sort((a, b) => Number(!/main-DnvOpr5S\.js$/.test(a[0])) - Number(!/main-DnvOpr5S\.js$/.test(b[0])) || a[0].localeCompare(b[0]));
for (const [source, record] of records) {
  if (desktopDistribution(source)) { excludedSources.push({ url: source, reason: 'Desktop renderer distribution or explicitly opened native-system repair tool' }); continue; }
  const suffix = new URL(source).pathname.split('.').at(-1).toLowerCase();
  let type = /\.m?js$/.test(source) ? 'js' : suffix === 'css' ? 'css' : suffix === 'json' ? 'json' : suffix === 'svg' ? 'svg' : suffix === 'html' || source.endsWith('/') ? 'html' : null;
  if (!type && !['glb', 'gltf'].includes(suffix)) continue;
  try {
    const bytes = await fs.readFile(path.join(root, record.upstreamPath));
    assert.equal(bytes.length, record.bytes, 'Captured source length mismatch');
    assert.equal(digest(bytes), record.sha256, 'Captured source integrity mismatch');
    inputFiles.push({ url: source, upstreamPath: record.upstreamPath, bytes: bytes.length, sha256: digest(bytes) });
    if (suffix === 'gltf') { counters.gltf++; inspectData(JSON.parse(bytes.toString()), source); }
    else if (suffix === 'glb') {
      for (let at = 12; at + 8 <= bytes.length;) { const length = bytes.readUInt32LE(at); if (bytes.readUInt32LE(at + 4) === 0x4e4f534a) { counters.gltf++; inspectData(JSON.parse(bytes.subarray(at + 8, at + 8 + length).toString().trim()), source); } at += 8 + length; }
    } else scanText(bytes.toString('utf8'), source, type);
  } catch (error) { scanErrors.push({ source, error: String(error) }); }
}
const entries = [...dependencies.values()].sort((a, b) => a.url.localeCompare(b.url)).map(item => {
  const record = captured.get(item.url) ?? allRecords.get(item.url);
  const provenEmpty = record?.status === 'error' && record.sourceResponse?.httpStatus === 200 && record.sourceResponse?.contentLength === 0 && record.sourceResponse?.etag?.replaceAll('"', '').toLowerCase() === 'd41d8cd98f00b204e9800998ecf8427e' && /Source returned HTTP 200 with an empty body/.test(record.error ?? '');
  const status = captured.has(item.url) ? 'captured' : provenEmpty ? 'upstream-empty' : record?.status === 'error' && /HTTP (?:404|410)/.test(record.error ?? '') ? 'upstream-unavailable' : record?.status ?? 'missing';
  const certainty = item.kinds.has('localized-guide') || item.kinds.has('gmouse-manual') ? 'finite-factory-domain' : item.kinds.has('resolved-expression') || item.kinds.has('url-helper') || item.kinds.has('webpack-chunk-table') ? 'statically-derived' : 'complete-source-value';
  return { ...item, kinds: [...item.kinds].sort(), certainty, status, ...(record ? { upstreamPath: record.upstreamPath, sitePath: record.sitePath, sourceError: record.error, sourceResponse: record.sourceResponse } : {}), ...(provenEmpty ? { usable: false, reason: 'The official source serves zero bytes. No replacement or usable firmware was fabricated.' } : {}) };
});
const reviewedPatterns = [], remainingPatterns = [];
const libraryPathConsumers = [...sourceFacts].filter(([source, facts]) => facts.libraryPathMentions && !/\/driver-ui(?:_test)?\/driver-ui\.global\.js$/.test(source));
for (const item of unresolved.values()) {
  let resolution;
  if (/^`\[driver-ui\.(?:vue|react)\]/.test(item.expression)) resolution = 'Diagnostic error text; not a resource request.';
  else if (item.expression === '`${ir.CDN_BASE_PATH}driver-ui.esm.js`' && !libraryPathConsumers.length) resolution = 'Exported getDriverUILibraryPath URL builder; active application sources have no consumer. Global bundle eagerly registers its built-in components.';
  else if (item.expression === '"".concat(E,"/custom/keyboardConfig.json")') resolution = 'SDK production cdnPrefixUrl is configCenter; exact production configuration dependency is recorded.';
  else if (/^`\/newBin\/\$\{encodeURIComponent\(Cr\)\}\.(?:offer|payload)\.bin`$/.test(item.expression) && entries.some(entry => entry.kinds.includes('legacy-mouse-firmware'))) resolution = 'All string-valued legacy mouseConfig versions expanded to exact offer/payload URLs.';
  else if (semanticResolutions.some(entry => entry.source === item.source && (entry.offset === item.offset || entry.pattern.startsWith('gmouse')))) resolution = 'Exact filename outputs enumerated in semanticResolutions and dependency entries.';
  (resolution ? reviewedPatterns : remainingPatterns).push(resolution ? { ...item, resolution } : item);
}
const componentCoverage = [];
for (const prefix of ['https://cdn.mchose.com.cn/customPage/driver-ui/', 'https://cdn.mchose.com.cn/customPage/driver-ui_test/']) for (const wrapper of ['react', 'vue']) {
  const source = `${prefix}${wrapper}/driver-ui.${wrapper}.js`, globalSource = prefix + 'driver-ui.global.js';
  if (!dependencies.has(source) && !captured.has(source)) continue;
  const globalFacts = sourceFacts.get(globalSource), wrapperFacts = sourceFacts.get(source);
  const requiredClasses = [...(wrapperFacts?.wrapperClasses ?? [])].sort();
  const missingClasses = requiredClasses.filter(name => !globalFacts?.driverClasses.has(name));
  componentCoverage.push({ source, globalSource, captured: captured.has(source) && captured.has(globalSource), requiredClasses, missingClasses, passed: captured.has(source) && captured.has(globalSource) && requiredClasses.length > 20 && !missingClasses.length });
}
const childReactApis = [...new Set([...sourceFacts.values()].flatMap(facts => [...facts.childReactApis]))].sort();
const reactWrapperFacts = sourceFacts.get('https://cdn.mchose.com.cn/customPage/driver-ui/react/driver-ui.react.js');
const missingReactApis = childReactApis.filter(name => !reactWrapperFacts?.wrapperApis.has(name));
const reactChildCoverage = { apis: childReactApis, missingApis: missingReactApis, passed: childReactApis.length > 20 && !missingReactApis.length };
const unresolvedDataPaths = [], reviewedDataPaths = [];
for (const item of dataPathCandidates.values()) {
  const legacyBackground = item.source.endsWith('/config/global.json') && /^limited_bg\/(?:light|dark)\.jpg$/.test(item.value) && [...sourceFacts.values()].some(facts => facts.backgroundConsumerUsesOnlyV2);
  (legacyBackground ? reviewedDataPaths : unresolvedDataPaths).push(legacyBackground ? { ...item, resolution: 'Unused legacy bgConfig data; the active factory global-config consumer reads bgConfigV2 only. No JSON-directory resource base was guessed.' } : item);
}
const closedStatuses = new Set(['captured', 'upstream-unavailable', 'upstream-empty']);
const allRetrievableCaptured = entries.every(item => closedStatuses.has(item.status));
const report = {
  formatVersion: 1, mode: 'frontend-static-dependencies', generatedAt: new Date().toISOString(),
  passed: !scanErrors.length && allRetrievableCaptured && !remainingPatterns.length && !unresolvedDataPaths.length && componentCoverage.every(item => item.passed) && reactChildCoverage.passed,
  allRetrievableCaptured,
  scope: 'Source-only static distribution closure, including original full UI, subapps, inline/compressed configuration, and declared lazy chunks. Factory services remain external.',
  limitations: ['Values supplied only by a live backend, user files, arbitrary device payloads, and runtime-only branches cannot be exhaustively enumerated by static analysis.', 'Unresolved expressions are retained as review evidence; this audit does not execute manufacturer JavaScript.'],
  excludedCategories: ['Factory backend APIs and OAuth/login', 'User-uploaded remote content', 'Explicit installer/archive downloads', 'Desktop renderer updates and explicitly opened native-system repair tools'],
  counters, sourceCount: inputFiles.length, manifestHashes: Object.fromEntries(manifests.map(item => [item.name, digest(item.bytes)])), inputFiles,
  dependencies: entries,
  missingSeeds: entries.filter(item => !closedStatuses.has(item.status)).map(item => item.url),
  unavailable: entries.filter(item => ['upstream-unavailable', 'upstream-empty'].includes(item.status)),
  unresolvedDataPaths, reviewedDataPaths,
  unresolvedPatterns: remainingPatterns, reviewedPatterns, semanticResolutions, componentCoverage, reactChildCoverage,
  exclusions: [...excluded].map(([url, reason]) => ({ url, reason })), excludedSources,
  desktopExclusionEvidence: [
    { source: 'https://www.mchose.com.cn/assets/index-BfDJf4mL.js', symbol: 'T/me/he', proof: 'prod/pre urlRenderer are environment metadata; browser getRendererBuildInfo returns canUpdate:false.' },
    { source: 'https://www.mchose.com.cn/assets/main-DnvOpr5S.js', offset: 1707921, proof: 'Renderer updater stops when getRendererBuildInfo.canUpdate!==true, before getEnvConfigs; renderer OTA notifications also require isInElectron().' },
    { source: 'https://www.mchose.com.cn/assets/index-Dpp9-y81.js', offset: 18886, proof: 'THX system-repair dialog invokes native openBrowser with the explicit repair-tool URL.' },
  ], scanErrors,
};
await fs.mkdir(path.join(root, 'reports'), { recursive: true });
await fs.writeFile(path.join(root, 'reports/mirror-dependencies.json'), JSON.stringify(report, null, 2) + '\n');
await fs.writeFile(path.join(root, 'reports/mirror-dependency-seeds.json'), JSON.stringify({ source: 'Independent source-only dependency audit; see mirror-dependencies.json for evidence', urls: report.missingSeeds }, null, 2) + '\n');
console.log(JSON.stringify({ passed: report.passed, dependencies: entries.length, missingSeeds: report.missingSeeds.length, unavailable: report.unavailable.length, unresolvedPatterns: report.unresolvedPatterns.length, scanErrors: scanErrors.length, counters }, null, 2));
if (process.argv.includes('--check') && !report.passed) process.exitCode = 1;
