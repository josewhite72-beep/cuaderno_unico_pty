const CACHE_NAME = 'cuaderno-docente-v5';

const urlsToCache = [
  '/cuaderno_unico_pty/',
  '/cuaderno_unico_pty/index.html',
  '/cuaderno_unico_pty/manifest.json',
  '/cuaderno_unico_pty/icon-192x192.png',
  '/cuaderno_unico_pty/icon-512x512.png',
  '/cuaderno_unico_pty/icon-maskable-512x512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
