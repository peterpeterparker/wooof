workbox.routing.registerRoute(
    // Cache Image File
    new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif)/),
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
    })
);
