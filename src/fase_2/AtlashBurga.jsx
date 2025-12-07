// ============================================================
// 🌉 AtlashBurga.jsx — Conexión ATLASH O25 para Burga
// ============================================================

import React from "react";

export default function AtlashBurga() {
  return (
    <iframe
      title="atlash-burga"
      src="/atlash/index.html?slug=burga"   // ⬅️ ESTA ERA LA PIEZA QUE FALTABA
      className="atlash-iframe"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        overflow: "hidden",
      }}
    />
  );
}
