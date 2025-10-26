// ============================================================
// Home.jsx — Omega-5 Auditoría Final Fase 2
// Portada estable: logo, título, lema, grid 2x8, música y CTA WhatsApp
// ============================================================

import React from "react";

// ====== Importaciones limpias y garantizadas ======
import "../../components/CategoryGrid.css";
import CategoryGrid from "../../components/CategoryGrid.jsx";
import "../../components/WhatsAppCTA.css";
import WhatsAppCTA from "../../components/WhatsAppCTA.jsx";
import "../../components/MusicPlayer.css";
import MusicPlayer from "../../components/MusicPlayer.jsx";

// ====== Estilos específicos de esta página ======
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* ================= ENCABEZADO ================= */}
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

      {/* ================= GRID ================= */}
      <main className="grid-wrapper">
        <CategoryGrid />
      </main>

      {/* ================= BOTÓN WHATSAPP (junto al grid) ================= */}
      <section className="cta-wrapper">
        <WhatsAppCTA />
      </section>

      {/* ================= MÚSICA ================= */}
      <div className="music-wrapper">
        <MusicPlayer />
      </div>

      {/* ================= FOOTER ÚNICO ================= */}
      <footer className="footer">
        © 2025 El Shopper Digital. Todos los derechos reservados.
      </footer>
    </div>
  );
}
