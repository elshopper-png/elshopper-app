// ============================================================
// 🚀 AppRouter — CRA CORE ESTABLE (MARKETING + ATLASH)
// ============================================================

import { Routes, Route } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";
import EnlacePage from "./core/EnlacePage.jsx";

import PWABanner from "./components/PWABanner";

export default function AppRouter() {
  return (
    <>
      <Routes>
        {/* 🏠 Portada */}
        <Route path="/" element={<HomeBase />} />

        {/* 🔗 Enlace compartible (marketing / validación) */}
        <Route path="/enlace/:slug" element={<EnlacePage />} />

        {/* 🗂 Tarjetas por giro */}
        <Route path="/tarjetas/:giroSlug" element={<TarjetasPage />} />

        {/* 🔥 Visor ATLASH */}
        <Route path="/atlash/:slug" element={<AtlashVisor />} />
      </Routes>

      {/* 📲 Banner PWA global */}
      <PWABanner />
    </>
  );
}
