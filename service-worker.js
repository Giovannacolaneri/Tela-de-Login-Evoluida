const CACHE_NAME = "login-pwa-v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/FireBaseAuthService.js",
  "/firebase-config.js",
  "/register.js",
  "/service-worker.js",
  "/main.js",
  "/icon-192.png",
  "/icon-512.png"
];

// Instala o Service Worker e adiciona os arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto!");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Ativação
self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado!");
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Intercepta as requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});

