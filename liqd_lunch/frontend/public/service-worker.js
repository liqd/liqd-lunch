const CACHE_NAME = 'liqd_lunch_cache_v1';
const API_ORIGIN = 'http://localhost:8000';
const URLS_TO_CACHE = [
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/images/food-144.png',
  '/images/favicon.ico',
  '/images/wobble.png',
  '/manifest.json',
  '/service-worker.js',
  '/offline.html',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  '/api/resistance/',
  '/api/restaurants/',
  '/',
  '/restaurant',
  '/resistances',
];

// Listen for install event, set callback
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);

  // cdn - prefetched
  if (requestURL.hostname == 'maxcdn.bootstrapcdn.com') {
    event.respondWith(caches.match(event.request));
    return;
  }

  // backend
  if (requestURL.origin == API_ORIGIN) {
    // post - just forward, will need caching
    if (event.request.method == 'POST') {
      event.respondWith(fetch(event.request));
      return;
    }

    // api - cache, update cache via network in background
    if (/^\/api\//.test(requestURL.pathname)) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }).catch(() => {
              console.log("Failed to fetch update from API (offline)");
            })
            return response || fetchPromise;
          })
        })
      );
      return;
    }
  }

  // local
  if (requestURL.origin == location.origin) {
    // prefetched - always from cache
    if (URLS_TO_CACHE.includes(requestURL.pathname)) {
      event.respondWith(caches.match(event.request));
      return;
    }

    // static - cache then network
    if (/^\/static\//.test(requestURL.pathname)) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
      return;
    }
    // images - cache then network
    if (/^\/images\//.test(requestURL.pathname)) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
      return;
    }
  }

  // fallback - with fallback if neither cache nor network are available
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('/offline.html');
    })
  );
});

