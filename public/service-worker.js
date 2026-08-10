// ============================================================
// 🛡 Service Worker OMEGA-5 — El Shopper Digital
// 🔔 PUSH PRODUCCIÓN — Mensaje vía Supabase
// ============================================================

const CACHE_VERSION = "o25-v5-push-final";
const STATIC_CACHE = `static-${CACHE_VERSION}`;


// ============================================================
// CONFIGURACIÓN PÚBLICA SUPABASE
// ============================================================

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

// PEGAR AQUÍ la misma Publishable Key de Supabase
// que ya utiliza src/utils/pushShopper.js.
// Empieza con: sb_publishable_...
//
// IMPORTANTE:
// Esta es PUBLICABLE, no Service Role,
// no Secret Key y no VAPID Private Key.

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";


// ============================================================
// PRECACHE MÍNIMO
// ============================================================

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
            .map((oldKey) =>
              caches.delete(oldKey)
            )
        )
      )
  );

  self.clients.claim();
});


// ============================================================
// FETCH — Network First OMEGA-5
// ============================================================

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // No manejar POST / PUT / etc.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // No interceptar Supabase ni otros recursos externos.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {

        // Cachear únicamente assets estáticos.
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

            if (req.mode === "navigate") {
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
// 🔎 OBTENER MENSAJE PUSH ACTIVO DESDE SUPABASE
// ============================================================

async function obtenerMensajePushActivo() {

  const endpoint =
    `${SUPABASE_URL}/rest/v1/shop_push_mensajes` +
    `?select=titulo,mensaje,url,created_at` +
    `&activo=eq.true` +
    `&order=created_at.desc` +
    `&limit=1`;


  const respuesta =
    await fetch(
      endpoint,
      {
        method: "GET",

        headers: {
          apikey:
            SUPABASE_PUBLISHABLE_KEY,

          Accept:
            "application/json"
        },

        // Evitar reutilizar una respuesta anterior.
        cache: "no-store"
      }
    );


  if (!respuesta.ok) {
    throw new Error(
      `Supabase Push respondió ${respuesta.status}`
    );
  }


  const datos =
    await respuesta.json();


  if (
    !Array.isArray(datos) ||
    datos.length === 0
  ) {
    return null;
  }


  return datos[0];
}


// ============================================================
// 🔔 PUSH REMOTO — PRUEBA FINAL DE TRÁNSITO
// ============================================================

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      // ------------------------------------------------------
      // 1. PRUEBA INMEDIATA
      // Si aparece, sabemos que este Service Worker recibió
      // físicamente el Push vacío.
      // ------------------------------------------------------

      await self.registration.showNotification(
        "El Shopper Digital",
        {
          body: "Señal Push recibida. Consultando novedad...",
          icon: "/icons/pwa/192.png",
          badge: "/icons/pwa/app-icon-96.png",
          tag: "shopper-prueba-transito",
          renotify: true,
          data: {
            url: "/"
          }
        }
      );

      // ------------------------------------------------------
      // 2. CONSULTAR MENSAJE REAL EN SUPABASE
      // ------------------------------------------------------

      try {
        const aviso =
          await obtenerMensajePushActivo();

        if (!aviso) {
          return;
        }

        await self.registration.showNotification(
          aviso.titulo || "El Shopper Digital",
          {
            body:
              aviso.mensaje ||
              "Tenemos novedades para ti en El Shopper Digital.",

            icon: "/icons/pwa/192.png",
            badge: "/icons/pwa/app-icon-96.png",

            tag: "shopper-nuevo-negocio",
            renotify: true,

            data: {
              url: aviso.url || "/"
            }
          }
        );

      } catch (error) {
        console.error(
          "Error consultando mensaje Push:",
          error
        );
      }
    })()
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

          // --------------------------------------------------
          // Si Shopper ya está abierta:
          // navegar al destino y darle foco.
          // --------------------------------------------------

          for (const cliente of clientes) {

            if (
              "focus" in cliente &&
              cliente.url.startsWith(
                self.location.origin
              )
            ) {

              if ("navigate" in cliente) {
                cliente.navigate(
                  destino
                );
              }

              return cliente.focus();
            }
          }


          // --------------------------------------------------
          // Si Shopper está cerrada:
          // abrir directamente el destino.
          // --------------------------------------------------

          if (self.clients.openWindow) {
            return self.clients.openWindow(
              destino
            );
          }


          return null;
        })
    );
  }
);