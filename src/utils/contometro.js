// ============================================================
// 🧮 Contómetro O25 — Conteo real de anunciantes por giro
// ============================================================

import tarjetas from "../data/tarjetas.json";

export function contarAnunciantesPorGiro() {
  const conteo = {};

  tarjetas.forEach((item) => {
    const giro = item.giroSlug;
    if (!giro) return;

    const totalTarjetas = Array.isArray(item.tarjetas)
      ? item.tarjetas.length
      : 0;

    if (!conteo[giro]) conteo[giro] = 0;
    conteo[giro] += totalTarjetas;   // ✅ sumamos la cantidad de tarjetas
  });

  return conteo;
}
