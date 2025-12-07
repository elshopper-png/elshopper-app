// ============================================================
// 🛡 Service Worker OMEGA-5 — El Shopper Digital
// ------------------------------------------------------------
// - NO cachea index.html (evita pantalla blanca por HTML viejo)
// - Cachea solo assets estáticos de /static/*
// - Network-first para SPA
// - No interfiere con ATLASH ni recursos externos
// - Fallback seguro para navegación offline
// ============================================================

const CACHE_VERSION = "o25-v3";
const STATIC_CACHE = `static-${CACHE_VERSION}`;

// 🔥 Cache mínimo permitido — NO incluir index.html
const ASSETS_TO_PRECACHE = [
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// ------------------------------------------------------------
// INSTALL
// ------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(ASSETS_TO_PRECACHE))
  );
  self.skipWaiting();
});

// ------------------------------------------------------------
// ACTIVATE — limpia SW viejo
// ------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE)
          .map((oldKey) => caches.delete(oldKey))
      )
    )
  );

  self.clients.claim();
});

// ------------------------------------------------------------
// FETCH — Network First seguro para SPA
// ------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // No manejar POST/PUT/etc.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // No interceptar recursos externos (ATLASH/Vercel CDN/API)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Cache solo para assets estables
        if (res.ok && req.url.includes("/static/")) {
          caches.open(STATIC_CACHE).then((cache) =>
            cache.put(req, res.clone())
          );
        }
        return res;
      })
      .catch(() => {
        // Si falla red → buscar en cache
        return caches.match(req).then((cached) => {
          // Si es navegación → devolver index fresco si existe
          if (req.mode === "navigate") {
            return caches.match("/index.html");
          }

          return cached || new Response("Offline", { status: 503 });
        });
      })
  );
});
