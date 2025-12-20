// ============================================================
// 🧩 TarjetasPage.jsx — CRA + ATLASH O25 (URL SAFE / PRODUCCIÓN)
// ============================================================

import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CATEGORIES from "../../data/categories.json";
import TARJETAS_DATA from "../../data/tarjetas.json";

import "../styles/tarjetas.css";

export default function TarjetasPage() {
  const navigate = useNavigate();
  const { giroSlug } = useParams(); // ✅ viene SIEMPRE desde la URL

  // ============================================================
  // 🟦 Categoría actual
  // ============================================================
  const categoria = useMemo(() => {
    if (!giroSlug) return null;
    return CATEGORIES.find((c) => c.slug === giroSlug) || null;
  }, [giroSlug]);

  // ============================================================
  // 🟦 Tarjetas del giro
  // ============================================================
  const tarjetas = useMemo(() => {
    if (!giroSlug) return [];
    const entry = TARJETAS_DATA.find((g) => g.giroSlug === giroSlug);
    return entry?.tarjetas || [];
  }, [giroSlug]);

  // ============================================================
  // 🎨 Color de fondo seguro
  // ============================================================
  const colorTapiz = categoria?.color || "#0fbad1";

  // ============================================================
  // 🟥 RENDER
  // ============================================================
  return (
    <div className="tarjetas-wrapper" style={{ backgroundColor: colorTapiz }}>
      
      {/* ================= CABECERA ================= */}
      <header className="tarjetas-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
          aria-label="Volver"
          title="Volver"
        >
          ←
        </button>

        <div className="header-text">
          <div className="linea1">Haz clic en las tarjetas</div>
          <div className="linea2">para ver los avisos</div>
        </div>
      </header>

      {/* ================= LISTA ================= */}
      <main className="tarjetas-grid">

        {/* Giro inválido */}
        {!categoria && (
          <div className="sin-tarjetas">
            Este giro no existe.
          </div>
        )}

        {/* Tarjetas */}
        {categoria &&
          tarjetas.map((t, i) => (
            <article
              key={`${t.slug}-${i}`}
              className="tarjeta-item pressable"
              onClick={() => navigate(`/atlash/${t.slug}`)}
            >
              <img
                className="tarjeta-img"
                src={t.imagen}
                alt={t.nombre}
                loading="lazy"
              />
            </article>
          ))}

        {/* Giro válido sin tarjetas */}
        {categoria && tarjetas.length === 0 && (
          <div className="sin-tarjetas">
            No hay tarjetas para este giro aún.
          </div>
        )}
      </main>
    </div>
  );
}
