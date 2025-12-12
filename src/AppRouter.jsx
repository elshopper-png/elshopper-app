// ============================================================
// 🚀 AppRouter — CRA Fase 1 y 2 + Banner PWA (Omega-5)
// ============================================================

import { Routes, Route } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";
import SharePage from "./core/SharePage";

// Banner PWA
import PWABanner from "./components/PWABanner";

export default function AppRouter() {
  return (
    <>
      <Routes>
        {/* ⭐ SHARE PREMIUM — fuera del iframe */}
        <Route path="/share/:slug" element={<SharePage />} />

        {/* 🗂 Tarjetas por giro */}
        <Route path="/tarjetas/:giroSlug" element={<TarjetasPage />} />

        {/* 🔥 Visor ATLASH (iframe) */}
        <Route path="/atlash/:slug" element={<AtlashVisor />} />

        {/* 🏠 Portada */}
        <Route path="/" element={<HomeBase />} />

        {/* 🚫 Ruta no encontrada (opcional, pero recomendada) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Banner PWA global */}
      <PWABanner />
    </>
  );
}
