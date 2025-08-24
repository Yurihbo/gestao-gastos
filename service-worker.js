const CACHE_NAME = "finance-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instala o Service Worker e faz cache inicial
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Estratégia: Network First para HTML, Cache First para assets
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Para HTML → tenta rede primeiro
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html"))
    );
  } else {
    // Para CSS, JS, imagens → usa cache se disponível
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((resp) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, resp.clone());
              return resp;
            });
          })
        );
      })
    );
  }
});
