/**
 * Consolidated layout inline scripts.
 * Keeping these as plain string variables in a CommonJS file allows them to be required
 * and hashed dynamically in the CommonJS CSP policy builder, while also being imported
 * by TypeScript Server Components.
 */

const THEME_INIT_SCRIPT = `(function(){try{var k='mediabubble-theme';var t=localStorage.getItem(k);var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

const DEV_SW_CLEANUP_SCRIPT = `(function(){try{var RELOAD_KEY='mb-dev-sw-reloaded';var CHUNK_KEY='mb-dev-chunk-reloaded';var CHUNK_COUNT_KEY='mb-dev-chunk-reload-count';var MAX_CHUNK_RELOADS=3;function clearCaches(){if(!window.caches)return Promise.resolve();return caches.keys().then(function(k){return Promise.all(k.map(function(c){return caches.delete(c)}))})}function unregisterWorkers(){if(!('serviceWorker'in navigator))return Promise.resolve();return navigator.serviceWorker.getRegistrations().then(function(r){return Promise.all(r.map(function(x){return x.unregister()}))})}function reloadForChunkError(){var count=Number(sessionStorage.getItem(CHUNK_COUNT_KEY)||'0');if(count>=MAX_CHUNK_RELOADS)return;sessionStorage.setItem(CHUNK_COUNT_KEY,String(count+1));sessionStorage.setItem(CHUNK_KEY,'1');location.reload()}function isChunkError(msg){return msg.indexOf("reading 'call'")!==-1||msg.indexOf('ChunkLoadError')!==-1||msg.indexOf('Loading chunk')!==-1}window.addEventListener('error',function(e){var msg=(e&&e.message)||'';if(isChunkError(msg))reloadForChunkError()},true);window.addEventListener('unhandledrejection',function(e){var msg=String((e&&e.reason&&e.reason.message)||e.reason||'');if(isChunkError(msg))reloadForChunkError()});window.addEventListener('load',function(){setTimeout(function(){sessionStorage.removeItem(RELOAD_KEY);sessionStorage.removeItem(CHUNK_KEY);sessionStorage.removeItem(CHUNK_COUNT_KEY)},4000)});unregisterWorkers().then(clearCaches).then(function(){if(navigator.serviceWorker&&navigator.serviceWorker.controller){document.documentElement.style.visibility='hidden';if(sessionStorage.getItem(RELOAD_KEY)!=='1'){sessionStorage.setItem(RELOAD_KEY,'1');location.reload();return}document.documentElement.style.visibility=''}})}catch(e){}})();`;

const LANG_INIT_SCRIPT = `(function(){try{var k='mediabubble-language';var l=document.cookie.match('(^|;)\\\\s*' + k + '\\\\s*=\\\\s*([^;]+)')?.pop() || localStorage.getItem(k);if(!l){var n=navigator.language||'en';l=n.indexOf('ar')===0?'ar':'en';}var d=l.indexOf('ar')===0?'rtl':'ltr';var g=d==='rtl'?'ar':'en';document.documentElement.setAttribute('lang',g);document.documentElement.setAttribute('dir',d);document.documentElement.setAttribute('data-dir',d);}catch(e){}})();`;

const THEME_HASH = `'sha256-AngVWd5WLE28t6pDbMdyzyprEeDnIw6V5DYMSdkAQHI='`;
const DEV_SW_HASH = `'sha256-CDP56ARqNqN20roY8OaThPwxsNHLLc9hLvUP0kRd8tQ='`;
const LANG_HASH = `'sha256-s8gtWKaqPslWqKjox+ESaWQUDPMOC3gGL7HepLkekWg='`;

module.exports = {
  THEME_INIT_SCRIPT,
  THEME_HASH,
  DEV_SW_CLEANUP_SCRIPT,
  DEV_SW_HASH,
  LANG_INIT_SCRIPT,
  LANG_HASH,
};
