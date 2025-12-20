// ============================================================
// 🔗 EnlacePage.jsx — Enlace Premium Compartible (O25 FINAL)
// ============================================================

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TARJETAS_DATA from "../data/tarjetas.json";

export default function EnlacePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Buscar tarjeta por slug
  const tarjeta = TARJETAS_DATA
    .flatMap((g) => g.tarjetas)
    .find((t) => t.slug === slug);

  if (!tarjeta) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Aviso no encontrado.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "16px",
        textAlign: "center",
      }}
    >
      {/* 🖼️ AVISO */}
      <img
        src={tarjeta.imagen}
        alt={tarjeta.nombre}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "12px",
        }}
      />

      {/* 🔴 CTA DESCARGA */}
      <div style={{ marginTop: "28px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#e6007e",
            color: "#fff",
            border: "none",
            borderRadius: "28px",
            padding: "14px 22px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Descarga El Shopper Digital
          <div style={{ fontSize: "13px", fontWeight: "400", marginTop: "4px" }}>
            Más negocios y servicios en Los Olivos
          </div>
        </button>
      </div>

      {/* ℹ️ NOTA IPHONE */}
      <p
        style={{
          marginTop: "14px",
          fontSize: "12px",
          color: "#555",
          lineHeight: "1.4",
        }}
      >
        En iPhone puedes guardarla desde Safari como acceso directo en tu
        pantalla de inicio o usarla como web.
      </p>
    </div>
  );
}
