// Service worker · Residencial La Rotonda (solo notificaciones, no guarda la app en caché)
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={cuerpo:e.data?e.data.text():""}}
  e.waitUntil(self.registration.showNotification(d.titulo||"Residencial La Rotonda",{body:d.cuerpo||"",icon:"icon-192.png",badge:"favicon-32.png",tag:d.tag||undefined,renotify:!!d.tag,requireInteraction:!!d.urgente,vibrate:[200,100,200],data:{vista:d.vista||""}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const v=(e.notification.data||{}).vista||"";
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){c.postMessage({vista:v});return c.focus()}return self.clients.openWindow("./"+(v?"?v="+encodeURIComponent(v):""))}))});
