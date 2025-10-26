import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home_base.jsx";
import GiroPage from "./pages/GiroPage.jsx";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Página del giro Salud Integral */}
        <Route path="/giro/salud" element={<GiroPage />} />
      </Routes>
    </Router>
  );
}
