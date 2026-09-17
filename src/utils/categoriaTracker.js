// ============================================================
// 📡 categoriaTracker.js — Navegación de categorías Shopper
// Registra únicamente la elección de una categoría.
// Nunca bloquea la navegación del usuario.
// ============================================================

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";

export function registrarCategoria(categoria, slug) {
  fetch(`${SUPABASE_URL}/rest/v1/shop_categorias`, {
    method: "POST",

    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },

    body: JSON.stringify({
      categoria,
      slug,
    }),

    keepalive: true,
  }).catch((error) => {
    console.error("No se pudo registrar navegación de categoría:", error);
  });
}