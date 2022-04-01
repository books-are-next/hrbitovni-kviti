/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-a6d05e6';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./hrbitovni_kviti_002.html","./hrbitovni_kviti_006.html","./hrbitovni_kviti_007.html","./hrbitovni_kviti_005.html","./hrbitovni_kviti_014.html","./hrbitovni_kviti_016.html","./hrbitovni_kviti_017.html","./hrbitovni_kviti_018.html","./hrbitovni_kviti_015.html","./hrbitovni_kviti_019.html","./hrbitovni_kviti_020.html","./hrbitovni_kviti_022.html","./hrbitovni_kviti_023.html","./hrbitovni_kviti_021.html","./hrbitovni_kviti_025.html","./hrbitovni_kviti_026.html","./hrbitovni_kviti_024.html","./hrbitovni_kviti_028.html","./hrbitovni_kviti_027.html","./hrbitovni_kviti_029.html","./hrbitovni_kviti_031.html","./hrbitovni_kviti_032.html","./hrbitovni_kviti_030.html","./hrbitovni_kviti_034.html","./hrbitovni_kviti_033.html","./hrbitovni_kviti_035.html","./hrbitovni_kviti_036.html","./hrbitovni_kviti_037.html","./hrbitovni_kviti_039.html","./hrbitovni_kviti_040.html","./hrbitovni_kviti_038.html","./hrbitovni_kviti_041.html","./hrbitovni_kviti_042.html","./hrbitovni_kviti_044.html","./hrbitovni_kviti_043.html","./hrbitovni_kviti_045.html","./hrbitovni_kviti_046.html","./hrbitovni_kviti_048.html","./hrbitovni_kviti_047.html","./hrbitovni_kviti_050.html","./hrbitovni_kviti_049.html","./hrbitovni_kviti_051.html","./hrbitovni_kviti_052.html","./hrbitovni_kviti_053.html","./hrbitovni_kviti_054.html","./hrbitovni_kviti_055.html","./hrbitovni_kviti_056.html","./hrbitovni_kviti_057.html","./hrbitovni_kviti_058.html","./hrbitovni_kviti_059.html","./hrbitovni_kviti_060.html","./hrbitovni_kviti_063.html","./hrbitovni_kviti_062.html","./hrbitovni_kviti_061.html","./hrbitovni_kviti_064.html","./hrbitovni_kviti_065.html","./index.html","./hrbitovni_kviti_066.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/obalka01-0004625023.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
