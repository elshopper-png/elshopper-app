// ============================================================
// 🚀 AppRouter — CRA Fase 1 y 2 + Banner PWA (Omega-5)
// ============================================================

import { Routes, Route } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";

// 🔥 Banner PWA (Android)
import PWABanner from "./components/PWABanner";
// 🔥 Banner instruccional para iOS

export default function AppRouter() {
  return (
    <>
      {/* Banner nativo de instalación */}
      <PWABanner />
     

      {/* Rutas principales */}
      <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/tarjetas" element={<TarjetasPage />} />
        <Route path="/atlash/:slug" element={<AtlashVisor />} />
      </Routes>
    </>
  );
}
