// ============================================================
// 🔗 EnlacePage.jsx — Enlace Premium Compartible (O25 FINAL)
// Muestra AVISO VIVO + CTA Descarga AL FINAL
// ============================================================

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EnlacePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "0",
        textAlign: "center",
      }}
    >
      {/* ============================================================
         🟦 AVISO VIVO (ATLASH) — DIRECTO, SIN TARJETA
         ============================================================ */}
      <div
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <iframe
          src={`/atlash/${slug}`}
          title={`Aviso ${slug}`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen"
        />
      </div>

      {/* ============================================================
         🔴 CTA GLOBAL — DESCARGA EL SHOPPER DIGITAL
         (SIEMPRE AL FINAL DEL AVISO VIVO)
         ============================================================ */}
      <div style={{ padding: "18px 16px" }}>
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
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              marginTop: "4px",
            }}
          >
            Más negocios y servicios en Lima Norte
          </div>
        </button>

        <p
          style={{
            marginTop: "14px",
            fontSize: "12px",
            color: "#555",
            lineHeight: "1.4",
          }}
        >
          En iPhone puedes guardarlo como Favorito y tenerlo siempre a la mano
        </p>
      </div>
    </div>
  );
}
