const original='https://cdn.mchose.com.cn/customPage/driver-ui/';
const loader=window.MC_CONFIG_GLOBAL_PROD_LOADER;
let value;try{value=await loader?.getValue();}catch{}
const version=value?.version?.__duVersion;
const url=name=>window.__mchoseMirror.assetUrl(original+name+(version?'?hash='+encodeURIComponent(version):''));
const css=document.createElement('link');css.rel='stylesheet';css.href=url('driver-ui.css');document.head.append(css);
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.append(s);});
await load(url('driver-ui.global.js'));
await load(url('vue/driver-ui.vue.js'));
await import("./assets/main-CWbC7lIt.js");
