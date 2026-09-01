const CACHE_NAME = 'dogkit-cache-v3';
const OFFLINE_FALLBACK_URL = '/index.html';

const STATIC_ASSETS_TO_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/landing.html'
];

// Installa il Service Worker e pre-cachea i file principali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline app shell & assets');
      return cache.addAll(STATIC_ASSETS_TO_PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// Attivazione: elimina le vecchie cache e prende il controllo immediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Pulizia vecchia cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Gestione offline totale per SPA (Stale-While-Revalidate per script/stili e Cache-First per statici)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Per navigazione pagine (HTML SPA): Network-first con fallback istantaneo su cache offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          console.log('[Service Worker] Offline: fornitura cache HTML');
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          return caches.match(OFFLINE_FALLBACK_URL);
        })
    );
    return;
  }

  // Risorse esterne (es. Google Fonts o CDN): Cache-First
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com') || url.origin.includes('lucide')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkRes;
        });
      })
    );
    return;
  }

  // Risorse statiche interne (JS, CSS, Immagini, icone): Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch((err) => {
          // In modalità offline, se non c'è rete ma la risorsa è in cache, non c'è errore bloccante
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Listener per messaggi di skipWaiting o salvataggio dati
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

