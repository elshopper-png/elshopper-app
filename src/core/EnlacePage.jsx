// ============================================================
// 🔗 EnlacePage.jsx — Enlace Premium Compartible (O25 FINAL)
// Muestra AVISO VIVO + CTA Descarga AL FINAL
// ============================================================

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tarjetasData from "../data/tarjetas.json";

export default function EnlacePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // ============================================================
  // 🔎 IDENTIDAD DEL ANUNCIANTE
  // Busca la tarjeta correspondiente al slug actual
  // ============================================================
  const categoria = tarjetasData.find((grupo) =>
    grupo.tarjetas?.some((tarjeta) => tarjeta.slug === slug)
  );

  const anunciante = categoria?.tarjetas?.find(
    (tarjeta) => tarjeta.slug === slug
  );

  const giro = categoria?.giro || "";

  // ============================================================
  // 🔎 SEO DINÁMICO DEL ENLACE PÚBLICO
  // Título: datos generales del anunciante
  // Descripción: SOLO bloque seo.descripcion
  // ============================================================
  useEffect(() => {
    if (!anunciante?.nombre) return;

    // Título SEO
    document.title = `${anunciante.nombre} | ${giro} | El Shopper`;

    // Meta description existente en public/index.html
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    const descripcionOriginal =
      metaDescription?.getAttribute("content") || "";

    // Solo modifica la descripción si el anunciante
    // posee la nueva estructura SEO
    if (metaDescription && anunciante?.seo?.descripcion) {
      metaDescription.setAttribute(
        "content",
        `${anunciante.nombre} — ${anunciante.seo.descripcion} Encuéntralo en El Shopper Digital.`
      );
    }

    // Restaurar valores generales al abandonar esta página
    return () => {
      document.title = "El Shopper Digital";

      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          descripcionOriginal
        );
      }
    };
  }, [
    anunciante?.nombre,
    anunciante?.seo?.descripcion,
    giro
  ]);

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