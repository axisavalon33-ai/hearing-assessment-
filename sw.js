/* Offline support – only used when the page is served over https
   (for example GitHub Pages or Netlify). Opening the files directly from
   the tablet does not use this file. */
var CACHE = 'hearing-station-v3';
var FILES = ['./', 'index.html', 'style.css', 'texts.js', 'app.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest',
  'intro.mp4', 'intro.webm',
  'speech-en.mp3', 'speech-si.mp3', 'speech-ta.mp3', 'speech-en.m4a', 'speech-si.m4a', 'speech-ta.m4a', 'speech.mp3'];

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

// Big media files (video, recordings): answer from the cache straight away
// and refresh the cached copy in the background.
// Everything else: network first (so edits show up), cache when offline.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (/\.(mp4|webm|mp3|m4a)$/i.test(new URL(e.request.url).pathname)) {
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match(e.request, { ignoreSearch: true }).then(function (hit) {
        var refresh = fetch(e.request).then(function (res) {
          if (res.ok && res.status === 200) c.put(e.request, res.clone());
          return res;
        });
        if (hit) { refresh.catch(function () {}); return hit; }
        return refresh;
      });
    }));
    return;
  }
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
