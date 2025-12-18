// ============================================================
// 🔗 EnlacePage.jsx — Enlace Oficial del Anunciante
// Modelo Franciscano • Independiente • Reversible
// ============================================================

import React from "react";
import { useParams } from "react-router-dom";

export default function EnlacePage() {
  const { slug } = useParams();

  const APP_URL = "https://elshopper-pwa.vercel.app";
  const iframeSrc = `/atlash/${slug}`;

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        textAlign: "center",
      }}
    >
      {/* 🧠 Texto intimista */}
      <h2 style={{ marginBottom: "12px" }}>
        Mi anuncio en El Shopper Digital:
      </h2>

      {/* 📦 Aviso vivo (iframe ATLASH) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "221.875%", // 14.2 / 6.4 * 100
          overflow: "hidden",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <iframe
          src={iframeSrc}
          title={`Aviso ${slug}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          scrolling="no"
        />
      </div>

      {/* 📲 CTA */}
      <a
        href={APP_URL}
        style={{
          display: "inline-block",
          backgroundColor: "#e6007e",
          color: "#ffffff",
          padding: "14px 20px",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        Descarga El Shopper Digital
      </a>

      {/* 🍎 Nota iPhone */}
      <p style={{ fontSize: "13px", color: "#555", marginTop: "8px" }}>
        En iPhone puedes guardarla desde Safari como acceso directo en tu pantalla
        de inicio o usarla como web.
      </p>
    </div>
  );
}
