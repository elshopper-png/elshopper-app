// ============================================================
// 🚀 AppRouter — CRA CORE ESTABLE + GA4
// ============================================================

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

import HomeBase from "./core/HomeBase.jsx";
import TarjetasPage from "./fase_2/core/TarjetasPage.jsx";
import AtlashVisor from "./AtlashVisor.jsx";
import EnlacePage from "./core/EnlacePage.jsx";

import PWABanner from "./components/PWABanner";

// ============================================================
// 📊 Tracker automático de rutas GA4
// ============================================================
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });

    console.log("📊 GA4 PageView:", location.pathname);
  }, [location]);

  return null;
}

// ============================================================
// 🚀 Router principal
// ============================================================
export default function AppRouter() {
  return (
    <>
      {/* 📊 Tracker global */}
      <AnalyticsTracker />

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