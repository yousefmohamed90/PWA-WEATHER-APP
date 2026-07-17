const Cache_name="version1";
const urlsTocache=['index.html','offline.html'];

//install sw
self.addEventListener('install',(event)=>{
event.waitUntil(
    caches.open(Cache_name).then((cache)=>{
        console.log('opened cache')
     return cache.addAll(urlsTocache);
    }))
})

//listen for requests
self.addEventListener('fetch',(event)=>{
event.respondWith(caches.match(event.request).then(()=>{
    return fetch(event.request).catch(()=>caches.match('offline.html'))
})
)
})

//activate sw
self.addEventListener('activate',(event)=>{
const cacheWhitelist=[];
cacheWhitelist.push(Cache_name);

event.waitUntil(
    caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheName)=>{
            if(!cacheWhitelist.includes(cacheName)){
                return caches.delete(cacheName);
            }
        })
    ))
)
})