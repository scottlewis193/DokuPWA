 const cacheName = "Version 0.6.19";




 self.addEventListener('activate', event => {
  // Remove old caches
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();
        return keys.map(async (cache) => {
          if(cache !== cacheName) {
            console.log('[Service Worker] Removing old cache: '+cache);
            return await caches.delete(cache);
          }
        })
       })()
    )
  })


// Files to cache

const appShellFiles = [
  "/",
  "/index.html", 
  "/favicon.ico",
  "/css/style.css",
  "/css/MajorMonoDisplay-Regular.ttf",
  "/js/jquery-3.6.0.min.js",
  "/js/load.js", 
  "/js/app.js",
  "/js/obj/Tile.js",
  "/js/obj/GamePiece.js",
  "/js/events.js",
  "/js/utils.js",
  "/js/board.js",
  "/js/stash.js",
  "/js/gsap.min.js",
  "/js/fontawesome.js",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "/img/CHAZ1.png",
  "/img/BING1.png",
  "/audio/combo2.mp3",
  "/audio/combo3.mp3",
  "/audio/combo4.mp3",
  "/audio/combo5.mp3",
  "/audio/combo6.mp3",
  "/audio/combo7.mp3"
];
// const gamesImages = [];
// for (let i = 0; i < games.length; i++) {
//   gamesImages.push(`data/img/${games[i].slug}.jpg`);
// }
const contentToCache = appShellFiles
// .concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    // if (r) return r;
    const response = await fetch(e.request, {mode : 'cors'});
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
});

//send version number to dom
const channel4Broadcast = new BroadcastChannel('channel4');
channel4Broadcast.postMessage(cacheName);







