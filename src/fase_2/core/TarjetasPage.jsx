// ============================================================
// 🧩 TarjetasPage.jsx — Versión estable CRA + ATLASH O25
// ============================================================

import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CATEGORIES from "../../data/categories.json";
import TARJETAS_DATA from "../../data/tarjetas.json";


import "../styles/tarjetas.css";

export default function TarjetasPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 📌 Datos del giro (color, nombre, etc.)
  const categoria = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === slug);
  }, [slug]);

  const colorTapiz = categoria?.color || "#0fbad1";

  // 📌 Tarjetas del giro seleccionado
  const tarjetas = useMemo(() => {
    const entry = TARJETAS_DATA.find((g) => g.giroSlug === slug);
    return entry?.tarjetas || [];
  }, [slug]);

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
        {tarjetas.map((t, i) => (
          <article
            key={`${t.slug}-${i}`}
            className="tarjeta-item pressable"
            onClick={() => navigate(`/atlash/${t.slug}`)}  // ✔ VIGA 3 limpia O25
          >
            <img
              className="tarjeta-img"
              src={t.imagen}
              alt={t.nombre}
              loading="lazy"
            />
          </article>
        ))}

        {tarjetas.length === 0 && (
          <div className="sin-tarjetas">No hay tarjetas para este giro aún.</div>
        )}
      </main>
    </div>
  );
}
