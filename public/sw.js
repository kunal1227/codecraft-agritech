const CACHE_NAME = 'codecraft-agri-v1';
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
];

// Install Event - Pre-cache critical application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-caching partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale legacy caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network First with Cache Fallback for dynamic content, Cache First for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Don't intercept non-GET requests or chrome-extension URLs
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Static Assets (_next/static, images, icons, fonts) -> Cache First
  if (
    request.url.includes('/_next/static/') ||
    request.url.includes('/icons/') ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
      })
    );
    return;
  }

  // Navigation requests and page routes -> Network First with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        // Fallback to cached home page if offline navigation
        if (request.mode === 'navigate') {
          const homeCached = await caches.match('/');
          if (homeCached) return homeCached;
        }

        return new Response(
          `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CodeCraft Offline</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:system-ui;text-align:center;padding:40px;background:#f0fdf4;color:#14532d;"><h1>CodeCraft AgriTech Offline Mode</h1><p>You are currently operating without an internet connection. Your previously saved farm plans remain fully accessible in the local cache.</p><button onclick="window.location.reload()" style="background:#15803d;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:16px;cursor:pointer;">Retry Reconnection</button></body></html>`,
          {
            headers: { 'Content-Type': 'text/html' },
          }
        );
      })
  );
});
