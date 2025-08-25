const CACHE_NAME = "ggmoney-cache-v1";


const urlsToCache = [
  "./", 
  "./index.html",
  "./manifest.webmanifest",
  "./icons/favicon-16.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Cache inicial criado");
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  console.log("⚡ Service Worker ativo");
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      
      if (cachedResponse) {
        return cachedResponse;
      }

      
      return fetch(event.request)
        .then((response) => {
          
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          
          return new Response(
            "<h1>Você está offline</h1><p>Não foi possível carregar o conteúdo.</p>",
            { headers: { "Content-Type": "text/html" } }
          );
        });
    })
  );
});
