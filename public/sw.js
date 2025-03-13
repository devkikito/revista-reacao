!function(){"use strict";var e,t;let a,r,s;let n=(e,...t)=>{let a=e;return t.length>0&&(a+=` :: ${JSON.stringify(t)}`),a};class i extends Error{details;constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}let l=e=>new URL(String(e),location.href).href.replace(RegExp(`^${location.origin}`),""),o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"serwist",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[o.prefix,e,o.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>{for(let t of Object.keys(o))e(t)},u={updateDetails:e=>{h(t=>{let a=e[t];"string"==typeof a&&(o[t]=a)})},getGoogleAnalyticsName:e=>e||c(o.googleAnalytics),getPrecacheName:e=>e||c(o.precache),getPrefix:()=>o.prefix,getRuntimeName:e=>e||c(o.runtime),getSuffix:()=>o.suffix};class d{promise;resolve;reject;constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}function f(e,t){let a=new URL(e);for(let e of t)a.searchParams.delete(e);return a.href}async function y(e,t,a,r){let s=f(t.url,a);if(t.url===s)return e.match(t,r);let n={...r,ignoreSearch:!0};for(let i of(await e.keys(t,n)))if(s===f(i.url,a))return e.match(i,r)}let w=new Set,p=async()=>{for(let e of w)await e()};function g(e){return new Promise(t=>setTimeout(t,e))}let m="-precache-",_=async(e,t=m)=>{let a=(await self.caches.keys()).filter(a=>a.includes(t)&&a.includes(self.registration.scope)&&a!==e);return await Promise.all(a.map(e=>self.caches.delete(e))),a},b=e=>{self.addEventListener("activate",t=>{t.waitUntil(_(u.getPrecacheName(e)).then(e=>{}))})},q=()=>{self.addEventListener("activate",()=>self.clients.claim())},v=(e,t)=>{let a=t();return e.waitUntil(a),a},R=(e,t)=>t.some(t=>e instanceof t),E=new WeakMap,S=new WeakMap,D=new WeakMap,P={get(e,t,a){if(e instanceof IDBTransaction){if("done"===t)return E.get(e);if("store"===t)return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return k(e[t])},set:(e,t,a)=>(e[t]=a,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function k(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,a)=>{let r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",n)},s=()=>{t(k(e.result)),r()},n=()=>{a(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",n)});return D.set(t,e),t}(e);if(S.has(e))return S.get(e);let a="function"==typeof(t=e)?(s||(s=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(C(this),e),k(this.request)}:function(...e){return k(t.apply(C(this),e))}:(t instanceof IDBTransaction&&function(e){if(E.has(e))return;let t=new Promise((t,a)=>{let r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",n),e.removeEventListener("abort",n)},s=()=>{t(),r()},n=()=>{a(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",n),e.addEventListener("abort",n)});E.set(e,t)}(t),R(t,r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,P):t;return a!==e&&(S.set(e,a),D.set(a,e)),a}let C=e=>D.get(e),T=["get","getKey","getAll","getAllKeys","count"],I=["put","add","delete","clear"],N=new Map;function x(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(N.get(t))return N.get(t);let a=t.replace(/FromIndex$/,""),r=t!==a,s=I.includes(a);if(!(a in(r?IDBIndex:IDBObjectStore).prototype)||!(s||T.includes(a)))return;let n=async function(e,...t){let n=this.transaction(e,s?"readwrite":"readonly"),i=n.store;return r&&(i=i.index(t.shift())),(await Promise.all([i[a](...t),s&&n.done]))[0]};return N.set(t,n),n}P={...e=P,get:(t,a,r)=>x(t,a)||e.get(t,a,r),has:(t,a)=>!!x(t,a)||e.has(t,a)};let L=["continue","continuePrimaryKey","advance"],U={},K=new WeakMap,B=new WeakMap,F={get(e,t){if(!L.includes(t))return e[t];let a=U[t];return a||(a=U[t]=function(...e){K.set(this,B.get(this)[t](...e))}),a}};async function*A(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;let a=new Proxy(t,F);for(B.set(a,t),D.set(a,C(t));t;)yield a,t=await (K.get(a)||t.continue()),K.delete(a)}function O(e,t){return t===Symbol.asyncIterator&&R(e,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===t&&R(e,[IDBIndex,IDBObjectStore])}P={...t=P,get:(e,a,r)=>O(e,a)?A:t.get(e,a,r),has:(e,a)=>O(e,a)||t.has(e,a)};let M=e=>e&&"object"==typeof e?e:{handle:e};class W{handler;match;method;catchHandler;constructor(e,t,a="GET"){this.handler=M(t),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=M(e)}}class j extends W{_allowlist;_denylist;constructor(e,{allowlist:t=[/./],denylist:a=[]}={}){super(e=>this._match(e),e),this._allowlist=t,this._denylist=a}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;let a=e.pathname+e.search;for(let e of this._denylist)if(e.test(a))return!1;return!!this._allowlist.some(e=>e.test(a))}}let H=(e,t=[])=>{for(let a of[...e.searchParams.keys()])t.some(e=>e.test(a))&&e.searchParams.delete(a);return e};class $ extends W{constructor(e,t,a){super(({url:t})=>{let a=e.exec(t.href);if(a&&(t.origin===location.origin||0===a.index))return a.slice(1)},t,a)}}let G=async(e,t,a)=>{let r=t.map((e,t)=>({index:t,item:e})),s=async e=>{let t=[];for(;;){let s=r.pop();if(!s)return e(t);let n=await a(s.item);t.push({result:n,index:s.index})}},n=Array.from({length:e},()=>new Promise(s));return(await Promise.all(n)).flat().sort((e,t)=>e.index<t.index?-1:1).map(e=>e.result)},V=()=>{self.__WB_DISABLE_DEV_LOGS=!0};function Q(e){return"string"==typeof e?new Request(e):e}class z{event;request;url;params;_cacheKeys={};_strategy;_handlerDeferred;_extendLifetimePromises;_plugins;_pluginStateMap;constructor(e,t){for(let a of(this.event=t.event,this.request=t.request,t.url&&(this.url=t.url,this.params=t.params),this._strategy=e,this._handlerDeferred=new d,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(a,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,a=Q(e);if("navigate"===a.mode&&t instanceof FetchEvent&&t.preloadResponse){let e=await t.preloadResponse;if(e)return e}let r=this.hasCallback("fetchDidFail")?a.clone():null;try{for(let e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:t})}catch(e){if(e instanceof Error)throw new i("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}let s=a.clone();try{let e;for(let r of(e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))e=await r({event:t,request:s,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:r.clone(),request:s.clone()}),e}}async fetchAndCachePut(e){let t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}async cacheMatch(e){let t;let a=Q(e),{cacheName:r,matchOptions:s}=this._strategy,n=await this.getCacheKey(a,"read"),i={...s,cacheName:r};for(let e of(t=await caches.match(n,i),this.iterateCallbacks("cachedResponseWillBeUsed")))t=await e({cacheName:r,matchOptions:s,cachedResponse:t,request:n,event:this.event})||void 0;return t}async cachePut(e,t){let a=Q(e);await g(0);let r=await this.getCacheKey(a,"write");if(!t)throw new i("cache-put-with-no-response",{url:l(r.url)});let s=await this._ensureResponseSafeToCache(t);if(!s)return!1;let{cacheName:n,matchOptions:o}=this._strategy,c=await self.caches.open(n),h=this.hasCallback("cacheDidUpdate"),u=h?await y(c,r.clone(),["__WB_REVISION__"],o):null;try{await c.put(r,h?s.clone():s)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await p(),e}for(let e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:n,oldResponse:u,newResponse:s.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){let a=`${e.url} | ${t}`;if(!this._cacheKeys[a]){let r=e;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))r=Q(await e({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[a]=r}return this._cacheKeys[a]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if("function"==typeof t[e]){let a=this._pluginStateMap.get(t),r=r=>{let s={...r,state:a};return t[e](s)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(let e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return!a&&t&&200!==t.status&&(t=void 0),t}}class J{cacheName;plugins;fetchOptions;matchOptions;constructor(e={}){this.cacheName=u.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,a="string"==typeof e.request?new Request(e.request):e.request,r=new z(this,e.url?{event:t,request:a,url:e.url,params:e.params}:{event:t,request:a}),s=this._getResponse(r,a,t),n=this._awaitComplete(s,r,a,t);return[s,n]}async _getResponse(e,t,a){let r;await e.runCallbacks("handlerWillStart",{event:a,request:t});try{if(r=await this._handle(t,e),void 0===r||"error"===r.type)throw new i("no-response",{url:t.url})}catch(s){if(s instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(void 0!==(r=await n({error:s,event:a,request:t})))break}if(!r)throw s}for(let s of e.iterateCallbacks("handlerWillRespond"))r=await s({event:a,request:t,response:r});return r}async _awaitComplete(e,t,a,r){let s,n;try{s=await e}catch(e){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:a,response:s}),await t.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:a,response:s,error:n}),t.destroy(),n)throw n}}let X={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class Y extends J{_networkTimeoutSeconds;constructor(e={}){super(e),this.plugins.some(e=>"cacheWillUpdate"in e)||this.plugins.unshift(X),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let a;let r=[],s=[];if(this._networkTimeoutSeconds){let{id:n,promise:i}=this._getTimeoutPromise({request:e,logs:r,handler:t});a=n,s.push(i)}let n=this._getNetworkPromise({timeoutId:a,request:e,logs:r,handler:t});s.push(n);let l=await t.waitUntil((async()=>await t.waitUntil(Promise.race(s))||await n)());if(!l)throw new i("no-response",{url:e.url});return l}_getTimeoutPromise({request:e,logs:t,handler:a}){let r;return{promise:new Promise(t=>{r=setTimeout(async()=>{t(await a.cacheMatch(e))},1e3*this._networkTimeoutSeconds)}),id:r}}async _getNetworkPromise({timeoutId:e,request:t,logs:a,handler:r}){let s,n;try{n=await r.fetchAndCachePut(t)}catch(e){e instanceof Error&&(s=e)}return e&&clearTimeout(e),(s||!n)&&(n=await r.cacheMatch(t)),n}}class Z extends J{_networkTimeoutSeconds;constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let a,r;try{let r=[t.fetch(e)];if(this._networkTimeoutSeconds){let e=g(1e3*this._networkTimeoutSeconds);r.push(e)}if(!(a=await Promise.race(r)))throw Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(e){e instanceof Error&&(r=e)}if(!a)throw new i("no-response",{url:e.url,error:r});return a}}let ee="requests",et="queueName";class ea{_db=null;async addEntry(e){let t=(await this.getDb()).transaction(ee,"readwrite",{durability:"relaxed"});await t.store.add(e),await t.done}async getFirstEntryId(){let e=await this.getDb(),t=await e.transaction(ee).store.openCursor();return t?.value.id}async getAllEntriesByQueueName(e){let t=await this.getDb();return await t.getAllFromIndex(ee,et,IDBKeyRange.only(e))||[]}async getEntryCountByQueueName(e){return(await this.getDb()).countFromIndex(ee,et,IDBKeyRange.only(e))}async deleteEntry(e){let t=await this.getDb();await t.delete(ee,e)}async getFirstEntryByQueueName(e){return await this.getEndEntryFromIndex(IDBKeyRange.only(e),"next")}async getLastEntryByQueueName(e){return await this.getEndEntryFromIndex(IDBKeyRange.only(e),"prev")}async getEndEntryFromIndex(e,t){let a=await this.getDb(),r=await a.transaction(ee).store.index(et).openCursor(e,t);return r?.value}async getDb(){return this._db||(this._db=await function(e,t,{blocked:a,upgrade:r,blocking:s,terminated:n}={}){let i=indexedDB.open(e,3),l=k(i);return r&&i.addEventListener("upgradeneeded",e=>{r(k(i.result),e.oldVersion,e.newVersion,k(i.transaction),e)}),a&&i.addEventListener("blocked",e=>a(e.oldVersion,e.newVersion,e)),l.then(e=>{n&&e.addEventListener("close",()=>n()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),l}("serwist-background-sync",0,{upgrade:this._upgradeDb})),this._db}_upgradeDb(e,t){t>0&&t<3&&e.objectStoreNames.contains(ee)&&e.deleteObjectStore(ee),e.createObjectStore(ee,{autoIncrement:!0,keyPath:"id"}).createIndex(et,et,{unique:!1})}}class er{_queueName;_queueDb;constructor(e){this._queueName=e,this._queueDb=new ea}async pushEntry(e){delete e.id,e.queueName=this._queueName,await this._queueDb.addEntry(e)}async unshiftEntry(e){let t=await this._queueDb.getFirstEntryId();t?e.id=t-1:delete e.id,e.queueName=this._queueName,await this._queueDb.addEntry(e)}async popEntry(){return this._removeEntry(await this._queueDb.getLastEntryByQueueName(this._queueName))}async shiftEntry(){return this._removeEntry(await this._queueDb.getFirstEntryByQueueName(this._queueName))}async getAll(){return await this._queueDb.getAllEntriesByQueueName(this._queueName)}async size(){return await this._queueDb.getEntryCountByQueueName(this._queueName)}async deleteEntry(e){await this._queueDb.deleteEntry(e)}async _removeEntry(e){return e&&await this.deleteEntry(e.id),e}}let es=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class en{_requestData;static async fromRequest(e){let t={url:e.url,headers:{}};for(let a of("GET"!==e.method&&(t.body=await e.clone().arrayBuffer()),e.headers.forEach((e,a)=>{t.headers[a]=e}),es))void 0!==e[a]&&(t[a]=e[a]);return new en(t)}constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this._requestData=e}toObject(){let e=Object.assign({},this._requestData);return e.headers=Object.assign({},this._requestData.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this._requestData.url,this._requestData)}clone(){return new en(this.toObject())}}let ei="serwist-background-sync",el=new Set,eo=e=>{let t={request:new en(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class ec{_name;_onSync;_maxRetentionTime;_queueStore;_forceSyncFallback;_syncInProgress=!1;_requestsAddedDuringSync=!1;constructor(e,{forceSyncFallback:t,onSync:a,maxRetentionTime:r}={}){if(el.has(e))throw new i("duplicate-queue-name",{name:e});el.add(e),this._name=e,this._onSync=a||this.replayRequests,this._maxRetentionTime=r||10080,this._forceSyncFallback=!!t,this._queueStore=new er(this._name),this._addSyncListener()}get name(){return this._name}async pushRequest(e){await this._addRequest(e,"push")}async unshiftRequest(e){await this._addRequest(e,"unshift")}async popRequest(){return this._removeRequest("pop")}async shiftRequest(){return this._removeRequest("shift")}async getAll(){let e=await this._queueStore.getAll(),t=Date.now(),a=[];for(let r of e){let e=6e4*this._maxRetentionTime;t-r.timestamp>e?await this._queueStore.deleteEntry(r.id):a.push(eo(r))}return a}async size(){return await this._queueStore.size()}async _addRequest({request:e,metadata:t,timestamp:a=Date.now()},r){let s={requestData:(await en.fromRequest(e.clone())).toObject(),timestamp:a};switch(t&&(s.metadata=t),r){case"push":await this._queueStore.pushEntry(s);break;case"unshift":await this._queueStore.unshiftEntry(s)}this._syncInProgress?this._requestsAddedDuringSync=!0:await this.registerSync()}async _removeRequest(e){let t;let a=Date.now();switch(e){case"pop":t=await this._queueStore.popEntry();break;case"shift":t=await this._queueStore.shiftEntry()}if(t){let r=6e4*this._maxRetentionTime;return a-t.timestamp>r?this._removeRequest(e):eo(t)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(t){throw await this.unshiftRequest(e),new i("queue-replay-failed",{name:this._name})}}async registerSync(){if("sync"in self.registration&&!this._forceSyncFallback)try{await self.registration.sync.register(`${ei}:${this._name}`)}catch(e){}}_addSyncListener(){"sync"in self.registration&&!this._forceSyncFallback?self.addEventListener("sync",e=>{if(e.tag===`${ei}:${this._name}`){let t=async()=>{let t;this._syncInProgress=!0;try{await this._onSync({queue:this})}catch(e){if(e instanceof Error)throw e}finally{this._requestsAddedDuringSync&&!(t&&!e.lastChance)&&await this.registerSync(),this._syncInProgress=!1,this._requestsAddedDuringSync=!1}};e.waitUntil(t())}}):this._onSync({queue:this})}static get _queueNames(){return el}}class eh{_queue;constructor(e,t){this._queue=new ec(e,t)}async fetchDidFail({request:e}){await this._queue.pushRequest({request:e})}}let eu=async(e,t)=>{let r=null;if(e.url&&(r=new URL(e.url).origin),r!==self.location.origin)throw new i("cross-origin-copy-response",{origin:r});let s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},l=t?t(n):n,o=!function(){if(void 0===a){let e=new Response("");if("body"in e)try{new Response(e.body),a=!0}catch(e){a=!1}a=!1}return a}()?await s.blob():s.body;return new Response(o,l)};class ed extends J{_fallbackToNetwork;static defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e};static copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await eu(e):e};constructor(e={}){e.cacheName=u.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(ed.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let a;let r=t.params||{};if(this._fallbackToNetwork){let s=r.integrity,n=e.integrity,i=!n||n===s;a=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?n||s:void 0})),s&&i&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,a.clone()))}else throw new i("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let a=await t.fetch(e);if(!await t.cachePut(e,a.clone()))throw new i("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[a,r]of this.plugins.entries())r!==ed.copyRedirectedCacheableResponsesPlugin&&(r===ed.defaultPrecacheCacheabilityPlugin&&(e=a),r.cacheWillUpdate&&t++);0===t?this.plugins.push(ed.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}let ef=()=>!!self.registration?.navigationPreload,ey=e=>{ef()&&self.addEventListener("activate",t=>{t.waitUntil(self.registration.navigationPreload.enable().then(()=>{e&&self.registration.navigationPreload.setHeaderValue(e)}))})},ew=e=>{u.updateDetails(e)};class ep{updatedURLs=[];notUpdatedURLs=[];handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)};cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:a})=>{if("install"===e.type&&t?.originalRequest&&t.originalRequest instanceof Request){let e=t.originalRequest.url;a?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return a}}let eg=e=>{if(!e)throw new i("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){let t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}let{revision:t,url:a}=e;if(!a)throw new i("add-to-cache-list-unexpected-type",{entry:e});if(!t){let e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}let r=new URL(a,location.href),s=new URL(a,location.href);return r.searchParams.set("__WB_REVISION__",t),{cacheKey:r.href,url:s.href}},em=(e,t,a)=>{if("string"==typeof e){let r=new URL(e,location.href);return new W(({url:e})=>e.href===r.href,t,a)}if(e instanceof RegExp)return new $(e,t,a);if("function"==typeof e)return new W(e,t,a);if(e instanceof W)return e;throw new i("unsupported-route-type",{moduleName:"serwist",funcName:"parseRoute",paramName:"capture"})};class e_ extends W{constructor(e,t){super(({request:a})=>{let r=e.getUrlsToPrecacheKeys();for(let s of function*(e,{directoryIndex:t="index.html",ignoreURLParametersMatching:a=[/^utm_/,/^fbclid$/],cleanURLs:r=!0,urlManipulation:s}={}){let n=new URL(e,location.href);n.hash="",yield n.href;let i=H(n,a);if(yield i.href,t&&i.pathname.endsWith("/")){let e=new URL(i.href);e.pathname+=t,yield e.href}if(r){let e=new URL(i.href);e.pathname+=".html",yield e.href}if(s)for(let e of s({url:n}))yield e.href}(a.url,t)){let t=r.get(s);if(t){let a=e.getIntegrityForPrecacheKey(t);return{cacheKey:t,integrity:a}}}},e.precacheStrategy)}}let eb="www.google-analytics.com",eq="www.googletagmanager.com",ev=/^\/(\w+\/)?collect/,eR=e=>async({queue:t})=>{let a;for(;a=await t.shiftRequest();){let{request:r,timestamp:s}=a,n=new URL(r.url);try{let t="POST"===r.method?new URLSearchParams(await r.clone().text()):n.searchParams,a=s-(Number(t.get("qt"))||0),i=Date.now()-a;if(t.set("qt",String(i)),e.parameterOverrides)for(let a of Object.keys(e.parameterOverrides)){let r=e.parameterOverrides[a];t.set(a,r)}"function"==typeof e.hitFilter&&e.hitFilter.call(null,t),await fetch(new Request(n.origin+n.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(e){throw await t.unshiftRequest(a),e}}},eE=e=>{let t=({url:e})=>e.hostname===eb&&ev.test(e.pathname),a=new Z({plugins:[e]});return[new W(t,a,"GET"),new W(t,a,"POST")]},eS=e=>new W(({url:e})=>e.hostname===eb&&"/analytics.js"===e.pathname,new Y({cacheName:e}),"GET"),eD=e=>new W(({url:e})=>e.hostname===eq&&"/gtag/js"===e.pathname,new Y({cacheName:e}),"GET"),eP=e=>new W(({url:e})=>e.hostname===eq&&"/gtm.js"===e.pathname,new Y({cacheName:e}),"GET"),ek=({serwist:e,cacheName:t,...a})=>{let r=u.getGoogleAnalyticsName(t),s=new eh("serwist-google-analytics",{maxRetentionTime:2880,onSync:eR(a)});for(let t of[eP(r),eS(r),eD(r),...eE(s)])e.registerRoute(t)};class eC{_fallbackUrls;_serwist;constructor({fallbackUrls:e,serwist:t}){this._fallbackUrls=e,this._serwist=t}async handlerDidError(e){for(let t of this._fallbackUrls)if("string"==typeof t){let e=await this._serwist.matchPrecache(t);if(void 0!==e)return e}else if(t.matcher(e)){let e=await this._serwist.matchPrecache(t.url);if(void 0!==e)return e}}}class eT{_precacheController;constructor({precacheController:e}){this._precacheController=e}cacheKeyWillBeUsed=async({request:e,params:t})=>{let a=t?.cacheKey||this._precacheController.getPrecacheKeyForUrl(e.url);return a?new Request(a,{headers:e.headers}):e}}class eI{_urlsToCacheKeys=new Map;_urlsToCacheModes=new Map;_cacheKeysToIntegrities=new Map;_concurrentPrecaching;_precacheStrategy;_routes;_defaultHandlerMap;_catchHandler;constructor({precacheEntries:e,precacheOptions:t,skipWaiting:a=!1,importScripts:r,navigationPreload:s=!1,cacheId:n,clientsClaim:i=!1,runtimeCaching:l,offlineAnalyticsConfig:o,disableDevLogs:c=!1,fallbacks:h}={}){if(this._concurrentPrecaching=t?.concurrency??10,this._precacheStrategy=new ed({cacheName:u.getPrecacheName(t?.cacheName),plugins:[...t?.plugins??[],new eT({precacheController:this})],fallbackToNetwork:t?.fallbackToNetwork}),this._routes=new Map,this._defaultHandlerMap=new Map,this.handleInstall=this.handleInstall.bind(this),this.handleActivate=this.handleActivate.bind(this),this.handleFetch=this.handleFetch.bind(this),this.handleCache=this.handleCache.bind(this),r&&r.length>0&&self.importScripts(...r),s&&ey(),void 0!==n&&ew({prefix:n}),a?self.skipWaiting():self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),i&&q(),e&&e.length>0&&this.addToPrecacheList(e),t?.cleanupOutdatedCaches&&b(t?.cacheName),this.registerRoute(new e_(this,t)),t?.navigateFallback&&this.registerRoute(new j(this.createHandlerBoundToUrl(t?.navigateFallback),{allowlist:t?.navigateFallbackAllowlist,denylist:t?.navigateFallbackDenylist})),void 0!==o&&("boolean"==typeof o?o&&ek({serwist:this}):ek({...o,serwist:this})),void 0!==l){if(void 0!==h){let e=new eC({fallbackUrls:h.entries,serwist:this});l.forEach(t=>{t.handler instanceof J&&!t.handler.plugins.some(e=>"handlerDidError"in e)&&t.handler.plugins.push(e)})}for(let e of l)this.registerCapture(e.matcher,e.handler,e.method)}c&&V()}get precacheStrategy(){return this._precacheStrategy}get routes(){return this._routes}addEventListeners(){self.addEventListener("install",this.handleInstall),self.addEventListener("activate",this.handleActivate),self.addEventListener("fetch",this.handleFetch),self.addEventListener("message",this.handleCache)}addToPrecacheList(e){let t=[];for(let a of e){"string"==typeof a?t.push(a):a&&!a.integrity&&void 0===a.revision&&t.push(a.url);let{cacheKey:e,url:r}=eg(a),s="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new i("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new i("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,a.integrity)}this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,s),t.length>0&&console.warn(`Serwist is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`)}}handleInstall(e){return v(e,async()=>{let t=new ep;this.precacheStrategy.plugins.push(t),await G(this._concurrentPrecaching,Array.from(this._urlsToCacheKeys.entries()),async([t,a])=>{let r=this._cacheKeysToIntegrities.get(a),s=this._urlsToCacheModes.get(t),n=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});await Promise.all(this.precacheStrategy.handleAll({event:e,request:n,url:new URL(n.url),params:{cacheKey:a}}))});let{updatedURLs:a,notUpdatedURLs:r}=t;return{updatedURLs:a,notUpdatedURLs:r}})}handleActivate(e){return v(e,async()=>{let e=await self.caches.open(this.precacheStrategy.cacheName),t=await e.keys(),a=new Set(this._urlsToCacheKeys.values()),r=[];for(let s of t)a.has(s.url)||(await e.delete(s),r.push(s.url));return{deletedCacheRequests:r}})}handleFetch(e){let{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)}handleCache(e){if(e.data&&"CACHE_URLS"===e.data.type){let{payload:t}=e.data,a=Promise.all(t.urlsToCache.map(t=>{let a;return a="string"==typeof t?new Request(t):new Request(...t),this.handleRequest({request:a,event:e})}));e.waitUntil(a),e.ports?.[0]&&a.then(()=>e.ports[0].postMessage(!0))}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,M(e))}setCatchHandler(e){this._catchHandler=M(e)}registerCapture(e,t,a){let r=em(e,t,a);return this.registerRoute(r),r}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new i("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new i("unregister-route-route-not-registered")}getUrlsToPrecacheKeys(){return this._urlsToCacheKeys}getPrecachedUrls(){return[...this._urlsToCacheKeys.keys()]}getPrecacheKeyForUrl(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForPrecacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,a=this.getPrecacheKeyForUrl(t);if(a)return(await self.caches.open(this.precacheStrategy.cacheName)).match(a)}createHandlerBoundToUrl(e){let t=this.getPrecacheKeyForUrl(e);if(!t)throw new i("non-precached-url",{url:e});return a=>(a.request=new Request(e),a.params={cacheKey:t,...a.params},this.precacheStrategy.handle(a))}handleRequest({request:e,event:t}){let a;let r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;let s=r.origin===location.origin,{params:n,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:r}),l=i?.handler,o=e.method;if(!l&&this._defaultHandlerMap.has(o)&&(l=this._defaultHandlerMap.get(o)),!l)return;try{a=l.handle({url:r,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}let c=i?.catchHandler;return a instanceof Promise&&(this._catchHandler||c)&&(a=a.catch(async a=>{if(c)try{return await c.handle({url:r,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:t});throw a})),a}findMatchingRoute({url:e,sameOrigin:t,request:a,event:r}){for(let s of this._routes.get(a.method)||[]){let n;let i=s.match({url:e,sameOrigin:t,request:a,event:r});if(i)return Array.isArray(n=i)&&0===n.length?n=void 0:i.constructor===Object&&0===Object.keys(i).length?n=void 0:"boolean"==typeof i&&(n=void 0),{route:s,params:n}}return{}}}"undefined"!=typeof navigator&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent),new eI({precacheEntries:[{'revision':'cdc30cfbf402837a013a875351377750','url':'/_next/static/3e2gB791pvmQt4-GceBPN/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/3e2gB791pvmQt4-GceBPN/_ssgManifest.js'},{'revision':null,'url':'/_next/static/chunks/126-7f1b4a6ba154e0d7.js'},{'revision':null,'url':'/_next/static/chunks/175.a5f4b8e05b984c5c.js'},{'revision':null,'url':'/_next/static/chunks/193-47efab641d00fa76.js'},{'revision':null,'url':'/_next/static/chunks/273.d8e3562bfbefadc1.js'},{'revision':null,'url':'/_next/static/chunks/407.9f27f26c1a5e67c9.js'},{'revision':null,'url':'/_next/static/chunks/44c83eb9-d4bec78e82b6d753.js'},{'revision':null,'url':'/_next/static/chunks/486-3d788334b98e7652.js'},{'revision':null,'url':'/_next/static/chunks/495-cae97dade4d63f32.js'},{'revision':null,'url':'/_next/static/chunks/499-3f0dd46e8977710a.js'},{'revision':null,'url':'/_next/static/chunks/566-d607d67cb2dd165c.js'},{'revision':null,'url':'/_next/static/chunks/617.f97703d9362f18f1.js'},{'revision':null,'url':'/_next/static/chunks/636-10236e01c89ec807.js'},{'revision':null,'url':'/_next/static/chunks/65-c39395123c0ee152.js'},{'revision':null,'url':'/_next/static/chunks/674.83d8886daac9ca5a.js'},{'revision':null,'url':'/_next/static/chunks/714-8fd97fce536f47de.js'},{'revision':null,'url':'/_next/static/chunks/780.4d082e6f9e2647b7.js'},{'revision':null,'url':'/_next/static/chunks/827-d087972bdd0b32fd.js'},{'revision':null,'url':'/_next/static/chunks/84fbfe7f-16227c1cd5ee96ad.js'},{'revision':null,'url':'/_next/static/chunks/859-09201119db7ecbbe.js'},{'revision':null,'url':'/_next/static/chunks/933-a9f7984442facaa4.js'},{'revision':null,'url':'/_next/static/chunks/942.48d752c4b7c34bde.js'},{'revision':null,'url':'/_next/static/chunks/990-9657799824a01c2b.js'},{'revision':null,'url':'/_next/static/chunks/app/(root)/page-bdf73b764b004380.js'},{'revision':null,'url':'/_next/static/chunks/app/boletim-da-tv-reacao/page-402b4cab1873b631.js'},{'revision':null,'url':'/_next/static/chunks/app/edicoes/page-3225956ab2fe0b97.js'},{'revision':null,'url':'/_next/static/chunks/app/layout-9a92fcb2212c0aa6.js'},{'revision':null,'url':'/_next/static/chunks/app/not-found-f4b1fc9c3e5db8ca.js'},{'revision':null,'url':'/_next/static/chunks/app/noticias/%5Bcategory%5D/page-f15389b19fbe27bc.js'},{'revision':null,'url':'/_next/static/chunks/app/noticias/noticia/page-7670d4029846c80a.js'},{'revision':null,'url':'/_next/static/chunks/app/noticias/page-5294f3d6cb52197a.js'},{'revision':null,'url':'/_next/static/chunks/app/politicas-privacidade/page-5d30eacc204b08e4.js'},{'revision':null,'url':'/_next/static/chunks/app/premio-carro-do-ano/page-0b3b76a9439b298d.js'},{'revision':null,'url':'/_next/static/chunks/app/vagas-emprego/page-d8a33bee6637c32a.js'},{'revision':null,'url':'/_next/static/chunks/c2506c89-2485ffde91621f0e.js'},{'revision':null,'url':'/_next/static/chunks/c465da65-f4d598eeca77af2f.js'},{'revision':null,'url':'/_next/static/chunks/cfeffc86-43ba34a151c749ce.js'},{'revision':null,'url':'/_next/static/chunks/da31e3a9-0c64209d26949273.js'},{'revision':null,'url':'/_next/static/chunks/e1bbbf97-827eff8d7ab273e4.js'},{'revision':null,'url':'/_next/static/chunks/framework-6e06c675866dc992.js'},{'revision':null,'url':'/_next/static/chunks/main-app-03d47fd40ef7aca9.js'},{'revision':null,'url':'/_next/static/chunks/main-be99dcd47994fe83.js'},{'revision':null,'url':'/_next/static/chunks/pages/_app-e474697bd5d7c030.js'},{'revision':null,'url':'/_next/static/chunks/pages/_error-bdf92bfa8c16b4e8.js'},{'revision':'837c0df77fd5009c9e46d446188ecfd0','url':'/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js'},{'revision':null,'url':'/_next/static/chunks/webpack-f9abe756d7dbd106.js'},{'revision':null,'url':'/_next/static/css/ba1f6139a211fe8b.css'},{'revision':'0e46e732cced180e3a2c7285100f27d4','url':'/_next/static/media/e11418ac562b8ac1-s.p.woff2'},{'revision':'d0e2694a6ed1ec23baf146067aa8026d','url':'/ico\\google-translate.svg'},{'revision':'2770e41f96845033a68a7ee74c4eddd0','url':'/ico\\google-translateDark.svg'},{'revision':'39c23e9eb10a2ff1b13cbb816b318c36','url':'/ico\\libras.svg'},{'revision':'7c41d37c413b488a5d3a97e96fdd431b','url':'/ico\\librasDark.svg'},{'revision':'4facf41dbb789fceefcd343fe1dddf04','url':'/ico\\school.png'},{'revision':'ac15515e90c5544b4dcc83a6598d7974','url':'/ico\\speaker.svg'},{'revision':'8815260cba0a2bca32cd436c39af9089','url':'/ico\\speakerDark.svg'},{'revision':'9fbd75364811bf077cee7b018e371804','url':'/img\\BIOMOB-BRANCA.png'},{'revision':'f674f4ff03f42f1eac130e68c2e89a96','url':'/img\\Circulos.svg'},{'revision':'eed97d35b25054447bdfec39b37d5ab8','url':'/img\\LOGO-ABERTA.png'},{'revision':'eed97d35b25054447bdfec39b37d5ab8','url':'/img\\LOGO-ABERTALIGHT.png'},{'revision':'d6e604f771f2897aa2eec5ab2864763e','url':'/img\\capa.png'},{'revision':'e039aec4d4463fa82da85c3d87c51b3e','url':'/img\\libras-icon copy.svg'},{'revision':'00b1b61812fa6dac16d8d4c224424c0a','url':'/img\\libras-icon-dark.svg'},{'revision':'646687f476a284613608a9094258f440','url':'/img\\libras-icon.svg'},{'revision':'5673bbc4cb2d999381cc900fae1bcc79','url':'/img\\logo_certificado_biomob.svg'},{'revision':'d08b53d3c98788211a712b57ef8e55cc','url':'/img\\logo_site_amigo_surdo.svg'},{'revision':'a00f2991d93e8bf8d7baa6e0c4fd0522','url':'/img\\publicidade\\hyundai-anuncios\\1243X346_CRETA-PCD - CAOA.jpg'},{'revision':'3c2039248bea23a7a66676b7f2bfb42d','url':'/img\\publicidade\\hyundai-anuncios\\BANNER-PCD-CRETA-HB20.jpg'},{'revision':'adfe9d9c9ae37f11271b795788e6376d','url':'/img\\publicidade\\hyundai-anuncios\\BANNER_1243X346PX copy.jpg'},{'revision':'33cbed930305006ab65399ad9eab9874','url':'/img\\publicidade\\hyundai-anuncios\\HYUNDAI - Banner 336x80_300dpi-1.png'},{'revision':'6d53dfd5888d21298556b054d8004fcf','url':'/img\\publicidade\\musica_inclusiva.webp'},{'revision':'69dd3b2ba0f92c76e3efd68f218abc16','url':'/img\\temp\\sorteio\\2LIVROS.png'},{'revision':'a27e67bc898a5c5d00b10c4d2316d60b','url':'/img\\temp\\sorteio\\3canecas.jpeg'},{'revision':'c4f06376a8b5aac093a3ee69d1c8b0a6','url':'/img\\temp\\sorteio\\CANECA.png'},{'revision':'dde833eaf0deaeeee5e7558bfed5cd75','url':'/img\\temp\\sorteio\\CANECATVREACAO.png'},{'revision':'2974973dd5920257b39ae4d1a6347151','url':'/img\\temp\\sorteio\\LIVROCANECA.jpeg'},{'revision':'4bb7763613956037e36a9795fbc2a6d3','url':'/img\\temp\\sorteio\\LIVROS.png'},{'revision':'422060bb2180e8882f8783651b59e7cc','url':'/img\\temp\\sorteio\\SORTEIO.jpeg'},{'revision':'3a4f92b17fc818f7abf40fa7c06a6053','url':'/img\\temp\\sorteio\\caneca-move-desenvolvimento.jpeg'},{'revision':'2c00b3d3ff1e16fe963c2820411dacfd','url':'/img\\temp\\sorteio\\smartwatch.png'},{'revision':'ac82720ac86f47345b97da90aff3c7d7','url':'/img\\temp\\sorteio\\sorteioLivro.png'},{'revision':'49b9f18a44c54a10a314b45cdfecafe1','url':'/img\\temp\\temp.png'},{'revision':'bf748558b051f1c25bfca9ce0d1f4318','url':'/manifest.json'},{'revision':'0e21a7ce9adad964b121097b9e186ca7','url':'/noticias\\desfileCapaTemp.png'},{'revision':'4dffcebbd6e18c1e88b388eb35f2ec9b','url':'/noticias\\facebook_compartilhar.svg'},{'revision':'dbb23e5dc8fe6be4ba95d70742b3465b','url':'/noticias\\instagram_compartilhar.svg'},{'revision':'9681caff930b687c8e466739d53afea7','url':'/noticias\\rectangle_blue.svg'},{'revision':'fa8bcfd209b84c7f6e63f10baf88ee96','url':'/noticias\\whatsapp_compartilhar.svg'},{'revision':'f53f08560a2170212d27cfffe44bc2cf','url':'/temp\\anuncios\\citroen\\banner basalt_1800x300-HORIZ.png'},{'revision':'0b61e003f619e6c16ed1f75ffc0c4e7a','url':'/temp\\anuncios\\citroen\\banneraircross_1800x300.png'},{'revision':'e753831a35c9ccfc772cb5fd13494cd0','url':'/temp\\anuncios\\clinicasantissima\\clinicasantissima.jpeg'},{'revision':'0889edcf3ee6411ae6ff7a025bcf4e07','url':'/temp\\anuncios\\hyundai-anuncios\\AFO_2110_POST.jpg'},{'revision':'4c3c617014bc8dc5444cd2374b79a7a9','url':'/temp\\anuncios\\hyundai-anuncios\\hyundainovo.jpg'},{'revision':'4c32e32fec49c555c6981fb3a4b64a0d','url':'/temp\\anuncios\\jeep-acessivel-anuncios\\18682_banner-horizontal_1800x300_mm_jeep_pcd-a.jpg'},{'revision':'e6c1b1746b982e1f213c2ef6e4d080e6','url':'/temp\\anuncios\\jeep-acessivel-anuncios\\jeep.jpeg'},{'revision':'b5e2c0e8f76ea38dc98cf093f1ec5a5c','url':'/temp\\anuncios\\nissan\\KICKS.jpeg'},{'revision':'d1a9289ce4a80e00ea6e250bc11ee0a5','url':'/temp\\carro-do-ano\\LOGO CARRO DO ANO - 2024.jpg'},{'revision':'471fcd47a276bd522f9bcb75713eb441','url':'/temp\\carro-do-ano\\compacto_black.png'},{'revision':'3acb01e5c9df1acee976a290ade6ba5e','url':'/temp\\carro-do-ano\\eletrico_black.png'},{'revision':'8b0374eab996cd7c184b8c5f2a34d56c','url':'/temp\\carro-do-ano\\modelo-passeio.png'},{'revision':'12a605a5d7def21cf983170869dd661c','url':'/temp\\carro-do-ano\\modelo-suv.png'},{'revision':'efaa528a5da1bc1b45009ffcd866dccc','url':'/temp\\carro-do-ano\\sedan_black.png'},{'revision':'1385f38aaedd789d59367f5bec9dba7b','url':'/temp\\carro-do-ano\\suv_black.png'},{'revision':'69c38df0941c54003f903046d79883be','url':'/temp\\premiodoano.webp'},{'revision':'2c00b3d3ff1e16fe963c2820411dacfd','url':'/temp\\sorteio\\smartwatch.png'},{'revision':'66e8b6565fd81fd832d6e5a6ae9aea14','url':'/temp\\vagasEmprego.png'}],skipWaiting:!0,clientsClaim:!0,navigationPreload:!0}).addEventListeners()}();