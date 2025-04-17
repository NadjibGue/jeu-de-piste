const BASE_URL = location.pathname.replace(/\/[^\/]*$/, ''); // => "/jeu-de-piste"
const CACHE_NAME = 'jeu-de-piste-v1';
const ASSETS = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/style.css`,
  `${BASE_URL}/script.js`,
  `${BASE_URL}/icon-192.png`,
  `${BASE_URL}/icon-512.png`,
  `${BASE_URL}/manifest.json`
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Filtrer les URLs valides (exclure chrome-extension://)
        const validAssets = ASSETS.filter(url => 
          !url.startsWith('chrome-extension://') && 
          !url.startsWith('data:')
        );
        return cache.addAll(validAssets);
      })
      .catch(error => {
        console.error('Erreur de mise en cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignorer les requêtes non HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Ne mettre en cache que les requêtes HTTP/HTTPS
            if (response.url.startsWith('http')) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                })
                .catch(error => {
                  console.error('Erreur de mise en cache:', error);
                });
            }

            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
