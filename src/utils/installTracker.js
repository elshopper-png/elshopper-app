// ============================================================
// 📲 installTracker.js — Instalaciones reales Shopper
// Registra únicamente el evento nativo "appinstalled".
// Protege contra registros duplicados del mismo evento.
// Nunca bloquea la experiencia del usuario.
// ============================================================

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";

const INSTALL_KEY = "shopper_install_event";
const VENTANA_DUPLICADO_MS = 60 * 1000;

function obtenerInstallId() {
  const ahora = Date.now();

  try {
    const guardado = localStorage.getItem(INSTALL_KEY);

    if (guardado) {
      const datos = JSON.parse(guardado);

      if (
        datos.id &&
        datos.timestamp &&
        ahora - datos.timestamp < VENTANA_DUPLICADO_MS
      ) {
        return datos.id;
      }
    }

    const nuevoId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `install-${ahora}-${Math.random()
            .toString(36)
            .slice(2)}`;

    localStorage.setItem(
      INSTALL_KEY,
      JSON.stringify({
        id: nuevoId,
        timestamp: ahora,
      })
    );

    return nuevoId;
  } catch (error) {
    return `install-${ahora}-${Math.random()
      .toString(36)
      .slice(2)}`;
  }
}

export function registrarInstalacion() {
  const installId = obtenerInstallId();

  fetch(`${SUPABASE_URL}/rest/v1/shop_instalaciones`, {
    method: "POST",

    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },

    body: JSON.stringify({
      install_id: installId,
    }),

    keepalive: true,
  }).catch((error) => {
    console.error(
      "No se pudo registrar instalación de Shopper:",
      error
    );
  });
}