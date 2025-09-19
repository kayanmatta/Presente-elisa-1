// Service Worker for offline functionality and caching
const CACHE_NAME = 'nosso-amor-v1';
const urlsToCache = [
    '/',
    '/index_atualizado.html',
    '/styles_atualizado.css',
    '/script.js',
    '/imagens/Foto 1 elisa gosta.jpg',
    '/imagens/Foto 2 elisa gosta.jpg',
    '/imagens/Screenshot_2.png',
    '/imagens/Screenshot_4.png',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});