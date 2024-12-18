const CACHE_NAME = 'games-database-v1';
const STATIC_ASSETS = [
    '/index.html',
    '/profiles.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/Icons/ico1.png',  // Use absolute paths
    '/Icons/ico2.png',
];

// Install event: Cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching static assets');
            return cache.addAll(STATIC_ASSETS).catch((error) => {
                console.error('[Service Worker] Failed to cache assets:', error);
            });
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log(`[Service Worker] Deleting cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve assets from cache or fetch from the network
self.addEventListener('fetch', (event) => {
    console.log(`[Service Worker] Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
        })
    );
});
