// ============================================================
// 🛡 Service Worker OMEGA-5 — El Shopper Digital
// 🔔 PUSH MÍNIMO UNIVERSAL
// ============================================================

const CACHE_VERSION = "o25-v6-push-min";
const STATIC_CACHE = `static-${CACHE_VERSION}`;

const ASSETS_TO_PRECACHE = [
  "/manifest.json",
  "/icons/pwa/192.png",
  "/icons/pwa/512.png",
];


// ============================================================
// INSTALL
// ============================================================

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        cache.addAll(ASSETS_TO_PRECACHE)
      )
  );

  self.skipWaiting();
});


// ============================================================
// ACTIVATE
// ============================================================

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== STATIC_CACHE
            )
            .map((key) =>
              caches.delete(key)
            )
        )
      )
  );

  self.clients.claim();
});


// ============================================================
// FETCH — NETWORK FIRST
// ============================================================

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url =
    new URL(req.url);

  if (
    url.origin !==
    self.location.origin
  ) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {

        if (
          res.ok &&
          req.url.includes("/static/")
        ) {
          caches
            .open(STATIC_CACHE)
            .then((cache) =>
              cache.put(
                req,
                res.clone()
              )
            );
        }

        return res;
      })
      .catch(() =>
        caches
          .match(req)
          .then((cached) => {

            if (
              req.mode === "navigate"
            ) {
              return caches.match(
                "/index.html"
              );
            }

            return (
              cached ||
              new Response(
                "Offline",
                {
                  status: 503
                }
              )
            );
          })
      )
  );
});


// ============================================================
// 🔔 PUSH — NOTIFICACIÓN DIRECTA
// ------------------------------------------------------------
// No depende de React.
// No depende de Supabase.
// No necesita que Shopper esté abierta.
// ============================================================

self.addEventListener("push", (event) => {

  const titulo =
    "El Shopper Digital";

  const opciones = {
    body:
      "Tenemos una nueva novedad para ti en El Shopper Digital.",

    icon:
      "/icons/pwa/192.png",

    badge:
      "/icons/pwa/app-icon-96.png",

    tag:
      "shopper-push",

    renotify:
      true,

    data: {
      url: "/"
    }
  };


  event.waitUntil(
    self.registration
      .showNotification(
        titulo,
        opciones
      )
  );
});


// ============================================================
// 👆 CLICK EN NOTIFICACIÓN
// ============================================================

self.addEventListener(
  "notificationclick",
  (event) => {

    event.notification.close();

    const destino =
      event.notification?.data?.url ||
      "/";


    event.waitUntil(
      self.clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
        })
        .then((clientes) => {

          for (
            const cliente
            of clientes
          ) {

            if (
              "focus" in cliente &&
              cliente.url.startsWith(
                self.location.origin
              )
            ) {

              if (
                "navigate" in cliente
              ) {
                cliente.navigate(
                  destino
                );
              }

              return cliente.focus();
            }
          }


          if (
            self.clients.openWindow
          ) {
            return self.clients
              .openWindow(destino);
          }


          return null;
        })
    );
  }
);