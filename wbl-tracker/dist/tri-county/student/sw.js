/* Offline support: caches the app files only. No student data passes through here. */
const CACHE = 'wbl-student-mwd1lz1d';
const FILES = ['./', 'index.html', 'base.css', 'brand.css', 'student.css', 'wbl-format.js', 'student.js',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'clockedin-logo.png', 'logo.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('wbl-student-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Network first (so updates arrive), cache when offline.
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    if (r.ok) caches.open(CACHE).then(c => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
});
