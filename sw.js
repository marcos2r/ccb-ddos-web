const CACHE_NAME = 'agenda-ccb-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style/style.css',
    '/js/script.js',
    '/img/Logo-ccb-para-fundo-claro.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cache hit or fetch from network
                return response || fetch(event.request);
            })
    );
});
