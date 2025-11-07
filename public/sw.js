// public/sw.js - NEW FILE
const CACHE_NAME = 'batikpedia-v1';
const STATIC_CACHE = [
  '/',
  '/gallery',
  '/images/LogoApp.png',
  '/_next/static/css/app.css',
];

// ✅ Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Activate and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ✅ Fetch with cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests: Network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets: Cache first
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});