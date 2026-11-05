// Shared by the build and browser runtime. Services and explicit installer
// downloads retain their manufacturer URLs; application files stay in this site.
export function localStaticPath(url) {
  if (!['cdn.mchose.com.cn', 'www.mchose.com.cn', 'www.maicong.cn'].includes(url.hostname)) return null;
  if (url.hostname === 'www.maicong.cn' && /^\/mchose(?:\/|$)/.test(url.pathname)) return null;
  if (url.hostname === 'cdn.mchose.com.cn' && /^(?:\/customPage\/(?:pre|prod)(?:\/|$)|\/systemRepair\/)/.test(url.pathname)) return null;
  if (/\.(?:exe|msi|dmg|pkg|rar|7z|psd|apk)$/i.test(url.pathname)
      || /MCHOSE_HUB_installer|VC_redist|vc_redist|Firmwaretool[^/]*\.zip$|\/exe\/|\/static\/archives\//i.test(url.pathname)) return null;
  if (!/\.(?:html|m?js|css|json|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|webm|mp4|mp3|wav|ogg|flac|glb|gltf|pdf|bin|wasm|txt|hdr|ktx2|dds|pbf|zip)$/i.test(url.pathname)) return null;
  const prefix = url.hostname === 'www.mchose.com.cn' ? '' : `vendor/${url.hostname}/`;
  return prefix + url.pathname.replace(/^\/+/, '');
}
