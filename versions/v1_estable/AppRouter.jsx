import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_blindado from "./versions/v1_estable/pages/Home_blindado";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* 🔰 Página principal estable */}
        <Route path="/" element={<Home_blindado />} />

        {/* 🔒 En el futuro puedes agregar más rutas sin tocar la principal */}
        {/* <Route path="/giro/:id" element={<GiroPage />} /> */}
      </Routes>
    </Router>
  );
}
