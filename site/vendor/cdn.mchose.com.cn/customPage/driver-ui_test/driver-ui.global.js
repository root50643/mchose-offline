// @mchose/driver-ui commit: eeed9bcef909fb2b3c13953fb2b57faf88434569
var DriverUI=function(c){"use strict";var cd=c=>{throw TypeError(c)};var Ua=(c,G,se)=>G.has(c)||cd("Cannot "+se);var n=(c,G,se)=>(Ua(c,G,"read from private field"),se?se.call(c):G.get(c)),w=(c,G,se)=>G.has(c)?cd("Cannot add the same private member more than once"):G instanceof WeakSet?G.add(c):G.set(c,se),d=(c,G,se,ri)=>(Ua(c,G,"write to private field"),ri?ri.call(c,se):G.set(c,se),se),he=(c,G,se)=>(Ua(c,G,"access private method"),se);var Ga=(c,G,se,ri)=>({set _(ms){d(c,G,ms,se)},get _(){return n(c,G,ri)}});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ud,bi,Ir,rr,Ie,Wa,ja,pd,Js,vi,Mr,Gt,sr,yi,wi,xi,cs,de,Et,_i,ki,Ci,Tt,Si,zr,or,ft,Ve,Pt,At,Wt,jt,Yt,ar,nr,Je,Qe,$i,Ya,qa,U,qt,Xt,mt,gt,Ei,Kt,lr,dr,Zt,Jt,hr,Ti,ur,Be,Ue,Rr,Pi,cr,Ot,pr,Qt,Xa,Qs,ps,Lr,ve,Dt,et,Me,ei,O,pe,Ee,Ai,Ge,Oi,Y,Te,Di,Ii,fr,mr,Mi,tt,It,ti,Mt,bt,Hr,gr,ii,br,zi,Fr,it,Vr,Br;const G=globalThis,se=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ri=Symbol(),ms=new WeakMap;let Ka=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ri)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(se&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ms.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ms.set(t,e))}return e}toString(){return this.cssText}};const z=r=>new Ka(typeof r=="string"?r:r+"",void 0,ri),_=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new Ka(t,r,ri)},fd=(r,e)=>{if(se)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=G.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},Za=se?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return z(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:md,defineProperty:gd,getOwnPropertyDescriptor:bd,getOwnPropertyNames:vd,getOwnPropertySymbols:yd,getPrototypeOf:wd}=Object,si=globalThis,Ja=si.trustedTypes,xd=Ja?Ja.emptyScript:"",eo=si.reactiveElementPolyfillSupport,Gr=(r,e)=>r,gs={toAttribute(r,e){switch(e){case Boolean:r=r?xd:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},to=(r,e)=>!md(r,e),Qa={attribute:!0,type:String,converter:gs,reflect:!1,useDefault:!1,hasChanged:to};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),si.litPropertyMetadata??(si.litPropertyMetadata=new WeakMap);let vr=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Qa){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&gd(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=bd(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){const l=s==null?void 0:s.call(this);o==null||o.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Qa}static _$Ei(){if(this.hasOwnProperty(Gr("elementProperties")))return;const e=wd(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Gr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Gr("properties"))){const t=this.properties,i=[...vd(t),...yd(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Za(s))}else e!==void 0&&t.push(Za(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fd(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const a=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:gs).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){var o,a;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),h=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:gs;this._$Em=s;const p=h.fromAttribute(t,l.type);this[s]=p??((a=this._$Ej)==null?void 0:a.get(s))??p,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){var a;if(e!==void 0){const l=this.constructor;if(s===!1&&(o=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??to)(o,t)||i.useDefault&&i.reflect&&o===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:l}=a,h=this[o];l!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,a,h)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};vr.elementStyles=[],vr.shadowRootOptions={mode:"open"},vr[Gr("elementProperties")]=new Map,vr[Gr("finalized")]=new Map,eo==null||eo({ReactiveElement:vr}),(si.reactiveElementVersions??(si.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wr=globalThis,en=r=>r,bs=Wr.trustedTypes,tn=bs?bs.createPolicy("lit-html",{createHTML:r=>r}):void 0,rn="$lit$",oi=`lit$${Math.random().toFixed(9).slice(2)}$`,sn="?"+oi,_d=`<${sn}>`,Ri=document,jr=()=>Ri.createComment(""),Yr=r=>r===null||typeof r!="object"&&typeof r!="function",io=Array.isArray,kd=r=>io(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ro=`[ 	
\f\r]`,qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,on=/-->/g,an=/>/g,Li=RegExp(`>|${ro}(?:([^\\s"'>=/]+)(${ro}*=${ro}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nn=/'/g,ln=/"/g,dn=/^(?:script|style|textarea|title)$/i,Cd=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),u=Cd(1),We=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),hn=new WeakMap,Ni=Ri.createTreeWalker(Ri,129);function un(r,e){if(!io(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tn!==void 0?tn.createHTML(e):e}const Sd=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",a=qr;for(let l=0;l<t;l++){const h=r[l];let p,f,g=-1,v=0;for(;v<h.length&&(a.lastIndex=v,f=a.exec(h),f!==null);)v=a.lastIndex,a===qr?f[1]==="!--"?a=on:f[1]!==void 0?a=an:f[2]!==void 0?(dn.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Li):f[3]!==void 0&&(a=Li):a===Li?f[0]===">"?(a=s??qr,g=-1):f[1]===void 0?g=-2:(g=a.lastIndex-f[2].length,p=f[1],a=f[3]===void 0?Li:f[3]==='"'?ln:nn):a===ln||a===nn?a=Li:a===on||a===an?a=qr:(a=Li,s=void 0);const x=a===Li&&r[l+1].startsWith("/>")?" ":"";o+=a===qr?h+_d:g>=0?(i.push(p),h.slice(0,g)+rn+h.slice(g)+oi+x):h+oi+(g===-2?l:x)}return[un(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Xr{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,a=0;const l=e.length-1,h=this.parts,[p,f]=Sd(e,t);if(this.el=Xr.createElement(p,i),Ni.currentNode=this.el.content,t===2||t===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Ni.nextNode())!==null&&h.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const g of s.getAttributeNames())if(g.endsWith(rn)){const v=f[a++],x=s.getAttribute(g).split(oi),E=/([.?@])?(.*)/.exec(v);h.push({type:1,index:o,name:E[2],strings:x,ctor:E[1]==="."?Ed:E[1]==="?"?Td:E[1]==="@"?Pd:vs}),s.removeAttribute(g)}else g.startsWith(oi)&&(h.push({type:6,index:o}),s.removeAttribute(g));if(dn.test(s.tagName)){const g=s.textContent.split(oi),v=g.length-1;if(v>0){s.textContent=bs?bs.emptyScript:"";for(let x=0;x<v;x++)s.append(g[x],jr()),Ni.nextNode(),h.push({type:2,index:++o});s.append(g[v],jr())}}}else if(s.nodeType===8)if(s.data===sn)h.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(oi,g+1))!==-1;)h.push({type:7,index:o}),g+=oi.length-1}o++}}static createElement(e,t){const i=Ri.createElement("template");return i.innerHTML=e,i}}function yr(r,e,t=r,i){var a,l;if(e===We)return e;let s=i!==void 0?(a=t._$Co)==null?void 0:a[i]:t._$Cl;const o=Yr(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=yr(r,s._$AS(r,e.values),s,i)),e}class $d{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??Ri).importNode(t,!0);Ni.currentNode=s;let o=Ni.nextNode(),a=0,l=0,h=i[0];for(;h!==void 0;){if(a===h.index){let p;h.type===2?p=new Kr(o,o.nextSibling,this,e):h.type===1?p=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(p=new Ad(o,this,e)),this._$AV.push(p),h=i[++l]}a!==(h==null?void 0:h.index)&&(o=Ni.nextNode(),a++)}return Ni.currentNode=Ri,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Kr{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=yr(this,e,t),Yr(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==We&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):kd(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&Yr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ri.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Xr.createElement(un(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const a=new $d(s,this),l=a.u(this.options);a.p(t),this.T(l),this._$AH=a}}_$AC(e){let t=hn.get(e.strings);return t===void 0&&hn.set(e.strings,t=new Xr(e)),t}k(e){io(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Kr(this.O(jr()),this.O(jr()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=en(e).nextSibling;en(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class vs{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(e,t=this,i,s){const o=this.strings;let a=!1;if(o===void 0)e=yr(this,e,t,0),a=!Yr(e)||e!==this._$AH&&e!==We,a&&(this._$AH=e);else{const l=e;let h,p;for(e=o[0],h=0;h<o.length-1;h++)p=yr(this,l[i+h],t,h),p===We&&(p=this._$AH[h]),a||(a=!Yr(p)||p!==this._$AH[h]),p===b?e=b:e!==b&&(e+=(p??"")+o[h+1]),this._$AH[h]=p}a&&!s&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ed extends vs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}class Td extends vs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}}class Pd extends vs{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=yr(this,e,t,0)??b)===We)return;const i=this._$AH,s=e===b&&i!==b||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ad{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){yr(this,e)}}const so=Wr.litHtmlPolyfillSupport;so==null||so(Xr,Kr),(Wr.litHtmlVersions??(Wr.litHtmlVersions=[])).push("3.3.3");const oo=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new Kr(e.insertBefore(jr(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi=globalThis;let Zr=class extends vr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=oo(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return We}};Zr._$litElement$=!0,Zr.finalized=!0,(ud=Hi.litElementHydrateSupport)==null||ud.call(Hi,{LitElement:Zr});const ao=Hi.litElementPolyfillSupport;ao==null||ao({LitElement:Zr}),(Hi.litElementVersions??(Hi.litElementVersions=[])).push("4.2.2");const Od={bubbles:!0,cancelable:!1,composed:!0};class cn extends CustomEvent{constructor(e,t,i={}){super(e,{...Od,...i,detail:t})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dd={attribute:!0,type:String,converter:gs,reflect:!1,hasChanged:to},Id=(r=Dd,e,t)=>{const{kind:i,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),i==="accessor"){const{name:a}=t;return{set(l){const h=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,h,r,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,r,l),l}}}if(i==="setter"){const{name:a}=t;return function(l){const h=this[a];e.call(this,l),this.requestUpdate(a,h,r,!0,l)}}throw Error("Unsupported decorator location: "+i)};function C(r){return(e,t)=>typeof t=="object"?Id(r,e,t):((i,s,o)=>{const a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(r){return C({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pn=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function q(r,e){return(t,i,s)=>{const o=a=>{var l;return((l=a.renderRoot)==null?void 0:l.querySelector(r))??null};if(e){const{get:a,set:l}=typeof i=="object"?t:s??(()=>{const h=Symbol();return{get(){return this[h]},set(p){this[h]=p}}})();return pn(t,i,{get(){let h=a.call(this);return h===void 0&&(h=o(this),(h!==null||this.hasUpdated)&&l.call(this,h)),h}})}return pn(t,i,{get(){return o(this)}})}}function Md(r){return r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function fn(r,e){return e.attribute!==void 0?e.attribute:typeof r!="string"?!0:Md(r)}function Fi(r,e=!1){return r==null?e:r===!1||r==="false"?!1:r===!0||r==="true"||r===""?!0:e}const zd=Fi;function ys(r=!1){return{fromAttribute:e=>e===null?!1:Fi(e,r),toAttribute:e=>Fi(e,!1)?"":null}}const Rd=ys(!1),Ld=ys(!0),mn={fromAttribute:r=>{if(r!==null){if(r==="false")return!1;if(r==="true"||r==="")return!0}},toAttribute:r=>r===void 0?null:r?"":"false"};function m(r=!1,e={}){return ai(e,{kind:"boolean",defaultValue:r,converter:ys(r)})}function Jr(r={}){return(e,t)=>{const i={...r,attribute:fn(t,r),reflect:r.reflect??!0,converter:mn,duTyped:{kind:"boolean",defaultValue:void 0}};C(i)(e,t),gn(e,t,i)}}function ws(r,e=0,t={}){if(r==null||r==="")return e;let i;if(typeof r=="number")i=r;else if(typeof r=="string"){const s=r.trim();if(!s)return e;i=Number(s)}else{if(typeof r=="boolean")return e;i=Number(r)}return Number.isFinite(i)?(t.integer&&(i=Math.trunc(i)),typeof t.min=="number"&&i<t.min&&(i=t.min),typeof t.max=="number"&&i>t.max&&(i=t.max),i):e}function Nd(r=0,e={}){return{fromAttribute:t=>ws(t,r,e),toAttribute:t=>{const i=ws(t,r,e);return String(i)}}}function no(r,e={}){const t=ws(r,Number.NaN,e);return Number.isFinite(t)?t:void 0}function T(r=0,e={}){const{integer:t,min:i,max:s,...o}=e;return ai(o,{kind:"number",defaultValue:r,integer:t,min:i,max:s,converter:Nd(r,{integer:t,min:i,max:s})})}function yt(r={}){const{integer:e,min:t,max:i,...s}=r,o={integer:e,min:t,max:i};return ai({...s,useDefault:!1},{kind:"number",defaultValue:void 0,integer:e,min:t,max:i,converter:{fromAttribute:a=>no(a,o),toAttribute:a=>{const l=no(a,o);return l===void 0?null:String(l)}}})}function lo(r,e,t){if(r==null)return t;const i=String(r);return e.includes(i)?i:t}function Hd(r,e){return{fromAttribute:t=>lo(t,r,e),toAttribute:t=>lo(t,r,e)}}function $(r,e,t={}){return ai(t,{kind:"enum",defaultValue:e,enumValues:r,converter:Hd(r,e)})}function ho(r,e){if(r==null)return;const t=String(r);return e.includes(t)?t:void 0}function zt(r,e={}){return ai({...e,useDefault:!1},{kind:"enum",defaultValue:void 0,enumValues:r,converter:{fromAttribute:t=>ho(t,r),toAttribute:t=>ho(t,r)??null}})}function uo(r,e){if(r==null||r==="")return e;if(typeof r=="string")try{return JSON.parse(r)}catch{return e}return typeof r=="object"?r:e}function Fd(r){return{fromAttribute:e=>uo(e,r),toAttribute:e=>{const t=uo(e,r);if(t==null)return null;try{return JSON.stringify(t)}catch{return null}}}}function wr(r,e={}){return ai(e,{kind:"json",defaultValue:r,converter:Fd(r)})}function xs(r,e=""){return r==null?e:String(r)}function co(r){if(r!=null)return String(r)}function Vd(r=""){return{fromAttribute:e=>e===null?r:xs(e,r),toAttribute:e=>xs(e,r)}}function y(r="",e={}){return ai(e,{kind:"string",defaultValue:r,converter:Vd(r)})}function st(r={}){return ai({...r,useDefault:!1},{kind:"string",defaultValue:void 0,converter:{fromAttribute:e=>co(e),toAttribute:e=>co(e)??null}})}function X(r){return`:host([${r}])`}function xr(r){return`:not([${r}])`}function ai(r,e){return(t,i)=>{const s={...r,attribute:fn(i,r),reflect:r.reflect??!0,useDefault:e.kind==="boolean"?!1:r.useDefault??!0,converter:e.converter,duTyped:{kind:e.kind,defaultValue:e.defaultValue,enumValues:e.enumValues,integer:e.integer,min:e.min,max:e.max}};C(s)(t,i),gn(t,i,s)}}function gn(r,e,t){const i=Object.getOwnPropertyDescriptor(r,e);if(!(i!=null&&i.set)||!i.get)return;const s=i.get,o=i.set;Object.defineProperty(r,e,{configurable:!0,enumerable:i.enumerable??!0,get(){return s.call(this)},set(a){o.call(this,bn(t,a))}})}function bn(r,e){const t=r.duTyped;if(!t)return e;switch(t.kind){case"boolean":return t.defaultValue===void 0?e==null?void 0:e===!1||e==="false"?!1:e===!0||e==="true"||e===""?!0:void 0:Fi(e,t.defaultValue);case"number":return t.defaultValue===void 0?no(e,{integer:t.integer,min:t.min,max:t.max}):ws(e,t.defaultValue,{integer:t.integer,min:t.min,max:t.max});case"enum":return t.defaultValue===void 0?ho(e,t.enumValues??[]):lo(e,t.enumValues??[],t.defaultValue);case"json":return uo(e,t.defaultValue);case"string":return t.defaultValue===void 0?co(e):xs(e,t.defaultValue);default:return e}}function Bd(r,e){for(const[t,i]of r.elementProperties){if(i.attribute===!1)continue;if((typeof i.attribute=="string"?i.attribute:String(t).toLowerCase())===e)return t}}class A extends Zr{static getPropertyDescriptor(e,t,i){const s=super.getPropertyDescriptor(e,t,i);if(!(s!=null&&s.set)||i.duTyped===void 0)return s;const{get:o,set:a}=s;return{get:o,set(l){a.call(this,bn(i,l))},configurable:!0,enumerable:!0}}static get observedAttributes(){return[...super.observedAttributes??[],"classname"]}attributeChangedCallback(e,t,i){if(e==="classname"){this.className=i??"";return}super.attributeChangedCallback(e,t,i),this.canonicalizeReflectedAttribute(e)}canonicalizeReflectedAttribute(e){const t=this.constructor,i=Bd(t,e);if(i===void 0)return;const s=t.elementProperties.get(i);if(!(s!=null&&s.reflect)||s.duTyped===void 0)return;const o=s.converter;if(!o||typeof o=="function"||!o.toAttribute)return;const a=this[i],l=o.toAttribute(a,s.type);if(l==null){this.hasAttribute(e)&&this.removeAttribute(e);return}const h=String(l);this.getAttribute(e)!==h&&this.setAttribute(e,h)}willUpdate(e){super.willUpdate(e),this.coerceOwnBooleanProp(e,"disabled"),this.coerceOwnBooleanProp(e,"readOnly")}coerceOwnBooleanProp(e,t){if(!e.has(t)||!(t in this))return;const i=this,s=Fi(i[t],!1);i[t]!==s&&(i[t]=s)}emit(e,t,i={}){const s=new cn(e,t,i);return this.dispatchEvent(s),s}emitValueChange(e,t,i,s={}){this.emit("change",i,s),this.emit(`update:${e}`,t,s)}readOwnBoolean(e,t=!1){return Fi(this[e],t)}get isOwnDisabled(){return this.readOwnBoolean("disabled")}get isOwnReadonly(){return this.readOwnBoolean("readOnly")}isBooleanAttribute(e){return Fi(this.getAttribute(e),!1)}hasAssignedSlot(e){const t=e?`slot[name="${e}"]`:"slot:not([name])",i=this.renderRoot.querySelector(t);return!!(i!=null&&i.assignedNodes({flatten:!0}).length)}focusElement(e,t){var i;(i=this.renderRoot.querySelector(e))==null||i.focus(t)}blurElement(e){var t;(t=this.renderRoot.querySelector(e))==null||t.blur()}}const vn=(window.__mchoseMirror.assetUrl("https://cdn.mchose.com.cn/customPage/iconfont/iconfont.css")),_s="__driverUIConfiguredIconfont__",yn=2e3;function Ud(){const r=window;return r.MC_CONFIG_GLOBAL_PROD_LOADER??r.MC_CONFIG_GLOBAL_TEST_LOADER}async function Gd(r){var t;let e;try{const i=await Promise.race([Promise.resolve().then(()=>r.getValue()),new Promise(o=>{e=setTimeout(()=>o(null),yn)})]),s=(t=i==null?void 0:i.version)==null?void 0:t.__duIconfont;return typeof s=="string"&&s.trim()?s.trim():typeof s=="number"&&Number.isFinite(s)?String(s):null}catch{return null}finally{clearTimeout(e)}}function Wd(r){return new Promise(e=>{const t=document.createElement("link");t.id="du-iconfont-config-css",t.rel="stylesheet",t.href=r;const i=o=>{clearTimeout(s),t.onload=t.onerror=null,o?document.documentElement.style.setProperty("--du-iconfont-css-url",JSON.stringify(r)):t.remove(),e(o?r:null)},s=setTimeout(()=>i(!1),yn);t.onload=()=>i(!0),t.onerror=()=>i(!1),document.head.appendChild(t)})}function wn(){if(typeof document>"u"||typeof window>"u")return Promise.resolve(null);const r=globalThis;return r[_s]??(r[_s]=(async()=>{const e=Ud();if(!e)return null;const t=await Gd(e);if(t===null)return null;const i=`${vn}?v=${encodeURIComponent(t)}`;return getComputedStyle(document.documentElement).getPropertyValue("--du-iconfont-css-url").trim().replace(/^["']|["']$/g,"")===i?i:await Wd(i)})().catch(()=>null)),r[_s]}wn();const jd=(window.__mchoseMirror.assetUrl("https://cdn.mchose.com.cn/customPage/iconfont/iconfont.js")),xn="du-iconfont-symbol-js",po=new WeakSet,_n=new WeakSet;let ks=null,Cs=!1,Ss=null;const Yd=`
du-icon {
  display: inline-flex;
  flex: none;
  color: currentColor;
  font-size: inherit;
  line-height: 1;
  vertical-align: -0.125em;
  contain: content;
}

du-icon .du-icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: inherit;
  line-height: 1;
  vertical-align: -0.125em;
}

du-icon .du-icon::before {
  line-height: 1;
}

du-icon .du-icon--symbol {
  overflow: hidden;
  fill: currentColor;
}
`;function kn(r,e){r.adoptedStyleSheets.includes(e)||(r.adoptedStyleSheets=[...r.adoptedStyleSheets,e])}function qd(r,e){const t=new URL(e,typeof document<"u"?document.baseURI:e).href;return r.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi,(i,s,o)=>{const a=o.trim();if(!a||a.startsWith("data:")||a.startsWith("//")||/^[a-z][a-z0-9+.-]*:/i.test(a))return i;const l=new URL(a,t).href,h=s||'"';return`url(${h}${l}${h})`})}function Xd(){if(!ks){let r;ks=wn().then(e=>(r=e||getComputedStyle(document.documentElement).getPropertyValue("--du-iconfont-css-url").trim().replace(/^["']|["']$/g,"")||vn,fetch(r,{cache:"force-cache"}))).then(e=>{if(!e.ok)throw new Error(`Failed to load iconfont CSS: ${e.status}`);return e.text()}).then(e=>{const t=new CSSStyleSheet;return t.replaceSync(qd(e.replace(/@font-face\s*\{[^}]*\}/gi,""),r)),t}).catch(e=>{throw ks=null,e})}return ks}function Kd(){return Ss||(Ss=new CSSStyleSheet,Ss.replaceSync(Yd)),Ss}function Zd(r){typeof document>"u"||!(r instanceof ShadowRoot)||po.has(r)||(po.add(r),Xd().then(e=>{kn(r,e)}).catch(()=>{po.delete(r)}))}function Cn(){if(typeof document>"u"||Cs)return;if(document.getElementById(xn)){Cs=!0;return}Cs=!0;const r=document.createElement("script");r.id=xn,r.src=jd,r.async=!0,r.onerror=()=>{Cs=!1,r.remove()},document.head.appendChild(r)}function Jd(r=document){typeof document>"u"||_n.has(r)||(_n.add(r),kn(r,Kd()))}const Qd=_`
:host {
  display: inline-flex;
  flex: none;
  color: currentColor;
  line-height: 1;
  vertical-align: -0.125em;
}
`;var eh=Object.defineProperty,_r=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&eh(e,t,s),s};const Xo=class Xo extends A{constructor(){super(...arguments),this.name="",this.symbol="",this.size="",this.color="",this.label="",this.decorative=!1}connectedCallback(){super.connectedCallback();const e=this.getRootNode(),t=e instanceof ShadowRoot?e:document;Jd(t),Zd(t),this.symbol&&Cn()}createRenderRoot(){return this}updated(e){e.has("symbol")&&this.symbol&&Cn()}get normalizedSize(){return this.size?/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size:""}get iconAriaHidden(){return this.decorative||!this.label?"true":b}get iconAriaLabel(){return this.decorative||!this.label?b:this.label}get iconStyle(){const e=[],t=this.normalizedSize;return t&&(e.push(`width: ${t}`),e.push(`height: ${t}`),e.push(`font-size: ${t}`)),this.color&&e.push(`color: ${this.color}`),e.join("; ")}render(){const e=this.iconStyle;return this.symbol?u`
        <svg
          class="du-icon du-icon--symbol"
          part="symbol"
          style=${e||b}
          aria-hidden=${this.iconAriaHidden}
          aria-label=${this.iconAriaLabel}
        >
          <use href=${`#${this.symbol}`}></use>
        </svg>
      `:u`
      <i
        class=${`du-icon iconfont ${this.name}`.trim()}
        part="icon"
        style=${e||b}
        aria-hidden=${this.iconAriaHidden}
        aria-label=${this.iconAriaLabel}
      ></i>
    `}};Xo.styles=Qd;let wt=Xo;_r([y()],wt.prototype,"name"),_r([y()],wt.prototype,"symbol"),_r([y()],wt.prototype,"size"),_r([y()],wt.prototype,"color"),_r([y("",{attribute:"label"})],wt.prototype,"label"),_r([m()],wt.prototype,"decorative");function k(r,e){customElements.get(r)||customElements.define(r,e)}function oe(){k("du-icon",wt)}function kr(r){return r===""||r===void 0||r===null?"":typeof r=="number"||/^\d+(\.\d+)?$/.test(String(r))?`${r}px`:String(r)}const te=z(`
  -webkit-user-select: none;
  user-select: none;
  caret-color: transparent;
  outline: none;
`),th=_`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--du-loading-icon-size, 36px);
    height: var(--du-loading-icon-size, 36px);
    color: var(--du-loading-icon-color, currentColor);
    line-height: 0;
    vertical-align: middle;
    ${te}
  }

  :host([variant='switch']) {
    --du-loading-icon-stroke-width: 3px;
    --du-loading-icon-color: var(--du-on-d-c2);
  }

  .du-loading-icon__circular {
    display: block;
    width: 100%;
    height: 100%;
    animation: du-loading-icon-rotate var(--du-loading-icon-rotate-duration, 2s) linear infinite;
  }

  .du-loading-icon__path {
    stroke: currentColor;
    stroke-width: var(--du-loading-icon-stroke-width, 2px);
    stroke-linecap: round;
    animation: du-loading-icon-dash var(--du-loading-icon-dash-duration, 1.5s) ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
  }

  @keyframes du-loading-icon-rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @keyframes du-loading-icon-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
`;var ih=Object.defineProperty,fo=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&ih(e,t,s),s};const rh=["stroke","switch"],Ko=class Ko extends A{constructor(){super(...arguments),this.size="36",this.label="loading",this.variant="stroke"}willUpdate(){const e=kr(this.size);e?this.style.setProperty("--du-loading-icon-size",e):this.style.removeProperty("--du-loading-icon-size")}render(){return u`
      <span class="du-loading-icon" part="spinner" role="status" aria-label=${this.label}>
        <svg
          class="du-loading-icon__circular"
          part="circular"
          viewBox="25 25 50 50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle class="du-loading-icon__path" part="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </span>
    `}};Ko.styles=th;let Vi=Ko;fo([y("36")],Vi.prototype,"size"),fo([y("loading")],Vi.prototype,"label"),fo([$(rh,"stroke")],Vi.prototype,"variant");function $s(){k("du-loading-icon",Vi)}const sh=_`
  :host {
    display: inline-flex;
    position: relative;
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    color: var(--du-accent-blue);
    vertical-align: middle;
  }

  :host::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: var(--du-radius-round-corner-full, 9999px);
    background: var(--du-on-d-c1);
    pointer-events: none;
  }

  :host([type='info']) {
    color: var(--du-fill-p9);
  }

  :host([type='error']) {
    color: var(--du-accent-red);
  }

  .du-toast-icon {
    display: block;
    position: relative;
    width: 24px;
    height: 24px;
    color: inherit;
  }
`;var oh=Object.defineProperty,ah=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&oh(e,t,s),s};const nh=["success","info","error"],Zo=class Zo extends A{constructor(){super(...arguments),this.type="success"}get iconName(){return this.type==="error"?"icon-warning_circle_surface":this.type==="success"?"icon-tick_circle_surface":"icon-message_circle_surface"}render(){return u`
      <du-icon
        class="du-toast-icon"
        part="icon"
        name=${this.iconName}
        size="24"
        decorative
      ></du-icon>
    `}};Zo.styles=sh;let Qr=Zo;ah([$(nh,"success")],Qr.prototype,"type");function Es(){oe(),k("du-toast-icon",Qr)}function ae(r){return typeof r=="string"&&r.trim()?r:b}function ni(r,e){return!r||typeof r!="object"||Array.isArray(r)||!Object.prototype.hasOwnProperty.call(r,e)?b:ae(r[e])}var lh=Object.defineProperty,Sn=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&lh(e,t,s),s};function dh(r){const e=r.closest("fieldset[disabled]");if(!e)return!1;const t=Array.from(e.children).find(i=>i.tagName==="LEGEND");return!t||!t.contains(r)}const Jo=class Jo extends A{constructor(){super(),this.name="",this.readOnly=!1,this.validationMessageText="",this.formDisabled=!1;try{this.internals=this.attachInternals()}catch{this.internals=void 0}}get form(){var e;return((e=this.internals)==null?void 0:e.form)??null}get validity(){var e;return(e=this.internals)==null?void 0:e.validity}get validationMessage(){var e;return((e=this.internals)==null?void 0:e.validationMessage)??this.validationMessageText}get isFormDisabled(){return this.formDisabled}get isEffectivelyDisabled(){return this.isOwnDisabled||this.isFormDisabled}get isValueLocked(){return this.isEffectivelyDisabled||this.isOwnReadonly}getFormValue(){return null}resetFormControl(){}restoreFormState(e){}firstUpdated(){this.syncFormValue(),this.syncFieldsetDisabled()}formDisabledCallback(e){this.syncFieldsetDisabled()}syncFieldsetDisabled(){const e=dh(this);this.formDisabled!==e&&(this.formDisabled=e,this.requestUpdate())}formResetCallback(){this.resetFormControl(),this.syncFormValue(),this.requestUpdate()}formStateRestoreCallback(e,t){this.restoreFormState(e),this.syncFormValue(),this.requestUpdate()}checkValidity(){var e;return((e=this.internals)==null?void 0:e.checkValidity())??this.validationMessageText.length===0}reportValidity(){var e;return((e=this.internals)==null?void 0:e.reportValidity())??this.checkValidity()}setCustomValidity(e){var t;this.validationMessageText=e,(t=this.internals)==null||t.setValidity(e?{customError:!0}:{},e)}syncFormValue(){this.setFormValue(this.getFormValue())}setFormValue(e,t=e){var s;const i=o=>typeof FormData<"u"&&o instanceof FormData||typeof File<"u"&&o instanceof File?o:o==null?"":String(o);(s=this.internals)==null||s.setFormValue(i(e),i(t))}};Jo.formAssociated=!0;let ye=Jo;Sn([y()],ye.prototype,"name"),Sn([m(!1,{attribute:"readonly"})],ye.prototype,"readOnly");const hh=_`
  :host {
    display: inline-block;
    width: fit-content;
    height: 20px;
    line-height: 0;
    vertical-align: middle;
    ${te}
  }

  .du-switch {
    --du-switch-track-off: var(--du-on-l-c7);
    --du-switch-track-on: var(--du-fill-p13);
    --du-switch-handle-bg: var(--du-on-d-c1);
    --du-switch-handle-shadow: var(--du-shadow-l1);
    --du-switch-hover-glow-opacity: 0.5;
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    width: 40px;
    height: 20px;
    padding: 0;
    overflow: hidden;
    background: var(--du-switch-track-off);
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color var(--du-duration, 300ms) ease;
    ${te}
  }

  .du-switch::before {
    position: absolute;
    top: 3px;
    left: -17px;
    z-index: 0;
    width: 39px;
    height: 29px;
    pointer-events: none;
    content: '';
    background: #fff;
    border-radius: 14.5px;
    opacity: 0;
    filter: blur(10px);
    transition: opacity var(--du-duration, 300ms) ease;
  }

  .du-switch__action {
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--du-switch-track-on);
    background: var(--du-switch-handle-bg);
    border-radius: 50%;
    box-shadow: var(--du-switch-handle-shadow);
    transition: left var(--du-duration, 300ms) ease;
  }

  .du-switch--checked .du-switch__action {
    left: calc(100% - 18px);
  }

  .du-switch--checked,
  .du-switch[data-loading='true'] {
    background: var(--du-switch-track-on);
  }

  .du-switch--checked::before,
  .du-switch:not(:disabled):not([data-loading='true']):not([aria-readonly='true']):hover::before {
    opacity: var(--du-switch-hover-glow-opacity);
  }

  .du-switch:focus-visible {
    outline: none;
  }

  .du-switch:disabled,
  .du-switch[data-loading='true'],
  .du-switch[aria-readonly='true'] {
    cursor: not-allowed;
  }

  .du-switch[aria-readonly='true']:not(:disabled) {
    cursor: default;
  }

  .du-switch:disabled {
    opacity: var(--du-disabled-opacity, 0.3);
    transition:
      background-color var(--du-duration, 300ms) ease,
      opacity var(--du-duration, 300ms) ease;
  }

  .du-switch:disabled > * {
    --du-disabled-opacity: 1;
  }

  .du-switch[data-loading='true'] {
    opacity: 1;
  }

  .du-switch[data-loading='true'] .du-switch__action {
    color: var(--du-switch-handle-bg);
    background: transparent;
    box-shadow: none;
  }

  .du-switch[data-loading='true'] .du-switch__action du-loading-icon {
    --du-loading-icon-size: 14px;
    --du-loading-icon-stroke-width: 5px;
    --du-loading-icon-rotate-duration: 0.9s;
    --du-loading-icon-dash-duration: 0.9s;
    --du-loading-icon-color: var(--du-switch-handle-bg);
  }

  :host-context([data-du-theme='dark']) .du-switch::before,
  :host-context(:root[theme-mode='dark']) .du-switch::before,
  :host-context(:root.theme-dark) .du-switch::before {
    --du-switch-hover-glow-opacity: 0.6;
    top: 0.5px;
    left: -18.5px;
    width: 42px;
    height: 32px;
    border-radius: 16px;
  }

`;var uh=Object.defineProperty,es=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&uh(e,t,s),s};const Qo=class Qo extends ye{constructor(){super(...arguments),this.testId="",this.checked=!1,this.disabled=!1,this.loading=!1,this.passive=!1,this.initialChecked=!1}connectedCallback(){super.connectedCallback(),this.initialChecked=this.checked||this.isBooleanAttribute("checked")}getFormValue(){return this.checked?"on":null}resetFormControl(){this.checked=this.initialChecked}restoreFormState(e){typeof e=="string"&&(this.checked=e==="on")}get isInteractiveDisabled(){return this.isEffectivelyDisabled||this.readOwnBoolean("loading")}toggle(){if(this.isInteractiveDisabled||this.isOwnReadonly)return;const e=!this.checked;this.passive||(this.checked=e,this.setFormValue(e?"on":null)),this.emitValueChange("checked",e,{checked:e})}handleKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}render(){const e=this.readOwnBoolean("loading"),t=this.isInteractiveDisabled,i=this.isOwnReadonly,s=["du-switch",this.checked?"du-switch--checked":""].filter(Boolean).join(" ");return u`
      <button
        class=${s}
        part="switch"
        data-testid=${ae(this.testId)}
        type="button"
        role="switch"
        aria-checked=${String(this.checked)}
        aria-busy=${e?"true":"false"}
        aria-readonly=${i?"true":"false"}
        .disabled=${t}
        data-loading=${e?"true":b}
        @click=${this.toggle}
        @keydown=${this.handleKeydown}
      >
        <span class="du-switch__action" part="action">
          ${e?u`<du-loading-icon size="14" variant="switch" label="loading"></du-loading-icon>`:u`<slot name="action"></slot>`}
        </span>
      </button>
    `}};Qo.styles=hh;let Rt=Qo;es([y("",{attribute:"test-id",reflect:!1})],Rt.prototype,"testId"),es([m()],Rt.prototype,"checked"),es([m()],Rt.prototype,"disabled"),es([m()],Rt.prototype,"loading"),es([m()],Rt.prototype,"passive");function $n(){$s(),k("du-switch",Rt)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const li={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},mo=r=>(...e)=>({_$litDirective$:r,values:e});let go=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const di=mo(class extends go{constructor(r){var e;if(super(r),r.type!==li.ATTRIBUTE||r.name!=="class"||((e=r.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){var i,s;if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=r.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const a=!!e[o];a===this.st.has(o)||(s=this.nt)!=null&&s.has(o)||(a?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return We}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const En="important",ch=" !"+En,ph=mo(class extends go{constructor(r){var e;if(super(r),r.type!==li.ATTRIBUTE||r.name!=="style"||((e=r.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{const i=r[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[e]){const{style:t}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(const i in e){const s=e[i];if(s!=null){this.ft.add(i);const o=typeof s=="string"&&s.endsWith(ch);i.includes("-")||o?t.setProperty(i,o?s.slice(0,-11):s,o?En:""):t[i]=s}}return We}});function ne(r){return ph(fh(r))}function fh(r){let e=r;for(const[t,i]of Object.entries(r))typeof i!="string"||i.trim()!==""||(e===r&&(e={...r}),e[t]=void 0);return e}const mh={"semibold-display":"--du-typo-headline-semibold-display","semibold-display-s":"--du-typo-headline-semibold-display-s","semibold-xxxl":"--du-typo-headline-semibold-xxxl","semibold-xxl":"--du-typo-headline-semibold-xxl","semibold-xl":"--du-typo-headline-semibold-xl","semibold-l":"--du-typo-headline-semibold-l","semibold-m":"--du-typo-headline-semibold-m","semibold-s":"--du-typo-headline-semibold-s","semibold-xs":"--du-typo-headline-semibold-xs","semibold-xxs":"--du-typo-headline-semibold-xxs","regular-xl":"--du-typo-body-regular-xl","regular-m":"--du-typo-body-regular-m","regular-s":"--du-typo-body-regular-s","regular-xs":"--du-typo-body-regular-xs"},gh={regular:"--du-typo-regular-weight",semibold:"--du-typo-semibold-weight"};function bh(r){return r.startsWith("semibold")?"semibold":"regular"}const vh={xs:"--du-radius-round-corner-xs",s:"--du-radius-round-corner-s",m:"--du-radius-round-corner-m",l:"--du-radius-round-corner-l",20:"--du-radius-round-corner-20",xl:"--du-radius-round-corner-xl",xxl:"--du-radius-round-corner-xxl",xxxl:"--du-radius-round-corner-xxxl",full:"--du-radius-round-corner-full"},yh={l1:"--du-shadow-l1",l2:"--du-shadow-l2",l3:"--du-shadow-l3",l4:"--du-shadow-l4",l5:"--du-shadow-l5",l6:"--du-shadow-l6"},wh={l1:"--du-shadow-l1-backdrop-blur",l2:"--du-shadow-l2-backdrop-blur",l3:"--du-shadow-l3-backdrop-blur",l4:"--du-shadow-l4-backdrop-blur",l5:"--du-shadow-l5-backdrop-blur",l6:"--du-shadow-l6-backdrop-blur"},xh={topbar:"--du-texture-topbar",card:"--du-texture-card",btn:"--du-texture-btn"},_h={topbar:"--du-texture-topbar-backdrop-blur",card:"--du-texture-card-backdrop-blur",btn:"--du-texture-btn-backdrop-blur"},bo={4:"--du-gap-4",8:"--du-gap-8",12:"--du-gap-12",16:"--du-gap-16",20:"--du-gap-20",24:"--du-gap-24",28:"--du-gap-28",32:"--du-gap-32",36:"--du-gap-36",40:"--du-gap-40",44:"--du-gap-44",48:"--du-gap-48",52:"--du-gap-52",56:"--du-gap-56",60:"--du-gap-60",64:"--du-gap-64"},kh=["--du-font-family","--du-font-size","--du-line-height","--du-font-weight","--du-letter-spacing","--du-radius","--du-shadow","--du-backdrop-blur","--du-texture","--du-texture-blur","--du-gap","--du-color"],we={theme:"light",typography:"regular-s",radius:"s",shadow:"l1",texture:"",gap:"4"},vo="__driverUICssConfigDefaults__";function Ts(){const r=globalThis;return r[vo]||(r[vo]={defaults:{...we},listeners:new Set}),r[vo]}function Tn(){return{...Ts().defaults}}function yo(r){const e=Ts();e.defaults={...e.defaults,...Object.fromEntries(Object.entries(r).filter(([t,i])=>t==="texture"?i!=null:i!=null&&String(i)!==""))};for(const t of e.listeners)t()}function Pn(){const r=Ts();r.defaults={...we};for(const e of r.listeners)e()}function Ch(r){const{listeners:e}=Ts();return e.add(r),()=>e.delete(r)}function Sh(r,e){const t=mh[e],i=gh[bh(e)];r.style.setProperty("--du-font-family","var(--du-font-family-base)"),r.style.setProperty("--du-font-size",`var(${t}-size)`),r.style.setProperty("--du-line-height",`var(${t}-line-height)`),r.style.setProperty("--du-font-weight",`var(${i})`),r.style.setProperty("--du-letter-spacing",`var(${t}-letter-spacing)`)}function $h(r,e){r.style.setProperty("--du-radius",`var(${vh[e]})`)}function Eh(r,e){r.style.setProperty("--du-shadow",`var(${yh[e]})`),r.style.setProperty("--du-backdrop-blur",`var(${wh[e]})`)}function Th(r,e){r.style.setProperty("--du-texture",`var(${xh[e]})`),r.style.setProperty("--du-texture-blur",`var(${_h[e]})`)}function Ph(r,e){r.style.setProperty("--du-gap",`var(${bo[e]})`)}function An(r,e){const t=e.trim();if(!t){r.style.removeProperty("--du-disabled-opacity");return}r.style.setProperty("--du-disabled-opacity",t)}function Ah(r,e){r.setAttribute("data-du-theme",e),r.style.setProperty("--du-color","var(--du-on-l-c2)")}function Oh(r){for(const e of kh)r.style.removeProperty(e)}function Dh(r,e){const t=Tn(),i=e.isolated||e.forceDefaults;return{theme:r.theme||(i?t.theme:""),typography:r.typography||(i?t.typography:""),radius:r.radius||(i?t.radius:""),shadow:r.shadow||(i?t.shadow:""),texture:r.texture||(i?t.texture:""),gap:r.gap||(i?t.gap:"")}}function On(r,e){Oh(r),r.removeAttribute("data-du-theme"),(e.theme==="light"||e.theme==="dark")&&Ah(r,e.theme),e.typography&&Sh(r,e.typography),e.radius&&$h(r,e.radius),e.shadow&&Eh(r,e.shadow),e.texture&&Th(r,e.texture),e.gap&&Ph(r,e.gap)}function Ih(r){const e=r.trim();return e?Object.prototype.hasOwnProperty.call(bo,e)?`var(${bo[e]})`:/^\d+(\.\d+)?$/.test(e)?`${e}px`:e:""}class hi extends A{constructor(){super(...arguments);w(this,Ie);w(this,bi,"");w(this,Ir,!1);w(this,rr,!1)}static get observedAttributes(){const t=super.observedAttributes;return t.includes("title")?t:[...t,"title"]}get title(){return n(this,bi)}set title(t){he(this,Ie,Wa).call(this,t,t!=null),he(this,Ie,Js).call(this)}attributeChangedCallback(t,i,s){if(t!=="title"){super.attributeChangedCallback(t,i,s),he(this,Ie,ja).call(this,t)&&he(this,Ie,Js).call(this);return}n(this,rr)||(he(this,Ie,Wa).call(this,s,s!==null),he(this,Ie,Js).call(this))}resolveComponentTitle(t){return t===void 0?this.title:t}}bi=new WeakMap,Ir=new WeakMap,rr=new WeakMap,Ie=new WeakSet,Wa=function(t,i){const s=xs(t),o=n(this,bi),a=n(this,Ir);d(this,Ir,i),o!==s?(d(this,bi,s),this.requestUpdate("title",o)):a!==i&&this.requestUpdate("title",o)},ja=function(t){return t!=="title"&&t.endsWith("-title")},pd=function(){return this.constructor.observedAttributes.some(t=>he(this,Ie,ja).call(this,t)&&this.hasAttribute(t))},Js=function(){if(n(this,rr))return;const t=n(this,Ir)&&he(this,Ie,pd).call(this),i=this.getAttribute("title");(t?i===n(this,bi):i===null)||(d(this,rr,!0),t?this.setAttribute("title",n(this,bi)):this.removeAttribute("title"),d(this,rr,!1))};const wo="du-layer-z-index-change",ui={coachmark:1100,menu:1200,popup:1300,floatingPanel:1300,toast:1400},Lt=["top-level","normal"],xo="__driverUILayerZIndexStore__";function Ps(){const r=globalThis;return r[xo]||(r[xo]={providers:new WeakMap}),r[xo]}function Mh(r){var t;const e=(t=Ps()).pendingDocuments??(t.pendingDocuments=new WeakSet);e.has(r)||(e.add(r),queueMicrotask(()=>{e.delete(r),r.dispatchEvent(new CustomEvent(wo,{detail:{source:null}}))}))}function Dn(r){if(r instanceof Element&&r.assignedSlot)return r.assignedSlot;const e=r.parentNode;return(e==null?void 0:e.nodeType)===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e&&e.host instanceof Element?e.host:e}function In(r){let e=Dn(r);for(;e;){if(e instanceof HTMLElement){const t=Ps().providers.get(e);if(t)return t}e=Dn(e)}return null}class zh{constructor(e,t,i,s,o={}){w(this,vi);w(this,Mr);w(this,Gt);w(this,sr);w(this,yi);this.host=e,this.defaultZIndex=t,this.readOverride=i,this.onChange=s,this.options=o,d(this,vi,Number.NaN),d(this,Gt,!1),d(this,sr,!1),this.onDocumentLayerChange=a=>{var h;((h=a.detail)==null?void 0:h.source)!==this&&this.sync()}}get effectiveZIndex(){return Number.isFinite(n(this,vi))?n(this,vi):this.defaultZIndex}get effectiveRenderAt(){return n(this,Mr)??this.options.defaultRenderAt??"normal"}connect(){n(this,Gt)||(d(this,Gt,!0),Ps().providers.set(this.host,this),this.host.ownerDocument.addEventListener(wo,this.onDocumentLayerChange)),this.sync()}beginPortal(){this.sync(),d(this,yi,In(this.host)),d(this,sr,!0)}endPortal(){d(this,sr,!1)}releasePortal(){d(this,yi,void 0),this.sync()}clearOnDisconnect(){n(this,sr)||n(this,Gt)&&(d(this,Gt,!1),Ps().providers.delete(this.host),this.host.ownerDocument.removeEventListener(wo,this.onDocumentLayerChange),d(this,yi,void 0))}sync(){var p,f,g,v;const e=this.readOverride(),t=n(this,yi)!==void 0?n(this,yi):In(this.host),i=t?Math.max(this.defaultZIndex,t.effectiveZIndex+1):this.defaultZIndex,s=typeof e=="number"&&Number.isFinite(e)?Math.trunc(e):i,a=((f=(p=this.options).readRenderAt)==null?void 0:f.call(p))??(t==null?void 0:t.effectiveRenderAt)??this.options.defaultRenderAt??"normal",l=s!==n(this,vi),h=a!==n(this,Mr);return!l&&!h||(d(this,vi,s),d(this,Mr,a),l&&this.onChange(s),h&&((v=(g=this.options).onRenderAtChange)==null||v.call(g,a)),n(this,Gt)&&Mh(this.host.ownerDocument)),s}}vi=new WeakMap,Mr=new WeakMap,Gt=new WeakMap,sr=new WeakMap,yi=new WeakMap;function ts(r,e,t,i,s={}){return new zh(r,e,t,i,s)}function Mn(r,e,t){const i=r.trim().split(/\s+/),s=(o,a)=>{const l=(o??"50%").trim();if(l.endsWith("%"))return parseFloat(l)/100*a;if(l==="left"||l==="top")return 0;if(l==="center")return a/2;if(l==="right"||l==="bottom")return a;const h=parseFloat(l);return Number.isFinite(h)?h:a/2};return{x:s(i[0],e),y:s(i[1]??i[0],t)}}function zn(r,e,t,i,s){const o=`${Math.max(t/2,1)}px`;if(!r||r==="0px"||r.includes(" "))return o;if(i>0&&s>0&&(Math.abs(e-i)>.5||Math.abs(t-s)>.5)&&r.endsWith("px")){const a=Math.min(e/i,t/s);return`${Math.max(parseFloat(r)*a,0)}px`}return r}function Rh(r){const e=getComputedStyle(r);return{transform:e.transform&&e.transform!=="none"?e.transform:"none",transformOrigin:e.transformOrigin||"50% 50%",transformStyle:e.transformStyle||"flat",perspective:e.perspective||"none",perspectiveOrigin:e.perspectiveOrigin||"50% 50%",borderRadiusRaw:e.borderRadius||"0px"}}function As(r,e){r.style.left=`${e.left}px`,r.style.top=`${e.top}px`,r.style.width=`${e.width}px`,r.style.height=`${e.height}px`,r.style.transform=e.transform==="none"?"none":e.transform,r.style.transformOrigin=e.transformOrigin,r.style.transformStyle=e.transformStyle,r.style.perspective=e.perspective,r.style.perspectiveOrigin=e.perspectiveOrigin}function Rn(r,e,t){const i=r.getBoundingClientRect(),s={...t,left:t.left+(e.left-i.left),top:t.top+(e.top-i.top)};return As(r,s),s}function Ln(r){const e=Rh(r),t=r.getBoundingClientRect(),i=r.offsetWidth,s=r.offsetHeight,o={transformStyle:e.transformStyle,perspective:e.perspective,perspectiveOrigin:e.perspectiveOrigin};if(e.transform==="none"||i<=0||s<=0)return{left:t.left,top:t.top,width:t.width,height:t.height,transform:"none",transformOrigin:"50% 50%",...o,borderRadius:zn(e.borderRadiusRaw,t.width,t.height,i,s)};let a;try{a=new DOMMatrixReadOnly(e.transform)}catch{return{left:t.left,top:t.top,width:t.width,height:t.height,transform:"none",transformOrigin:"50% 50%",...o,borderRadius:zn(e.borderRadiusRaw,t.width,t.height,i,s)}}const l=Mn(e.transformOrigin,i,s),p=((g,v)=>{const x=new DOMPoint(g-l.x,v-l.y,0).matrixTransform(a);return{x:x.x+l.x,y:x.y+l.y}})(i/2,s/2),f=e.borderRadiusRaw!=="0px"&&!e.borderRadiusRaw.includes(" ")?e.borderRadiusRaw:`${Math.max(s/2,1)}px`;return{left:t.left+t.width/2-p.x,top:t.top+t.height/2-p.y,width:i,height:s,transform:e.transform,transformOrigin:e.transformOrigin,...o,borderRadius:f}}const Nn=new WeakMap;function Lh(r,e,t){const i=t==null?void 0:t.epsilon,s=Ln(e),o=s.transform!=="none"?e.getBoundingClientRect():null,a=Nn.get(r);if(o&&a&&a.source===e&&(t==null?void 0:t.previous)===a.applied&&_o(a.estimated,s,0)&&o.left===a.rect.left&&o.top===a.rect.top&&o.width===a.rect.width&&o.height===a.rect.height)return a.applied;if(t!=null&&t.previous&&s.transform==="none"&&_o(t.previous,s,i))return t.previous;let l=s;if(As(r,l),!o)return l;l=Rn(r,o,l);const h=r.getBoundingClientRect(),p=h.width>0?o.width/h.width:1,f=h.height>0?o.height/h.height:1;if(Math.abs(p-1)>.002||Math.abs(f-1)>.002){const g=`scale(${p}, ${f}) ${l.transform==="none"?"":l.transform}`.trim();l={...l,transform:g},As(r,l),l=Rn(r,o,l)}return t!=null&&t.previous&&_o(t.previous,l,i)&&(As(r,t.previous),l=t.previous),Nn.set(r,{source:e,estimated:s,rect:o,applied:l}),l}function _o(r,e,t){return Math.abs(r.left-e.left)<=t&&Math.abs(r.top-e.top)<=t&&Math.abs(r.width-e.width)<=t&&Math.abs(r.height-e.height)<=t&&r.transform===e.transform&&r.transformOrigin===e.transformOrigin&&r.transformStyle===e.transformStyle&&r.perspective===e.perspective&&r.perspectiveOrigin===e.perspectiveOrigin&&r.borderRadius===e.borderRadius}function Nh(r,e,t,i=Ln(r)){if(i.transform==="none")return{x:e-i.left,y:t-i.top};let s;try{s=new DOMMatrixReadOnly(i.transform)}catch{return{x:e-i.left,y:t-i.top}}const o=Mn(i.transformOrigin,i.width,i.height),a=s.inverse(),l=e-i.left,h=t-i.top,p=new DOMPoint(l-o.x,h-o.y,0).matrixTransform(a);return{x:p.x+o.x,y:p.y+o.y}}function Os(r,e,t){if(typeof ResizeObserver>"u")return;const i=new ResizeObserver(e),s=Array.isArray(r)?r:[r],o=t?{box:t}:void 0;for(const a of s)i.observe(a,o);return i}function is(r,e,t={childList:!0,subtree:!0,characterData:!0,attributes:!0}){if(typeof MutationObserver>"u")return;const i=new MutationObserver(e);return i.observe(r,t),i}function Hn(r){return typeof r.showPopover=="function"}function Fn(r){try{return r.matches(":popover-open")}catch{return!1}}function Cr(r){var e;if(r.dataset.duOverlayLayer="",!!Hn(r)){r.setAttribute("popover","manual");try{Fn(r)||(e=r.showPopover)==null||e.call(r)}catch{r.removeAttribute("popover")}}}function Bi(r,e={}){var t;if(Hn(r))try{Fn(r)&&((t=r.hidePopover)==null||t.call(r))}catch{}r.removeAttribute("popover"),delete r.dataset.duOverlayLayer,(e.clearPosition??!0)&&Hh(r)}function Hh(r){for(const e of["position","margin","inset","top","left","right","bottom","width","min-width","transform-origin"])r.style.removeProperty(e)}function Fh(r,e,t={}){const i=Math.max(0,t.offset??4),s=t.placement??"bottom-start",o=Math.max(0,t.minWidth??0),a=t.matchWidth?Math.max(e.width,o):Math.max(o,r.getBoundingClientRect().width||0),l=r.getBoundingClientRect().height||r.offsetHeight||0,h=8;let p=s.startsWith("top")?"top":"bottom",f=s.endsWith("end")?"end":"start";const g=D=>D==="top"?e.top-i-l:e.bottom+i,v=D=>D==="end"?e.right-a:e.left,x=D=>D>=h&&D+l<=window.innerHeight-h,E=D=>D>=h&&D+a<=window.innerWidth-h;let M=g(p),P=v(f);if(t.flip){if(!x(M)){const D=p==="top"?"bottom":"top",rt=g(D);x(rt)&&(p=D,M=rt)}if(!E(P)){const D=f==="start"?"end":"start",rt=v(D);E(rt)&&(f=D,P=rt)}}const vt=Math.max(h,window.innerWidth-a-h),ze=Math.max(h,window.innerHeight-l-h);P=Math.min(Math.max(P,h),vt),M=Math.min(Math.max(M,h),ze),r.style.setProperty("position","fixed"),r.style.setProperty("margin","0"),r.style.setProperty("inset","auto"),r.style.setProperty("top",`${M}px`),r.style.setProperty("left",`${P}px`),r.style.setProperty("right","auto"),r.style.setProperty("bottom","auto"),r.style.setProperty("transform-origin",`${p==="top"?"bottom":"top"} ${f==="end"?"right":"left"}`),t.matchWidth?(r.style.setProperty("width",`${a}px`),r.style.removeProperty("min-width")):o&&(r.style.setProperty("min-width",`${o}px`),r.style.removeProperty("width"))}const ko="__driverUIPortalThemeStore__";function Vh(){const r=globalThis;return r[ko]||(r[ko]={scopeWatchers:new WeakMap}),r[ko]}function Bh(r,e){const{scopeWatchers:t}=Vh();let i=t.get(r);if(!i){const s=new Set,o=new MutationObserver(()=>{for(const a of s)a()});o.observe(r,{attributes:!0,attributeFilter:["data-du-theme","style","class","theme-mode"]}),i={listeners:s,observer:o},t.set(r,i)}return i.listeners.add(e),()=>{const s=t.get(r);s&&(s.listeners.delete(e),s.listeners.size||(s.observer.disconnect(),t.delete(r)))}}function Vn(r){if(r.assignedSlot)return r.assignedSlot;if(r.parentElement)return r.parentElement;const e=r.getRootNode();return e instanceof ShadowRoot&&e.host instanceof HTMLElement?e.host:null}function Uh(r,e){let t=r;for(;t;){if(t.hasAttribute("data-du-theme"))return t;t=Vn(t)}return e}function Gh(r,e){let t=r;for(;t;){if(t.style.getPropertyValue(e).trim())return t;t=Vn(t)}return null}function Wh(r,e){const t=r.getAttribute("data-du-theme");if(t)return t;const i=e.getAttribute("data-du-theme")||e.getAttribute("theme-mode");return i||(e.classList.contains("theme-dark")?"dark":e.classList.contains("theme-light")?"light":"")}function Co(r,e){var t;return((t=r.ownerDocument.defaultView)==null?void 0:t.getComputedStyle(r).getPropertyValue(e).trim())??""}function jh(r,e,t,i){r.getAttribute(e)===i&&(t==null?r.removeAttribute(e):r.setAttribute(e,t))}function Yh(r,e,t,i,s,o){r.style.getPropertyValue(e)!==s||r.style.getPropertyPriority(e)!==o||(t?r.style.setProperty(e,t,i):r.style.removeProperty(e))}function Sr(r,e=r){const t=r.ownerDocument.documentElement,i=Uh(r,t),s=Gh(r,"--du-color"),o=e.getAttribute("data-du-theme"),a=e.style.getPropertyValue("--du-color"),l=e.style.getPropertyPriority("--du-color"),h=e!==i,p=e!==r||!a,f=Co(r,"--du-color");let g=o,v=a,x=l,E=!1;const M=()=>{if(E)return;if(h){const Ur=Wh(i,t);Ur?(e.getAttribute("data-du-theme")!==Ur&&e.setAttribute("data-du-theme",Ur),g=Ur):(e.removeAttribute("data-du-theme"),g=null)}if(!p)return;const ze=(s==null?void 0:s.style.getPropertyValue("--du-color").trim())??"",D=ze||(r!==e&&r.isConnected?Co(r,"--du-color"):Co(i,"--du-color"))||f,rt=ze?(s==null?void 0:s.style.getPropertyPriority("--du-color"))??"":"";D?((e.style.getPropertyValue("--du-color")!==D||e.style.getPropertyPriority("--du-color")!==rt)&&e.style.setProperty("--du-color",D,rt),v=D,x=rt):(e.style.removeProperty("--du-color"),v="",x="")},P=new Set;h&&P.add(i),p&&s&&P.add(s);const vt=Array.from(P,ze=>Bh(ze,M));return M(),()=>{if(!E){E=!0;for(const ze of vt)ze();h&&jh(e,"data-du-theme",o,g),p&&Yh(e,"--du-color",a,l,v,x)}}}function So(r,e){const t=e.trim();if(!t||!r)return null;try{return r instanceof Element&&r.matches(t)?r:r.querySelector(t)}catch{return null}}function Bn(r){if(r instanceof Element)return r;if(typeof r=="string"&&r.trim()){const e=document.querySelector(r.trim());if(e)return e}return document.body}function Ds(r,e){const t=r.parentNode,i=r.nextSibling,s=Bn(e);return r.parentNode!==s&&s.appendChild(r),()=>{if(!t){r.remove();return}if(i&&i.parentNode===t){t.insertBefore(r,i);return}t.appendChild(r)}}function Un(r,e,t){const i=Bn(e);return t&&r.isConnected&&r.parentNode===i?t:(t==null||t(),Ds(r,e))}const qh="du-popper-mutually-exclusive";function Gn(r){let e=r.parentNode;for(;e;){if(e instanceof Element&&e.localName===qh)return e;if(e instanceof Element&&e.assignedSlot){e=e.assignedSlot;continue}if(e.parentNode instanceof ShadowRoot){e=e.parentNode.host;continue}e=e.parentNode}return null}const Wn=new WeakMap;function K(r){let e=Wn.get(r);return e||(e=new Kh(r),Wn.set(r,e)),e}function Xh(r){return K(r).resolve()}class Kh{constructor(e){w(this,wi);w(this,xi,!1);w(this,cs,!1);this.host=e}setPortaling(e){d(this,cs,e)}resolve(){const e=n(this,wi);if(e&&e.isConnected&&(e.contains(this.host)||n(this,xi)))return e;const t=Gn(this.host);return t?(d(this,wi,t),d(this,xi,!0),t):e&&e.isConnected&&n(this,xi)?e:(d(this,wi,null),d(this,xi,!1),null)}clearOnDisconnect(){if(n(this,cs))return;const e=n(this,wi);e&&e.notify("destroy",{el:this.host,kind:""}),d(this,wi,void 0),d(this,xi,!1)}requestOpen(e,t){const i=this.resolve();return i?i.requestOpen({el:this.host,kind:e,close:t}):!0}notify(e,t,i){const s=this.resolve();s&&s.notify(e,{el:this.host,kind:t,close:i})}}wi=new WeakMap,xi=new WeakMap,cs=new WeakMap;const $r=8,Zh=3;function jn(r,e,t){return Math.min(Math.max(r,e),t)}function Jh(r,e,t,i,s=!0){const[o,a="center"]=t.split("-"),l=s?Zh:0;let h=0,p=0;const f=E=>a==="left"||a==="top"?r.left:a==="right"||a==="bottom"?r.right-E:r.left+(r.width-E)/2,g=E=>a==="top"||a==="left"?r.top:a==="bottom"||a==="right"?r.bottom-E:r.top+(r.height-E)/2;switch(o){case"top":h=r.top-i-e.height,p=f(e.width);break;case"bottom":h=r.bottom+i,p=f(e.width);break;case"left":p=r.left-i-e.width+l,h=g(e.height);break;case"right":p=r.right+i-l,h=g(e.height);break;default:h=r.top-i-e.height,p=f(e.width)}const v=Math.max($r,window.innerWidth-e.width-$r),x=Math.max($r,window.innerHeight-e.height-$r);return{top:jn(h,$r,x),left:jn(p,$r,v)}}const Qh={top:"bottom",bottom:"top",left:"right",right:"left"};function eu(r,e){if(e)return r;const[t,i="center"]=r.split("-");return`${Qh[t]??t}-${i}`}const tu="M20 0C18.1432 0 16.4274 0.989822 15.4971 2.59668L11.7305 9.10059C10.9601 10.4309 9.0399 10.4309 8.26953 9.10059L4.50293 2.59668C3.57257 0.989822 1.85676 0 0 0L20 0Z",iu="M18 2.00365C17.9998 0.301588 16.009 -0.62238 14.709 0.47631L5.08692 8.6101C4.11019 9.43569 2.95671 10.008 1.72754 10.2927L18 10.2927V2.00365Z",ru="0 0 20 10.1",su="0 0 18 10.2927",ou=_`
  :host {
    display: inline-flex;
    max-width: 100%;
    vertical-align: middle;
    position: relative;
  }

  :host([block]) {
    display: flex;
    width: 100%;
  }

  .du-coachmark__reference {
    display: inline-flex;
    max-width: 100%;
    vertical-align: middle;
  }

  :host([block]) .du-coachmark__reference {
    display: flex;
    width: 100%;
  }

  .du-coachmark__popper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--du-layer-z-index, 1100);
    width: max-content;
    max-width: min(calc(100vw - 16px), 360px);
    pointer-events: auto;
    animation: du-coachmark-appear var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
  }

  .du-coachmark__popper[popover] {
    width: max-content;
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  .du-coachmark__popper--closing {
    pointer-events: none;
    animation: du-coachmark-exit var(--du-duration-normal, var(--du-duration, 0.3s)) ease
      forwards;
  }

  .du-coachmark__popper[data-sized='true'] {
    width: var(--du-coachmark-width);
    max-width: calc(100vw - 16px);
  }

  .du-coachmark__popper--hidden,
  .du-coachmark__popper[hidden] {
    display: none !important;
    pointer-events: none;
  }

  .du-coachmark {
    --du-coachmark-bg: var(--du-fill-p8);
    --du-coachmark-fg: var(--du-on-l-c2);
    --du-coachmark-fg-secondary: var(--du-on-l-c4);
    --du-coachmark-shadow: var(--du-shadow-l6);
    --du-coachmark-blur: var(--du-shadow-l6-backdrop-blur, 0px);
    --du-coachmark-radius: var(--du-radius-round-corner-m, 12px);
    --du-coachmark-body-padding: 12px;
    /* center 箭头：沿边缘 20px × 伸出 10.1px（Figma 242:90386） */
    --du-coachmark-arrow-center-edge: 20px;
    --du-coachmark-arrow-center-protrusion: 10.1px;
    /* offset 箭头：沿边缘 18px × 伸出 10.5px */
    --du-coachmark-arrow-offset-edge: 18px;
    --du-coachmark-arrow-offset-protrusion: 10.5px;
    --du-coachmark-arrow-offset: 10px;
    /* Figma 为 0.1/0.5px，浏览器常舍入为 0，改用可渲染的最小重叠 */
    --du-coachmark-arrow-overlap-center: 2px;
    --du-coachmark-arrow-overlap-corner: 2px;
    /* 左右方向 SVG 旋转后亚像素缝隙更明显，单独加大重叠 */
    --du-coachmark-arrow-overlap-horizontal-center: 3px;
    --du-coachmark-arrow-overlap-horizontal-corner: 3px;
    display: inline-flex;
    gap: 0;
    line-height: 0;
    max-width: 100%;
  }

  .du-coachmark[data-arrow-hidden] {
    --du-coachmark-arrow-overlap-center: 0px;
    --du-coachmark-arrow-overlap-corner: 0px;
    --du-coachmark-arrow-overlap-horizontal-center: 0px;
    --du-coachmark-arrow-overlap-horizontal-corner: 0px;
  }

  .du-coachmark[data-sized='true'] {
    width: var(--du-coachmark-width);
  }

  .du-coachmark__popper[data-sized='true'] > .du-coachmark[data-sized='true'] {
    width: 100%;
  }

  :host([placement^='top']) .du-coachmark[data-sized='true'] .du-coachmark__body,
  :host([placement^='bottom']) .du-coachmark[data-sized='true'] .du-coachmark__body {
    width: 100%;
  }

  :host([placement^='left']) .du-coachmark[data-sized='true'] .du-coachmark__body,
  :host([placement^='right']) .du-coachmark[data-sized='true'] .du-coachmark__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .du-coachmark[data-sized='true'] .du-coachmark__text,
  .du-coachmark[data-sized='true'] .du-coachmark__title,
  .du-coachmark[data-sized='true'] .du-coachmark__description {
    max-width: 100%;
  }

  .du-coachmark__body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: var(--du-coachmark-body-padding);
    color: var(--du-coachmark-fg);
    background: var(--du-coachmark-bg);
    border-radius: var(--du-coachmark-radius);
    box-shadow: var(--du-coachmark-shadow);
    backdrop-filter: blur(var(--du-coachmark-blur));
    -webkit-backdrop-filter: blur(var(--du-coachmark-blur));
    overflow: visible;
    position: relative;
    z-index: 0;
  }

  .du-coachmark__text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 250px;
  }

  .du-coachmark__title {
    margin: 0;
    max-width: 250px;
    font-size: var(--du-typo-headline-semibold-m-size, 16px);
    line-height: var(--du-typo-headline-semibold-m-line-height, 22px);
    font-weight: var(--du-typo-semibold-weight, 600);
    color: var(--du-coachmark-fg);
    word-break: break-word;
  }

  .du-coachmark__description {
    margin: 0;
    max-width: 250px;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    color: var(--du-coachmark-fg-secondary);
    word-break: break-word;
  }

  .du-coachmark__content {
    max-width: 100%;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    color: var(--du-coachmark-fg);
    word-break: break-word;
  }

  .du-coachmark__content--hidden {
    display: none !important;
  }

  .du-coachmark__footer--hidden {
    display: none !important;
  }

  .du-coachmark__footer:not(.du-coachmark__footer--hidden) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    min-height: 24px;
    margin-top: 16px;
  }

  .du-coachmark__arrow-wrap {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    line-height: 0;
    position: relative;
    z-index: 1;
  }

  .du-coachmark__arrow-wrap--center,
  .du-coachmark__arrow-wrap--offset {
    /* placement rules set dimensions */
  }

  .du-coachmark__arrow {
    flex-shrink: 0;
    display: block;
    overflow: visible;
  }

  .du-coachmark__arrow--center {
    width: var(--du-coachmark-arrow-center-edge);
    height: var(--du-coachmark-arrow-center-protrusion);
  }

  .du-coachmark__arrow--offset {
    width: var(--du-coachmark-arrow-offset-edge);
    height: var(--du-coachmark-arrow-offset-protrusion);
  }

  .du-coachmark__arrow path {
    fill: var(--du-coachmark-bg);
  }

  /* tone */
  :host([tone='dark']) .du-coachmark {
    --du-coachmark-bg: #414141;
    --du-coachmark-fg: rgba(255, 255, 255, 0.9);
    --du-coachmark-fg-secondary: rgba(255, 255, 255, 0.54);
  }

  /* inline：Figma 语义 — placement 表示箭头在气泡哪条边 */
  :host([inline][placement^='top']) .du-coachmark {
    flex-direction: column;
    align-items: flex-start;
  }

  :host([inline][placement='top-center']) .du-coachmark {
    align-items: center;
  }

  :host([inline][placement='top-right']) .du-coachmark {
    align-items: flex-end;
  }

  :host([inline][placement^='bottom']) .du-coachmark {
    flex-direction: column;
    align-items: flex-start;
  }

  :host([inline][placement='bottom-center']) .du-coachmark {
    align-items: center;
  }

  :host([inline][placement='bottom-right']) .du-coachmark {
    align-items: flex-end;
  }

  :host([inline][placement^='left']) .du-coachmark {
    flex-direction: row;
    align-items: flex-start;
  }

  :host([inline][placement='left-center']) .du-coachmark {
    align-items: center;
  }

  :host([inline][placement='left-bottom']) .du-coachmark {
    align-items: flex-end;
  }

  :host([inline][placement^='right']) .du-coachmark {
    flex-direction: row;
    align-items: flex-start;
  }

  :host([inline][placement='right-center']) .du-coachmark {
    align-items: center;
  }

  :host([inline][placement='right-bottom']) .du-coachmark {
    align-items: flex-end;
  }

  :host([inline][placement^='top']) .du-coachmark__arrow-wrap {
    order: -1;
    align-self: stretch;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    height: var(--du-coachmark-arrow-offset-protrusion);
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host([inline][placement='top-center']) .du-coachmark__arrow-wrap {
    height: var(--du-coachmark-arrow-center-protrusion);
    justify-content: center;
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host([inline][placement='top-left']) .du-coachmark__arrow-wrap {
    padding-inline-start: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement='top-right']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-inline-end: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement^='bottom']) .du-coachmark__arrow-wrap {
    order: 1;
    align-self: stretch;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    height: var(--du-coachmark-arrow-offset-protrusion);
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host([inline][placement='bottom-center']) .du-coachmark__arrow-wrap {
    height: var(--du-coachmark-arrow-center-protrusion);
    justify-content: center;
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host([inline][placement='bottom-left']) .du-coachmark__arrow-wrap {
    padding-inline-start: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement='bottom-right']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-inline-end: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement^='left']) .du-coachmark__arrow-wrap {
    order: -1;
    align-self: stretch;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: var(--du-coachmark-arrow-offset-protrusion);
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host([inline][placement='left-center']) .du-coachmark__arrow-wrap {
    width: var(--du-coachmark-arrow-center-protrusion);
    min-height: var(--du-coachmark-arrow-center-edge);
    align-self: center;
    justify-content: center;
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host([inline][placement='left-top']) .du-coachmark__arrow-wrap {
    padding-block-start: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement='left-bottom']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-block-end: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement^='right']) .du-coachmark__arrow-wrap {
    order: 1;
    align-self: stretch;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    width: var(--du-coachmark-arrow-offset-protrusion);
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host([inline][placement='right-center']) .du-coachmark__arrow-wrap {
    width: var(--du-coachmark-arrow-center-protrusion);
    min-height: var(--du-coachmark-arrow-center-edge);
    align-self: center;
    justify-content: center;
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host([inline][placement='right-top']) .du-coachmark__arrow-wrap {
    padding-block-start: var(--du-coachmark-arrow-offset);
  }

  :host([inline][placement='right-bottom']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-block-end: var(--du-coachmark-arrow-offset);
  }

  /* 箭头 SVG 旋转 — 按 Figma Direction（data-arrow-placement） */
  .du-coachmark[data-arrow-placement='top-left'] .du-coachmark__arrow {
    transform: scaleY(-1) rotate(180deg);
  }

  .du-coachmark[data-arrow-placement='top-center'] .du-coachmark__arrow {
    transform: scaleY(-1);
  }

  .du-coachmark[data-arrow-placement='top-right'] .du-coachmark__arrow {
    transform: none;
  }

  .du-coachmark[data-arrow-placement='bottom-left'] .du-coachmark__arrow {
    transform: rotate(180deg);
  }

  .du-coachmark[data-arrow-placement='bottom-center'] .du-coachmark__arrow {
    transform: none;
  }

  .du-coachmark[data-arrow-placement='bottom-right'] .du-coachmark__arrow {
    transform: scaleY(-1);
  }

  .du-coachmark[data-arrow-placement='left-top'] .du-coachmark__arrow {
    transform: rotate(-90deg);
  }

  .du-coachmark[data-arrow-placement='left-center'] .du-coachmark__arrow {
    transform: rotate(-90deg) scaleY(-1);
  }

  .du-coachmark[data-arrow-placement='left-bottom'] .du-coachmark__arrow {
    transform: rotate(90deg) scaleY(-1);
  }

  .du-coachmark[data-arrow-placement='right-top'] .du-coachmark__arrow {
    transform: rotate(-90deg) scaleY(-1);
  }

  .du-coachmark[data-arrow-placement='right-center'] .du-coachmark__arrow {
    transform: rotate(-90deg);
  }

  .du-coachmark[data-arrow-placement='right-bottom'] .du-coachmark__arrow {
    transform: rotate(90deg);
  }

  /*
   * Popover/Tooltip：Element 语义 — placement 为气泡相对 trigger 的方位；
   * 箭头在贴 trigger 一侧，transform 取 Figma 对侧 variant。
   */
  :host(:not([inline])[placement^='top']) .du-coachmark {
    flex-direction: column;
    align-items: flex-start;
  }

  :host(:not([inline])[placement='top-center']) .du-coachmark {
    align-items: center;
  }

  :host(:not([inline])[placement='top-right']) .du-coachmark {
    align-items: flex-end;
  }

  :host(:not([inline])[placement^='bottom']) .du-coachmark {
    flex-direction: column;
    align-items: flex-start;
  }

  :host(:not([inline])[placement='bottom-center']) .du-coachmark {
    align-items: center;
  }

  :host(:not([inline])[placement='bottom-right']) .du-coachmark {
    align-items: flex-end;
  }

  :host(:not([inline])[placement^='left']) .du-coachmark {
    flex-direction: row;
    align-items: stretch;
  }

  :host(:not([inline])[placement^='right']) .du-coachmark {
    flex-direction: row;
    align-items: stretch;
  }

  :host(:not([inline])[placement^='top']) .du-coachmark__arrow-wrap {
    order: 1;
    align-self: stretch;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    height: var(--du-coachmark-arrow-offset-protrusion);
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host(:not([inline])[placement='top-center']) .du-coachmark__arrow-wrap {
    height: var(--du-coachmark-arrow-center-protrusion);
    justify-content: center;
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host(:not([inline])[placement='top-left']) .du-coachmark__arrow-wrap {
    padding-inline-start: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement='top-right']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-inline-end: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement^='bottom']) .du-coachmark__arrow-wrap {
    order: -1;
    align-self: stretch;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    height: var(--du-coachmark-arrow-offset-protrusion);
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host(:not([inline])[placement='bottom-center']) .du-coachmark__arrow-wrap {
    height: var(--du-coachmark-arrow-center-protrusion);
    justify-content: center;
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host(:not([inline])[placement='bottom-left']) .du-coachmark__arrow-wrap {
    padding-inline-start: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement='bottom-right']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-inline-end: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement^='left']) .du-coachmark__arrow-wrap {
    order: 1;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: var(--du-coachmark-arrow-offset-protrusion);
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host(:not([inline])[placement='left-center']) .du-coachmark__arrow-wrap {
    width: var(--du-coachmark-arrow-center-protrusion);
    min-height: var(--du-coachmark-arrow-center-edge);
    align-self: center;
    justify-content: center;
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host(:not([inline])[placement='left-top']) .du-coachmark__arrow-wrap {
    padding-block-start: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement='left-bottom']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-block-end: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement^='right']) .du-coachmark__arrow-wrap {
    order: -1;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    width: var(--du-coachmark-arrow-offset-protrusion);
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host(:not([inline])[placement='right-center']) .du-coachmark__arrow-wrap {
    width: var(--du-coachmark-arrow-center-protrusion);
    min-height: var(--du-coachmark-arrow-center-edge);
    align-self: center;
    justify-content: center;
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host(:not([inline])[placement='right-top']) .du-coachmark__arrow-wrap {
    padding-block-start: var(--du-coachmark-arrow-offset);
  }

  :host(:not([inline])[placement='right-bottom']) .du-coachmark__arrow-wrap {
    justify-content: flex-end;
    padding-block-end: var(--du-coachmark-arrow-offset);
  }

  /* 箭头 ↔ body 接缝：双侧负 margin，12 方位统一消除缝隙 */
  :host([inline][placement^='top']) .du-coachmark__body,
  :host(:not([inline])[placement^='bottom']) .du-coachmark__body {
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host([inline][placement='top-center']) .du-coachmark__body,
  :host(:not([inline])[placement='bottom-center']) .du-coachmark__body {
    margin-top: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host([inline][placement^='bottom']) .du-coachmark__body,
  :host(:not([inline])[placement^='top']) .du-coachmark__body {
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-corner));
  }

  :host([inline][placement='bottom-center']) .du-coachmark__body,
  :host(:not([inline])[placement='top-center']) .du-coachmark__body {
    margin-bottom: calc(-1 * var(--du-coachmark-arrow-overlap-center));
  }

  :host([inline][placement^='left']) .du-coachmark__body,
  :host(:not([inline])[placement^='right']) .du-coachmark__body {
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host([inline][placement='left-center']) .du-coachmark__body,
  :host(:not([inline])[placement='right-center']) .du-coachmark__body {
    margin-left: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host([inline][placement^='right']) .du-coachmark__body,
  :host(:not([inline])[placement^='left']) .du-coachmark__body {
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-corner));
  }

  :host([inline][placement='right-center']) .du-coachmark__body,
  :host(:not([inline])[placement='left-center']) .du-coachmark__body {
    margin-right: calc(-1 * var(--du-coachmark-arrow-overlap-horizontal-center));
  }

  :host([padding='large']) .du-coachmark__body {
    --du-coachmark-body-padding: 24px;
  }

  @keyframes du-coachmark-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes du-coachmark-exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;var au=Object.defineProperty,R=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&au(e,t,s),s};const Yn=new CSSStyleSheet;Yn.replaceSync(`
  :host {
    display: block !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 0 !important;
    height: 0 !important;
    max-width: none !important;
    overflow: visible !important;
    pointer-events: none !important;
    vertical-align: initial !important;
  }

  .du-coachmark__popper {
    pointer-events: auto;
  }
`);const nu=["top-left","top-center","top-right","bottom-left","bottom-center","bottom-right","left-top","left-center","left-bottom","right-top","right-center","right-bottom"],lu=["light","dark"],du=["default","large"],hu=["hover","click","focus","manual"],ea=class ea extends hi{constructor(){super(...arguments);w(this,de);w(this,Et);w(this,_i);w(this,ki);w(this,Ci);w(this,Tt);w(this,Si);w(this,zr);w(this,or);w(this,ft);w(this,Ve);w(this,Pt);w(this,At);w(this,Wt);w(this,jt);this.placement="bottom-center",this.tone="light",this.padding="default",this.trigger="hover",this.trackReference=!1,this.open=!1,this.disabled=!1,this.inline=!1,this.block=!1,this.hideArrow=!1,this.offset=8,this.width="",this.content="",this.description="",this.parent="body",this.showDelay=0,this.hideDelay=120,this.passive=!1,this.hasReference=!1,this.hasDefaultTrigger=!1,this.hasCustomContent=!1,this.hasFooter=!1,this.openDelayTimer=0,this.closeDelayTimer=0,d(this,de,!1),d(this,Et,0),d(this,_i,!1),d(this,ki,!1),d(this,Ci,[]),d(this,Tt,0),d(this,Si,!1),d(this,or,!1),d(this,ft,0),d(this,Ve,!1),d(this,Pt,!1),d(this,Wt,[]),d(this,jt,ts(this,ui.coachmark,()=>this.zIndex,t=>{var s;this.style.setProperty("--du-layer-z-index",String(t)),(s=this.portalHost)==null||s.style.setProperty("--du-layer-z-index",String(t));const i=this.getPopperEl();i&&(i.style.zIndex=String(t))},{defaultRenderAt:"normal",readRenderAt:()=>this.renderAt,onRenderAtChange:()=>this.syncTopLayer()})),this.onReferenceMouseEnter=()=>{this.trigger!=="hover"||this.isInteractiveDisabled||this.scheduleShow()},this.onReferenceMouseLeave=()=>{this.trigger==="hover"&&this.scheduleHide()},this.onPopperMouseEnter=()=>{this.trigger==="hover"&&this.clearTimers()},this.onPopperMouseLeave=()=>{this.trigger==="hover"&&this.scheduleHide()},this.onReferenceClick=t=>{this.trigger!=="click"||this.isInteractiveDisabled||this.clickBelongsToNestedOverlay(t)||(t.stopPropagation(),this.clearTimers(),this.cancelClosing(),this.toggle())},this.onReferenceFocus=()=>{this.trigger!=="focus"||this.isInteractiveDisabled||(this.clearTimers(),this.cancelClosing(),this.setOpen(!0))},this.onReferenceBlur=()=>{this.trigger==="focus"&&(this.clearTimers(),this.setOpen(!1))},this.onDocumentPointerDown=t=>{if(this.trigger!=="click"||!this.open)return;const i=t.composedPath(),s=this.getPopperEl();i.includes(this)||this.portalHost&&i.includes(this.portalHost)||s&&i.includes(s)||this.pathHitsNestedMenuOverlay(i)||this.setOpen(!1)},this.onDocumentKeydown=t=>{t.key==="Escape"&&this.open&&this.setOpen(!1)},this.onReposition=()=>{this.scheduleMeasurePass()},this.onTrackingVisibility=()=>{this.cancelMeasurePass(),document.hidden||this.scheduleMeasurePass()},this.onPopperAnimationEnd=t=>{t.target!==t.currentTarget||t.currentTarget!==this.getPopperEl()||this.open||t.animationName.includes("du-coachmark-exit")&&this.finishClosing()}}get resolvedTitle(){return this.resolveComponentTitle(this.coachmarkTitle)}get effectiveZIndex(){return n(this,jt).effectiveZIndex}get effectiveRenderAt(){return n(this,jt).effectiveRenderAt}connectedCallback(){super.connectedCallback(),n(this,jt).connect(),this.syncPopperState()}disconnectedCallback(){this.clearTimers(),this.clearClosingFallback(),d(this,de,!1),this.stopPopper(),K(this).clearOnDisconnect(),n(this,jt).clearOnDisconnect(),super.disconnectedCallback()}get isPortalEnabled(){return this.isInteractiveMode&&!!this.parent.trim()}getPopperEl(){return n(this,Pt)&&this.portalRoot?this.portalRoot.querySelector(".du-coachmark__popper"):this.renderRoot.querySelector(".du-coachmark__popper")}get isInteractiveDisabled(){return this.isOwnDisabled}get hasBubbleSource(){return!!(this.content.trim()||this.resolvedTitle.trim()||this.description.trim())}lightDomHasReferenceSlot(){return Array.from(this.children).some(t=>t instanceof HTMLElement&&(t.slot==="reference"||t.slot==="trigger"))}lightDomHasDefaultTrigger(){return Array.from(this.children).some(t=>t.nodeType===Node.ELEMENT_NODE&&(!t.hasAttribute("slot")||t.getAttribute("slot")===""))}get isTooltipMode(){return this.inline?!1:!this.hasReference&&!this.lightDomHasReferenceSlot()&&this.hasBubbleSource&&(this.hasDefaultTrigger||this.lightDomHasDefaultTrigger())}get isPopoverMode(){return this.inline?!1:this.hasReference||this.lightDomHasReferenceSlot()}get isInteractiveMode(){return this.isTooltipMode||this.isPopoverMode}get isInlineMode(){return this.inline?!0:!this.isInteractiveMode}get arrowPlacement(){return eu(this.placement,this.inline)}get hasStructuredText(){return!!(this.resolvedTitle.trim()||this.description.trim())}get resolvedWidth(){return kr(this.width)}get widthStyle(){const t=this.resolvedWidth;return t?{"--du-coachmark-width":t}:{}}get isPopperVisible(){return this.isConnected&&!n(this,Ve)&&(this.open||n(this,de))}resolveDelay(t){return Number.isFinite(t)&&t>0?t:0}clearShowTimer(){this.openDelayTimer&&(window.clearTimeout(this.openDelayTimer),this.openDelayTimer=0)}clearHideTimer(){this.closeDelayTimer&&(window.clearTimeout(this.closeDelayTimer),this.closeDelayTimer=0)}clearTimers(){this.clearShowTimer(),this.clearHideTimer()}clearClosingFallback(){n(this,Et)&&(window.clearTimeout(n(this,Et)),d(this,Et,0))}armClosingFallback(){this.clearClosingFallback();const t=window.setTimeout(()=>{n(this,Et)===t&&(d(this,Et,0),n(this,de)&&!this.open&&this.finishClosing())},500);d(this,Et,t)}finishClosing(){this.clearClosingFallback(),n(this,de)&&(d(this,de,!1),this.syncPopperState(),this.requestUpdate())}cancelClosing(){n(this,de)&&(this.clearClosingFallback(),d(this,de,!1))}slotHasMeaningfulNodes(t){return t?t.assignedNodes({flatten:!0}).some(i=>{var s;return i.nodeType===Node.TEXT_NODE?!!((s=i.textContent)!=null&&s.trim()):i.nodeType===Node.ELEMENT_NODE}):!1}syncReferenceSlot(){const t=this.renderRoot.querySelector('slot[name="reference"]'),i=this.renderRoot.querySelector('slot[name="trigger"]');this.hasReference=this.slotHasMeaningfulNodes(t)||this.slotHasMeaningfulNodes(i)}syncDefaultSlot(){if(n(this,Pt))return;const t=this.renderRoot.querySelector("slot:not([name])");if(!t){this.hasDefaultTrigger=!1,this.hasCustomContent=!1;return}const i=t.assignedNodes({flatten:!0});this.hasDefaultTrigger=i.some(s=>s.nodeType===Node.ELEMENT_NODE),this.hasCustomContent=i.some(s=>{var o;return s.nodeType===Node.TEXT_NODE?!!((o=s.textContent)!=null&&o.trim()):s.nodeType===Node.ELEMENT_NODE})}syncFooterSlot(){if(n(this,Pt))return;const t=this.renderRoot.querySelector('slot[name="footer"]');if(!t){this.hasFooter=!1;return}this.hasFooter=t.assignedNodes({flatten:!0}).length>0}firstUpdated(){this.syncReferenceSlot(),this.syncDefaultSlot(),this.syncFooterSlot(),this.syncPopperState()}willUpdate(t){if(t.has("open")&&!this.isInlineMode){const i=!!t.get("open");this.open?(d(this,Ve,!1),this.clearClosingFallback(),d(this,de,!1)):i&&!n(this,Ve)&&(d(this,de,!0),this.armClosingFallback())}}updated(t){(t.has("zIndex")||t.has("renderAt"))&&n(this,jt).sync(),(t.has("open")||t.has("trackReference")||t.has("inline")||t.has("content")||t.has("coachmarkTitle")||t.has("title")||t.has("description")||t.has("hasReference")||t.has("hasDefaultTrigger")||t.has("placement")||t.has("hideArrow")||t.has("offset")||t.has("width")||t.has("parent")||t.has("zIndex")||t.has("renderAt")||t.has("tone")||t.has("padding"))&&this.syncPopperState(),t.has("open")&&!this.isInlineMode&&this.emitOpenChange()}emitOpenChange(t=this.open){this.emit("open-change",{open:t}),this.emit("update:open",t)}setOpen(t){if(this.isInteractiveDisabled||this.isInlineMode)return;if(this.clearTimers(),t&&(!this.isConnected||this.hasUpdated&&!this.getReferenceRect())){this.invalidateReference();return}if(this.open===t&&!(t&&n(this,Ve)))return;const i=K(this),s=()=>this.hide();t&&!i.requestOpen("coachmark",s)||(t&&n(this,Ve)&&(d(this,Ve,!1),this.requestUpdate(),this.syncPopperState()),this.passive?this.emitOpenChange(t):this.open=t,t?(i.notify("open","coachmark",s),i.notify("appear","coachmark",s)):i.notify("close","coachmark"))}show(){this.setOpen(!0)}hide(){this.setOpen(!1)}toggle(){this.setOpen(!this.open)}scheduleShow(){if(this.clearHideTimer(),n(this,de)){this.cancelClosing(),this.setOpen(!0);return}if(this.open&&!n(this,Ve)||this.openDelayTimer)return;const t=this.resolveDelay(this.showDelay);if(t===0){this.setOpen(!0);return}const i=window.setTimeout(()=>{this.openDelayTimer===i&&(this.openDelayTimer=0,this.setOpen(!0))},t);this.openDelayTimer=i}scheduleHide(){if(this.clearShowTimer(),!this.open||this.closeDelayTimer)return;const t=this.resolveDelay(this.hideDelay);if(t===0){this.setOpen(!1);return}const i=window.setTimeout(()=>{this.closeDelayTimer===i&&(this.closeDelayTimer=0,this.setOpen(!1))},t);this.closeDelayTimer=i}onReferenceSlotChange(){const t=this.hasReference;this.syncReferenceSlot(),t&&!this.hasReference&&(this.open||n(this,de))&&this.invalidateReference(),this.syncPopperState()}onDefaultSlotChange(){const t=this.isTooltipMode;this.syncDefaultSlot(),t&&!this.hasDefaultTrigger&&(this.open||n(this,de))&&this.invalidateReference(),this.syncPopperState()}onFooterSlotChange(){this.syncFooterSlot()}clickBelongsToNestedOverlay(t){const i=t.composedPath();for(const s of i)if(s instanceof HTMLElement){if(s===this)break;if(s.localName==="du-menu"||s.localName==="du-select"||s.localName==="du-text-selector")return!0}for(const s of i)if(!(!(s instanceof HTMLElement)||s===this)&&(s.localName==="du-menu"||s.localName==="du-select"||s.localName==="du-text-selector")&&s.contains(this))return!0;return!1}pathHitsNestedMenuOverlay(t){for(const i of t)if(i instanceof HTMLElement&&(i.localName==="du-menu"||i.localName==="du-select"||i.localName==="du-text-selector")&&this.contains(i))return!0;return!1}bindDocumentDismiss(){n(this,_i)||(d(this,_i,!0),document.addEventListener("pointerdown",this.onDocumentPointerDown,!0),document.addEventListener("keydown",this.onDocumentKeydown))}unbindDocumentDismiss(){n(this,_i)&&(d(this,_i,!1),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!0),document.removeEventListener("keydown",this.onDocumentKeydown))}bindReposition(){if(!n(this,ki)){d(this,ki,!0),window.addEventListener("resize",this.onReposition,{passive:!0}),d(this,Ci,uu(this.referenceEl??this));for(const t of n(this,Ci))t.addEventListener("scroll",this.onReposition,{passive:!0})}}unbindReposition(){if(n(this,ki)){d(this,ki,!1),window.removeEventListener("resize",this.onReposition);for(const t of n(this,Ci))t.removeEventListener("scroll",this.onReposition);d(this,Ci,[])}}syncPopperState(){const t=++Ga(this,ft)._;if(this.cancelMeasurePass(),!this.isConnected||this.isInlineMode||!this.isPopperVisible){this.stopPopper();return}this.bindDocumentDismiss(),this.bindReposition(),this.syncTrackingVisibility(),this.updateComplete.then(()=>{if(!(t!==n(this,ft)||!this.isPopperVisible||this.isInlineMode)){if(!this.getReferenceRect()){this.invalidateReference();return}this.syncPortal(),this.syncTopLayer(),this.updatePopperPosition(),this.scheduleMeasurePass(),this.watchPopperResize()}})}syncTrackingVisibility(){const t=this.trackReference&&this.isPopperVisible&&!this.isInlineMode;t!==n(this,or)&&(d(this,or,t),t?document.addEventListener("visibilitychange",this.onTrackingVisibility):document.removeEventListener("visibilitychange",this.onTrackingVisibility))}cancelMeasurePass(){d(this,Si,!1),n(this,Tt)&&(cancelAnimationFrame(n(this,Tt)),d(this,Tt,0))}stopPopper(){var t;++Ga(this,ft)._,this.cancelMeasurePass(),this.unbindDocumentDismiss(),this.unbindReposition(),document.removeEventListener("visibilitychange",this.onTrackingVisibility),d(this,or,!1),d(this,zr,void 0),(t=this.resizeObserver)==null||t.disconnect(),this.resizeObserver=void 0,this.teardownPortal()}getReferenceRect(){const t=this.referenceEl;if(!this.isConnected||!(t!=null&&t.isConnected)||!t.getClientRects().length)return;const i=t.getBoundingClientRect();if(i.width>0&&i.height>0&&[i.x,i.y,i.width,i.height].every(Number.isFinite))return i}invalidateReference(){this.clearTimers(),this.clearClosingFallback(),d(this,de,!1);const t=!n(this,Ve)&&this.open;d(this,Ve,!0);const i=this.getPopperEl();i&&(i.hidden=!0),this.stopPopper(),K(this).notify("close","coachmark"),t&&(this.passive?this.emitOpenChange(!1):this.open=!1),this.requestUpdate()}syncPortal(){if(!this.isPopperVisible||!this.isPortalEnabled){this.teardownPortal();return}this.ensurePortalHost(),this.syncPortalHostAttributes(),this.moveSlottedNodesToPortal(),d(this,Pt,!0),this.detachPortal=Un(this.portalHost,this.parent,this.detachPortal),oo(this.renderPopper(this.isPopoverMode),this.portalRoot,{host:this})}syncTopLayer(){const t=this.isPopperVisible?this.getPopperEl():null;if(!t||this.effectiveRenderAt!=="top-level"){this.teardownTopLayer(),t&&this.isPopperVisible&&this.updatePopperPosition();return}n(this,At)&&n(this,At)!==t&&Bi(n(this,At)),d(this,At,t),Cr(t),this.updatePopperPosition()}teardownTopLayer(){n(this,At)&&(Bi(n(this,At)),d(this,At,void 0))}ensurePortalHost(){if(this.portalHost&&this.portalRoot)return;const t=document.createElement("div");t.className="du-coachmark-portal",t.setAttribute("data-du-coachmark-portal","");const i=t.attachShadow({mode:"open"}),s=this.renderRoot.adoptedStyleSheets??[];i.adoptedStyleSheets=[...s,Yn],this.portalHost=t,this.portalRoot=i}syncPortalHostAttributes(){this.portalHost&&(this.portalHost.setAttribute("placement",this.placement),this.portalHost.setAttribute("tone",this.tone),this.portalHost.setAttribute("padding",this.padding),this.releasePortalTheme??(this.releasePortalTheme=Sr(this,this.portalHost)),this.portalHost.style.setProperty("--du-layer-z-index",String(this.effectiveZIndex)))}moveSlottedNodesToPortal(){if(!this.portalHost||n(this,Wt).length>0||!this.isPopoverMode)return;const t=Array.from(this.childNodes).filter(i=>{var o;if(i.nodeType===Node.TEXT_NODE)return!!((o=i.textContent)!=null&&o.trim());if(i.nodeType!==Node.ELEMENT_NODE)return!1;const s=i.getAttribute("slot");return!s||s===""||s==="footer"});for(const i of t)n(this,Wt).push(i),this.portalHost.appendChild(i)}restorePortaledNodes(){if(n(this,Wt).length){for(const t of n(this,Wt))this.appendChild(t);d(this,Wt,[])}}teardownPortal(){var i,s,o;const t=n(this,Pt);d(this,Pt,!1),this.teardownTopLayer(),this.portalRoot&&oo(b,this.portalRoot,{host:this}),(i=this.detachPortal)==null||i.call(this),this.detachPortal=void 0,(s=this.releasePortalTheme)==null||s.call(this),this.releasePortalTheme=void 0,this.restorePortaledNodes(),(o=this.portalHost)!=null&&o.isConnected&&this.portalHost.remove(),this.portalHost=void 0,this.portalRoot=void 0,t&&(this.syncDefaultSlot(),this.syncFooterSlot())}watchPopperResize(){var o;(o=this.resizeObserver)==null||o.disconnect();const t=this.getPopperEl();if(!t||!this.isPopperVisible)return;const i=[t,this.referenceEl].filter(Boolean),s=n(this,ft);this.resizeObserver=Os(i,()=>{s!==n(this,ft)||!this.isPopperVisible||(this.getReferenceRect()?this.scheduleMeasurePass():this.invalidateReference())})}updatePopperPosition(t){const i=this.getPopperEl();if(!i||!this.referenceEl||this.isInlineMode||!this.isPopperVisible)return;const s=t??this.getReferenceRect();if(!s){this.invalidateReference();return}d(this,zr,s);const o=i.getBoundingClientRect(),{top:a,left:l}=Jh(s,o,this.placement,this.offset,!this.hideArrow);i.style.position="fixed",i.style.margin="0",i.style.inset="auto",i.style.top=`${Math.round(a)}px`,i.style.left=`${Math.round(l)}px`,i.style.right="auto",i.style.bottom="auto",i.style.zIndex=String(this.effectiveZIndex)}scheduleMeasurePass(t=!0){if(!this.isPopperVisible||this.isInlineMode||this.trackReference&&document.hidden||(n(this,Si)||d(this,Si,t),n(this,Tt)))return;const i=n(this,ft);d(this,Tt,requestAnimationFrame(()=>{if(i!==n(this,ft)||(d(this,Tt,0),!this.isPopperVisible||this.isInlineMode||this.trackReference&&document.hidden))return;const s=n(this,Si);d(this,Si,!1);const o=this.getReferenceRect();if(!o){this.invalidateReference();return}const a=n(this,zr);(s||!a||o.x!==a.x||o.y!==a.y||o.width!==a.width||o.height!==a.height)&&this.updatePopperPosition(o),this.trackReference&&this.scheduleMeasurePass(!1)}))}renderStructuredText(){return this.hasStructuredText?u`
      <div class="du-coachmark__text">
        ${this.resolvedTitle.trim()?u`<p class="du-coachmark__title" part="title">${this.resolvedTitle}</p>`:b}
        ${this.description.trim()?u`<p class="du-coachmark__description" part="description">${this.description}</p>`:b}
      </div>
    `:b}renderPlainContent(){return this.content.trim()?u`<div class="du-coachmark__content" part="content">${this.content}</div>`:b}get isCenterArrowPlacement(){return this.arrowPlacement.endsWith("-center")}renderArrow(){if(this.hideArrow)return b;const t=this.isCenterArrowPlacement;return u`
      <div
        class="du-coachmark__arrow-wrap ${t?"du-coachmark__arrow-wrap--center":"du-coachmark__arrow-wrap--offset"}"
      >
        <svg
          class="du-coachmark__arrow ${t?"du-coachmark__arrow--center":"du-coachmark__arrow--offset"}"
          part="arrow"
          viewBox=${t?ru:su}
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="var(--du-coachmark-bg)"
            d=${t?tu:iu}
          ></path>
        </svg>
      </div>
    `}renderBubble(t={}){const i=t.includeDefaultSlot??!0,s=this.hasStructuredText&&!(i&&this.hasCustomContent)&&!this.content.trim(),o=!!this.resolvedWidth;return u`
      <div
        class="du-coachmark"
        part="coachmark"
        data-arrow-placement=${this.arrowPlacement}
        data-arrow-hidden=${this.hideArrow?"":b}
        data-sized=${o?"true":"false"}
        style=${ne(this.widthStyle)}
      >
        <div class="du-coachmark__body" part="body">
          ${s?this.renderStructuredText():b}
          ${this.content.trim()&&!i?this.renderPlainContent():b}
          ${i?u`
                <div
                  class="du-coachmark__content ${s?"du-coachmark__content--hidden":""}"
                  part="content"
                >
                  <slot @slotchange=${this.onDefaultSlotChange}></slot>
                </div>
              `:b}
          <div
            class="du-coachmark__footer ${this.hasFooter?"":"du-coachmark__footer--hidden"}"
            part="footer"
          >
            <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
          </div>
        </div>
        ${this.renderArrow()}
      </div>
    `}renderReference(t=!1){return u`
      <div
        class="du-coachmark__reference"
        part="reference"
        @mouseenter=${this.onReferenceMouseEnter}
        @mouseleave=${this.onReferenceMouseLeave}
        @click=${this.onReferenceClick}
        @focusin=${this.onReferenceFocus}
        @focusout=${this.onReferenceBlur}
      >
        ${t?u`<slot @slotchange=${this.onDefaultSlotChange}></slot>`:u`
              <slot name="reference" @slotchange=${this.onReferenceSlotChange}></slot>
              <slot name="trigger" @slotchange=${this.onReferenceSlotChange}></slot>
            `}
      </div>
    `}renderPopper(t=!0){const i=!this.isPopperVisible,s=!!this.resolvedWidth;return u`
      <div
        class="du-coachmark__popper ${i?"du-coachmark__popper--hidden":""} ${n(this,de)?"du-coachmark__popper--closing":""}"
        part="popper"
        role="tooltip"
        data-sized=${s?"true":"false"}
        style=${ne(this.widthStyle)}
        ?hidden=${i}
        @mouseenter=${this.onPopperMouseEnter}
        @mouseleave=${this.onPopperMouseLeave}
        @animationend=${this.onPopperAnimationEnd}
      >
        ${this.renderBubble({includeDefaultSlot:t})}
      </div>
    `}render(){if(this.isInlineMode)return this.renderBubble();const t=!this.isPortalEnabled;return this.isTooltipMode?u`
        ${this.renderReference(!0)} ${t?this.renderPopper(!1):b}
      `:u`
      ${this.renderReference(!1)} ${t?this.renderPopper(!0):b}
    `}};de=new WeakMap,Et=new WeakMap,_i=new WeakMap,ki=new WeakMap,Ci=new WeakMap,Tt=new WeakMap,Si=new WeakMap,zr=new WeakMap,or=new WeakMap,ft=new WeakMap,Ve=new WeakMap,Pt=new WeakMap,At=new WeakMap,Wt=new WeakMap,jt=new WeakMap,ea.styles=ou;let I=ea;R([$(nu,"bottom-center")],I.prototype,"placement"),R([$(lu,"light")],I.prototype,"tone"),R([$(du,"default")],I.prototype,"padding"),R([$(hu,"hover")],I.prototype,"trigger"),R([m()],I.prototype,"trackReference"),R([m()],I.prototype,"open"),R([m()],I.prototype,"disabled"),R([m()],I.prototype,"inline"),R([m()],I.prototype,"block"),R([m()],I.prototype,"hideArrow"),R([T(8)],I.prototype,"offset"),R([y()],I.prototype,"width"),R([y()],I.prototype,"content"),R([st({attribute:"coachmark-title"})],I.prototype,"coachmarkTitle"),R([y()],I.prototype,"description"),R([y("body")],I.prototype,"parent"),R([yt({attribute:"z-index",integer:!0})],I.prototype,"zIndex"),R([zt(Lt,{attribute:"render-at"})],I.prototype,"renderAt"),R([T(0,{attribute:"show-delay"})],I.prototype,"showDelay"),R([T(120,{attribute:"hide-delay"})],I.prototype,"hideDelay"),R([m()],I.prototype,"passive"),R([S()],I.prototype,"hasReference"),R([S()],I.prototype,"hasDefaultTrigger"),R([S()],I.prototype,"hasCustomContent"),R([S()],I.prototype,"hasFooter"),R([q(".du-coachmark__reference")],I.prototype,"referenceEl");function uu(r){const e=[];let t=r;for(;t=cu(t);){if(!(t instanceof Element)||t===document.body||t===document.documentElement)continue;const i=getComputedStyle(t);(qn(i.overflowX)||qn(i.overflowY))&&e.push(t)}return e.push(window),e}function cu(r){return r instanceof Element&&r.assignedSlot?r.assignedSlot:r.parentNode instanceof ShadowRoot?r.parentNode.host:r.parentNode}function qn(r){return r==="auto"||r==="scroll"||r==="overlay"||r==="hidden"}_`var(--du-disabled-opacity, 0.3)`;const Ui=_`
  ${z(X("disabled"))} {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
    pointer-events: none;
  }

  ${z(X("disabled"))} ::slotted(*) {
    --du-disabled-opacity: 1;
    pointer-events: none;
  }
`,pu=[Ui,_`
  :host {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    /* inline-flex 行盒 strut 会把宿主撑得略高于内容 */
    line-height: 0;
    gap: var(--du-layout-gap, var(--du-gap-4));
    vertical-align: middle;
  }

  .du-layout__start,
  .du-layout__end {
    /* 已是 flex item，用 flex 即可；改 flex 不能消宿主行高，见 :host line-height */
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    align-self: center;
    max-width: 100%;
    line-height: normal;
  }

  .du-layout__start[hidden],
  .du-layout__end[hidden] {
    display: none;
  }

  .du-layout__main {
    box-sizing: border-box;
    display: block;
    flex: 1 1 auto;
    align-self: center;
    min-width: 0;
    max-width: 100%;
    line-height: normal;
  }

  .du-layout__main-hint {
    display: flex;
    flex: 1 1 auto;
    align-self: center;
    min-width: 0;
    max-width: 100%;
    line-height: normal;
  }

  .du-layout__main-hint::part(reference) {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .du-layout__main-hint .du-layout__main {
    width: 100%;
  }

  .du-layout__main--wrap {
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .du-layout__main--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-layout__main--clamp {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }

  .du-layout__main--ellipsis ::slotted(*),
  .du-layout__main--clamp ::slotted(*) {
    display: contents;
  }

  .du-layout__main--overflow-hidden {
    overflow: hidden;
  }

  .du-layout__main--overflow-visible {
    overflow: visible;
  }

  .du-layout__main--overflow-auto {
    overflow: auto;
  }
`];var fu=Object.defineProperty,le=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&fu(e,t,s),s};const $o=["wrap","ellipsis","clamp"],mu=["hidden","visible","auto"],ta=class ta extends A{constructor(){super(...arguments),this.width="",this.minWidth="",this.maxWidth="",this.height="",this.minHeight="",this.maxHeight="",this.gap="",this.textOverflow="wrap",this.lines=0,this.overflow="hidden",this.disabled=!1,this.hasStart=!1,this.hasEnd=!1,this.resolvedLines=0,this.isMainOverflowing=!1,this.defaultSlotText="",this.contentSlots=new Set,this.overflowFrame=0,this.handleContentChange=()=>{this.syncContentObserver(),this.syncDefaultSlotText(),this.scheduleOverflowSync()}}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>{this.syncAutoLines(),this.scheduleOverflowSync()}),this.resizeObserver.observe(this)),this.syncContentObserver(),this.hasUpdated&&this.overflowHelpInfo!==void 0&&(this.syncDefaultSlotText(),this.scheduleOverflowSync())}disconnectedCallback(){var e;(e=this.resizeObserver)==null||e.disconnect(),this.resizeObserver=void 0,this.clearContentObservation(),this.contentObserver=void 0,this.overflowFrame&&(cancelAnimationFrame(this.overflowFrame),this.overflowFrame=0),super.disconnectedCallback()}updated(e){var t;if((e.has("textOverflow")||e.has("lines")||e.has("height")||e.has("maxHeight")||e.has("minHeight"))&&this.syncAutoLines(),(e.has("textOverflow")||e.has("overflowHelpInfo")||e.has("lines")||e.has("width")||e.has("minWidth")||e.has("maxWidth")||e.has("height")||e.has("minHeight")||e.has("maxHeight"))&&this.scheduleOverflowSync(),e.has("overflowHelpInfo")&&(this.syncContentObserver(),this.syncDefaultSlotText()),!this.isMainOverflowing||!((t=this.overflowHelpInfo)!=null&&t.trim()||this.defaultSlotText)){const i=this.renderRoot.querySelector("du-coachmark");i&&(i.open=!1)}}normalizeSize(e){return kr(e)}handleSlotChange(e){const t=e.target,i=t.name,s=t.assignedNodes({flatten:!0}).some(o=>{var a;return o.nodeType===Node.TEXT_NODE?!!((a=o.textContent)!=null&&a.trim()):o.nodeType===Node.ELEMENT_NODE});i==="start"?this.hasStart=s:i==="end"?this.hasEnd=s:this.overflowHelpInfo!==void 0&&(this.syncContentObserver(),this.syncDefaultSlotText(),this.scheduleOverflowSync())}readDefaultSlotContent(){const e=this.renderRoot.querySelector("slot:not([name])"),t=new Set,i=new Set,s=(a,l=!1)=>{if(a instanceof HTMLSlotElement){a!==e&&i.add(a);const h=a.assignedNodes(),p=h.length?h:[...a.childNodes];for(const f of p)t.add(f);return p.map(f=>s(f,l)).join(l?" ":"")}return a.nodeType===Node.TEXT_NODE?a.textContent??"":a.nodeType===Node.ELEMENT_NODE?[...a.childNodes].map(h=>s(h)).join(""):""};return{text:e?s(e,!0).replace(/\s+/g," ").trim():"",nodes:t,slots:i}}syncDefaultSlotText(){const{text:e}=this.readDefaultSlotContent();e!==this.defaultSlotText&&(this.defaultSlotText=e)}clearContentObservation(){var e;(e=this.contentObserver)==null||e.disconnect();for(const t of this.contentSlots)t.removeEventListener("slotchange",this.handleContentChange);this.contentSlots.clear()}syncContentObserver(){if(this.clearContentObservation(),!this.isConnected||this.overflowHelpInfo===void 0||typeof MutationObserver>"u"){this.contentObserver=void 0;return}this.contentObserver??(this.contentObserver=new MutationObserver(this.handleContentChange));const e={childList:!0,subtree:!0,characterData:!0};this.contentObserver.observe(this,e);const{nodes:t,slots:i}=this.readDefaultSlotContent();for(const s of t)this.contentObserver.observe(s,e);for(const s of i)s.addEventListener("slotchange",this.handleContentChange),this.contentSlots.add(s)}scheduleOverflowSync(){if(this.overflowHelpInfo===void 0){this.isMainOverflowing&&(this.isMainOverflowing=!1);return}!this.isConnected||this.overflowFrame||(this.overflowFrame=requestAnimationFrame(()=>{this.overflowFrame=0,this.syncOverflowState()}))}syncOverflowState(){const e=this.mainEl;let t=(e==null?void 0:e.scrollHeight)??0;if(e&&this.textOverflow==="clamp"&&this.resolvedLines>0){const s=e.style.getPropertyValue("-webkit-line-clamp");e.style.removeProperty("-webkit-line-clamp"),t=e.scrollHeight,s&&e.style.setProperty("-webkit-line-clamp",s)}const i=!!(e&&e.clientWidth>0&&e.clientHeight>0&&(e.scrollWidth>e.clientWidth+1||t>e.clientHeight+1));i!==this.isMainOverflowing&&(this.isMainOverflowing=i)}syncAutoLines(){if(this.textOverflow!=="clamp"){this.resolvedLines!==0&&(this.resolvedLines=0);return}if(this.lines>0){this.resolvedLines!==this.lines&&(this.resolvedLines=this.lines);return}const e=getComputedStyle(this),t=Number.parseFloat(e.maxHeight),i=Number.parseFloat(e.height),s=!!this.height&&Number.isFinite(i)&&i>0,o=!!this.maxHeight||e.maxHeight!=="none"&&Number.isFinite(t)&&t>0;if(!s&&!o){this.resolvedLines!==0&&(this.resolvedLines=0);return}const a=s?i:o?t:this.clientHeight,l=Number.parseFloat(e.lineHeight);if(!Number.isFinite(l)||l<=0||!Number.isFinite(a)||a<=0){this.resolvedLines!==0&&(this.resolvedLines=0);return}const h=Math.max(1,Math.floor(a/l));this.resolvedLines!==h&&(this.resolvedLines=h)}get mainClasses(){const e=this.textOverflow,t=this.resolvedLines,i=e==="clamp"&&t>0,s=e==="ellipsis"||e==="clamp"&&t<=0;return{"du-layout__main":!0,"du-layout__main--wrap":e==="wrap"&&!s&&!i,"du-layout__main--ellipsis":s,"du-layout__main--clamp":i,[`du-layout__main--overflow-${this.overflow}`]:e==="wrap"}}get mainInlineStyle(){return this.textOverflow==="clamp"&&this.resolvedLines>0?{"-webkit-line-clamp":String(this.resolvedLines)}:{}}applyHostStyle(){const e=this.normalizeSize(this.width),t=this.normalizeSize(this.maxWidth),i=this.normalizeSize(this.height),s=this.normalizeSize(this.maxHeight);this.style.width=e||"",this.style.minWidth=this.normalizeSize(this.minWidth)||"",this.style.maxWidth=t||(e?"none":""),this.style.height=i||"",this.style.minHeight=this.normalizeSize(this.minHeight)||"",this.style.maxHeight=s||"",this.style.overflow=i||s?this.overflow:"";const o=Ih(this.gap);o?this.style.setProperty("--du-layout-gap",o):this.style.removeProperty("--du-layout-gap")}willUpdate(){this.applyHostStyle()}firstUpdated(){this.applyHostStyle(),this.syncAutoLines();const e=this.renderRoot.querySelector('slot[name="start"]'),t=this.renderRoot.querySelector('slot[name="end"]'),i=this.renderRoot.querySelector("slot:not([name])");e&&this.handleSlotChange({target:e}),t&&this.handleSlotChange({target:t}),i&&this.overflowHelpInfo!==void 0&&this.handleSlotChange({target:i}),this.scheduleOverflowSync()}renderMain(){const e=u`
      <div
        class=${di(this.mainClasses)}
        part="main"
        style=${ne(this.mainInlineStyle)}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;if(this.overflowHelpInfo===void 0)return e;const t=this.overflowHelpInfo.trim()||this.defaultSlotText;return u`
      <du-coachmark
        class="du-layout__main-hint"
        part="overflow-help"
        placement="top-center"
        trigger="hover"
        content=${t}
        ?disabled=${!this.isMainOverflowing||!t}
      >
        ${e}
      </du-coachmark>
    `}render(){return u`
      <div class="du-layout__start" part="start" ?hidden=${!this.hasStart}>
        <slot name="start" @slotchange=${this.handleSlotChange}></slot>
      </div>
      ${this.renderMain()}
      <div class="du-layout__end" part="end" ?hidden=${!this.hasEnd}>
        <slot name="end" @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};ta.styles=pu;let W=ta;le([y()],W.prototype,"width"),le([y("",{attribute:"min-width"})],W.prototype,"minWidth"),le([y("",{attribute:"max-width"})],W.prototype,"maxWidth"),le([y()],W.prototype,"height"),le([y("",{attribute:"min-height"})],W.prototype,"minHeight"),le([y("",{attribute:"max-height"})],W.prototype,"maxHeight"),le([y()],W.prototype,"gap"),le([$($o,"wrap",{attribute:"text-overflow"})],W.prototype,"textOverflow"),le([st({attribute:"overflow-help-info"})],W.prototype,"overflowHelpInfo"),le([T(0)],W.prototype,"lines"),le([$(mu,"hidden")],W.prototype,"overflow"),le([m()],W.prototype,"disabled"),le([S()],W.prototype,"hasStart"),le([S()],W.prototype,"hasEnd"),le([S()],W.prototype,"resolvedLines"),le([S()],W.prototype,"isMainOverflowing"),le([S()],W.prototype,"defaultSlotText"),le([q(".du-layout__main")],W.prototype,"mainEl");const gu=_`
  :host {
    display: inline-block;
    width: fit-content;
    max-width: 100%;
    line-height: 0;
    vertical-align: middle;
    ${te}
  }

  .du-checkbox-control {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: 0;
    line-height: 0;
    color: inherit;
    background: transparent;
    border: 0;
    appearance: none;
    cursor: pointer;
    ${te}
  }

  .du-checkbox-control du-layout {
    max-width: 100%;
  }

  .du-checkbox {
    --du-checkbox-size: 16px;
    --du-checkbox-border: var(--du-fill-p-4);
    --du-checkbox-border-strong: var(--du-fill-p10);
    --du-checkbox-fill: var(--du-fill-p10);
    --du-checkbox-icon: var(--du-on-d-c2);
    /* Figma 选中悬停：黑→白渐变层 fill-opacity 0.2 */
    --du-checkbox-hover-overlay: linear-gradient(
      150deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--du-checkbox-size);
    height: var(--du-checkbox-size);
    color: var(--du-checkbox-icon);
    background: transparent;
    border: 0.889px solid var(--du-checkbox-border);
    border-radius: 50%;
    transition:
      background-color var(--du-duration-normal) ease,
      border-color var(--du-duration-normal) ease,
      opacity var(--du-duration-normal) ease;
  }

  .du-checkbox__icon {
    position: relative;
    z-index: 1;
    display: none;
    width: 100%;
    height: 100%;
  }

  .du-checkbox--checked,
  .du-checkbox--indeterminate {
    background: var(--du-checkbox-fill);
    border-color: transparent;
  }

  .du-checkbox--checked .du-checkbox__icon--check,
  .du-checkbox--indeterminate .du-checkbox__icon--dash {
    display: block;
  }

  .du-checkbox__label {
    min-width: 0;
    overflow: hidden;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-checkbox__label ::slotted(*) {
    color: var(--du-on-l-c2);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  ::slotted([slot='end']) {
    flex: 0 0 auto;
    color: var(--du-on-l-c2);
    line-height: 0;
  }

  /* 未选：悬停 / 按压均为描边加强到 p10（设计稿两态一致）；整控件含标签 */
  .du-checkbox-control:not(:disabled):not([aria-readonly='true']):hover
    .du-checkbox:not(.du-checkbox--checked):not(.du-checkbox--indeterminate),
  .du-checkbox-control:not(:disabled):not([aria-readonly='true']):active
    .du-checkbox:not(.du-checkbox--checked):not(.du-checkbox--indeterminate) {
    border-color: var(--du-checkbox-border-strong);
  }

  /*
   * 选中 / 选中部分：仅悬停叠加渐变层；按压态与常规相同。
   * 必须用 :hover:not(:active)，否则按住时仍会残留悬停层。
   */
  .du-checkbox-control:not(:disabled):not([aria-readonly='true']):hover:not(:active) .du-checkbox--checked::after,
  .du-checkbox-control:not(:disabled):not([aria-readonly='true']):hover:not(:active)
    .du-checkbox--indeterminate::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--du-checkbox-hover-overlay);
    pointer-events: none;
  }

  .du-checkbox-control:focus-visible .du-checkbox {
    outline: none;
  }

  .du-checkbox-control:disabled {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-checkbox-control[aria-readonly='true']:not(:disabled) {
    cursor: default;
  }

  .du-checkbox-control:disabled > * {
    --du-disabled-opacity: 1;
  }

  .du-checkbox-control:disabled
    .du-checkbox:not(.du-checkbox--checked):not(.du-checkbox--indeterminate) {
    background: var(--du-checkbox-fill);
    border-color: var(--du-fill-p-3);
  }
`;var bu=Object.defineProperty,ci=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&bu(e,t,s),s};const ia=class ia extends ye{constructor(){super(...arguments),this.testId="",this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.passive=!1,this.value="",this.hasLabel=!1,this.hasEnd=!1,this.initialChecked=!1,this.initialIndeterminate=!1}connectedCallback(){super.connectedCallback(),this.initialChecked=this.checked||this.isBooleanAttribute("checked"),this.initialIndeterminate=this.indeterminate||this.isBooleanAttribute("indeterminate")}getFormValue(){return this.checked?this.value||"on":null}resetFormControl(){this.checked=this.initialChecked,this.indeterminate=this.initialIndeterminate}restoreFormState(e){typeof e=="string"&&(this.checked=e===(this.value||"on"),this.indeterminate=!1)}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get ariaCheckedValue(){return this.indeterminate?"mixed":this.checked?"true":"false"}onLabelSlotChange(e){const t=e.target;this.hasLabel=t.assignedNodes({flatten:!0}).some(Xn)}onEndSlotChange(e){const t=e.target;this.hasEnd=t.assignedNodes({flatten:!0}).some(Xn)}toggle(){if(this.isValueLocked)return;let e,t;this.indeterminate?(t=!1,e=!0):(t=!1,e=!this.checked),this.passive||(this.indeterminate=t,this.checked=e,this.setFormValue(this.getFormValue())),this.emitValueChange("checked",e,{checked:e,indeterminate:t,value:this.value}),this.emit("update:indeterminate",t)}handleKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}render(){const e=this.isInteractiveDisabled,t=this.isOwnReadonly,i=["du-checkbox",this.indeterminate?"du-checkbox--indeterminate":"",!this.indeterminate&&this.checked?"du-checkbox--checked":""].filter(Boolean).join(" ");return u`
      <button
        class="du-checkbox-control"
        type="button"
        role="checkbox"
        data-testid=${ae(this.testId)}
        aria-checked=${this.ariaCheckedValue}
        aria-readonly=${t?"true":"false"}
        .disabled=${e}
        @click=${this.toggle}
        @keydown=${this.handleKeydown}
      >
        <du-layout gap=${this.hasLabel||this.hasEnd?"4":"0"}>
          <span slot="start" class=${i} part="checkbox">
            <svg
              class="du-checkbox__icon du-checkbox__icon--check"
              part="icon"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.96257 10.0604L12.4752 4.44466L13.3351 5.32064L7.39252 11.3744C7.15506 11.6162 6.77008 11.6162 6.53262 11.3744L3.55729 8.34337L4.41719 7.46739L6.96257 10.0604Z"
              />
            </svg>
            <svg
              class="du-checkbox__icon du-checkbox__icon--dash"
              part="icon"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M3.55729 7.11133H12.4462V8.53355H3.55729V7.11133Z"
              />
            </svg>
          </span>
          <span class="du-checkbox__label" part="label" ?hidden=${!this.hasLabel}>
            <slot @slotchange=${this.onLabelSlotChange}></slot>
          </span>
          <slot name="end" slot="end" @slotchange=${this.onEndSlotChange}></slot>
        </du-layout>
      </button>
    `}};ia.styles=gu;let je=ia;ci([y("",{attribute:"test-id",reflect:!1})],je.prototype,"testId"),ci([m()],je.prototype,"checked"),ci([m()],je.prototype,"indeterminate"),ci([m()],je.prototype,"disabled"),ci([m()],je.prototype,"passive"),ci([y()],je.prototype,"value"),ci([S()],je.prototype,"hasLabel"),ci([S()],je.prototype,"hasEnd");function Xn(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function Gi(){k("du-coachmark",I)}function xe(){Gi(),k("du-layout",W)}function Eo(){xe(),k("du-checkbox",je)}const vu=[_`
  :host {
    --du-scroll-area-scrollbar-padding: 0px;
    display: block;
    position: relative;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .du-scroll-area {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
  }

  .du-scroll-area::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .du-scroll-area__content {
    display: flow-root;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  .du-scroll-area__bar {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
  }

  .du-scroll-area__bar.is-visible {
    opacity: 1;
    pointer-events: auto;
  }

  .du-scroll-area__bar--y {
    top: var(--du-scroll-area-scrollbar-padding, 0px);
    right: 0;
    bottom: var(--du-scroll-area-scrollbar-padding, 0px);
    width: 12px;
  }

  .du-scroll-area__bar--x {
    left: var(--du-scroll-area-scrollbar-padding, 0px);
    right: var(--du-scroll-area-scrollbar-padding, 0px);
    bottom: 0;
    height: 12px;
  }

  .du-scroll-area__thumb {
    position: absolute;
    box-sizing: border-box;
    background: var(--du-fill-p-4);
    border-radius: 10px;
    /* 热区在 bar 上；拇指仅作视觉 */
    pointer-events: none;
  }

  .du-scroll-area__bar--y .du-scroll-area__thumb {
    top: 0;
    left: 4.5px;
    width: 3px;
    min-height: 24px;
  }

  .du-scroll-area__bar--x .du-scroll-area__thumb {
    left: 0;
    top: 4.5px;
    height: 3px;
    min-width: 24px;
  }

  :host([autohide='false']) .du-scroll-area__bar.is-needed {
    opacity: 1;
    pointer-events: auto;
  }
`,Ui];var yu=Object.defineProperty,xt=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&yu(e,t,s),s};const wu=["true","false"],ra=class ra extends A{constructor(){super(...arguments),this.autohide="true",this.hideDelay=900,this.scrollbarPadding="0",this.disabled=!1,this.showY=!1,this.showX=!1,this.neededY=!1,this.neededX=!1,this.thumbY={top:0,height:24},this.thumbX={left:0,width:24},this.syncFrame=0,this.dragging=null,this.hovering=!1,this.dragStart=0,this.dragThumbStart=0,this.dragThumbSize=0,this.dragTrackSize=0,this.dragListenersBound=!1,this.scheduleSync=()=>{this.syncFrame||(this.syncFrame=window.requestAnimationFrame(()=>{this.syncThumbs(),this.syncFrame=window.requestAnimationFrame(()=>{this.syncFrame=0,this.syncThumbs()})}))},this.onSlotChange=()=>{this.scheduleSync()},this.onHostPointerEnter=()=>{this.hovering=!0,this.clearHideTimer(),this.syncThumbs()},this.onHostPointerLeave=()=>{this.dragging||(this.hovering=!1,this.autoHideEnabled&&this.revealBars())},this.onScroll=()=>{this.syncThumbs();const e=this.viewport,t=!!e&&(e.scrollTop>0||e.scrollLeft>0);!this.dragging&&t&&this.revealBars(),this.emitScroll()},this.onWindowPointerMove=e=>{const t=this.viewport;if(!t||!this.dragging)return;e.preventDefault();const i=Math.max(0,this.dragTrackSize-this.dragThumbSize),s=(this.dragging==="y"?e.clientY:e.clientX)-this.dragStart,o=To(this.dragThumbStart+s,0,i);if(this.dragging==="y"){const l=t.scrollHeight-t.clientHeight;this.applyThumbDom({top:o,height:this.dragThumbSize},this.thumbX),t.scrollTop=i>0?o/i*l:0;return}const a=t.scrollWidth-t.clientWidth;this.applyThumbDom(this.thumbY,{left:o,width:this.dragThumbSize}),t.scrollLeft=i>0?o/i*a:0},this.onWindowPointerUp=()=>{this.unbindDragListeners(),this.dragging&&(this.dragging=null,this.hovering=this.matches(":hover"),this.syncThumbs(),this.revealBars())}}get viewportElement(){return this.viewport??null}get scrollTop(){var e;return((e=this.viewport)==null?void 0:e.scrollTop)??0}set scrollTop(e){this.viewport&&(this.viewport.scrollTop=e)}get scrollLeft(){var e;return((e=this.viewport)==null?void 0:e.scrollLeft)??0}set scrollLeft(e){this.viewport&&(this.viewport.scrollLeft=e)}scrollTo(e,t){const i=this.viewport;if(i){if(typeof e=="number"){i.scrollTo(e,t??0);return}i.scrollTo(e)}}scrollBy(e,t){const i=this.viewport;if(i){if(typeof e=="number"){i.scrollBy(e,t??0);return}i.scrollBy(e)}}scrollToElement(e,t={}){const i=this.viewport;if(!i)return;const s=t.behavior??"auto",o=t.block??"start",a=t.inline??"nearest",l=t.offsetTop??0,h=t.offsetLeft??0,p=i.getBoundingClientRect(),f=e.getBoundingClientRect();let g=i.scrollTop,v=i.scrollLeft;o==="start"?g+=f.top-p.top-l:o==="end"?g+=f.bottom-p.bottom+l:o==="center"?g+=f.top-p.top-(p.height-f.height)/2:f.top<p.top+l?g+=f.top-p.top-l:f.bottom>p.bottom-l&&(g+=f.bottom-p.bottom+l),a==="start"?v+=f.left-p.left-h:a==="end"?v+=f.right-p.right+h:a==="center"?v+=f.left-p.left-(p.width-f.width)/2:f.left<p.left+h?v+=f.left-p.left-h:f.right>p.right-h&&(v+=f.right-p.right+h),i.scrollTo({top:g,left:v,behavior:s})}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerenter",this.onHostPointerEnter),this.addEventListener("pointerleave",this.onHostPointerLeave)}disconnectedCallback(){var e,t;this.dragging=null,this.hovering=!1,this.removeEventListener("pointerenter",this.onHostPointerEnter),this.removeEventListener("pointerleave",this.onHostPointerLeave),this.unbindDragListeners(),(e=this.resizeObserver)==null||e.disconnect(),(t=this.mutationObserver)==null||t.disconnect(),this.mutationObserver=void 0,this.syncFrame&&(window.cancelAnimationFrame(this.syncFrame),this.syncFrame=0),this.clearHideTimer(),super.disconnectedCallback()}firstUpdated(){const e=this.viewport,t=this.content;this.style.setProperty("--du-scroll-area-scrollbar-padding",this.scrollbarPaddingCss),e&&t&&(this.resizeObserver=Os([this,e,t],()=>this.scheduleSync(),"border-box"),this.mutationObserver=is(this,()=>this.scheduleSync(),{childList:!0,subtree:!0,characterData:!0}),this.syncThumbs())}get autoHideEnabled(){return this.autohide!=="false"}get scrollbarPaddingPx(){return xu(this.scrollbarPadding)}get scrollbarPaddingCss(){const e=this.scrollbarPadding.trim();return!e||e==="0"?"0px":/^-?[\d.]+$/.test(e)?`${e}px`:e}clearHideTimer(){this.hideTimer!==void 0&&(window.clearTimeout(this.hideTimer),this.hideTimer=void 0)}revealBars(){this.showY=this.neededY,this.showX=this.neededX,this.applyBarsDom(),this.autoHideEnabled&&(this.clearHideTimer(),!(this.hovering||this.dragging)&&(this.hideTimer=window.setTimeout(()=>{this.dragging||this.hovering||(this.showY=!1,this.showX=!1,this.applyBarsDom())},this.hideDelay)))}syncThumbs(){const e=this.viewport;if(!e)return;const{clientWidth:t,clientHeight:i,scrollWidth:s,scrollHeight:o,scrollTop:a,scrollLeft:l}=e,h=i>0&&o>i+1,p=t>0&&s>t+1;let f=this.thumbY,g=this.thumbX;if(h){const v=Math.max(0,i-this.scrollbarPaddingPx*2),x=i/o,E=Math.max(24,Math.min(v,v*x)),M=Math.max(0,v-E);f={top:o===i?0:a/(o-i)*M,height:E}}if(p){const v=Math.max(0,t-this.scrollbarPaddingPx*2),x=t/s,E=Math.max(24,Math.min(v,v*x)),M=Math.max(0,v-E);g={left:s===t?0:l/(s-t)*M,width:E}}if(this.dragging){this.syncBarVisibility(h,p);return}this.thumbY=f,this.thumbX=g,this.applyThumbDom(f,g),this.syncBarVisibility(h,p)}syncBarVisibility(e,t){this.neededY=e,this.neededX=t,!this.autoHideEnabled||this.hovering||this.dragging?(this.showY=e,this.showX=t):(e||(this.showY=!1),t||(this.showX=!1)),!this.showY&&!this.showX&&this.clearHideTimer(),this.applyBarsDom()}applyBarsDom(){var e,t,i,s;(e=this.barYEl)==null||e.classList.toggle("is-needed",this.neededY),(t=this.barXEl)==null||t.classList.toggle("is-needed",this.neededX),(i=this.barYEl)==null||i.classList.toggle("is-visible",this.showY||!this.autoHideEnabled&&this.neededY),(s=this.barXEl)==null||s.classList.toggle("is-visible",this.showX||!this.autoHideEnabled&&this.neededX)}applyThumbDom(e=this.thumbY,t=this.thumbX){this.thumbYEl&&(this.thumbYEl.style.transform=`translateY(${e.top}px)`,this.thumbYEl.style.height=`${e.height}px`),this.thumbXEl&&(this.thumbXEl.style.transform=`translateX(${t.left}px)`,this.thumbXEl.style.width=`${t.width}px`)}emitScroll(){const e=this.viewport;if(!e)return;const t={scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,scrollHeight:e.scrollHeight,scrollWidth:e.scrollWidth,clientHeight:e.clientHeight,clientWidth:e.clientWidth};this.emit("scroll",t)}bindDragListeners(){this.dragListenersBound||(this.dragListenersBound=!0,window.addEventListener("pointermove",this.onWindowPointerMove,{passive:!1}),window.addEventListener("pointerup",this.onWindowPointerUp),window.addEventListener("pointercancel",this.onWindowPointerUp))}unbindDragListeners(){this.dragListenersBound&&(this.dragListenersBound=!1,window.removeEventListener("pointermove",this.onWindowPointerMove),window.removeEventListener("pointerup",this.onWindowPointerUp),window.removeEventListener("pointercancel",this.onWindowPointerUp))}startDrag(e,t){var a;const i=this.viewport,s=t.currentTarget;if(!i||!s)return;t.preventDefault(),t.stopPropagation(),this.syncThumbs(),this.dragging=e,this.bindDragListeners();const o=s.getBoundingClientRect();if(e==="y"){const l=Math.max(0,i.clientHeight-this.scrollbarPaddingPx*2),h=this.thumbY.height,p=Math.max(0,l-h),f=t.clientY-o.top,g=f>=this.thumbY.top&&f<=this.thumbY.top+h;let v=this.thumbY.top;if(!g){v=To(f-h/2,0,p),this.thumbY={top:v,height:h},this.applyThumbDom(this.thumbY,this.thumbX);const x=i.scrollHeight-i.clientHeight;i.scrollTop=p>0?v/p*x:0}this.dragStart=t.clientY,this.dragThumbStart=v,this.dragThumbSize=h,this.dragTrackSize=l}else{const l=Math.max(0,i.clientWidth-this.scrollbarPaddingPx*2),h=this.thumbX.width,p=Math.max(0,l-h),f=t.clientX-o.left,g=f>=this.thumbX.left&&f<=this.thumbX.left+h;let v=this.thumbX.left;if(!g){v=To(f-h/2,0,p),this.thumbX={left:v,width:h},this.applyThumbDom(this.thumbY,this.thumbX);const x=i.scrollWidth-i.clientWidth;i.scrollLeft=p>0?v/p*x:0}this.dragStart=t.clientX,this.dragThumbStart=v,this.dragThumbSize=h,this.dragTrackSize=l}try{(a=s.setPointerCapture)==null||a.call(s,t.pointerId)}catch{}this.clearHideTimer(),this.revealBars()}updated(e){e.has("scrollbarPadding")&&(this.style.setProperty("--du-scroll-area-scrollbar-padding",this.scrollbarPaddingCss),this.syncThumbs())}render(){return u`
      <div
        class="du-scroll-area"
        part="viewport"
        @scroll=${this.onScroll}
      >
        <div class="du-scroll-area__content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      </div>
      <div
        class=${di({"du-scroll-area__bar":!0,"du-scroll-area__bar--y":!0,"is-needed":this.neededY,"is-visible":this.showY||!this.autoHideEnabled&&this.neededY})}
        part="scrollbar-y"
        @pointerdown=${e=>this.startDrag("y",e)}
      >
        <div
          class="du-scroll-area__thumb"
          part="thumb-y"
          style=${ne({transform:`translateY(${this.thumbY.top}px)`,height:`${this.thumbY.height}px`})}
        ></div>
      </div>
      <div
        class=${di({"du-scroll-area__bar":!0,"du-scroll-area__bar--x":!0,"is-needed":this.neededX,"is-visible":this.showX||!this.autoHideEnabled&&this.neededX})}
        part="scrollbar-x"
        @pointerdown=${e=>this.startDrag("x",e)}
      >
        <div
          class="du-scroll-area__thumb"
          part="thumb-x"
          style=${ne({transform:`translateX(${this.thumbX.left}px)`,width:`${this.thumbX.width}px`})}
        ></div>
      </div>
    `}};ra.styles=vu;let Pe=ra;xt([$(wu,"true")],Pe.prototype,"autohide"),xt([T(900,{attribute:"hide-delay"})],Pe.prototype,"hideDelay"),xt([y("0",{attribute:"scrollbar-padding"})],Pe.prototype,"scrollbarPadding"),xt([m()],Pe.prototype,"disabled"),xt([q(".du-scroll-area",!0)],Pe.prototype,"viewport"),xt([q(".du-scroll-area__content",!0)],Pe.prototype,"content"),xt([q('[part="thumb-y"]',!0)],Pe.prototype,"thumbYEl"),xt([q('[part="thumb-x"]',!0)],Pe.prototype,"thumbXEl"),xt([q('[part="scrollbar-y"]',!0)],Pe.prototype,"barYEl"),xt([q('[part="scrollbar-x"]',!0)],Pe.prototype,"barXEl");function To(r,e,t){return Math.min(t,Math.max(e,r))}function xu(r){const e=r.trim();if(!e)return 0;const t=Number.parseFloat(e);return Number.isFinite(t)?t:0}function Er(){k("du-scroll-area",Pe)}const _u=[_`
    :host {
      --du-scroll-lrc-fade-size: 66px;
      /* 与 viewport 水平内边距一致；箭头距外侧同值 */
      --du-scroll-lrc-padding-x: 0px;
      --du-scroll-lrc-btn-color: var(--du-on-l-c2);
      --du-scroll-lrc-btn-color-hover: var(--du-accent-blue);
      display: block;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }

    .du-scroll-lrc__viewport {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      height: 100%;
      padding-inline: var(--du-scroll-lrc-padding-x, 0px);
      overflow: hidden;
    }

    .du-scroll-lrc__viewport.is-fade-next {
      -webkit-mask-image: linear-gradient(
        90deg,
        #000 0%,
        #000 calc(100% - var(--du-scroll-lrc-fade-size)),
        transparent calc(100% - var(--du-scroll-lrc-fade-size) * 0.5)
      );
      mask-image: linear-gradient(
        90deg,
        #000 0%,
        #000 calc(100% - var(--du-scroll-lrc-fade-size)),
        transparent calc(100% - var(--du-scroll-lrc-fade-size) * 0.5)
      );
    }

    .du-scroll-lrc__viewport.is-fade-prev {
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent calc(var(--du-scroll-lrc-fade-size) * 0.5),
        #000 var(--du-scroll-lrc-fade-size),
        #000 100%
      );
      mask-image: linear-gradient(
        90deg,
        transparent calc(var(--du-scroll-lrc-fade-size) * 0.5),
        #000 var(--du-scroll-lrc-fade-size),
        #000 100%
      );
    }

    .du-scroll-lrc__viewport.is-fade-prev.is-fade-next {
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent calc(var(--du-scroll-lrc-fade-size) * 0.5),
        #000 var(--du-scroll-lrc-fade-size),
        #000 calc(100% - var(--du-scroll-lrc-fade-size)),
        transparent calc(100% - var(--du-scroll-lrc-fade-size) * 0.5)
      );
      mask-image: linear-gradient(
        90deg,
        transparent calc(var(--du-scroll-lrc-fade-size) * 0.5),
        #000 var(--du-scroll-lrc-fade-size),
        #000 calc(100% - var(--du-scroll-lrc-fade-size)),
        transparent calc(100% - var(--du-scroll-lrc-fade-size) * 0.5)
      );
    }

    .du-scroll-lrc__content {
      box-sizing: border-box;
      width: max-content;
      max-width: none;
      height: 100%;
      transition: transform var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
      will-change: transform;
    }

    .du-scroll-lrc__content.is-linear {
      transition-timing-function: linear;
    }

    .du-scroll-lrc__actions {
      position: absolute;
      /* 左右各扩 1px，避免半像素缩放时边缘漏缝 */
      inset: 0 -1px;
      z-index: 1;
      pointer-events: none;
      overflow: visible;
    }

    .du-scroll-lrc__btn {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      width: var(--du-scroll-lrc-fade-size, 66px);
      height: 100%;
      margin: 0;
      /* 箭头距外侧 = viewport padding-x */
      padding: 0 var(--du-scroll-lrc-padding-x, 0px) 0 0;
      border: none;
      color: var(--du-scroll-lrc-btn-color);
      background: transparent;
      cursor: pointer;
      pointer-events: auto;
      transition: color var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
    }

    .du-scroll-lrc__btn:hover,
    .du-scroll-lrc__btn:focus-visible {
      color: var(--du-scroll-lrc-btn-color-hover);
      outline: none;
    }

    .du-scroll-lrc__btn--prev {
      left: 0;
      transform: scaleX(-1);
    }

    .du-scroll-lrc__btn--next {
      right: 0;
    }

    .du-scroll-lrc__btn du-icon,
    .du-scroll-lrc__btn ::slotted(du-icon) {
      display: block;
      flex: none;
      color: inherit;
      font-weight: var(--du-typo-semibold-weight, 600);
    }
  `,Ui];var ku=Object.defineProperty,Ye=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&ku(e,t,s),s};const Kn=300-20,Cu=["click","hover"],sa=class sa extends A{constructor(){super(...arguments),this.stepRatio=.5,this.threshold=3,this.showArrows=!0,this.trigger="click",this.hoverInterval=Kn,this.disabled=!1,this.offset=0,this.overflow=!1,this.maxOffset=0,this.viewportWidth=0,this.contentWidth=0,this.hoverTimer=0,this.hoverDirection=null,this.linearMotionToken=0,this.linearMotion=!1,this.onWheel=e=>{if(this.disabled||!this.overflow)return;const t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.shiftKey?e.deltaY:0;if(!t)return;const i=this.offset+t;i<0&&this.offset<=0||i>this.maxOffset&&this.offset>=this.maxOffset||(e.preventDefault(),this.setOffset(i))},this.onPrevClick=e=>{e.preventDefault(),this.hoverDirection!=="prev"&&this.scrollPrev()},this.onNextClick=e=>{e.preventDefault(),this.hoverDirection!=="next"&&this.scrollNext()},this.onPrevPointerEnter=e=>{this.startHoverRepeat("prev",e)},this.onNextPointerEnter=e=>{this.startHoverRepeat("next",e)},this.onPrevPointerLeave=()=>{this.hoverDirection==="prev"&&this.stopHoverRepeat()},this.onNextPointerLeave=()=>{this.hoverDirection==="next"&&this.stopHoverRepeat()}}get scrollOffset(){return this.offset}get canScrollPrev(){return this.overflow&&this.offset>0}get canScrollNext(){return this.overflow&&this.offset<this.maxOffset}get viewportElement(){return this.viewport??null}get contentElement(){return this.content??null}scrollPrev(){!this.canScrollPrev||this.disabled||this.setOffset(this.offset-this.stepPx)}scrollNext(){!this.canScrollNext||this.disabled||this.setOffset(this.offset+this.stepPx)}scrollToOffset(e){this.disabled||this.setOffset(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("wheel",this.onWheel,{passive:!1})}disconnectedCallback(){var e,t;this.stopHoverRepeat(),this.removeEventListener("wheel",this.onWheel),(e=this.resizeObserver)==null||e.disconnect(),(t=this.mutationObserver)==null||t.disconnect(),this.resizeObserver=void 0,this.mutationObserver=void 0,super.disconnectedCallback()}firstUpdated(){const e=this.viewport,t=this.content;!e||!t||(this.resizeObserver=Os([this,e,t],()=>this.syncMetrics()),this.mutationObserver=is(t,()=>this.syncMetrics()),this.syncMetrics())}updated(e){(e.has("threshold")||e.has("stepRatio"))&&this.syncMetrics(),e.has("trigger")&&this.trigger!=="hover"||e.has("disabled")&&this.disabled?this.stopHoverRepeat():e.has("hoverInterval")&&this.hoverDirection&&this.armHoverTimer()}get stepPx(){const e=Number.isFinite(this.stepRatio)?this.stepRatio:.5;return Math.max(0,this.viewportWidth*Math.max(0,e))}setOffset(e,t=!0){const i=Math.max(0,this.maxOffset),s=Su(e,0,i),o=s!==this.offset;this.offset=s,o&&t&&this.emitScroll()}measureViewportContentWidth(e){const t=getComputedStyle(e),i=(Number.parseFloat(t.paddingLeft)||0)+(Number.parseFloat(t.paddingRight)||0);return Math.max(0,e.clientWidth-i)}syncMetrics(){const e=this.viewport,t=this.content;if(!e||!t)return;const i=this.measureViewportContentWidth(e),s=t.scrollWidth,o=Math.max(0,this.threshold),a=s-i>o,l=a?Math.max(0,s-i):0;if(this.viewportWidth=i,this.contentWidth=s,this.overflow=a,this.maxOffset=l,!a){this.offset!==0&&(this.offset=0,this.emitScroll());return}this.offset>l&&(this.offset=l,this.emitScroll())}emitScroll(){const e={offset:this.offset,maxOffset:this.maxOffset,overflow:this.overflow,canScrollPrev:this.canScrollPrev,canScrollNext:this.canScrollNext,viewportWidth:this.viewportWidth,contentWidth:this.contentWidth};this.emit("scroll",e)}startHoverRepeat(e,t){this.trigger!=="hover"||this.disabled||t.pointerType!=="mouse"||(this.stopHoverRepeat(),this.linearMotionToken+=1,this.hoverDirection=e,this.linearMotion=!0,this.stepHover(),this.hoverDirection===e&&this.armHoverTimer())}armHoverTimer(){this.hoverTimer&&window.clearInterval(this.hoverTimer),this.hoverTimer=window.setInterval(()=>this.stepHover(),this.hoverInterval)}stepHover(){if(this.trigger!=="hover"||this.disabled||!this.hoverDirection){this.stopHoverRepeat();return}if(this.hoverDirection==="prev"){if(!this.canScrollPrev){this.stopHoverRepeat();return}this.scrollPrev(),this.canScrollPrev||this.stopHoverRepeat();return}if(!this.canScrollNext){this.stopHoverRepeat();return}this.scrollNext(),this.canScrollNext||this.stopHoverRepeat()}stopHoverRepeat(){this.hoverTimer&&(window.clearInterval(this.hoverTimer),this.hoverTimer=0);const e=this.hoverDirection!==null;this.hoverDirection=null,e&&this.releaseLinearMotion()}releaseLinearMotion(){const e=++this.linearMotionToken;requestAnimationFrame(()=>{e===this.linearMotionToken&&this.isConnected&&(this.linearMotion=!1)})}renderArrow(e){return this.showArrows?u`
      <slot name=${e}>
        <du-icon name="icon-arrow_right_linear" size="12" decorative></du-icon>
      </slot>
    `:b}render(){const e=this.canScrollPrev,t=this.canScrollNext;return u`
      <div
        class=${di({"du-scroll-lrc__viewport":!0,"is-fade-prev":e,"is-fade-next":t})}
        part="viewport"
      >
        <div
          class=${di({"du-scroll-lrc__content":!0,"is-linear":this.linearMotion})}
          part="content"
          style=${ne({transform:`translateX(${this.offset*-1}px)`})}
        >
          <slot @slotchange=${this.syncMetrics}></slot>
        </div>
      </div>
      ${this.overflow?u`
            <div class="du-scroll-lrc__actions" part="actions">
              ${e?u`
                    <button
                      type="button"
                      class="du-scroll-lrc__btn du-scroll-lrc__btn--prev"
                      part="prev"
                      aria-label="向左滚动"
                      @click=${this.onPrevClick}
                      @pointerenter=${this.onPrevPointerEnter}
                      @pointerleave=${this.onPrevPointerLeave}
                    >
                      ${this.renderArrow("prev")}
                    </button>
                  `:b}
              ${t?u`
                    <button
                      type="button"
                      class="du-scroll-lrc__btn du-scroll-lrc__btn--next"
                      part="next"
                      aria-label="向右滚动"
                      @click=${this.onNextClick}
                      @pointerenter=${this.onNextPointerEnter}
                      @pointerleave=${this.onNextPointerLeave}
                    >
                      ${this.renderArrow("next")}
                    </button>
                  `:b}
            </div>
          `:b}
    `}};sa.styles=_u;let fe=sa;Ye([T(.5,{attribute:"step-ratio"})],fe.prototype,"stepRatio"),Ye([T(3)],fe.prototype,"threshold"),Ye([m(!0,{attribute:"show-arrows"})],fe.prototype,"showArrows"),Ye([$(Cu,"click")],fe.prototype,"trigger"),Ye([T(Kn,{attribute:"hover-interval",integer:!0,min:16})],fe.prototype,"hoverInterval"),Ye([m()],fe.prototype,"disabled"),Ye([S()],fe.prototype,"offset"),Ye([S()],fe.prototype,"overflow"),Ye([S()],fe.prototype,"maxOffset"),Ye([q(".du-scroll-lrc__viewport",!0)],fe.prototype,"viewport"),Ye([q(".du-scroll-lrc__content",!0)],fe.prototype,"content"),Ye([S()],fe.prototype,"linearMotion");function Su(r,e,t){return Math.min(t,Math.max(e,r))}function Zn(){k("du-scroll-lrc",fe)}const $u=[_`
  :host {
    display: none;
    position: relative;
    z-index: var(--du-layer-z-index, 1300);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    pointer-events: none;
  }

  :host([popover]) {
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  ${z(X("open"))},
  ${z(X("closing"))} {
    display: flex;
    flex-direction: column;
  }

  /* 仅打开时可点；closing / 已关（含 opacity:0 残留）不挡下层 */
  ${z(X("open"))} {
    pointer-events: auto;
  }

  .du-floating-panel {
    --du-floating-panel-radius: var(--du-radius-round-corner-l, 16px);
    --du-floating-panel-bg: var(--du-fill-p7);
    --du-floating-panel-stroke: var(--du-gradient-stroke-dialog-card);
    --du-floating-panel-shadow: var(--du-shadow-l5);
    --du-floating-panel-blur: var(--du-shadow-l5-backdrop-blur, 100px);
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-height: 0;
    overflow: hidden;
    color: var(--du-on-l-c2);
    background: var(--du-floating-panel-bg);
    border-radius: var(--du-floating-panel-radius);
    box-shadow: var(--du-floating-panel-shadow);
    backdrop-filter: blur(var(--du-floating-panel-blur));
    -webkit-backdrop-filter: blur(var(--du-floating-panel-blur));
  }

  .du-floating-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 1px;
    background: var(--du-floating-panel-stroke);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  .du-floating-panel > * {
    position: relative;
    z-index: 2;
  }

  :host([appear]:not([closing])) .du-floating-panel {
    animation: du-floating-panel-appear var(--du-duration-normal, var(--du-duration, 0.3s))
      ease;
  }

  :host([appear][closing]) .du-floating-panel {
    animation: du-floating-panel-exit var(--du-duration-normal, var(--du-duration, 0.3s))
      ease forwards;
  }

  @keyframes du-floating-panel-appear {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes du-floating-panel-exit {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
  }

  .du-floating-panel__header {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    min-height: 64px;
    padding: 12px 24px;
  }

  .du-floating-panel__header[hidden] {
    display: none;
  }

  .du-floating-panel__layout {
    width: 100%;
    min-width: 0;
  }

  .du-floating-panel__heading {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-width: 0;
    width: 100%;
  }

  .du-floating-panel__heading:not([data-has-content]) {
    display: none;
  }

  .du-floating-panel__title {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    overflow: hidden;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-headline-semibold-l-size, 16px);
    line-height: var(--du-typo-headline-semibold-l-line-height, 22px);
    letter-spacing: var(--du-typo-headline-semibold-l-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-floating-panel__title:not([data-has-content]) {
    display: none;
  }

  .du-floating-panel__title ::slotted(*) {
    display: block;
    overflow: hidden;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-floating-panel__description {
    box-sizing: border-box;
    min-width: 0;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-floating-panel__description:not([data-has-content]) {
    display: none;
  }

  .du-floating-panel__actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 8px;
  }

  .du-floating-panel__body {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  }

  .du-floating-panel__body du-scroll-area {
    flex: 1 1 0;
    width: 100%;
    min-height: 0;
  }
`,Ui];var Eu=Object.defineProperty,Re=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Eu(e,t,s),s};const oa=class oa extends A{constructor(){super(...arguments);w(this,Yt);w(this,ar);w(this,nr);w(this,Je);this.open=!1,this.parent="",this.appear=!1,this.description="",this.scrollable=!0,this.disabled=!1,this.closing=!1,this.hasTitle=!1,this.hasActions=!1,this.hasDescriptionSlot=!1,d(this,Yt,0),d(this,ar,!1),d(this,nr,!1),d(this,Je,ts(this,ui.floatingPanel,()=>this.zIndex,t=>this.style.setProperty("--du-layer-z-index",String(t)),{defaultRenderAt:"normal",readRenderAt:()=>this.renderAt,onRenderAtChange:()=>this.syncTopLayer()})),this.onPanelAnimationEnd=t=>{if(t.target===this.panelEl){if(t.animationName.includes("du-floating-panel-exit")){this.finishClosing();return}t.animationName.includes("du-floating-panel-appear")&&this.relayoutSlottedSegmented()}}}get effectiveZIndex(){return n(this,Je).effectiveZIndex}get effectiveRenderAt(){return n(this,Je).effectiveRenderAt}get hasDescription(){return this.hasDescriptionSlot||!!this.description.trim()}get hasHeading(){return this.hasTitle||this.hasDescription}get showHeader(){return this.hasHeading||this.hasActions}connectedCallback(){super.connectedCallback(),n(this,Je).connect()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{var t,i,s;this.isConnected||(this.clearClosingFallback(),this.teardownTopLayer(),(t=this.detachPortal)==null||t.call(this),this.detachPortal=void 0,(i=this.releasePortalTheme)==null||i.call(this),this.releasePortalTheme=void 0,(s=this.panelEl)==null||s.removeEventListener("animationend",this.onPanelAnimationEnd),K(this).clearOnDisconnect(),n(this,Je).clearOnDisconnect())})}firstUpdated(){var t;(t=this.panelEl)==null||t.addEventListener("animationend",this.onPanelAnimationEnd)}willUpdate(t){if(!t.has("open"))return;const i=!!t.get("open"),s=K(this),o=()=>{this.open=!1};if(this.open&&!i){if(!s.requestOpen("floating-panel",o)){this.open=!1;return}d(this,ar,!0),s.notify("open","floating-panel",o),this.appear&&s.notify("appear","floating-panel",o)}else!this.open&&i&&n(this,ar)&&(d(this,ar,!1),s.notify("close","floating-panel"))}updated(t){if((t.has("zIndex")||t.has("renderAt"))&&n(this,Je).sync(),t.has("open")){const i=!!t.get("open");this.open?(this.clearClosingFallback(),this.closing=!1,this.syncPortal(),this.updateComplete.then(()=>this.scheduleContentRelayout())):i&&this.appear?(this.closing=!0,this.armClosingFallback()):(this.clearClosingFallback(),this.closing=!1,this.syncPortal())}else(t.has("parent")||t.has("closing")||t.has("renderAt"))&&this.syncPortal()}clearClosingFallback(){n(this,Yt)&&(window.clearTimeout(n(this,Yt)),d(this,Yt,0))}armClosingFallback(){this.clearClosingFallback(),d(this,Yt,window.setTimeout(()=>{d(this,Yt,0),this.closing&&!this.open&&this.finishClosing()},500))}finishClosing(){this.clearClosingFallback(),this.closing&&(this.closing=!1,this.syncPortal())}syncPortal(){var s,o;if((s=this.detachPortal)==null||s.call(this),this.detachPortal=void 0,(o=this.releasePortalTheme)==null||o.call(this),this.releasePortalTheme=void 0,n(this,Je).releasePortal(),!((this.open||this.closing)&&!!this.parent.trim())){this.syncTopLayer();return}this.releasePortalTheme=Sr(this);const i=K(this);i.setPortaling(!0),n(this,Je).beginPortal();try{this.detachPortal=Ds(this,this.parent)}finally{i.setPortaling(!1),n(this,Je).endPortal()}this.syncTopLayer()}syncTopLayer(){if((this.open||this.closing)&&this.effectiveRenderAt==="top-level"){Cr(this),d(this,nr,!0);return}this.teardownTopLayer()}teardownTopLayer(){n(this,nr)&&(Bi(this,{clearPosition:!1}),d(this,nr,!1))}scheduleContentRelayout(){requestAnimationFrame(()=>{this.relayoutSlottedSegmented(),requestAnimationFrame(()=>this.relayoutSlottedSegmented())})}relayoutSlottedSegmented(){var t;for(const i of this.querySelectorAll("du-segmented-button")){const s=i;(t=s.relayout)==null||t.call(s)}}onTitleSlotChange(t){const i=t.target;this.hasTitle=i.assignedNodes({flatten:!0}).some(Po)}onActionsSlotChange(t){const i=t.target;this.hasActions=i.assignedNodes({flatten:!0}).some(Po)}onDescriptionSlotChange(t){const i=t.target;this.hasDescriptionSlot=i.assignedNodes({flatten:!0}).some(Po)}renderActions(){const t=u`<slot
      name="actions"
      @slotchange=${this.onActionsSlotChange}
    ></slot>`;return this.hasActions?u`
      <div slot="end" class="du-floating-panel__actions" part="actions">
        ${t}
      </div>
    `:t}render(){const t=this.scrollable?u`<du-scroll-area part="scroll"><slot></slot></du-scroll-area>`:u`<slot></slot>`;return u`
      <div class="du-floating-panel" part="panel">
        <header
          class="du-floating-panel__header"
          part="header"
          ?hidden=${!this.showHeader}
        >
          <du-layout class="du-floating-panel__layout" width="100%" gap="8">
            <div
              class="du-floating-panel__heading"
              part="heading"
              ?data-has-content=${this.hasHeading}
            >
              <div
                class="du-floating-panel__title"
                part="title"
                ?data-has-content=${this.hasTitle}
              >
                <slot name="title" @slotchange=${this.onTitleSlotChange}></slot>
              </div>
              <div
                class="du-floating-panel__description"
                part="description"
                ?data-has-content=${this.hasDescription}
              >
                <slot name="description" @slotchange=${this.onDescriptionSlotChange}
                  >${this.description}</slot
                >
              </div>
            </div>
            ${this.renderActions()}
          </du-layout>
        </header>
        <div class="du-floating-panel__body" part="body">${t}</div>
      </div>
    `}};Yt=new WeakMap,ar=new WeakMap,nr=new WeakMap,Je=new WeakMap,oa.styles=$u;let ue=oa;Re([m()],ue.prototype,"open"),Re([y()],ue.prototype,"parent"),Re([yt({attribute:"z-index",integer:!0})],ue.prototype,"zIndex"),Re([zt(Lt,{attribute:"render-at"})],ue.prototype,"renderAt"),Re([m()],ue.prototype,"appear"),Re([y()],ue.prototype,"description"),Re([m(!0,{attribute:"scrollable",reflect:!1})],ue.prototype,"scrollable"),Re([m()],ue.prototype,"disabled"),Re([m()],ue.prototype,"closing"),Re([S()],ue.prototype,"hasTitle"),Re([S()],ue.prototype,"hasActions"),Re([S()],ue.prototype,"hasDescriptionSlot"),Re([q(".du-floating-panel",!0)],ue.prototype,"panelEl");function Po(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function Jn(){xe(),Er(),k("du-floating-panel",ue)}const Tu=_`
  :host {
    display: contents;
  }
`,aa=class aa extends A{constructor(){super(...arguments);w(this,$i);w(this,Qe,[])}get openers(){return n(this,Qe)}requestOpen(t){var h;const i=n(this,Qe).map(p=>({...p})),s=this.openStrategy??Pu;let o;try{o=s(i,t)}catch{return!1}if(!Array.isArray(o)||!o.some(p=>p.el===t.el))return!1;const l=new Set(o.map(p=>p.el));for(const p of[...n(this,Qe)])l.has(p.el)||p.el===t.el||((h=p.close)==null||h.call(p),he(this,$i,qa).call(this,p.el));return he(this,$i,Ya).call(this,{...t,phase:"open"}),!0}notify(t,i){if(t==="destroy"||t==="close"){he(this,$i,qa).call(this,i.el);return}he(this,$i,Ya).call(this,{...i,phase:t})}render(){return u`<slot></slot>`}};Qe=new WeakMap,$i=new WeakSet,Ya=function(t){const i=n(this,Qe).findIndex(s=>s.el===t.el);if(i>=0){const s=n(this,Qe)[i];n(this,Qe)[i]={...s,...t,close:t.close??s.close,kind:t.kind||s.kind};return}n(this,Qe).push(t)},qa=function(t){d(this,Qe,n(this,Qe).filter(i=>i.el!==t))},aa.styles=Tu;let Is=aa;function Pu(r,e){return[e]}function Qn(){k("du-popper-mutually-exclusive",Is)}const Au=[_`
  :host {
    position: absolute;
    inset: 0;
    display: none;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    pointer-events: none;
    isolation: isolate;
  }

  :host([popover]) {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  :host([data-du-overlay-active]),
  :host([closing]) {
    display: block;
  }

  :host([data-du-overlay-active]) {
    pointer-events: auto;
  }

  :host([data-du-overlay-nonmodal]) {
    pointer-events: none;
  }

  :host([data-du-overlay-nonmodal]) .du-overlay__backdrop {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    pointer-events: none;
  }

  :host([data-du-overlay-managed]) .du-overlay__content {
    padding: 24px;
  }

  .du-overlay__backdrop {
    position: absolute;
    z-index: 0;
    inset: 0;
    background: var(--du-overlay-background, var(--du-fill-p11, rgba(0, 0, 0, 0.5)));
    backdrop-filter: blur(var(--du-overlay-backdrop-blur, 16px));
    -webkit-backdrop-filter: blur(var(--du-overlay-backdrop-blur, 16px));
  }

  .du-overlay__content {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    padding: var(--du-overlay-content-padding, 0);
    pointer-events: none;
  }

  ::slotted(*) {
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }

  :host([data-du-overlay-managed]) ::slotted(:not([data-du-overlay-active-owner])) {
    display: none !important;
  }

  :host([data-du-overlay-managed]) ::slotted([data-du-overlay-releasing]) {
    pointer-events: none !important;
  }

  :host([data-du-overlay-active]) ::slotted(*) {
    pointer-events: auto;
  }

  :host([appear][data-du-overlay-active]:not([closing])) .du-overlay__backdrop {
    animation: du-overlay-backdrop-appear
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
  }

  :host([appear][closing]) .du-overlay__backdrop {
    animation: du-overlay-backdrop-exit
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease forwards;
  }

  :host([appear][data-du-overlay-active]:not([closing])) ::slotted(:not(du-popup)) {
    animation: du-overlay-content-appear
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
  }

  :host([appear][closing]) ::slotted(:not(du-popup)) {
    animation: du-overlay-content-exit
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease forwards;
  }

  :host([appear][data-du-overlay-active]:not([closing]))
    ::slotted([data-du-overlay-releasing]:not(du-popup)) {
    animation: du-overlay-content-exit
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease forwards;
  }

  @keyframes du-overlay-backdrop-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes du-overlay-backdrop-exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes du-overlay-content-appear {
    from {
      opacity: 0;
      transform: translateY(-4%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes du-overlay-content-exit {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4%);
    }
  }

  @media (max-width: 560px) {
    :host([data-du-overlay-managed]) .du-overlay__content {
      padding: 16px;
    }
  }
`,Ui];var Ou=Object.defineProperty,rs=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Ou(e,t,s),s};const Wi=new WeakMap,el="du-overlay-animation-keyframes";function Du(r){if(r.getElementById(el))return;const e=r.createElement("style");e.id=el,e.textContent=`
@keyframes du-overlay-content-appear {
  from { opacity: 0; transform: translateY(-4%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes du-overlay-content-exit {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-4%); }
}
`,(r.head??r.documentElement).append(e)}function tl(r=document){const e=Wi.get(r);if(e!=null&&e.isConnected)return e;const t=r.querySelector("du-overlay");if(t)return Wi.set(r,t),t;const i=r.createElement("du-overlay");return i.dataset.duOverlaySingleton="",(r.body??r.documentElement).appendChild(i),Wi.set(r,i),i}const na=class na extends A{constructor(){super(...arguments);w(this,U);w(this,qt);w(this,Xt);w(this,mt);w(this,gt);w(this,Ei);w(this,Kt);w(this,lr);w(this,dr);this.open=!1,this.appear=!1,this.closing=!1,this.disabled=!1,d(this,U,[]),d(this,qt,!1),d(this,Xt,0),d(this,Kt,""),d(this,dr,!1)}get activeCount(){return Number(this.open)+n(this,U).filter(t=>!t.releasing).length}get effectiveRenderAt(){var t;return((t=n(this,U).at(-1))==null?void 0:t.options.renderAt)??this.renderAt??"normal"}connectedCallback(){super.connectedCallback(),Du(this.ownerDocument);const t=Wi.get(this.ownerDocument);t&&t!==this&&t.isConnected&&t.removeForReplacement(),Wi.set(this.ownerDocument,this),this.syncActiveState()}updated(t){t.has("open")&&this.syncActiveState(),(t.has("open")||t.has("renderAt"))&&!n(this,U).length&&this.syncTopLayer(this.open&&this.effectiveRenderAt==="top-level")}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{var t,i;this.isConnected||(this.clearClosingFallback(),this.teardownTopLayer(),(t=n(this,mt))==null||t.call(this),d(this,mt,void 0),(i=n(this,gt))==null||i.call(this),d(this,gt,void 0),d(this,Ei,void 0),d(this,Kt,""),Wi.get(this.ownerDocument)===this&&Wi.delete(this.ownerDocument))})}claim(t,i){const s=n(this,U).find(o=>o.owner===t);if(s){s.options=i,s.releasing=!1,t.removeAttribute("data-du-overlay-releasing"),s===n(this,U).at(-1)&&this.syncActiveOwner(),this.syncActiveState();return}n(this,lr)||d(this,lr,{appear:this.appear,position:this.style.position,zIndex:this.style.zIndex}),n(this,U).push({owner:t,options:i,releasing:!1}),this.syncActiveOwner(),this.syncActiveState()}release(t){const i=n(this,U).findIndex(a=>a.owner===t);if(i<0)return!1;const s=n(this,U)[i];return s.releasing?s.options.appear:!(i===n(this,U).length-1)||!s.options.appear?(this.completeRelease(t),!1):(s.releasing=!0,t.setAttribute("data-du-overlay-releasing",""),this.syncActiveState(),!0)}completeRelease(t){const i=n(this,U).findIndex(s=>s.owner===t);if(!(i<0)){if(n(this,U).splice(i,1),t.removeAttribute("data-du-overlay-owner"),t.removeAttribute("data-du-overlay-active-owner"),t.removeAttribute("data-du-overlay-releasing"),t.dispatchEvent(new CustomEvent("du-overlay-close-end")),this.syncActiveState(),n(this,U).length){this.syncActiveOwner();return}(n(this,qt)||!this.closing)&&this.finishManagedSession()}}syncActiveState(){const t=this.activeCount>0;if(this.dataset.duOverlayActiveCount=String(this.activeCount),t!==n(this,qt)){if(d(this,qt,t),t){this.clearClosingFallback(),this.setClosing(!1),this.toggleAttribute("data-du-overlay-active",!0),this.syncTopLayer(this.effectiveRenderAt==="top-level");return}if(this.appear){this.setClosing(!0),this.toggleAttribute("data-du-overlay-active",!1),this.armClosingFallback();return}this.toggleAttribute("data-du-overlay-active",!1),this.finishClosing()}}setClosing(t){this.closing=t,this.toggleAttribute("closing",t)}syncActiveOwner(){var s,o,a;const t=n(this,U).at(-1);if(!t)return;this.toggleAttribute("data-du-overlay-nonmodal",t.owner.hasAttribute("data-du-overlay-nonmodal"));for(const l of n(this,U))l.owner.setAttribute("data-du-overlay-owner",""),l.owner.toggleAttribute("data-du-overlay-active-owner",l===t);n(this,Ei)!==t.owner&&((s=n(this,gt))==null||s.call(this),d(this,gt,Sr(t.owner,this)),d(this,Ei,t.owner));const i=((o=t.options.parent)==null?void 0:o.trim())??"";(!n(this,mt)||n(this,Kt)!==i)&&((a=n(this,mt))==null||a.call(this),d(this,mt,Ds(this,i)),d(this,Kt,i)),this.toggleAttribute("data-du-overlay-managed",!0),this.style.position="fixed",this.style.zIndex=String(t.options.zIndex??ui.popup),this.appear=t.options.appear,this.syncTopLayer((t.options.renderAt??"normal")==="top-level")}syncTopLayer(t){if(t){Cr(this),d(this,dr,!0);return}this.teardownTopLayer()}teardownTopLayer(){n(this,dr)&&(Bi(this,{clearPosition:!1}),d(this,dr,!1))}removeForReplacement(){var t;for(const{owner:i}of n(this,U))i.dispatchEvent(new CustomEvent("du-overlay-replaced"));d(this,U,[]),this.open=!1,d(this,qt,!1),this.clearClosingFallback(),this.teardownTopLayer(),d(this,mt,void 0),(t=n(this,gt))==null||t.call(this),d(this,gt,void 0),d(this,Ei,void 0),d(this,Kt,""),this.removeAttribute("data-du-overlay-active"),this.removeAttribute("data-du-overlay-nonmodal"),this.setClosing(!1),this.remove()}clearClosingFallback(){n(this,Xt)&&(window.clearTimeout(n(this,Xt)),d(this,Xt,0))}armClosingFallback(){this.clearClosingFallback(),d(this,Xt,window.setTimeout(()=>{d(this,Xt,0),this.finishClosing()},500))}finishClosing(){if(this.clearClosingFallback(),n(this,qt))return;this.setClosing(!1);const t=n(this,U).map(i=>i.owner);for(const i of t)this.completeRelease(i);this.finishManagedSession()}finishManagedSession(){var i,s;if(n(this,U).length)return;(i=n(this,mt))==null||i.call(this),d(this,mt,void 0),(s=n(this,gt))==null||s.call(this),d(this,gt,void 0),d(this,Ei,void 0),d(this,Kt,""),this.removeAttribute("data-du-overlay-managed"),this.syncTopLayer(this.open&&this.effectiveRenderAt==="top-level"),this.removeAttribute("data-du-overlay-nonmodal");const t=n(this,lr);d(this,lr,void 0),t&&(this.appear=t.appear,t.position?this.style.position=t.position:this.style.removeProperty("position"),t.zIndex?this.style.zIndex=t.zIndex:this.style.removeProperty("z-index"))}onBackdropAnimationEnd(t){t.animationName.includes("du-overlay-backdrop-exit")&&this.finishClosing()}onBackdropClick(){var t;(t=n(this,U).at(-1))==null||t.owner.dispatchEvent(new CustomEvent("du-overlay-click"))}render(){return u`
      <div
        class="du-overlay__backdrop"
        part="backdrop"
        aria-hidden="true"
        @click=${this.onBackdropClick}
        @animationend=${this.onBackdropAnimationEnd}
      ></div>
      <div class="du-overlay__content" part="content">
        <slot></slot>
      </div>
    `}};U=new WeakMap,qt=new WeakMap,Xt=new WeakMap,mt=new WeakMap,gt=new WeakMap,Ei=new WeakMap,Kt=new WeakMap,lr=new WeakMap,dr=new WeakMap,na.styles=Au;let Nt=na;rs([m()],Nt.prototype,"open"),rs([m()],Nt.prototype,"appear"),rs([m()],Nt.prototype,"closing"),rs([m()],Nt.prototype,"disabled"),rs([zt(Lt,{attribute:"render-at"})],Nt.prototype,"renderAt");function Ao(){k("du-overlay",Nt)}const Iu=_`
  :host {
    display: none;
    flex: 0 1 auto;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    min-width: 0;
    min-height: 0;
    pointer-events: none;
  }

  ${z(X("open"))},
  ${z(X("closing"))} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${z(X("open"))} {
    pointer-events: auto;
  }

  .du-popup {
    --du-popup-radius: var(--du-radius-round-corner-xxl, 28px);
    --du-popup-shadow: var(--du-shadow-l5);
    --du-popup-backdrop-blur: var(--du-shadow-l5-backdrop-blur, 100px);
    --du-popup-surface: var(--du-fill-p7);
    --du-popup-stroke: var(--du-gradient-stroke-dialog-card);
    --du-popup-text: var(--du-on-l-c2);
    position: relative;
    box-sizing: border-box;
    z-index: 1;
    /* 按内容收缩，并由 max-height 限制在蒙层内。中间行吃剩余高度，du-scroll-area 才能滚动。 */
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    flex: 0 1 auto;
    width: 500px;
    height: fit-content;
    max-width: 100%;
    max-height: 100%;
    min-height: 0;
    overflow: hidden;
    color: var(--du-popup-text);
    background: var(--du-popup-surface);
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: var(--du-popup-radius);
    box-shadow: var(--du-popup-shadow);
    backdrop-filter: blur(var(--du-popup-backdrop-blur));
    -webkit-backdrop-filter: blur(var(--du-popup-backdrop-blur));
  }

  :host([appear][open]:not([closing])) .du-popup {
    animation: du-popup-content-appear
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease;
  }

  :host([appear][closing]) .du-popup {
    animation: du-popup-content-exit
      var(--du-duration-normal, var(--du-duration, 0.3s)) ease forwards;
  }

  .du-popup::before {
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: var(--du-popup-stroke);
    content: '';
    pointer-events: none;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }

  :host([size='600']) .du-popup {
    width: 600px;
  }

  :host([size='700']) .du-popup {
    width: 700px;
  }

  :host([size='800']) .du-popup {
    width: 800px;
  }

  :host([size='custom']) .du-popup {
    width: var(--du-popup-width, 500px);
  }

  .du-popup__header {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 48px;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    padding: 10px 12px 10px 24px;
  }

  .du-popup__title {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: var(--du-popup-text);
    font-size: var(--du-typo-headline-semibold-l-size, 16px);
    line-height: var(--du-typo-headline-semibold-l-line-height, 22px);
    letter-spacing: var(--du-typo-headline-semibold-l-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-popup__close {
    display: inline-flex;
    flex: 0 0 28px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    color: var(--du-popup-text);
    font: inherit;
    background: var(--du-glass-btn);
    border: 0;
    border-radius: var(--du-radius-round-corner-full, 9999px);
    cursor: pointer;
  }

  .du-popup__close:focus-visible {
    outline: none;
  }

  .du-popup__close:active {
    opacity: 0.72;
  }

  .du-popup__body {
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: 24px;
    overflow: hidden;
    color: var(--du-popup-text);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-popup__body > du-scroll-area {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .du-popup__footer {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 auto;
    min-height: 80px;
    padding: 16px 24px 24px;
  }

  .du-popup__footer[hidden] {
    display: none;
  }

  .du-popup__footer > slot[name='footer'] {
    display: flex;
    flex: 1 1 auto;
    gap: 8px;
    min-width: 0;
  }

  .du-popup__footer > slot[name='footer']::slotted(du-button),
  .du-popup__footer > slot[name='footer']::slotted(button) {
    flex: 1 1 0;
    min-width: 0;
  }

  @media (max-width: 560px) {
    .du-popup__header {
      padding-inline-start: 16px;
    }

    .du-popup__body {
      padding: 16px;
    }

    .du-popup__footer {
      padding: 16px;
    }
  }

  @keyframes du-popup-content-appear {
    from {
      opacity: 0;
      transform: translateY(-4%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes du-popup-content-exit {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4%);
    }
  }

`;var Mu=Object.defineProperty,Ae=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Mu(e,t,s),s};const zu=["500","600","700","800"],la=class la extends hi{constructor(){super(...arguments);w(this,Zt);w(this,Jt);w(this,hr);w(this,Ti);w(this,ur);w(this,Be);this.testIds={},this.open=!1,this.appear=!0,this.size="500",this.closeable=!0,this.closeOnOverlay=!1,this.parent="",this.scrollable=!0,this.closing=!1,this.passive=!1,this.hasFooter=!1,d(this,Zt,0),d(this,Jt,!1),d(this,hr,!1),d(this,Ti,!1),d(this,ur,!1),d(this,Be,ts(this,ui.popup,()=>this.zIndex,t=>{this.style.setProperty("--du-layer-z-index",String(t)),this.open&&this.overlay&&this.overlay.claim(this,{appear:this.appear,parent:this.parent,zIndex:t,renderAt:this.effectiveRenderAt})},{defaultRenderAt:"normal",readRenderAt:()=>this.renderAt,onRenderAtChange:t=>{this.open&&this.overlay&&this.overlay.claim(this,{appear:this.appear,parent:this.parent,zIndex:this.effectiveZIndex,renderAt:t})}})),this.onPopupAnimationEnd=t=>{(t.target===this&&t.animationName.includes("du-overlay-content-exit")||t.animationName.includes("du-popup-content-exit"))&&this.finishClosing()},this.onOverlayClick=()=>{this.closeOnOverlay&&this.close("overlay")},this.onOverlayCloseEnd=()=>{this.finishClosing()},this.onOverlayReplaced=t=>{t.stopPropagation(),this.open&&(d(this,Ti,!0),this.close("programmatic"))}}get resolvedTitle(){return this.resolveComponentTitle(this.popupTitle)}get effectiveZIndex(){return n(this,Be).effectiveZIndex}get effectiveRenderAt(){return n(this,Be).effectiveRenderAt}connectedCallback(){super.connectedCallback(),n(this,Be).connect(),this.addEventListener("animationend",this.onPopupAnimationEnd),this.addEventListener("du-overlay-click",this.onOverlayClick),this.addEventListener("du-overlay-close-end",this.onOverlayCloseEnd),this.addEventListener("du-overlay-replaced",this.onOverlayReplaced),this.updateComplete.then(()=>{this.isConnected&&this.open&&this.syncPortal()})}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{var t,i,s;this.isConnected||(this.clearClosingFallback(),d(this,Jt,!1),(t=this.overlay)==null||t.completeRelease(this),(i=this.detachPortal)==null||i.call(this),this.detachPortal=void 0,(s=this.releasePortalTheme)==null||s.call(this),this.releasePortalTheme=void 0,this.overlay=void 0,this.removeEventListener("animationend",this.onPopupAnimationEnd),this.removeEventListener("du-overlay-click",this.onOverlayClick),this.removeEventListener("du-overlay-close-end",this.onOverlayCloseEnd),this.removeEventListener("du-overlay-replaced",this.onOverlayReplaced),K(this).clearOnDisconnect(),n(this,Be).clearOnDisconnect())})}willUpdate(t){if(!t.has("open"))return;const i=!!t.get("open"),s=K(this),o=()=>this.close("programmatic");if(this.open&&!i){if(!s.requestOpen("popup",o)){this.open=!1;return}d(this,ur,!0),s.notify("open","popup",o),this.appear&&s.notify("appear","popup",o)}else!this.open&&i&&n(this,ur)&&(d(this,ur,!1),s.notify("close","popup"))}firstUpdated(){this.syncFooterSlot(),this.syncPortal()}updated(t){var i,s;if((t.has("zIndex")||t.has("renderAt"))&&n(this,Be).sync(),t.has("open")){const o=!!t.get("open");o&&!this.open&&d(this,Jt,!0),this.open?(d(this,Jt,!1),this.clearClosingFallback(),d(this,Ti,!1),this.closing=!1,this.syncPortal()):n(this,Ti)?(d(this,Ti,!1),this.clearClosingFallback(),this.closing=!1,this.syncPortal()):o&&this.appear?(this.closing=!0,(i=this.overlay)!=null&&i.release(this)?this.armClosingFallback():this.finishClosing()):(this.clearClosingFallback(),this.closing=!1,(s=this.overlay)==null||s.release(this),this.syncPortal()),this.emitOpenChange(),this.scheduleCloseEnd()}else this.open&&(t.has("parent")||t.has("zIndex")||t.has("renderAt")||t.has("appear"))?this.syncPortal():t.has("closing")&&!this.closing&&(this.syncPortal(),this.scheduleCloseEnd())}close(t="programmatic"){if(!this.open)return;const i=!1;this.passive?this.emitOpenChange(i):this.open=i,this.emit("close",{reason:t})}restorePortalBeforeUnmount(){var t,i;(t=this.detachPortal)==null||t.call(this),this.detachPortal=void 0,(i=this.releasePortalTheme)==null||i.call(this),this.releasePortalTheme=void 0,n(this,Be).releasePortal()}emitOpenChange(t=this.open){this.emit("open-change",{open:t}),this.emit("update:open",t)}syncFooterSlot(){const t=this.renderRoot.querySelector('slot[name="footer"]');this.hasFooter=!!(t!=null&&t.assignedNodes({flatten:!0}).some(i=>Ru(i)))}syncPortal(){var t,i,s;if(this.open){if(!this.isConnected)return;const o=tl(this.ownerDocument);if(this.releasePortalTheme??(this.releasePortalTheme=Sr(this)),this.parentNode!==o){(t=this.detachPortal)==null||t.call(this);const a=K(this);a.setPortaling(!0),n(this,Be).beginPortal();try{this.detachPortal=Ds(this,o)}finally{a.setPortaling(!1),n(this,Be).endPortal()}}this.overlay=o,this.setAttribute("data-du-overlay-owner",""),o.claim(this,{appear:this.appear,parent:this.parent,zIndex:this.effectiveZIndex,renderAt:this.effectiveRenderAt});return}this.closing||((i=this.detachPortal)==null||i.call(this),this.detachPortal=void 0,(s=this.releasePortalTheme)==null||s.call(this),this.releasePortalTheme=void 0,n(this,Be).releasePortal(),this.removeAttribute("data-du-overlay-owner"),this.overlay=void 0)}clearClosingFallback(){n(this,Zt)&&(window.clearTimeout(n(this,Zt)),d(this,Zt,0))}armClosingFallback(){this.clearClosingFallback(),d(this,Zt,window.setTimeout(()=>{d(this,Zt,0),this.closing&&!this.open&&this.finishClosing()},500))}finishClosing(){var t;this.clearClosingFallback(),this.closing&&(this.closing=!1,(t=this.overlay)==null||t.completeRelease(this),this.syncPortal(),this.scheduleCloseEnd())}scheduleCloseEnd(){n(this,hr)||!this.canEmitCloseEnd()||(d(this,hr,!0),queueMicrotask(()=>{d(this,hr,!1),this.canEmitCloseEnd()&&(d(this,Jt,!1),this.emit("close-end"))}))}canEmitCloseEnd(){return n(this,Jt)&&!this.open&&!this.closing&&!this.detachPortal&&!this.overlay&&this.isConnected}onFooterSlotChange(){this.syncFooterSlot()}onFooterClick(t){t.composedPath().find(s=>s instanceof HTMLElement&&s.hasAttribute("data-popup-close"))&&this.close("footer")}onCloseClick(){this.close("close-button")}get popupWidthStyle(){if(zu.includes(this.size)||this.size==="custom")return{};const t=kr(this.size);return t?{width:t}:{}}render(){const t=this.scrollable?u`<du-scroll-area part="scroll"><slot></slot></du-scroll-area>`:u`<slot></slot>`;return u`
      <section
        class="du-popup"
        part="popup"
        style=${ne(this.popupWidthStyle)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="du-popup-title"
        @animationend=${this.onPopupAnimationEnd}
      >
        <header class="du-popup__header" part="header">
          <h2 class="du-popup__title" part="title" id="du-popup-title">
            <slot name="title">${this.resolvedTitle}</slot>
          </h2>
          ${this.closeable?u`
                <button
                  class="du-popup__close"
                  part="close"
                  data-testid=${ni(this.testIds,"close")}
                  type="button"
                  aria-label="关闭"
                  @click=${this.onCloseClick}
                >
                  <du-icon name="icon-close_linear" size="16" decorative></du-icon>
                </button>
              `:""}
        </header>
        <div class="du-popup__body" part="body">${t}</div>
        <footer
          class="du-popup__footer"
          part="footer"
          ?hidden=${!this.hasFooter}
          @click=${this.onFooterClick}
        >
          <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
        </footer>
      </section>
    `}};Zt=new WeakMap,Jt=new WeakMap,hr=new WeakMap,Ti=new WeakMap,ur=new WeakMap,Be=new WeakMap,la.styles=Iu;let ie=la;Ae([wr({},{attribute:"test-ids",reflect:!1})],ie.prototype,"testIds"),Ae([m()],ie.prototype,"open"),Ae([m(!0)],ie.prototype,"appear"),Ae([y("500")],ie.prototype,"size"),Ae([st({attribute:"popup-title"})],ie.prototype,"popupTitle"),Ae([m(!0)],ie.prototype,"closeable"),Ae([m(!1,{attribute:"close-on-overlay"})],ie.prototype,"closeOnOverlay"),Ae([y()],ie.prototype,"parent"),Ae([yt({attribute:"z-index",integer:!0})],ie.prototype,"zIndex"),Ae([zt(Lt,{attribute:"render-at"})],ie.prototype,"renderAt"),Ae([m(!0,{attribute:"scrollable",reflect:!1})],ie.prototype,"scrollable"),Ae([m()],ie.prototype,"closing"),Ae([m()],ie.prototype,"passive"),Ae([S()],ie.prototype,"hasFooter");function Ru(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function Oo(){oe(),Ao(),Er(),k("du-popup",ie)}const Lu=_`
  :host {
    display: inline-flex;
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  :host([block]) {
    display: flex;
    width: 100%;
  }

  .du-button {
    --du-button-bg: var(--du-on-l-c2);
    --du-button-fg: var(--du-on-d-c2);
    --du-button-border: transparent;
    --du-button-state-color: transparent;
    --du-button-state-opacity: 0;
    --du-button-brand-surface: var(--du-bg-b3);
    --du-button-glass-overlay: var(--du-glass-btn);
    --du-button-selected-shadow:
      0 4px 27px rgba(0, 0, 0, 0.06),
      inset 0 -1px 4px rgba(255, 255, 255, 0.4),
      inset 0 -2px 8px rgba(255, 255, 255, 0.4);
    --du-button-radius: 40px;
    --du-button-padding-block: 8px;
    --du-button-padding-inline: 12px;
    --du-button-height: 40px;
    --du-button-shadow: none;
    --du-button-surface-opacity: 0;
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 100%;
    height: var(--du-button-height);
    padding: var(--du-button-padding-block) var(--du-button-padding-inline);
    overflow: hidden;
    color: var(--du-button-fg);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    background: var(--du-button-bg);
    border: 1px solid var(--du-button-border);
    border-radius: var(--du-button-radius);
    box-shadow: var(--du-button-shadow);
    white-space: nowrap;
    cursor: pointer;
    isolation: isolate;
    transition:
      background-color var(--du-duration-normal, 0.2s) ease,
      border-color var(--du-duration-normal, 0.2s) ease,
      color var(--du-duration-normal, 0.2s) ease,
      opacity var(--du-duration-normal, 0.2s) ease,
      box-shadow var(--du-duration-normal, 0.2s) ease;
    ${te}
  }

  :host([block]) .du-button {
    width: 100%;
  }

  .du-button__surface,
  .du-button__state {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
  }

  .du-button__surface {
    opacity: var(--du-button-surface-opacity);
    background: var(--du-button-brand-surface);
    backdrop-filter: blur(10px);
    mix-blend-mode: overlay;
  }

  .du-button__state {
    opacity: var(--du-button-state-opacity);
    background: var(--du-button-state-color);
    transition: opacity var(--du-duration-normal, 0.2s) ease;
  }

  .du-button du-layout {
    position: relative;
    z-index: 1;
    width: auto;
    max-width: 100%;
    height: 100%;
    min-height: 0;
    font: inherit;
    line-height: inherit;
  }

  .du-button__label {
    min-width: 0;
  }

  :host([text-overflow='clamp']) .du-button du-layout {
    white-space: normal;
  }

  /* size */
  :host([size='small']:not([variant='keyboard'])) .du-button {
    --du-button-height: 28px;
    --du-button-padding-block: 4px;
    --du-button-padding-inline: 8px;
  }

  :host([size='mini']:not([variant='keyboard'])) .du-button {
    --du-button-height: 22px;
    --du-button-padding-block: 2px;
    --du-button-padding-inline: 8px;
  }

  /* variant: primary */
  :host([variant='primary']) .du-button {
    --du-button-bg: var(--du-on-l-c2);
    --du-button-fg: var(--du-on-d-c2);
  }

  /* variant: secondary */
  :host([variant='secondary']) .du-button {
    --du-button-bg: var(--du-fill-p1);
    --du-button-fg: var(--du-on-l-c2);
  }

  /* variant: brand */
  :host([variant='brand']) .du-button {
    --du-button-bg: var(--du-accent-blue);
    --du-button-fg: var(--du-on-d-c1);
  }

  :host([variant='brand'][size='small']) .du-button {
    --du-button-surface-opacity: 1;
  }

  /* variant: danger */
  :host([variant='danger']) .du-button {
    --du-button-bg: var(--du-accent-red);
    --du-button-fg: var(--du-on-d-c1);
  }

  /* variant: text */
  :host([variant='text']) .du-button {
    --du-button-bg: transparent;
    --du-button-fg: var(--du-on-l-c2);
    --du-button-radius: 0px;
    --du-button-padding-block: 0px;
    --du-button-padding-inline: 0px;
    --du-button-height: auto;
    border: none;
  }

  /* variant: keyboard */
  :host([variant='keyboard']) .du-button {
    --du-button-bg: var(--du-fill-p1);
    --du-button-fg: var(--du-on-l-c2);
    --du-button-radius: 100px;
    --du-button-padding-block: 4px;
    --du-button-padding-inline: 16px;
    --du-button-height: 40px;
  }

  :host([variant='keyboard'][selected]) .du-button {
    --du-button-bg: transparent;
    box-shadow: var(--du-button-selected-shadow);
  }

  :host([variant='keyboard'][selected]) .du-button::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--du-button-glass-overlay);
    mix-blend-mode: luminosity;
    pointer-events: none;
  }

  /* hover (distinct from active) */
  :host([variant='primary']) .du-button:hover:not(:disabled):not(:active) {
    --du-button-state-color: var(--du-state-hover-strong);
    --du-button-state-opacity: 1;
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='secondary']) .du-button:hover:not(:disabled):not(:active) {
    --du-button-bg: var(--du-state-hover);
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='brand']) .du-button:hover:not(:disabled):not(:active),
  :host([variant='danger']) .du-button:hover:not(:disabled):not(:active) {
    --du-button-state-color: var(--du-state-hover);
    --du-button-state-opacity: 1;
    --du-button-surface-opacity: 0;
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='keyboard']:not([selected])) .du-button:hover:not(:disabled):not(:active) {
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='text']) .du-button:hover:not(:disabled):not(:active) {
    --du-button-fg: var(--du-accent-blue);
  }

  /* active / pressed */
  :host([variant='primary']) .du-button:active:not(:disabled) {
    --du-button-state-color: var(--du-state-press-strong);
    --du-button-state-opacity: 1;
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='secondary']) .du-button:active:not(:disabled) {
    --du-button-bg: var(--du-state-press);
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='brand']) .du-button:active:not(:disabled),
  :host([variant='danger']) .du-button:active:not(:disabled) {
    --du-button-state-color: var(--du-state-press);
    --du-button-state-opacity: 1;
    --du-button-surface-opacity: 0;
    --du-button-border: var(--du-fill-p-3);
  }

  :host([variant='text']) .du-button:active:not(:disabled) {
    --du-button-fg: var(--du-accent-blue);
    opacity: 0.6;
  }

  .du-button:focus-visible {
    outline: none;
  }

  .du-button:disabled,
  .du-button[data-loading='true'] {
    cursor: not-allowed;
  }

  :host([variant='text']) .du-button:disabled,
  :host([variant='text']) .du-button[data-loading='true'],
  :host(:not([variant='text'])) .du-button:disabled,
  :host(:not([variant='text'])) .du-button[data-loading='true'] {
    opacity: var(--du-disabled-opacity, 0.3);
  }

  :host([variant='text']) .du-button:disabled > *,
  :host([variant='text']) .du-button[data-loading='true'] > *,
  :host(:not([variant='text'])) .du-button:disabled > *,
  :host(:not([variant='text'])) .du-button[data-loading='true'] > * {
    --du-disabled-opacity: 1;
  }
`;var Nu=Object.defineProperty,qe=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Nu(e,t,s),s};const Hu=["primary","secondary","brand","danger","text","keyboard"],Fu=["medium","small","mini"],Vu=["button","submit","reset"],da=class da extends A{constructor(){super(...arguments),this.testId="",this.variant="primary",this.size="medium",this.icon="",this.selected=!1,this.disabled=!1,this.loading=!1,this.block=!1,this.textOverflow="ellipsis",this.lines=1,this.type="button"}get isInteractiveDisabled(){return this.isOwnDisabled||this.readOwnBoolean("loading")}get layoutGap(){return"4"}get iconSize(){return"16"}get showBuiltInStartIcon(){return!!this.icon&&!this.loading}get clickDetail(){return{variant:this.variant,size:this.size,selected:this.selected}}handleClick(e){if(this.isInteractiveDisabled){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.emit("click",this.clickDetail)}render(){const e=this.readOwnBoolean("loading"),t=u`
      <span class="du-button__label" part="label">
        <slot></slot>
      </span>
    `,i=e?u`
          <du-loading-icon
            slot="start"
            size="16"
            variant="switch"
            label="loading"
          ></du-loading-icon>
        `:this.showBuiltInStartIcon?u`
            <du-icon
              slot="start"
              name=${this.icon}
              size=${this.iconSize}
              decorative
            ></du-icon>
          `:u`<slot name="start" slot="start"></slot>`;return u`
      <button
        class="du-button"
        part="button"
        data-testid=${ae(this.testId)}
        type=${this.type}
        .disabled=${this.isInteractiveDisabled}
        aria-busy=${e?"true":"false"}
        aria-pressed=${this.variant==="keyboard"?String(this.selected):b}
        data-loading=${e?"true":b}
        @click=${this.handleClick}
      >
        <span class="du-button__surface" aria-hidden="true"></span>
        <span class="du-button__state" aria-hidden="true"></span>
        <du-layout
          part="layout"
          gap=${this.layoutGap}
          width="auto"
          height="100%"
          text-overflow=${this.textOverflow}
          .overflowHelpInfo=${this.overflowHelpInfo}
          lines=${this.lines}
        >
          ${i}
          ${t}
          <slot name="end" slot="end"></slot>
        </du-layout>
      </button>
    `}};da.styles=Lu;let me=da;qe([y("",{attribute:"test-id",reflect:!1})],me.prototype,"testId"),qe([$(Hu,"primary")],me.prototype,"variant"),qe([$(Fu,"medium")],me.prototype,"size"),qe([y()],me.prototype,"icon"),qe([m()],me.prototype,"selected"),qe([m()],me.prototype,"disabled"),qe([m()],me.prototype,"loading"),qe([m()],me.prototype,"block"),qe([$($o,"ellipsis",{attribute:"text-overflow"})],me.prototype,"textOverflow"),qe([st({attribute:"overflow-help-info"})],me.prototype,"overflowHelpInfo"),qe([T(1,{integer:!0,min:1})],me.prototype,"lines"),qe([$(Vu,"button")],me.prototype,"type");function Do(){oe(),xe(),$s(),k("du-button",me)}const Bu=_`
  :host {
    display: none;
    flex: 0 1 auto;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }

  ${z(X("open"))},
  ${z(X("closing"))} {
    display: block;
  }

  ${z(X("open"))} {
    pointer-events: auto;
  }

  :host(:not([placement])),
  :host([placement^='top-']) {
    align-self: flex-start;
  }

  :host([placement^='bottom-']) {
    align-self: flex-end;
  }

  :host([placement$='-left']) {
    margin-right: auto;
  }

  :host(:not([placement])),
  :host([placement$='-right']) {
    margin-left: auto;
  }

  .du-popup-panel {
    box-sizing: border-box;
    width: 222px;
    height: 136px;
    max-width: 100%;
    max-height: 100%;
    min-width: 0;
    min-height: 0;
    padding: var(--du-gap-16, 16px);
    overflow: hidden;
    background: var(--du-fill-p7, rgba(255, 255, 255, 0.7));
    border-radius: var(--du-radius-round-corner-l, 16px);
  }

  .du-popup-panel[data-content='firmware-upgrade'] {
    backdrop-filter: blur(var(--du-popup-panel-upgrade-backdrop-blur, 8px));
    -webkit-backdrop-filter: blur(var(--du-popup-panel-upgrade-backdrop-blur, 8px));
  }

  .du-popup-panel[data-content='firmware-result'] {
    backdrop-filter: blur(var(--du-popup-panel-result-backdrop-blur, 16px));
    -webkit-backdrop-filter: blur(var(--du-popup-panel-result-backdrop-blur, 16px));
  }

  .du-popup-panel > slot[hidden] {
    display: none;
  }

  .du-popup-panel__firmware-upgrade,
  .du-popup-panel__firmware-result {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .du-popup-panel__firmware-upgrade {
    display: flex;
    flex-direction: column;
  }

  .du-popup-panel__firmware-result {
    display: flex;
    align-items: flex-start;
    gap: var(--du-gap-16, 16px);
  }

  .du-popup-panel__result-icon {
    flex: 0 0 24px;
  }

  .du-popup-panel__result-copy {
    flex: 1 1 auto;
    min-width: 0;
  }

  .du-popup-panel__result-close {
    display: inline-flex;
    flex: 0 0 20px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
    color: var(--du-on-l-c2);
    background: transparent;
    border: 0;
    border-radius: var(--du-radius-round-corner-full, 9999px);
    cursor: pointer;
    appearance: none;
  }

  .du-popup-panel__result-close:focus-visible {
    outline: none;
  }

  .du-popup-panel__title,
  .du-popup-panel__description {
    display: block;
    margin: 0;
  }

  .du-popup-panel__title {
    overflow: hidden;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-semibold-weight, 600);
    overflow-wrap: anywhere;
  }

  .du-popup-panel__description {
    margin-top: var(--du-gap-4, 4px);
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    overflow-wrap: anywhere;
  }

  .du-popup-panel__firmware-result .du-popup-panel__title {
    font-size: var(--du-typo-headline-semibold-m-size, 14px);
    line-height: var(--du-typo-headline-semibold-m-line-height, 20px);
  }

  .du-popup-panel__firmware-result .du-popup-panel__description {
    margin-top: var(--du-gap-8, 8px);
  }

  .du-popup-panel__actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 24px;
    gap: var(--du-gap-12, 12px);
    margin-top: var(--du-gap-8, 8px);
  }

  .du-popup-panel__actions du-button {
    flex: 1 1 0;
    min-width: 0;
  }

  .du-popup-panel__actions du-button::part(button) {
    height: 26px;
  }

  .du-popup-panel__actions[data-block='true'] {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    gap: 6px;
  }
`;var Uu=Object.defineProperty,ji=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Uu(e,t,s),s};const Gu=["top-left","top-center","top-right","center-left","center","center-right","bottom-left","bottom-center","bottom-right"],Wu="222px",ju="320px",ha=class ha extends ie{constructor(){super(...arguments),this.closeable=!1,this.scrollable=!1,this.placement="top-right",this.width="222px",this.height="136px",this.background="",this.firmwareResult=null,this.firmwareUpgradeInfo=null,this.hasDefaultSlot=!1,this.onConfirm=e=>{var t;e.stopPropagation(),(t=this.firmwareUpgradeInfo)==null||t.onConfirm(),this.close("footer")},this.onCancel=e=>{var t;e.stopPropagation(),(t=this.firmwareUpgradeInfo)==null||t.onCancel(),this.close("footer")},this.onResultClose=e=>{e.preventDefault(),e.stopPropagation(),this.close("close-button")}}connectedCallback(){this.setAttribute("data-du-overlay-nonmodal",""),super.connectedCallback()}firstUpdated(){super.firstUpdated(),this.syncDefaultSlot()}syncDefaultSlot(){const e=this.renderRoot.querySelector("slot:not([name])"),t=!!(e!=null&&e.assignedNodes({flatten:!0}).some(i=>Yu(i)));this.hasDefaultSlot!==t&&(this.hasDefaultSlot=t)}renderFirmwareUpgradeInfo(){const e=this.firmwareUpgradeInfo;return e?u`
      <div class="du-popup-panel__firmware-upgrade" part="firmware-upgrade">
        <strong class="du-popup-panel__title" part="title">${e.title}</strong>
        <p class="du-popup-panel__description" part="description">
          ${e.description}
        </p>
        <div
          class="du-popup-panel__actions"
          part="actions"
          data-block=${e.btnBlock?"true":"false"}
        >
          <du-button
            size="small"
            variant="primary"
            test-id=${ni(this.testIds,"confirm")}
            block
            @click=${this.onConfirm}
          >${e.confirmText}</du-button>
          <du-button
            size="small"
            variant="secondary"
            test-id=${ni(this.testIds,"cancel")}
            block
            @click=${this.onCancel}
          >${e.cancelText}</du-button>
        </div>
      </div>
    `:b}renderFirmwareResult(){const e=this.firmwareResult;return e?u`
      <div
        class="du-popup-panel__firmware-result"
        part="firmware-result"
        role=${e.type==="error"?"alert":"status"}
      >
        <du-toast-icon
          class="du-popup-panel__result-icon"
          part="result-icon"
          type=${e.type}
        ></du-toast-icon>
        <div class="du-popup-panel__result-copy">
          <strong class="du-popup-panel__title" part="title">${e.title}</strong>
          <p class="du-popup-panel__description" part="description">
            ${e.description}
          </p>
        </div>
        <button
          class="du-popup-panel__result-close"
          part="close"
          data-testid=${ni(this.testIds,"close")}
          type="button"
          aria-label="关闭"
          @click=${this.onResultClose}
        >
          <du-icon name="icon-close_linear" size="20" decorative></du-icon>
        </button>
      </div>
    `:b}render(){const e=this.hasDefaultSlot?"slot":this.firmwareUpgradeInfo?"firmware-upgrade":this.firmwareResult?"firmware-result":"slot",t=e==="firmware-upgrade"?Wu:e==="firmware-result"?ju:this.width,i=e.startsWith("firmware-")?"auto":this.height,s={...t.trim()?{width:t}:{},...i.trim()?{height:i}:{},...this.background.trim()?{background:this.background}:{}};return u`
      <section
        class="du-popup-panel"
        part="panel"
        data-content=${e}
        style=${ne(s)}
      >
        <slot ?hidden=${!this.hasDefaultSlot} @slotchange=${this.syncDefaultSlot}></slot>
        ${this.hasDefaultSlot?b:this.firmwareUpgradeInfo?this.renderFirmwareUpgradeInfo():this.renderFirmwareResult()}
      </section>
    `}};ha.styles=Bu;let ot=ha;ji([$(Gu,"top-right")],ot.prototype,"placement"),ji([y()],ot.prototype,"width"),ji([y()],ot.prototype,"height"),ji([y()],ot.prototype,"background"),ji([C({attribute:!1})],ot.prototype,"firmwareResult"),ji([C({attribute:!1})],ot.prototype,"firmwareUpgradeInfo"),ji([S()],ot.prototype,"hasDefaultSlot");function Yu(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function il(){Oo(),Do(),Es(),k("du-popup-panel",ot)}const qu=[_`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-width: 320px;
    min-height: 0;
    max-width: 100%;
  }

  :host([plain]) {
    min-width: 0;
  }

  :host([layout='focus-center']) {
    min-height: 100%;
  }

  .du-card {
    --du-card-radius: var(--du-radius-round-corner-l, 16px);
    --du-card-bg: var(--du-fill-p6);
    --du-card-shadow: var(--du-shadow-l2);
    --du-card-stroke: var(--du-gradient-stroke-dialog-card);
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-height: 0;
    overflow: hidden;
    color: var(--du-on-l-c2);
    background: var(--du-card-bg);
    border-radius: var(--du-card-radius);
    box-shadow: var(--du-card-shadow);
  }

  :host([layout='focus-center']) .du-card {
    min-height: 100%;
  }

  .du-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 1px;
    background: var(--du-card-stroke);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  .du-card > * {
    position: relative;
    z-index: 2;
  }

  :host([plain]) .du-card {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
  }

  :host([plain]) .du-card::before {
    content: none;
  }

  .du-card__scroll {
    flex: 1 1 0;
    width: 100%;
    min-height: 0;
  }

  .du-card__body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    min-width: 0;
    padding: var(--du-card-padding, 24px);
  }

  :host([layout='focus-center']) .du-card__body {
    min-height: 100%;
    padding-bottom: 0;
  }

  .du-card__body[data-has-header] .du-card__header {
    margin-bottom: 12px;
  }

  .du-card__focus-spacer {
    flex: auto;
    width: 100%;
    min-height: 0;
    pointer-events: none;
  }

  .du-card__header {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 0;
    width: 100%;
    min-width: 0;
  }

  .du-card__header[data-has-description] {
    gap: 8px;
  }

  .du-card__header[hidden] {
    display: none;
  }

  .du-card__title-row {
    --du-card-title-row-gap: 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--du-card-title-row-gap);
    width: 100%;
    min-width: 0;
    min-height: 22px;
  }

  /* 标题+次标题紧挨；spacer 吃剩余；挤满时标题 shrink 并省略 */
  .du-card__title {
    box-sizing: border-box;
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-headline-semibold-l-size, 16px);
    line-height: var(--du-typo-headline-semibold-l-line-height, 22px);
    letter-spacing: var(--du-typo-headline-semibold-l-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-card__title:not([data-has-content]),
  .du-card__title-row:not([data-has-content]) {
    display: none;
  }

  .du-card__title ::slotted(*) {
    display: block;
    overflow: hidden;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host([heading='small']) .du-card__title {
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-card__subtitle {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
  }

  .du-card__spacer {
    flex: 1 1 0;
    width: 0;
    min-width: 0;
  }

  /*
   * Empty spacer is a flex item, so gap applies on both sides and doubles the
   * space before actions. Pull actions back by one gap (same idea as layout wrap).
   */
  .du-card__spacer + .du-card__actions[data-has-content] {
    margin-inline-start: calc(-1 * var(--du-card-title-row-gap));
  }

  .du-card__subtitle:not([data-has-content]),
  .du-card__actions:not([data-has-content]),
  .du-card__description:not([data-has-content]) {
    display: none;
  }

  .du-card__actions {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
  }

  .du-card__description {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    overflow: visible;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .du-card__content {
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  /* focus-center：中间块按内容高度，剩余空间交给上下 spacer */
  :host([layout='focus-center']) .du-card__content {
    flex: 0 0 auto;
  }
`,Ui];var Xu=Object.defineProperty,at=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Xu(e,t,s),s};const Ku=["default","small"],Zu=["normal","focus-center"],ua=class ua extends hi{constructor(){super(...arguments),this.description="",this.heading="default",this.layout="normal",this.plain=!1,this.scrollable=!0,this.disabled=!1,this.hasTitleSlot=!1,this.hasSubtitle=!1,this.hasActions=!1,this.hasDescriptionSlot=!1}get hasTitle(){return this.hasTitleSlot||!!this.resolvedTitle.trim()}get resolvedTitle(){return this.resolveComponentTitle(this.cardTitle)}get hasDescription(){return this.hasDescriptionSlot||!!this.description.trim()}get showHeader(){return this.hasTitle||this.hasSubtitle||this.hasActions||this.hasDescription}get isFocusCenter(){return this.layout==="focus-center"}onTitleSlotChange(e){const t=e.target;this.hasTitleSlot=t.assignedNodes({flatten:!0}).some(Ms)}onSubtitleSlotChange(e){const t=e.target;this.hasSubtitle=t.assignedNodes({flatten:!0}).some(Ms)}onActionsSlotChange(e){const t=e.target;this.hasActions=t.assignedNodes({flatten:!0}).some(Ms)}onDescriptionSlotChange(e){const t=e.target;this.hasDescriptionSlot=t.assignedNodes({flatten:!0}).some(Ms)}renderInner(){const e=this.isFocusCenter?u`<div class="du-card__focus-spacer" part="focus-spacer" aria-hidden="true"></div>`:b,t=this.isFocusCenter?u`<div class="du-card__focus-spacer" part="focus-spacer" aria-hidden="true"></div>`:b;return u`
      <div class="du-card__body" ?data-has-header=${this.showHeader}>
        <header
          class="du-card__header"
          part="header"
          ?hidden=${!this.showHeader}
          ?data-has-description=${this.hasDescription}
        >
          <div
            class="du-card__title-row"
            part="title-row"
            ?data-has-content=${this.hasTitle||this.hasSubtitle||this.hasActions}
          >
            <div class="du-card__title" part="title" ?data-has-content=${this.hasTitle}>
              <slot name="title" @slotchange=${this.onTitleSlotChange}>${this.resolvedTitle}</slot>
            </div>
            <div
              class="du-card__subtitle"
              part="subtitle"
              ?data-has-content=${this.hasSubtitle}
            >
              <slot name="subtitle" @slotchange=${this.onSubtitleSlotChange}></slot>
            </div>
            <div class="du-card__spacer" part="spacer" aria-hidden="true"></div>
            <div
              class="du-card__actions"
              part="actions"
              ?data-has-content=${this.hasActions}
            >
              <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
            </div>
          </div>
          <div
            class="du-card__description"
            part="description"
            ?data-has-content=${this.hasDescription}
          >
            <slot name="description" @slotchange=${this.onDescriptionSlotChange}
              >${this.description}</slot
            >
          </div>
        </header>
        ${e}
        <div class="du-card__content" part="content">
          <slot></slot>
        </div>
        ${t}
      </div>
    `}render(){const e=this.scrollable?u`<du-scroll-area
          class="du-card__scroll"
          part="scroll"
          scrollbar-padding="18px"
          >${this.renderInner()}</du-scroll-area
        >`:this.renderInner();return u`<div class="du-card" part="card">${e}</div>`}};ua.styles=qu;let _e=ua;at([st({attribute:"card-title"})],_e.prototype,"cardTitle"),at([y()],_e.prototype,"description"),at([$(Ku,"default")],_e.prototype,"heading"),at([$(Zu,"normal")],_e.prototype,"layout"),at([m()],_e.prototype,"plain"),at([m(!0,{attribute:"scrollable",reflect:!1})],_e.prototype,"scrollable"),at([m()],_e.prototype,"disabled"),at([S()],_e.prototype,"hasTitleSlot"),at([S()],_e.prototype,"hasSubtitle"),at([S()],_e.prototype,"hasActions"),at([S()],_e.prototype,"hasDescriptionSlot");function Ms(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function Io(){Er(),k("du-card",_e)}const Ju=[_`
  :host {
    display: flex;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    max-width: 100%;
  }

  .du-card-group {
    --du-card-group-radius: var(--du-radius-round-corner-l, 16px);
    --du-card-group-bg: var(--du-fill-p6);
    --du-card-group-shadow: var(--du-shadow-l2);
    --du-card-group-stroke: var(--du-gradient-stroke-dialog-card);
    --du-card-group-divider: var(--du-fill-p-3);
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-height: 0;
    overflow: hidden;
    background: var(--du-card-group-bg);
    border-radius: var(--du-card-group-radius);
    box-shadow: var(--du-card-group-shadow);
  }

  .du-card-group::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 1px;
    background: var(--du-card-group-stroke);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  ::slotted(du-card) {
    position: relative;
    z-index: 2;
    flex: 1 1 0;
    width: auto;
    min-width: 0;
    min-height: 0;
    height: auto;
    align-self: stretch;
  }

  ::slotted(du-card:not(:first-child)) {
    background-image: linear-gradient(
      to bottom,
      transparent 12px,
      var(--du-card-group-divider) 12px,
      var(--du-card-group-divider) calc(100% - 12px),
      transparent calc(100% - 12px)
    );
    background-size: 1px 100%;
    background-position: left center;
    background-repeat: no-repeat;
  }
`,Ui];var Qu=Object.defineProperty,ec=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Qu(e,t,s),s};const ca=class ca extends A{constructor(){super(...arguments),this.disabled=!1}connectedCallback(){super.connectedCallback(),this.syncPlainCards()}syncPlainCards(){for(const e of this.querySelectorAll(":scope > du-card")){const t=e;t.plain||(t.plain=!0)}}onSlotChange(e){const t=e.target;for(const i of t.assignedElements({flatten:!0})){if(i.localName!=="du-card")continue;const s=i;s.plain||(s.plain=!0)}}render(){return u`
      <div class="du-card-group" part="group">
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
    `}};ca.styles=Ju;let ss=ca;ec([m()],ss.prototype,"disabled");function rl(){Io(),k("du-card-group",ss)}const sl=new WeakMap;function N(r,e){let t=sl.get(r);t||(t=new Map,sl.set(r,t));const i={};for(const[s,o]of Object.entries(e))t.get(s)!==o&&(i[s]=o,t.set(s,o));Object.assign(r.style,i)}const zs="@mchose/driver-ui/glow-effect-delegate",Rs=1,ol=5e3,al=2e4,tc=128,ic=32;function nl(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`}function ll(r){if(!r||typeof r!="object")return!1;const e=r;return e.channel===zs&&e.version===Rs&&typeof e.kind=="string"&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=128}function Mo(r,e,t){try{r.postMessage(t,e==="null"?"*":e)}catch{}}class rc{constructor(e){w(this,Qt);w(this,Ue);w(this,Rr);w(this,Pi);w(this,cr);w(this,Ot);w(this,pr);w(this,ps);w(this,Lr);this.id=nl(),d(this,Ue,""),d(this,Rr,"*"),d(this,Pi,0),d(this,cr,0),d(this,Ot,!1),d(this,ps,()=>{const t=!!n(this,Ue);if(n(this,Ue)&&this.active){he(this,Qt,Qs).call(this,"heartbeat");return}d(this,Ue,""),d(this,Pi,0),t&&n(this,pr).call(this,!1),he(this,Qt,Xa).call(this)}),d(this,Lr,t=>{if(t.source!==window.parent||!ll(t.data))return;const i=t.data;if(i.kind!=="ack"||i.id!==this.id||typeof i.token!="string")return;const s=this.active;d(this,Ue,i.token),d(this,Rr,t.origin==="null"?"*":t.origin),d(this,Pi,Date.now()),s||n(this,pr).call(this,!0)}),d(this,pr,e)}get active(){return!!n(this,Ue)&&Date.now()-n(this,Pi)<=al}start(){n(this,Ot)||typeof window>"u"||!window.parent||window.parent===window||(d(this,Ot,!0),window.addEventListener("message",n(this,Lr)),he(this,Qt,Xa).call(this),d(this,cr,window.setInterval(n(this,ps),ol)))}stop(){if(!n(this,Ot))return;n(this,Ue)&&he(this,Qt,Qs).call(this,"remove"),d(this,Ot,!1),window.removeEventListener("message",n(this,Lr)),window.clearInterval(n(this,cr)),d(this,cr,0);const e=this.active;d(this,Ue,""),d(this,Pi,0),e&&n(this,pr).call(this,!1)}sendFrame(e){return this.active?(he(this,Qt,Qs).call(this,"frame",e),!0):!1}}Ue=new WeakMap,Rr=new WeakMap,Pi=new WeakMap,cr=new WeakMap,Ot=new WeakMap,pr=new WeakMap,Qt=new WeakSet,Xa=function(){n(this,Ot)&&Mo(window.parent,"*",{channel:zs,version:Rs,kind:"open",id:this.id})},Qs=function(e,t){!n(this,Ot)||!n(this,Ue)||Mo(window.parent,n(this,Rr),{channel:zs,version:Rs,kind:e,id:this.id,token:n(this,Ue),frame:t})},ps=new WeakMap,Lr=new WeakMap;function ke(r,e=0,t=1e6){return typeof r=="number"&&Number.isFinite(r)?Math.max(-t,Math.min(t,r)):e}function os(r,e,t=128){return typeof r=="string"&&r.length<=t?r:e}function sc(r){if(!r||typeof r!="object"||!r.viewport||!r.clip||!r.blob)return null;const e={width:ke(r.viewport.width,0,1e5),height:ke(r.viewport.height,0,1e5)};if(e.width<=0||e.height<=0)return null;const t=os(r.blob.color,"transparent"),i=os(r.mask,"none",1024);return{viewport:e,clip:{left:ke(r.clip.left),top:ke(r.clip.top),width:Math.max(0,ke(r.clip.width)),height:Math.max(0,ke(r.clip.height)),borderRadius:os(r.clip.borderRadius,"0px")},blob:{left:ke(r.blob.left),top:ke(r.blob.top),width:Math.max(0,ke(r.blob.width)),height:Math.max(0,ke(r.blob.height)),borderRadius:os(r.blob.borderRadius,"0px"),color:typeof CSS>"u"||CSS.supports("color",t)?t:"transparent",blur:Math.max(0,ke(r.blob.blur,0,1e4)),opacity:Math.max(0,Math.min(1,ke(r.blob.opacity))),rotate:ke(r.blob.rotate,0,3600),scale:Math.max(0,ke(r.blob.scale,1,100))},mode:os(r.mode,"capsule",64),zIndex:Math.round(ke(r.zIndex,5,2147483647)),mask:/url\s*\(/i.test(i)?"none":i,visible:r.visible===!0,instant:r.instant===!0}}function oc(r,e){if(!r.isConnected||r.contentWindow===null)return null;const t=r.getBoundingClientRect();if(t.width<=0||t.height<=0)return null;const i=r.offsetWidth>0?t.width/r.offsetWidth:1,s=r.offsetHeight>0?t.height/r.offsetHeight:1,o=Math.max(r.clientWidth,1)*i,a=Math.max(r.clientHeight,1)*s;return{left:t.left+r.clientLeft*i,top:t.top+r.clientTop*s,scaleX:o/e.viewport.width,scaleY:a/e.viewport.height}}class ac{constructor(e){w(this,ve);w(this,Dt);w(this,et);this.document=e,d(this,ve,e.createElement("div")),n(this,ve).setAttribute("data-du-glow-effect","delegated"),n(this,ve).setAttribute("aria-hidden","true"),Object.assign(n(this,ve).style,{position:"fixed",boxSizing:"border-box",overflow:"hidden",pointerEvents:"none",opacity:"0",mixBlendMode:"plus-lighter",transition:"opacity 180ms ease",transformOrigin:"0 0"}),d(this,Dt,e.createElement("div")),n(this,Dt).setAttribute("data-du-glow-effect-blob","delegated"),Object.assign(n(this,Dt).style,{position:"absolute",boxSizing:"border-box",pointerEvents:"none",left:"0px",top:"0px",transformOrigin:"center",transition:"transform 180ms ease, background 180ms ease, opacity 180ms ease"}),n(this,ve).append(n(this,Dt)),d(this,et,e.createElement("div")),n(this,et).setAttribute("data-du-glow-effect-viewport","delegated"),n(this,et).setAttribute("aria-hidden","true"),N(n(this,et),{position:"fixed",boxSizing:"border-box",overflow:"hidden",pointerEvents:"none",transformOrigin:"0 0",mixBlendMode:"plus-lighter",maskMode:"alpha"}),n(this,et).append(n(this,ve))}apply(e,t){const i=oc(t,e);if(!i){this.destroy();return}const s=this.document.body??this.document.documentElement,o=e.mask&&e.mask!=="none"&&(typeof CSS>"u"||CSS.supports("mask-image",e.mask));n(this,et).parentElement!==s&&s.append(n(this,et)),N(n(this,et),{left:`${i.left}px`,top:`${i.top}px`,width:`${e.viewport.width}px`,height:`${e.viewport.height}px`,transform:`scale(${i.scaleX}, ${i.scaleY})`,zIndex:String(e.zIndex),maskImage:o?e.mask:"none",webkitMaskImage:o?e.mask:"none"}),N(n(this,ve),{position:"absolute",left:`${e.clip.left}px`,top:`${e.clip.top}px`,transform:"none",mixBlendMode:"normal",zIndex:String(e.zIndex)}),n(this,ve).getAttribute("data-mode")!==e.mode&&n(this,ve).setAttribute("data-mode",e.mode),N(n(this,ve),{width:`${e.clip.width}px`,height:`${e.clip.height}px`,borderRadius:e.clip.borderRadius,clipPath:`inset(0 round ${e.clip.borderRadius})`}),n(this,Dt).getAttribute("data-mode")!==e.mode&&n(this,Dt).setAttribute("data-mode",e.mode),N(n(this,Dt),{translate:`${e.blob.left}px ${e.blob.top}px`,willChange:e.visible?"translate":"auto",width:`${e.blob.width}px`,height:`${e.blob.height}px`,borderRadius:e.blob.borderRadius,background:e.blob.color,filter:`blur(${e.blob.blur}px)`,opacity:String(e.blob.opacity),transform:`translate3d(-50%, -50%, 0) rotate(${e.blob.rotate}deg) scale(${e.blob.scale})`}),N(n(this,ve),{transition:e.instant?"none":"opacity 180ms ease",opacity:e.visible?"1":"0"}),e.instant&&(n(this,ve).offsetWidth,N(n(this,ve),{transition:"opacity 180ms ease"}))}destroy(){n(this,et).remove()}}ve=new WeakMap,Dt=new WeakMap,et=new WeakMap;const dl="__duGlowEffectDelegateReceiverV1__";function nc(){var p;if(typeof window>"u"||typeof document>"u")return;const r=globalThis;if((p=r[dl])!=null&&p.installed)return;r[dl]={installed:!0};const e=new Set;let t=0;const i=f=>{if(f)return Array.from(document.querySelectorAll("iframe")).find(g=>g.contentWindow===f)},s=(f,g)=>g!=="null"&&g===window.location.origin?!0:(f.getAttribute("data-du-glow-delegate")??"").split(/\s+/).some(x=>x==="*"||x===g),o=(f,g)=>Array.from(e).find(v=>v.source===f&&v.id===g),a=f=>{f.renderer.destroy(),e.delete(f),e.size===0&&t&&(window.clearInterval(t),t=0)},l=f=>Mo(f.source,f.origin,{channel:zs,version:Rs,kind:"ack",id:f.id,token:f.token});window.addEventListener("message",f=>{if(!ll(f.data))return;const g=f.data;let v=o(f.source,g.id);if(g.kind==="open"){const x=i(f.source);if(!x||!s(x,f.origin))return;if(v)v.lastSeen=Date.now();else{const E=Array.from(e).filter(M=>M.source===f.source).length;if(e.size>=tc||E>=ic)return;v={id:g.id,token:nl(),source:x.contentWindow,origin:f.origin==="null"?"*":f.origin,iframe:x,renderer:new ac(document),lastSeen:Date.now()},e.add(v),t||(t=window.setInterval(h,ol))}l(v);return}if(!(!v||g.token!==v.token||v.origin!==(f.origin==="null"?"*":f.origin))){if(v.lastSeen=Date.now(),g.kind==="remove")a(v);else if(g.kind==="heartbeat")l(v);else if(g.kind==="frame"&&g.frame){const x=sc(g.frame);x&&v.renderer.apply(x,v.iframe)}}});const h=()=>{const f=Date.now();for(const g of e)(!g.iframe.isConnected||g.iframe.contentWindow!==g.source||f-g.lastSeen>al)&&a(g)};typeof MutationObserver<"u"&&new MutationObserver(h).observe(document.documentElement,{childList:!0,subtree:!0})}const lc=_`
  :host {
    display: contents;
  }
`;var dc=Object.defineProperty,nt=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&dc(e,t,s),s};const hc=["capsule","segmented-topbar","segmented-icon","segmented-text","device-card"],hl="#959595",zo=1.5,ul={capsule:{color:"#5a5a5a",opacity:1,blur:"43.83401107788086px",shape:"trapezoid",pressable:!0,pressedColor:hl,blobWidth:"58.98px",blobHeight:"94.09px",blobRadius:"6px",rotateDeg:-30},"segmented-topbar":{color:"#5a5a5a",opacity:1,blur:"30px",shape:"parent",pressable:!0,pressedColor:hl},"segmented-icon":{color:"rgba(90, 90, 90, 0.50)",opacity:.6,blur:"10px",shape:"parent",pressable:!1},"segmented-text":{color:"#5a5a5a",opacity:.6,blur:"30px",shape:"parent",pressable:!1},"device-card":{color:"rgb(90, 90, 90, 0.3)",darkColor:"rgb(90, 90, 90)",opacity:.5,blur:"80px",shape:"circle",pressable:!1,blobWidth:"300px",blobHeight:"300px"}},Nr=class Nr extends A{constructor(){super(...arguments);w(this,Me);w(this,ei);w(this,O);w(this,pe);w(this,Ee);w(this,Ai);w(this,Ge);w(this,Oi);w(this,Y);w(this,Te);w(this,Di);w(this,Ii);w(this,fr);w(this,mr);w(this,Mi);w(this,tt);w(this,It);w(this,ti);w(this,Mt);w(this,bt);this.delegate=!1,this.mode="capsule",this.themeAware=!1,this.color="",this.disabled=!1,this.zIndex=5,this.disableEvent=!1,d(this,Me,null),d(this,ei,null),d(this,O,null),d(this,pe,null),d(this,Ee,null),d(this,Ge,0),d(this,Oi,!1),d(this,Y,!1),d(this,Te,!1),d(this,Di,0),d(this,Ii,0),d(this,fr,0),d(this,mr,0),d(this,Mi,null),d(this,It,null),d(this,ti,null),d(this,Mt,null),d(this,bt,null),this.onGlowScrollDismiss=()=>{this.disableEvent||!n(this,Y)||(d(this,Y,!1),d(this,Te,!1),this.hideGlowPortalInstant())},this.tickGlowTrack=()=>{d(this,Ge,0),!(!this.glowActive||!n(this,Y)||!this.isConnected)&&(this.layoutGlowPortal(),n(this,Y)&&(this.delegateActive||n(this,O))&&d(this,Ge,requestAnimationFrame(this.tickGlowTrack)))},this.onPointerEnter=t=>{this.glowActive&&(this.syncGlowPosition(t),d(this,Y,!0),this.showGlowPortal())},this.onPointerMove=t=>{this.glowActive&&(this.syncGlowPosition(t),n(this,Y)||(d(this,Y,!0),this.showGlowPortal()))},this.onPointerDown=t=>{!this.glowActive||!this.preset.pressable||t.button!==0&&t.pointerType==="mouse"||(d(this,Te,!0),this.syncGlowPosition(t))},this.onPointerUp=()=>{d(this,Te,!1)},this.onPointerLeave=()=>{d(this,Y,!1),d(this,Te,!1),this.hideGlowPortal()}}get glowActive(){return!this.disabled&&!!(n(this,Me)&&n(this,ei))}get preset(){return ul[this.mode]??ul.capsule}connectedCallback(){super.connectedCallback(),this.syncDelegateClient(),this.updateComplete.then(()=>this.syncClipParent())}disconnectedCallback(){var t;(t=n(this,tt))==null||t.stop(),d(this,tt,void 0),this.teardownGlowPortal(),this.unbindEventTarget(),d(this,Me,null),super.disconnectedCallback()}updated(t){if(t.has("delegate")&&this.syncDelegateClient(),this.syncClipParent(),this.disabled){d(this,Y,!1),d(this,Te,!1),this.sendDelegateFrame(!0),this.teardownGlowPortal();return}if(t.has("disableEvent")&&(this.disableEvent?this.unbindGlowScrollDismiss():n(this,Y)&&this.bindGlowScrollDismiss()),t.has("portalTarget")&&n(this,O)&&this.layoutGlowPortal(),t.has("zIndex")&&this.applyGlowZIndex(),t.has("mode")&&n(this,O)){this.refreshGlowForModeChange();return}(t.has("themeAware")||t.has("color")||t.has("glowShapeFollower")||t.has("clipShapeFollower"))&&n(this,O)&&n(this,Ee)&&(d(this,Mt,null),d(this,bt,null),d(this,ti,null),d(this,It,null),this.layoutGlowPortal())}get delegateActive(){var t;return((t=n(this,tt))==null?void 0:t.active)===!0}syncDelegateClient(){if(!(this.delegate&&typeof window<"u"&&!!window.parent&&window.parent!==window)){const i=n(this,tt);d(this,tt,void 0),i==null||i.stop(),n(this,Y)&&this.isConnected&&this.showGlowPortal();return}n(this,tt)||(d(this,tt,new rc(i=>{if(!this.isConnected)return;const s=n(this,Y);i?(this.teardownGlowPortal(),d(this,Y,s),s&&this.startGlowTrack()):s&&this.showGlowPortal()})),n(this,tt).start())}syncClipParent(){const t=this.parentElement;t!==n(this,Me)&&(d(this,Me,t),this.bindGlowPortalTheme(),d(this,ti,null),d(this,It,null),d(this,Mt,null),d(this,bt,null));const i=this.disabled?null:this.resolveEventTargetEl(t);i!==n(this,ei)&&(d(this,Y,!1),d(this,Te,!1),this.hideGlowPortal(),this.unbindEventTarget(),i&&this.bindEventTarget(i))}resolveEventTargetEl(t){const i=this.eventTarget;if(!i||i==="parent")return t;if(typeof i=="function")try{return i()??null}catch{return null}if(i instanceof HTMLElement)return i;const s=i.trim();return s?So(t,s)??t:t}bindEventTarget(t){d(this,ei,t),t.addEventListener("pointerenter",this.onPointerEnter),t.addEventListener("pointermove",this.onPointerMove),t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointerup",this.onPointerUp),t.addEventListener("pointercancel",this.onPointerUp),t.addEventListener("pointerleave",this.onPointerLeave)}unbindEventTarget(){const t=n(this,ei);t&&(t.removeEventListener("pointerenter",this.onPointerEnter),t.removeEventListener("pointermove",this.onPointerMove),t.removeEventListener("pointerdown",this.onPointerDown),t.removeEventListener("pointerup",this.onPointerUp),t.removeEventListener("pointercancel",this.onPointerUp),t.removeEventListener("pointerleave",this.onPointerLeave),d(this,ei,null))}resolveBlobColor(){if(this.themeAware){const i=this.color.trim();return i||getComputedStyle(n(this,Me)??this).getPropertyValue("--du-glow-hover-color").trim()||"#ffffff"}const t=this.preset;return t.pressable&&n(this,Te)&&t.pressedColor?t.pressedColor:this.resolveDarkTheme()?t.darkColor??t.color:t.color}resolveDarkTheme(){var o;const t=(o=n(this,O))==null?void 0:o.getAttribute("data-du-theme");if(t)return t==="dark";let i=n(this,Me)??this;for(;i;){const a=i.getAttribute("data-du-theme");if(a)return a==="dark";if(i.assignedSlot instanceof HTMLElement)i=i.assignedSlot;else if(i.parentElement)i=i.parentElement;else{const l=i.getRootNode();i=l instanceof ShadowRoot&&l.host instanceof HTMLElement?l.host:null}}const s=this.ownerDocument.documentElement;return s.getAttribute("data-du-theme")==="dark"||s.getAttribute("theme-mode")==="dark"||s.classList.contains("theme-dark")}bindGlowPortalTheme(){var t;(t=n(this,Ai))==null||t.call(this),d(this,Ai,void 0),n(this,O)&&d(this,Ai,Sr(n(this,Me)??this,n(this,O)))}refreshGlowForModeChange(){if(!n(this,O)){d(this,Mi,null);return}this.preset.pressable||d(this,Te,!1),this.recreateGlowBlob(),this.applyBlobBaseStyles(),this.layoutGlowPortal()}recreateGlowBlob(){var s;const t=n(this,O);if(!t)return;(s=n(this,Ee))==null||s.remove();const i=this.ownerDocument.createElement("div");i.setAttribute("data-du-glow-effect-blob",""),Object.assign(i.style,{position:"absolute",left:"0px",top:"0px",boxSizing:"border-box",pointerEvents:"none"}),t.appendChild(i),d(this,Ee,i)}applyGlowZIndex(){n(this,O)&&(n(this,O).style.zIndex=String(this.zIndex)),n(this,pe)&&(n(this,pe).style.zIndex=String(this.zIndex))}resolvePortalTarget(){var s,o;const t=this.portalTarget;if(t===null)return null;if(t===void 0||t==="")return this.ownerDocument.body;let i;try{i=typeof t=="string"?this.ownerDocument.querySelector(t):t}catch{return null}return!(i instanceof HTMLElement)||!i.isConnected||i.ownerDocument!==this.ownerDocument||i===n(this,O)||(s=n(this,O))!=null&&s.contains(i)||i===n(this,pe)||(o=n(this,pe))!=null&&o.contains(i)?null:i}syncViewportMask(){var a;const t=n(this,O);if(!t)return;const i=this.resolvePortalTarget();if(!i){d(this,Y,!1),this.teardownGlowPortal();return}const s=getComputedStyle(this).getPropertyValue("--du-glow-viewport-mask").trim();if(!s||s==="none"||!CSS.supports("mask-image",s)){t.parentElement!==i&&i.appendChild(t),(a=n(this,pe))==null||a.remove(),d(this,pe,null),N(t,{mixBlendMode:"plus-lighter"});return}if(!n(this,pe)){const l=this.ownerDocument.createElement("div");l.setAttribute("data-du-glow-effect-viewport",""),l.setAttribute("aria-hidden","true"),Object.assign(l.style,{position:"fixed",inset:"0",pointerEvents:"none",zIndex:String(this.zIndex),mixBlendMode:"plus-lighter",maskMode:"alpha"}),i.appendChild(l),l.appendChild(t),d(this,pe,l)}n(this,pe).parentElement!==i&&i.appendChild(n(this,pe));const o=n(this,pe).style;o.maskImage!==s&&(o.maskImage=s,o.setProperty("-webkit-mask-image",s)),N(t,{mixBlendMode:"normal"})}applyBlobBaseStyles(){const t=n(this,Ee),i=n(this,O);if(!t)return;const s=this.preset;i==null||i.setAttribute("data-mode",this.mode),t.setAttribute("data-mode",this.mode),N(t,{filter:`blur(${s.blur})`,opacity:String(s.opacity),transition:"transform 180ms ease, background 180ms ease, opacity 180ms ease"}),d(this,Mi,this.mode)}ensureGlowPortal(){if(n(this,O)&&n(this,Ee)){this.applyGlowZIndex(),this.syncViewportMask(),n(this,Mi)!==this.mode&&this.refreshGlowForModeChange();return}const t=this.resolvePortalTarget();if(!t){d(this,Y,!1);return}const i=this.ownerDocument.createElement("div");i.setAttribute("data-du-glow-effect",""),i.setAttribute("data-mode",this.mode),i.setAttribute("aria-hidden","true"),Object.assign(i.style,{position:"fixed",left:"0px",top:"0px",width:"0px",height:"0px",zIndex:String(this.zIndex),boxSizing:"border-box",overflow:"hidden",borderRadius:"75px",clipPath:"inset(0 round 75px)",mixBlendMode:"plus-lighter",opacity:"0",pointerEvents:"none",transition:"opacity 180ms ease"}),t.appendChild(i),d(this,O,i),this.bindGlowPortalTheme(),this.syncViewportMask(),this.recreateGlowBlob(),this.applyBlobBaseStyles()}resolveShapeFollowerEl(t){if(!t)return null;if(typeof t=="function")try{return t()??null}catch{return null}const i=t.trim();return i?So(n(this,Me),i):null}resolveClipShapeSourceEl(){return this.resolveShapeFollowerEl(this.clipShapeFollower)??n(this,Me)}layoutBlobFromFollowShape(t,i,s,o){const a=i.getBoundingClientRect(),l=o.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const h=s.width/a.width,p=s.height/a.height,f=l.width*h,g=l.height*p,v=getComputedStyle(o).borderRadius||"0px";let x=v;v==="0px"?x=`${Math.max(g/2,1)}px`:v.includes(" ")?x=`${Math.max(g/2,1)}px`:v.endsWith("px")&&Math.abs(h-1)>.002&&(x=`${Math.max(parseFloat(v)*Math.min(h,p),0)}px`);const E=o!==n(this,Mt);E&&(d(this,Mt,o),d(this,bt,null),N(t,{transition:"background 180ms ease, opacity 180ms ease"}));const M={left:n(this,Di),top:n(this,Ii),width:f,height:g,borderRadius:x},P=n(this,bt),vt=.35,ze=!E&&P&&Math.abs(P.width-M.width)<=vt&&Math.abs(P.height-M.height)<=vt&&P.borderRadius===M.borderRadius,D={left:n(this,Di),top:n(this,Ii),width:ze&&P?P.width:M.width,height:ze&&P?P.height:M.height,borderRadius:ze&&P?P.borderRadius:M.borderRadius};d(this,bt,D);const rt=this.preset,Ur=rt.pressable&&n(this,Te)?zo:1;N(t,{width:`${D.width}px`,height:`${D.height}px`,borderRadius:D.borderRadius,clipPath:"",translate:`${D.left}px ${D.top}px`,background:this.resolveBlobColor(),opacity:String(rt.opacity),transform:`translate3d(-50%, -50%, 0) scale(${Ur})`})}createDelegateFrame(t=!1){var M,P;const i=this.resolveClipShapeSourceEl();if(!i)return null;const s=i.getBoundingClientRect();if(s.width<=0||s.height<=0)return null;const o=this.preset,a=i.offsetWidth>0?s.width/i.offsetWidth:1,l=i.offsetHeight>0?s.height/i.offsetHeight:1,h=Math.min(Math.abs(a)||1,Math.abs(l)||1),p=(vt,ze)=>{const D=getComputedStyle(vt).borderRadius||"0px";return D==="0px"||D.includes(" ")?`${Math.max(ze/2,1)}px`:D},f=p(i,s.height),g=this.resolveShapeFollowerEl(this.glowShapeFollower);let v,x,E;if(g){const vt=g.getBoundingClientRect();v=vt.width,x=vt.height,E=p(g,x)}else o.shape==="parent"?(v=s.width,x=s.height,E=f):(v=(parseFloat(o.blobWidth??(o.shape==="circle"?"300":"58.98"))||0)*a,x=(parseFloat(o.blobHeight??(o.shape==="circle"?"300":"94.09"))||0)*l,E=o.shape==="circle"?"50%":o.blobRadius??"6px");return{viewport:{width:Math.max(this.ownerDocument.documentElement.clientWidth||((M=this.ownerDocument.defaultView)==null?void 0:M.innerWidth)||0,1),height:Math.max(this.ownerDocument.documentElement.clientHeight||((P=this.ownerDocument.defaultView)==null?void 0:P.innerHeight)||0,1)},clip:{left:s.left,top:s.top,width:s.width,height:s.height,borderRadius:f},blob:{left:n(this,fr)-s.left,top:n(this,mr)-s.top,width:v,height:x,borderRadius:E,color:this.resolveBlobColor(),blur:(parseFloat(o.blur)||0)*h,opacity:o.opacity,rotate:o.rotateDeg??0,scale:o.pressable&&n(this,Te)?zo:1},mode:this.mode,zIndex:this.zIndex,mask:getComputedStyle(this).getPropertyValue("--du-glow-viewport-mask").trim()||"none",visible:n(this,Y),instant:t}}sendDelegateFrame(t=!1){var s;if(!this.delegateActive)return!1;const i=this.createDelegateFrame(t);return i?((s=n(this,tt))==null?void 0:s.sendFrame(i))===!0:!1}layoutGlowPortal(){if(this.delegateActive){this.sendDelegateFrame();return}const t=n(this,Me),i=n(this,O),s=n(this,Ee);if(!t||!i||!s||(this.syncViewportMask(),!n(this,O)))return;const o=this.resolveClipShapeSourceEl();if(!o)return;o!==n(this,ti)&&(d(this,ti,o),d(this,It,null));const a=Lh(i,o,{previous:n(this,It),epsilon:.35});d(this,It,a);const l=Nh(o,n(this,fr),n(this,mr),a);d(this,Di,l.x),d(this,Ii,l.y);const h=a.borderRadius;N(i,{borderRadius:h,clipPath:`inset(0 round ${h})`});const p=this.resolveShapeFollowerEl(this.glowShapeFollower);if(p)this.layoutBlobFromFollowShape(s,o,a,p);else{d(this,Mt,null),d(this,bt,null);const f=this.preset,g=f.pressable&&n(this,Te)?zo:1,v=f.rotateDeg??0;f.shape==="parent"?N(s,{width:`${a.width}px`,height:`${a.height}px`,borderRadius:h}):f.shape==="circle"?N(s,{width:f.blobWidth??"300px",height:f.blobHeight??"300px",borderRadius:"50%"}):N(s,{width:f.blobWidth??"58.98px",height:f.blobHeight??"94.09px",borderRadius:f.blobRadius??"6px"}),N(s,{clipPath:"",translate:`${n(this,Di)}px ${n(this,Ii)}px`,background:this.resolveBlobColor(),opacity:String(f.opacity),transform:`translate3d(-50%, -50%, 0) rotate(${v}deg) scale(${g})`,transition:"transform 180ms ease, background 180ms ease, opacity 180ms ease"})}n(this,Y)&&N(i,{opacity:"1"})}bindGlowScrollDismiss(){this.disableEvent||n(this,Oi)||(d(this,Oi,!0),window.addEventListener("wheel",this.onGlowScrollDismiss,{capture:!0,passive:!0}),window.addEventListener("scroll",this.onGlowScrollDismiss,{capture:!0,passive:!0}))}unbindGlowScrollDismiss(){n(this,Oi)&&(d(this,Oi,!1),window.removeEventListener("wheel",this.onGlowScrollDismiss,!0),window.removeEventListener("scroll",this.onGlowScrollDismiss,!0))}stopGlowTrack(){this.unbindGlowScrollDismiss(),n(this,Ee)&&N(n(this,Ee),{willChange:"auto"}),n(this,Ge)&&(cancelAnimationFrame(n(this,Ge)),d(this,Ge,0))}startGlowTrack(){if(this.delegateActive){this.sendDelegateFrame(),this.bindGlowScrollDismiss(),n(this,Ge)||d(this,Ge,requestAnimationFrame(this.tickGlowTrack));return}this.ensureGlowPortal(),n(this,O)&&(n(this,Ee)&&N(n(this,Ee),{willChange:"translate"}),this.layoutGlowPortal(),this.bindGlowScrollDismiss(),!n(this,Ge)&&d(this,Ge,requestAnimationFrame(this.tickGlowTrack)))}hideGlowPortal(){if(this.delegateActive){this.sendDelegateFrame(),this.stopGlowTrack();return}this.stopGlowTrack(),n(this,O)&&N(n(this,O),{transition:"opacity 180ms ease",opacity:"0"})}hideGlowPortalInstant(){if(this.delegateActive){this.sendDelegateFrame(!0),this.stopGlowTrack();return}this.stopGlowTrack();const t=n(this,O);t&&(N(t,{transition:"none",opacity:"0"}),t.offsetWidth,N(t,{transition:"opacity 180ms ease"}))}showGlowPortal(){this.startGlowTrack(),n(this,O)&&N(n(this,O),{opacity:"1"})}teardownGlowPortal(){var t,i,s;this.stopGlowTrack(),(t=n(this,Ai))==null||t.call(this),d(this,Ai,void 0),(i=n(this,O))==null||i.remove(),(s=n(this,pe))==null||s.remove(),d(this,pe,null),d(this,O,null),d(this,Ee,null),d(this,Mi,null),d(this,It,null),d(this,ti,null),d(this,Mt,null),d(this,bt,null)}syncGlowPosition(t){d(this,fr,t.clientX),d(this,mr,t.clientY)}render(){return u``}};Me=new WeakMap,ei=new WeakMap,O=new WeakMap,pe=new WeakMap,Ee=new WeakMap,Ai=new WeakMap,Ge=new WeakMap,Oi=new WeakMap,Y=new WeakMap,Te=new WeakMap,Di=new WeakMap,Ii=new WeakMap,fr=new WeakMap,mr=new WeakMap,Mi=new WeakMap,tt=new WeakMap,It=new WeakMap,ti=new WeakMap,Mt=new WeakMap,bt=new WeakMap,Nr.supportsViewportMask=!0,Nr.supportsPortalTarget=!0,Nr.supportsDelegate=!0,Nr.styles=lc;let Ce=Nr;nt([m()],Ce.prototype,"delegate"),nt([C({attribute:"portal-target",converter:{fromAttribute:r=>r??void 0}})],Ce.prototype,"portalTarget"),nt([$(hc,"capsule")],Ce.prototype,"mode"),nt([m(!1,{attribute:"theme-aware"})],Ce.prototype,"themeAware"),nt([y()],Ce.prototype,"color"),nt([m()],Ce.prototype,"disabled"),nt([T(5,{attribute:"z-index",integer:!0})],Ce.prototype,"zIndex"),nt([m(!1,{attribute:"disable-event"})],Ce.prototype,"disableEvent"),nt([C({attribute:"glow-shape-follower",converter:{fromAttribute:r=>r&&r.trim()?r.trim():void 0,toAttribute:r=>typeof r=="string"&&r?r:null}})],Ce.prototype,"glowShapeFollower"),nt([C({attribute:"clip-shape-follower",converter:{fromAttribute:r=>r&&r.trim()?r.trim():void 0,toAttribute:r=>typeof r=="string"&&r?r:null}})],Ce.prototype,"clipShapeFollower"),nt([C({attribute:"event-target",converter:{fromAttribute:r=>r&&r.trim()?r.trim():void 0,toAttribute:r=>typeof r=="string"&&r?r:null}})],Ce.prototype,"eventTarget");function as(){k("du-glow-effect",Ce),nc()}const uc=_`
  :host {
    display: inline-flex;
    box-sizing: border-box;
    max-width: 100%;
    vertical-align: middle;
  }

  ${z(X("block"))} {
    display: flex;
    width: 100%;
  }

  .du-capsule-layout {
    --du-capsule-height: 40px;
    --du-capsule-radius: 75px;
    --du-capsule-pad-x: 16px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--du-capsule-height);
    padding: 0 var(--du-capsule-pad-x);
    overflow: hidden;
    border-radius: var(--du-capsule-radius);
    cursor: pointer;
    user-select: none;
  }

  .du-capsule-layout__hint {
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .du-capsule-layout__hint::part(reference) {
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: none;
  }

  :host([type='drag-tip']) .du-capsule-layout {
    cursor: default;
  }

  ${z(X("disabled"))} .du-capsule-layout {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
    pointer-events: none;
  }

  ${z(X("disabled"))} .du-capsule-layout > *,
  ${z(X("disabled"))} ::slotted(*) {
    --du-disabled-opacity: 1;
    pointer-events: none;
  }

  .du-capsule-layout__marker {
    position: absolute;
    inset: 0;
    z-index: 1;
    box-sizing: border-box;
    border-radius: inherit;
    background: transparent;
    background-blend-mode: luminosity;
    pointer-events: none;
    transition:
      background var(--du-duration-fast, 0.15s) ease,
      border-color var(--du-duration-fast, 0.15s) ease,
      box-shadow var(--du-duration-fast, 0.15s) ease,
      backdrop-filter var(--du-duration-fast, 0.15s) ease;
  }

  :host([type='gray']) .du-capsule-layout__marker {
    background: var(--du-fill-p1);
  }

  :host([type='gray-outline']) .du-capsule-layout__marker {
    border: 1px solid var(--du-fill-p-3);
    background: var(--du-fill-p1);
  }

  :host([type='gray-outline']${z(xr("disabled"))}) .du-capsule-layout:hover:not(:active) .du-capsule-layout__marker {
    background: var(--du-state-hover);
  }

  :host([type='gray']${z(xr("disabled"))}) .du-capsule-layout:hover:not(:active) .du-capsule-layout__marker {
    background: var(--du-state-hover);
  }

  :host([type='gray']${z(xr("disabled"))}) .du-capsule-layout:active .du-capsule-layout__marker {
    background: var(--du-fill-p1);
  }

  :host([type='primary']) .du-capsule-layout__marker {
    background: var(--du-glass-btn);
    box-shadow: var(--du-texture-btn);
    backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
    -webkit-backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
  }

  :host([type='ghost']${z(xr("disabled"))}) .du-capsule-layout:hover:not(:active) .du-capsule-layout__marker {
    background: var(--du-fill-p1);
  }

  :host([type='ghost']${z(xr("disabled"))}) .du-capsule-layout:active .du-capsule-layout__marker {
    background: var(--du-glass-btn);
    box-shadow: var(--du-texture-btn);
    backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
    -webkit-backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
  }

  :host([type='drag-tip']) .du-capsule-layout__marker {
    background: var(--du-fill-p1);
  }

  :host([type='drag-tip'][drag-over]) .du-capsule-layout__marker {
    background: var(--du-state-hover);
  }

  .du-capsule-layout__content {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    height: 100%;
  }
`;var cc=Object.defineProperty,lt=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&cc(e,t,s),s};const pc=["gray","gray-outline","primary","ghost","drag-tip"],pa=class pa extends A{constructor(){super(...arguments),this.type="gray",this.hoverGlow=!1,this.glowEffectZIndex=5,this.delegate=!1,this.disabled=!1,this.block=!1,this.dragOver=!1,this.helpInfo="",this.hasHelpSlot=!1,this.onDragEnter=e=>{this.type!=="drag-tip"||this.disabled||(e.preventDefault(),this.dragOver=!0)},this.onDragOver=e=>{this.type!=="drag-tip"||this.disabled||(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),this.dragOver||(this.dragOver=!0))},this.onDragLeave=e=>{if(this.type!=="drag-tip")return;const t=this.rootEl,i=e.relatedTarget;t&&i&&t.contains(i)||(this.dragOver=!1)},this.onDrop=e=>{this.type!=="drag-tip"||this.disabled||(e.preventDefault(),e.stopPropagation(),this.dragOver=!1,this.emit("drop",{dataTransfer:e.dataTransfer,originalEvent:e}))}}get showGlow(){return this.hoverGlow&&this.type!=="drag-tip"&&!this.disabled}get hasHelp(){return this.hasHelpSlot||!!this.helpInfo.trim()}onHelpSlotChange(e){this.hasHelpSlot=fc(e.target)}renderHelpProbe(){return u`<slot name="help-info" hidden @slotchange=${this.onHelpSlotChange}></slot>`}renderCapsule(e={}){return u`
      <div
        class="du-capsule-layout"
        part="container"
        slot=${e.asReference?"reference":b}
        @dragenter=${this.onDragEnter}
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        ${this.showGlow?u`<du-glow-effect
              part="glow"
              mode="capsule"
              ?delegate=${this.delegate}
              .portalTarget=${this.glowEffectPortalTarget}
              .zIndex=${this.glowEffectZIndex}
            ></du-glow-effect>`:b}
        <div class="du-capsule-layout__marker" part="marker"></div>
        <div class="du-capsule-layout__content" part="content">
          <slot></slot>
        </div>
      </div>
    `}render(){return this.hasHelp?this.hasHelpSlot?u`
        <du-coachmark
          class="du-capsule-layout__hint"
          placement="right-center"
          trigger="hover"
          parent=""
        >
          ${this.renderCapsule({asReference:!0})}
          <slot name="help-info" @slotchange=${this.onHelpSlotChange}></slot>
        </du-coachmark>
      `:u`
      <du-coachmark
        class="du-capsule-layout__hint"
        placement="right-center"
        trigger="hover"
        content=${this.helpInfo}
      >
        ${this.renderCapsule()}
      </du-coachmark>
      ${this.renderHelpProbe()}
    `:u`${this.renderCapsule()}${this.renderHelpProbe()}`}};pa.styles=uc;let Se=pa;lt([$(pc,"gray")],Se.prototype,"type"),lt([m(!1,{attribute:"hover-glow"})],Se.prototype,"hoverGlow"),lt([T(5,{attribute:"glow-effect-z-index",integer:!0})],Se.prototype,"glowEffectZIndex"),lt([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],Se.prototype,"glowEffectPortalTarget"),lt([m()],Se.prototype,"delegate"),lt([m()],Se.prototype,"disabled"),lt([m()],Se.prototype,"block"),lt([m(!1,{attribute:"drag-over"})],Se.prototype,"dragOver"),lt([y("",{attribute:"help-info"})],Se.prototype,"helpInfo"),lt([S()],Se.prototype,"hasHelpSlot"),lt([q(".du-capsule-layout",!0)],Se.prototype,"rootEl");function fc(r){return r.assignedNodes({flatten:!0}).some(e=>{var t;return e.nodeType===Node.TEXT_NODE?!!((t=e.textContent)!=null&&t.trim()):e.nodeType===Node.ELEMENT_NODE})}function ns(){as(),Gi(),k("du-capsule-layout",Se)}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mc=r=>r??b,gc=_`
  :host {
    display: block;
    box-sizing: border-box;
    max-width: 100%;
  }

  .du-capsule-choice__body {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  du-capsule-layout[type='gray']:not([hover-glow])::part(marker) {
    border: 1px solid transparent;
  }

  du-capsule-layout[type='gray']:not([hover-glow]):not([disabled]):hover:not(:active)::part(marker) {
    border-color: var(--du-fill-p-3);
  }

  .du-capsule-choice__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-capsule-choice__actions {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
  }

  .du-capsule-choice__actions:not([data-has-content]) {
    display: none;
  }
`;var bc=Object.defineProperty,Le=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&bc(e,t,s),s};const vc=["gray","gray-outline","ghost"],fa=class fa extends hi{constructor(){super(...arguments),this.testId="",this.icon="",this.activeIcon="",this.active=!1,this.type="gray",this.hoverGlow=!1,this.delegate=!1,this.disabled=!1,this.helpInfo="",this.hasActions=!1,this.hasStartSlot=!1}get resolvedTitle(){return this.resolveComponentTitle(this.choiceTitle)}get layoutType(){return this.type==="gray-outline"?this.active?"gray-outline":"gray":this.active?"primary":this.type}get resolvedIcon(){return this.active&&this.activeIcon?this.activeIcon:this.icon}onActionsSlotChange(e){const t=e.target;this.hasActions=t.assignedNodes({flatten:!0}).some(cl)}onStartSlotChange(e){const t=e.target;this.hasStartSlot=t.assignedNodes({flatten:!0}).some(cl)}onClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.emit("click",{active:this.active,title:this.resolvedTitle})}render(){const e=this.resolvedIcon,t=!!e&&!this.hasStartSlot;return u`
      <du-capsule-layout
        data-testid=${ae(this.testId)}
        type=${this.layoutType}
        ?hover-glow=${this.hoverGlow}
        ?delegate=${this.delegate}
        .glowEffectPortalTarget=${this.glowEffectPortalTarget}
        ?disabled=${this.disabled}
        help-info=${this.helpInfo}
        block
        @click=${this.onClick}
      >
        <du-layout class="du-capsule-choice__body" text-overflow="ellipsis" gap="8">
          ${t?u`<du-icon
                slot="start"
                name=${e}
                size="20"
                decorative
              ></du-icon>`:b}
          <slot
            name="start"
            slot=${mc(this.hasStartSlot?"start":void 0)}
            style=${this.hasStartSlot?"":"display:none"}
            @slotchange=${this.onStartSlotChange}
          ></slot>
          <span class="du-capsule-choice__title">${this.resolvedTitle}</span>
          ${this.hasActions?u`<span
                slot="end"
                class="du-capsule-choice__actions"
                ?data-has-content=${this.hasActions}
              >
                <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
              </span>`:u`<slot
                name="actions"
                hidden
                @slotchange=${this.onActionsSlotChange}
              ></slot>`}
        </du-layout>
        <slot name="help-info" slot="help-info"></slot>
      </du-capsule-layout>
    `}};fa.styles=gc;let ce=fa;Le([y("",{attribute:"test-id",reflect:!1})],ce.prototype,"testId"),Le([st({attribute:"choice-title"})],ce.prototype,"choiceTitle"),Le([y()],ce.prototype,"icon"),Le([y("",{attribute:"active-icon"})],ce.prototype,"activeIcon"),Le([m()],ce.prototype,"active"),Le([$(vc,"gray")],ce.prototype,"type"),Le([m(!1,{attribute:"hover-glow"})],ce.prototype,"hoverGlow"),Le([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],ce.prototype,"glowEffectPortalTarget"),Le([m()],ce.prototype,"delegate"),Le([m()],ce.prototype,"disabled"),Le([y("",{attribute:"help-info"})],ce.prototype,"helpInfo"),Le([S()],ce.prototype,"hasActions"),Le([S()],ce.prototype,"hasStartSlot");function cl(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r.nodeType===Node.ELEMENT_NODE}function pl(){ns(),oe(),xe(),k("du-capsule-choice",ce)}const yc=_`
  :host {
    display: inline-flex;
    box-sizing: border-box;
    max-width: 100%;
    vertical-align: middle;
  }

  :host([block]) {
    display: flex;
    width: 100%;
  }

  .du-capsule-button__body {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    min-width: 0;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  du-capsule-layout:not([hover-glow])::part(marker) {
    border: 1px solid transparent;
  }

  du-capsule-layout:not([hover-glow]):not([disabled]):hover:not(:active)::part(marker) {
    border-color: var(--du-fill-p-3);
  }

  .du-capsule-button__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-capsule-button__icon:not([data-has-content]) {
    display: none;
  }
`;var wc=Object.defineProperty,Ht=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&wc(e,t,s),s};const ma=class ma extends hi{constructor(){super(...arguments),this.icon="",this.hoverGlow=!1,this.delegate=!1,this.disabled=!1,this.block=!1,this.helpInfo="",this.hasIconSlot=!1}get resolvedTitle(){return this.resolveComponentTitle(this.buttonTitle)}onIconSlotChange(e){const t=e.target;this.hasIconSlot=t.assignedNodes({flatten:!0}).some(i=>{var s;return i.nodeType===Node.TEXT_NODE?!!((s=i.textContent)!=null&&s.trim()):i.nodeType===Node.ELEMENT_NODE})}onClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.emit("click",{title:this.resolvedTitle})}render(){const e=!!this.icon&&!this.hasIconSlot;return u`
      <du-capsule-layout
        type="gray"
        ?hover-glow=${this.hoverGlow}
        ?delegate=${this.delegate}
        .glowEffectPortalTarget=${this.glowEffectPortalTarget}
        ?disabled=${this.disabled}
        ?block=${this.block}
        help-info=${this.helpInfo}
        @click=${this.onClick}
      >
        <div class="du-capsule-button__body">
          <span
            class="du-capsule-button__icon"
            ?data-has-content=${e||this.hasIconSlot}
          >
            ${e?u`<du-icon name=${this.icon} size="16" decorative></du-icon>`:null}
            <slot name="icon" @slotchange=${this.onIconSlotChange}></slot>
          </span>
          <span class="du-capsule-button__title">${this.resolvedTitle}<slot></slot></span>
        </div>
        <slot name="help-info" slot="help-info"></slot>
      </du-capsule-layout>
    `}};ma.styles=yc;let Ne=ma;Ht([st({attribute:"button-title"})],Ne.prototype,"buttonTitle"),Ht([y()],Ne.prototype,"icon"),Ht([m(!1,{attribute:"hover-glow"})],Ne.prototype,"hoverGlow"),Ht([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],Ne.prototype,"glowEffectPortalTarget"),Ht([m()],Ne.prototype,"delegate"),Ht([m()],Ne.prototype,"disabled"),Ht([m()],Ne.prototype,"block"),Ht([y("",{attribute:"help-info"})],Ne.prototype,"helpInfo"),Ht([S()],Ne.prototype,"hasIconSlot");function fl(){ns(),oe(),k("du-capsule-button",Ne)}const xc=_`
  :host {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
  }

  .du-capsule-drag-tip__label {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;var _c=Object.defineProperty,Ro=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&_c(e,t,s),s};const ga=class ga extends A{constructor(){super(...arguments),this.label="",this.disabled=!1,this.helpInfo=""}onDrop(e){e.stopPropagation();const t=e;this.emit("drop",t.detail)}render(){return u`
      <du-capsule-layout
        type="drag-tip"
        ?disabled=${this.disabled}
        help-info=${this.helpInfo}
        block
        @drop=${this.onDrop}
      >
        <div class="du-capsule-drag-tip__label">${this.label}<slot></slot></div>
        <slot name="help-info" slot="help-info"></slot>
      </du-capsule-layout>
    `}};ga.styles=xc;let Yi=ga;Ro([y()],Yi.prototype,"label"),Ro([m()],Yi.prototype,"disabled"),Ro([y("",{attribute:"help-info"})],Yi.prototype,"helpInfo");function ml(){ns(),k("du-capsule-drag-tip",Yi)}const kc=_`
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    box-sizing: border-box;
    /* 可覆盖 token 仅在使用处写 fallback，便于父级（如 du-tabbar）覆盖 */
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  :host([disabled]) .du-segmented-button {
    --du-disabled-opacity: 1;
    cursor: not-allowed;
    opacity: var(--du-segmented-disabled-opacity, 0.4);
  }

  :host([disabled]) .du-segmented-button__item:disabled {
    opacity: var(--du-segmented-item-unselected-opacity, 1);
  }

  :host([disabled]) .du-segmented-button__item.is-selected:disabled {
    opacity: 1;
  }

  .du-segmented-button {
    --du-segmented-track: var(--du-fill-p1);
    --du-segmented-marker: var(--du-glass-btn);
    --du-segmented-fg: var(--du-on-l-c2);
    /* 非全 icon 默认 40；全 icon 时由 .is-all-icons 切到 44。均可被 --du-segmented-track-min-height 覆盖 */
    --du-segmented-track-min-height-auto: 40px;
    --du-segmented-item-min-height-auto: calc(
      var(--du-segmented-track-min-height, var(--du-segmented-track-min-height-auto)) -
        2 * var(--du-segmented-track-pad, 4px)
    );
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(
      --du-segmented-track-min-height,
      var(--du-segmented-track-min-height-auto)
    );
    padding: var(--du-segmented-track-pad, 4px);
    gap: var(--du-segmented-rail-gap, 4px);
    overflow: hidden;
    background: var(--du-segmented-track);
    border-radius: var(--du-segmented-track-radius, 41px);
  }

  /* 子项全部为纯 icon：轨道 44 / 子项 36（pad 4×2） */
  .du-segmented-button.is-all-icons {
    --du-segmented-track-min-height-auto: 44px;
  }

  /* 无 marker：轨道用质感色/顶栏&导航栏 + topbar Effects */
  :host([marker='hidden']) .du-segmented-button {
    --du-segmented-track: var(--du-glass-topbar);
    background: var(--du-segmented-track);
    box-shadow: var(
      --du-segmented-track-shadow,
      var(--du-texture-topbar)
    );
    backdrop-filter: var(
      --du-segmented-track-filter,
      blur(var(--du-texture-topbar-backdrop-blur, 10px))
    );
    -webkit-backdrop-filter: var(
      --du-segmented-track-filter,
      blur(var(--du-texture-topbar-backdrop-blur, 10px))
    );
  }

  :host([marker='anchor']) .du-segmented-button {
    --du-segmented-track: transparent;
    background: transparent;
  }

  :host([marker='anchor']) .du-segmented-button,
  :host([marker='anchor']) .du-segmented-button__viewport {
    overflow: visible;
  }

  .du-segmented-button__viewport {
    position: relative;
    display: block;
    flex: 1;
    min-width: 0;
    min-height: var(
      --du-segmented-item-min-height,
      var(--du-segmented-item-min-height-auto)
    );
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  .du-segmented-button__viewport::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .du-segmented-button__rail {
    position: relative;
    display: flex;
    align-items: stretch;
    gap: var(--du-segmented-rail-gap, 4px);
    box-sizing: border-box;
    width: max-content;
    min-width: 100%;
    min-height: 100%;
  }

  :host([layout='fill']) .du-segmented-button__rail {
    width: 100%;
  }

  .du-segmented-button__marker {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    box-sizing: border-box;
    min-height: var(
      --du-segmented-item-min-height,
      var(--du-segmented-item-min-height-auto)
    );
    pointer-events: none;
    background: var(--du-segmented-active-marker, var(--du-segmented-marker));
    border-radius: var(--du-segmented-marker-radius, var(--du-segmented-item-radius, 36px));
    box-shadow: var(--du-texture-btn);
    backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
    -webkit-backdrop-filter: blur(var(--du-texture-btn-backdrop-blur, 0px));
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }

  .du-segmented-button__marker.is-anchor {
    top: auto;
    bottom: 0;
    height: 2px;
    min-height: 2px;
    background: var(--du-on-l-c2);
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .du-segmented-button__marker.is-ready {
    opacity: 1;
  }

  .du-segmented-button__marker.is-animated {
    transition:
      transform var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s)))
        cubic-bezier(0.2, 0.8, 0.2, 1),
      width var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s)))
        cubic-bezier(0.2, 0.8, 0.2, 1),
      border-radius var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s)))
        cubic-bezier(0.2, 0.8, 0.2, 1),
      background var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s)))
        ease,
      opacity var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s)))
        ease;
  }

  :host([appear]) .du-segmented-button__marker.is-appear {
    animation: du-segmented-marker-appear
      var(--du-segmented-duration, var(--du-duration-normal, var(--du-duration, 0.3s))) ease;
  }

  @keyframes du-segmented-marker-appear {
    from {
      opacity: 0;
      transform: translate3d(var(--du-segmented-x, 0px), 0, 0) scale(0.92);
    }
    to {
      opacity: 1;
      transform: translate3d(var(--du-segmented-x, 0px), 0, 0) scale(1);
    }
  }

  /*
   * 三种内容态内置默认（绑具体字阶/尺寸，不跟 du-css-config 短别名），均可被外层 CSS 变量覆盖：
   * icon · 24 / pad-x 12 / radius 36
   * text · 13/18 / pad-x 12 / radius 36
   * icon-text · icon 20 · 14/20 / pad-x 16 · radius 36
   */
  .du-segmented-button__item {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: var(--du-segmented-item-gap, 4px);
    min-width: var(--du-segmented-item-min, 48px);
    min-height: var(
      --du-segmented-item-min-height,
      var(--du-segmented-item-min-height-auto)
    );
    margin: 0;
    padding: 0 var(--du-segmented-item-pad-x, 12px);
    color: var(--du-segmented-fg-muted, var(--du-segmented-fg));
    opacity: var(--du-segmented-item-unselected-opacity, 1);
    font-family: inherit;
    font-size: var(--du-segmented-item-font-size, 13px);
    line-height: var(--du-segmented-item-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
    white-space: nowrap;
    background: transparent;
    border: 0;
    border-radius: var(--du-segmented-item-radius, 36px);
    cursor: pointer;
  }

  .du-segmented-button__item:hover:not(:disabled):not(.is-selected) {
    opacity: var(
      --du-segmented-item-hover-opacity,
      var(--du-segmented-item-unselected-opacity, 1)
    );
  }

  :host([marker='anchor']) .du-segmented-button__item {
    opacity: 0.6;
    transition: opacity var(--du-duration-fast, 0.15s) ease;
  }

  :host([marker='anchor'])
    .du-segmented-button__item:hover:not(:disabled):not(.is-selected) {
    opacity: 0.8;
  }

  :host([marker='anchor']) .du-segmented-button__item.is-selected {
    opacity: 1;
  }

  .du-segmented-button__item.is-content-icon-text {
    font-size: var(--du-segmented-item-font-size-icon-text, 14px);
    line-height: var(--du-segmented-item-line-height-icon-text, 20px);
    padding-left: var(--du-segmented-item-pad-x-icon-text, 16px);
    padding-right: var(--du-segmented-item-pad-x-icon-text, 16px);
    border-radius: var(--du-segmented-item-radius-icon-text, 36px);
  }

  :host([layout='fill']) .du-segmented-button__item {
    flex: 1 1 0;
    min-width: 0;
  }

  /*
   * 单选项（.is-single）：轨道无 padding，原 track-pad 挪到 item；
   * item 撑满轨道，glow clip 与轨道轮廓一致。
   * item min-height 不再减 pad（轨道已无内边距，否则光影裁切异常）。
   */
  .du-segmented-button.is-single {
    padding: 0;
    --du-segmented-item-min-height-auto: var(
      --du-segmented-track-min-height,
      var(--du-segmented-track-min-height-auto)
    );
  }

  .du-segmented-button.is-single .du-segmented-button__rail {
    width: 100%;
  }

  .du-segmented-button__item.is-single {
    flex: 1 1 auto;
    align-self: stretch;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: var(--du-segmented-track-pad, 4px) var(--du-segmented-item-pad-x, 12px);
  }

  .du-segmented-button__item.is-single.is-content-icon-text {
    padding-left: var(--du-segmented-item-pad-x-icon-text, 16px);
    padding-right: var(--du-segmented-item-pad-x-icon-text, 16px);
  }

  .du-segmented-button__item.is-selected {
    color: var(--du-segmented-fg);
    opacity: 1;
    font-weight: var(--du-typo-semibold-weight, 600);
  }

  .du-segmented-button__item ::slotted(*) {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--du-segmented-item-gap, 4px);
    max-width: 100%;
    min-width: 0;
    color: var(--du-segmented-item-color, inherit);
    font: inherit;
    line-height: inherit;
  }

  .du-segmented-button__item.is-selected ::slotted(*) {
    color: var(
      --du-segmented-item-selected-color,
      var(--du-segmented-item-color, inherit)
    );
  }

  .du-segmented-button__item:focus,
  .du-segmented-button__item:focus-visible {
    outline: none;
  }

  .du-segmented-button__item:disabled {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-segmented-button__item:disabled > * {
    --du-disabled-opacity: 1;
  }

  :host([readonly]) .du-segmented-button__item:not(:disabled) {
    cursor: default;
  }
`;var Cc=Object.defineProperty,Z=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Cc(e,t,s),s};const Sc=["hug","fill"],$c=["parent","item"],Ec=8,Ls="du-seg-",gl="--du-segmented-item-marker",Lo="--du-segmented-active-marker",Tc=new Set(["segmented-topbar","segmented-icon","segmented-text"]);function bl(r){return typeof r=="string"&&Tc.has(r)}function vl(r){return r==="icon"?"segmented-icon":r==="icon-text"?"segmented-topbar":"segmented-text"}const yl={fromAttribute:r=>r??"",toAttribute:r=>typeof r=="function"||r===""||r==null?null:String(r)};function ls(r){return r===!1||r==="false"||r==="hidden"?"hidden":r==="anchor"?"anchor":"capsule"}const Pc={fromAttribute:r=>ls(r),toAttribute:r=>ls(r)},Ac={icon:{prop:"--du-segmented-icon-size",fallback:"24"},"icon-text":{prop:"--du-segmented-icon-size-icon-text",fallback:"20"},text:null};function Ns(r){const e=r.tagName.toLowerCase();return e==="du-icon"||e==="svg"||e==="img"}function wl(r){return r.localName.startsWith("du-")&&!Ns(r)}function xl(r,e){if(Ns(r)&&(!e||r.localName===e))return[r];const t=[],i=s=>{for(const o of s.children){if(e?o.localName===e:Ns(o)){t.push(o);continue}wl(o)||i(o)}};return i(r),t}function Oc(r){const t=xl(r).length>0,i=_l(r);return t&&i?"icon-text":t?"icon":"text"}function _l(r){var e;return r.nodeType===Node.TEXT_NODE?!!((e=r.textContent)!=null&&e.trim()):r instanceof Element&&(Ns(r)||wl(r))?!1:Array.from(r.childNodes).some(_l)}function Dc(r,e){const t=Ac[e];return t?(getComputedStyle(r).getPropertyValue(t.prop).trim()||t.fallback).replace(/px$/i,"")||t.fallback:null}const kl=new WeakSet;function Ic(r){var t;return kl.has(r)?!1:r.hasAttribute("size")?!0:!!((t=r.size)!=null&&t.trim())}function Mc(r,e,t){const i=Dc(r,t);if(!i)return;const s=xl(e,"du-icon");for(const o of s)Ic(o)||(o.getAttribute("size")!==i&&o.setAttribute("size",i),kl.add(o))}function zc(r){return r==="icon-text"?"var(--du-segmented-item-radius-icon-text, 36px)":"var(--du-segmented-item-radius, 36px)"}const ba=class ba extends A{constructor(){super(...arguments),this.value="",this.layout="hug",this.block=!1,this.appear=!1,this.passive=!1,this.disabled=!1,this.readOnly=!1,this.marker="capsule",this.itemGlowMode="",this.containerGlowMode="",this.containerGlowFlow="parent",this.glowEffectZIndex=5,this.delegate=!1,this.selectable=!0,this.itemMinWidth="",this.options=[],this.markerState={x:0,width:0,ready:!1,animated:!1,appear:!1},this.hasAppeared=!1,this.syncRaf=0,this.collecting=!1,this.nearestContainerGlowItem=null,this.onContainerGlowPointerMove=e=>{this.containerGlowFlow!=="item"||!this.resolveContainerGlowMode()||this.updateNearestContainerGlowItem(e.clientX,e.clientY)},this.onContainerGlowPointerLeave=()=>{this.nearestContainerGlowItem=null},this.resolveContainerGlowShapeFollower=()=>{if(this.containerGlowFlow!=="item")return;const e=this.nearestContainerGlowItem;if(!(!e||this.isContainerGlowActiveItem(e)))return e},this.resolveContainerClipShapeFollower=()=>{if(this.containerGlowFlow!=="item")return;const e=this.nearestContainerGlowItem;if(!(!e||!this.isContainerGlowActiveItem(e)))return e}}get resolvedMarker(){return ls(this.marker)}connectedCallback(){super.connectedCallback(),this.collectOptions(),this.mutationObserver=is(this,()=>{this.collectOptions(),this.scheduleSyncMarker()},{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["value","data-value","test-id","aria-label","title","disabled","aria-disabled","class","style"]})}disconnectedCallback(){var e,t;(e=this.resizeObserver)==null||e.disconnect(),(t=this.mutationObserver)==null||t.disconnect(),this.syncRaf&&cancelAnimationFrame(this.syncRaf),super.disconnectedCallback()}firstUpdated(){const e=this.viewport;e&&(this.resizeObserver=Os([this,e,this.rail].filter(Boolean),()=>this.scheduleSyncMarker())),this.scheduleSyncMarker(!0)}willUpdate(e){if(e.has("marker")){const t=ls(this.marker);this.marker!==t&&(this.marker=t)}}updated(e){(e.has("value")||e.has("layout")||e.has("itemMinWidth")||e.has("options")||e.has("marker"))&&this.scheduleSyncMarker()}isOptionHost(e){return!e.slot||e.slot.startsWith(Ls)}collectOptions(){var e,t;if(!this.collecting){this.collecting=!0;try{const i=[],s=new Set;let o=0;for(const l of Array.from(this.children)){if(!(l instanceof HTMLElement)||!this.isOptionHost(l))continue;const h=l.getAttribute("value")||l.getAttribute("data-value")||((e=l.textContent)==null?void 0:e.trim())||"";if(!h){l.slot.startsWith(Ls)&&l.removeAttribute("slot");continue}const p=`${Ls}${o}`;l.slot!==p&&(l.slot=p),s.add(l);const f=Oc(l);Mc(this,l,f);const g=((t=l.textContent)==null?void 0:t.trim())||h;i.push({testId:l.getAttribute("test-id")??"",value:h,label:g,ariaLabel:l.getAttribute("aria-label")||l.getAttribute("title")||g,disabled:l.hasAttribute("disabled")||l.getAttribute("aria-disabled")==="true",contentKind:f,slot:p}),o+=1}for(const l of Array.from(this.children))l instanceof HTMLElement&&l.slot.startsWith(Ls)&&!s.has(l)&&l.removeAttribute("slot");this.options.length===i.length&&this.options.every((l,h)=>l.testId===i[h].testId&&l.value===i[h].value&&l.label===i[h].label&&l.ariaLabel===i[h].ariaLabel&&l.disabled===i[h].disabled&&l.contentKind===i[h].contentKind&&l.slot===i[h].slot)||(this.options=i)}finally{this.collecting=!1}}}scheduleSyncMarker(e=!1){this.syncRaf&&cancelAnimationFrame(this.syncRaf),this.syncRaf=requestAnimationFrame(async()=>{this.syncRaf=0,await this.updateComplete,this.syncMarker(e)})}relayout(){this.scheduleSyncMarker()}syncMarker(e=!1){if(this.resolvedMarker==="hidden"){this.setMarkerReady(!1);return}const t=this.viewport,i=this.rail;if(!t||!i)return;const s=i.querySelector(`.du-segmented-button__item[data-value="${Rc(this.value)}"]`);if(!s){this.setMarkerReady(!1);return}const o=s.offsetLeft,a=s.offsetWidth;if(a<=0){this.setMarkerReady(!1);return}const l=this.options.find(x=>x.value===this.value);this.syncMarkerAppearance(l);const h=this.appear&&!this.hasAppeared,p=this.markerState.ready&&!h,f={x:o,width:Math.max(a,1),ready:!0,animated:p,appear:h};(this.markerState.x!==f.x||this.markerState.width!==f.width||this.markerState.ready!==f.ready||this.markerState.animated!==f.animated||this.markerState.appear!==f.appear)&&(this.markerState=f,this.applyMarkerDom()),h&&(this.hasAppeared=!0);const g=o,v=g+a;g<t.scrollLeft?t.scrollTo({left:g,behavior:e?"auto":"smooth"}):v>t.scrollLeft+t.clientWidth&&t.scrollTo({left:v-t.clientWidth,behavior:e?"auto":"smooth"})}setMarkerReady(e){this.markerState.ready!==e&&(this.markerState={...this.markerState,ready:e},this.applyMarkerDom())}syncMarkerAppearance(e){const t=this.markerEl,i=e?Array.from(this.children).find(o=>o instanceof HTMLElement&&o.slot===e.slot):void 0;if(!t||!i){t==null||t.style.removeProperty(Lo);return}const s=i.style.getPropertyValue(gl).trim()||getComputedStyle(i).getPropertyValue(gl).trim();s?t.style.setProperty(Lo,s):t.style.removeProperty(Lo)}applyMarkerDom(){const e=this.markerEl;e&&(e.classList.toggle("is-ready",this.markerState.ready),e.classList.toggle("is-animated",this.markerState.animated),e.classList.toggle("is-appear",this.markerState.appear),e.style.width=`${this.markerState.width}px`,e.style.transform=`translate3d(${this.markerState.x}px, 0, 0)`,e.style.setProperty("--du-segmented-x",`${this.markerState.x}px`))}resolveItemGlowMode(e){const t=this.itemGlowMode;return t===""||t==null?null:typeof t=="function"?t(e.contentKind,e):t==="auto"?vl(e.contentKind):bl(t)?t:null}resolveContainerGlowMode(){const e=this.containerGlowMode;if(e===""||e==null)return null;const t=this.options.map(i=>({type:i.contentKind,option:i}));if(typeof e=="function")return e(t);if(e==="auto"){if(t.length===0)return null;const i=t.map(({type:o})=>vl(o)),s=i[0];return i.every(o=>o===s)?s:null}return bl(e)?e:null}distanceToRect(e,t,i){const s=e<i.left?i.left-e:e>i.right?e-i.right:0,o=t<i.top?i.top-t:t>i.bottom?t-i.bottom:0;return Math.hypot(s,o)}updateNearestContainerGlowItem(e,t){if(this.containerGlowFlow!=="item"){this.nearestContainerGlowItem=null;return}const i=this.renderRoot.querySelectorAll(".du-segmented-button__item");if(!i.length){this.nearestContainerGlowItem=null;return}let s=null,o=1/0;for(const h of i){const p=this.distanceToRect(e,t,h.getBoundingClientRect());p<o&&(o=p,s=h)}if(!s)return;const a=this.nearestContainerGlowItem;if(!a||a===s){this.nearestContainerGlowItem=s;return}const l=this.distanceToRect(e,t,a.getBoundingClientRect());(o===0||o+Ec<l)&&(this.nearestContainerGlowItem=s)}isContainerGlowActiveItem(e){if(!e)return!1;const t=e.getAttribute("data-value");return t!=null&&t===this.value}select(e,t){!this.selectable||t||this.isOwnDisabled||this.isOwnReadonly||e===this.value||this.emit("before-change",{value:e},{cancelable:!0}).defaultPrevented||(this.passive||(this.value=e,this.scheduleSyncMarker()),this.emitValueChange("value",e,{value:e}))}onItemClick(e,t,i){e.stopPropagation(),!(this.isOwnDisabled||i||this.emit("click",{value:t},{cancelable:!0}).defaultPrevented)&&this.select(t,!1)}onKeydown(e,t){var o;if(this.isOwnDisabled||e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const i=e.key==="ArrowRight"?1:-1;let s=t;for(let a=0;a<this.options.length;a+=1)if(s=(s+i+this.options.length)%this.options.length,!this.options[s].disabled){this.select(this.options[s].value,!1);const l=(o=this.viewport)==null?void 0:o.querySelectorAll(".du-segmented-button__item")[s];l==null||l.focus();break}}render(){var l;const e=kr(this.itemMinWidth)||(this.layout==="fill"?"0px":"48px"),t=(l=this.options.find(h=>h.value===this.value))==null?void 0:l.contentKind,i=this.options.length===1,s=this.options.length>0&&this.options.every(h=>h.contentKind==="icon"),o=this.isOwnDisabled,a=o?null:this.resolveContainerGlowMode();return u`
      <div
        class=${di({"du-segmented-button":!0,"is-single":i,"is-all-icons":s})}
        part="track"
        role="tablist"
        aria-disabled=${o?"true":"false"}
        aria-readonly=${this.isOwnReadonly?"true":"false"}
        style=${ne({"--du-segmented-item-min":e,"--du-segmented-marker-radius":zc(t)})}
        @pointerenter=${this.onContainerGlowPointerMove}
        @pointermove=${this.onContainerGlowPointerMove}
        @pointerleave=${this.onContainerGlowPointerLeave}
      >
        ${a?u`<du-glow-effect
              part="container-glow"
              mode=${a}
              ?delegate=${this.delegate}
              .portalTarget=${this.glowEffectPortalTarget}
              .zIndex=${this.glowEffectZIndex}
              .glowShapeFollower=${this.containerGlowFlow==="item"?this.resolveContainerGlowShapeFollower:void 0}
              .clipShapeFollower=${this.containerGlowFlow==="item"?this.resolveContainerClipShapeFollower:void 0}
            ></du-glow-effect>`:b}
        <div class="du-segmented-button__viewport" part="viewport">
          <div class="du-segmented-button__rail" part="rail">
            ${this.resolvedMarker!=="hidden"?u`
                  <div
                    class=${di({"du-segmented-button__marker":!0,"is-anchor":this.resolvedMarker==="anchor","is-ready":this.markerState.ready,"is-animated":this.markerState.animated,"is-appear":this.markerState.appear})}
                    part="marker"
                    style=${ne({width:`${this.markerState.width}px`,transform:`translate3d(${this.markerState.x}px, 0, 0)`,"--du-segmented-x":`${this.markerState.x}px`})}
                  ></div>
                `:b}
            ${this.options.map((h,p)=>{const f=o||h.disabled||this.isOwnReadonly?null:this.resolveItemGlowMode(h);return u`
                <button
                  class=${di({"du-segmented-button__item":!0,"is-single":i,"is-selected":h.value===this.value,"is-content-icon":h.contentKind==="icon","is-content-icon-text":h.contentKind==="icon-text","is-content-text":h.contentKind==="text"})}
                  part="item"
                  type="button"
                  role="tab"
                  data-testid=${ae(h.testId)}
                  data-value=${h.value}
                  aria-label=${h.ariaLabel}
                  aria-selected=${String(h.value===this.value)}
                  ?disabled=${o||h.disabled}
                  @click=${g=>this.onItemClick(g,h.value,h.disabled)}
                  @keydown=${g=>this.onKeydown(g,p)}
                >
                  ${f?u`<du-glow-effect
                        part="glow"
                        mode=${f}
                        ?delegate=${this.delegate}
                        .portalTarget=${this.glowEffectPortalTarget}
                        .zIndex=${this.glowEffectZIndex}
                      ></du-glow-effect>`:b}
                  <slot name=${h.slot}></slot>
                </button>
              `})}
          </div>
        </div>
      </div>
    `}};ba.styles=kc;let H=ba;Z([y()],H.prototype,"value"),Z([$(Sc,"hug")],H.prototype,"layout"),Z([m()],H.prototype,"block"),Z([m()],H.prototype,"appear"),Z([m()],H.prototype,"passive"),Z([m()],H.prototype,"disabled"),Z([m(!1,{attribute:"readonly"})],H.prototype,"readOnly"),Z([C({reflect:!0,converter:Pc})],H.prototype,"marker"),Z([C({attribute:"item-glow-mode",reflect:!0,converter:yl})],H.prototype,"itemGlowMode"),Z([C({attribute:"container-glow-mode",reflect:!0,converter:yl})],H.prototype,"containerGlowMode"),Z([$($c,"parent",{attribute:"container-glow-flow"})],H.prototype,"containerGlowFlow"),Z([T(5,{attribute:"glow-effect-z-index",integer:!0})],H.prototype,"glowEffectZIndex"),Z([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],H.prototype,"glowEffectPortalTarget"),Z([m()],H.prototype,"delegate"),Z([m(!0)],H.prototype,"selectable"),Z([y("",{attribute:"item-min-width"})],H.prototype,"itemMinWidth"),Z([S()],H.prototype,"options"),Z([q(".du-segmented-button__viewport")],H.prototype,"viewport"),Z([q(".du-segmented-button__rail")],H.prototype,"rail"),Z([q(".du-segmented-button__marker")],H.prototype,"markerEl");function Rc(r){return typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(r):r.replace(/["\\]/g,"\\$&")}function ds(){as(),k("du-segmented-button",H)}const Lc=_`
  :host {
    display: block;
    max-width: 100%;
    box-sizing: border-box;
  }

  /*
   * 变量写在 du-segmented-button 上（非仅 :host 继承），避免被 segmented 内部默认盖住。
   * Tab · anchor（Figma 218:93166）
   */
  du-segmented-button {
    display: block;
    max-width: 100%;

    --du-segmented-track: transparent;
    --du-segmented-track-shadow: none;
    --du-segmented-track-filter: none;
    --du-segmented-track-pad: 0px;
    --du-segmented-rail-gap: 22px;
    --du-segmented-item-gap: 8px;
    --du-segmented-item-min: 32px;
    --du-segmented-item-pad-x: 0px;
    --du-segmented-item-pad-x-icon-text: 0px;
    --du-segmented-item-radius: 0px;
    --du-segmented-item-radius-icon-text: 0px;
    --du-segmented-icon-size: 24px;
    --du-segmented-icon-size-icon-text: 24px;
    --du-segmented-item-font-size: 16px;
    --du-segmented-item-line-height: 22px;
    --du-segmented-item-font-size-icon-text: 16px;
    --du-segmented-item-line-height-icon-text: 22px;
    --du-segmented-fg: var(--du-on-l-c2);
    --du-segmented-item-unselected-opacity: 0.6;
  }

  /* Text Tab · 无 anchor（Figma 1384:154049） */
  :host([marker='hidden']) du-segmented-button {
    --du-segmented-track-min-height: 20px;
    --du-segmented-item-min-height: 20px;
    --du-segmented-rail-gap: 16px;
    --du-segmented-item-gap: 4px;
    --du-segmented-item-font-size: 14px;
    --du-segmented-item-line-height: 20px;
    --du-segmented-item-font-size-icon-text: 14px;
    --du-segmented-item-line-height-icon-text: 20px;
    --du-segmented-fg-muted: var(--du-on-l-c4);
    --du-segmented-item-unselected-opacity: 0.6;
    --du-segmented-item-hover-opacity: 0.8;
  }

  du-segmented-button::part(track) {
    height: 40px;
    padding: 0;
    gap: 0;
    overflow: visible;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  :host([marker='hidden']) du-segmented-button::part(track) {
    height: 20px;
    min-height: 20px;
  }

  du-segmented-button::part(viewport) {
    overflow: visible;
  }

  du-segmented-button::part(rail) {
    gap: var(--du-segmented-rail-gap, 22px);
  }

  du-segmented-button::part(item) {
    height: 40px;
    min-width: 32px;
    padding: 0;
    border-radius: 0;
    gap: var(--du-segmented-item-gap, 8px);
  }

  /* 选中文字仍使用 segmented 的 Semibold；icon 不随选中态继承加粗。 */
  du-segmented-button du-icon {
    font-weight: var(--du-typo-regular-weight, 400);
  }

  :host([marker='hidden']) du-segmented-button::part(item) {
    height: 20px;
    min-height: 20px;
    transition: opacity var(--du-duration-fast, 0.15s) ease;
  }

  slot[data-options] {
    display: none;
  }
`;var Nc=Object.defineProperty,qi=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Nc(e,t,s),s};const Hc=["hug","fill"],Fc={fromAttribute:r=>r==="hidden"||r==="false"?"hidden":"anchor",toAttribute:r=>r},va=class va extends A{constructor(){super(...arguments),this.value="",this.marker="anchor",this.layout="hug",this.block=!1,this.passive=!1,this.itemMinWidth="32px"}redistributeOptions(){var i;const e=this.renderRoot.querySelector("slot[data-options]"),t=this.segmented;if(!(!e||!t)){for(const s of e.assignedElements({flatten:!0}))s.parentElement!==t&&t.appendChild(s);(i=t.relayout)==null||i.call(t)}}onInnerBeforeChange(e){e.stopPropagation();const t=e.detail??{value:""};this.emit("before-change",t,{cancelable:!0}).defaultPrevented&&e.preventDefault()}onInnerChange(e){e.stopPropagation();const t=e.detail,i=(t==null?void 0:t.value)??"";this.passive||(this.value=i),this.emitValueChange("value",i,{value:i})}onInnerUpdate(e){e.stopPropagation();const t=e.detail??"";if(this.passive){this.emit("update:value",t);return}t!==this.value&&(this.value=t)}relayout(){var e,t;(t=(e=this.segmented)==null?void 0:e.relayout)==null||t.call(e)}firstUpdated(){this.redistributeOptions()}updated(e){var t,i;(e.has("value")||e.has("marker")||e.has("layout"))&&((i=(t=this.segmented)==null?void 0:t.relayout)==null||i.call(t))}render(){return u`
      <du-segmented-button
        .value=${this.value}
        marker=${this.marker}
        layout=${this.layout}
        ?block=${this.block}
        ?passive=${this.passive}
        item-min-width=${this.itemMinWidth}
        @before-change=${this.onInnerBeforeChange}
        @change=${this.onInnerChange}
        @update:value=${this.onInnerUpdate}
      ></du-segmented-button>
      <slot data-options @slotchange=${this.redistributeOptions}></slot>
    `}};va.styles=Lc;let dt=va;qi([y()],dt.prototype,"value"),qi([C({type:String,reflect:!0,converter:Fc})],dt.prototype,"marker"),qi([$(Hc,"hug")],dt.prototype,"layout"),qi([m()],dt.prototype,"block"),qi([m()],dt.prototype,"passive"),qi([y("32px",{attribute:"item-min-width"})],dt.prototype,"itemMinWidth"),qi([q("du-segmented-button")],dt.prototype,"segmented");function Cl(){ds(),k("du-tabbar",dt)}const Vc=_`
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    box-sizing: border-box;

    --du-segmented-icon-size: 20px;
    --du-segmented-track-pad: 0px;
    --du-segmented-item-pad-x: 12px;
    --du-segmented-item-min: 0px;
  }

  du-segmented-button {
    display: block;
    max-width: 100%;
  }

  du-segmented-button::part(track) {
    height: 44px;
    padding: 0;
    gap: 0;
  }

  du-segmented-button::part(item) {
    height: 44px;
    min-width: 0;
    padding: 12px;
  }
`;var Bc=Object.defineProperty,Xi=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Bc(e,t,s),s};const ya=class ya extends A{constructor(){super(...arguments),this.testId="",this.name="",this.label="",this.color="",this.disabled=!1,this.delegate=!1}onClick(e){const t=e.detail;if(!(!t||typeof t.value!="string")){if(this.disabled){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.emit("click",{name:this.name})}}render(){const e=this.label||this.name||"action",t=this.name||"action";return u`
      <du-segmented-button
        marker="hidden"
        item-glow-mode="segmented-topbar"
        ?delegate=${this.delegate}
        .glowEffectPortalTarget=${this.glowEffectPortalTarget}
        selectable="false"
        item-min-width="0"
        @click=${this.onClick}
      >
        <span
          value=${t}
          test-id=${ae(this.testId)}
          aria-label=${e}
          ?disabled=${this.disabled}
        >
          ${this.name?u`<du-icon
                name=${this.name}
                size="20"
                color=${this.color||b}
                decorative
              ></du-icon>`:b}
          <slot></slot>
        </span>
      </du-segmented-button>
    `}};ya.styles=Vc;let ht=ya;Xi([y("",{attribute:"test-id",reflect:!1})],ht.prototype,"testId"),Xi([y()],ht.prototype,"name"),Xi([y()],ht.prototype,"label"),Xi([y()],ht.prototype,"color"),Xi([m()],ht.prototype,"disabled"),Xi([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],ht.prototype,"glowEffectPortalTarget"),Xi([m()],ht.prototype,"delegate");function Sl(){oe(),ds(),k("du-action-icon",ht)}const Uc=_`
  :host {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--du-gap-4);
    align-items: center;
    max-width: 100%;
  }
`;var Gc=Object.defineProperty,No=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Gc(e,t,s),s};function Wc(r){return r instanceof HTMLElement&&(r.localName==="du-selection-chip"||r.localName==="du-filter-chip")&&"selected"in r&&typeof r.setSelectedSilent=="function"}function $l(r){return r.value||""}function El(r,e){return Wc(e)&&e.closest("du-chip-group")===r}const wa=class wa extends A{constructor(){super(...arguments),this.multiple=!1,this.readOnly=!1,this.passive=!1,this.onChildChange=e=>{if(!El(this,e.target))return;e.stopPropagation();const t=e.target,i=e.detail,s=i&&typeof i.selected=="boolean"?i.selected:t.selected,o=this.passive||t.passive;if(!this.multiple&&s&&!o)for(const l of this.collectChips())l!==t&&l.selected&&l.setSelectedSilent(!1);const a=o?this.collectSelectedValuesFromIntent(t,s):this.collectSelectedValues();this.emitGroupChange(a)}}get values(){return this.collectSelectedValues()}get value(){const e=this.collectSelectedValues();return this.multiple?e:e[0]??""}collectChips(){const e=[];for(const t of this.querySelectorAll("du-selection-chip, du-filter-chip"))El(this,t)&&e.push(t);return e}collectSelectedValues(){return this.collectChips().filter(e=>e.selected).map(e=>$l(e))}collectSelectedValuesFromIntent(e,t){const i=[];for(const s of this.collectChips()){let o=s.selected;s===e?o=t:!this.multiple&&t&&(o=!1),o&&i.push($l(s))}return i}emitGroupChange(e){const t=this.multiple?e:e[0]??"";this.emitValueChange("value",t,{value:t,values:e,multiple:this.multiple})}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.onChildChange)}disconnectedCallback(){this.removeEventListener("change",this.onChildChange),super.disconnectedCallback()}updated(e){if(e.has("readOnly"))for(const t of this.collectChips())t.requestUpdate()}render(){return u`<slot></slot>`}};wa.styles=Uc;let Ki=wa;No([m()],Ki.prototype,"multiple"),No([m(!1,{attribute:"readonly"})],Ki.prototype,"readOnly"),No([m()],Ki.prototype,"passive");function Tl(r){const e=r.closest("du-chip-group");return!!(e!=null&&e.readOnly)}const jc=_`
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  :host([block]) {
    display: block;
    width: 100%;
  }

  .du-selection-chip {
    --du-chip-bg: var(--du-fill-p1);
    --du-chip-fg: var(--du-on-l-c2);
    --du-chip-border: transparent;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    width: auto;
    max-width: 100%;
    min-width: 0;
    height: 40px;
    padding: 8px;
    color: var(--du-chip-fg);
    font: inherit;
    line-height: inherit;
    text-align: left;
    background: var(--du-chip-bg);
    border: 1px solid var(--du-chip-border);
    border-radius: 999px;
    cursor: pointer;
    transition:
      background-color var(--du-duration-normal, 0.2s) ease,
      border-color var(--du-duration-normal, 0.2s) ease,
      color var(--du-duration-normal, 0.2s) ease,
      opacity var(--du-duration-normal, 0.2s) ease;
    ${te}
  }

  :host([block]) .du-selection-chip {
    width: 100%;
    padding: 0;
  }

  .du-selection-chip du-layout {
    width: 100%;
    height: 100%;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  :host([block]) .du-selection-chip du-layout {
    padding: 8px;
  }

  .du-selection-chip:not(:disabled):not([aria-readonly='true']):hover {
    --du-chip-bg: var(--du-state-hover);
    --du-chip-border: var(--du-fill-p-3);
  }

  .du-selection-chip--selected,
  .du-selection-chip--selected:not(:disabled):not([aria-readonly='true']):hover {
    --du-chip-bg: var(--du-on-l-c2);
    --du-chip-fg: var(--du-on-d-c2);
    --du-chip-border: transparent;
  }

  .du-selection-chip:focus-visible {
    outline: none;
  }

  .du-selection-chip:disabled {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-selection-chip[aria-readonly='true']:not(:disabled) {
    cursor: default;
  }

  .du-selection-chip:disabled > * {
    --du-disabled-opacity: 1;
  }

  .du-selection-chip:disabled:not(.du-selection-chip--selected) {
    --du-chip-bg: var(--du-state-hover);
    --du-chip-border: var(--du-fill-p-3);
  }
`;var Yc=Object.defineProperty,Ft=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Yc(e,t,s),s};const xa=class xa extends ye{constructor(){super(...arguments),this.testId="",this.selected=!1,this.disabled=!1,this.block=!1,this.lines=1,this.passive=!1,this.value="",this.initialSelected=!1}connectedCallback(){super.connectedCallback(),this.initialSelected=this.selected||this.isBooleanAttribute("selected")}getFormValue(){return this.selected?this.value||"on":null}resetFormControl(){this.selected=this.initialSelected}restoreFormState(e){typeof e=="string"&&(this.selected=e===(this.value||"on"))}get isInteractiveDisabled(){return this.isEffectivelyDisabled}setSelectedSilent(e){this.selected=e,this.setFormValue(this.getFormValue())}get isEffectivelyReadonly(){return this.isOwnReadonly||Tl(this)}get resolvedTextOverflow(){return this.textOverflow??(this.block?"wrap":"ellipsis")}toggle(){if(this.isInteractiveDisabled||this.isEffectivelyReadonly)return;const e=!this.selected;this.passive||(this.selected=e,this.setFormValue(this.getFormValue())),this.emitValueChange("selected",e,{selected:e,value:this.value})}handleKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}render(){const e=this.isInteractiveDisabled,t=this.isEffectivelyReadonly,i=["du-selection-chip",this.selected?"du-selection-chip--selected":""].filter(Boolean).join(" ");return u`
      <button
        class=${i}
        part="chip"
        type="button"
        role="checkbox"
        data-testid=${ae(this.testId)}
        aria-checked=${String(this.selected)}
        aria-readonly=${t?"true":"false"}
        ?disabled=${e}
        @click=${this.toggle}
        @keydown=${this.handleKeydown}
      >
        <du-layout
          part="layout"
          width="100%"
          height="100%"
          text-overflow=${this.resolvedTextOverflow}
          .overflowHelpInfo=${this.overflowHelpInfo}
          lines=${this.lines}
          gap="4"
        >
          <slot name="start" slot="start"></slot>
          <slot></slot>
          <slot name="end" slot="end"></slot>
        </du-layout>
      </button>
    `}};xa.styles=jc;let He=xa;Ft([y("",{attribute:"test-id",reflect:!1})],He.prototype,"testId"),Ft([m()],He.prototype,"selected"),Ft([m()],He.prototype,"disabled"),Ft([m()],He.prototype,"block"),Ft([zt($o,{attribute:"text-overflow"})],He.prototype,"textOverflow"),Ft([st({attribute:"overflow-help-info"})],He.prototype,"overflowHelpInfo"),Ft([T(1,{integer:!0,min:1})],He.prototype,"lines"),Ft([m()],He.prototype,"passive"),Ft([y()],He.prototype,"value");function Pl(){xe(),k("du-selection-chip",He)}const qc=_`
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  .du-filter-chip {
    --du-chip-bg: var(--du-fill-p1);
    --du-chip-fg: var(--du-on-l-c2);
    --du-chip-border: transparent;
    --du-chip-count-fg: var(--du-on-l-c4);
    --du-chip-count-border: var(--du-fill-p-3);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    width: auto;
    max-width: 100%;
    min-width: 0;
    height: 28px;
    padding: 0 12px;
    color: var(--du-chip-fg);
    font: inherit;
    line-height: inherit;
    background: var(--du-chip-bg);
    border: 1px solid var(--du-chip-border);
    border-radius: 999px;
    cursor: pointer;
    transition:
      background-color var(--du-duration-normal, 0.2s) ease,
      border-color var(--du-duration-normal, 0.2s) ease,
      color var(--du-duration-normal, 0.2s) ease,
      opacity var(--du-duration-normal, 0.2s) ease;
    ${te}
  }

  .du-filter-chip--has-end {
    padding-right: 4px;
  }

  .du-filter-chip > du-layout {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 4px 0;
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-filter-chip__count {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 4px;
    color: var(--du-chip-count-fg);
    border: 1px solid var(--du-chip-count-border);
    border-radius: 22px;
    white-space: nowrap;
  }

  .du-filter-chip:not(:disabled):not([aria-readonly='true']):hover {
    --du-chip-bg: var(--du-state-hover);
    --du-chip-border: var(--du-fill-p-3);
  }

  .du-filter-chip--selected,
  .du-filter-chip--selected:not(:disabled):not([aria-readonly='true']):hover {
    --du-chip-bg: var(--du-on-l-c2);
    --du-chip-fg: var(--du-on-d-c2);
    --du-chip-border: transparent;
    --du-chip-count-fg: var(--du-on-d-c4);
    --du-chip-count-border: var(--du-on-d-c7);
  }

  .du-filter-chip:focus-visible {
    outline: none;
  }

  .du-filter-chip:disabled {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-filter-chip[aria-readonly='true']:not(:disabled) {
    cursor: default;
  }

  .du-filter-chip:disabled > * {
    --du-disabled-opacity: 1;
  }
`;var Xc=Object.defineProperty,Tr=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Xc(e,t,s),s};const _a=class _a extends ye{constructor(){super(...arguments),this.testId="",this.selected=!1,this.disabled=!1,this.passive=!1,this.value="",this.hasEnd=!1,this.initialSelected=!1}connectedCallback(){super.connectedCallback(),this.initialSelected=this.selected||this.isBooleanAttribute("selected")}getFormValue(){return this.selected?this.value||"on":null}resetFormControl(){this.selected=this.initialSelected}restoreFormState(e){typeof e=="string"&&(this.selected=e===(this.value||"on"))}get isInteractiveDisabled(){return this.isEffectivelyDisabled}setSelectedSilent(e){this.selected=e,this.setFormValue(this.getFormValue())}get isEffectivelyReadonly(){return this.isOwnReadonly||Tl(this)}toggle(){if(this.isInteractiveDisabled||this.isEffectivelyReadonly)return;const e=!this.selected;this.passive||(this.selected=e,this.setFormValue(this.getFormValue())),this.emitValueChange("selected",e,{selected:e,value:this.value})}handleKeydown(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}handleEndSlotChange(e){const t=e.target;this.hasEnd=t.assignedNodes({flatten:!0}).some(i=>{var s;return i.nodeType===Node.TEXT_NODE?!!((s=i.textContent)!=null&&s.trim()):i.nodeType===Node.ELEMENT_NODE})}firstUpdated(){const e=this.renderRoot.querySelector('slot[name="end"]');e&&this.handleEndSlotChange({target:e})}render(){const e=this.isInteractiveDisabled,t=this.isEffectivelyReadonly,i=["du-filter-chip",this.selected?"du-filter-chip--selected":"",this.hasEnd?"du-filter-chip--has-end":""].filter(Boolean).join(" ");return u`
      <button
        class=${i}
        part="chip"
        type="button"
        role="checkbox"
        data-testid=${ae(this.testId)}
        aria-checked=${String(this.selected)}
        aria-readonly=${t?"true":"false"}
        ?disabled=${e}
        @click=${this.toggle}
        @keydown=${this.handleKeydown}
      >
        <du-layout width="100%" height="100%" text-overflow="ellipsis" lines="1" gap="4">
          <slot name="start" slot="start"></slot>
          <slot></slot>
          ${this.hasEnd?u`
                <span class="du-filter-chip__count" part="count" slot="end">
                  <slot name="end" @slotchange=${this.handleEndSlotChange}></slot>
                </span>
              `:u`<slot name="end" slot="end" @slotchange=${this.handleEndSlotChange}></slot>`}
        </du-layout>
      </button>
    `}};_a.styles=qc;let _t=_a;Tr([y("",{attribute:"test-id",reflect:!1})],_t.prototype,"testId"),Tr([m()],_t.prototype,"selected"),Tr([m()],_t.prototype,"disabled"),Tr([m()],_t.prototype,"passive"),Tr([y()],_t.prototype,"value"),Tr([S()],_t.prototype,"hasEnd");function Al(){xe(),k("du-filter-chip",_t)}function Ol(){k("du-chip-group",Ki)}const Kc=_`
  :host {
    display: inline-flex;
    position: relative;
    z-index: var(--du-layer-z-index, 1400);
    max-width: 100%;
    vertical-align: middle;
  }

  :host([popover]) {
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  .du-toast {
    --du-toast-bg: var(--du-fill-p8);
    --du-toast-fg: var(--du-on-l-c2);
    --du-toast-icon: var(--du-accent-blue);
    --du-toast-blur: var(--du-shadow-l4-backdrop-blur, 100px);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    min-height: 48px;
    padding: 12px 20px;
    color: var(--du-toast-fg);
    font-size: var(--du-typo-body-regular-m-size, 14px);
    line-height: var(--du-typo-body-regular-m-line-height, 20px);
    font-weight: var(--du-typo-regular-weight, 400);
    background: var(--du-toast-bg);
    border-radius: var(--du-radius-round-corner-full, 9999px);
    box-shadow: var(--du-shadow-l4);
    backdrop-filter: blur(var(--du-toast-blur));
    -webkit-backdrop-filter: blur(var(--du-toast-blur));
  }

  .du-toast--info,
  .du-toast--text {
    --du-toast-bg: var(--du-fill-p8);
    --du-toast-icon: var(--du-on-l-c4);
  }

  .du-toast--error {
    --du-toast-bg: var(--du-c-v1-red);
    --du-toast-fg: var(--du-accent-red);
    --du-toast-icon: var(--du-accent-red);
  }

  .du-toast--text {
    padding-top: 13px;
    padding-bottom: 13px;
  }

  .du-toast du-layout {
    width: auto;
    max-width: 100%;
  }

  .du-toast__close {
    box-sizing: border-box;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    color: var(--du-toast-icon);
    background: transparent;
    border: 0;
    border-radius: var(--du-radius-round-corner-full, 9999px);
    cursor: pointer;
    appearance: none;
  }

  .du-toast__close:focus-visible {
    outline: none;
  }

  .du-toast__close-icon,
  .du-toast__close ::slotted(*) {
    display: block;
    width: 24px;
    height: 24px;
    color: inherit;
  }

  .du-toast__message {
    min-width: 0;
    max-width: 100%;
    word-break: break-word;
  }

  .du-toast__message ::slotted(*) {
    margin: 0;
  }

  :host([hidden]) {
    display: none !important;
  }
`;var Zc=Object.defineProperty,Pr=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Zc(e,t,s),s};const Jc=["success","info","error","text"],ka=class ka extends A{constructor(){super(...arguments);w(this,Hr);w(this,gr);w(this,ii);this.type="success",this.message="",this.duration=2e3,this.closable=!1,d(this,Hr,!1),d(this,gr,!1),d(this,ii,ts(this,ui.toast,()=>this.zIndex,t=>this.style.setProperty("--du-layer-z-index",String(t)),{defaultRenderAt:"normal",readRenderAt:()=>this.renderAt,onRenderAtChange:()=>this.syncTopLayer()})),this.onCloseClick=t=>{t.preventDefault(),t.stopPropagation(),this.close()}}get effectiveZIndex(){return n(this,ii).effectiveZIndex}get effectiveRenderAt(){return n(this,ii).effectiveRenderAt}connectedCallback(){super.connectedCallback(),n(this,ii).connect()}disconnectedCallback(){this.teardownTopLayer(),n(this,ii).clearOnDisconnect(),super.disconnectedCallback()}updated(t){(t.has("zIndex")||t.has("renderAt"))&&n(this,ii).sync()}syncTopLayer(){if(this.effectiveRenderAt==="top-level"&&!this.closest("[data-du-toast-global-root]")){Cr(this),d(this,gr,!0);return}this.teardownTopLayer()}teardownTopLayer(){n(this,gr)&&(Bi(this,{clearPosition:!1}),d(this,gr,!1))}get showIcon(){return this.type!=="text"}get ariaRole(){return this.type==="error"?"alert":"status"}get liveRegionPoliteness(){return this.type==="error"?"assertive":"polite"}close(){n(this,Hr)||(d(this,Hr,!0),this.setAttribute("hidden",""),this.emit("close"))}renderClose(){return this.closable?u`
      <button
        slot="end"
        type="button"
        class="du-toast__close"
        part="close"
        aria-label="关闭"
        @click=${this.onCloseClick}
      >
        <slot name="close-icon">
          <du-icon
            class="du-toast__close-icon"
            name="icon-close_linear"
            size="24"
            decorative
          ></du-icon>
        </slot>
      </button>
    `:b}render(){const t=["du-toast",`du-toast--${this.type}`].join(" ");return u`
      <div
        class=${t}
        part="toast"
        role=${this.ariaRole}
        aria-live=${this.liveRegionPoliteness}
      >
        <du-layout gap="8" overflow="visible">
          ${this.showIcon?u`
                <du-toast-icon
                  slot="start"
                  part="icon"
                  type=${this.type}
                ></du-toast-icon>
              `:b}
          <span class="du-toast__message" part="message">
            <slot name="message">
              <slot>${this.message}</slot>
            </slot>
          </span>
          ${this.renderClose()}
        </du-layout>
      </div>
    `}};Hr=new WeakMap,gr=new WeakMap,ii=new WeakMap,ka.styles=Kc;let ut=ka;Pr([$(Jc,"success")],ut.prototype,"type"),Pr([y()],ut.prototype,"message"),Pr([T(2e3)],ut.prototype,"duration"),Pr([m()],ut.prototype,"closable"),Pr([yt({attribute:"z-index",integer:!0})],ut.prototype,"zIndex"),Pr([zt(Lt,{attribute:"render-at"})],ut.prototype,"renderAt");const Zi="du-toast-global-root",Dl="du-toast-global-style",Il=2e3,Ho=220;let Qc=0;const Fo=new Set;function ep(){oe(),xe(),k("du-toast",ut)}function tp(r){if(r.getElementById(Dl))return;const e=r.createElement("style");e.id=Dl,e.textContent=`
#${Zi} {
  position: fixed;
  top: max(24px, calc(env(safe-area-inset-top, 0px) + var(--du-toast-global-top, 120px)));
  left: 50%;
  z-index: var(
    --du-toast-z-index,
    var(--du-toast-effective-z-index, ${ui.toast})
  );
  display: flex;
  flex-direction: column;
  gap: var(--du-toast-global-gap, 12px);
  align-items: center;
  width: calc(100vw - 32px);
  pointer-events: none;
  transform: translateX(-50%);
}

#${Zi}[popover] {
  margin: 0;
  padding: 0;
  overflow: visible;
  border: 0;
  background: transparent;
}

#${Zi} .du-toast-global__item {
  max-width: 100%;
  pointer-events: auto;
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
  transition:
    opacity ${Ho}ms ease,
    transform ${Ho}ms ease;
}

#${Zi} .du-toast-global__item[data-state='open'] {
  opacity: 1;
  transform: translateY(0) scale(1);
}

#${Zi} .du-toast-global__item[data-state='closing'] {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
`,(r.head??r.documentElement).append(e)}function ip(r){tp(r);let e=r.getElementById(Zi);return e||(e=r.createElement("div"),e.id=Zi,e.dataset.duToastGlobalRoot="",e.setAttribute("role","region"),e.setAttribute("aria-label","Toast notifications"),(r.body??r.documentElement).append(e)),e}function Ml(r){return typeof r=="object"&&r!==null&&typeof r.nodeType=="number"&&typeof r.cloneNode=="function"}function zl(r){return typeof r=="object"&&r!==null&&!Ml(r)&&"message"in r}function rp(r){return zl(r)?{type:r.type??"success",message:r.message,duration:r.duration??Il,closable:!!r.closable,zIndex:Number.isFinite(r.zIndex)?Math.trunc(r.zIndex):void 0,renderAt:r.renderAt==="top-level"||r.renderAt==="normal"?r.renderAt:void 0}:{type:"success",message:r,duration:Il,closable:!1,zIndex:void 0,renderAt:void 0}}function sp(r,e){if(typeof e=="string"){r.message=e;return}if(Ml(e)){r.append(e);return}const t=r.ownerDocument.createElement("span");t.dataset.duToastContent="",r.append(t);const i=e(t);return typeof i=="function"?i:void 0}function Hs(r){if(typeof document>"u"||typeof window>"u")throw new Error("showToast() requires a browser document.");ep();const e=rp(r),t=ip(document),i=document.createElement("div"),s=document.createElement("du-toast"),o=++Qc;let a=0,l=0,h=!1,p,f=()=>{};const g=new Promise(P=>{f=P});s.type=e.type,s.duration=e.duration,s.closable=e.closable,s.zIndex=e.zIndex,s.renderAt=e.renderAt,i.className="du-toast-global__item",i.append(s),t.append(i),Rl(t);try{p=sp(s,e.message)}catch(P){throw i.remove(),t.childElementCount||t.remove(),P}const v={id:o,element:s,close:()=>E(),closed:g};function x(){window.clearTimeout(a),window.clearTimeout(l),s.removeEventListener("close",M),Fo.delete(v);const P=p;p=void 0;try{P==null||P()}finally{i.remove(),Rl(t),t.childElementCount||t.remove(),f()}}function E(){h||(h=!0,window.clearTimeout(a),i.dataset.state="closing",l=window.setTimeout(x,Ho))}function M(){E()}return s.addEventListener("close",M),Fo.add(v),window.requestAnimationFrame(()=>{h||(i.dataset.state="open")}),e.duration>0&&Number.isFinite(e.duration)&&(a=window.setTimeout(E,e.duration)),v}function Rl(r){const e=Array.from(r.querySelectorAll("du-toast")),t=e.map(s=>s.effectiveZIndex),i=t.length?Math.max(...t):ui.toast;r.style.setProperty("--du-toast-effective-z-index",String(i)),e.some(s=>s.effectiveRenderAt==="top-level")?Cr(r):r.hasAttribute("data-du-overlay-layer")&&Bi(r,{clearPosition:!1})}function Ll(){for(const r of[...Fo])r.close()}function Fs(r,e,t={}){return zl(e)?Hs({...e,type:r}):Hs({...t,type:r,message:e})}const op=Object.assign(r=>Hs(r),{success:(r,e)=>Fs("success",r,e),info:(r,e)=>Fs("info",r,e),error:(r,e)=>Fs("error",r,e),text:(r,e)=>Fs("text",r,e),closeAll:Ll});function Nl(){oe(),xe(),Es(),k("du-toast",ut)}const ap=_`
  :host {
    display: inline-block;
    width: 388px;
    max-width: 100%;
    vertical-align: middle;
  }

  :host([size='small']) {
    width: 204px;
  }

  .du-progress {
    --du-progress-height: 6px;
    --du-progress-track: var(--du-fill-p-3);
    --du-progress-active-start: var(--du-fill-p10);
    --du-progress-active-end: color-mix(in srgb, var(--du-on-l-c2) 36%, transparent);
    --du-progress-success: var(--du-fill-p10);
    --du-progress-error: var(--du-accent-red);
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: var(--du-progress-height);
    overflow: hidden;
    background: var(--du-progress-track);
    border: 1px solid var(--du-progress-track);
    border-radius: 40px;
  }

  .du-progress--small {
    --du-progress-height: 3px;
  }

  .du-progress__bar {
    position: absolute;
    inset: 0 auto 0 0;
    width: calc(var(--du-progress-ratio) * 100%);
    min-width: 0;
    background: linear-gradient(
      270deg,
      var(--du-progress-active-start) 0%,
      var(--du-progress-active-end) 100%
    );
    border-radius: inherit;
    transition: width var(--du-duration-normal, 200ms) ease;
  }

  .du-progress--success .du-progress__bar {
    background: var(--du-progress-success);
  }

  .du-progress--error {
    background: transparent;
  }

  .du-progress--error .du-progress__bar {
    background: var(--du-progress-error);
  }
`;var np=Object.defineProperty,Vs=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&np(e,t,s),s};const lp=["default","small"],dp=["active","success","error"],Ca=class Ca extends A{constructor(){super(...arguments),this.value=0,this.max=100,this.size="default",this.status="active"}get normalizedMax(){return Number.isFinite(this.max)&&this.max>0?this.max:100}get normalizedValue(){return Number.isFinite(this.value)?Math.min(Math.max(this.value,0),this.normalizedMax):0}get ratio(){return this.normalizedValue/this.normalizedMax}render(){const e=this.normalizedValue;return u`
      <div
        class="du-progress du-progress--${this.size} du-progress--${this.status}"
        part="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.normalizedMax}
        aria-valuenow=${e}
        style=${ne({"--du-progress-ratio":String(this.ratio)})}
      >
        <div class="du-progress__bar" part="bar"></div>
      </div>
    `}};Ca.styles=ap;let pi=Ca;Vs([T(0)],pi.prototype,"value"),Vs([T(100)],pi.prototype,"max"),Vs([$(lp,"default")],pi.prototype,"size"),Vs([$(dp,"active")],pi.prototype,"status");function Hl(){k("du-progress",pi)}const hp=_`
  :host {
    display: inline-block;
    width: var(--du-slider-control-width, 296px);
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  :host([data-has-meta]:not([data-width-auto])) {
    width: auto;
    max-width: 100%;
  }

  :host([data-width-auto]) {
    display: block;
    width: 100%;
    max-width: 100%;
  }

  .du-slider {
    --du-slider-track: var(--du-fill-p14);
    --du-slider-fill-start: var(--du-on-l-c2);
    --du-slider-fill-end: var(--du-on-l-c6);
    --du-slider-handle-bg: var(--du-on-d-c2);
    --du-slider-fill-extension: 10px;
    --du-slider-track-height: 20px;
    --du-slider-inner-inset: 4px;
    --du-slider-track-inset: 4px;
    --du-slider-track-shell-height: 20px;
    /* 2 * inner-inset + track-height；按压时外层放大，端点仍走内层圆头圆心。 */
    --du-slider-thumb-size: 28px;
    --du-slider-press-duration: 300ms;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto var(--du-slider-control-width, 296px) auto;
    grid-template-areas: 'label control value';
    gap: 24px;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    min-height: 36px;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  :host-context([data-du-theme='dark']) .du-slider,
  :host-context(:root[theme-mode='dark']) .du-slider,
  :host-context(:root.theme-dark) .du-slider {
    --du-slider-fill-start: color-mix(in srgb, var(--du-on-d-c1) 42%, transparent);
    --du-slider-fill-end: color-mix(in srgb, var(--du-on-d-c1) 11%, transparent);
    --du-slider-handle-bg: var(--du-on-d-c1);
  }

  .du-slider--plain {
    grid-template-columns: var(--du-slider-control-width, 296px);
    grid-template-areas: 'control';
    width: var(--du-slider-control-width, 296px);
  }

  .du-slider--with-label:not(.du-slider--with-value) {
    grid-template-columns: auto var(--du-slider-control-width, 296px);
    grid-template-areas: 'label control';
  }

  .du-slider--with-value:not(.du-slider--with-label) {
    grid-template-columns: var(--du-slider-control-width, 296px) auto;
    grid-template-areas: 'control value';
  }

  .du-slider--fill {
    width: 100%;
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .du-slider--fill.du-slider--plain {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
  }

  .du-slider--fill.du-slider--with-label:not(.du-slider--with-value) {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .du-slider--fill.du-slider--with-value:not(.du-slider--with-label) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .du-slider__label {
    grid-area: label;
    color: var(--du-on-l-c4);
    white-space: nowrap;
  }

  .du-slider__control {
    position: relative;
    grid-area: control;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .du-slider__rail {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 36px;
  }

  /* 外层轨道壳：拖拽时放大，内层轨道/填充/把手尺寸不变。 */
  .du-slider__track-shell {
    position: absolute;
    top: 50%;
    right: var(--du-slider-track-inset);
    left: var(--du-slider-track-inset);
    height: var(--du-slider-track-shell-height);
    background: var(--du-slider-track);
    border-radius: 100px;
    transform: translateY(-50%);
    transition:
      height var(--du-slider-press-duration) ease,
      left var(--du-slider-press-duration) ease,
      right var(--du-slider-press-duration) ease;
    pointer-events: none;
  }

  .du-slider:has(.du-slider__input:active) {
    --du-slider-track-shell-height: 28px;
    --du-slider-track-inset: 0px;
    -webkit-user-select: none;
    user-select: none;
  }

  .du-slider__track {
    position: absolute;
    top: 50%;
    right: var(--du-slider-inner-inset);
    left: var(--du-slider-inner-inset);
    z-index: 1;
    height: var(--du-slider-track-height);
    overflow: hidden;
    border-radius: 100px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .du-slider__fill {
    position: absolute;
    inset: 0 auto 0 0;
    /* value=0 时宽度 = 轨道高，左端是正圆，端点落在圆心。 */
    width: min(
      100%,
      calc(
        var(--du-slider-track-height) + var(--du-slider-ratio) *
          (100% - var(--du-slider-track-height))
      )
    );
    min-width: 0;
    height: 100%;
    background: linear-gradient(
      270deg,
      var(--du-slider-fill-start) 0%,
      var(--du-slider-fill-end) 105.17%
    );
    border-radius: inherit;
  }

  /* 刻度行：大点 flex:none，段间 sub-markers 始终存在；段宽由 flex-grow（可按段覆盖）。 */
  .du-slider__markers {
    --du-slider-marker-inset: 8px;
    position: absolute;
    top: 50%;
    right: calc(var(--du-slider-marker-inset) + var(--du-slider-inner-inset));
    left: calc(var(--du-slider-marker-inset) + var(--du-slider-inner-inset));
    z-index: 1;
    display: flex;
    align-items: center;
    height: 6px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .du-slider__marker {
    box-sizing: border-box;
    display: block;
    background: var(--du-slider-handle-bg);
    border-radius: 50%;
    pointer-events: none;
  }

  .du-slider__marker--major {
    flex: none;
    width: 6px;
    height: 6px;
  }

  .du-slider__sub-markers {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    align-items: center;
    justify-content: space-evenly;
    min-width: 0;
    height: 2px;
    pointer-events: none;
  }

  .du-slider__marker--minor {
    flex: none;
    width: 2px;
    height: 2px;
  }

  .du-slider__marker[data-covered] {
    opacity: 0;
  }

  /* labels：与大刻度同结构（slot flex none + gap 同段 flex-grow）。 */
  .du-slider__marker-labels {
    --du-slider-marker-inset: 8px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    width: 100%;
    height: var(--du-typo-headline-semibold-xs-line-height, 16px);
    /* 轨道壳底到文案顶 5px：rail 36、壳 20 → 底边距 8，故 margin-top -3。 */
    margin-top: -3px;
    padding-right: calc(var(--du-slider-marker-inset) + var(--du-slider-inner-inset));
    padding-left: calc(var(--du-slider-marker-inset) + var(--du-slider-inner-inset));
    pointer-events: none;
  }

  .du-slider__marker-label-slot {
    position: relative;
    flex: none;
    width: 6px;
    height: 100%;
  }

  .du-slider__marker-label-gap {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    min-width: 0;
  }

  .du-slider__marker-label {
    position: absolute;
    top: 0;
    left: 50%;
    box-sizing: border-box;
    max-width: min(64px, 40vw);
    overflow: hidden;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-headline-semibold-xs-size, 12px);
    font-weight: var(--du-typo-semibold-weight, 600);
    letter-spacing: var(--du-typo-headline-semibold-xs-letter-spacing, 0);
    line-height: var(--du-typo-headline-semibold-xs-line-height, 16px);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translateX(-50%);
  }

  /* 端点：CSS 圆；亮色使用 C2-Primary 90%，深色使用 C1-On color 固定白色。
   * 按压用 scale(16/12)，布局盒保持 12px，避免 coachmark 参考盒变大重测位。 */
  .du-slider__handle {
    position: absolute;
    top: 50%;
    left: calc(
      var(--du-slider-inner-inset) + var(--du-slider-track-height) / 2 + var(--du-slider-ratio) *
        (100% - var(--du-slider-thumb-size))
    );
    z-index: 2;
    box-sizing: border-box;
    display: block;
    width: 12px;
    height: 12px;
    line-height: 0;
    background: var(--du-slider-handle-bg);
    border-radius: 50%;
    box-shadow: var(--du-shadow-l1);
    pointer-events: none;
    transform: translate(-50%, -50%) scale(1);
    transform-origin: center center;
    transition: transform var(--du-slider-press-duration) ease;
  }

  .du-slider:has(.du-slider__input:active) .du-slider__handle {
    transform: translate(-50%, -50%) scale(calc(16 / 12));
  }

  /* help：coachmark 锚定在滑块中心；宿主尺寸固定，按压只 scale 内部把手。 */
  .du-slider__help {
    position: absolute;
    top: calc(50% - 6px);
    left: calc(
      var(--du-slider-inner-inset) + var(--du-slider-track-height) / 2 + var(--du-slider-ratio) *
        (100% - var(--du-slider-thumb-size)) - 6px
    );
    z-index: 2;
    display: block;
    width: 12px;
    height: 12px;
    max-width: none;
    line-height: 0;
    pointer-events: none;
    transform: none;
  }

  .du-slider__help::part(reference) {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
    line-height: 0;
  }

  .du-slider__help .du-slider__handle {
    position: static;
    top: auto;
    left: auto;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transform-origin: center center;
    transition: transform var(--du-slider-press-duration) ease;
  }

  .du-slider:has(.du-slider__input:active) .du-slider__help .du-slider__handle {
    transform: scale(calc(16 / 12));
  }

  .du-slider__help-mount {
    display: block;
    line-height: normal;
  }

  .du-slider__input {
    position: absolute;
    inset: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    appearance: none;
    cursor: pointer;
    background: transparent;
    opacity: 0;
    ${te}
  }

  .du-slider__input:focus-visible {
    outline: none;
  }

  .du-slider__input::-webkit-slider-thumb {
    width: var(--du-slider-thumb-size);
    height: 36px;
    appearance: none;
  }

  .du-slider__input::-moz-range-thumb {
    width: var(--du-slider-thumb-size);
    height: 36px;
    border: 0;
  }

  .du-slider:has(.du-slider__input:focus-visible) .du-slider__control {
    outline: none;
    border-radius: 100px;
  }

  .du-slider:has(.du-slider__input:disabled) .du-slider__fill {
    opacity: 0.2;
  }

  .du-slider:has(.du-slider__input:disabled) .du-slider__handle {
    opacity: 0.45;
  }

  .du-slider__value-wrap {
    grid-area: value;
    display: inline-flex;
    gap: 4px;
    align-items: center;
    color: var(--du-on-l-c2);
    white-space: nowrap;
  }

  .du-slider__value {
    color: var(--du-on-l-c2);
    text-align: center;
    white-space: nowrap;
  }

  .du-slider--value-pill .du-slider__value {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 63px;
    height: 28px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 20px;
    background: var(--du-fill-p1);
    border-radius: 55px;
  }

  .du-slider__unit {
    font-size: 12px;
    line-height: 16px;
  }

  .du-slider__input:disabled {
    cursor: not-allowed;
  }

  .du-slider__input[aria-readonly='true']:not(:disabled) {
    cursor: default;
  }
`;var up=Object.defineProperty,j=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&up(e,t,s),s};const Sa=class Sa extends ye{constructor(){super(...arguments),this.testId="",this.value=50,this.min=0,this.max=100,this.step=1,this.disabled=!1,this.passive=!1,this.wheel=!1,this.wheelCommitDelay=500,this.width="296",this.label="",this.valueLabel="",this.unit="",this.showValue=!1,this.markers=0,this.subMarkers=[],this.markerLabels=[],this.hideCoveredMarkers=!1,this.helpInfo="",this.helpOpen=!1,this.liveValue=null,this.initialValue=50,this.helpDragging=!1,this.helpPointerUpBound=!1,this.dragSelectGuardBound=!1,this.helpRendererBound=null,this.helpMountEl=null,this.interactionSource=null,this.interactionValue=null,this.pointerEndBound=!1,this.wheelCommitTimer=null,this.scheduleCoveredMarkersSync=()=>{requestAnimationFrame(()=>this.syncCoveredMarkers())},this.onSelectStartDuringDrag=e=>{e.preventDefault()},this.unbindDragSelectGuard=()=>{this.dragSelectGuardBound&&(this.dragSelectGuardBound=!1,typeof document<"u"&&document.removeEventListener("selectstart",this.onSelectStartDuringDrag,!0),typeof window<"u"&&(window.removeEventListener("pointerup",this.unbindDragSelectGuard),window.removeEventListener("pointercancel",this.unbindDragSelectGuard)),this.clearTextSelection(),this.scheduleCoveredMarkersSync())},this.onInputPointerDown=e=>{if(this.isValueLocked){e.preventDefault();return}this.beginInteraction("pointer"),this.bindPointerEnd(),this.clearTextSelection(),this.bindDragSelectGuard(),this.hasHelp&&this.onHelpPointerDown(),this.scheduleCoveredMarkersSync()},this.onInputPointerEnd=()=>{this.interactionSource==="pointer"&&this.commitInteraction("pointer"),this.unbindPointerEnd(),this.unbindDragSelectGuard()},this.onHelpPointerEnter=()=>{this.setHelpOpen(!0)},this.onHelpPointerLeave=()=>{this.helpDragging||(this.liveValue=null,this.setHelpOpen(!1))},this.onHelpFocusIn=()=>{this.setHelpOpen(!0)},this.onHelpFocusOut=()=>{this.helpDragging||(this.liveValue=null,this.setHelpOpen(!1))},this.onHelpPointerDown=()=>{!this.hasHelp||this.isInteractiveDisabled||(this.helpDragging=!0,this.setHelpOpen(!0),this.bindHelpPointerUp())},this.onHelpPointerUp=()=>{this.helpDragging=!1,this.unbindHelpPointerUp(),this.liveValue=null;const e=this.renderRoot.querySelector(".du-slider__control");e instanceof Element&&e.matches(":hover")||this.setHelpOpen(!1)},this.onInputKeyDown=e=>{!Fl.has(e.key)||this.isValueLocked||this.beginInteraction("keyboard")},this.onInputKeyUp=e=>{Fl.has(e.key)&&this.commitInteraction("keyboard")},this.onInputBlur=()=>{this.interactionSource==="keyboard"&&this.commitInteraction("keyboard")},this.onInputWheel=e=>{if(!this.wheel||this.isValueLocked)return;const t=e.deltaY||e.deltaX;if(t===0)return;this.beginInteraction("wheel");const i=this.interactionValue??this.normalizedValue,s=t<0?1:-1,o=cp(i+s*this.normalizedStep,this.normalizedMin,this.normalizedMax,this.normalizedStep);o!==i&&(e.preventDefault(),e.stopPropagation(),this.applyUserValue(o,e.currentTarget),this.scheduleWheelCommit())}}connectedCallback(){super.connectedCallback(),this.initialValue=this.normalizedValue}disconnectedCallback(){this.cancelInteraction(),this.unbindHelpPointerUp(),this.unbindDragSelectGuard(),this.disposeHelpRenderer(),super.disconnectedCallback()}get isWidthAuto(){return String(this.width??"").trim().toLowerCase()==="auto"}applyWidthStyle(){if(this.toggleAttribute("data-width-auto",this.isWidthAuto),this.isWidthAuto){this.style.removeProperty("--du-slider-control-width");return}const e=String(this.width??"").trim();this.style.setProperty("--du-slider-control-width",kr(e||"296")||"296px")}get hasHelp(){return this.helpInfo==="value"||typeof this.helpInfo=="function"}get tipValue(){return this.liveValue!=null&&Number.isFinite(this.liveValue)?this.liveValue:this.normalizedValue}willUpdate(){this.toggleAttribute("data-has-meta",this.hasMeta),this.toggleAttribute("data-has-marker-labels",this.hasMarkerLabels),this.applyWidthStyle()}updated(e){this.isValueLocked&&this.interactionSource&&this.cancelInteraction(),e.has("wheel")&&!this.wheel&&this.interactionSource==="wheel"&&this.cancelInteraction(),(e.has("value")||e.has("min")||e.has("max"))&&this.setFormValue(this.normalizedValue),this.hasHelp&&(e.has("helpInfo")||e.has("value")||e.has("liveValue")||e.has("helpOpen")||e.has("min")||e.has("max"))&&this.syncHelpMount(),!this.hasHelp&&this.helpOpen&&(this.helpOpen=!1),(e.has("hideCoveredMarkers")||e.has("value")||e.has("liveValue")||e.has("markers")||e.has("subMarkers")||e.has("width")||e.has("min")||e.has("max"))&&this.scheduleCoveredMarkersSync()}getFormValue(){return this.normalizedValue}resetFormControl(){this.value=this.initialValue}restoreFormState(e){if(typeof e=="string"){const t=Number(e);Number.isFinite(t)&&(this.value=t)}}get normalizedMin(){return Number.isFinite(this.min)?this.min:0}get normalizedMax(){const e=this.normalizedMin;return Number.isFinite(this.max)&&this.max>e?this.max:e+100}get normalizedStep(){return Number.isFinite(this.step)&&this.step>0?this.step:1}get normalizedValue(){return Number.isFinite(this.value)?Math.min(Math.max(this.value,this.normalizedMin),this.normalizedMax):this.normalizedMin}get ratio(){const e=this.normalizedMax-this.normalizedMin,t=this.tipValue;return e>0?(t-this.normalizedMin)/e:0}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get displayValue(){return this.valueLabel||String(this.normalizedValue)}get hasMeta(){return!!(this.label||this.showValue||this.valueLabel||this.unit)}get valueInPill(){return!!(this.valueLabel||this.unit)}get majorMarkerCount(){const e=Math.floor(this.markers);return Number.isFinite(e)&&e>0?e:0}get resolvedSubMarkers(){return Bl(this.subMarkers)}getSubMarkerSegmentAt(e){const t=this.resolvedSubMarkers[e];return t||{count:0,grow:1}}get resolvedMarkerLabels(){return!Array.isArray(this.markerLabels)||this.markerLabels.length===0?null:this.markerLabels.map(e=>e==null?"":String(e))}get hasMarkerLabels(){return this.majorMarkerCount>0&&this.resolvedMarkerLabels!=null}resolveMarkerSpan(e){const t=this.majorMarkerCount;if(t<2)return null;const i=t-1,s=Array.from({length:i},(g,v)=>this.getSubMarkerSegmentAt(v).grow),o=s.reduce((g,v)=>g+v,0);if(o<=0)return null;const a=this.normalizedMin,l=this.normalizedMax,h=l-a,p=h>0?(Math.min(Math.max(e,a),l)-a)/h:0;if(p>=1)return{from:i-1,to:i,ratio:1};let f=0;for(let g=0;g<i;g+=1){const v=s[g]/o,x=f+v;if(p<x||g===i-1){const E=v>0?(p-f)/v:0;return{from:g,to:g+1,ratio:Math.min(1,Math.max(0,E))}}f=x}return{from:i-1,to:i,ratio:1}}syncCoveredMarkers(){const e=this.renderRoot.querySelectorAll(".du-slider__marker--major, .du-slider__marker--minor");if(!this.hideCoveredMarkers||this.majorMarkerCount<=0){e.forEach(o=>o.removeAttribute("data-covered"));return}const t=this.renderRoot.querySelector(".du-slider__help .du-slider__handle")??this.renderRoot.querySelector(".du-slider__handle");if(!t){e.forEach(o=>o.removeAttribute("data-covered"));return}const i=t.getBoundingClientRect();if(i.width<=0){e.forEach(o=>o.removeAttribute("data-covered"));return}const s=.5;e.forEach(o=>{const a=o.getBoundingClientRect(),l=a.width>0&&a.left>=i.left-s&&a.right<=i.right+s;o.toggleAttribute("data-covered",l)})}clearTextSelection(){var e;typeof window>"u"||(e=window.getSelection())==null||e.removeAllRanges()}bindDragSelectGuard(){this.dragSelectGuardBound||typeof document>"u"||(this.dragSelectGuardBound=!0,document.addEventListener("selectstart",this.onSelectStartDuringDrag,!0),window.addEventListener("pointerup",this.unbindDragSelectGuard),window.addEventListener("pointercancel",this.unbindDragSelectGuard))}bindPointerEnd(){this.pointerEndBound||typeof window>"u"||(this.pointerEndBound=!0,window.addEventListener("pointerup",this.onInputPointerEnd),window.addEventListener("pointercancel",this.onInputPointerEnd))}unbindPointerEnd(){!this.pointerEndBound||typeof window>"u"||(this.pointerEndBound=!1,window.removeEventListener("pointerup",this.onInputPointerEnd),window.removeEventListener("pointercancel",this.onInputPointerEnd))}renderMarkers(){const e=this.majorMarkerCount;return e<=0?b:u`
      <div class="du-slider__markers" part="markers" aria-hidden="true">
        ${Array.from({length:e},(t,i)=>{const s=u`
            <span class="du-slider__marker du-slider__marker--major" part="marker"></span>
          `;if(i>=e-1)return s;const{count:o,grow:a}=this.getSubMarkerSegmentAt(i);return u`
            ${s}
            <div
              class="du-slider__sub-markers"
              part="sub-markers"
              style=${ne({flexGrow:a})}
            >
              ${o>0?Array.from({length:o},()=>u`<span
                        class="du-slider__marker du-slider__marker--minor"
                        part="sub-marker"
                      ></span>`):b}
            </div>
          `})}
      </div>
    `}renderMarkerLabels(){const e=this.resolvedMarkerLabels,t=this.majorMarkerCount;return!e||t<=0?b:u`
      <div class="du-slider__marker-labels" part="marker-labels">
        ${Array.from({length:t},(i,s)=>{const o=e[s]??"",a=u`
            <span class="du-slider__marker-label-slot" part="marker-label">
              <span class="du-slider__marker-label" title=${o||b}>${o}</span>
            </span>
          `;if(s>=t-1)return a;const{grow:l}=this.getSubMarkerSegmentAt(s);return u`${a}<span
            class="du-slider__marker-label-gap"
            style=${ne({flexGrow:l})}
            aria-hidden="true"
          ></span>`})}
      </div>
    `}disposeHelpRenderer(){const e=this.helpDisposer;if(this.helpDisposer=void 0,this.helpRendererBound=null,this.helpMountEl=null,e)try{e()}catch{}}syncHelpMount(){const e=this.helpMount;if(!e){this.disposeHelpRenderer();return}const t=this.helpInfo;if(t==="value"){this.disposeHelpRenderer(),e.replaceChildren(),e.textContent=String(this.tipValue);return}if(typeof t!="function"){this.disposeHelpRenderer(),e.replaceChildren();return}const i=e!==this.helpMountEl,s=t!==this.helpRendererBound;(i||s)&&(this.disposeHelpRenderer(),e.replaceChildren(),this.helpMountEl=e,this.helpRendererBound=t);try{const o=t(this.tipValue,e);typeof o=="function"&&(this.helpDisposer=o)}catch{}}setHelpOpen(e){if(!this.hasHelp||this.isInteractiveDisabled){this.helpOpen=!1;return}this.helpOpen=e}bindHelpPointerUp(){this.helpPointerUpBound||typeof window>"u"||(this.helpPointerUpBound=!0,window.addEventListener("pointerup",this.onHelpPointerUp),window.addEventListener("pointercancel",this.onHelpPointerUp))}unbindHelpPointerUp(){!this.helpPointerUpBound||typeof window>"u"||(this.helpPointerUpBound=!1,window.removeEventListener("pointerup",this.onHelpPointerUp),window.removeEventListener("pointercancel",this.onHelpPointerUp))}createChangeDetail(e){return{value:e,min:this.normalizedMin,max:this.normalizedMax,step:this.normalizedStep,markerSpan:this.resolveMarkerSpan(e)}}beginInteraction(e){this.interactionSource!==e&&(this.interactionSource&&this.interactionValue!=null?this.commitInteraction(this.interactionSource):(this.clearWheelCommitTimer(),this.interactionValue=null),this.interactionSource=e)}commitInteraction(e){if(this.interactionSource!==e)return;const t=this.interactionValue;this.clearWheelCommitTimer(),this.interactionSource=null,this.interactionValue=null,this.liveValue=null,t!=null&&this.emit("commit",{...this.createChangeDetail(t),source:e})}cancelInteraction(){this.clearWheelCommitTimer(),this.unbindPointerEnd(),this.unbindDragSelectGuard(),this.interactionSource=null,this.interactionValue=null,this.liveValue=null}clearWheelCommitTimer(){this.wheelCommitTimer!=null&&(clearTimeout(this.wheelCommitTimer),this.wheelCommitTimer=null)}scheduleWheelCommit(){this.clearWheelCommitTimer();const e=Number.isFinite(this.wheelCommitDelay)?Math.max(0,this.wheelCommitDelay):500;this.wheelCommitTimer=setTimeout(()=>{this.wheelCommitTimer=null,this.commitInteraction("wheel")},e)}applyUserValue(e,t){this.interactionValue=e,this.liveValue=e,this.hasHelp&&this.setHelpOpen(!0),this.passive||(this.value=e,this.setFormValue(e)),this.emitValueChange("value",e,this.createChangeDetail(e)),this.passive&&t&&(t.value=String(this.normalizedValue))}handleInput(e){if(this.isValueLocked){const s=e.currentTarget;s.value=String(this.normalizedValue);return}const t=e.currentTarget,i=Number(t.value);if(!Number.isFinite(i)||i===this.value){Number.isFinite(i)&&(this.liveValue=i);return}this.applyUserValue(i,t)}renderHandle(){return u`<span class="du-slider__handle" part="handle" aria-hidden="true"></span>`}renderHelpCoachmark(){return u`
      <du-coachmark
        class="du-slider__help"
        part="help"
        placement="top-center"
        trigger="manual"
        parent=""
        content=${String(this.tipValue)}
        .open=${this.helpOpen}
        ?disabled=${this.isInteractiveDisabled}
      >
        <span slot="reference" class="du-slider__handle" part="handle" aria-hidden="true"></span>
        <span class="du-slider__help-mount"></span>
      </du-coachmark>
    `}render(){const e=!!(this.showValue||this.valueLabel||this.unit),t=this.isInteractiveDisabled,i=["du-slider",this.hasMeta?"":"du-slider--plain",this.isWidthAuto?"du-slider--fill":"",this.label?"du-slider--with-label":"",e?"du-slider--with-value":"",e&&this.valueInPill?"du-slider--value-pill":"",this.hasHelp?"du-slider--with-help":"",this.majorMarkerCount>0?"du-slider--with-markers":"",this.hasMarkerLabels?"du-slider--with-marker-labels":""].filter(Boolean).join(" ");return u`
      <label
        class=${i}
        part="root"
        style=${ne({"--du-slider-ratio":String(this.ratio)})}
      >
        ${this.label?u`<span class="du-slider__label" part="label">${this.label}</span>`:b}
        <span
          class="du-slider__control"
          part="control"
          @pointerenter=${this.hasHelp?this.onHelpPointerEnter:b}
          @pointerleave=${this.hasHelp?this.onHelpPointerLeave:b}
          @focusin=${this.hasHelp?this.onHelpFocusIn:b}
          @focusout=${this.hasHelp?this.onHelpFocusOut:b}
        >
          <span class="du-slider__rail">
            <span class="du-slider__track-shell" part="track-shell"></span>
            <span class="du-slider__track" part="track">
              <span class="du-slider__fill" part="fill"></span>
            </span>
            ${this.renderMarkers()}
            ${this.hasHelp?this.renderHelpCoachmark():this.renderHandle()}
            <input
              class="du-slider__input"
              data-testid=${ae(this.testId)}
              type="range"
              name=${this.name}
              min=${this.normalizedMin}
              max=${this.normalizedMax}
              step=${this.normalizedStep}
              .value=${String(this.normalizedValue)}
              aria-label=${this.label||"slider"}
              aria-valuetext=${this.unit?`${this.displayValue}${this.unit}`:this.displayValue}
              aria-readonly=${this.isOwnReadonly?"true":"false"}
              .disabled=${t}
              @pointerdown=${this.onInputPointerDown}
              @pointerup=${this.onInputPointerEnd}
              @pointercancel=${this.onInputPointerEnd}
              @keydown=${this.onInputKeyDown}
              @keyup=${this.onInputKeyUp}
              @blur=${this.onInputBlur}
              @wheel=${this.onInputWheel}
              @input=${this.handleInput}
              @change=${s=>s.stopPropagation()}
            />
          </span>
          ${this.renderMarkerLabels()}
        </span>
        ${e?u`
              <span class="du-slider__value-wrap" part="value">
                <span class="du-slider__value">${this.displayValue}</span>
                ${this.unit?u`<span class="du-slider__unit">${this.unit}</span>`:b}
              </span>
            `:b}
      </label>
    `}};Sa.styles=hp;let L=Sa;j([y("",{attribute:"test-id",reflect:!1})],L.prototype,"testId"),j([T(50)],L.prototype,"value"),j([T(0)],L.prototype,"min"),j([T(100)],L.prototype,"max"),j([T(1)],L.prototype,"step"),j([m()],L.prototype,"disabled"),j([m()],L.prototype,"passive"),j([m()],L.prototype,"wheel"),j([T(500,{attribute:"wheel-commit-delay"})],L.prototype,"wheelCommitDelay"),j([y("296")],L.prototype,"width"),j([y()],L.prototype,"label"),j([y("",{attribute:"value-label"})],L.prototype,"valueLabel"),j([y()],L.prototype,"unit"),j([m(!1,{attribute:"show-value"})],L.prototype,"showValue"),j([T(0)],L.prototype,"markers"),j([C({attribute:"sub-markers",converter:{fromAttribute:r=>Ul(r),toAttribute:r=>pp(r)}})],L.prototype,"subMarkers"),j([wr([],{attribute:"marker-labels"})],L.prototype,"markerLabels"),j([m(!1,{attribute:"hide-covered-markers"})],L.prototype,"hideCoveredMarkers"),j([C({attribute:"help-info",converter:{fromAttribute:r=>r==null?"":r.trim()==="value"?"value":"",toAttribute:r=>r==="value"?"value":null}})],L.prototype,"helpInfo"),j([S()],L.prototype,"helpOpen"),j([S()],L.prototype,"liveValue"),j([q(".du-slider__help-mount",!0)],L.prototype,"helpMount");const Fl=new Set(["ArrowDown","ArrowLeft","ArrowRight","ArrowUp","End","Home","PageDown","PageUp"]);function Vo(r){var o;const[e,t]=String(r).toLowerCase().split("e"),i=((o=e==null?void 0:e.split(".")[1])==null?void 0:o.length)??0,s=Number(t??0);return Math.max(0,i-s)}function cp(r,e,t,i){const s=Math.min(Math.max(r,e),t),o=Math.min(12,Math.max(Vo(e),Vo(t),Vo(i)));return Number(s.toFixed(o))}function hs(r){const e=Math.floor(Number(r));return Number.isFinite(e)&&e>0?e:0}function Vl(r){const e=Number(r);return Number.isFinite(e)&&e>0?e:1}function Ar(r){if(r==null||r==="")return{count:0,grow:1};if(typeof r=="number"||typeof r=="boolean"||typeof r=="bigint")return{count:hs(r),grow:1};if(typeof r=="string"){const e=r.trim();if(!e)return{count:0,grow:1};if(/^-?\d+(\.\d+)?$/.test(e))return{count:hs(e),grow:1};try{return Ar(JSON.parse(e))}catch{return{count:0,grow:1}}}if(Array.isArray(r))return{count:hs(r[0]),grow:r.length>1?Vl(r[1]):1};if(typeof r=="object"){const e=r;return{count:hs(e.count),grow:e.grow==null?1:Vl(e.grow)}}return{count:0,grow:1}}function Bl(r){if(r==null||r==="")return[];if(typeof r=="number"||typeof r=="boolean"||typeof r=="bigint"){const e=Ar(r);return e.count>0?[e]:[]}return typeof r=="string"?Ul(r):Array.isArray(r)?r.map(e=>Ar(e)):typeof r=="object"?[Ar(r)]:[]}function pp(r){const e=Bl(r);return e.length===0?null:e.every(i=>i.grow===1)?e.length===1?String(e[0].count):JSON.stringify(e.map(i=>i.count)):JSON.stringify(e.map(i=>i.count===0?{grow:i.grow}:i.grow===1?i.count:{count:i.count,grow:i.grow}))}function Ul(r){if(r==null)return[];const e=r.trim();if(!e)return[];if(/^-?\d+(\.\d+)?$/.test(e)){const t=hs(e);return t>0?[{count:t,grow:1}]:[]}try{const t=JSON.parse(e);return Array.isArray(t)?t.map(i=>Ar(i)):[Ar(t)]}catch{return[]}}function Gl(){Gi(),k("du-slider",L)}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fp=r=>r.strings===void 0,mp={},gp=(r,e=mp)=>r._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bo=mo(class extends go{constructor(r){if(super(r),r.type!==li.PROPERTY&&r.type!==li.ATTRIBUTE&&r.type!==li.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fp(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===We||e===b)return e;const t=r.element,i=r.name;if(r.type===li.PROPERTY){if(e===t[i])return We}else if(r.type===li.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return We}else if(r.type===li.ATTRIBUTE&&t.getAttribute(i)===e+"")return We;return gp(r),e}}),Wl=_`
  .du-field {
    --du-field-bg: var(--du-fill-p2);
    --du-field-fg: var(--du-on-l-c2);
    --du-field-placeholder: var(--du-on-l-c6);
    --du-field-meta: var(--du-on-l-c4);
    --du-field-border: transparent;
    --du-field-radius: var(--du-radius-round-corner-full, 9999px);
    --du-field-min-height: var(--du-size-control-md, 40px);
    --du-field-padding-inline: var(--du-gap-12, 12px);
    --du-field-padding-block: var(--du-gap-8, 8px);
    --du-field-gap: var(--du-gap-4, 4px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--du-field-min-height);
    padding: var(--du-field-padding-block) var(--du-field-padding-inline);
    color: var(--du-field-fg);
    background: var(--du-field-bg);
    border: 1px solid var(--du-field-border);
    border-radius: var(--du-field-radius);
    transition:
      background-color var(--du-duration-normal, 0.2s) ease,
      border-color var(--du-duration-normal, 0.2s) ease,
      opacity var(--du-duration-normal, 0.2s) ease;
  }

  .du-field:hover:not([data-disabled='true']) {
    --du-field-border: var(--du-fill-p-3);
  }

  .du-field:focus-within:not([data-disabled='true']) {
    --du-field-border: var(--du-fill-p-3);
  }

  .du-field[data-disabled='true'] {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-field[data-disabled='true'] > * {
    --du-disabled-opacity: 1;
  }

  .du-field[data-status='error'] {
    --du-field-border: var(--du-accent-red-soft);
  }

  .du-field[data-status='error']:hover:not([data-disabled='true']),
  .du-field[data-status='error']:focus-within:not([data-disabled='true']) {
    --du-field-border: var(--du-accent-red-soft);
  }

  .du-field__main {
    display: flex;
    flex: 1 1 auto;
    gap: var(--du-field-gap);
    align-items: center;
    min-width: 0;
  }

  .du-field__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--du-gap-8, 8px);
    align-items: center;
    justify-content: flex-end;
  }

  .du-field__meta {
    color: var(--du-field-meta);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    white-space: nowrap;
  }

  .du-field__clear {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
  }

  .du-field__clear:focus-visible {
    outline: none;
  }

  .du-field-message {
    --du-field-message-margin-top: var(--du-gap-4, 4px);
    box-sizing: border-box;
    /* 不参与宿主 max-content，贴字段宽度换行（含无空格长串） */
    width: 0;
    min-width: 100%;
    max-width: 100%;
    margin: var(--du-field-message-margin-top) 0 0;
    color: var(--du-accent-red);
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    letter-spacing: var(--du-typo-body-regular-xs-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  /* 有错误文案时用负 margin 抵消 marginTop + 一行行高，减少布局抖动 */
  :host([compact-field-message]) .du-field-message {
    margin-bottom: calc(
      -1 * (
        var(--du-field-message-margin-top) +
          var(--du-typo-body-regular-xs-line-height, 16px)
      )
    );
  }
`,bp=_`
  :host {
    --du-input-disabled-opacity: 0.4;
    --du-input-search-icon-color: var(--du-on-l-c4);
    display: inline-flex;
    max-width: 100%;
    min-width: 0;
    vertical-align: middle;
  }

  :host([block]) {
    display: flex;
    width: 100%;
  }

  .du-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  ${Wl}

  .du-input__field {
    gap: var(--du-gap-16, 16px);
    cursor: text;
  }

  .du-input__field:not(:focus-within):not(:hover):not(
      [data-status='error']
    )
    .du-field__clear {
    display: none;
  }

  .du-input__field[data-disabled='true'] {
    opacity: var(--du-input-disabled-opacity, 0.4);
  }

  :host([variant='search']) .du-input__field[data-disabled='true'] {
    opacity: 1;
  }

  :host([variant='search'])
    .du-input__field[data-disabled='true']
    .du-field__main {
    opacity: var(--du-input-disabled-opacity, 0.4);
  }

  .du-input__field[data-empty='true'][data-status='default']:hover:not(
      [data-disabled='true']
    ):not(:focus-within):not(:active) {
    --du-field-bg: var(--du-state-hover);
    --du-field-border: var(--du-fill-p-3);
  }

  .du-input__control {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    padding: 0;
    color: inherit;
    caret-color: var(--du-field-fg);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    font-weight: var(--du-typo-regular-weight, 400);
    line-height: var(
      --du-typo-body-regular-s-line-height,
      18px
    );
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    text-align: start;
    background: transparent;
    border: 0;
    outline: none;
    user-select: text;
    -webkit-user-select: text;
  }

  :host([align='center']) .du-input__control {
    text-align: center;
  }

  .du-input__control[type='number'] {
    appearance: textfield;
  }

  .du-input__control[type='number']::-webkit-inner-spin-button,
  .du-input__control[type='number']::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  .du-input__control::placeholder {
    color: var(--du-field-placeholder);
    opacity: 1;
  }

  .du-input__control:disabled {
    cursor: not-allowed;
  }

  .du-input__control:read-only:not(:disabled) {
    cursor: text;
  }

  :host([variant='textarea']) .du-input__field {
    --du-field-min-height: 120px;
    --du-field-padding-inline: var(--du-gap-12, 12px);
    --du-field-padding-block: var(--du-gap-12, 12px);
    --du-field-radius: var(--du-radius-round-corner-l, 16px);
    flex-direction: column;
    gap: var(--du-gap-16, 16px);
    align-items: stretch;
  }

  :host([variant='textarea']) .du-input__field:hover:not([data-disabled='true']):not(:focus-within) {
    --du-field-bg: var(--du-state-hover);
    --du-field-border: var(--du-fill-p-3);
  }

  :host([variant='textarea']) .du-field__main {
    align-items: flex-start;
    width: 100%;
  }

  .du-input__textarea {
    display: block;
    min-height: 66px;
    overflow: auto;
    resize: none;
  }

  /* 原生 textarea 无法嵌套 du-scroll-area；按其 12px 热区 / 3px 拇指视觉对齐。 */
  .du-input__textarea::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background: transparent;
  }

  .du-input__textarea::-webkit-scrollbar-track,
  .du-input__textarea::-webkit-scrollbar-corner {
    background: transparent;
  }

  .du-input__textarea::-webkit-scrollbar-thumb {
    background: var(--du-fill-p-4);
    background-clip: content-box;
    border-color: transparent;
    border-style: solid;
    border-width: 0 4px 0 5px;
  }

  .du-input__textarea::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  @supports not selector(::-webkit-scrollbar) {
    .du-input__textarea {
      scrollbar-color: var(--du-fill-p-4) transparent;
      scrollbar-width: thin;
    }
  }

  :host([variant='textarea']) .du-field__suffix {
    align-self: flex-end;
    width: 100%;
  }

  :host([variant='textarea']) .du-input__count {
    margin-left: auto;
  }

  .du-input__search-icon {
    flex: 0 0 auto;
    color: var(--du-input-search-icon-color, var(--du-on-l-c4));
  }

  .du-input__field .du-field__clear {
    width: 16px;
    height: 16px;
    color: var(--du-on-l-c4);
  }

  :host([variant='search']) .du-input__control:not(:placeholder-shown) {
    color: var(--du-field-fg);
  }
`;var vp=Object.defineProperty,J=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&vp(e,t,s),s};const yp=["text","search","textarea"],wp=["default","error"],xp=["start","center"],$a=class $a extends ye{constructor(){super(...arguments),this.testIds={},this.testId="",this.variant="text",this.value="",this.placeholder="",this.spellcheck=!1,this.disabled=!1,this.clearable=!1,this.maxlength=0,this.rows=3,this.status="default",this.error="",this.compactFieldMessage=!1,this.type="text",this.block=!1,this.align="start",this.passive=!1,this.initialValue="",this.isComposing=!1,this.passiveInputRevision=0}connectedCallback(){super.connectedCallback(),this.initialValue=this.value}getFormValue(){return this.value}resetFormControl(){this.value=this.initialValue}restoreFormState(e){typeof e=="string"&&(this.value=e)}updated(e){e.has("value")&&(this.passiveInputRevision+=1,this.setFormValue(this.value))}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get isSearchVariant(){return this.variant==="search"}get isTextareaVariant(){return this.variant==="textarea"}get effectiveClearable(){return this.readOwnBoolean("clearable")||this.isSearchVariant}get showClear(){return this.effectiveClearable&&!!this.value&&!this.isValueLocked}get showCount(){return this.effectiveMaxlength>0&&!this.isOwnReadonly}get effectiveMaxlength(){return this.maxlength>0?this.maxlength:this.isTextareaVariant?500:0}get countLabel(){return`${this.value.length}/${this.effectiveMaxlength}`}get fieldPaddingInline(){return this.isSearchVariant?"var(--du-gap-16, 16px)":"var(--du-gap-12, 12px)"}get resolvedStatus(){return this.status==="error"||this.error?"error":"default"}focus(e){var t;(t=this.controlEl)==null||t.focus(e)}blur(){var e;(e=this.controlEl)==null||e.blur()}select(){var e;(e=this.controlEl)==null||e.select()}setControlValuePreservingSelection(e,t){if(e.value===t)return;const i=e.selectionStart,s=e.selectionEnd,o=e.selectionDirection;if(e.value=t,i===null||s===null)return;const a=Math.min(i,t.length),l=Math.min(s,t.length);e.setSelectionRange(a,l,o??void 0)}readLimitedValue(e){const t=this.effectiveMaxlength;if(t<=0||e.value.length<=t)return e.value;const i=e.value.slice(0,t);return this.setControlValuePreservingSelection(e,i),i}readCompositionValue(e){const t=this.compositionSnapshot;this.compositionSnapshot=void 0;const i=this.effectiveMaxlength;if(!t||i<=0)return this.readLimitedValue(e);const s=t.value.slice(0,t.start),o=t.value.slice(t.end),a=e.value,l=s.length+o.length;if(l>i||!a.startsWith(s)||!a.endsWith(o)||a.length<l)return this.readLimitedValue(e);const h=o.length>0?a.length-o.length:a.length,f=a.slice(s.length,h).slice(0,i-l),g=`${s}${f}${o}`;e.value!==g&&(e.value=g);const v=s.length+f.length;return e.setSelectionRange(v,v),g}schedulePassiveRollback(e,t){const i=++this.passiveInputRevision;queueMicrotask(()=>{i!==this.passiveInputRevision||!this.passive||this.isComposing||this.value===t||e.value!==t||this.setControlValuePreservingSelection(e,this.value)})}commitInput(e,t=this.readLimitedValue(e)){return this.passive||(this.value=t,this.setFormValue(this.value)),this.emit("input",{value:t,variant:this.variant}),this.emit("update:value",t),this.passive&&this.schedulePassiveRollback(e,t),t}handleCompositionStart(e){const t=e.currentTarget,i=t.selectionStart,s=t.selectionEnd;this.compositionSnapshot=i===null||s===null?void 0:{value:t.value,start:i,end:s},this.isComposing=!0,this.postCompositionValue=void 0,this.passiveInputRevision+=1}handleCompositionEnd(e){if(this.isComposing=!1,this.isValueLocked){this.compositionSnapshot=void 0;return}const t=e.currentTarget;this.postCompositionValue=this.commitInput(t,this.readCompositionValue(t))}handleInput(e){if(e.stopPropagation(),this.isValueLocked)return;const t=e.currentTarget;if(!(this.isComposing||e.isComposing)){if(this.postCompositionValue!==void 0){const i=t.value===this.postCompositionValue;if(this.postCompositionValue=void 0,i)return}this.commitInput(t)}}handleChange(e){if(e.stopPropagation(),this.isValueLocked)return;const t=e.currentTarget,i=this.readLimitedValue(t);this.passive||(this.value=i,this.setFormValue(this.value)),this.emitValueChange("value",i,{value:i,variant:this.variant}),this.passive&&this.schedulePassiveRollback(t,i)}handleClear(e){var i;if(e.preventDefault(),e.stopPropagation(),this.isValueLocked||!this.showClear)return;this.passive||(this.value="",this.setFormValue("")),(i=this.controlEl)==null||i.focus();const t={value:"",variant:this.variant};this.emit("clear",t),this.emit("input",t),this.emit("update:value",""),this.emitValueChange("value","",t),this.passive&&this.controlEl&&(this.controlEl.value=this.value)}render(){const e=this.isInteractiveDisabled,t=this.isOwnReadonly;return u`
      <div class="du-input" part="root">
        <label
          class="du-field du-input__field"
          part="field"
          style=${`--du-field-padding-inline: ${this.fieldPaddingInline};`}
          data-disabled=${e?"true":"false"}
          data-readonly=${t?"true":"false"}
          data-status=${this.resolvedStatus}
          data-empty=${this.value.length===0?"true":"false"}
        >
          <span class="du-field__main">
            ${this.isSearchVariant?u`
                  <du-icon
                    class="du-input__search-icon"
                    part="prefix"
                    name="icon-search_linear"
                    size="16"
                    decorative
                  ></du-icon>
                `:u`<slot name="prefix"></slot>`}
            ${this.isTextareaVariant?u`
                  <textarea
                    class="du-input__control du-input__textarea"
                    part="input"
                    data-testid=${ae(this.testId)}
                    name=${this.name||b}
                    .value=${Bo(this.value)}
                    placeholder=${this.placeholder||b}
                    maxlength=${this.effectiveMaxlength}
                    rows=${Math.max(1,this.rows)}
                    .spellcheck=${this.spellcheck}
                    .disabled=${e}
                    .readOnly=${t&&!e}
                    aria-label=${this.ariaLabel||b}
                    aria-invalid=${this.resolvedStatus==="error"?"true":"false"}
                    @compositionstart=${this.handleCompositionStart}
                    @compositionend=${this.handleCompositionEnd}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                  ></textarea>
                `:u`
                  <input
                    class="du-input__control"
                    part="input"
                    data-testid=${ae(this.testId)}
                    type=${this.type}
                    name=${this.name||b}
                    .value=${Bo(this.value)}
                    placeholder=${this.placeholder||b}
                    min=${this.min??b}
                    max=${this.max??b}
                    maxlength=${this.effectiveMaxlength>0?this.effectiveMaxlength:b}
                    .spellcheck=${this.spellcheck}
                    .disabled=${e}
                    .readOnly=${t&&!e}
                    aria-label=${this.ariaLabel||b}
                    aria-invalid=${this.resolvedStatus==="error"?"true":"false"}
                    @compositionstart=${this.handleCompositionStart}
                    @compositionend=${this.handleCompositionEnd}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                  />
                `}
          </span>
          ${this.showClear||this.showCount?u`
                <span class="du-field__suffix" part="suffix">
                  ${this.showClear?u`
                        <button
                          class="du-field__clear"
                          part="clear"
                          data-testid=${ni(this.testIds,"clear")}
                          type="button"
                          tabindex="-1"
                          aria-label="清除"
                          @click=${this.handleClear}
                        >
                          <du-icon
                            name="icon-close_circle_surface"
                            size="16"
                            decorative
                          ></du-icon>
                        </button>
                      `:b}
                  ${this.showCount?u`
                        <span class="du-field__meta du-input__count" part="count">
                          ${this.countLabel}
                        </span>
                      `:b}
                  <slot name="suffix"></slot>
                </span>
              `:u`<slot name="suffix"></slot>`}
        </label>
        ${this.error?u`<p class="du-field-message du-input__error" part="error">${this.error}</p>`:b}
      </div>
    `}};$a.styles=bp;let F=$a;J([wr({},{attribute:"test-ids",reflect:!1})],F.prototype,"testIds"),J([y("",{attribute:"test-id",reflect:!1})],F.prototype,"testId"),J([$(yp,"text")],F.prototype,"variant"),J([y()],F.prototype,"value"),J([y()],F.prototype,"placeholder"),J([m()],F.prototype,"spellcheck"),J([m()],F.prototype,"disabled"),J([m()],F.prototype,"clearable"),J([T(0,{attribute:"maxlength"})],F.prototype,"maxlength"),J([T(3)],F.prototype,"rows"),J([$(wp,"default")],F.prototype,"status"),J([y()],F.prototype,"error"),J([m()],F.prototype,"compactFieldMessage"),J([y("text")],F.prototype,"type"),J([yt()],F.prototype,"min"),J([yt()],F.prototype,"max"),J([m()],F.prototype,"block"),J([$(xp,"start")],F.prototype,"align"),J([m()],F.prototype,"passive"),J([q(".du-input__control")],F.prototype,"controlEl");function Uo(){oe(),k("du-input",F)}const Ji=["#FE0303","#FFA003","#FEF605","#03FF04","#0466D9","#04C1FF","#FD3BE8","#FFFFFF","#000000"],Vt=(r,e,t)=>Math.min(t,Math.max(e,r)),Bs=r=>(r%360+360)%360;function Bt(r){const e=r.trim().replace(/^#/,"");return/^[0-9a-f]{3}$/i.test(e)?`#${e.split("").map(t=>`${t}${t}`).join("")}`.toUpperCase():/^[0-9a-f]{6}$/i.test(e)?`#${e.toUpperCase()}`:null}function us(r,e=Ji.length){const t=Number.isFinite(r)?Math.trunc(r):0;return e<=0?0:Vt(t,0,e-1)}function _p(r){return Ji[r]??Ji[0]}function Us(r){return!Array.isArray(r)||r.length===0?[...Ji]:r.map((e,t)=>Bt(typeof e=="string"?e:"")??_p(t))}function Gs(r){const e=Bt(r);return e?{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)}:null}function Go(r){const e=t=>Math.round(Vt(Number.isFinite(t)?t:0,0,255)).toString(16).padStart(2,"0");return`#${e(r.r)}${e(r.g)}${e(r.b)}`.toUpperCase()}function jl(r){const e=Vt(r.r,0,255)/255,t=Vt(r.g,0,255)/255,i=Vt(r.b,0,255)/255,s=Math.max(e,t,i),o=Math.min(e,t,i),a=s-o;let l=0;return a!==0&&(s===e?l=60*((t-i)/a%6):s===t?l=60*((i-e)/a+2):l=60*((e-t)/a+4)),{h:Bs(l),s:s===0?0:a/s*100,v:s*100}}function Yl(r){const e=Bs(r.h),t=Vt(r.s,0,100)/100,i=Vt(r.v,0,100)/100,s=i*t,o=e/60,a=s*(1-Math.abs(o%2-1)),l=i-s;let h;return o<1?h=[s,a,0]:o<2?h=[a,s,0]:o<3?h=[0,s,a]:o<4?h=[0,a,s]:o<5?h=[a,0,s]:h=[s,0,a],{r:Math.round((h[0]+l)*255),g:Math.round((h[1]+l)*255),b:Math.round((h[2]+l)*255)}}function kp(r,e,t,i){const s=t/2,o=r-s,a=e-s,l=Math.min(Math.hypot(o,a),s),h=Bs(Math.atan2(a,o)*180/Math.PI+90);return{h:l===0?0:h,s:s===0?0:l/s*100,v:Vt(i,0,100)}}function Cp(r,e){const t=e/2,i=t*(Vt(r.s,0,100)/100),s=Bs(r.h)*Math.PI/180;return{x:t+Math.sin(s)*i,y:t-Math.cos(s)*i}}const Sp=_`
  :host {
    display: inline-flex;
    align-items: center;
    width: 302px;
    max-width: 100%;
    min-height: 266px;
    color: var(--du-on-l-c2);
    vertical-align: middle;
  }

  :host(:not([show-presets])) {
    min-height: 226px;
  }

  .du-color-balls {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-width: 260px;
    height: 260px;
    font-family: var(--du-font-family, 'MiSans', sans-serif);
  }

  .du-color-balls[data-show-presets='false'] {
    height: 220px;
  }

  .du-color-balls__controls {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
  }

  .du-color-balls__picker {
    display: flex;
    flex: 1 1 auto;
    gap: 16px;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .du-color-balls__wheel {
    position: relative;
    box-sizing: border-box;
    width: 172px;
    height: 172px;
    overflow: visible;
    touch-action: none;
    border-radius: var(--du-radius-round-corner-full);
    cursor: pointer;
    isolation: isolate;
  }

  .du-color-balls__wheel::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    content: '';
  }

  .du-color-balls__wheel::before {
    background:
      radial-gradient(circle, var(--du-on-d-c1) 0%, transparent 70.71%),
      conic-gradient(
        from 0deg,
        #ff0000,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff,
        #ff0000
      );
    filter: brightness(var(--du-color-balls-brightness));
    pointer-events: none;
  }

  .du-color-balls__wheel-handle {
    position: absolute;
    top: var(--du-color-balls-handle-y);
    left: var(--du-color-balls-handle-x);
    z-index: 1;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background: var(--du-color-balls-current);
    border: 2px solid var(--du-on-d-c1);
    border-radius: var(--du-radius-round-corner-full);
    box-shadow: var(--du-shadow-l1, 0 1px 4px rgba(0, 0, 0, 0.24));
    pointer-events: auto;
    transform: translate(-50%, -50%);
  }

  .du-color-balls__wheel,
  .du-color-balls__brightness,
  .du-color-balls__preset {
    user-select: none;
    caret-color: transparent;
  }

  .du-color-balls__wheel:focus-visible,
  .du-color-balls__brightness:focus-visible,
  .du-color-balls__preset:focus-visible {
    outline: none;
  }

  .du-color-balls__brightness-wrap {
    position: relative;
    flex: 0 0 20px;
    width: 20px;
    height: 172px;
    border-radius: var(--du-radius-round-corner-full);
  }

  .du-color-balls__brightness-wrap::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      var(--du-color-balls-bright),
      #000000
    );
    border-radius: inherit;
    content: '';
    pointer-events: none;
  }

  .du-color-balls__brightness {
    position: absolute;
    inset: 0;
    width: 20px;
    height: 172px;
    margin: 0;
    appearance: none;
    writing-mode: vertical-lr;
    direction: rtl;
    cursor: pointer;
    background: transparent;
    border-radius: inherit;
  }

  .du-color-balls__brightness::-webkit-slider-runnable-track {
    width: 20px;
    height: 172px;
    background: transparent;
    border-radius: var(--du-radius-round-corner-full);
  }

  .du-color-balls__brightness::-webkit-slider-thumb {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    appearance: none;
    background: var(--du-color-balls-current);
    border: 2px solid var(--du-on-d-c1);
    border-radius: var(--du-radius-round-corner-full);
    box-shadow: var(--du-shadow-l1, 0 1px 4px rgba(0, 0, 0, 0.24));
  }

  .du-color-balls__brightness::-moz-range-track {
    width: 20px;
    height: 172px;
    background: transparent;
    border: 0;
    border-radius: var(--du-radius-round-corner-full);
  }

  .du-color-balls__brightness::-moz-range-thumb {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    background: var(--du-color-balls-current);
    border: 2px solid var(--du-on-d-c1);
    border-radius: var(--du-radius-round-corner-full);
    box-shadow: var(--du-shadow-l1, 0 1px 4px rgba(0, 0, 0, 0.24));
  }

  .du-color-balls__value-row {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
    height: 40px;
  }

  .du-color-balls__format {
    box-sizing: border-box;
    flex: 0 0 auto;
    user-select: none;
    caret-color: transparent;
  }

  .du-color-balls__format::part(track) {
    height: 40px;
  }

  .du-color-balls__format::part(marker),
  .du-color-balls__format::part(item) {
    height: 32px;
  }

  .du-color-balls__fields {
    display: grid;
    flex: 1 1 auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
    min-width: 0;
  }

  .du-color-balls__fields--rgb {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .du-color-balls__input {
    width: 100%;
    min-width: 0;
  }

  .du-color-balls__input::part(field) {
    --du-field-padding-inline: var(--du-gap-8, 8px);
  }

  .du-color-balls__input::part(suffix) {
    display: none;
  }

  .du-color-balls__presets {
    display: flex;
    flex: 0 0 24px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 24px;
  }

  .du-color-balls__preset {
    box-sizing: border-box;
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    padding: 0;
    cursor: pointer;
    background: var(--du-color-balls-preset);
    border: 2px solid var(--du-fill-p-3);
    border-radius: var(--du-radius-round-corner-full);
  }

  .du-color-balls__preset[aria-pressed='true'] {
    border-color: var(--du-on-l-c2);
  }

  .du-color-balls__preset:not(:disabled):not([aria-disabled='true']):hover {
    box-shadow: 0 0 0 2px var(--du-state-hover);
  }

  .du-color-balls[data-disabled='true'] {
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-color-balls[data-disabled='true'] > * {
    --du-disabled-opacity: 1;
  }

  .du-color-balls[data-disabled='true'] .du-color-balls__wheel,
  .du-color-balls :disabled {
    cursor: not-allowed;
  }

  .du-color-balls[data-readonly='true']:not([data-disabled='true']) .du-color-balls__wheel,
  .du-color-balls[data-readonly='true']:not([data-disabled='true']) .du-color-balls__brightness,
  .du-color-balls[data-readonly='true']:not([data-disabled='true']) .du-color-balls__preset {
    cursor: default;
  }
`;var $p=Object.defineProperty,Ut=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&$p(e,t,s),s};const Ep=["hex","rgb"],Ws=172,Qi=Ji[0],Tp=Us();function Pp(r,e){return r.length===e.length&&r.every((t,i)=>t===e[i])}const Ea=class Ea extends ye{constructor(){super(...arguments),this.value=Qi,this.format="hex",this.colors=Us(),this.selectedIndex=0,this.showPresets=!0,this.presetColor=null,this.disabled=!1,this.passive=!1,this.hsv=jl(Gs(Qi)),this.initialValue=Qi,this.initialColors=[...Ji],this.initialSelectedIndex=0,this.wheelPointerId=null,this.preservedHsvValue=null}connectedCallback(){super.connectedCallback(),this.colors=Us(this.colors),this.selectedIndex=us(this.selectedIndex,this.colors.length);const e=Bt(this.value)??Qi,t=this.hasAttribute("value")||e!==Qi;if(this.value=t?e:this.colors[this.selectedIndex],!this.passive){const i=this.findPresetIndex(this.value);i>=0&&(this.selectedIndex=i)}this.initialValue=this.value,this.initialColors=[...this.colors],this.initialSelectedIndex=this.selectedIndex,this.syncHsvFromValue()}getFormValue(){return this.value}resetFormControl(){this.colors=[...this.initialColors],this.selectedIndex=this.initialSelectedIndex,this.value=this.initialValue,this.syncHsvFromValue()}restoreFormState(e){typeof e=="string"&&(this.value=Bt(e)??this.value,this.syncHsvFromValue())}updated(e){if(e.has("colors")){const t=Us(this.colors);if(!Pp(t,this.colors)){this.colors=t;return}if(!this.passive){const s=this.findPresetIndex(this.value);if(s>=0&&s!==this.selectedIndex){this.selectedIndex=s;return}}const i=us(this.selectedIndex,this.colors.length);if(i!==this.selectedIndex){this.selectedIndex=i;return}}if(e.has("selectedIndex")){const t=us(this.selectedIndex,this.colors.length);if(t!==this.selectedIndex){this.selectedIndex=t;return}if(!e.has("value")&&this.value!==this.colors[this.selectedIndex]){this.value=this.colors[this.selectedIndex];return}}if(e.has("value")){const t=Bt(this.value);if(!t){this.value=e.get("value")??Qi;return}if(t!==this.value){this.value=t;return}const i=this.preservedHsvValue===t;if(this.preservedHsvValue=null,i||this.syncHsvFromValue(),this.setFormValue(this.value),!this.passive&&!e.has("selectedIndex")){const s=this.findPresetIndex(t);if(s>=0&&s!==this.selectedIndex){this.selectedIndex=s;return}}}e.has("format")&&this.format!=="hex"&&this.format!=="rgb"&&(this.format="hex")}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get rgb(){return Gs(this.value)??{r:254,g:3,b:3}}syncHsvFromValue(){const e=Gs(this.value);if(e){const t=jl(e),i={...t,h:t.s===0?this.hsv.h:t.h,s:t.v===0?this.hsv.s:t.s};Math.abs(i.h-this.hsv.h)<.001&&Math.abs(i.s-this.hsv.s)<.001&&Math.abs(i.v-this.hsv.v)<.001||(this.hsv=i)}}findPresetIndex(e){const t=Bt(e);return!t||this.colors.length===0?-1:this.colors[this.selectedIndex]===t?this.selectedIndex:this.colors.indexOf(t)}commitValue(e,t=this.selectedIndex,i=!1){if(this.isValueLocked)return;const s=Bt(e);if(!s||s===this.value)return;const o=this.findPresetIndex(s),a=o>=0?o:us(t,this.colors.length);this.passive||(this.preservedHsvValue=i?s:null,this.value=s,o>=0&&o!==this.selectedIndex&&(this.selectedIndex=o,this.emit("update:selected-index",o)),i||this.syncHsvFromValue(),this.setFormValue(this.value)),this.emitValueChange("value",s,{value:s,format:this.format,rgb:Gs(s)??this.rgb,colors:[...this.colors],selectedIndex:a}),this.passive&&this.syncHsvFromValue()}resolvePresetDisplayColor(e,t){const i=this.presetColor;if(typeof i!="function")return e;try{const s=i(e,t);return Bt(typeof s=="string"?s:"")??e}catch{return e}}handlePreset(e){if(this.isValueLocked)return;const t=us(e,this.colors.length);t!==this.selectedIndex&&(this.passive||(this.selectedIndex=t),this.emit("update:selected-index",t)),this.commitValue(this.colors[t],t)}commitHsv(e){const t={h:(e.h%360+360)%360,s:Math.min(100,Math.max(0,e.s)),v:Math.min(100,Math.max(0,e.v))};this.hsv=t,this.commitValue(Go(Yl(t)),this.selectedIndex,!0)}handleFormat(e){this.isInteractiveDisabled||(this.format=e)}handleFormatBeforeChange(e){e.stopPropagation()}handleFormatChange(e){var i;e.stopPropagation();const t=(i=e.detail)==null?void 0:i.value;(t==="hex"||t==="rgb")&&this.handleFormat(t)}handleFormatUpdate(e){e.stopPropagation()}updateWheelFromPointer(e){const i=e.currentTarget.getBoundingClientRect();if(!i.width||!i.height)return;const s=(e.clientX-i.left)/i.width*Ws,o=(e.clientY-i.top)/i.height*Ws;this.commitHsv(kp(s,o,Ws,this.hsv.v))}handleWheelPointerDown(e){this.isValueLocked||(this.wheelPointerId=e.pointerId,e.currentTarget.setPointerCapture(e.pointerId),this.updateWheelFromPointer(e))}handleWheelPointerMove(e){e.pointerId===this.wheelPointerId&&this.updateWheelFromPointer(e)}handleWheelPointerEnd(e){if(e.pointerId===this.wheelPointerId){this.wheelPointerId=null;const t=e.currentTarget;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId)}}handleWheelKeydown(e){if(this.isValueLocked)return;let t=this.hsv;if(e.key==="ArrowLeft")t={...t,h:t.h-1};else if(e.key==="ArrowRight")t={...t,h:t.h+1};else if(e.key==="ArrowDown")t={...t,s:Math.max(0,t.s-1)};else if(e.key==="ArrowUp")t={...t,s:Math.min(100,t.s+1)};else return;e.preventDefault(),this.commitHsv(t)}handleBrightness(e){const t=e.currentTarget;if(this.isValueLocked){t.value=String(this.hsv.v);return}this.commitHsv({...this.hsv,v:Number(t.value)})}handleHexChange(e){e.stopPropagation();const t=e.currentTarget,i=Bt(t.value);i?this.commitValue(i):t.value=this.value}handleHexInput(e){e.stopPropagation();const i=e.currentTarget.value.trim().replace(/^#/,"");/^[0-9a-f]{6}$/i.test(i)&&this.commitValue(`#${i}`)}getRgbInputs(){return Array.from(this.renderRoot.querySelectorAll("[data-rgb-channel]"))}handleRgbChange(e){e==null||e.stopPropagation();const t=this.getRgbInputs();if(t.length!==3)return!1;const i=t.map(s=>s.value.trim()===""?Number.NaN:Number(s.value));return i.every(Number.isFinite)?(this.commitValue(Go({r:i[0],g:i[1],b:i[2]})),!0):!1}handleRgbCommit(e){if(e.stopPropagation(),!this.handleRgbChange()){const{r:t,g:i,b:s}=this.rgb;this.getRgbInputs().forEach((o,a)=>{o.value=String([t,i,s][a])})}}renderFields(){if(this.format==="rgb"){const{r:e,g:t,b:i}=this.rgb;return u`
        <div class="du-color-balls__fields du-color-balls__fields--rgb" part="fields">
          ${[["R",e],["G",t],["B",i]].map(([s,o])=>u`
              <du-input
                class="du-color-balls__input"
                part="input"
                data-rgb-channel=${s}
                type="number"
                min="0"
                max="255"
                maxlength="3"
                align="center"
                block
                .value=${String(o)}
                aria-label=${s}
                ?disabled=${this.isInteractiveDisabled}
                .readOnly=${this.isOwnReadonly&&!this.isInteractiveDisabled}
                @input=${this.handleRgbChange}
                @change=${this.handleRgbCommit}
              ></du-input>
            `)}
        </div>
      `}return u`
      <div class="du-color-balls__fields" part="fields">
        <du-input
          class="du-color-balls__input"
          part="input"
          type="text"
          align="center"
          block
          maxlength="7"
          .value=${this.value}
          aria-label="HEX"
          ?disabled=${this.isInteractiveDisabled}
          .readOnly=${this.isOwnReadonly&&!this.isInteractiveDisabled}
          @input=${this.handleHexInput}
          @change=${this.handleHexChange}
        ></du-input>
      </div>
    `}render(){const e=this.isInteractiveDisabled,t=this.isOwnReadonly,i=Cp(this.hsv,Ws),s=Go(Yl({...this.hsv,v:100})),o=ne({"--du-color-balls-current":this.value,"--du-color-balls-bright":s,"--du-color-balls-handle-x":`${i.x}px`,"--du-color-balls-handle-y":`${i.y}px`,"--du-color-balls-brightness":String(this.hsv.v/100)});return u`
      <div
        class="du-color-balls"
        part="root"
        data-disabled=${e?"true":"false"}
        data-readonly=${t?"true":"false"}
        data-show-presets=${this.showPresets?"true":"false"}
        style=${o}
      >
        <div class="du-color-balls__controls">
          <div class="du-color-balls__picker">
            <div
              class="du-color-balls__wheel"
              part="wheel"
              role="slider"
              tabindex=${e?"-1":"0"}
              aria-label="色相与饱和度"
              aria-disabled=${e||t?"true":"false"}
              aria-valuemin="0"
              aria-valuemax="359"
              aria-valuenow=${Math.round(this.hsv.h)%360}
              aria-valuetext=${`色相 ${Math.round(this.hsv.h)}，饱和度 ${Math.round(this.hsv.s)}%`}
              aria-readonly=${t?"true":"false"}
              @pointerdown=${this.handleWheelPointerDown}
              @pointermove=${this.handleWheelPointerMove}
              @pointerup=${this.handleWheelPointerEnd}
              @pointercancel=${this.handleWheelPointerEnd}
              @keydown=${this.handleWheelKeydown}
            >
              <span class="du-color-balls__wheel-handle" part="wheel-handle"></span>
            </div>
            <div class="du-color-balls__brightness-wrap" part="brightness-track">
              <input
                class="du-color-balls__brightness"
                part="brightness"
                type="range"
                min="0"
                max="100"
                step="1"
                .value=${String(this.hsv.v)}
                aria-label="明度"
                aria-readonly=${t?"true":"false"}
                ?disabled=${e}
                @input=${this.handleBrightness}
                @change=${a=>a.stopPropagation()}
              />
            </div>
          </div>

          <div class="du-color-balls__value-row">
            <du-segmented-button
              class="du-color-balls__format"
              part="format"
              exportparts="item:format-option"
              aria-label="颜色格式"
              item-min-width="52px"
              .value=${this.format}
              @before-change=${this.handleFormatBeforeChange}
              @change=${this.handleFormatChange}
              @update:value=${this.handleFormatUpdate}
            >
              <span value="hex" ?disabled=${e}>HEX</span>
              <span value="rgb" ?disabled=${e}>RGB</span>
            </du-segmented-button>
            ${this.renderFields()}
          </div>
        </div>

        ${this.showPresets?u`
              <div class="du-color-balls__presets" part="presets">
                ${this.colors.map((a,l)=>{const h=this.resolvePresetDisplayColor(a,l);return u`
                    <button
                      class="du-color-balls__preset"
                      part="preset"
                      type="button"
                      style=${ne({"--du-color-balls-preset":h})}
                      aria-label=${a}
                      aria-pressed=${this.selectedIndex===l?"true":"false"}
                      aria-disabled=${t?"true":"false"}
                      ?disabled=${e}
                      @click=${()=>this.handlePreset(l)}
                    ></button>
                  `})}
              </div>
            `:b}
      </div>
    `}};Ea.styles=Sp;let Fe=Ea;Ut([y(Qi)],Fe.prototype,"value"),Ut([$(Ep,"hex")],Fe.prototype,"format"),Ut([wr(Tp)],Fe.prototype,"colors"),Ut([T(0,{attribute:"selected-index"})],Fe.prototype,"selectedIndex"),Ut([m(!0,{attribute:"show-presets"})],Fe.prototype,"showPresets"),Ut([C({attribute:!1})],Fe.prototype,"presetColor"),Ut([m()],Fe.prototype,"disabled"),Ut([m()],Fe.prototype,"passive"),Ut([S()],Fe.prototype,"hsv");function ql(){Uo(),ds(),k("du-color-balls",Fe)}const Ap=_`
  :host {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  .du-tag {
    --du-tag-bg: var(--du-fill-p1);
    --du-tag-fg: var(--du-on-l-c2);
    --du-tag-border: transparent;
    --du-tag-border-width: 0px;
    --du-tag-radius: 4px;
    --du-tag-gap: 4px;
    --du-tag-padding-block: 6px;
    --du-tag-padding-inline: 8px;
    --du-tag-min-height: 28px;
    --du-tag-icon-size: 16px;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    min-height: var(--du-tag-min-height);
    padding: var(--du-tag-padding-block) var(--du-tag-padding-inline);
    color: var(--du-tag-fg);
    font: inherit;
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    font-weight: var(--du-typo-regular-weight, 400);
    background: var(--du-tag-bg);
    border: none;
    border-radius: var(--du-tag-radius);
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color var(--du-duration-normal, 0.2s) ease,
      color var(--du-duration-normal, 0.2s) ease,
      opacity var(--du-duration-normal, 0.2s) ease;
    ${te}
  }

  .du-tag::before {
    content: '';
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    border: var(--du-tag-border-width) solid var(--du-tag-border);
    border-radius: inherit;
    pointer-events: none;
    transition:
      border-color var(--du-duration-normal, 0.2s) ease,
      border-width var(--du-duration-normal, 0.2s) ease;
  }

  .du-tag du-layout {
    width: auto;
    max-width: 100%;
    height: 100%;
    min-height: 0;
    font: inherit;
    line-height: inherit;
  }

  .du-tag__label {
    min-width: 0;
  }

  /* variant */
  :host([variant='primary']) .du-tag {
    --du-tag-bg: var(--du-accent-blue);
    --du-tag-fg: var(--du-on-d-c1);
  }

  :host([variant='secondary']) .du-tag {
    --du-tag-bg: var(--du-accent-blue-soft);
    --du-tag-fg: var(--du-accent-blue);
  }

  :host([variant='secondary'][appearance='outline']) .du-tag {
    --du-tag-bg: transparent;
    --du-tag-border: var(--du-accent-blue-soft);
    --du-tag-border-width: 1px;
  }

  :host([variant='neutral']) .du-tag,
  :host([variant='neutral-interactive']) .du-tag {
    --du-tag-bg: var(--du-fill-p1);
    --du-tag-fg: var(--du-on-l-c2);
  }

  :host([variant='neutral'][appearance='outline']) .du-tag,
  :host([variant='neutral-interactive'][appearance='outline']) .du-tag {
    --du-tag-bg: transparent;
    --du-tag-fg: var(--du-on-l-c4);
    --du-tag-border: var(--du-fill-p-3);
    --du-tag-border-width: 1px;
  }

  :host([variant='neutral-interactive']) .du-tag:hover:not(:disabled):not(:active) {
    --du-tag-fg: var(--du-accent-blue);
    --du-tag-bg: var(--du-state-hover);
    --du-tag-border-width: 0px;
  }

  :host([variant='neutral-interactive']) .du-tag:active:not(:disabled) {
    --du-tag-fg: var(--du-accent-blue);
    --du-tag-bg: var(--du-state-press);
    --du-tag-border-width: 0px;
  }

  :host([variant='counter']) .du-tag {
    --du-tag-bg: transparent;
    --du-tag-fg: var(--du-on-l-c4);
    --du-tag-border: var(--du-fill-p-3);
    --du-tag-border-width: 1px;
    --du-tag-radius: 22px;
    --du-tag-padding-block: 0px;
    --du-tag-padding-inline: 4px;
    --du-tag-min-height: 20px;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
  }

  :host([variant='link']) .du-tag {
    --du-tag-bg: var(--du-fill-p1);
    --du-tag-fg: var(--du-on-l-c2);
    --du-tag-padding-block: 4px;
    --du-tag-padding-inline: 4px;
    --du-tag-min-height: 24px;
  }

  /* size */
  :host([size='small']:not([variant='counter'])) .du-tag {
    --du-tag-padding-block: 4px;
    --du-tag-padding-inline: 4px;
    --du-tag-min-height: 24px;
  }

  :host([size='mini']:not([variant='counter'])) .du-tag {
    --du-tag-gap: 2px;
    --du-tag-padding-block: 2px;
    --du-tag-padding-inline: 2px;
    --du-tag-min-height: 20px;
    --du-tag-icon-size: 14px;
  }

  :host([variant='counter'][size='mini']) .du-tag,
  :host([variant='neutral'][appearance='outline'][size='mini']) .du-tag,
  :host([variant='neutral-interactive'][appearance='outline'][size='mini']) .du-tag,
  :host([variant='secondary'][appearance='outline'][size='mini']) .du-tag {
    --du-tag-min-height: 20px;
  }

  :host([variant='neutral'][appearance='outline'][size='small']) .du-tag,
  :host([variant='neutral-interactive'][appearance='outline'][size='small']) .du-tag,
  :host([variant='secondary'][appearance='outline'][size='small']) .du-tag {
    --du-tag-min-height: 20px;
  }

  .du-tag:focus-visible {
    outline: none;
  }

  .du-tag:disabled {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-tag:disabled > * {
    --du-disabled-opacity: 1;
  }
`;var Op=Object.defineProperty,Or=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Op(e,t,s),s};const Dp=["primary","secondary","neutral","neutral-interactive","counter","link"],Ip=["default","small","mini"],Mp=["solid","outline"],Ta=class Ta extends A{constructor(){super(...arguments),this.testId="",this.variant="primary",this.size="default",this.appearance="solid",this.icon="",this.disabled=!1}get isInteractiveDisabled(){return this.isOwnDisabled}get layoutGap(){return this.size==="mini"?"2":"4"}get iconSize(){return this.size==="mini"?"14":"16"}get showBuiltInStartIcon(){return!!this.icon}get showBuiltInEndIcon(){return this.variant==="link"}get clickDetail(){return{variant:this.variant,size:this.size,appearance:this.appearance}}handleClick(e){if(this.isInteractiveDisabled){e.preventDefault(),e.stopPropagation();return}e.stopPropagation(),this.emit("click",this.clickDetail)}render(){const e=u`
      <span class="du-tag__label" part="label">
        <slot></slot>
      </span>
    `,t=this.showBuiltInStartIcon?u`
          <du-icon
            slot="start"
            name=${this.icon}
            size=${this.iconSize}
            decorative
          ></du-icon>
        `:u`<slot name="start" slot="start"></slot>`,i=this.showBuiltInEndIcon?u`
          <du-icon
            slot="end"
            name="icon-arrow_right_linear"
            size="16"
            decorative
          ></du-icon>
        `:u`<slot name="end" slot="end"></slot>`;return u`
      <button
        class="du-tag"
        part="tag"
        data-testid=${ae(this.testId)}
        type="button"
        ?disabled=${this.isInteractiveDisabled}
        @click=${this.handleClick}
      >
        <du-layout
          gap=${this.layoutGap}
          width="auto"
          height="100%"
          text-overflow="ellipsis"
          lines="1"
        >
          ${t}
          ${e}
          ${i}
        </du-layout>
      </button>
    `}};Ta.styles=Ap;let kt=Ta;Or([y("",{attribute:"test-id",reflect:!1})],kt.prototype,"testId"),Or([$(Dp,"primary")],kt.prototype,"variant"),Or([$(Ip,"default")],kt.prototype,"size"),Or([$(Mp,"solid")],kt.prototype,"appearance"),Or([y()],kt.prototype,"icon"),Or([m()],kt.prototype,"disabled");function Xl(){oe(),xe(),k("du-tag",kt)}const zp=_`
  :host {
    display: inline-block;
    width: 180px;
    max-width: 100%;
    vertical-align: middle;
  }

  .du-input-number {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    color: var(--du-on-l-c2);
    background: var(--du-fill-p2);
    border-radius: var(--du-radius-round-corner-full);
  }

  .du-input-number[data-disabled='true'] {
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-input-number__layout {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .du-input-number__button {
    display: grid;
    flex: none;
    place-items: center;
    width: 16px;
    height: 16px;
    padding: 0;
    color: inherit;
    background: none;
    border: 0;
    cursor: pointer;
  }

  .du-input-number__button:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  .du-input-number[data-disabled='true'] .du-input-number__button:disabled {
    opacity: 1;
  }

  .du-input-number__button:focus-visible {
    outline: none;
    border-radius: 2px;
  }

  .du-input-number__input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    min-width: 0;
    height: 40px;
    padding: 0;
    color: inherit;
    font-family: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    font-weight: var(--du-typo-regular-weight, 400);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    text-align: center;
    background: transparent;
    border: 0;
    outline: none;
    appearance: none;
  }

  .du-input-number__input:disabled {
    cursor: not-allowed;
  }
`;var Rp=Object.defineProperty,ct=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Rp(e,t,s),s};function js(r){const e=String(r).toLowerCase();if(!e.includes("e"))return(e.split(".")[1]||"").length;const[t,i]=e.split("e");return Math.max(0,(t.split(".")[1]||"").length-Number(i))}const Pa=class Pa extends ye{constructor(){super(...arguments),this.testId="",this.testIds={},this.value=0,this.step=1,this.stepStrictly=!1,this.disabled=!1,this.passive=!1,this.initialValue=0}connectedCallback(){super.connectedCallback(),this.initialValue=this.value}getFormValue(){return this.value}resetFormControl(){this.draft=void 0,this.value=this.initialValue}restoreFormState(e){typeof e=="string"&&e.trim()&&Number.isFinite(Number(e))&&(this.draft=void 0,this.value=this.normalizeValue(Number(e)))}updated(e){e.has("value")&&this.setFormValue(this.value)}focus(e){var t;(t=this.inputEl)==null||t.focus(e)}blur(){var e;(e=this.inputEl)==null||e.blur()}select(){var e;(e=this.inputEl)==null||e.select()}get lowerBound(){return this.min??Number.MIN_SAFE_INTEGER}get upperBound(){return Math.max(this.lowerBound,this.max??Number.MAX_SAFE_INTEGER)}get effectiveStep(){return Number.isFinite(this.step)&&this.step>0?this.step:1}get effectivePrecision(){return this.precision===void 0||!Number.isFinite(this.precision)?void 0:Math.max(0,Math.min(12,Math.trunc(this.precision)))}get displayedValue(){return this.draft!==void 0?this.draft:Number.isFinite(this.value)?this.effectivePrecision===void 0?String(this.value):this.value.toFixed(this.effectivePrecision):"0"}normalizeValue(e){let t=Number.isFinite(e)?e:this.value;if(Number.isFinite(t)||(t=0),this.stepStrictly){const s=this.min??0,o=Math.round((t-s)/this.effectiveStep);t=s+o*this.effectiveStep}t=Math.min(this.upperBound,Math.max(this.lowerBound,t));const i=this.effectivePrecision??Math.min(12,Math.max(js(t),js(this.effectiveStep)));return Number(t.toFixed(i))}commit(e,t){const i=this.normalizeValue(e),s=this.value;if(this.draft=void 0,Object.is(i,s)){this.inputEl&&(this.inputEl.value=this.displayedValue);return}this.passive?this.inputEl&&(this.inputEl.value=this.displayedValue):(this.value=i,this.setFormValue(i));const o={value:i,previousValue:s,source:t};this.emitValueChange("value",i,o)}stepBy(e,t){if(this.isValueLocked)return;const i=this.draft!==void 0&&this.draft.trim()&&Number.isFinite(Number(this.draft))?Number(this.draft):this.value,s=Math.min(12,Math.max(js(i),js(this.effectiveStep))),o=Number((i+e*this.effectiveStep).toFixed(s));this.commit(o,t)}handleInput(e){if(e.stopPropagation(),this.isValueLocked)return;this.draft=e.currentTarget.value;const t=Number(this.draft);this.draft.trim()&&Number.isFinite(t)&&this.emit("input",{value:t,previousValue:this.value,source:"input"})}handleChange(e){e.stopPropagation(),this.commitDraft()}handleBlur(){this.commitDraft()}commitDraft(){if(this.draft!==void 0){if(this.isValueLocked||!this.draft.trim()||!Number.isFinite(Number(this.draft))){this.draft=void 0,this.inputEl&&(this.inputEl.value=this.displayedValue);return}this.commit(Number(this.draft),"input")}}handleKeydown(e){this.isValueLocked||(e.key==="ArrowUp"||e.key==="ArrowDown")&&(e.preventDefault(),this.stepBy(e.key==="ArrowUp"?1:-1,"keyboard"))}handleDecrease(e){e.preventDefault(),e.stopPropagation(),this.stepBy(-1,"decrease")}handleIncrease(e){e.preventDefault(),e.stopPropagation(),this.stepBy(1,"increase")}render(){const e=this.isEffectivelyDisabled,t=this.isValueLocked,i=t||this.value<=this.lowerBound,s=t||this.value>=this.upperBound;return u`
      <div class="du-input-number" part="root" data-disabled=${e?"true":"false"}>
        <du-layout class="du-input-number__layout" gap="16px" overflow="visible">
          <button
            slot="start"
            class="du-input-number__button"
            part="decrease"
            type="button"
            aria-label="减少"
            data-testid=${ni(this.testIds,"decrease")}
            ?disabled=${i}
            @click=${this.handleDecrease}
          ><du-icon name="icon-minus_linear" size="16" decorative></du-icon></button>
          <input
            class="du-input-number__input"
            part="input"
            type="text"
            inputmode="decimal"
            role="spinbutton"
            data-testid=${ae(this.testId)}
            .value=${Bo(this.displayedValue)}
            .disabled=${e}
            .readOnly=${this.isOwnReadonly&&!e}
            aria-label=${this.ariaLabel||"数值"}
            aria-valuenow=${Number.isFinite(this.value)?this.value:0}
            aria-valuemin=${this.min??b}
            aria-valuemax=${this.max??b}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeydown}
          />
          <button
            slot="end"
            class="du-input-number__button"
            part="increase"
            type="button"
            aria-label="增加"
            data-testid=${ni(this.testIds,"increase")}
            ?disabled=${s}
            @click=${this.handleIncrease}
          ><du-icon name="icon-plus_linear" size="16" decorative></du-icon></button>
        </du-layout>
      </div>
    `}};Pa.styles=zp;let $e=Pa;ct([y("",{attribute:"test-id",reflect:!1})],$e.prototype,"testId"),ct([wr({},{attribute:"test-ids",reflect:!1})],$e.prototype,"testIds"),ct([T(0)],$e.prototype,"value"),ct([yt()],$e.prototype,"min"),ct([yt()],$e.prototype,"max"),ct([T(1)],$e.prototype,"step"),ct([yt({integer:!0,min:0,max:12})],$e.prototype,"precision"),ct([m()],$e.prototype,"stepStrictly"),ct([m()],$e.prototype,"disabled"),ct([m()],$e.prototype,"passive"),ct([q("input")],$e.prototype,"inputEl");function Kl(){oe(),xe(),k("du-input-number",$e)}const Lp=_`
  :host {
    --du-select-disabled-opacity: 0.4;
    display: inline-flex;
    position: relative;
    max-width: 100%;
    min-width: 0;
    vertical-align: middle;
    ${te}
  }

  ${z(X("block"))} {
    display: flex;
    width: 100%;
  }

  ${z(X("open"))} {
    z-index: var(--du-layer-z-index, 1200);
  }

  .du-select {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  ${Wl}

  .du-select__trigger {
    --du-field-gap: var(--du-gap-8, 8px);
    --du-field-placeholder: var(--du-on-l-c4);
    height: var(--du-size-control-md, 40px);
    width: 100%;
    text-align: left;
    cursor: pointer;
    ${te}
  }

  .du-select__trigger[data-searchable='true'] {
    cursor: text;
  }

  .du-select__trigger[data-readonly='true']:not([data-disabled='true']) {
    cursor: default;
  }

  .du-select__trigger[data-multiple='true'] {
    padding-block: 5px;
  }

  .du-select__trigger[data-disabled='true'] {
    opacity: var(--du-select-disabled-opacity, 0.4);
  }

  .du-select__trigger[data-status='default']:hover:not(
      [data-disabled='true']
    ):not([data-open='true']):not(:focus-within):not(:active) {
    --du-field-bg: var(--du-state-hover);
    --du-field-border: var(--du-fill-p-3);
  }

  .du-select__trigger:focus-visible {
    outline: none;
  }

  .du-select__value {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(
      --du-typo-body-regular-s-line-height,
      18px
    );
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-select__value--placeholder {
    color: var(--du-field-placeholder);
  }

  .du-select__search {
    flex: 1 1 48px;
    width: 100%;
    min-width: 48px;
    height: 18px;
    padding: 0;
    color: var(--du-field-fg);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(
      --du-typo-body-regular-s-line-height,
      18px
    );
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    caret-color: currentColor;
    background: transparent;
    border: 0;
    outline: 0;
    user-select: text;
  }

  .du-select__search::placeholder {
    color: var(--du-field-placeholder);
  }

  .du-select__search:disabled {
    cursor: not-allowed;
  }

  .du-select__search:read-only {
    cursor: default;
  }

  .du-select__tags {
    display: flex;
    flex: 0 1 auto;
    gap: var(--du-gap-4, 4px);
    align-items: center;
    min-width: 0;
    overflow: hidden;
  }

  .du-select__tag,
  .du-select__overflow {
    box-sizing: border-box;
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    height: 28px;
    min-width: 0;
    padding: var(--du-gap-4, 4px) var(--du-gap-8, 8px);
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    letter-spacing: var(--du-typo-body-regular-xs-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    background: var(--du-fill-p1);
    border-radius: var(--du-radius-round-corner-full, 36px);
  }

  .du-select__tag {
    gap: var(--du-gap-4, 4px);
    max-width: 104px;
  }

  .du-select__tag-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-select__overflow {
    flex: 0 0 auto;
  }

  .du-select__remove {
    display: inline-flex;
    flex: 0 0 16px;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    color: var(--du-on-l-c4);
    background: transparent;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
  }

  .du-select__remove:focus-visible {
    outline: none;
  }

  .du-select__trigger .du-field__clear {
    display: none;
    width: 16px;
    height: 16px;
    color: var(--du-on-l-c4);
  }

  .du-select__trigger[data-clear-query='true'] .du-field__clear,
  .du-select__trigger[data-clearable-value='true']:hover .du-field__clear {
    display: inline-flex;
  }

  .du-select__trigger:not([data-searchable='true'])[data-clearable-value='true']:hover
    .du-field__clear
    ~ .du-select__arrow {
    display: none;
  }

  .du-select__arrow {
    flex: 0 0 auto;
    color: var(--du-field-fg);
  }

  .du-select__menu {
    position: absolute;
    top: calc(100% + var(--du-gap-4, 4px));
    right: 0;
    left: 0;
    z-index: var(--du-layer-z-index, 1200);
    box-sizing: border-box;
    min-width: 168px;
  }

  .du-select__menu[data-du-overlay-layer] {
    position: fixed;
    inset: auto;
    right: auto;
    left: auto;
    min-width: 168px;
  }

  .du-select__menu::part(root) {
    max-width: 100%;
  }

  .du-select__option-icon {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
  }

`;var Np=Object.defineProperty,Q=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Np(e,t,s),s};const Hp=["default","error"],Zl={fromAttribute(r){if(!r)return"";if(r.trim().startsWith("["))try{const e=JSON.parse(r);if(Array.isArray(e))return e.map(String)}catch{return""}return r},toAttribute(r){return Array.isArray(r)?JSON.stringify(r):r}},Aa=class Aa extends ye{constructor(){super(...arguments),this.testIds={},this.testId="",this.value="",this.multiple=!1,this.searchable=!1,this.clearable=!1,this.hideTagsOnSearch=!1,this.query="",this.placeholder="请选择",this.disabled=!1,this.open=!1,this.status="default",this.error="",this.compactFieldMessage=!1,this.block=!1,this.maxVisible=8,this.maxTagCount=2,this.passive=!1,this.options=[],this.initialValue=""}connectedCallback(){super.connectedCallback(),this.initialValue=this.cloneValue(this.value),this.refreshOptions(),this.optionsObserver=is(this,()=>this.refreshOptions(),{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["test-id","value","data-value","disabled","type","slot"]})}firstUpdated(){super.firstUpdated(),this.refreshOptions()}disconnectedCallback(){var e;(e=this.optionsObserver)==null||e.disconnect(),this.optionsObserver=void 0,this.releaseMenuOverlay(),this.unbindOutsidePointer(),K(this).clearOnDisconnect(),super.disconnectedCallback()}getFormValue(){return this.multiple?JSON.stringify(this.selectedValues):this.selectedValues[0]??""}resetFormControl(){this.value=this.cloneValue(this.initialValue),this.query="",this.open=!1}restoreFormState(e){typeof e=="string"&&(this.value=this.multiple?Zl.fromAttribute(e):e)}updated(e){(e.has("value")||e.has("multiple"))&&this.setFormValue(this.getFormValue()),e.has("open")&&(this.open?(this.bindOutsidePointer(),this.syncMenuOverlay(),this.updateComplete.then(()=>this.syncMenuOverlay())):this.unbindOutsidePointer()),(e.has("readOnly")||e.has("disabled"))&&this.isValueLocked&&this.open&&this.closeMenu(!1)}cloneValue(e){return Array.isArray(e)?[...e]:e}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get resolvedStatus(){return this.status==="error"||this.error?"error":"default"}get selectedValues(){const e=Array.isArray(this.value)?this.value:this.value?[this.value]:[];return Array.from(new Set(e))}get selectedOptions(){const e=new Map(this.options.filter(t=>t.type==="item").map(t=>[t.value,t]));return this.selectedValues.map(t=>e.get(t)).filter(t=>!!t)}get selectedOption(){return this.selectedOptions[0]}get displayLabel(){var e;return((e=this.selectedOption)==null?void 0:e.label)??""}get hasValue(){return this.selectedOptions.length>0}get hasSearchQuery(){return this.searchable&&this.open&&!!this.query}get shouldHideTagsOnSearch(){return this.hideTagsOnSearch&&this.multiple&&this.hasValue&&this.searchable&&this.open}get showClear(){return this.isValueLocked?!1:this.hasSearchQuery||this.clearable&&!this.multiple&&this.hasValue}get filteredOptions(){const e=this.query.trim().toLocaleLowerCase();if(!this.searchable||!e)return this.options;const t=[];let i,s=!1;for(const o of this.options)if(o.type!=="divider"){if(o.type==="group"){i=o,s=o.label.toLocaleLowerCase().includes(e);continue}!s&&!o.label.toLocaleLowerCase().includes(e)||(i&&(t.push(i),i=void 0),t.push(o))}return t}refreshOptions(){const e=Array.from(this.querySelectorAll('[slot="option"]')).filter(i=>i.closest("du-select")===this),t=new Set(Array.from(this.children,i=>i.getAttribute("slot")));this.options=e.map(i=>{var h,p;const s=i.getAttribute("type"),o=s==="group"||s==="divider"?s:"item",a=o!=="item"?"":i.getAttribute("value")??i.getAttribute("data-value")??((h=i.textContent)==null?void 0:h.trim())??"",l=`option-icon-${a}`;return{testId:i.getAttribute("test-id")??"",type:o,value:a,label:((p=i.textContent)==null?void 0:p.trim())??"",disabled:o!=="item"||i.hasAttribute("disabled"),iconSlot:o==="item"&&t.has(l)?l:void 0}})}syncMenuOverlay(){const e=this.renderRoot.querySelector("du-menu")??this.menuEl,t=this.renderRoot.querySelector(".du-select__trigger");e&&(this.menuEl=e),e==null||e.syncOverlayPosition(t)}releaseMenuOverlay(){const e=this.renderRoot.querySelector("du-menu")??this.menuEl;e==null||e.releaseOverlay(),this.menuEl=void 0}bindOutsidePointer(){this.outsidePointerHandler||(this.outsidePointerHandler=e=>{const t=e.composedPath();t.includes(this)||t.some(i=>i instanceof HTMLElement&&i.localName==="du-menu"&&i.classList.contains("du-select__menu"))||this.closeMenu(!1)},window.addEventListener("pointerdown",this.outsidePointerHandler,!0))}unbindOutsidePointer(){this.outsidePointerHandler&&(window.removeEventListener("pointerdown",this.outsidePointerHandler,!0),this.outsidePointerHandler=void 0)}openMenu(){if(this.isValueLocked||this.open)return;const e=K(this),t=()=>this.closeMenu(!1);if(!e.requestOpen("select",t))return;this.refreshOptions();const i=!0;this.passive||(this.open=i),this.emit("open-change",{open:i,value:this.cloneValue(this.value)}),this.emit("update:open",i),e.notify("open","select",t),e.notify("appear","select",t)}async openMenuAndFocus(e="selected"){this.openMenu(),await this.updateComplete;const t=this.filteredOptions.filter(s=>s.type==="item"&&!s.disabled),i=e==="first"?t[0]:e==="last"?t[t.length-1]:t.find(s=>this.selectedValues.includes(s.value))??t[0];this.focusOption(i==null?void 0:i.value)}closeMenu(e=!0){if(!this.open)return;this.releaseMenuOverlay();const t=!1;this.passive||(this.open=t,this.query&&(this.query="",this.emit("update:query",""))),this.emit("open-change",{open:t,value:this.cloneValue(this.value)}),this.emit("update:open",t),K(this).notify("close","select"),e&&this.updateComplete.then(()=>{const i=this.searchable?this.renderRoot.querySelector(".du-select__search"):this.renderRoot.querySelector(".du-select__trigger");i==null||i.focus()})}toggleMenu(){this.open?this.closeMenu(!1):this.openMenu()}commitOption(e,t){const i=this.cloneValue(this.value),s=this.selectedValues,o=this.multiple?t?[...s,e.value]:s.filter(h=>h!==e.value):e.value;this.passive||(this.value=o,this.setFormValue(this.getFormValue()));const a=Array.isArray(o)?[...o]:o?[o]:[],l={value:this.cloneValue(o),values:a,label:e.label,labels:a.map(h=>{var p;return(p=this.options.find(f=>f.value===h))==null?void 0:p.label}).filter(h=>!!h),previous:i,multiple:this.multiple,option:{value:e.value,label:e.label,selected:t}};this.emitValueChange("value",this.cloneValue(o),l),this.emit("option-click",l.option)}selectOption(e){if(e.type!=="item"||e.disabled||this.isValueLocked)return;const t=this.multiple?!this.selectedValues.includes(e.value):!0;this.commitOption(e,t),this.multiple||this.closeMenu()}removeOption(e,t){e.preventDefault(),e.stopPropagation(),!this.isValueLocked&&this.commitOption(t,!1)}handleClear(e){if(e.preventDefault(),e.stopPropagation(),!this.showClear)return;const t=this.cloneValue(this.value),i=this.query;if(this.searchable&&this.open&&this.query){this.passive||(this.query=""),this.emit("clear",{target:"query",value:this.cloneValue(this.value),previousValue:t,query:"",previousQuery:i}),this.emit("search",{query:"",matches:this.options.filter(l=>l.type==="item").map(l=>l.value)}),this.emit("update:query","");const a=this.renderRoot.querySelector(".du-select__search");this.passive&&a&&(a.value=this.query),a==null||a.focus();return}const s=this.selectedOption;if(!s)return;this.passive||(this.value="",this.setFormValue("")),this.emit("clear",{target:"value",value:"",previousValue:t,query:this.query,previousQuery:i}),this.emitValueChange("value","",{value:"",values:[],label:s.label,labels:[],previous:t,multiple:!1,option:{value:s.value,label:s.label,selected:!1}});const o=this.searchable?this.renderRoot.querySelector(".du-select__search"):this.renderRoot.querySelector(".du-select__trigger");o==null||o.focus()}handleTriggerClick(){var e;if(!this.isValueLocked){if(this.searchable){this.openMenu(),(e=this.renderRoot.querySelector(".du-select__search"))==null||e.focus();return}this.toggleMenu()}}handleTriggerKeydown(e){if(!this.isInteractiveDisabled){if(this.isOwnReadonly){e.key==="Escape"&&(e.preventDefault(),this.closeMenu());return}if(e.key===" "||e.key==="Enter"){e.preventDefault(),this.toggleMenu();return}if(e.key==="Escape"){e.preventDefault(),this.closeMenu();return}if(e.key==="ArrowDown"){e.preventDefault(),this.openMenuAndFocus(this.open?"selected":"first");return}e.key==="ArrowUp"&&(e.preventDefault(),this.openMenuAndFocus(this.open?"selected":"last"))}}handleSearchInput(e){if(e.stopPropagation(),this.isValueLocked){const s=e.currentTarget;s.value=this.open?this.query:this.multiple?"":this.displayLabel;return}const t=e.currentTarget,i=t.value;this.passive||(this.query=i),this.openMenu(),this.emit("search",{query:i,matches:this.filteredOptions.filter(s=>s.type==="item").map(s=>s.value)}),this.emit("update:query",i),this.passive&&(t.value=this.open?this.query:this.multiple?"":this.displayLabel)}handleSearchKeydown(e){if(e.key==="Escape"){e.preventDefault(),this.closeMenu();return}if(e.key==="ArrowDown"){e.preventDefault(),this.openMenuAndFocus("first");return}if(e.key==="ArrowUp"){e.preventDefault(),this.openMenuAndFocus("last");return}e.key==="Enter"&&!this.open&&(e.preventDefault(),this.openMenu())}handleOptionKeydown(e,t){var o,a,l,h;if(e.key==="Escape"){e.preventDefault(),this.closeMenu();return}const i=this.filteredOptions.filter(p=>p.type==="item"&&!p.disabled),s=i.findIndex(p=>p.value===t.value);if(e.key==="ArrowDown"){e.preventDefault(),this.focusOption((o=i[s+1]??i[0])==null?void 0:o.value);return}if(e.key==="ArrowUp"){e.preventDefault(),this.focusOption((a=i[s-1]??i[i.length-1])==null?void 0:a.value);return}if(e.key==="Home"){e.preventDefault(),this.focusOption((l=i[0])==null?void 0:l.value);return}e.key==="End"&&(e.preventDefault(),this.focusOption((h=i[i.length-1])==null?void 0:h.value))}focusOption(e){var t;e&&((t=this.renderRoot.querySelector(`du-menu-item[data-value="${CSS.escape(e)}"]`))==null||t.focus())}renderTags(){const e=Math.max(0,this.maxTagCount),t=this.selectedOptions,i=t.slice(0,e),s=t.length-i.length;return u`
      <span class="du-select__tags" part="tags">
        ${i.map(o=>u`
            <span class="du-select__tag" part="tag">
              <span
                class="du-select__tag-label"
                part="tag-label"
                .textContent=${o.label}
              ></span>
              <button
                class="du-select__remove"
                part="remove"
                type="button"
                aria-label=${`移除 ${o.label}`}
                ?hidden=${this.isOwnReadonly}
                @click=${a=>this.removeOption(a,o)}
              >
                <du-icon name="icon-close_circle_surface" size="16" decorative></du-icon>
              </button>
            </span>
          `)}
        ${s>0?u`<span
              class="du-select__overflow"
              part="overflow-count"
              .textContent=${`+${s}`}
            ></span>`:b}
      </span>
    `}renderTriggerContent(){return this.multiple&&this.hasValue?u`
        ${this.shouldHideTagsOnSearch?b:this.renderTags()}
        ${this.searchable?this.renderSearchInput():b}
      `:this.searchable?this.renderSearchInput():u`
      <span
        class="du-select__value ${this.hasValue?"":"du-select__value--placeholder"}"
        part="value"
        .textContent=${this.hasValue?this.displayLabel:this.placeholder}
      ></span>
    `}renderSearchInput(){const e=this.open?this.query:this.multiple?"":this.displayLabel;return u`
      <input
        class="du-select__search"
        part="input"
        data-testid=${ae(this.testId)}
        type="text"
        .value=${e}
        placeholder=${this.multiple&&this.hasValue&&!this.shouldHideTagsOnSearch?"":this.placeholder}
        ?disabled=${this.isInteractiveDisabled}
        .readOnly=${this.isOwnReadonly&&!this.isInteractiveDisabled}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded=${this.open?"true":"false"}
        @focus=${this.openMenu}
        @input=${this.handleSearchInput}
        @change=${t=>t.stopPropagation()}
        @keydown=${this.handleSearchKeydown}
      />
    `}render(){const e=this.isInteractiveDisabled,t=this.isOwnReadonly,i=new Set(this.selectedValues),s=this.filteredOptions;return u`
      <div class="du-select" part="root">
        <div
          class="du-field du-select__trigger"
          part="trigger"
          data-testid=${this.searchable?b:ae(this.testId)}
          role=${this.searchable?b:"combobox"}
          tabindex=${this.searchable||e?"-1":"0"}
          data-disabled=${e?"true":"false"}
          data-readonly=${t?"true":"false"}
          data-status=${this.resolvedStatus}
          data-open=${this.open?"true":"false"}
          data-filled=${this.hasValue?"true":"false"}
          data-multiple=${this.multiple?"true":"false"}
          data-searchable=${this.searchable?"true":"false"}
          data-clear-query=${this.hasSearchQuery?"true":"false"}
          data-clearable-value=${this.clearable&&!this.multiple&&this.hasValue?"true":"false"}
          aria-disabled=${e?"true":"false"}
          aria-readonly=${t?"true":"false"}
          aria-haspopup="listbox"
          aria-expanded=${this.open?"true":"false"}
          @click=${this.handleTriggerClick}
          @keydown=${this.searchable?b:this.handleTriggerKeydown}
        >
          <span class="du-field__main">
            <slot name="prefix"></slot>
            ${this.renderTriggerContent()}
          </span>
          <span class="du-field__suffix" part="suffix">
            ${this.showClear?u`
                  <button
                    class="du-field__clear"
                    part="clear"
                    data-testid=${ni(this.testIds,"clear")}
                    type="button"
                    tabindex="-1"
                    aria-label="清除"
                    @click=${this.handleClear}
                  >
                    <du-icon
                      name="icon-close_circle_surface"
                      size="16"
                      decorative
                    ></du-icon>
                  </button>
                `:b}
            <du-icon
              class="du-select__arrow"
              part="arrow"
              name=${this.open?"icon-arrow_up_linear":"icon-arrow_down_linear"}
              size="12"
              decorative
            ></du-icon>
          </span>
        </div>

        <slot name="option" hidden @slotchange=${this.refreshOptions}></slot>

        ${this.open?u`
              <du-menu
                class="du-select__menu"
                part="menu"
                exportparts="empty:empty"
                overlay
                .renderAt=${this.renderAt}
                list-role="listbox"
                .multiSelectable=${this.multiple}
                .maxVisible=${this.maxVisible}
                @open-change=${o=>o.stopPropagation()}
                @update:open=${o=>o.stopPropagation()}
              >
                ${s.map(o=>o.type==="group"?u`
                        <du-menu-item
                          type="group"
                          exportparts="group:option-group,label:option-label"
                        >
                          ${o.label}
                        </du-menu-item>
                      `:o.type==="divider"?u`
                          <du-menu-item
                            type="divider"
                            exportparts="divider:option-divider"
                          ></du-menu-item>
                        `:u`
                        <du-menu-item
                          data-value=${o.value}
                          .testId=${o.testId??""}
                          .value=${o.value}
                          item-role="option"
                          .variant=${this.multiple?"checkbox":"default"}
                          .disabled=${o.disabled}
                          .checked=${i.has(o.value)}
                          .selected=${!this.multiple&&i.has(o.value)}
                          exportparts="item:option,label:option-label,selected-icon:option-selected-icon"
                          @change=${a=>a.stopPropagation()}
                          @click=${a=>{a.stopPropagation(),this.selectOption(o)}}
                          @keydown=${a=>this.handleOptionKeydown(a,o)}
                        >
                          ${o.iconSlot?u`
                                <du-layout width="100%" gap="8" text-overflow="ellipsis" lines="1">
                                  <span slot="start" class="du-select__option-icon" part="option-icon" aria-hidden="true">
                                    <slot name=${o.iconSlot}></slot>
                                  </span>
                                  <span>${o.label}</span>
                                </du-layout>
                              `:o.label}
                        </du-menu-item>
                      `)}
                <slot name="empty" slot="empty">暂无内容</slot>
              </du-menu>
            `:b}

        ${this.error?u`<p class="du-field-message du-select__error" part="error">${this.error}</p>`:b}
      </div>
    `}};Aa.styles=Lp;let V=Aa;Q([wr({},{attribute:"test-ids",reflect:!1})],V.prototype,"testIds"),Q([y("",{attribute:"test-id",reflect:!1})],V.prototype,"testId"),Q([C({reflect:!0,converter:Zl})],V.prototype,"value"),Q([m()],V.prototype,"multiple"),Q([m()],V.prototype,"searchable"),Q([m()],V.prototype,"clearable"),Q([m()],V.prototype,"hideTagsOnSearch"),Q([y()],V.prototype,"query"),Q([y("请选择")],V.prototype,"placeholder"),Q([m()],V.prototype,"disabled"),Q([m()],V.prototype,"open"),Q([zt(Lt,{attribute:"render-at"})],V.prototype,"renderAt"),Q([$(Hp,"default")],V.prototype,"status"),Q([y()],V.prototype,"error"),Q([m()],V.prototype,"compactFieldMessage"),Q([m()],V.prototype,"block"),Q([T(8,{attribute:"max-visible"})],V.prototype,"maxVisible"),Q([T(2,{attribute:"max-tag-count"})],V.prototype,"maxTagCount"),Q([m()],V.prototype,"passive"),Q([S()],V.prototype,"options");const Fp=_`
  .du-menu-panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 168px;
    max-width: 800px;
    overflow: hidden;
    background: var(--du-fill-p7);
    border-radius: var(--du-radius-round-corner-xl, 24px);
    box-shadow: var(--du-shadow-l4);
    backdrop-filter: blur(var(--du-shadow-l4-backdrop-blur, 100px));
    -webkit-backdrop-filter: blur(var(--du-shadow-l4-backdrop-blur, 100px));
  }
`,Vp=_`
  :host {
    display: inline-flex;
    position: relative;
    max-width: 100%;
    overflow: visible;
    vertical-align: top;
  }

  ${z(X("disabled"))} {
    cursor: not-allowed;
  }

  ${Fp}

  .du-menu {
    width: 100%;
  }

  .du-menu__reference {
    display: inline-flex;
    width: 100%;
    min-width: 0;
  }

  .du-menu__popper {
    position: absolute;
    z-index: var(--du-layer-z-index, 1200);
    box-sizing: border-box;
    width: max-content;
    min-width: max(168px, 100%);
    max-width: min(800px, calc(100vw - 16px));
    animation: du-menu-enter 120ms ease-out;
  }

  /* Top layer：100% 不再相对触发器，勿再用 min-width: max(168px, 100%)，否则会撑满视口 */
  .du-menu__popper[popover],
  :host([popover]) {
    display: block;
    position: fixed;
    inset: auto;
    width: max-content;
    min-width: 168px;
    max-width: min(800px, calc(100vw - 16px));
    margin: 0;
    padding: 0;
    overflow: visible;
    border: none;
    background: transparent;
  }

  .du-menu__popper[popover][data-placement],
  :host([popover]) {
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
  }

  .du-menu__popper[hidden] {
    display: none;
  }

  .du-menu__popper[data-placement='bottom-start'] {
    top: calc(100% + var(--du-menu-offset, 4px));
    left: 0;
    transform-origin: top left;
  }

  .du-menu__popper[data-placement='bottom-end'] {
    top: calc(100% + var(--du-menu-offset, 4px));
    right: 0;
    transform-origin: top right;
  }

  .du-menu__popper[data-placement='top-start'] {
    bottom: calc(100% + var(--du-menu-offset, 4px));
    left: 0;
    transform-origin: bottom left;
  }

  .du-menu__popper[data-placement='top-end'] {
    right: 0;
    bottom: calc(100% + var(--du-menu-offset, 4px));
    transform-origin: bottom right;
  }

  .du-menu__scroll {
    display: block;
    width: 100%;
    max-height: var(--du-menu-list-max-height, 320px);
  }

  .du-menu__list {
    display: flex;
    flex-direction: column;
    gap: 0;
    box-sizing: border-box;
  }

  .du-menu__empty {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-height: 40px;
    padding: 9px 20px;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-menu__empty[hidden] {
    display: none;
  }

  @keyframes du-menu-enter {
    from {
      opacity: 0;
      transform: translateY(-2px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;var Bp=Object.defineProperty,re=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Bp(e,t,s),s};const Up=["menu","listbox"],Gp=["click","hover","manual"],Wp=["top-start","top-end","bottom-start","bottom-end"],Oa=class Oa extends A{constructor(){super(...arguments);w(this,br);w(this,zi);w(this,Fr);w(this,it);this.maxVisible=8,this.scrollable=!0,this.listRole="menu",this.multiSelectable=!1,this.trigger="click",this.open=!1,this.passive=!1,this.disabled=!1,this.placement="bottom-start",this.offset=4,this.hideOnClick=!0,this.showDelay=0,this.hideDelay=120,this.overlay=!1,this.parent="",this.hasTrigger=!1,this.hasContent=!1,this.showTimer=0,this.hideTimer=0,this.documentDismissBound=!1,this.overlayRepositionBound=!1,d(this,it,ts(this,ui.menu,()=>this.zIndex,t=>this.style.setProperty("--du-layer-z-index",String(t)),{defaultRenderAt:"top-level",readRenderAt:()=>this.renderAt,onRenderAtChange:()=>this.syncOverlayLayer()})),this.onOverlayReposition=()=>{this.layoutOverlayLayer()},this.handleReferenceClick=()=>{this.trigger!=="click"||this.isInteractiveDisabled||this.toggle()},this.handleReferenceMouseEnter=()=>{this.trigger!=="hover"||this.isInteractiveDisabled||this.scheduleShow()},this.handleReferenceMouseLeave=()=>{this.trigger==="hover"&&this.scheduleHide()},this.handlePopperMouseEnter=()=>{this.trigger==="hover"&&this.clearTimers()},this.handlePopperMouseLeave=()=>{this.trigger==="hover"&&this.scheduleHide()},this.handleReferenceKeydown=t=>{if(!this.isInteractiveDisabled){if(t.key==="Escape"&&this.open){t.preventDefault(),this.hide();return}(t.key==="ArrowDown"||t.key==="ArrowUp")&&(t.preventDefault(),this.setOpen(!0),this.updateComplete.then(()=>{this.focusMenuItem(t.key==="ArrowDown"?0:-1)}))}},this.handleMenuKeydown=t=>{if(t.key==="Escape"){t.preventDefault(),this.hide(),this.focusTrigger();return}if(t.key==="Tab"){this.hide();return}const i=this.enabledMenuItems;if(!i.length)return;const s=t.composedPath().find(l=>l instanceof HTMLElement&&l.localName==="du-menu-item"),o=s?i.indexOf(s):-1;let a;if(t.key==="ArrowDown")a=i[o+1]??i[0];else if(t.key==="ArrowUp")a=i[o-1]??i[i.length-1];else if(t.key==="Home")a=i[0];else if(t.key==="End")a=i[i.length-1];else return;t.preventDefault(),a==null||a.focus()},this.handleMenuClick=t=>{if(!t.composedPath().find(o=>o instanceof HTMLElement&&o.localName==="du-menu-item"))return;const s=t.detail;s&&this.emit("command",s),this.isDropdownMode&&this.hideOnClick&&this.hide()},this.handleDocumentPointerDown=t=>{if(this.trigger==="manual"||!this.open)return;const i=t.composedPath();if(i.includes(this))return;const s=n(this,zi)??n(this,Fr);s&&i.includes(s)||this.pathHitsNestedCoachmarkPortal(i)||this.hide()},this.handleDocumentKeydown=t=>{t.key!=="Escape"||!this.open||(this.hide(),this.focusTrigger())}}get effectiveZIndex(){return n(this,it).effectiveZIndex}get effectiveRenderAt(){return n(this,it).effectiveRenderAt}connectedCallback(){super.connectedCallback(),n(this,it).connect(),this.hasTrigger=this.lightDomHasTrigger(),this.hasContent=this.lightDomHasContent()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected||(this.clearTimers(),this.unbindDocumentDismiss(),this.teardownOverlayLayer(),K(this).clearOnDisconnect(),n(this,it).clearOnDisconnect())})}firstUpdated(){this.syncOverlayLayer()}updated(t){(t.has("zIndex")||t.has("renderAt"))&&n(this,it).sync(),t.has("open")&&(this.open&&this.isDropdownMode?this.bindDocumentDismiss():this.unbindDocumentDismiss(),t.get("open")!==void 0&&(this.emit("open-change",{open:this.open}),this.emit("update:open",this.open))),t.has("disabled")&&this.disabled&&this.open&&this.setOpen(!1),(t.has("open")||t.has("overlay")||t.has("parent")||t.has("zIndex")||t.has("renderAt")||t.has("placement")||t.has("offset"))&&this.syncOverlayLayer()}syncOverlayPosition(t){t&&d(this,br,t),this.syncOverlayLayer()}releaseOverlay(){this.teardownOverlayLayer()}get listMaxHeight(){return`${Math.max(1,this.maxVisible)*40}px`}get isDropdownMode(){return this.hasTrigger||this.lightDomHasTrigger()}get shouldLiftOverlay(){return this.effectiveRenderAt!=="top-level"?!1:this.isDropdownMode?this.open:this.overlay}get overlayLayerEl(){return this.isDropdownMode?this.renderRoot.querySelector(".du-menu__popper"):this.overlay?this:null}get overlayAnchorEl(){var t;return(t=n(this,br))!=null&&t.isConnected?n(this,br):this.isDropdownMode?this.renderRoot.querySelector(".du-menu__reference")??this.triggerElement??this:null}get overlayPositionOptions(){return{placement:this.placement,offset:this.offset,matchWidth:!this.isDropdownMode,minWidth:168,flip:!0}}get shouldPortal(){return this.shouldLiftOverlay&&!!this.parent.trim()}syncOverlayLayer(){const t=this.overlayLayerEl;if(!this.shouldLiftOverlay||!t){this.teardownOverlayLayer({preserveAnchor:!!(t&&this.overlay&&this.effectiveRenderAt==="normal")});return}!this.isDropdownMode&&!this.overlayAnchorEl||(d(this,zi,t),this.syncParentPortal(t),Cr(t),this.layoutOverlayLayer(),this.bindOverlayReposition(),requestAnimationFrame(()=>this.layoutOverlayLayer()))}layoutOverlayLayer(){const t=n(this,zi)??this.overlayLayerEl,i=this.overlayAnchorEl;!t||!i||Fh(t,i.getBoundingClientRect(),this.overlayPositionOptions)}syncParentPortal(t){if(!this.shouldPortal||this.isDropdownMode){this.teardownParentPortal();return}this.releasePortalTheme??(this.releasePortalTheme=Sr(this));const i=K(this);i.setPortaling(!0),n(this,it).beginPortal();try{this.detachPortal=Un(this,this.parent,this.detachPortal),d(this,Fr,this)}finally{i.setPortaling(!1),n(this,it).endPortal()}}teardownParentPortal(){var t,i;(t=this.detachPortal)==null||t.call(this),this.detachPortal=void 0,(i=this.releasePortalTheme)==null||i.call(this),this.releasePortalTheme=void 0,d(this,Fr,void 0),n(this,it).releasePortal()}teardownOverlayLayer(t={}){this.unbindOverlayReposition();const i=n(this,zi)??this.overlayLayerEl;d(this,zi,void 0),i&&Bi(i),this.teardownParentPortal(),t.preserveAnchor||d(this,br,void 0)}bindOverlayReposition(){this.overlayRepositionBound||(this.overlayRepositionBound=!0,window.addEventListener("scroll",this.onOverlayReposition,!0),window.addEventListener("resize",this.onOverlayReposition))}unbindOverlayReposition(){this.overlayRepositionBound&&(this.overlayRepositionBound=!1,window.removeEventListener("scroll",this.onOverlayReposition,!0),window.removeEventListener("resize",this.onOverlayReposition))}get isInteractiveDisabled(){return this.isOwnDisabled}get popperStyle(){return{"--du-menu-offset":`${Math.max(0,this.offset)}px`}}get triggerElement(){return Array.from(this.children).find(t=>t.slot==="trigger"||t.slot==="reference")}lightDomHasTrigger(){return!!this.triggerElement}lightDomHasContent(){return Array.from(this.childNodes).some(t=>{var i;return t.nodeType===Node.TEXT_NODE?!!((i=t.textContent)!=null&&i.trim()):t instanceof HTMLElement?!t.slot:!1})}syncContentSlot(){const t=this.lightDomHasContent();this.hasContent!==t&&(this.hasContent=t)}syncTriggerSlot(){const t=this.lightDomHasTrigger();this.hasTrigger!==t&&(this.hasTrigger=t,!t&&this.open&&this.setOpen(!1))}setOpen(t){if(t&&this.isInteractiveDisabled||!this.isDropdownMode||this.open===t)return;const i=K(this),s=()=>this.hide();t&&!i.requestOpen("menu",s)||(this.passive?(this.emit("open-change",{open:t}),this.emit("update:open",t)):this.open=t,t?(i.notify("open","menu",s),i.notify("appear","menu",s)):i.notify("close","menu"))}show(){this.clearTimers(),this.setOpen(!0)}hide(){this.clearTimers(),this.setOpen(!1)}toggle(){this.clearTimers(),this.setOpen(!this.open)}scheduleShow(){if(this.clearHideTimer(),this.open||this.showTimer)return;const t=Math.max(0,Number(this.showDelay)||0);if(t===0){this.setOpen(!0);return}this.showTimer=window.setTimeout(()=>{this.showTimer=0,this.setOpen(!0)},t)}scheduleHide(){if(this.clearShowTimer(),!this.open||this.hideTimer)return;const t=Math.max(0,Number(this.hideDelay)||0);if(t===0){this.setOpen(!1);return}this.hideTimer=window.setTimeout(()=>{this.hideTimer=0,this.setOpen(!1)},t)}clearShowTimer(){this.showTimer&&(window.clearTimeout(this.showTimer),this.showTimer=0)}clearHideTimer(){this.hideTimer&&(window.clearTimeout(this.hideTimer),this.hideTimer=0)}clearTimers(){this.clearShowTimer(),this.clearHideTimer()}get enabledMenuItems(){return Array.from(this.children).filter(t=>t.localName==="du-menu-item").filter(t=>t.type!=="divider"&&!t.disabled&&(t.type!=="group"||!t.readOnly))}focusMenuItem(t){var s;const i=this.enabledMenuItems;(s=t<0?i[i.length-1]:i[t])==null||s.focus()}focusTrigger(){var o;const t=this.triggerElement;if(t==null||t.focus(),!t||document.activeElement===t)return;const i='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',s=((o=t.shadowRoot)==null?void 0:o.querySelector(i))??t.querySelector(i);s==null||s.focus()}pathHitsNestedCoachmarkPortal(t){if(!t.some(s=>s instanceof HTMLElement&&s.hasAttribute("data-du-coachmark-portal")))return!1;for(const s of this.querySelectorAll("du-coachmark"))if(s.open)return!0;return!1}bindDocumentDismiss(){this.documentDismissBound||(this.documentDismissBound=!0,document.addEventListener("pointerdown",this.handleDocumentPointerDown,!0),document.addEventListener("keydown",this.handleDocumentKeydown))}unbindDocumentDismiss(){this.documentDismissBound&&(this.documentDismissBound=!1,document.removeEventListener("pointerdown",this.handleDocumentPointerDown,!0),document.removeEventListener("keydown",this.handleDocumentKeydown))}renderList(){return u`
      <div
        class="du-menu__list"
        part="list"
        role=${this.listRole}
        aria-multiselectable=${this.listRole==="listbox"&&this.multiSelectable?"true":b}
        @click=${this.handleMenuClick}
        @keydown=${this.handleMenuKeydown}
      >
        <slot ?hidden=${!this.hasContent} @slotchange=${this.syncContentSlot}></slot>
        <div
          class="du-menu__empty"
          part="empty"
          role="status"
          ?hidden=${this.hasContent}
        >
          <slot name="empty">暂无内容</slot>
        </div>
      </div>
    `}renderPanel(){const t=this.renderList();return u`
      <div class="du-menu du-menu-panel" part="root">
        ${this.scrollable?u`
              <du-scroll-area
                class="du-menu__scroll"
                part="scroll"
                scrollbar-padding="18px"
                style=${`--du-menu-list-max-height: ${this.listMaxHeight};`}
              >
                ${t}
              </du-scroll-area>
            `:t}
      </div>
    `}render(){return this.isDropdownMode?u`
      <span
        class="du-menu__reference"
        part="reference"
        aria-haspopup="menu"
        aria-expanded=${this.open?"true":"false"}
        aria-disabled=${this.isInteractiveDisabled?"true":"false"}
        @click=${this.handleReferenceClick}
        @keydown=${this.handleReferenceKeydown}
        @mouseenter=${this.handleReferenceMouseEnter}
        @mouseleave=${this.handleReferenceMouseLeave}
      >
        <slot name="trigger" @slotchange=${this.syncTriggerSlot}></slot>
        <slot name="reference" @slotchange=${this.syncTriggerSlot}></slot>
      </span>
      <div
        class="du-menu__popper"
        part="popper"
        data-placement=${this.placement}
        style=${ne(this.popperStyle)}
        ?hidden=${!this.open}
        @mouseenter=${this.handlePopperMouseEnter}
        @mouseleave=${this.handlePopperMouseLeave}
      >
        ${this.renderPanel()}
      </div>
    `:this.renderPanel()}};br=new WeakMap,zi=new WeakMap,Fr=new WeakMap,it=new WeakMap,Oa.styles=Vp;let B=Oa;re([T(8,{attribute:"max-visible"})],B.prototype,"maxVisible"),re([m(!0)],B.prototype,"scrollable"),re([$(Up,"menu",{attribute:"list-role"})],B.prototype,"listRole"),re([m(!1,{attribute:"multi-selectable",reflect:!1})],B.prototype,"multiSelectable"),re([$(Gp,"click")],B.prototype,"trigger"),re([m()],B.prototype,"open"),re([m()],B.prototype,"passive"),re([m()],B.prototype,"disabled"),re([$(Wp,"bottom-start")],B.prototype,"placement"),re([T(4)],B.prototype,"offset"),re([m(!0,{attribute:"hide-on-click"})],B.prototype,"hideOnClick"),re([T(0,{attribute:"show-delay"})],B.prototype,"showDelay"),re([T(120,{attribute:"hide-delay"})],B.prototype,"hideDelay"),re([m()],B.prototype,"overlay"),re([y()],B.prototype,"parent"),re([yt({attribute:"z-index",integer:!0})],B.prototype,"zIndex"),re([zt(Lt,{attribute:"render-at"})],B.prototype,"renderAt"),re([S()],B.prototype,"hasTrigger"),re([S()],B.prototype,"hasContent");const jp=_`
  .du-menu-item__config {
    box-sizing: border-box;
  }

  .du-menu-item__config--group {
    position: relative;
  }

  .du-menu-item__config--leading {
    padding-inline: 0;
  }

  .du-menu-item__surface {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    min-height: 40px;
    color: var(--du-on-l-c2);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
    text-align: left;
    background: transparent;
    border: 0;
    border-radius: 0;
    transition: background-color var(--du-duration-normal, 0.2s) ease,
      color var(--du-duration-normal, 0.2s) ease;
  }

  .du-menu-item__surface--text {
    padding: 9px 20px;
  }

  .du-menu-item__surface--selected {
    padding-right: 0;
  }

  .du-menu-item__surface--leading {
    gap: 8px;
    padding: 9px 12px 9px 20px;
  }

  .du-menu-item__label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-menu-item__icon,
  .du-menu-item__checkbox {
    flex: 0 0 auto;
  }

  .du-menu-item__selected {
    display: inline-flex;
    flex: 0 0 32px;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    color: var(--du-on-l-c2);
  }

  .du-menu-item__icon {
    color: var(--du-on-l-c2);
  }

  .du-menu-item--interactive {
    cursor: pointer;
    ${te}
  }

  .du-menu-item--interactive:hover:not([data-disabled='true']):not(
      [data-readonly='true']
    ):not(:active) {
    background: var(--du-state-hover);
  }

  .du-menu-item--interactive:active:not([data-disabled='true']):not(
      [data-readonly='true']
    ) {
    background: var(--du-state-press);
  }

  .du-menu-item--interactive:focus-visible {
    outline: none;
  }

  .du-menu-item--danger:not([data-disabled='true']):not(
      [data-readonly='true']
    ):hover,
  .du-menu-item--danger:not([data-disabled='true']):not(
      [data-readonly='true']
    ):focus-visible,
  .du-menu-item--danger:not([data-disabled='true']):not(
      [data-readonly='true']
    ):active {
    color: var(--du-accent-red);
  }

  .du-menu-item--danger:not([data-disabled='true']):not(
      [data-readonly='true']
    ):hover:not(:active) {
    background: var(--du-state-hover);
  }

  .du-menu-item--danger:not([data-disabled='true']):not(
      [data-readonly='true']
    ):active {
    background: var(--du-state-press);
  }

  .du-menu-item--interactive[data-disabled='true'] {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-menu-item--interactive[data-disabled='true'] > * {
    --du-disabled-opacity: 1;
  }

  .du-menu-item--interactive[data-readonly='true'] {
    cursor: default;
  }

  .du-menu-item--group {
    padding: 9px 20px;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-headline-semibold-s-size, 13px);
    line-height: var(--du-typo-headline-semibold-s-line-height, 18px);
    letter-spacing: var(--du-typo-headline-semibold-s-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
  }

  .du-menu-item--group[data-readonly='true'] {
    cursor: default;
  }

  .du-menu-item__config--divider {
    padding-inline: 20px;
  }

  .du-menu-item__divider-line {
    height: 0.5px;
    background: var(--du-fill-p-3);
  }
`,Yp=_`
  :host {
    display: block;
    width: 100%;
  }

  ${jp}

  :host([variant='checkbox']) .du-menu-item__checkbox {
    pointer-events: none;
  }
`;var qp=Object.defineProperty,Xe=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&qp(e,t,s),s};const Xp=["item","group","divider"],Kp=["default","danger","checkbox"],Zp=["menuitem","option"],Da=class Da extends A{constructor(){super(...arguments),this.testId="",this.type="item",this.variant="default",this.value="",this.icon="",this.disabled=!1,this.checked=!1,this.selected=!1,this.itemRole="menuitem",this.passive=!1}get readOnly(){return this.readOnlySetting??this.type!=="item"}set readOnly(e){this.readOnlySetting=e}get isInteractiveDisabled(){return this.isOwnDisabled}get isInteractiveReadonly(){return this.isOwnReadonly}get clickDetail(){var e;return{value:this.value,label:((e=this.textContent)==null?void 0:e.trim())??"",variant:this.variant,type:this.type,checked:this.checked,selected:this.selected}}focus(e){var t;(t=this.interactiveEl)==null||t.focus(e)}handleClick(e){if(this.type==="divider"||this.isInteractiveDisabled||this.isInteractiveReadonly){e.preventDefault(),e.stopPropagation();return}if(this.variant==="checkbox"){const t=!this.checked;this.passive||(this.checked=t),this.emit("change",{...this.clickDetail,checked:t}),this.emit("update:checked",t)}e.stopPropagation(),this.emit("click",this.clickDetail)}handleKeydown(e){this.type==="divider"||this.isInteractiveDisabled||this.isInteractiveReadonly||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.handleClick(e))}renderLeading(){return this.variant==="checkbox"?u`
        <du-checkbox
          class="du-menu-item__checkbox"
          part="checkbox"
          .checked=${this.checked}
          .disabled=${!1}
          tabindex="-1"
          aria-hidden="true"
        ></du-checkbox>
      `:this.icon?u`
        <du-icon
          class="du-menu-item__icon"
          part="icon"
          name=${this.icon}
          size="16"
          decorative
        ></du-icon>
      `:b}renderTrailing(){return this.variant!=="default"||!this.selected?b:u`
      <span class="du-menu-item__selected" part="selected-icon" aria-hidden="true">
        <du-icon name="icon-check_linear" size="16" decorative></du-icon>
      </span>
    `}render(){if(this.type==="divider")return u`
        <div
          class="du-menu-item__config du-menu-item__config--divider"
          part="divider"
          data-readonly=${this.isInteractiveReadonly?"true":"false"}
        >
          <div class="du-menu-item__divider-line" role="separator"></div>
        </div>
      `;if(this.type==="group"){const a=this.isInteractiveDisabled,l=this.isInteractiveReadonly;return u`
        <div class="du-menu-item__config du-menu-item__config--group" part="group">
          <div
            class="du-menu-item__surface du-menu-item--group ${l?"":"du-menu-item--interactive"}"
            role=${l?"presentation":"menuitem"}
            tabindex=${l||a?b:"0"}
            aria-disabled=${a?"true":"false"}
            aria-readonly=${l?"true":"false"}
            data-disabled=${a?"true":"false"}
            data-readonly=${l?"true":"false"}
            @click=${this.handleClick}
            @keydown=${this.handleKeydown}
          >
            <span class="du-menu-item__label" part="label">
              <slot></slot>
            </span>
          </div>
        </div>
      `}const e=this.isInteractiveDisabled,t=this.isInteractiveReadonly,i=this.variant==="checkbox"?this.checked:this.selected,s=this.variant==="checkbox"||!!this.icon,o=["du-menu-item__surface",s?"du-menu-item__surface--leading":"du-menu-item__surface--text",this.variant==="default"&&this.selected?"du-menu-item__surface--selected":"","du-menu-item--interactive",this.variant==="danger"?"du-menu-item--danger":"",this.variant==="checkbox"?"du-menu-item--checkbox":""].filter(Boolean).join(" ");return u`
      <div
        class="du-menu-item__config ${s?"du-menu-item__config--leading":""}"
        part="config"
      >
        <div
          class=${o}
          part="item"
          data-testid=${ae(this.testId)}
          role=${this.itemRole==="option"?"option":this.variant==="checkbox"?"menuitemcheckbox":this.selected?"menuitemradio":"menuitem"}
          tabindex=${e?"-1":"0"}
          aria-disabled=${e?"true":"false"}
          aria-readonly=${t?"true":"false"}
          aria-selected=${this.itemRole==="option"?String(i):b}
          aria-checked=${this.itemRole==="menuitem"?this.variant==="checkbox"?String(this.checked):this.selected?"true":b:b}
          data-disabled=${e?"true":"false"}
          data-readonly=${t?"true":"false"}
          @click=${this.handleClick}
          @keydown=${this.handleKeydown}
        >
          ${this.renderLeading()}
          <span class="du-menu-item__label" part="label">
            <slot></slot>
          </span>
          ${this.renderTrailing()}
        </div>
      </div>
    `}};Da.styles=Yp;let ge=Da;Xe([y("",{attribute:"test-id",reflect:!1})],ge.prototype,"testId"),Xe([q(".du-menu-item--interactive")],ge.prototype,"interactiveEl"),Xe([Jr({attribute:"readonly"})],ge.prototype,"readOnlySetting"),Xe([$(Xp,"item")],ge.prototype,"type"),Xe([$(Kp,"default")],ge.prototype,"variant"),Xe([y()],ge.prototype,"value"),Xe([y()],ge.prototype,"icon"),Xe([m()],ge.prototype,"disabled"),Xe([m()],ge.prototype,"checked"),Xe([m()],ge.prototype,"selected"),Xe([$(Zp,"menuitem",{attribute:"item-role"})],ge.prototype,"itemRole"),Xe([m()],ge.prototype,"passive");function Wo(){oe(),Eo(),k("du-menu-item",ge)}function Ys(){Er(),Wo(),k("du-menu",B)}function Jl(){oe(),xe(),Ys(),k("du-select",V)}const Jp=_`
  :host {
    display: inline-flex;
    position: relative;
    max-width: 100%;
    vertical-align: middle;
    ${te}
  }

  ${z(X("open"))} {
    z-index: var(--du-layer-z-index, 1200);
  }

  .du-text-selector {
    position: relative;
    min-width: 0;
  }

  .du-text-selector__trigger {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    min-height: 28px;
    color: var(--du-on-l-c2);
    font: inherit;
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    border-radius: 40px;
    cursor: pointer;
  }

  .du-text-selector__trigger--multiple {
    gap: 8px;
  }

  .du-text-selector__trigger[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: var(--du-disabled-opacity, 0.3);
  }

  .du-text-selector__trigger[aria-readonly='true']:not([aria-disabled='true']) {
    cursor: default;
  }

  .du-text-selector__trigger[aria-disabled='true'] > * {
    --du-disabled-opacity: 1;
  }

  .du-text-selector__trigger:focus-visible {
    outline: none;
  }

  .du-text-selector__placeholder {
    color: var(--du-on-l-c6);
    white-space: nowrap;
  }

  .du-text-selector__value {
    overflow: hidden;
    max-width: 240px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-text-selector__chip,
  .du-text-selector__overflow {
    box-sizing: border-box;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    height: 28px;
    padding: 4px 8px;
    color: var(--du-on-l-c2);
    background: var(--du-fill-p1);
    border-radius: 36px;
  }

  .du-text-selector__chip {
    gap: 4px;
    max-width: 240px;
  }

  .du-text-selector__chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-text-selector__remove {
    display: inline-flex;
    flex: 0 0 16px;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    color: var(--du-on-l-c4);
    background: transparent;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
  }

  .du-text-selector__remove:focus-visible {
    outline: none;
  }

  .du-text-selector__arrow {
    flex: 0 0 auto;
    color: var(--du-on-l-c2);
  }

  .du-text-selector__menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: var(--du-layer-z-index, 1200);
    width: max-content;
    min-width: 168px;
    max-width: 320px;
  }

  .du-text-selector__menu[data-du-overlay-layer] {
    position: fixed;
    inset: auto;
    width: max-content;
    min-width: 168px;
  }

`;var Qp=Object.defineProperty,Ct=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&Qp(e,t,s),s};const Ql={fromAttribute(r){if(!r)return"";if(r.trim().startsWith("["))try{const e=JSON.parse(r);if(Array.isArray(e))return e.map(String)}catch{return""}return r},toAttribute(r){return Array.isArray(r)?JSON.stringify(r):r}},Ia=class Ia extends ye{constructor(){super(...arguments),this.testId="",this.value="",this.multiple=!1,this.open=!1,this.disabled=!1,this.placeholder="请选择",this.maxVisible=8,this.passive=!1,this.options=[],this.initialValue=""}connectedCallback(){super.connectedCallback(),this.initialValue=this.cloneValue(this.value),this.refreshOptions(),this.optionsObserver=is(this,()=>this.refreshOptions(),{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["test-id","value","data-value","disabled","type","slot"]})}firstUpdated(){super.firstUpdated(),this.refreshOptions()}disconnectedCallback(){var e;(e=this.optionsObserver)==null||e.disconnect(),this.optionsObserver=void 0,this.releaseMenuOverlay(),this.unbindOutsidePointer(),K(this).clearOnDisconnect(),super.disconnectedCallback()}getFormValue(){return this.multiple?JSON.stringify(this.selectedValues):this.selectedValues[0]??""}resetFormControl(){this.value=this.cloneValue(this.initialValue),this.open=!1}restoreFormState(e){typeof e=="string"&&(this.value=this.multiple?Ql.fromAttribute(e):e)}updated(e){(e.has("value")||e.has("multiple"))&&this.setFormValue(this.getFormValue()),e.has("open")&&(this.open?(this.bindOutsidePointer(),this.syncMenuOverlay(),this.updateComplete.then(()=>this.syncMenuOverlay())):this.unbindOutsidePointer()),(e.has("readOnly")||e.has("disabled"))&&this.isValueLocked&&this.open&&this.closeMenu(!1)}cloneValue(e){return Array.isArray(e)?[...e]:e}get isInteractiveDisabled(){return this.isEffectivelyDisabled}get selectedValues(){const e=Array.isArray(this.value)?this.value:this.value?[this.value]:[];return Array.from(new Set(e))}get selectedOptions(){const e=new Set(this.selectedValues);return this.options.filter(t=>e.has(t.value))}get accessibleLabel(){const e=this.selectedOptions.map(t=>t.label);return e.length?e.join("、"):this.placeholder}refreshOptions(){this.options=Array.from(this.querySelectorAll('[slot="option"]')).filter(e=>e.closest("du-text-selector")===this).map(e=>{var t,i;return{testId:e.getAttribute("test-id")??"",value:e.getAttribute("value")??e.getAttribute("data-value")??((t=e.textContent)==null?void 0:t.trim())??"",label:((i=e.textContent)==null?void 0:i.trim())??"",disabled:e.hasAttribute("disabled")}})}syncMenuOverlay(){const e=this.renderRoot.querySelector("du-menu")??this.menuEl,t=this.renderRoot.querySelector(".du-text-selector__trigger");e&&(this.menuEl=e),e==null||e.syncOverlayPosition(t)}releaseMenuOverlay(){const e=this.renderRoot.querySelector("du-menu")??this.menuEl;e==null||e.releaseOverlay(),this.menuEl=void 0}bindOutsidePointer(){this.outsidePointerHandler||(this.outsidePointerHandler=e=>{const t=e.composedPath();t.includes(this)||t.some(i=>i instanceof HTMLElement&&i.localName==="du-menu"&&i.classList.contains("du-text-selector__menu"))||this.closeMenu(!1)},window.addEventListener("pointerdown",this.outsidePointerHandler,!0))}unbindOutsidePointer(){this.outsidePointerHandler&&(window.removeEventListener("pointerdown",this.outsidePointerHandler,!0),this.outsidePointerHandler=void 0)}openMenu(){if(this.isValueLocked||this.open)return;const e=K(this),t=()=>this.closeMenu(!1);if(!e.requestOpen("text-selector",t))return;this.refreshOptions();const i=!0;this.passive||(this.open=i),this.emit("open-change",{open:i,value:this.cloneValue(this.value)}),this.emit("update:open",i),e.notify("open","text-selector",t),e.notify("appear","text-selector",t)}async openMenuAndFocus(e="selected"){this.openMenu(),await this.updateComplete;const t=this.options.filter(s=>!s.disabled),i=e==="first"?t[0]:e==="last"?t[t.length-1]:t.find(s=>this.selectedValues.includes(s.value))??t[0];this.focusOption(i==null?void 0:i.value)}closeMenu(e=!0){var i;if(!this.open)return;this.releaseMenuOverlay();const t=!1;this.passive||(this.open=t),this.emit("open-change",{open:t,value:this.cloneValue(this.value)}),this.emit("update:open",t),K(this).notify("close","text-selector"),e&&((i=this.renderRoot.querySelector(".du-text-selector__trigger"))==null||i.focus())}toggleMenu(){this.open?this.closeMenu(!1):this.openMenu()}commitValue(e,t,i){const s=this.cloneValue(this.value);this.passive||(this.value=e,this.setFormValue(this.getFormValue()));const o={value:this.cloneValue(e),values:Array.isArray(e)?[...e]:e?[e]:[],previous:s,multiple:this.multiple,option:{value:t.value,label:t.label,selected:i}};this.emitValueChange("value",this.cloneValue(e),o)}selectOption(e,t){if(e.stopPropagation(),t.disabled||this.isValueLocked)return;const i=this.selectedValues,s=!i.includes(t.value),o=this.multiple?s?[...i,t.value]:i.filter(a=>a!==t.value):t.value;this.commitValue(o,t,this.multiple?s:!0),this.emit("option-click",{value:t.value,label:t.label,selected:this.multiple?s:!0}),this.multiple||this.closeMenu()}removeFirst(e){e.preventDefault(),e.stopPropagation();const t=this.selectedOptions[0];if(!t||this.isValueLocked)return;const i=this.selectedValues.filter(s=>s!==t.value);this.commitValue(i,t,!1)}handleTriggerKeydown(e){if(!this.isInteractiveDisabled){if(this.isOwnReadonly){e.key==="Escape"&&(e.preventDefault(),this.closeMenu());return}if(e.key===" "||e.key==="Enter"){e.preventDefault(),this.openMenu();return}if(e.key==="ArrowDown"){e.preventDefault(),this.openMenuAndFocus(this.open?"selected":"first");return}if(e.key==="ArrowUp"){e.preventDefault(),this.openMenuAndFocus(this.open?"selected":"last");return}e.key==="Escape"&&(e.preventDefault(),this.closeMenu())}}handleOptionKeydown(e,t){var o,a,l,h;if(e.key==="Escape"){e.preventDefault(),this.closeMenu();return}const i=this.options.filter(p=>!p.disabled),s=i.findIndex(p=>p.value===t.value);if(e.key==="ArrowDown"){e.preventDefault(),this.focusOption((o=i[s+1]??i[0])==null?void 0:o.value);return}if(e.key==="ArrowUp"){e.preventDefault(),this.focusOption((a=i[s-1]??i[i.length-1])==null?void 0:a.value);return}if(e.key==="Home"){e.preventDefault(),this.focusOption((l=i[0])==null?void 0:l.value);return}e.key==="End"&&(e.preventDefault(),this.focusOption((h=i[i.length-1])==null?void 0:h.value))}focusOption(e){var t;e&&((t=this.renderRoot.querySelector(`du-menu-item[data-value="${CSS.escape(e)}"]`))==null||t.focus())}renderValue(){const e=this.selectedOptions;return e.length?this.multiple?u`
      <span class="du-text-selector__chip" part="chip">
        <span
          class="du-text-selector__chip-label"
          part="chip-label"
          .textContent=${e[0].label}
        ></span>
        <button
          class="du-text-selector__remove"
          part="remove"
          type="button"
          aria-label=${`移除 ${e[0].label}`}
          ?hidden=${this.isOwnReadonly}
          @click=${this.removeFirst}
        >
          <du-icon name="icon-close_circle_surface" size="16" decorative></du-icon>
        </button>
      </span>
      ${e.length>1?u`
            <span
              class="du-text-selector__overflow"
              part="overflow-count"
              .textContent=${`+${e.length-1}`}
            ></span>
          `:b}
    `:u`<span
        class="du-text-selector__value"
        part="value"
        .textContent=${e[0].label}
      ></span>`:u`<span
        class="du-text-selector__placeholder"
        .textContent=${this.placeholder}
      ></span>`}render(){const e=this.isInteractiveDisabled,t=this.isOwnReadonly,i=new Set(this.selectedValues);return u`
      <div class="du-text-selector" part="root">
        <div
          class="du-text-selector__trigger ${this.multiple?"du-text-selector__trigger--multiple":""}"
          part="trigger"
          data-testid=${ae(this.testId)}
          role="combobox"
          tabindex=${e?"-1":"0"}
          aria-disabled=${e?"true":"false"}
          aria-readonly=${t?"true":"false"}
          aria-expanded=${this.open?"true":"false"}
          aria-haspopup="listbox"
          aria-label=${this.accessibleLabel}
          @click=${this.toggleMenu}
          @keydown=${this.handleTriggerKeydown}
        >
          ${this.renderValue()}
          <du-icon
            class="du-text-selector__arrow"
            part="arrow"
            name=${this.open?"icon-arrow_up_linear":"icon-arrow_down_linear"}
            size="12"
            decorative
          ></du-icon>
        </div>

        <slot name="option" hidden @slotchange=${this.refreshOptions}></slot>

        ${this.open?u`
              <du-menu
                class="du-text-selector__menu"
                part="menu"
                exportparts="empty:empty"
                overlay
                .renderAt=${this.renderAt}
                list-role="listbox"
                .multiSelectable=${this.multiple}
                .maxVisible=${this.maxVisible}
                @open-change=${s=>s.stopPropagation()}
                @update:open=${s=>s.stopPropagation()}
              >
                ${this.options.map(s=>u`
                    <du-menu-item
                      data-value=${s.value}
                      .testId=${s.testId??""}
                      .value=${s.value}
                      item-role="option"
                      .disabled=${s.disabled}
                      .variant=${this.multiple?"checkbox":"default"}
                      .checked=${i.has(s.value)}
                      .selected=${!this.multiple&&i.has(s.value)}
                      exportparts="item:option,label:option-label,selected-icon:option-selected-icon"
                      @change=${o=>o.stopPropagation()}
                      @click=${o=>this.selectOption(o,s)}
                      @keydown=${o=>this.handleOptionKeydown(o,s)}
                    >
                      ${s.label}
                    </du-menu-item>
                  `)}
                <slot name="empty" slot="empty">暂无内容</slot>
              </du-menu>
            `:b}
      </div>
    `}};Ia.styles=Jp;let Oe=Ia;Ct([y("",{attribute:"test-id",reflect:!1})],Oe.prototype,"testId"),Ct([C({reflect:!0,converter:Ql})],Oe.prototype,"value"),Ct([m()],Oe.prototype,"multiple"),Ct([m()],Oe.prototype,"open"),Ct([zt(Lt,{attribute:"render-at"})],Oe.prototype,"renderAt"),Ct([m()],Oe.prototype,"disabled"),Ct([y("请选择")],Oe.prototype,"placeholder"),Ct([T(8,{attribute:"max-visible"})],Oe.prototype,"maxVisible"),Ct([m()],Oe.prototype,"passive"),Ct([S()],Oe.prototype,"options");function ed(){oe(),Ys(),k("du-text-selector",Oe)}const ef=_`
  :host {
    display: block;
    box-sizing: border-box;
    transition: transform 0.25s ease;
  }

  :host(:not([type='container'])) {
    min-width: 324px;
    max-width: 440px;
    height: 400px;
    flex-shrink: 0;
  }

  :host(.has-hover-scale:not(.has-external-interaction):not([bg-mode='immersive']):hover),
  :host(.has-hover-scale[type='container']:not(.has-external-interaction):hover) {
    z-index: 1;
    transform: scale(1.02);
  }

  :host(.has-external-interaction.is-interaction-active) {
    z-index: 1;
  }

  :host(:not([type='container'])[bg-mode='immersive']) {
    min-width: 0;
    width: 162px;
    height: 175px;
    transition: width 0.25s ease, height 0.25s ease;
  }

  :host(
      .has-hover-scale:not([type='container']):not(.has-external-interaction)[bg-mode='immersive']:hover
    ),
  :host(.has-hover-scale:not([type='container'])[forced-hover][bg-mode='immersive']),
  :host(
      .has-hover-scale:not([type='container']).has-external-interaction.is-interaction-active[bg-mode='immersive']
    ) {
    z-index: 1;
    width: 200px;
    height: 216px;
  }

  .du-device-card {
    --du-device-card-radius: var(--du-radius-round-corner-l, 16px);
    --du-device-card-fill: var(--du-gradient-fill-tile);
    --du-device-card-stroke: var(--du-gradient-stroke-home-card);
    --du-device-card-hover-fill: var(--du-gradient-fill-immersive-hover);
    --du-device-card-hover-stroke: var(--du-gradient-stroke-home-immersive-hover);
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    color: var(--du-on-l-c2);
    border-radius: var(--du-device-card-radius);
    background: var(--du-device-card-fill);
    box-shadow: var(--du-device-card-shadow-x, 0px) var(--du-device-card-shadow-y, 4px) 12px
      color-mix(in srgb, var(--du-fill-p11) 16%, transparent);
    backdrop-filter: blur(var(--du-texture-card-backdrop-blur));
    -webkit-backdrop-filter: blur(var(--du-texture-card-backdrop-blur));
    transform: var(
      --du-device-card-transform,
      perspective(900px) rotateX(var(--du-device-card-rotate-x, 0deg))
        rotateY(var(--du-device-card-rotate-y, 0deg)) translateZ(0)
        scale(var(--du-device-card-scale, 1))
    );
    transform-style: preserve-3d;
    transition:
      box-shadow 280ms ease,
      transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform, box-shadow;
  }

  .du-device-card.is-pointer-active {
    transition:
      box-shadow 100ms linear,
      transform 100ms linear;
  }

  :host([bg-mode='immersive']) .du-device-card,
  :host([bg-mode='explicit-bg']) .du-device-card {
    --du-device-card-fill: var(--du-gradient-fill-wallpaper);
  }

  .du-device-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 1px;
    background: var(--du-device-card-stroke);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  :host([bg-mode='immersive']) .du-device-card::before {
    transition: background 0.25s ease;
  }

  :host([bg-mode='immersive']) .du-device-card::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: var(--du-device-card-hover-fill);
    mix-blend-mode: luminosity;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  :host([bg-mode='immersive']) .du-device-card:hover::after,
  :host([forced-hover][bg-mode='immersive']) .du-device-card::after,
  :host(.has-external-interaction.is-interaction-active[bg-mode='immersive'])
    .du-device-card::after {
    opacity: 1;
  }

  :host([bg-mode='immersive']) .du-device-card:hover::before,
  :host([forced-hover][bg-mode='immersive']) .du-device-card::before,
  :host(.has-external-interaction.is-interaction-active[bg-mode='immersive'])
    .du-device-card::before {
    background: var(--du-device-card-hover-stroke);
  }

  .du-device-card__content {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (hover: none), (pointer: coarse) {
    :host,
    :host([bg-mode='immersive']) {
      transition: none;
    }

    :host(:not([bg-mode='immersive']):hover),
    :host(.has-external-interaction.is-interaction-active:not([bg-mode='immersive']))
      .du-device-card {
      transform: none;
    }

    :host(:not([type='container'])[bg-mode='immersive']:hover),
    :host(
        :not([type='container']).has-external-interaction.is-interaction-active[bg-mode='immersive']
      ) {
      width: 162px;
      height: 175px;
    }

    .du-device-card {
      transform: none;
      transition: none;
      will-change: auto;
    }
  }
`;var tf=Object.defineProperty,St=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&tf(e,t,s),s};const rf=["follow-theme","immersive","explicit-bg"],sf=["card","container"],td=["--du-device-card-rotate-x","--du-device-card-rotate-y","--du-device-card-shadow-x","--du-device-card-shadow-y","--du-device-card-scale","--du-device-card-transform","--du-device-card-transform-transition"],Ma=class Ma extends A{constructor(){super(...arguments),this.pointerEffectsEnabled=!1,this.pointerInside=!1,this.interactionTargetElement=null,this.externalStyleSnapshot=new Map,this.bgMode="follow-theme",this.type="card",this.forcedHover=!1,this.glowEffectZIndex=5,this.delegate=!1,this.getGlowEventTarget=()=>this.interactionTargetElement??this.cardElement,this.updatePointerPosition=()=>{this.animationFrame=void 0;const e=this.cardElement,t=this.pendingPointer;if(!e||!t||!this.showHoverRotate)return;const i=e.getBoundingClientRect();if(i.width===0||i.height===0)return;const s={x:Math.min(Math.max((t.clientX-i.left)/i.width,0),1),y:Math.min(Math.max((t.clientY-i.top)/i.height,0),1)},o=(.5-s.y)*4,a=(s.x-.5)*4,l=this.interactionTargetElement??e;l.style.setProperty("--du-device-card-rotate-x",`${o}deg`),l.style.setProperty("--du-device-card-rotate-y",`${a}deg`),l.style.setProperty("--du-device-card-shadow-x",`${a*-.8}px`),l.style.setProperty("--du-device-card-shadow-y",`${4-o*.8}px`)},this.handlePointerEnter=e=>{var t;e.pointerType!=="touch"&&(this.pointerEffectsEnabled=this.supportsPointerEffects(e),this.pointerInside=!0,this.syncHoverAppearance(),this.interactionTargetElement!==this.cardElement&&this.pointerEffectsEnabled&&((t=this.interactionTargetElement)==null||t.style.setProperty("--du-device-card-scale",this.showHoverScale&&!this.usesImmersiveCardSizing?"1.02":"1")),this.handlePointerMove(e))},this.handlePointerMove=e=>{var i;const t=this.cardElement;!t||!this.showHoverRotate||!this.supportsPointerEffects(e)||(this.pendingPointer={clientX:e.clientX,clientY:e.clientY},t.classList.add("is-pointer-active"),(i=this.interactionTargetElement)==null||i.style.setProperty("--du-device-card-transform-transition","transform 100ms linear"),this.animationFrame===void 0&&(this.animationFrame=window.requestAnimationFrame(this.updatePointerPosition)))},this.resetPointerEffects=()=>{this.animationFrame!==void 0&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=void 0),this.pendingPointer=void 0,this.pointerEffectsEnabled=!1;const e=this.cardElement;if(!e)return;this.pointerInside=!1,this.syncHoverAppearance(),e.classList.remove("is-pointer-active");const t=this.interactionTargetElement??e;t.style.setProperty("--du-device-card-rotate-x","0deg"),t.style.setProperty("--du-device-card-rotate-y","0deg"),t.style.setProperty("--du-device-card-shadow-x","0px"),t.style.setProperty("--du-device-card-shadow-y","4px"),this.interactionTargetElement!==e&&(t.style.setProperty("--du-device-card-scale","1"),t.style.setProperty("--du-device-card-transform-transition","transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1)"))}}syncHoverAppearance(){this.classList.toggle("is-interaction-active",this.pointerInside||this.forcedHover),this.classList.toggle("has-hover-scale",this.showHoverScale)}get showHoverGlow(){return this.hoverGlow!==void 0?this.hoverGlow:this.type==="container"?!1:this.bgMode!=="immersive"}get showHoverRotate(){return this.hoverRotate!==void 0?this.hoverRotate:this.type==="container"?!1:this.bgMode!=="immersive"}get showHoverScale(){return this.hoverScale??this.type==="card"}get usesImmersiveCardSizing(){return this.type==="card"&&this.bgMode==="immersive"}get cardElement(){return this.renderRoot.querySelector(".du-device-card")}resolveInteractionTargetElement(){const e=this.cardElement,t=this.interactionTarget;if(!t)return e;if(t==="parent")return this.parentElement;if(typeof t=="function")try{return t()??e}catch{return e}if(t instanceof HTMLElement)return t;const i=t.trim();return i?So(this.parentElement,i)??e:e}publishExternalStyles(e){this.externalStyleSnapshot.clear();for(const t of td)this.externalStyleSnapshot.set(t,e.style.getPropertyValue(t));e.style.setProperty("--du-device-card-rotate-x","0deg"),e.style.setProperty("--du-device-card-rotate-y","0deg"),e.style.setProperty("--du-device-card-shadow-x","0px"),e.style.setProperty("--du-device-card-shadow-y","4px"),e.style.setProperty("--du-device-card-scale","1"),e.style.setProperty("--du-device-card-transform","perspective(900px) rotateX(var(--du-device-card-rotate-x)) rotateY(var(--du-device-card-rotate-y)) translateZ(0) scale(var(--du-device-card-scale))"),e.style.setProperty("--du-device-card-transform-transition","transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1)")}restoreExternalStyles(e){for(const t of td){const i=this.externalStyleSnapshot.get(t);i?e.style.setProperty(t,i):e.style.removeProperty(t)}this.externalStyleSnapshot.clear()}bindInteractionTarget(e){this.interactionTargetElement=e,e.addEventListener("pointerenter",this.handlePointerEnter),e.addEventListener("pointermove",this.handlePointerMove),e.addEventListener("pointerleave",this.resetPointerEffects),e.addEventListener("pointercancel",this.resetPointerEffects);const t=e!==this.cardElement;this.classList.toggle("has-external-interaction",t),t&&this.publishExternalStyles(e)}unbindInteractionTarget(){const e=this.interactionTargetElement;e&&(e.removeEventListener("pointerenter",this.handlePointerEnter),e.removeEventListener("pointermove",this.handlePointerMove),e.removeEventListener("pointerleave",this.resetPointerEffects),e.removeEventListener("pointercancel",this.resetPointerEffects),e!==this.cardElement&&this.restoreExternalStyles(e),this.interactionTargetElement=null,this.classList.remove("has-external-interaction","is-interaction-active"))}syncInteractionTarget(){const e=this.resolveInteractionTargetElement();e!==this.interactionTargetElement&&(this.resetPointerEffects(),this.unbindInteractionTarget(),e&&this.bindInteractionTarget(e))}supportsPointerEffects(e){return e.pointerType==="touch"?!1:typeof window.matchMedia!="function"||window.matchMedia("(hover: hover) and (pointer: fine)").matches}updated(e){var t;this.syncInteractionTarget(),this.syncHoverAppearance(),(e.has("bgMode")||e.has("type")||e.has("hoverScale"))&&this.classList.contains("is-interaction-active")&&this.interactionTargetElement!==this.cardElement&&((t=this.interactionTargetElement)==null||t.style.setProperty("--du-device-card-scale",this.pointerEffectsEnabled&&this.showHoverScale&&!this.usesImmersiveCardSizing?"1.02":"1"))}disconnectedCallback(){this.pointerInside=!1,this.animationFrame!==void 0&&(window.cancelAnimationFrame(this.animationFrame),this.animationFrame=void 0),this.pendingPointer=void 0,this.pointerEffectsEnabled=!1,this.unbindInteractionTarget(),super.disconnectedCallback()}render(){return u`
      <div
        part="root"
        class="du-device-card"
      >
        ${this.showHoverGlow?u`<du-glow-effect
              part="glow"
              mode="device-card"
              ?delegate=${this.delegate}
              disable-event
              .portalTarget=${this.glowEffectPortalTarget}
              .zIndex=${this.glowEffectZIndex}
              .eventTarget=${this.getGlowEventTarget}
              .clipShapeFollower=${()=>this.cardElement}
            ></du-glow-effect>`:b}
        <div part="content" class="du-device-card__content">
          <slot></slot>
        </div>
      </div>
    `}};Ma.styles=ef;let De=Ma;St([$(rf,"follow-theme",{attribute:"bg-mode"})],De.prototype,"bgMode"),St([$(sf,"card")],De.prototype,"type"),St([m(!1,{attribute:"forced-hover",reflect:!0})],De.prototype,"forcedHover"),St([Jr({attribute:"hover-glow"})],De.prototype,"hoverGlow"),St([T(5,{attribute:"glow-effect-z-index",integer:!0})],De.prototype,"glowEffectZIndex"),St([C({attribute:"glow-effect-portal-target",converter:{fromAttribute:r=>r??void 0}})],De.prototype,"glowEffectPortalTarget"),St([m()],De.prototype,"delegate"),St([Jr({attribute:"hover-rotate"})],De.prototype,"hoverRotate"),St([Jr({attribute:"hover-scale"})],De.prototype,"hoverScale"),St([C({attribute:"interaction-target",converter:{fromAttribute:r=>r&&r.trim()?r.trim():void 0,toAttribute:r=>typeof r=="string"&&r?r:null}})],De.prototype,"interactionTarget");function id(){as(),k("du-device-card",De)}const of=_`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .du-performance-card {
    --du-performance-card-radius: var(--du-radius-round-corner-l, 16px);
    --du-performance-card-bg: var(--du-fill-p6);
    --du-performance-card-shadow: var(--du-shadow-l2);
    --du-performance-card-stroke: var(--du-gradient-stroke-dialog-card);
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-width: 0;
    min-height: 0;
    padding: 24px;
    overflow: hidden;
    color: var(--du-on-l-c2);
    background: var(--du-performance-card-bg);
    border-radius: var(--du-performance-card-radius);
    box-shadow: var(--du-performance-card-shadow);
  }

  .du-performance-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 1px;
    background: var(--du-performance-card-stroke);
    pointer-events: none;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }

  .du-performance-card > * {
    position: relative;
    z-index: 2;
  }

  .du-performance-card__title {
    margin: 0;
    min-width: 0;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-headline-semibold-l-size, 16px);
    line-height: var(--du-typo-headline-semibold-l-line-height, 22px);
    letter-spacing: var(--du-typo-headline-semibold-l-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
  }

  .du-performance-card__title:not([data-has-title]) {
    display: none;
  }

  .du-performance-card__list {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    min-height: 0;
    width: 100%;
  }

  .du-performance-card__list:not([data-has-list]) {
    display: none;
  }
`;var af=Object.defineProperty,jo=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&af(e,t,s),s};const za=class za extends hi{constructor(){super(...arguments),this.hasNamedList=!1,this.hasDefaultList=!1}get resolvedTitle(){return this.resolveComponentTitle(this.cardTitle)}get hasTitle(){return!!this.resolvedTitle.trim()}get hasList(){return this.hasNamedList||this.hasDefaultList}onNamedListSlotChange(e){const t=e.target;this.hasNamedList=rd(t)}onDefaultListSlotChange(e){const t=e.target;this.hasDefaultList=rd(t)}render(){return u`
      <div class="du-performance-card" part="card">
        <p class="du-performance-card__title" part="title" ?data-has-title=${this.hasTitle}>
          ${this.resolvedTitle}
        </p>
        <div class="du-performance-card__list" part="list" ?data-has-list=${this.hasList}>
          <slot name="list-content" @slotchange=${this.onNamedListSlotChange}></slot>
          <slot @slotchange=${this.onDefaultListSlotChange}></slot>
        </div>
      </div>
    `}};za.styles=of;let er=za;jo([st({attribute:"card-title"})],er.prototype,"cardTitle"),jo([S()],er.prototype,"hasNamedList"),jo([S()],er.prototype,"hasDefaultList");function rd(r){return r.assignedNodes({flatten:!0}).some(e=>{var t;return e.nodeType===Node.TEXT_NODE?!!((t=e.textContent)!=null&&t.trim()):e.nodeType===Node.ELEMENT_NODE})}const nf=_`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .du-performance-card-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 0;
  }

  .du-performance-card-item__layout {
    width: 100%;
    min-width: 0;
  }

  .du-performance-card-item__layout::part(start) {
    align-self: flex-start;
    align-items: flex-start;
  }

  .du-performance-card-item__layout::part(end) {
    align-self: center;
    align-items: center;
  }

  .du-performance-card-item__icon {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    color: var(--du-on-l-c2);
    background: var(--du-fill-p1);
    border-radius: var(--du-radius-round-corner-xs, 4px);
  }

  .du-performance-card-item__main {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    width: 100%;
  }

  .du-performance-card-item__heading {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .du-performance-card-item__title {
    margin: 0;
    min-width: 0;
    color: var(--du-on-l-c2);
    font-size: var(--du-typo-headline-semibold-m-size, 14px);
    line-height: var(--du-typo-headline-semibold-m-line-height, 20px);
    letter-spacing: var(--du-typo-headline-semibold-m-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
  }

  .du-performance-card-item__title[hidden] {
    display: none;
  }

  .du-performance-card-item__help {
    display: inline-flex;
    flex: 0 0 auto;
    color: var(--du-on-l-c2);
  }

  .du-performance-card-item__help-icon {
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-performance-card-item__help:hover .du-performance-card-item__help-icon {
    color: var(--du-accent-blue);
  }

  .du-performance-card-item__description {
    margin: 0;
    min-width: 0;
    color: var(--du-on-l-c4);
    font-size: var(--du-typo-body-regular-s-size, 13px);
    line-height: var(--du-typo-body-regular-s-line-height, 18px);
    letter-spacing: var(--du-typo-body-regular-s-letter-spacing, 0);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-performance-card-item__description:not([data-has-description]) {
    display: none;
  }

  .du-performance-card-item__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  .du-performance-card-item__body[data-indent] {
    padding-inline-start: 36px;
  }

  .du-performance-card-item__body:not([data-has-content]) {
    display: none;
  }
`;var lf=Object.defineProperty,fi=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&lf(e,t,s),s};const Ra=class Ra extends hi{constructor(){super(...arguments),this.icon="",this.helpInfo="",this.description="",this.hasActions=!1,this.hasContent=!1,this.hasHelpSlot=!1,this.hasTitleSlot=!1}get resolvedTitle(){return this.resolveComponentTitle(this.itemTitle)}get hasIcon(){return!!this.icon.trim()}get hasTitle(){return this.hasTitleSlot||!!this.resolvedTitle.trim()}get hasHelp(){return this.hasHelpSlot||!!this.helpInfo.trim()}get hasDescription(){return!!this.description.trim()}onActionsSlotChange(e){const t=e.target;this.hasActions=qs(t)}onContentSlotChange(e){const t=e.target;this.hasContent=qs(t)}onHelpSlotChange(e){this.hasHelpSlot=qs(e.target)}onTitleSlotChange(e){this.hasTitleSlot=qs(e.target,!1)}renderHelpProbe(){return u`<slot name="help-info" hidden @slotchange=${this.onHelpSlotChange}></slot>`}renderHelp(){return this.hasHelp?this.hasHelpSlot?u`
        <du-coachmark
          class="du-performance-card-item__help"
          placement="top-center"
          trigger="hover"
          parent=""
        >
          <du-icon
            slot="reference"
            class="du-performance-card-item__help-icon"
            name="icon-tips_linear"
            size="16"
            decorative
          ></du-icon>
          <slot name="help-info" @slotchange=${this.onHelpSlotChange}></slot>
        </du-coachmark>
      `:u`
      <du-coachmark
        class="du-performance-card-item__help"
        placement="top-center"
        trigger="hover"
        content=${this.helpInfo}
      >
        <du-icon
          class="du-performance-card-item__help-icon"
          name="icon-tips_linear"
          size="16"
          decorative
        ></du-icon>
      </du-coachmark>
      ${this.renderHelpProbe()}
    `:this.renderHelpProbe()}render(){return u`
      <div class="du-performance-card-item" part="item">
        <du-layout class="du-performance-card-item__layout" width="100%" gap="12">
          ${this.hasIcon?u`
                <span slot="start" class="du-performance-card-item__icon" part="icon">
                  <du-icon name=${this.icon} size="16" decorative></du-icon>
                </span>
              `:b}
          <div class="du-performance-card-item__main" part="main">
            <div class="du-performance-card-item__heading">
              <p
                class="du-performance-card-item__title"
                part="title"
                ?hidden=${!this.hasTitle}
              >
                <slot name="title" @slotchange=${this.onTitleSlotChange}>${this.resolvedTitle}</slot>
              </p>
              ${this.renderHelp()}
            </div>
            <p
              class="du-performance-card-item__description"
              part="description"
              ?data-has-description=${this.hasDescription}
            >
              ${this.description}
            </p>
          </div>
          ${this.hasActions?u`
                <span slot="end">
                  <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
                </span>
              `:u`
                <slot name="actions" hidden @slotchange=${this.onActionsSlotChange}></slot>
              `}
        </du-layout>
        <div
          class="du-performance-card-item__body"
          part="body"
          ?data-has-content=${this.hasContent}
          ?data-indent=${this.hasIcon}
        >
          <slot @slotchange=${this.onContentSlotChange}></slot>
        </div>
      </div>
    `}};Ra.styles=nf;let Ke=Ra;fi([y()],Ke.prototype,"icon"),fi([st({attribute:"item-title"})],Ke.prototype,"itemTitle"),fi([y("",{attribute:"help-info"})],Ke.prototype,"helpInfo"),fi([y()],Ke.prototype,"description"),fi([S()],Ke.prototype,"hasActions"),fi([S()],Ke.prototype,"hasContent"),fi([S()],Ke.prototype,"hasHelpSlot"),fi([S()],Ke.prototype,"hasTitleSlot");function qs(r,e=!0){return r.assignedNodes({flatten:e}).some(t=>{var i;return t.nodeType===Node.TEXT_NODE?!!((i=t.textContent)!=null&&i.trim()):t.nodeType===Node.ELEMENT_NODE})}function sd(){xe(),oe(),Gi(),k("du-performance-card-item",Ke)}function od(){sd(),k("du-performance-card",er)}const df=_`
  :host {
    display: inline-flex;
    box-sizing: border-box;
    width: 272px;
    min-height: 90px;
    max-width: 100%;
    vertical-align: top;
  }

  .du-cloud-card__hint {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .du-cloud-card__hint::part(reference) {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: 0;
    max-width: none;
  }

  .du-cloud-card {
    --du-cloud-card-radius: var(--du-radius-round-corner-l, 16px);
    --du-cloud-card-fg: var(--du-on-l-c2);
    --du-cloud-card-chip-bg: var(--du-fill-p1);
    --du-cloud-card-chip-fg: var(--du-on-l-c2);
    --du-cloud-card-avatar-bg: var(--du-fill-p1);
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    min-height: 0;
    padding: 12px 16px;
    overflow: hidden;
    color: var(--du-cloud-card-fg);
    border-radius: var(--du-cloud-card-radius);
    /* Figma 1728:17960：无图默认表面使用 P1-Subtle。 */
    background-color: var(--du-fill-p1);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: background-color var(--du-duration-normal, 0.2s) ease;
  }

  .du-cloud-card::before {
    content: '';
    position: absolute;
    z-index: 0;
    inset: 0;
    background: var(--du-state-hover);
    border-radius: inherit;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--du-duration-normal, 0.2s) ease;
  }

  .du-cloud-card[data-has-bg]:hover::before {
    /* Figma 1728:22944：封面图上方叠加状态色/S1-Hover。 */
    opacity: 1;
  }

  .du-cloud-card[data-has-bg] {
    --du-on-d-c1: #ffffff;
    --du-on-d-c7: rgba(255, 255, 255, 0.15);
    --du-cloud-card-fg: var(--du-on-d-c1);
    --du-cloud-card-chip-bg: var(--du-on-d-c7);
    --du-cloud-card-chip-fg: var(--du-on-d-c1);
    --du-cloud-card-avatar-bg: var(--du-on-d-c7);
    background-color: var(--du-fill-p10);
  }

  .du-cloud-card[data-selected]:not([data-has-bg]) {
    background-color: var(--du-fill-p1);
  }

  .du-cloud-card:not([data-has-bg]):hover {
    /* Figma 1728:18412：无图（含选中态）悬浮切换为 S1-Hover。 */
    background-color: var(--du-state-hover);
  }

  .du-cloud-card::after {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 0;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: inherit;
    pointer-events: none;
    transition:
      border-color var(--du-duration-normal, 0.2s) ease,
      border-width var(--du-duration-normal, 0.2s) ease;
  }

  .du-cloud-card:not([data-has-bg]):hover::after,
  .du-cloud-card[data-selected]:not([data-has-bg])::after {
    border-color: var(--du-fill-p-3);
  }

  .du-cloud-card[data-selected][data-has-bg] {
    --du-on-d-c4: rgba(255, 255, 255, 0.54);
    isolation: isolate;
  }

  .du-cloud-card[data-selected][data-has-bg]::after {
    border: 2px solid var(--du-on-d-c4);
    mix-blend-mode: plus-lighter;
  }

  .du-cloud-card[data-has-description] {
    min-height: 180px;
  }

  .du-cloud-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    min-height: 0;
    width: 100%;
  }

  .du-cloud-card[data-has-description] .du-cloud-card__body,
  .du-cloud-card[data-has-description] .du-cloud-card__heading {
    gap: 4px;
  }

  .du-cloud-card__header,
  .du-cloud-card__footer {
    flex: 0 0 auto;
    width: 100%;
    min-width: 0;
  }

  .du-cloud-card__footer {
    height: 28px;
    margin-top: auto;
  }

  .du-cloud-card__footer[data-has-description] {
    height: auto;
    min-height: 28px;
  }

  .du-cloud-card__footer[data-has-description]::part(main),
  .du-cloud-card__footer[data-has-description]::part(end) {
    align-self: flex-end;
  }

  .du-cloud-card__heading {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .du-cloud-card__avatar {
    display: block;
    width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;
    background: var(--du-cloud-card-avatar-bg);
  }

  .du-cloud-card__avatar-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: var(--du-cloud-card-fg);
    background: var(--du-cloud-card-avatar-bg);
    border-radius: 50%;
  }

  .du-cloud-card__title {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    color: var(--du-cloud-card-fg);
    font-size: var(--du-typo-headline-semibold-s-size, 13px);
    line-height: var(--du-typo-headline-semibold-s-line-height, 18px);
    letter-spacing: var(--du-typo-headline-semibold-s-letter-spacing, 0);
    font-weight: var(--du-typo-semibold-weight, 600);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-cloud-card__subtitle,
  .du-cloud-card__description {
    margin: 0;
    min-width: 0;
    color: var(--du-cloud-card-fg);
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    font-weight: var(--du-typo-regular-weight, 400);
  }

  .du-cloud-card__subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .du-cloud-card__description {
    max-width: 146px;
  }

  .du-cloud-card__tags {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: nowrap;
    gap: 4px;
    min-width: 0;
    overflow: hidden;
  }

  .du-cloud-card__tags:not([data-has-tags]) {
    display: none;
  }

  .du-cloud-card__tag {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 8px;
    color: var(--du-cloud-card-chip-fg);
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    font-weight: var(--du-typo-regular-weight, 400);
    background: var(--du-cloud-card-chip-bg);
    border-radius: 36px;
    white-space: nowrap;
  }

  .du-cloud-card__stats {
    display: inline-flex;
    align-items: center;
    gap: 16px;
  }

  .du-cloud-card__stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    color: var(--du-cloud-card-fg);
    font: inherit;
    font-size: var(--du-typo-body-regular-xs-size, 12px);
    line-height: var(--du-typo-body-regular-xs-line-height, 16px);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .du-cloud-card__stat-hint {
    flex: 0 0 auto;
  }

  .du-cloud-card__stat:focus-visible {
    outline: none;
  }

  .du-cloud-card__stat:hover:not(:active) {
    opacity: 0.8;
  }

  .du-cloud-card__stat:active {
    opacity: 0.64;
  }
`;var hf=Object.defineProperty,be=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&hf(e,t,s),s};const uf={fromAttribute(r){if(r!=null&&r.trim())return r.split(",").map(e=>e.trim()).filter(Boolean)},toAttribute(r){return r!=null&&r.length?r.join(","):null}},ad={fromAttribute(r){if(r===null||r.trim()==="")return;const e=Number(r);return Number.isFinite(e)?e:void 0},toAttribute(r){return r===void 0?null:String(r)}},La=class La extends hi{constructor(){super(...arguments),this.icon="",this.subtitle="",this.description="",this.bg="",this.selected=!1,this.helpInfo="",this.likeHelpInfo="",this.collectHelpInfo="",this.deleteHelperInfo="",this.hasMark=!1,this.hasActions=!1,this.hasHelpSlot=!1,this.onCollect=e=>{e.stopPropagation(),this.emit("collect",{collectNum:this.collectNum??0})},this.onLike=e=>{e.stopPropagation(),this.emit("like",{likeNum:this.likeNum??0})},this.onDelete=e=>{e.stopPropagation(),this.emit("delete",{})}}get resolvedTitle(){return this.resolveComponentTitle(this.cardTitle)}get hasHelp(){return this.hasHelpSlot||!!this.helpInfo.trim()}get hasTags(){var e;return!!((e=this.tags)!=null&&e.length)}get hasSubtitle(){var e;return!!((e=this.subtitle)!=null&&e.trim())}get hasDescription(){var e;return!!((e=this.description)!=null&&e.trim())}get hasBg(){return!!this.bg.trim()}get hasLike(){return this.likeNum!==void 0}get hasCollect(){return this.collectNum!==void 0}statIcon(e,t,i){return e?i:t}get collectIcon(){return this.statIcon(this.collectNum,"icon-bookmark_linear","icon-bookmark_surface")}get likeIcon(){return this.statIcon(this.likeNum,"icon-like2_linear","icon-like2_surface")}get backgroundStyle(){const e=this.bg.trim();return e?/^(url\(|linear-gradient|radial-gradient|conic-gradient|#|rgb|hsl|var\()/i.test(e)?{background:e}:{background:`url("${e.replace(/"/g,'\\"')}") center / cover no-repeat`}:{}}onMarkSlotChange(e){this.hasMark=Yo(e.target)}onActionsSlotChange(e){this.hasActions=Yo(e.target)}onHelpSlotChange(e){this.hasHelpSlot=Yo(e.target)}renderHelpProbe(){return u`<slot name="help-info" hidden @slotchange=${this.onHelpSlotChange}></slot>`}renderIcon(){var t;const e=(t=this.icon)==null?void 0:t.trim();return e?e.startsWith("icon-")?u`
        <span slot="start" class="du-cloud-card__avatar-icon" part="icon">
          <du-icon name=${e} size="20" decorative></du-icon>
        </span>
      `:u`
      <img slot="start" class="du-cloud-card__avatar" part="icon" src=${e} alt="" />
    `:b}renderHeading(){const e=u`<p class="du-cloud-card__title" part="title">${this.resolvedTitle}</p>`;return this.hasSubtitle?u`
      <span class="du-cloud-card__heading">
        ${e}
        <p class="du-cloud-card__subtitle" part="subtitle">${this.subtitle}</p>
      </span>
    `:e}renderCollect(){if(!this.hasCollect)return b;const e=u`
      <button
        type="button"
        class="du-cloud-card__stat"
        part="collect"
        aria-label="收藏"
        @click=${this.onCollect}
      >
        <du-icon name=${this.collectIcon} size="16" decorative></du-icon>
      </button>
    `;return this.renderStatHelp(this.collectHelpInfo,e)}renderLike(){if(!this.hasLike)return b;const e=u`
      <button
        type="button"
        class="du-cloud-card__stat"
        part="like"
        aria-label="点赞"
        @click=${this.onLike}
      >
        <du-icon name=${this.likeIcon} size="16" decorative></du-icon>
      </button>
    `;return this.renderStatHelp(this.likeHelpInfo,e)}renderDelete(){const e=u`
      <button
        type="button"
        class="du-cloud-card__stat"
        part="delete"
        aria-label="删除"
        @click=${this.onDelete}
      >
        <du-icon name="icon-delete_linear" size="16" decorative></du-icon>
      </button>
    `;return this.renderStatHelp(this.deleteHelperInfo,e)}renderStatHelp(e,t){return e.trim()?u`
      <du-coachmark
        class="du-cloud-card__stat-hint"
        placement="top-center"
        trigger="hover"
        content=${e}
      >
        ${t}
      </du-coachmark>
    `:t}renderCard(e={}){var t;return u`
      <div
        class="du-cloud-card"
        part="card"
        slot=${e.asReference?"reference":b}
        ?data-has-bg=${this.hasBg}
        ?data-has-description=${this.hasDescription}
        ?data-selected=${this.selected}
        style=${ne(this.backgroundStyle)}
      >
        <div class="du-cloud-card__body">
          <du-layout
            class="du-cloud-card__header"
            width="100%"
            gap="4"
            text-overflow=${this.hasSubtitle?"wrap":"ellipsis"}
          >
            ${this.renderIcon()}
            ${this.renderHeading()}
            ${this.hasMark?u`
                  <span slot="end">
                    <slot name="mark" @slotchange=${this.onMarkSlotChange}></slot>
                  </span>
                `:u`<slot name="mark" hidden @slotchange=${this.onMarkSlotChange}></slot>`}
          </du-layout>
          <div class="du-cloud-card__tags" part="tags" ?data-has-tags=${this.hasTags}>
            ${((t=this.tags)==null?void 0:t.map(i=>u`<span class="du-cloud-card__tag">${i}</span>`))??b}
          </div>
          <du-layout class="du-cloud-card__footer" width="100%" ?data-has-description=${this.hasDescription}>
            ${this.hasDescription?u`<p class="du-cloud-card__description" part="description">${this.description}</p>`:u`
                  <span slot="start" class="du-cloud-card__stats">
                    ${this.renderCollect()}
                    ${this.renderLike()}
                    ${this.renderDelete()}
                  </span>
                `}
            ${this.hasActions?u`
                  <span slot="end">
                    <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
                  </span>
                `:u`
                  <slot name="actions" hidden @slotchange=${this.onActionsSlotChange}></slot>
                `}
          </du-layout>
        </div>
      </div>
    `}render(){return this.hasHelp?this.hasHelpSlot?u`
        <du-coachmark
          class="du-cloud-card__hint"
          placement="right-center"
          trigger="hover"
          parent=""
        >
          ${this.renderCard({asReference:!0})}
          <slot name="help-info" @slotchange=${this.onHelpSlotChange}></slot>
        </du-coachmark>
      `:u`
      <du-coachmark
        class="du-cloud-card__hint"
        placement="right-center"
        trigger="hover"
        content=${this.helpInfo}
      >
        ${this.renderCard()}
      </du-coachmark>
      ${this.renderHelpProbe()}
    `:u`${this.renderCard()}${this.renderHelpProbe()}`}};La.styles=df;let ee=La;be([y()],ee.prototype,"icon"),be([st({attribute:"card-title"})],ee.prototype,"cardTitle"),be([y("",{attribute:"card-subtitle"})],ee.prototype,"subtitle"),be([y()],ee.prototype,"description"),be([y()],ee.prototype,"bg"),be([m()],ee.prototype,"selected"),be([C({type:Array,converter:uf})],ee.prototype,"tags"),be([y("",{attribute:"help-info"})],ee.prototype,"helpInfo"),be([y("",{attribute:"like-help-info"})],ee.prototype,"likeHelpInfo"),be([y("",{attribute:"collect-help-info"})],ee.prototype,"collectHelpInfo"),be([y("",{attribute:"delete-helper-info"})],ee.prototype,"deleteHelperInfo"),be([C({attribute:"like-num",converter:ad})],ee.prototype,"likeNum"),be([C({attribute:"collect-num",converter:ad})],ee.prototype,"collectNum"),be([S()],ee.prototype,"hasMark"),be([S()],ee.prototype,"hasActions"),be([S()],ee.prototype,"hasHelpSlot");function Yo(r){return r.assignedNodes({flatten:!0}).some(e=>{var t;return e.nodeType===Node.TEXT_NODE?!!((t=e.textContent)!=null&&t.trim()):e.nodeType===Node.ELEMENT_NODE})}function nd(){xe(),oe(),Gi(),k("du-cloud-card",ee)}const cf=_`
  :host {
    --du-svg-official-partner-ink: var(--du-on-d-c1);
    --du-svg-official-partner-stroke: var(--du-bg-b3);
    --du-svg-official-partner-fill-start: var(--du-on-d-c7);
    --du-svg-official-partner-fill-end: var(--du-state-press-strong);
    display: inline-flex;
    box-sizing: border-box;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-end;
    width: 62px;
    height: 28px;
    padding: 5px 8px;
    overflow: hidden;
    color: var(--du-svg-official-partner-ink);
    background: linear-gradient(
      166deg,
      var(--du-svg-official-partner-fill-start),
      var(--du-svg-official-partner-fill-end)
    );
    border: 1px solid var(--du-svg-official-partner-stroke);
    border-radius: var(--du-radius-round-corner-xs, 4px);
    vertical-align: top;
  }

  :host-context([data-du-theme='dark']),
  :host-context(:root[theme-mode='dark']),
  :host-context(:root.theme-dark) {
    --du-svg-official-partner-fill-start: var(--du-on-l-c7);
    --du-svg-official-partner-fill-end: var(--du-state-press);
  }

  .du-svg-official-partner__art {
    display: block;
    width: 48px;
    height: 18.872px;
    fill: currentColor;
  }
`,Na=class Na extends A{render(){return u`
      <svg
        class="du-svg-official-partner__art"
        part="artwork"
        viewBox="0 0 48 18.872"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M3.5957 18.2901C3.03944 17.8095 2.50869 17.3519 1.97905 16.893C1.68852 16.6413 1.40438 16.382 1.108 16.1375C0.991812 16.0416 0.971938 15.9497 1.01541 15.8115C1.43681 14.4726 1.85461 13.1325 2.27109 11.7921C2.78174 10.1485 3.28867 8.50375 3.80393 6.86159C3.82807 6.78471 3.90774 6.68361 3.97743 6.66893C4.91011 6.47218 5.84562 6.28865 6.78064 6.10304C6.7998 6.09923 6.82181 6.10961 6.86954 6.11826C6.78454 6.46242 6.70101 6.80064 6.61149 7.16308C7.15537 6.90276 7.66402 6.64989 8.1808 6.415C8.59763 6.22552 9.02089 6.04905 9.44756 5.88283C9.90538 5.70445 10.3794 5.65259 10.8617 5.77645C10.9994 5.8118 11.0901 5.79286 11.1732 5.66062C11.3853 5.32284 11.6176 4.99784 11.8348 4.66318C11.8969 4.5674 11.9349 4.45596 12.0133 4.28938C11.8508 4.30043 11.7453 4.29399 11.6464 4.31631C9.45568 4.81002 7.26552 5.30643 5.07553 5.80364C4.62162 5.90669 4.16704 6.00788 3.71725 6.127C3.62986 6.15015 3.52756 6.23746 3.49309 6.3205C3.27212 6.85259 3.07213 7.39336 2.85401 7.92664C2.82326 8.00179 2.73911 8.09286 2.66609 8.10715C1.79659 8.27741 0.924559 8.4345 5.89286e-06 8.60485C0.531554 6.92161 1.05387 5.26761 1.58613 3.58211C1.30142 3.56211 1.0568 3.54489 0.812189 3.52768C0.804737 3.50124 0.797284 3.47485 0.789875 3.44841C0.870126 3.4158 0.947805 3.36545 1.03107 3.35338C1.79162 3.24323 2.55221 3.13219 3.31475 3.03712C3.77501 2.97976 4.23873 2.95031 4.75422 2.90346C4.57313 3.38616 4.40744 3.82779 4.22746 4.30748C4.87626 4.15962 5.48353 4.01358 6.09422 3.88338C8.12504 3.4504 10.1551 3.01383 12.19 2.60095C12.6353 2.51059 13.1011 2.46494 13.5544 2.48157C14.5385 2.51773 15.282 3.30285 15.2469 4.20696C15.2454 4.24386 15.2426 4.28077 15.2397 4.31759C15.2158 4.60999 15.1212 4.79648 14.7827 4.88556C13.6063 5.19521 12.4419 5.551 11.2603 5.8929C11.3775 5.96956 11.5018 6.04085 11.615 6.12669C12.0914 6.48784 12.2235 7.01544 11.8901 7.51234C11.6548 7.86289 11.3309 8.15608 11.0332 8.46182C10.8605 8.63914 10.6613 8.79059 10.4388 8.98437C10.593 9.03166 10.7016 9.06493 10.8389 9.10703C10.712 9.3854 10.5914 9.65827 10.461 9.92644C10.4437 9.96198 10.3794 9.98491 10.3329 9.99454C9.00283 10.2709 7.67223 10.5448 6.34163 10.8186C6.32051 10.8229 6.29793 10.8203 6.23902 10.8222C6.26373 10.7315 6.28618 10.652 6.30712 10.572C6.40431 10.2004 6.51087 9.83084 6.59316 9.45594C6.62581 9.30728 6.69781 9.24863 6.83498 9.21749C7.42575 9.08338 8.01639 8.94795 8.60331 8.79822C8.70343 8.77267 8.81558 8.69411 8.86979 8.60729C9.0495 8.31938 9.21981 8.02339 9.36372 7.71641C9.42977 7.57556 9.50004 7.35725 9.43727 7.25309C9.32987 7.07488 9.11298 7.18131 8.95221 7.24475C8.33367 7.48878 7.71921 7.74311 7.10329 7.99371C7.08962 7.99926 7.07716 8.0092 7.06305 8.01217C6.4225 8.14628 6.19688 8.59225 6.07763 9.19216C5.92817 9.94406 5.69141 10.6786 5.49329 11.4208C5.47501 11.4894 5.46361 11.5597 5.44276 11.6592C6.05949 11.5123 6.64502 11.3676 7.23313 11.2342C8.02535 11.0544 8.81584 10.8638 9.6141 10.7156C10.1536 10.6154 10.6911 10.6781 11.1884 10.9417C11.7673 11.2486 12.0654 11.8698 11.8559 12.4461C11.7697 12.6833 11.5891 12.9083 11.3991 13.0812C10.9786 13.4636 10.525 13.8095 10.0849 14.1703C10.0288 14.2163 9.97263 14.2625 9.88085 14.3379C10.0755 14.4192 10.2406 14.4882 10.4452 14.5737C10.3294 14.8219 10.2213 15.069 10.0968 15.3076C10.0732 15.3528 9.98789 15.3794 9.92685 15.3897C8.30235 15.6632 6.67736 15.9337 5.05224 16.2035C4.99595 16.2128 4.93765 16.2102 4.84188 16.2151C4.92909 15.8821 5.0101 15.5718 5.09164 15.2616C5.17992 14.9258 5.27556 14.5917 5.35413 14.2536C5.39113 14.0945 5.46517 14.0245 5.63206 14.0027C6.3942 13.9031 7.15528 13.7946 7.91458 13.6753C8.01422 13.6597 8.1332 13.5845 8.18825 13.5008C8.38287 13.2047 8.55468 12.8937 8.73253 12.5868C8.76935 12.5232 8.80152 12.4554 8.82498 12.386C8.91819 12.1104 8.81567 11.9843 8.5258 12.038C7.97345 12.1402 7.42331 12.2544 6.87247 12.3648C6.38692 12.4621 5.90364 12.5727 5.41539 12.6536C5.21652 12.6865 5.13427 12.771 5.08214 12.9619C4.61323 14.6791 4.13355 16.3935 3.65656 18.1086C3.64281 18.1577 3.62422 18.2054 3.5957 18.2901Z"
          fill="currentColor"
        />
        <path
          d="M16.4914 6.86057C15.2218 7.16397 13.9523 7.46731 12.6443 7.77989C12.6654 7.68464 12.6769 7.61633 12.6958 7.55014C12.8298 7.08141 12.9788 6.6164 13.094 6.14319C13.1442 5.93691 13.2492 5.85812 13.4425 5.81544C14.9356 5.48588 16.4236 5.13262 17.9196 4.8172C19.8859 4.40264 21.8579 4.01584 23.8277 3.61778C23.8773 3.60776 23.9286 3.60554 24.0145 3.59556C23.9953 3.68024 23.9812 3.74705 23.9649 3.81333C23.8585 4.2436 23.7452 4.67227 23.648 5.10463C23.6098 5.27458 23.5209 5.33939 23.3545 5.3732C22.1383 5.62012 20.9245 5.87932 19.7088 6.12877C19.5452 6.16231 19.4382 6.23511 19.3489 6.38128C19.0298 6.90351 18.6948 7.41599 18.333 7.98356C18.4471 7.94958 18.5115 7.93143 18.5753 7.9112C19.3664 7.6606 20.17 7.51957 21 7.6641C21.902 7.82119 22.4071 8.40265 22.3673 9.31509C22.3024 10.7999 21.923 12.2037 21.1361 13.4772C20.8525 13.9362 20.4733 14.3106 19.9697 14.5345C18.9713 14.9784 17.8012 14.5067 17.3884 13.4961C17.0555 12.6809 17.1276 11.8529 17.346 11.0048C17.3777 11.0705 17.4102 11.136 17.4412 11.2021C17.6265 11.5973 17.8458 11.9615 18.2846 12.1252C18.6941 12.2779 18.9934 12.193 19.256 11.8337C19.5939 11.3715 19.7628 10.8342 19.9048 10.2898C19.9735 10.0265 20.0279 9.7553 20.0491 9.48455C20.0813 9.07296 19.8754 8.80807 19.4657 8.811C19.0808 8.81375 18.6924 8.898 18.3136 8.98215C18.0786 9.03437 17.8566 9.14882 17.633 9.24513C17.5696 9.27246 17.5045 9.32383 17.4681 9.38172C15.5082 12.4912 13.8992 15.9595 13.8899 16.0163C13.6989 16.5418 13.5187 16.6046 13.115 16.6926C11.4799 17.0489 10.3746 17.2833 8.71106 17.436C8.67015 17.4398 8.62841 17.4348 8.55583 17.4331C12.3205 13.0983 13.4135 11.6892 16.5323 6.9111C16.5186 6.8942 16.505 6.87739 16.4914 6.86057Z"
          fill="currentColor"
        />
        <path
          d="M6.61583 3.2336C6.67803 2.94738 6.76516 2.67752 6.7892 2.40217C6.81914 2.05911 6.8262 1.70839 6.78964 1.36671C6.74843 0.98151 6.57009 0.673636 6.11316 0.64103C6.11183 0.621422 6.1105 0.601858 6.10917 0.58225C6.48208 0.464513 6.85082 0.330495 7.22883 0.232498C7.97695 0.0385468 8.73426 -0.0902368 9.50758 0.0775855C10.1134 0.209031 10.5152 0.582073 10.6541 1.18025C10.7329 1.51976 10.7234 1.881 10.7376 2.2331C10.7397 2.28727 10.6639 2.38336 10.6098 2.39529C9.30374 2.6836 7.99572 2.96308 6.68788 3.2435C6.6747 3.24634 6.65948 3.23995 6.61583 3.2336Z"
          fill="currentColor"
        />
        <path
          d="M16.6526 2.0777C17.0329 1.97518 17.4095 1.85558 17.7943 1.77391C18.4549 1.63368 19.1223 1.56213 19.7911 1.72888C20.4796 1.90052 20.894 2.38833 20.9574 3.09213C21.0116 3.694 21.0122 3.69652 20.4288 3.82238C19.3909 4.04632 18.3522 4.26685 17.2845 4.49509C17.3281 4.27949 17.3884 4.076 17.4062 3.86883C17.4299 3.59139 17.4462 3.30871 17.4198 3.03269C17.3756 2.57185 17.1763 2.21398 16.6489 2.14296C16.6501 2.12122 16.6513 2.09948 16.6526 2.0777Z"
          fill="currentColor"
        />
        <path
          d="M42.6541 6.49875C42.7776 6.50618 42.9017 6.50854 43.0245 6.52232C43.1729 6.53897 43.3206 6.56251 43.4677 6.58831C43.5702 6.60627 43.6185 6.67819 43.6098 6.77747C43.5999 6.88886 43.5842 7.00082 43.558 7.10938C43.5127 7.29739 43.4567 7.4828 43.4069 7.66976C43.3962 7.71016 43.3926 7.75247 43.3817 7.81831C43.519 7.79372 43.6396 7.77437 43.7593 7.7503C44.5911 7.58305 45.4225 7.41443 46.2544 7.24778C46.3063 7.2374 46.3608 7.23989 46.4271 7.23552C46.4143 7.29353 46.4096 7.33025 46.3982 7.36479C46.2298 7.87435 46.0578 8.38273 45.8937 8.89367C45.8586 9.00317 45.7992 9.05548 45.6878 9.07436C44.8757 9.21199 44.0644 9.35398 43.2527 9.4932C42.9714 9.54144 42.9708 9.53958 42.8974 9.82288C42.8084 10.1664 42.7198 10.51 42.6229 10.8849C42.9385 10.8566 43.2234 10.7736 43.5135 10.7257C43.809 10.6769 44.1036 10.6227 44.3987 10.5721C44.6938 10.5214 44.9892 10.4727 45.2843 10.4222C45.5794 10.3717 45.8744 10.3203 46.1694 10.2687C46.4624 10.2174 46.7553 10.1655 47.0795 10.1084C47.0506 10.1797 47.0385 10.2251 47.0155 10.264C46.653 10.8766 46.2862 11.4867 45.9284 12.1021C45.8662 12.2091 45.7821 12.2461 45.6738 12.2622C45.0688 12.3521 44.4637 12.4415 43.8588 12.5321C43.3467 12.6087 42.8351 12.6889 42.3225 12.7623C42.2191 12.7771 42.1738 12.8269 42.1502 12.9243C41.8893 14.0034 41.6168 15.0799 41.3674 16.1617C41.2861 16.5143 41.1364 16.7813 40.8291 16.9941C40.0077 17.5628 39.2063 18.1606 38.3963 18.7459C38.3332 18.7916 38.2649 18.8302 38.1991 18.872C38.1876 18.8631 38.1761 18.8542 38.1646 18.8452C39.1865 14.8729 40.2084 10.9007 41.2377 6.8999C41.1859 6.94388 41.1497 6.97043 41.1184 7.00187C40.562 7.56059 39.9633 8.07094 39.3439 8.55765C39.3047 8.58847 39.2661 8.62424 39.221 8.6422C39.1854 8.65641 39.131 8.66277 39.1009 8.64522C38.892 8.52366 38.6873 8.39494 38.482 8.26899C38.7489 7.86818 39.0107 7.48151 39.266 7.09064C40.1514 5.73519 40.9504 4.32982 41.687 2.88862C41.849 2.57181 42.0106 2.25484 42.1705 1.93701C42.2238 1.83112 42.2741 1.72354 42.3207 1.61458C42.4398 1.33637 42.4214 1.28725 42.1336 1.16964C41.9845 1.10871 41.8289 1.06374 41.6636 1.00725C41.7122 0.916547 41.7974 0.913041 41.8692 0.89733C42.3859 0.784281 42.8994 0.811409 43.4081 0.946674C43.802 1.05142 44.1825 1.18998 44.5199 1.42575C44.6015 1.48279 44.6794 1.54679 44.7513 1.61563C45.0638 1.91468 45.1155 2.23883 44.8912 2.61174C44.7402 2.86275 44.5749 3.10696 44.3968 3.33945C44.1196 3.70123 43.826 4.05044 43.5393 4.40502C43.5203 4.42859 43.5015 4.4524 43.469 4.49313C44.241 4.31499 44.991 4.14278 45.7406 3.96868C46.4853 3.79574 47.232 3.63291 48 3.46289C47.9937 3.53657 47.9977 3.57978 47.9856 3.61795C47.8147 4.15952 47.6386 4.69945 47.4709 5.24201C47.4229 5.39743 47.3333 5.46933 47.1721 5.5027C46.152 5.7138 45.134 5.93536 44.1152 6.15321C43.6278 6.25745 43.1401 6.36112 42.6526 6.46506C42.6531 6.47631 42.6536 6.48752 42.6541 6.49875Z"
          fill="currentColor"
        />
        <path
          d="M25.8221 8.96408C25.881 8.70173 25.9317 8.47081 25.9846 8.2404C26.0544 7.93652 26.1304 7.63397 26.1943 7.32886C26.2164 7.22348 26.2567 7.17292 26.3686 7.1478C27.7748 6.83199 29.178 6.50272 30.596 6.24271C30.7098 6.22185 30.8249 6.20784 30.9484 6.18926C30.3633 5.5557 29.7927 4.93785 29.2154 4.31274C29.1871 4.33852 29.1534 4.36471 29.1249 4.39568C28.1293 5.47822 27.0633 6.48471 25.903 7.39028C25.1832 7.9521 24.4377 8.47587 23.6369 8.91635C23.3967 9.04847 23.142 9.15392 22.8959 9.27548C22.825 9.31048 22.7675 9.30902 22.7087 9.25522C22.4784 9.04451 22.2468 8.83513 22.0164 8.62448C22.0088 8.61747 22.0087 8.6021 22 8.57433C22.0906 8.49289 22.1883 8.40791 22.2829 8.31963C23.1972 7.46664 24.0566 6.56071 24.8935 5.6321C25.5627 4.88946 26.2273 4.14304 26.8466 3.35812C27.2721 2.81888 27.6827 2.26792 28.0996 1.72195C28.1223 1.69222 28.1424 1.66046 28.1629 1.62907C28.3078 1.40699 28.2978 1.3597 28.0689 1.21458C28.0058 1.17455 27.9371 1.14345 27.8732 1.10447C27.8335 1.08025 27.7981 1.04892 27.742 1.00667C27.8676 0.940748 27.9773 0.935668 28.0867 0.937974C28.6414 0.949672 29.1747 1.06746 29.6938 1.26004C29.9767 1.36503 30.2405 1.50198 30.4837 1.68172C30.8149 1.92639 30.8578 2.22107 30.6381 2.5413C30.5217 2.71106 30.3939 2.87299 30.2715 3.03866C30.2353 3.08756 30.2002 3.13716 30.1615 3.19069C30.191 3.21377 30.2081 3.23223 30.2292 3.24305C31.0955 3.68747 31.9563 4.1433 32.8308 4.57092C33.4525 4.87487 34.0809 5.17017 34.7457 5.37304C34.9835 5.44561 35.2278 5.49679 35.4691 5.55817C35.5044 5.56715 35.5391 5.57861 35.601 5.59683C35.5194 5.71011 35.4528 5.81322 35.3758 5.90778C34.9222 6.46469 34.4683 7.02148 34.009 7.57365C33.9179 7.68312 33.8091 7.7807 33.6969 7.86902C33.5147 8.01243 33.306 8.04632 33.1007 7.93046C32.8895 7.81126 32.6785 7.68517 32.4896 7.53432C32.1287 7.24615 31.7834 6.93829 31.4317 6.63855C31.3764 6.59142 31.3214 6.54393 31.2402 6.47417C31.2263 6.59989 31.2142 6.69033 31.2067 6.78117C31.1794 7.11088 31.1554 7.44086 31.1264 7.77043C31.1125 7.92741 31.1011 7.93318 30.9516 7.96241C29.7822 8.191 28.6128 8.41961 27.4438 8.64979C26.9542 8.74618 26.4655 8.84663 25.9762 8.94451C25.9356 8.95257 25.894 8.95512 25.8221 8.96408Z"
          fill="currentColor"
        />
        <path
          d="M26.4584 15.0836C26.5173 14.7864 26.5676 14.5239 26.6217 14.2621C26.6861 13.9505 26.7597 13.6407 26.8171 13.3279C26.8402 13.2022 26.9009 13.1516 27.0214 13.1306C27.5868 13.0316 28.1504 12.9225 28.7162 12.8258C28.8447 12.8038 28.9289 12.7514 28.995 12.6384C29.2757 12.1588 29.5657 11.6847 29.8473 11.2056C29.9198 11.0823 29.9829 10.9518 30.0344 10.8184C30.131 10.5682 30.0322 10.4223 29.7682 10.429C29.6449 10.4322 29.52 10.4566 29.3999 10.4874C28.4919 10.7203 27.6076 11.0248 26.7381 11.374C26.5952 11.4314 26.5283 11.5194 26.5111 11.6779C26.4507 12.2363 26.3758 12.7931 26.305 13.3504C26.2381 13.8766 26.1715 14.4029 26.1007 14.9286C26.0743 15.1249 26.0365 15.3196 26.0002 15.5373C25.9047 15.514 25.827 15.4996 25.7521 15.4761C25.0892 15.2687 24.4569 14.9864 23.8286 14.6934C23.7177 14.6417 23.6741 14.5745 23.6819 14.4471C23.7332 13.618 23.7761 12.7884 23.8226 11.959C23.8536 11.4041 23.8874 10.8494 23.9167 10.2944C23.9238 10.1589 23.9177 10.0226 23.9177 9.8626C24.8194 9.64061 25.7485 9.47597 26.6924 9.29966C26.7247 9.58111 26.656 9.83 26.6381 10.1013C26.6916 10.0838 26.7362 10.0725 26.7784 10.0551C27.7943 9.63592 28.8265 9.26142 29.8769 8.93884C30.1379 8.85866 30.4088 8.79805 30.6796 8.76408C31.4666 8.66535 32.1161 8.95547 32.634 9.53373C32.9289 9.863 33.0096 10.265 32.8646 10.6895C32.7966 10.8886 32.7091 11.0865 32.5977 11.2645C32.1864 11.9224 31.7222 12.5418 31.1919 13.11C31.1753 13.1277 31.162 13.1485 31.1246 13.1974C31.4108 13.2077 31.6731 13.217 31.9581 13.2272C31.9377 13.2936 31.9295 13.3404 31.9097 13.3816C31.7501 13.7136 31.5864 14.0436 31.4284 14.3764C31.3832 14.4715 31.3211 14.5097 31.2132 14.5208C30.4805 14.5964 29.7483 14.6778 29.0167 14.7631C28.341 14.8419 27.6661 14.9275 26.9909 15.0111C26.8252 15.0316 26.66 15.056 26.4584 15.0836Z"
          fill="currentColor"
        />
        <path
          d="M37.8289 6.7037C38.0806 6.67595 38.3323 6.64821 38.6137 6.61718C38.5979 6.72657 38.5928 6.80522 38.5747 6.88075C38.236 8.29372 37.8961 9.7064 37.5558 11.119C37.3119 12.1316 37.0663 13.1437 36.8232 14.1565C36.7695 14.3804 36.6762 14.5776 36.5006 14.7346C36.2887 14.9241 36.0476 14.9921 35.7723 14.9288C35.2484 14.8082 34.7734 14.5763 34.3308 14.2767C34.1775 14.173 34.1719 14.1394 34.2341 13.9432C34.4472 13.2713 34.6597 12.5992 34.8779 11.929C35.262 10.7488 35.6502 9.56991 36.0364 8.39036C36.0477 8.35581 36.0555 8.32011 36.0425 8.26085C35.9936 8.29919 35.9437 8.33648 35.8957 8.37606C35.3455 8.82977 34.7732 9.25154 34.1434 9.59044C34.1049 9.61114 34.0636 9.62779 34.0283 9.65287C33.8848 9.75477 33.7505 9.75526 33.5998 9.65362C33.4882 9.57833 33.3551 9.53474 33.2155 9.4695C33.2812 9.38784 33.3386 9.31579 33.3968 9.2444C34.1034 8.37759 34.7696 7.4801 35.4188 6.56995C36.3617 5.2479 37.2449 3.8858 38.1227 2.52015C38.126 2.5149 38.129 2.50937 38.1322 2.50405C38.3514 2.14539 38.3466 2.1077 38.063 1.78953C37.9783 1.69454 37.8729 1.61432 37.8025 1.45404C37.9671 1.47868 38.1023 1.48655 38.2308 1.52026C38.8284 1.67699 39.3477 1.9835 39.8084 2.38712C39.9855 2.54231 40.1501 2.71806 40.2916 2.90615C40.5376 3.23309 40.5379 3.57556 40.3093 3.91538C40.205 4.07029 40.0866 4.21735 39.9616 4.35633C39.352 5.03419 38.7391 5.70909 38.1246 6.38244C38.029 6.48709 37.9188 6.5783 37.8154 6.67573C37.8199 6.68505 37.8244 6.69438 37.8289 6.7037Z"
          fill="currentColor"
        />
      </svg>
    `}};Na.styles=cf;let Xs=Na;function ld(){k("du-svg-official-partner",Xs)}const pf=_`
  :host {
    display: contents;
    font-family: var(--du-font-family, var(--du-font-family-base));
    font-size: var(--du-font-size);
    line-height: var(--du-line-height);
    font-weight: var(--du-font-weight);
    letter-spacing: var(--du-letter-spacing);
    color: var(--du-color);
  }

  :host([theme='light']),
  :host([data-du-theme='light']) {
    color-scheme: light;
  }

  :host([theme='dark']),
  :host([data-du-theme='dark']) {
    color-scheme: dark;
  }
`;var ff=Object.defineProperty,tr=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&ff(e,t,s),s};const Ha=class Ha extends A{constructor(){super(...arguments),this.theme=we.theme,this.typography=we.typography,this.radius=we.radius,this.shadow=we.shadow,this.texture=we.texture,this.gap=we.gap,this.disabledOpacity=""}connectedCallback(){super.connectedCallback(),this.publishAndApply()}disconnectedCallback(){Pn(),super.disconnectedCallback()}updated(e){(e.has("theme")||e.has("typography")||e.has("radius")||e.has("shadow")||e.has("texture")||e.has("gap")||e.has("disabledOpacity"))&&this.publishAndApply()}publishAndApply(){yo({theme:this.theme,typography:this.typography,radius:this.radius,shadow:this.shadow,texture:this.texture,gap:this.gap}),On(this,{theme:this.theme,typography:this.typography,radius:this.radius,shadow:this.shadow,texture:this.texture,gap:this.gap}),An(this,this.disabledOpacity)}render(){return u`<slot></slot>`}};Ha.styles=pf;let pt=Ha;tr([C({reflect:!0})],pt.prototype,"theme"),tr([C({reflect:!0})],pt.prototype,"typography"),tr([C({reflect:!0})],pt.prototype,"radius"),tr([C({reflect:!0})],pt.prototype,"shadow"),tr([C({reflect:!0})],pt.prototype,"texture"),tr([C({reflect:!0})],pt.prototype,"gap"),tr([C({attribute:"disabled-opacity",reflect:!0})],pt.prototype,"disabledOpacity"),k("du-css-page",pt);const mf=_`
  :host {
    display: contents;
    font-family: var(--du-font-family, var(--du-font-family-base));
    font-size: var(--du-font-size, inherit);
    line-height: var(--du-line-height, inherit);
    font-weight: var(--du-font-weight, inherit);
    letter-spacing: var(--du-letter-spacing, inherit);
    color: var(--du-color, inherit);
  }

  :host([isolated]) {
    font-size: var(--du-font-size);
    line-height: var(--du-line-height);
    font-weight: var(--du-font-weight);
    letter-spacing: var(--du-letter-spacing);
    color: var(--du-color);
  }

  :host([theme='light']),
  :host([isolated][data-du-theme='light']) {
    color-scheme: light;
  }

  :host([theme='dark']),
  :host([isolated][data-du-theme='dark']) {
    color-scheme: dark;
  }
`;var gf=Object.defineProperty,mi=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&gf(e,t,s),s};const Fa=class Fa extends A{constructor(){super(...arguments);w(this,Vr);this.theme="",this.typography="",this.radius="",this.shadow="",this.texture="",this.gap="",this.disabledOpacity="",this.isolated=!1}connectedCallback(){super.connectedCallback(),d(this,Vr,Ch(()=>{this.isolated&&this.syncAll()}))}disconnectedCallback(){var t;(t=n(this,Vr))==null||t.call(this),d(this,Vr,void 0),super.disconnectedCallback()}updated(t){(t.has("theme")||t.has("typography")||t.has("radius")||t.has("shadow")||t.has("texture")||t.has("gap")||t.has("disabledOpacity")||t.has("isolated"))&&this.syncAll()}syncAll(){On(this,Dh({theme:this.theme,typography:this.typography,radius:this.radius,shadow:this.shadow,texture:this.texture,gap:this.gap},{isolated:this.isolated})),An(this,this.disabledOpacity)}render(){return u`<slot></slot>`}};Vr=new WeakMap,Fa.styles=mf;let Ze=Fa;mi([C({reflect:!0})],Ze.prototype,"theme"),mi([C({reflect:!0})],Ze.prototype,"typography"),mi([C({reflect:!0})],Ze.prototype,"radius"),mi([C({reflect:!0})],Ze.prototype,"shadow"),mi([C({reflect:!0})],Ze.prototype,"texture"),mi([C({reflect:!0})],Ze.prototype,"gap"),mi([C({attribute:"disabled-opacity",reflect:!0})],Ze.prototype,"disabledOpacity"),mi([m()],Ze.prototype,"isolated"),k("du-css-config",Ze);const bf=_`
  :host {
    display: none;
  }
`;var vf=Object.defineProperty,Dr=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&vf(e,t,s),s};const Va=class Va extends A{constructor(){super(...arguments),this.theme=we.theme,this.typography=we.typography,this.radius=we.radius,this.shadow=we.shadow,this.texture=we.texture,this.gap=we.gap}connectedCallback(){super.connectedCallback(),this.publishDefaults()}disconnectedCallback(){Pn(),super.disconnectedCallback()}updated(e){(e.has("theme")||e.has("typography")||e.has("radius")||e.has("shadow")||e.has("texture")||e.has("gap"))&&this.publishDefaults()}publishDefaults(){yo({theme:this.theme,typography:this.typography,radius:this.radius,shadow:this.shadow,texture:this.texture,gap:this.gap})}render(){return u``}};Va.styles=bf;let $t=Va;Dr([C({reflect:!0})],$t.prototype,"theme"),Dr([C({reflect:!0})],$t.prototype,"typography"),Dr([C({reflect:!0})],$t.prototype,"radius"),Dr([C({reflect:!0})],$t.prototype,"shadow"),Dr([C({reflect:!0})],$t.prototype,"texture"),Dr([C({reflect:!0})],$t.prototype,"gap"),k("du-css-default-config",$t);const yf=_`
  :host {
    position: relative;
    display: block;
    min-width: 0;
    padding: 16px;
    overflow-wrap: anywhere;
    word-break: break-word;
    color: var(--du-color, var(--du-on-l-c2));
    font-family: var(--du-font-family, var(--du-font-family-base));
    font-size: var(--du-font-size, inherit);
    font-weight: var(--du-font-weight, inherit);
    line-height: var(--du-line-height, inherit);
    letter-spacing: var(--du-letter-spacing, inherit);
    background: var(--du-fill-p8);
    border: 1px solid var(--du-fill-p-3);
    border-radius: var(--du-radius, var(--du-radius-round-corner-m));
  }

  :host([elevated]) {
    box-shadow: var(--du-shadow, none);
    backdrop-filter: blur(var(--du-backdrop-blur, 0px));
    -webkit-backdrop-filter: blur(var(--du-backdrop-blur, 0px));
  }

  .body {
    display: grid;
    gap: 8px;
    min-width: 0;
  }

  .title {
    margin: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
    font: inherit;
    font-weight: inherit;
  }

  .description {
    margin: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
    color: var(--du-on-l-c4);
    font-size: max(12px, 0.85em);
    font-weight: 400;
    line-height: 1.4;
  }
`;var wf=Object.defineProperty,Ks=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,a;o>=0;o--)(a=r[o])&&(s=a(e,t,s)||s);return s&&wf(e,t,s),s};const Ba=class Ba extends A{constructor(){super(...arguments),this.heading="",this.description="",this.elevated=!1,this.pill=!1}render(){return u`
      <div class="body" part="body">
        <slot>
          ${this.heading?u`<strong class="title">${this.heading}</strong>`:null}
          ${this.description?u`<p class="description">${this.description}</p>`:null}
        </slot>
      </div>
    `}};Ba.styles=yf;let gi=Ba;Ks([y()],gi.prototype,"heading"),Ks([y()],gi.prototype,"description"),Ks([m()],gi.prototype,"elevated"),Ks([m()],gi.prototype,"pill"),k("du-design-demo-card",gi);const qo="https://cdn.mchose.com.cn",dd="customPage/driver-ui";function xf(r){return r.replace(/^\/+|\/+$/g,"")}function Zs(r){return r.endsWith("/")?r:`${r}/`}function _f(){return"".trim()}function kf(r){return r?/^https?:\/\//i.test(r)?Zs(r):Zs(`${qo}/${xf(r)}`):Zs(`${qo}/${dd}`)}const fs=class fs{static get CDN_BASE_PATH(){return n(this,Br)??d(this,Br,kf(_f())),n(this,Br)}static set CDN_BASE_PATH(e){d(this,Br,Zs(e))}};Br=new WeakMap,fs.CDN_ORIGIN=qo,fs.DEFAULT_CDN_PATH=dd,w(fs,Br);let ir=fs;function Cf(r){ir.CDN_BASE_PATH=r}function Sf(){return ir.CDN_BASE_PATH}function $f(r){const e=r.replace(/^du-/,""),t=r.startsWith("du-")?r:`du-${e}`;return`${ir.CDN_BASE_PATH}components/${t}/${t}.js`}function Ef(){return`${ir.CDN_BASE_PATH}driver-ui.esm.js`}function hd(){oe(),$s(),Es(),$n(),Eo(),xe(),Er(),Zn(),Jn(),Qn(),Ao(),Oo(),il(),Io(),rl(),as(),ns(),pl(),fl(),ml(),ds(),Cl(),Sl(),Pl(),Al(),Ol(),Nl(),Hl(),Gl(),ql(),Xl(),Do(),Uo(),Kl(),Jl(),ed(),Gi(),Wo(),Ys(),id(),od(),nd(),ld()}return hd(),c.BUILTIN_CSS_CONFIG_DEFAULTS=we,c.DU_COLOR_BALLS_DEFAULT_COLORS=Ji,c.DU_LAYER_RENDER_AT_VALUES=Lt,c.DriverUIConfig=ir,c.DuActionIcon=ht,c.DuButton=me,c.DuCapsuleButton=Ne,c.DuCapsuleChoice=ce,c.DuCapsuleDragTip=Yi,c.DuCapsuleLayout=Se,c.DuCard=_e,c.DuCardGroup=ss,c.DuCheckbox=je,c.DuChipGroup=Ki,c.DuCloudCard=ee,c.DuCoachmark=I,c.DuColorBalls=Fe,c.DuCssConfig=Ze,c.DuCssDefaultConfig=$t,c.DuCssPage=pt,c.DuDesignDemoCard=gi,c.DuDeviceCard=De,c.DuElement=A,c.DuEvent=cn,c.DuFilterChip=_t,c.DuFloatingPanel=ue,c.DuFormElement=ye,c.DuGlowEffect=Ce,c.DuIcon=wt,c.DuInput=F,c.DuInputNumber=$e,c.DuLayout=W,c.DuLoadingIcon=Vi,c.DuMenu=B,c.DuMenuItem=ge,c.DuOverlay=Nt,c.DuPerformanceCard=er,c.DuPerformanceCardItem=Ke,c.DuPopperMutuallyExclusive=Is,c.DuPopup=ie,c.DuPopupPanel=ot,c.DuProgress=pi,c.DuScrollArea=Pe,c.DuScrollLrc=fe,c.DuSegmentedButton=H,c.DuSelect=V,c.DuSelectionChip=He,c.DuSlider=L,c.DuSvgOfficialPartner=Xs,c.DuSwitch=Rt,c.DuTabbar=dt,c.DuTag=kt,c.DuTextSelector=Oe,c.DuToast=ut,c.DuToastIcon=Qr,c.booleanAttributeConverter=Rd,c.booleanAttributeTrueConverter=Ld,c.booleanProperty=m,c.closeAllToasts=Ll,c.createBooleanAttributeConverter=ys,c.findPopperMutex=Gn,c.getBoundPopperMutex=Xh,c.getCssConfigDefaults=Tn,c.getDriverComponentPath=$f,c.getDriverUIBasePath=Sf,c.getDriverUILibraryPath=Ef,c.getDuOverlay=tl,c.getPopperMutexBinding=K,c.hostAttrOff=xr,c.hostAttrOn=X,c.normalizeSegmentedMarker=ls,c.optionalBooleanAttributeConverter=mn,c.optionalBooleanProperty=Jr,c.parseBoolean=zd,c.registerDriverUI=hd,c.registerDuActionIcon=Sl,c.registerDuButton=Do,c.registerDuCapsuleButton=fl,c.registerDuCapsuleChoice=pl,c.registerDuCapsuleDragTip=ml,c.registerDuCapsuleLayout=ns,c.registerDuCard=Io,c.registerDuCardGroup=rl,c.registerDuCheckbox=Eo,c.registerDuChipGroup=Ol,c.registerDuCloudCard=nd,c.registerDuCoachmark=Gi,c.registerDuColorBalls=ql,c.registerDuDeviceCard=id,c.registerDuFilterChip=Al,c.registerDuFloatingPanel=Jn,c.registerDuGlowEffect=as,c.registerDuIcon=oe,c.registerDuInput=Uo,c.registerDuInputNumber=Kl,c.registerDuLayout=xe,c.registerDuLoadingIcon=$s,c.registerDuMenu=Ys,c.registerDuMenuItem=Wo,c.registerDuOverlay=Ao,c.registerDuPerformanceCard=od,c.registerDuPerformanceCardItem=sd,c.registerDuPopperMutuallyExclusive=Qn,c.registerDuPopup=Oo,c.registerDuPopupPanel=il,c.registerDuProgress=Hl,c.registerDuScrollArea=Er,c.registerDuScrollLrc=Zn,c.registerDuSegmentedButton=ds,c.registerDuSelect=Jl,c.registerDuSelectionChip=Pl,c.registerDuSlider=Gl,c.registerDuSvgOfficialPartner=ld,c.registerDuSwitch=$n,c.registerDuTabbar=Cl,c.registerDuTag=Xl,c.registerDuTextSelector=ed,c.registerDuToast=Nl,c.registerDuToastIcon=Es,c.setCssConfigDefaults=yo,c.setDriverUIBasePath=Cf,c.showToast=Hs,c.toast=op,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),c}({});
