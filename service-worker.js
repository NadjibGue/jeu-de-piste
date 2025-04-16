const CACHE_NAME = 'mariage-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/intro.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // On tente de tout ajouter, mais on gère les erreurs une à une
      await Promise.all(
        FILES_TO_CACHE.map(async file => {
          try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            await cache.put(file, response);
            console.log(`✅ Mis en cache : ${file}`);
          } catch (err) {
            console.warn(`❌ Échec cache : ${file}`, err);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
