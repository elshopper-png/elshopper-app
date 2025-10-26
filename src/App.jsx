// =====================================================
// 🚀 App.jsx — Omega-5 Auditoría (Fase 2 Refinada)
// 🔹 Carga directa de la versión refinada de Home
// =====================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_refinada from "./pages/v2_refinada/Home.jsx";
import SaludIntegral from "./pages/SaludIntegral.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<Home_refinada />} />

        {/* 💊 Página de Salud Integral */}
        <Route path="/salud-integral" element={<SaludIntegral />} />
      </Routes>
    </Router>
  );
}
