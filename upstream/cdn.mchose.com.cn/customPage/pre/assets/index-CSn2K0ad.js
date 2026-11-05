import{V as M,C as m,p as h}from"./_plugin-vue_export-helper-BfHDGUuV.js";import{u as L}from"./storeWatcher-BScJpL_J.js";const g=Object.freeze({LIGHT:"light",DARK:"dark"}),D=Object.freeze(Object.values(g)),v=g.LIGHT;let $;function b(){$||($=m({theme:v}));function e(t){$.theme=t}async function n(){return $.theme}return{state:$,setThemeState:e,getThemeState:n}}function _(){const e=localStorage.getItem("theme");return D.includes(e)?e:v}function H(e){if(!D.includes(e))return;localStorage.setItem("theme",e),document.documentElement.setAttribute("theme-mode",e),document.documentElement.setAttribute("data-du-theme",e),document.documentElement.classList.remove("theme-light","theme-dark"),document.documentElement.classList.add(`theme-${e}`);const{setThemeState:n}=b();n(e);const t=document.getElementById("mouseIframe");t&&t.contentWindow.postMessage({type:"SET_THEME",data:{theme:e}},"*"),M({commandType:"COMMAND_TYPE_CHANGE_THEME",payload:{theme:e}})}function te(){H(_())}const ne=(e,n,t=!1)=>{let s;return function(...c){const r=t&&!s;s&&clearTimeout(s),s=setTimeout(()=>{s=null,t||e.apply(this,c)},n),r&&e.apply(this,c)}},se={"0-14":10,"15-24":20,"25-34":30,"35-44":40,"45-54":50,"55-64":60,"65-74":70,"75-84":80,"85-94":90,"95-100":100},ce=e=>{if(e>=0&&e<=14)return"0-14";if(e>=15&&e<=24)return"15-24";if(e>=25&&e<=34)return"25-34";if(e>=35&&e<=44)return"35-44";if(e>=45&&e<=54)return"45-54";if(e>=55&&e<=64)return"55-64";if(e>=65&&e<=74)return"65-74";if(e>=75&&e<=84)return"75-84";if(e>=85&&e<=94)return"85-94";if(e>=95&&e<=100)return"95-100"},oe=e=>["MCHOSE S9 PRO$$$10525$$$14429","MCHOSE S9 PRO$$$16868$$$13314","MCHOSE G9 PRO$$$10525$$$14429","MCHOSE G9 PRO$$$16868$$$13570","MCHOSE V9$$$10525$$$14429","MCHOSE V9$$$16868$$$12801","MCHOSE V9 PRO$$$10525$$$14429","MCHOSE V9 PRO$$$16868$$$12802","MCHOSE X9$$$14391$$$24645","MCHOSE K9$$$14391$$$24647","MCHOSE G9 V2$$$14391$$$24713","MCHOSE G9 V2$$$14391$$$24591","MCHOSE G9 WIRED HEADSET$$$14391$$$32896","MCHOSE G20$$$3690$$$273","MCHOSE G20 PRO$$$3690$$$273","MCHOSE K20$$$14391$$$24772","MCHOSE K20 PRO$$$14391$$$24579","MCHOSE K9 UITRA$$$14391$$$24578","MCHOSE K9 ULTRA$$$14391$$$24578","MCHOSE K9 ULTRA HEADSET$$$14391$$$24577","MCHOSE V9 TURBO+$$$14391$$$24586","MCHOSE V9 TURBO HEADSET$$$14391$$$24585","MCHOSE V9 TURBO$$$14391$$$24589","MCHOSE V9 PRO 2$$$14391$$$24593","MCHOSE G9 V2-II$$$14391$$$24593","MCHOSE K20 GT$$$14391$$$24774","MCHOSE R9$$$14391$$$24595"].includes(e==null?void 0:e.toUpperCase()),f=Object.freeze({KEYBOARD:1,MOUSE:2,HEADSET:3,SPEAKER:4,MOUSE_DOCK:5,HEADSET_DOCK:6}),ie=Object.freeze({BY:1,CZ:2}),ae=Object.freeze({RY:1,FRK:2,NDK:3}),o=e=>h.global.t(e),I=()=>`
<ul class="w-flex w-flex-col w-gap-[10px]">
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-keyboard_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.keyboardSleepStatus")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.keyboardSleepStatusTips")}</p>
    </div>
  </li>
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-usb_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.needLinkUSB")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.needLinkUSBTips").replace(/\n/g,"")}</p>
    </div>
  </li>
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-wifi_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.needLinkWireless")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.needLinkWirelessMouseTips")}</p>
    </div>
  </li>
</ul>
`,R=()=>`
<ul class="w-flex w-flex-col w-gap-[10px]">
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-mouse_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.mouseSleepStatus")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.mouseSleepStatusTips")}</p>
    </div>
  </li>
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-usb_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.needLinkUSB")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.needLinkUSBTips").replace(/\n/g,"")}</p>
    </div>
  </li>
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-wifi_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-w1">${o("connectDevice.needLinkWireless")}</p>
      <p class="w-text-font12 w-text-w2">${o("connectDevice.needLinkWirelessMouseTips")}</p>
    </div>
  </li>
</ul>
`,U=()=>`
<ul class="w-flex w-flex-col w-gap-[10px]">
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-headphones_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-main">${o("connectDevice.headsetSleepStatus")}</p>
      <p class="w-text-font12 w-text-desc">${o("connectDevice.headsetSleepStatusTips")}</p>
    </div>
  </li>
  <li class="w-flex w-items-start w-gap-2">
    <i class="iconfont icon-wifi_linear device-card-disabled-icon"></i>
    <div class="w-flex w-flex-col w-gap-1">
      <p class="w-text-font13 w-font-semibold w-text-main">${o("connectDevice.headsetOnly24G")}</p>
      <p class="w-text-font12 w-text-desc">${o("connectDevice.headsetOnly24GTips")}</p>
    </div>
  </li>
</ul>
`,N=()=>`
<div>
  <p class="w-text-font13 w-text-w1">${o("connectDevice.A5UltraNeedRouse")}</p>
</div>
`,K=()=>`
<div>
  <p class="w-text-font13 w-text-w1">${o("connectDevice.k7MouseNeedRouse")}</p>
</div>
`;function P(e){return e.deviceType===f.KEYBOARD?I():e.deviceType===f.MOUSE?e.A5UltraLengthTwo===2?N():e.k7LengthTwo===2?K():R():e.deviceType===f.HEADSET?U():null}function re(e){const n=!!(e.isSleepElectron||e.connectMode==null||e.batteryLevel==="breakConnect"||e.deviceType===f.MOUSE&&(e.A5UltraLengthTwo===2||e.k7LengthTwo===2)),t=!!(e.connectMode==null||e.isBusy),s=(e.failedCount||0)>0,c=P(e);return{isInvalid:n,isLoading:t,isRetrying:s,isDisabled:n||t,helperLang:c}}const u=Object.freeze({deviceList:"webIndexList",visibleDeviceCount:"webIndexListLen",otaConfig:"pcOTAConfig"});function x(e){return e?!(e.isSleepElectron||e.connectMode==null||e.batteryLevel==="breakConnect"||e.deviceType===f.MOUSE&&(e.A5UltraLengthTwo===2||e.k7LengthTwo===2)):!1}function Y(e){return Array.isArray(e)?e.filter(x):[]}function B(e){const n=Array.isArray(e)?e:[];return JSON.parse(JSON.stringify(n))}function V(e){if(typeof(e==null?void 0:e.setData)!="function")throw new TypeError("trayService requires store.setData");let n=Promise.resolve();return{async syncDeviceList(t){const s=B(t),c=Y(s).length,r=n.then(async()=>{const i=await e.setData(u.deviceList,s,!1);if(!(i!=null&&i.success))throw new Error((i==null?void 0:i.error)||"同步托盘设备列表失败");const a=await e.setData(u.visibleDeviceCount,c,!1);if(!(a!=null&&a.success))throw new Error((a==null?void 0:a.error)||"同步托盘设备数量失败");return{deviceCount:s.length,visibleDeviceCount:c}});return n=r.catch(()=>{}),await r},async syncOTAConfig(t){const s=JSON.parse(JSON.stringify(t??{})),c=await e.setData(u.otaConfig,s,!1);if(!(c!=null&&c.success))throw new Error((c==null?void 0:c.error)||"同步托盘 OTA 配置失败");return s}}}const le=V(L()),d=Object.freeze({KEYBOARD_BY:1,MOUSE:2,HEADSET:3,SPEAKER:4,MOUSE_DOCK:5,HEADSET_DOCK:6,KEYBOARD_CZ:7}),$e=Object.freeze({AUDIO:"audio",KEYBOARD_BY:"keyboardBy",KEYBOARD_CZ:"keyboardCz",MOUSE:"mouse"}),j=Object.freeze({WIRED:"wired",WIRELESS:"wireless"}),k=Object.freeze({DESKTOP:"desktop",WEB:"web"}),fe=Object.freeze({BLK:"audio.blk",OY:"audio.oy",MC:"audio.mc",V9_TURBO:"audio.v9Turbo"}),de=Object.freeze({CMEDIA:"cmedia",THX:"thx"}),z=Object.freeze({BACKDROP:"backdrop",PRODUCT:"product"}),Ee=Object.freeze(Object.values(z)),ue=Object.freeze(Object.values(d)),pe=Object.freeze(Object.values(j)),we=Object.freeze(Object.values(k)),G=new Set([d.HEADSET,d.SPEAKER]),W=new Set([d.KEYBOARD_BY,d.MOUSE]);function F(e){return[e.productName,e.vendorId,e.productId].join("_")}function y(e){return Array.isArray(e)?e.flatMap(n=>{var i,a,p,w,O,T;if(!G.has(n.deviceType))return[];const t=((i=n.connections)==null?void 0:i.find(C=>C.connectionType==="wired"))??((a=n.connections)==null?void 0:a[0]);if(!(t!=null&&t.productName)||!Number.isFinite(t.vendorId)||!Number.isFinite(t.productId))return[];const s=(p=n.deviceState)==null?void 0:p.sleep,c=(w=n.deviceState)==null?void 0:w.battery,r=(O=n.deviceState)==null?void 0:O.chargeStatus;return[{id:`audio:${n.modelKey}`,source:"audio",modelKey:n.modelKey,logicalDeviceId:n.logicalDeviceId,deviceName:((T=n.metadata)==null?void 0:T.displayName)??n.modelKey,deviceType:n.deviceType,productName:t.productName,vendorId:t.vendorId,productId:t.productId,productKey:`${t.productName}$$$${t.vendorId}$$$${t.productId}`,connectMode:s==null?null:t.connectionType==="wired"?0:1,isSleepElectron:s===!0,batteryLevel:s===!1&&Number.isFinite(c)&&c>=0&&c<=100?c:null,chargeStatusElectron:r??null,chargeStatus:r==="charging"?1:0,batteryPrecision:10}]}):[]}function Oe(e,n){return[...Array.isArray(e)?e.filter(t=>W.has(t==null?void 0:t.deviceType)):[],...y(n)]}function Te(e,n){if(typeof e!="string"||!e)return null;const t=y(n).filter(s=>x(s)&&F(s)===e);return t.length===1?{modelKey:t[0].modelKey,logicalDeviceId:t[0].logicalDeviceId}:null}const S={debug:10,info:20,warn:30,error:40,silent:50},J=Object.freeze({level:"info",showTimestamp:!0}),l={...J,consoleTarget:console};function Z(e){const n=String(e.getHours()).padStart(2,"0"),t=String(e.getMinutes()).padStart(2,"0"),s=String(e.getSeconds()).padStart(2,"0"),c=String(e.getMilliseconds()).padStart(3,"0");return n+":"+t+":"+s+"."+c}function q(e,n){const t=["[WebDriver]","["+e.toUpperCase()+"]"];return n&&t.push("["+n+"]"),l.showTimestamp&&t.push("["+Z(new Date)+"]"),t.join(" ")}function X(e){return S[e]>=S[l.level]}function E(e,n,t){if(!X(e))return;const s=l.consoleTarget[e],c=q(e,n);if(typeof s=="function"){if(t.length===0){s.call(l.consoleTarget,c);return}if(typeof t[0]=="string"){s.call(l.consoleTarget,c+" "+t[0],...t.slice(1));return}s.call(l.consoleTarget,c,...t)}}function A(e={}){const n=typeof e=="string"?e:e.scope??"";return{scope:n,debug(t,...s){E("debug",n,[t,...s])},info(t,...s){E("info",n,[t,...s])},warn(t,...s){E("warn",n,[t,...s])},error(t,...s){E("error",n,[t,...s])},child(t){return A(n?n+":"+t:t)}}}A();export{fe as A,se as B,j as C,f as D,z as H,ie as K,ae as M,g as T,te as a,k as b,A as c,ne as d,de as e,Y as f,ce as g,d as h,oe as i,we as j,ue as k,pe as l,Ee as m,D as n,$e as o,_ as p,y as q,Te as r,H as s,re as t,b as u,F as v,P as w,le as x,Oe as y};
