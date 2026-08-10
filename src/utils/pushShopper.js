// ============================================================
// 🔔 pushShopper.js — Sistema Push El Shopper Digital
// PRODUCCIÓN LIMPIA + SINCRONIZACIÓN UNIVERSAL
// ============================================================


// ============================================================
// CONFIGURACIÓN PÚBLICA
// ============================================================

// URL pública de Supabase.
// Esta NO es secreta.
const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";


// Publishable Key de Supabase.
// Esta clave está diseñada para uso público con RLS.
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";


// VAPID PUBLIC KEY definitiva.
// La VAPID PRIVATE KEY jamás debe estar en CRA.
const VAPID_PUBLIC_KEY =
  "BKXbB9v_CSRd6qIyxptjodFjo53Fd5gy6ilnsoXd1qQuDw1E3ouk0P_Q0Wk_8uuuUbMthHLyiajz-k26QDeldDg";


// ============================================================
// Convertir VAPID Base64URL → Uint8Array
// ============================================================

function urlBase64ToUint8Array(base64String) {
  const padding =
    "=".repeat(
      (4 - (base64String.length % 4)) % 4
    );

  const base64 =
    (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  const rawData =
    window.atob(base64);

  return Uint8Array.from(
    [...rawData].map(
      (caracter) =>
        caracter.charCodeAt(0)
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
// Guardar / sincronizar suscripción en Supabase
// ============================================================

async function guardarSuscripcion(
  subscription
) {
  const json =
    subscription.toJSON();

  const endpoint =
    json.endpoint ||
    subscription.endpoint;

  const p256dh =
    json.keys?.p256dh || "";

  const auth =
    json.keys?.auth || "";


  if (
    !endpoint ||
    !p256dh ||
    !auth
  ) {
    throw new Error(
      "La suscripción Push está incompleta."
    );
  }


  const respuesta =
    await fetch(
      `${SUPABASE_URL}/rest/v1/shop_push_suscripciones`,
      {
        method: "POST",

        headers: {
          apikey:
            SUPABASE_PUBLISHABLE_KEY,

          Authorization:
            `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,

          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal"
        },

        body: JSON.stringify({
          endpoint,
          p256dh,
          auth,
          plataforma:
            detectarPlataforma(),
          activo: true
        })
      }
    );


  // ----------------------------------------------------------
  // El endpoint ya existe.
  // No es un error: significa que la suscripción
  // vigente ya estaba registrada.
  // ----------------------------------------------------------

  if (
    respuesta.status === 409
  ) {
    console.log(
      "ℹ️ Suscripción Push ya sincronizada."
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
    "✅ Suscripción Push sincronizada."
  );

  return true;
}


// ============================================================
// 🔔 SUSCRIPCIÓN INICIAL
// ------------------------------------------------------------
// Se ejecuta ÚNICAMENTE cuando el usuario pulsa "Sí".
// Aquí sí está permitido solicitar autorización.
// ============================================================

export async function suscribirPushShopper() {
  try {

    if (
      !("serviceWorker" in navigator)
    ) {
      return {
        ok: false,
        motivo:
          "service-worker-no-disponible"
      };
    }


    if (
      !("PushManager" in window)
    ) {
      return {
        ok: false,
        motivo:
          "push-no-disponible"
      };
    }


    if (
      !("Notification" in window)
    ) {
      return {
        ok: false,
        motivo:
          "notificaciones-no-disponibles"
      };
    }


    // ========================================================
    // Solicitar permiso
    // SOLO después del clic del usuario.
    // ========================================================

    const permiso =
      await Notification
        .requestPermission();


    if (
      permiso !== "granted"
    ) {
      return {
        ok: false,

        motivo:
          permiso === "denied"
            ? "permiso-denegado"
            : "permiso-no-otorgado"
      };
    }


    // ========================================================
    // Esperar Service Worker activo
    // ========================================================

    const registration =
      await navigator
        .serviceWorker
        .ready;


    // ========================================================
    // Revisar si ya existe suscripción
    // ========================================================

    let subscription =
      await registration
        .pushManager
        .getSubscription();


    // ========================================================
    // Crear suscripción si todavía no existe
    // ========================================================

    if (!subscription) {

      subscription =
        await registration
          .pushManager
          .subscribe({
            userVisibleOnly: true,

            applicationServerKey:
              urlBase64ToUint8Array(
                VAPID_PUBLIC_KEY
              )
          });
    }


    // ========================================================
    // Guardar suscripción vigente
    // ========================================================

    await guardarSuscripcion(
      subscription
    );


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
// 🔄 SINCRONIZACIÓN SILENCIOSA UNIVERSAL
// ------------------------------------------------------------
// Para Android / iPhone y navegadores compatibles.
//
// NO solicita permiso.
// NO muestra ventanas.
// NO crea una suscripción nueva.
//
// Si el usuario ya concedió permiso y existe una
// PushSubscription, vuelve a sincronizarla con Supabase.
// ============================================================

export async function sincronizarPushShopper() {
  try {

    if (
      !("serviceWorker" in navigator)
    ) {
      return {
        ok: false,
        motivo:
          "service-worker-no-disponible"
      };
    }


    if (
      !("PushManager" in window)
    ) {
      return {
        ok: false,
        motivo:
          "push-no-disponible"
      };
    }


    if (
      !("Notification" in window)
    ) {
      return {
        ok: false,
        motivo:
          "notificaciones-no-disponibles"
      };
    }


    // --------------------------------------------------------
    // Nunca pedir autorización desde la sincronización.
    // --------------------------------------------------------

    if (
      Notification.permission !==
      "granted"
    ) {
      return {
        ok: false,
        motivo:
          "permiso-no-concedido"
      };
    }


    // --------------------------------------------------------
    // Obtener Service Worker vigente.
    // --------------------------------------------------------

    const registration =
      await navigator
        .serviceWorker
        .ready;


    // --------------------------------------------------------
    // Obtener la suscripción VIVA del dispositivo.
    // --------------------------------------------------------

    const subscription =
      await registration
        .pushManager
        .getSubscription();


    // --------------------------------------------------------
    // Si no existe suscripción, NO crear una automáticamente.
    // El usuario deberá iniciar el flujo mediante "Sí".
    // --------------------------------------------------------

    if (!subscription) {
      return {
        ok: false,
        motivo:
          "sin-suscripcion"
      };
    }


    // --------------------------------------------------------
    // Sincronizar silenciosamente con Supabase.
    // --------------------------------------------------------

    await guardarSuscripcion(
      subscription
    );


    return {
      ok: true,
      sincronizada: true
    };


  } catch (error) {

    console.error(
      "❌ Error sincronizando Push Shopper:",
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
// 🧪 RENOVACIÓN CONTROLADA DE SUSCRIPCIÓN PUSH
// SOLO PARA PRUEBA DE LABORATORIO
// ============================================================

export async function renovarPushShopperPrueba() {
  try {
    if (!("serviceWorker" in navigator)) {
      return {
        ok: false,
        motivo: "sin-service-worker"
      };
    }

    if (!("PushManager" in window)) {
      return {
        ok: false,
        motivo: "sin-push-manager"
      };
    }

    if (!("Notification" in window)) {
      return {
        ok: false,
        motivo: "sin-notificaciones"
      };
    }

    if (Notification.permission !== "granted") {
      return {
        ok: false,
        motivo: "permiso-no-concedido"
      };
    }

    const registration =
      await navigator.serviceWorker.ready;

    const anterior =
      await registration.pushManager.getSubscription();

    // --------------------------------------------------------
    // Cancelar únicamente la suscripción del dispositivo
    // donde ejecutemos esta prueba.
    // --------------------------------------------------------

    if (anterior) {
      const cancelada =
        await anterior.unsubscribe();

      if (!cancelada) {
        return {
          ok: false,
          motivo: "no-se-pudo-cancelar"
        };
      }
    }

    // --------------------------------------------------------
    // Crear una suscripción completamente nueva
    // con nuestra MISMA VAPID pública.
    // --------------------------------------------------------

    const nueva =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,

        applicationServerKey:
          urlBase64ToUint8Array(
            VAPID_PUBLIC_KEY
          )
      });

    // --------------------------------------------------------
    // Guardarla en Supabase.
    // --------------------------------------------------------

    await guardarSuscripcion(nueva);

    return {
      ok: true,
      renovada: true
    };

  } catch (error) {
    console.error(
      "Error renovando Push de prueba:",
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
// 🧪 DIAGNÓSTICO TEMPORAL — IDENTIFICAR SUSCRIPCIÓN ACTUAL
// ============================================================

export async function identificarSuscripcionPushShopper() {
  try {
    const registration =
      await navigator.serviceWorker.ready;

    const subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      return {
        ok: false,
        motivo: "sin-suscripcion"
      };
    }

    const json =
      subscription.toJSON();

    const texto =
      [
        json.endpoint || "",
        json.keys?.p256dh || "",
        json.keys?.auth || ""
      ].join("|");

    const datos =
      new TextEncoder().encode(texto);

    const hash =
      await crypto.subtle.digest(
        "SHA-256",
        datos
      );

    const huella =
      Array.from(
        new Uint8Array(hash)
      )
        .map((byte) =>
          byte
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
        .slice(0, 16);

    return {
      ok: true,
      huella
    };

  } catch (error) {
    return {
      ok: false,
      motivo: "error"
    };
  }
}