// ============================================================
// Home_blindado.jsx — Omega-5 Auditoría Final Fase 2
// Portada estable: logo, título, lema 3 líneas, grid 2x8, música y CTA
// ============================================================

import React from "react";
import "../pages/Home_blindado.css";
import CategoryGrid from "../components/CategoryGrid.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";
import WhatsAppCTA from "../components/WhatsAppCTA.jsx";

export default function Home_blindado() {
  return (
    <div className="home-container">
      {/* ===== ENCABEZADO ===== */}
      <header className="header">
        <img src="/logo.png" alt="El Shopper" className="home-logo" />
        <h1 className="home-title">EL SHOPPER</h1>
        <h2 className="home-subtitle">DE LOS OLIVOS DIGITAL</h2>
        <p className="home-description">
          En Los Olivos tenemos los mejores productos <br />
          y servicios de calidad… <br />
          ¡a un CLIC de distancia!
        </p>
      </header>

      {/* ===== GRID ===== */}
      <CategoryGrid />

      {/* ===== CTA WHATSAPP ===== */}
      <div className="cta-wrapper">
        <WhatsAppCTA />
      </div>

      {/* ===== MÚSICA ===== */}
      <div className="music-wrapper">
        <MusicPlayer />
      </div>

      {/* ===== FOOTER ÚNICO ===== */}
      <footer className="footer">
        © 2025 El Shopper Digital. Todos los derechos reservados.
      </footer>
    </div>
  );
}
