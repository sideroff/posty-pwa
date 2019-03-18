importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

const minute = 60;
const hour = 60 * 60;
const day = 24 * 60 * 60;
const week = 7 * 24 * 60 * 60;

if (!workbox) {
  // possibly send a request to a log servie
  throw new Error('Service worker could not be initialized')
}

// use cache to fallback to latest static files
workbox.routing.registerRoute(
  /(\/$)|(\/static.+)|(\/manifest.json)/,
  new workbox.strategies.NetworkFirst()
);


// cache at most 30 images for up to a week
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: week,
      })
    ],
  })
);

// API calls
workbox.routing.registerRoute(
  /\/posts/,
  new workbox.strategies.NetworkFirst({
    maxAgeSeconds: day
  })
);