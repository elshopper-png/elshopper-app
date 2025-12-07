// public/service-worker.js
// ============================================================
// 🛡 Service Worker O25 — El Shopper Digital (modo simple)
// - Registra SW solo en producción
// - Cachea lo básico para que Lighthouse marque PWA
// - No interfiere con peticiones externas ni ATLASH
// ============================================================

const CACHE_NAME = "elshopper-o25-v1";

const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Instalación: precache básico
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activación: limpiar caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: sólo GET y sólo mismo origen
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Sólo GET
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // No tocar recursos de otros orígenes (ej: iframes externos, APIs, etc.)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      // Network-first simple
      return fetch(request).catch(() => {
        // Si falla, devolver index.html (útil para SPA)
        if (request.mode === "navigate") {
          return caches.match("/index.html");
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      });
    })
  );
});
