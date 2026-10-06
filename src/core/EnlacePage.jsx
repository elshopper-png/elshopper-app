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
  // Canonical: URL pública oficial /enlace/<slug>
  // ============================================================
  useEffect(() => {
    if (!anunciante?.nombre) return;

    // ============================================================
    // TÍTULO SEO
    // ============================================================
    document.title = `${anunciante.nombre} | ${giro} | El Shopper`;

    // ============================================================
    // META DESCRIPTION SEO
    // ============================================================
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

    // ============================================================
    // CANONICAL — URL PÚBLICA OFICIAL DEL ANUNCIANTE
    // ============================================================
    const canonicalURL =
      `https://elshopper-pwa.vercel.app/enlace/${slug}`;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    const canonicalExistia = Boolean(canonical);

    const canonicalOriginal =
      canonical?.getAttribute("href") || "";

    // Si no existe canonical, lo crea
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    // Asigna la URL pública oficial del anunciante
    canonical.setAttribute("href", canonicalURL);

        // ============================================================
    // DATOS ESTRUCTURADOS JSON-LD — SCHEMA.ORG
    // ============================================================
    let schemaScript = null;

    if (anunciante?.seo?.tipo) {
      const schemaData = {
        "@context": "https://schema.org",
        "@type": anunciante.seo.tipo,
        name: anunciante.nombre,
        description: anunciante.seo.descripcion,
        url: canonicalURL,
image: anunciante.imagen
  ? `https://elshopper-pwa.vercel.app${anunciante.imagen}`
  : undefined,
telephone: anunciante.whatsapp
          ? `+${anunciante.whatsapp}`
          : undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: anunciante.seo.direccion,
          addressLocality: anunciante.seo.distrito,
          addressRegion: anunciante.seo.provincia,
          addressCountry: anunciante.seo.pais,
        },
      };

      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = "shopper-schema-anunciante";
      schemaScript.textContent = JSON.stringify(schemaData);

      document.head.appendChild(schemaScript);
    }

    // ============================================================
    // RESTAURAR VALORES GENERALES AL ABANDONAR ESTA PÁGINA
    // ============================================================
    return () => {
            schemaScript?.remove();
      document.title = "El Shopper Digital";

      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          descripcionOriginal
        );
      }

      if (canonical) {
        if (canonicalExistia) {
          canonical.setAttribute(
            "href",
            canonicalOriginal
          );
        } else {
          canonical.remove();
        }
      }
    };
    }, [
    anunciante?.nombre,
    anunciante?.whatsapp,
    anunciante?.seo?.tipo,
    anunciante?.seo?.descripcion,
    anunciante?.seo?.direccion,
    anunciante?.seo?.distrito,
    anunciante?.seo?.provincia,
    anunciante?.seo?.pais,
    giro,
    slug
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
         🔎 FICHA PÚBLICA SEO / GEO DEL ANUNCIANTE
         Visible para usuarios y rastreable por buscadores
         ============================================================ */}
      {anunciante?.seo && (
        <section
          style={{
            padding: "18px 18px 16px",
            textAlign: "left",
            backgroundColor: "#fff",
          }}
        >
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "20px",
              lineHeight: "1.25",
              color: "#222",
            }}
          >
            {anunciante.nombre}
          </h1>

          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            {giro}
            {anunciante.seo.distrito
              ? ` · ${anunciante.seo.distrito}`
              : ""}
          </div>

        
        </section>
      )}

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