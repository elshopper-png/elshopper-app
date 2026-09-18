// ============================================================
// 📲 installTracker.js — Instalaciones reales Shopper
// Registra únicamente el evento nativo "appinstalled".
// Nunca bloquea la experiencia del usuario.
// ============================================================

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";

export function registrarInstalacion() {
  fetch(`${SUPABASE_URL}/rest/v1/shop_instalaciones`, {
    method: "POST",

    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },

    body: JSON.stringify({}),

    keepalive: true,
  }).catch((error) => {
    console.error("No se pudo registrar instalación de Shopper:", error);
  });
}