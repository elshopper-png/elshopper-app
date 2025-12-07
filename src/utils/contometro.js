// ============================================================
// 🧮 Contómetro O25 — Conteo real de anunciantes por giro
// ============================================================

import tarjetas from "../data/tarjetas.json";

export function contarAnunciantesPorGiro() {
  const conteo = {};

  tarjetas.forEach((item) => {
    const giro = item.giroSlug;
    if (!giro) return;

    if (!conteo[giro]) conteo[giro] = 0;
    conteo[giro]++;
  });

  return conteo;
}
