// ============================================================
// 🚀 AppRouter.jsx — Puente de Madera O25 (Versión correcta)
// ============================================================

import { Routes, Route } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";

export default function AppRouter() {
  return (
    <Routes>

      {/* Portada */}
      <Route path="/" element={<HomeBase />} />

      {/* Tarjetas por giro */}
      <Route path="/giros/:slug" element={<TarjetasPage />} />

      {/* ATLASH externo */}
      <Route path="/atlash/:slug" element={<AtlashVisor />} />

      {/* Fallback */}
      <Route path="*" element={<HomeBase />} />

    </Routes>
  );
}
