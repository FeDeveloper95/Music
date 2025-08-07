const CACHE_NAME = 'music-player-cache-v9'; // Versione incrementata
const urlsToCacheOnInstall = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/font.ttf',
    '/gemini.png',
    '/github.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/covers/default-cover.jpg'
];

// 1. Installazione: Mette in cache i file statici fondamentali dell'app
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(urlsToCacheOnInstall);
        })
    );
});

// 2. Attivazione: Pulisce le vecchie cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. Fetch: Intercetta le richieste e serve dalla cache se possibile
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                // Se la risorsa è in cache, la restituisce.
                // Altrimenti, la richiede al network, la aggiunge alla cache e la restituisce.
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // Non mettere in cache le richieste di download di tutte le canzoni
                    if (!event.request.url.includes('download=all')) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });

                return response || fetchPromise;
            });
        })
    );
});