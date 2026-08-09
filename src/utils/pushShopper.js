// ============================================================
// 🔔 pushShopper.js — Suscripción Push El Shopper Digital
// ============================================================

// ------------------------------------------------------------
// CONFIGURACIÓN PÚBLICA
// ------------------------------------------------------------

// URL pública de nuestro proyecto Supabase.
// Esta NO es secreta.
const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

// PEGAR AQUÍ la Publishable Key de Supabase.
// Es la que empieza con: sb_publishable_...
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N"
// PEGAR AQUÍ la VAPID PUBLIC KEY definitiva.
// NO pegar jamás la VAPID Private Key.
const VAPID_PUBLIC_KEY =
  "BKXbB9v_CSRd6qIyxptjodFjo53Fd5gy6ilnsoXd1qQuDw1E3ouk0P_Q0Wk_8uuuUbMthHLyiajz-k26QDeldDg";


// ============================================================
// Convierte VAPID Base64URL → Uint8Array
// ============================================================

function urlBase64ToUint8Array(base64String) {
  const padding =
    "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 =
    (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map(
      caracter => caracter.charCodeAt(0)
    )
  );
}


// ============================================================
// Detectar plataforma
// ============================================================

function detectarPlataforma() {
  const ua =
    navigator.userAgent || "";

  if (/Android/i.test(ua)) {
    return "Android";
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iPhone";
  }

  return "Escritorio";
}


// ============================================================
// Guardar suscripción en Supabase
// ============================================================

async function guardarSuscripcion(subscription) {
  const json = subscription.toJSON();

  const endpoint =
    json.endpoint || subscription.endpoint;

  const p256dh =
    json.keys?.p256dh || "";

  const auth =
    json.keys?.auth || "";

  if (!endpoint || !p256dh || !auth) {
    throw new Error(
      "La suscripción Push está incompleta."
    );
  }

  const respuesta = await fetch(
    `${SUPABASE_URL}/rest/v1/shop_push_suscripciones`,
    {
      method: "POST",

      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,

        Authorization:
          `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,

        "Content-Type": "application/json",

        Prefer: "return=minimal"
      },

      body: JSON.stringify({
        endpoint,
        p256dh,
        auth,
        plataforma: detectarPlataforma(),
        activo: true
      })
    }
  );

  /*
   * 409 significa normalmente que este endpoint
   * ya estaba registrado.
   *
   * Como endpoint es UNIQUE, no lo tratamos
   * como un fallo de la suscripción.
   */
  if (respuesta.status === 409) {
    console.log(
      "ℹ️ Suscripción Push ya registrada."
    );

    return true;
  }

  if (!respuesta.ok) {
    const detalle =
      await respuesta.text();

    throw new Error(
      `Supabase respondió ${respuesta.status}: ${detalle}`
    );
  }

  console.log(
    "✅ Suscripción Push guardada en Shopper."
  );

  return true;
}


// ============================================================
// SUSCRIBIR USUARIO
// Esta función se ejecutará SOLO cuando pulse "Sí"
// ============================================================

export async function suscribirPushShopper() {
  try {
    if (!("serviceWorker" in navigator)) {
      return {
        ok: false,
        motivo: "service-worker-no-disponible"
      };
    }

    if (!("PushManager" in window)) {
      return {
        ok: false,
        motivo: "push-no-disponible"
      };
    }

    if (!("Notification" in window)) {
      return {
        ok: false,
        motivo: "notificaciones-no-disponibles"
      };
    }

    // --------------------------------------------------------
    // Pedir autorización SOLO después del clic del usuario.
    // --------------------------------------------------------

    const permiso =
      await Notification.requestPermission();

    if (permiso !== "granted") {
      return {
        ok: false,
        motivo:
          permiso === "denied"
            ? "permiso-denegado"
            : "permiso-no-otorgado"
      };
    }

    // --------------------------------------------------------
    // Esperar al Service Worker activo.
    // --------------------------------------------------------

    const registration =
      await navigator.serviceWorker.ready;

    // --------------------------------------------------------
    // Revisar primero si ya existe suscripción.
    // --------------------------------------------------------

    let subscription =
      await registration.pushManager.getSubscription();

    // --------------------------------------------------------
    // Si no existe, crearla.
    // --------------------------------------------------------

    if (!subscription) {
      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,

          applicationServerKey:
            urlBase64ToUint8Array(
              VAPID_PUBLIC_KEY
            )
        });
    }

    // --------------------------------------------------------
    // Guardarla en Supabase.
    // --------------------------------------------------------

    await guardarSuscripcion(subscription);

    return {
      ok: true,
      subscription
    };

  } catch (error) {
    console.error(
      "❌ Error suscribiendo Push Shopper:",
      error
    );

    return {
      ok: false,
      motivo: "error",
      error
    };
  }
}

// ============================================================
// 🧪 PRUEBA LOCAL TEMPORAL DE NOTIFICACIÓN
// ============================================================

export async function probarNotificacionLocalShopper() {
  try {
    if (!("serviceWorker" in navigator)) {
      return { ok: false, motivo: "sin-service-worker" };
    }

    if (!("Notification" in window)) {
      return { ok: false, motivo: "sin-notificaciones" };
    }

    if (Notification.permission !== "granted") {
      return { ok: false, motivo: "permiso-no-concedido" };
    }

    const registration =
      await navigator.serviceWorker.ready;

    await registration.showNotification(
      "El Shopper Digital",
      {
        body: "Prueba local de notificaciones Shopper.",
        icon: "/icons/pwa/192.png",
        badge: "/icons/pwa/app-icon-96.png",
        data: {
          url: "/"
        }
      }
    );

    return { ok: true };

  } catch (error) {
    console.error(
      "Error en prueba local Shopper:",
      error
    );

    return {
      ok: false,
      motivo: "error",
      error
    };
  }
}