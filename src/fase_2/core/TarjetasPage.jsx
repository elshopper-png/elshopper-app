// ============================================================
// 🧩 TarjetasPage.jsx — Versión estable CRA + ATLASH O25 (ESLint Safe)
// ============================================================

import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CATEGORIES from "../../data/categories.json";
import TARJETAS_DATA from "../../data/tarjetas.json";

import "../styles/tarjetas.css";

export default function TarjetasPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🟦 1) Recuperamos el giro desde state
  const giroSlug = location.state?.giro || null;

  // 🟦 2) Hooks SIEMPRE deben ir antes de cualquier return
  const categoria = useMemo(() => {
    if (!giroSlug) return null;
    return CATEGORIES.find((c) => c.slug === giroSlug);
  }, [giroSlug]);

  const tarjetas = useMemo(() => {
    if (!giroSlug) return [];
    const entry = TARJETAS_DATA.find((g) => g.giroSlug === giroSlug);
    return entry?.tarjetas || [];
  }, [giroSlug]);

  // Color de fondo
  const colorTapiz = categoria?.color || "#0fbad1";

  // 🟥 3) Return principal SIEMPRE al final
  return (
    <div className="tarjetas-wrapper" style={{ backgroundColor: colorTapiz }}>
      
      {/* === CABECERA === */}
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

      {/* === LISTA DE TARJETAS === */}
      <main className="tarjetas-grid">
        
        {/* Si no hay giro seleccionado */}
        {!giroSlug && (
          <div className="sin-tarjetas">No hay tarjetas para este giro.</div>
        )}

        {/* Mostrar tarjetas si existen */}
        {giroSlug &&
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

        {/* Si hay giro pero no hay tarjetas */}
        {giroSlug && tarjetas.length === 0 && (
          <div className="sin-tarjetas">No hay tarjetas para este giro aún.</div>
        )}
      </main>
    </div>
  );
}
