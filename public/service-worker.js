// ============================================================
// 🛡 Service Worker OMEGA-5 — El Shopper Digital
// PUSH DIAGNÓSTICO
// ============================================================

const CACHE_VERSION = "o25-v4-pushdiag";
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
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key !== STATIC_CACHE &&
              key !== "shopper-push-diagnostico"
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

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

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
              cache.put(req, res.clone())
            );
        }

        return res;
      })
      .catch(() => {
        return caches
          .match(req)
          .then((cached) => {
            if (req.mode === "navigate") {
              return caches.match("/index.html");
            }

            return (
              cached ||
              new Response(
                "Offline",
                { status: 503 }
              )
            );
          });
      })
  );
});


// ============================================================
// 🧪 GUARDAR DIAGNÓSTICO DE PUSH
// ============================================================

async function guardarDiagnosticoPush(datos) {
  const cache =
    await caches.open(
      "shopper-push-diagnostico"
    );

  const respuesta =
    new Response(
      JSON.stringify(datos),
      {
        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );

  await cache.put(
    "/__shopper_push_diag__",
    respuesta
  );
}


// ============================================================
// 🔔 PUSH REMOTO
// ============================================================

self.addEventListener("push", (event) => {
  const recibidoEn =
    new Date().toISOString();

  let textoCrudo = "";
  let data = {};

  try {
    textoCrudo =
      event.data
        ? event.data.text()
        : "";

    data =
      textoCrudo
        ? JSON.parse(textoCrudo)
        : {};

  } catch (error) {
    console.warn(
      "Push recibido sin JSON válido:",
      error
    );

    data = {};
  }

  const titulo =
    data.titulo ||
    "El Shopper Digital";

  const mensaje =
    data.mensaje ||
    "Push remoto recibido correctamente.";

  const destino =
    data.url || "/";

  const diagnostico = {
    recibido: true,
    recibidoEn,
    tieneDatos:
      Boolean(event.data),
    textoCrudo
  };

  const opciones = {
    body: mensaje,

    icon:
      "/icons/pwa/192.png",

    badge:
      "/icons/pwa/app-icon-96.png",

    tag:
      "shopper-nuevo-negocio",

    renotify: true,

    data: {
      url: destino
    }
  };

  event.waitUntil(
    Promise.all([
      guardarDiagnosticoPush(
        diagnostico
      ),

      self.registration
        .showNotification(
          titulo,
          opciones
        ),

      self.clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
        })
        .then((clientes) => {
          clientes.forEach(
            (cliente) => {
              cliente.postMessage({
                type:
                  "SHOPPER_PUSH_RECIBIDO",
                diagnostico
              });
            }
          );
        })
    ])
  );
});


// ============================================================
// 📡 CONSULTAR DIAGNÓSTICO DESDE CRA
// ============================================================

self.addEventListener("message", (event) => {
  if (
    !event.data ||
    event.data.type !== "SHOPPER_PEDIR_DIAGNOSTICO_PUSH"
  ) {
    return;
  }

  event.waitUntil(
    caches
      .open("shopper-push-diagnostico")
      .then((cache) =>
        cache.match("/__shopper_push_diag__")
      )
      .then(async (respuesta) => {
        const diagnostico = respuesta
          ? await respuesta.json()
          : { recibido: false };

        const mensaje = {
          type: "SHOPPER_DIAGNOSTICO_PUSH",
          diagnostico
        };

        // Respuesta directa por MessageChannel
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage(mensaje);
          return;
        }

        // Fallback
        if (event.source) {
          event.source.postMessage(mensaje);
        }
      })
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
              if ("navigate" in cliente) {
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