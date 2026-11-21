// Keeps Atelier Studio working offline once it has been opened.
const CACHE = 'atelier-studio-mwqlboju';
const FILES = ['./', 'index.html', 'app.js', 'style.css', 'manifest.webmanifest', 'assets/logo-mark.png', 'assets/logo-full.jpg', 'assets/favicon.png', 'assets/icon-256.png', 'assets/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Network first so new versions show up; the cache covers offline use.
  e.respondWith(fetch(e.request).then((r) => { if (r.ok && new URL(e.request.url).origin === location.origin) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
