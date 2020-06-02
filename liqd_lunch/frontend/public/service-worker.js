const CACHE_NAME = 'liqd_lunch_cache_v1';
const URLS_TO_CACHE = [
  '/',
  'static/js/bundle.js',
  'static/js/main.chunk.js',
];

// Listen for install event, set callback
self.addEventListener('install', function(event) {
  console.log("Service worker: install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        console.log("Service worker: install cache");
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log("Service worker: activate");
  // Perform some task
});

