/* Offline support – only used when the page is served over https
   (for example GitHub Pages). Opening the files directly from the tablet
   does not use this file. */
var CACHE = 'hearing-station-v1';
var FILES = ['./', 'index.html', 'style.css', 'texts.js', 'app.js', 'icon.svg', 'manifest.webmanifest', 'speech.mp3'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    // add one by one so a missing speech.mp3 does not break the rest
    return Promise.all(FILES.map(function (f) { return c.add(f).catch(function () {}); }));
  }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

// Network first (so edits show up when online), cache when offline.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
