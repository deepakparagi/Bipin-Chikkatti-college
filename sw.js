/* ============================================
   SERVICE WORKER - PRODUCTION CACHING
   v2.0.0 — Network First for HTML, Cache First for assets
   ============================================ */

// Bump this version every deployment to bust old caches
const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE  = `static-assets-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-content-${CACHE_VERSION}`;

// Core assets to pre-cache on install
const STATIC_ASSETS = [
  '/Bipin-Chikkatti-college/',
  '/Bipin-Chikkatti-college/index.html',
  '/Bipin-Chikkatti-college/about.html',
  '/Bipin-Chikkatti-college/academics.html',
  '/Bipin-Chikkatti-college/admissions.html',
  '/Bipin-Chikkatti-college/faculty.html',
  '/Bipin-Chikkatti-college/facilities.html',
  '/Bipin-Chikkatti-college/disclosure.html',
  '/Bipin-Chikkatti-college/gallery.html',
  '/Bipin-Chikkatti-college/contact.html',
  '/Bipin-Chikkatti-college/css/main.css',
  '/Bipin-Chikkatti-college/js/main.js',
  '/Bipin-Chikkatti-college/images/logo.svg',
];

// ===== INSTALL — pre-cache static assets =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())   // activate immediately
      .catch((err) => console.warn('SW install cache error:', err))
  );
});

// ===== ACTIVATE — delete ALL old caches =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log('SW: deleting old cache →', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())  // take control of all open tabs
  );
});

// ===== FETCH =====
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // HTML pages → Network First (always get fresh HTML)
  if (request.destination === 'document' ||
      (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // CSS / JS → Network First so updates are always picked up
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Images / fonts / SVG → Cache First (stable assets)
  if (isStaticMedia(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else → Network First
  event.respondWith(networkFirst(request));
});

// ===== STRATEGIES =====

// Network First: try network, fall back to cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline — content not available.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Cache First: serve from cache, update cache in background
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // Revalidate in background
    fetch(request).then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
      }
    }).catch(() => {});
    return cached;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Asset not available.', { status: 503 });
  }
}

function isStaticMedia(pathname) {
  return /\.(svg|png|jpg|jpeg|webp|gif|ico|woff2?|ttf|otf)$/i.test(pathname);
}

// ===== MESSAGE — allow pages to force SW update =====
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
