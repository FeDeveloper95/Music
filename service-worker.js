const CACHE_NAME = 'music-player-cache-v4';

const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/font.ttf',
    '/gemini.png',
    '/github.png',
    // Icone per la PWA
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    '/icons/icon-monochrome.png',
    // Copertina predefinita
    '/covers/default-cover.jpg',
];

// Dati delle canzoni
const songs = [
    {
        title: 'Belong Together -Bush remix',
        image: 'covers/belong-together.jpg',
        audio: 'audio/belong-together.mp3'
    },
    {
        title: 'By Your Side',
        image: 'covers/by-your-side.jpg',
        audio: 'audio/by-your-side.mp3'
    },
    {
        title: 'Can\'t Go Back',
        image: 'covers/cant-go-back.png',
        audio: 'audio/cant-go-back.mp3'
    },
    {
        title: 'Crazy of You',
        image: 'covers/crazy-of-you.png',
        audio: 'audio/crazy-of-you.mp3'
    },
    {
        title: 'Die Alone -Bush remix',
        image: 'covers/die-alone.jpg',
        audio: 'audio/die-alone.mp3'
    },
    {
        title: 'Faded',
        image: 'covers/faded.jpg',
        audio: 'audio/faded.m4a'
    },
    {
        title: 'Fall in Love with U',
        image: 'covers/fall-in-love-with-u.jpg',
        audio: 'audio/fall-in-love-with-u.mp3'
    },
    {
        title: 'Forever Young',
        image: 'covers/forever-young.jpg',
        audio: 'audio/forever-young.mp3'
    },
    {
        title: 'Forever Young Chill Mix',
        image: 'covers/forever-young-chill-mix.jpg',
        audio: 'audio/forever-young-chill-mix.mp3'
    },
    {
        title: 'Hey',
        image: 'covers/hey.jpg',
        audio: 'audio/hey.m4a'
    },
    {
        title: 'Hey VIP Mix',
        image: 'covers/hey-vip.jpg',
        audio: 'audio/hey-vip.mp3'
    },
    {
        title: 'I\'ll Be There',
        image: 'covers/ill-be-there.jpg',
        audio: 'audio/ill-be-there.mp3'
    },
    {
        title: 'I\'ll Be With U',
        image: 'covers/ill-be-with-u.jpg',
        audio: 'audio/ill-be-with-u.mp3'
    },
    {
        title: 'I\'ll Be With U - VIP Mix',
        image: 'covers/ill-be-with-u-vip.jpg',
        audio: 'audio/ill-be-with-u-vip.mp3'
    },
    {
        title: 'I\'ll Be With U Pt. 2',
        image: 'covers/ill-be-with-u-pt2.jpg',
        audio: 'audio/ill-be-with-u-pt2.mp3'
    },
    {
        title: 'Lost Souls',
        image: 'covers/lost-souls.jpg',
        audio: 'audio/lost-souls.mp3'
    },
    {
        title: 'More Than Ever',
        image: 'covers/more-than-ever.jpg',
        audio: 'audio/more-than-ever.mp3'
    },
    {
        title: 'North Star',
        image: 'covers/north-star.jpg',
        audio: 'audio/north-star.mp3'
    },
    {
        title: 'On my way',
        image: 'covers/on-my-way.jpg',
        audio: 'audio/on-my-way.mp3'
    },
    {
        title: 'Perfect as a Star',
        image: 'covers/perfect-as-a-star.jpg',
        audio: 'audio/perfect-as-a-star.mp3'
    },
    {
        title: 'Play -Bush remix',
        image: 'covers/play.jpg',
        audio: 'audio/play.mp3'
    },
    {
        title: 'Special Like Stars',
        image: 'covers/special-like-stars.jpg',
        audio: 'audio/special-like-stars.m4a'
    },
    {
        title: 'Still By Your Side',
        image: 'covers/still-by-your-side.jpg',
        audio: 'audio/still-by-your-side.mp3'
    },
    {
        title: 'Whatever',
        image: 'covers/Whatever.png',
        audio: 'audio/Whatever.mp3'
    },
    {
        title: 'Why Do I',
        image: 'covers/why-do-i.jpg',
        audio: 'audio/why-do-i.m4a'
    }
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