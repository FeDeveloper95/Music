const CACHE_NAME = 'music-player-cache-v3';

const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    // Icone per la PWA
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    // Aggiungi qui le tue canzoni e immagini
];

// Dati delle canzoni
const songs = [
    {
        title: 'Belong Together -Bush remix',
        image: 'covers/belong-together.jpg',
        audio: 'audio/belong-together.mp3'
    },
    // ... (assicurati di includere tutte le canzoni)
];

// Aggiungi le cover e i file audio alla cache
songs.forEach(song => {
    urlsToCache.push(song.image);
    urlsToCache.push(song.audio);
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache aperta');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Rispondi con la cache o effettua una richiesta al network
            return response || fetch(event.request);
        })
    );
});
