// ============================================================
// 🛡 Service Worker OMEGA-5 — El Shopper Digital
// 🔔 PUSH PRODUCCIÓN
// ============================================================

const CACHE_VERSION =
  "o25-v8-push-dual";

const STATIC_CACHE =
  `static-${CACHE_VERSION}`;


const ASSETS_TO_PRECACHE = [
  "/manifest.json",
  "/icons/pwa/192.png",
  "/icons/pwa/512.png",
];


// ============================================================
// INSTALL
// ============================================================

self.addEventListener(
  "install",
  (event) => {

    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then((cache) =>
          cache.addAll(
            ASSETS_TO_PRECACHE
          )
        )
    );

    self.skipWaiting();
  }
);


// ============================================================
// ACTIVATE
// ============================================================

self.addEventListener(
  "activate",
  (event) => {

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
              .map(
                (oldKey) =>
                  caches.delete(oldKey)
              )

          )
        )

    );

    self.clients.claim();
  }
);


// ============================================================
// FETCH — NETWORK FIRST
// ============================================================

self.addEventListener(
  "fetch",
  (event) => {

    const req =
      event.request;


    if (
      req.method !== "GET"
    ) {
      return;
    }


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
            req.url.includes(
              "/static/"
            )
          ) {

            caches
              .open(STATIC_CACHE)
              .then(
                (cache) =>
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
                req.mode ===
                "navigate"
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
  }
);


// ============================================================
// 🔔 PUSH REMOTO
// ============================================================

self.addEventListener(
  "push",
  (event) => {

    let data = {};


    try {

      data =
        event.data
          ? event.data.json()
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
      "Tenemos una novedad para ti en El Shopper Digital.";


    const destino =
      data.url || "/";


    event.waitUntil(
      (async () => {

        // ====================================================
        // BUSCAR SHOPPER ABIERTA
        // ====================================================

        const clientes =
  await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true
  });


// ====================================================
// 1. AVISAR SIEMPRE A SHOPPER SI ESTÁ ABIERTA
// ----------------------------------------------------
// No dependemos de focused ni visibilityState.
// Si existe una ventana de Shopper, React recibe
// el mensaje y muestra nuestra tarjeta interna.
// ====================================================

for (const cliente of clientes) {

  if (
    cliente.url.startsWith(
      self.location.origin
    )
  ) {

    cliente.postMessage({
      type:
        "SHOPPER_NUEVO_ANUNCIANTE",

      titulo,
      mensaje,

      url:
        destino
    });
  }
}


// ====================================================
// 2. MOSTRAR SIEMPRE NOTIFICACIÓN DEL SISTEMA
// ----------------------------------------------------
// Funciona con Shopper abierta o cerrada.
// Android decide sonido, badge, bandeja y heads-up.
// ====================================================

await self.registration
  .showNotification(
    titulo,
    {
      body:
        mensaje,

      icon:
        "/icons/pwa/192.png",

      badge:
        "/icons/pwa/app-icon-96.png",

      tag:
        `shopper-${Date.now()}`,

      silent:
        false,

      timestamp:
        Date.now(),

      data: {
        url:
          destino
      }
    }
  );


        for (
          const cliente
          of clientes
        ) {

          if (
  cliente.url.startsWith(
    self.location.origin
  ) &&
  (
    cliente.focused === true ||
    cliente.visibilityState === "visible"
  )
) {

            shopperVisible =
              true;


            // -----------------------------------------------
            // Shopper abierta:
            // React podrá mostrar su propia ventana.
            // -----------------------------------------------

            try {

  const canalShopper =
    new BroadcastChannel(
      "shopper-push-interno"
    );

  canalShopper.postMessage({
    type:
      "SHOPPER_NUEVO_ANUNCIANTE",

    titulo,
    mensaje,

    url:
      destino
  });

  canalShopper.close();

} catch (error) {

  console.warn(
    "No se pudo enviar aviso interno:",
    error
  );
}
          }
        }


        // ====================================================
        // SHOPPER CERRADA / NO VISIBLE
        // Mostrar notificación del sistema.
        // ====================================================

        if (!shopperVisible) {

          await self.registration
            .showNotification(
              titulo,
              {
                body:
                  mensaje,

                icon:
                  "/icons/pwa/192.png",

                badge:
                  "/icons/pwa/app-icon-96.png",

                // -------------------------------------------
                // No usamos un tag fijo.
                // Cada anunciante puede generar
                // su propia notificación.
                // -------------------------------------------

                tag:
                  `shopper-${Date.now()}`,

                silent:
                  false,

                timestamp:
                  Date.now(),

                data: {
                  url:
                    destino
                }
              }
            );
        }

      })()
    );
  }
);


// ============================================================
// 👆 CLICK EN NOTIFICACIÓN
// ============================================================

self.addEventListener(
  "notificationclick",
  (event) => {

    event.notification.close();


    const destino =
      event.notification
        ?.data
        ?.url ||
      "/";


    event.waitUntil(

      self.clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
        })

        .then(
          async (clientes) => {

            for (
              const cliente
              of clientes
            ) {

              if (
                cliente.url.startsWith(
                  self.location.origin
                )
              ) {

                if (
                  "navigate"
                  in cliente
                ) {

                  await cliente
                    .navigate(
                      destino
                    );
                }


                if (
                  "focus"
                  in cliente
                ) {

                  return cliente
                    .focus();
                }
              }
            }


            if (
              self.clients.openWindow
            ) {

              return self.clients
                .openWindow(
                  destino
                );
            }


            return null;
          }
        )

    );
  }
);