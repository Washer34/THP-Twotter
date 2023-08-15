// sw.js

// Mise en cache des fichiers statiques
const staticCacheName = 'static-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon-16x16.png',
  // ...ajoutez d'autres fichiers que vous voulez mettre en cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assetsToCache);
    })
  );
});

// Interception des requêtes et gestion des ressources en cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
