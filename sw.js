var cacheName = 'v2';
var cacheFiles = [
  './index.html',
  './offline.html',
  './assets/large-image.jpg',
  'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-579281.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js',
  'https://code.jquery.com/jquery-3.2.1.js'
];

self.addEventListener('install', function(e) {
  // console.log("[ServiceWorker] Installed");

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(e) {
  // console.log("[ServiceWorker] Activated");

  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(cacheNames.map(function(thisCacheName){
        
        if (thisCacheName !== cacheName) {
          // console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))
    })
  );
});

self.addEventListener('fetch', function(e) {
  // console.log("[ServiceWorker] Fetching", e.request.url);

  // e.respondWith(
  //   caches.match(e.request)
  //     .then(function(response){
  //       if (response) {
  //         console.log("[ServiceWorker] Found in cache", e.request.url);
  //         return response;
  //       }

  //       return fetch(e.request);
  //     })
  // );

  e.respondWith(
    // try fetching a resource from the network
    fetch(e.request)
      .then(response => {
       
        // always go to offline page if we are offline
        if (!navigator.onLine) {
          return caches.match('./offline.html')
        }
        return response;
      })
      .catch(() => {
        // the resource could not be fetched from network
        // go to offline page
        return caches.match('./offline.html');
      })
  )
 

});

// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches
//       .match(e.request)
//       .catch(function(e){
//         return fetch(e.request);
//       })
//       .catch(function(e){
//         return caches.match('./offline.html');
//       })
//   )
// });