// Service Worker for Portfolio Website - Performance Optimized
const CACHE_NAME = 'portfolio-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';

// Critical resources to cache immediately
const STATIC_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/image.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Dynamic resources (images, etc.)
const DYNAMIC_URLS = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format&q=80'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE)
                .then(cache => {
                    console.log('Caching static resources');
                    return cache.addAll(STATIC_URLS);
                }),
            caches.open(DYNAMIC_CACHE)
                .then(cache => {
                    console.log('Caching dynamic resources');
                    return cache.addAll(DYNAMIC_URLS);
                })
        ])
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (request.destination === 'document' || request.destination === '') {
        // HTML pages - cache first, then network
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        // Return cached version and update in background
                        fetch(request).then(fetchResponse => {
                            caches.open(STATIC_CACHE).then(cache => {
                                cache.put(request, fetchResponse);
                            });
                        });
                        return response;
                    }
                    return fetch(request).then(response => {
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(STATIC_CACHE).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
    } else if (request.destination === 'style' || request.destination === 'script') {
        // CSS and JS - cache first, then network
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request).then(response => {
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(STATIC_CACHE).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
    } else if (request.destination === 'image') {
        // Images - network first, then cache
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    } else {
        // Other resources - network first, then cache
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle background sync tasks
    console.log('Background sync triggered');
    return Promise.resolve();
}

// Push notifications (if needed)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/image.png',
        badge: '/image.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/image.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/image.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Gourav Jain Portfolio', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 