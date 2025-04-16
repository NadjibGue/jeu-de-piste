const CACHE_NAME = 'jeu-de-piste-v1';
const BASE_PATH = '/jeu-de-piste';  // Add base path for GitHub Pages
const ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/style.css`,
  `${BASE_PATH}/script.js`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icon-192.png`,
  `${BASE_PATH}/icon-512.png`
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache ouvert');
        return cache.addAll(ASSETS);
      })
      .catch(error => {
        console.error('❌ Échec cache :', error);
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  // Skip caching for external URLs
  if (!event.request.url.includes(self.location.origin) && 
      !event.request.url.includes('github.io')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request.clone())
          .then(response => {
            if (!response || response.status !== 200) {
              return response;
            }

            if (ASSETS.includes(new URL(event.request.url).pathname)) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, response.clone());
                });
            }

            return response;
          })
          .catch(error => {
            console.error('❌ Erreur fetch:', error);
            return new Response(
              JSON.stringify({ error: 'Erreur réseau' }), 
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
      })
  );
});
