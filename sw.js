/* ============================================
   SERVICE WORKER - PRODUCTION CACHING
   Professional Asset Caching Strategy
   ============================================ */

const CACHE_NAME = 'bipin-chikkatti-college-v1.0.0';
const STATIC_CACHE = 'static-assets-v1';
const DYNAMIC_CACHE = 'dynamic-content-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/courses.html',
  '/admissions.html',
  '/faculty.html',
  '/campus.html',
  '/placements.html',
  '/events.html',
  '/contact.html',
  '/css/production-optimized.css',
  '/js/main-fixed.js',
  '/images/logo.svg',
  '/manifest.json'
];

// Dynamic assets to cache on request
const DYNAMIC_ASSETS = [
  '/css/',
  '/js/',
  '/images/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://images.unsplash.com/'
];

// ===== INSTALL EVENT =====
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// ===== ACTIVATE EVENT =====
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// ===== FETCH EVENT =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isDynamicAsset(request.url)) {
    event.respondWith(handleDynamicAsset(request));
  } else if (isHTMLPage(request)) {
    event.respondWith(handleHTMLPage(request));
  } else {
    event.respondWith(handleOtherRequests(request));
  }
});

// ===== HELPER FUNCTIONS =====

function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.svg') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.webp');
}

function isDynamicAsset(url) {
  return DYNAMIC_ASSETS.some(pattern => url.includes(pattern));
}

function isHTMLPage(request) {
  return request.destination === 'document' ||
         request.headers.get('accept').includes('text/html');
}

// Cache First Strategy - for static assets
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Static asset fetch failed:', error);
    return new Response('Asset not available', { status: 503 });
  }
}

// Network First Strategy - for dynamic content
async function handleDynamicAsset(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Content not available', { status: 503 });
  }
}

// Stale While Revalidate - for HTML pages
async function handleHTMLPage(request) {
  try {
    const cachedResponse = await caches.match(request);
    const networkResponsePromise = fetch(request);
    
    if (cachedResponse) {
      // Return cached version immediately
      networkResponsePromise.then(async (networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, networkResponse.clone());
        }
      }).catch(() => {
        // Network failed, but we have cache
      });
      
      return cachedResponse;
    }
    
    // No cache, wait for network
    const networkResponse = await networkResponsePromise;
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('HTML page fetch failed:', error);
    return new Response('Page not available', { status: 503 });
  }
}

// Network Only - for other requests
async function handleOtherRequests(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('Other request failed:', error);
    return new Response('Request failed', { status: 503 });
  }
}

// ===== BACKGROUND SYNC =====
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Perform background tasks like updating cache
  console.log('Service Worker: Background sync');
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/logo.svg',
      badge: '/images/logo.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore',
          icon: '/images/checkmark.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/images/xmark.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// ===== NOTIFICATION CLICK =====
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ===== MESSAGE HANDLING =====
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ===== CACHE MANAGEMENT =====
async function cleanupCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name !== STATIC_CACHE && name !== DYNAMIC_CACHE
  );
  
  return Promise.all(
    oldCaches.map(name => caches.delete(name))
  );
}

// Cleanup old caches periodically
setInterval(cleanupCaches, 24 * 60 * 60 * 1000); // 24 hours