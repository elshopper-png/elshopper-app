// ============================================================
// 🚀 AppRouter — CRA CORE ESTABLE (SIN SHARE)
// ============================================================

import { Routes, Route } from "react-router-dom";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";
import PWABanner from "./components/PWABanner";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeBase />} />
        <Route path="/tarjetas/:giroSlug" element={<TarjetasPage />} />
        <Route path="/atlash/:slug" element={<AtlashVisor />} />
      </Routes>

      <PWABanner />
    </>
  );
}
