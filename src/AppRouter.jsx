// ============================================================
// 🚀 AppRouter — CRA Fase 1 y 2 + Banner PWA (ESTABLE MOBILE)
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";

// Banner PWA
import PWABanner from "./components/PWABanner";

export default function AppRouter() {
  return (
    <>
      <Routes>
        {/* 🏠 Portada */}
        <Route path="/" element={<HomeBase />} />

        {/* 🗂 Ruta base tarjetas (evita pantalla blanca) */}
        <Route path="/tarjetas" element={<Navigate to="/" replace />} />

        {/* 🗂 Tarjetas por giro */}
        <Route path="/tarjetas/:giroSlug" element={<TarjetasPage />} />

        {/* 🔥 Visor ATLASH (iframe de avisos) */}
        <Route path="/atlash/:slug" element={<AtlashVisor />} />
      </Routes>

      {/* 📲 Banner PWA global */}
      <PWABanner />
    </>
  );
}
