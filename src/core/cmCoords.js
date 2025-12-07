// ============================================================
// 📏 cmCoords.js — Omega-11
// Convierte centímetros reales del flyer a píxeles
// ============================================================

// El flyer real mide 6.4 cm × 14.2 cm
const FLYER_WIDTH_CM = 6.4;
const FLYER_HEIGHT_CM = 14.2;

// Pantalla base de referencia (máx ancho app)
const SCREEN_WIDTH_PX = 380;
const SCREEN_HEIGHT_PX = 760;

// ------------------------------------------------------------
// Convierte centímetros horizontales → píxeles
// ------------------------------------------------------------
export function cmToPxX(cm) {
  return (cm / FLYER_WIDTH_CM) * SCREEN_WIDTH_PX;
}

// ------------------------------------------------------------
// Convierte centímetros verticales → píxeles
// ------------------------------------------------------------
export function cmToPxY(cm) {
  return (cm / FLYER_HEIGHT_CM) * SCREEN_HEIGHT_PX;
}
