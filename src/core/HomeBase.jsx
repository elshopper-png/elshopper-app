// ============================================================
// 🏠 HomeBase.jsx — Portada Omega-7.9 CRA Safe (FIX RUTAS)
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

import CATEGORIES from "../data/categories.json";

// 👉 Contómetro real O25
import { contarAnunciantesPorGiro } from "../utils/contometro";

import MusicToggle from "../components/MusicToggle";

export default function HomeBase() {
  const version = process.env.REACT_APP_VERSION || "F1-Stable-Omega-7.9";

  // 👉 Obtenemos los conteos reales desde tarjetas.json
  const conteo = contarAnunciantesPorGiro();

  return (
    <div className="home">
      <MusicToggle />

      {/* 🖼️ Logo + encabezado */}
      <header className="home-header">
        <img src="/portada/logo.png" alt="El Shopper Logo" />
        <h1>EL SHOPPER DIGITAL</h1>
        <p className="lema">
          En Lima Norte tenemos los <br />
          <strong>mejores productos y servicios...</strong> <br />
          <strong>¡a un CLIC de distancia!</strong>
        </p>
      </header>

      {/* 🔘 Botones de categorías */}
      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/tarjetas/${cat.slug}`}
            className="category-button"
            style={{ backgroundColor: cat.color }}
          >
            {/* 🟦 CONTÓMETRO REAL O25 */}
            {conteo[cat.slug] > 0 && (
              <span className="o25-contometro">{conteo[cat.slug]}</span>
            )}

            <span className="category-emoji">{cat.emoji}</span>
            <span className="category-name">{cat.nombre}</span>
          </Link>
        ))}
      </div>

      {/* 💬 WhatsApp CTA */}
      <div
        className="whatsapp-zone"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "28px",
          marginBottom: "32px",
        }}
      >
        <a
          href={`https://wa.me/51993490886?text=${encodeURIComponent(
            "Hola, deseo publicar en el Shopper Digital, ¿me pueden brindar más información? Gracias"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          <img
            src="/portada/botonwhatsapp.png"
            alt="¿Quieres publicar?"
            style={{
              width: "280px",
              height: "auto",
              borderRadius: "50px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        </a>
      </div>

      {/* ⚙️ Footer */}
      <footer className="home-footer">
        © 2026 El Shopper Digital — Derechos reservados
        <br />
        Versión: {version}
        <br />
        520 · 741 · 318798 · 715400 · 426
      </footer>
    </div>
  );
}
