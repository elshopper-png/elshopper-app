// ============================================================
// CategoryGrid.jsx — Omega-5 (Fase 2)
// 16 giros oficiales de El Shopper, en el ORDEN exacto indicado.
// – Grid mobile 2 columnas (estilos en CategoryGrid.css)
// – Contómetro en círculo blanco arriba-izquierda
// – Sin flechas ni alerts
// – “Salud Integral” navega a /salud-integral
// ============================================================

import React from "react";
import "./CategoryGrid.css";
import { useNavigate } from "react-router-dom";

// Orden OFICIAL (tal cual lo pediste)
const CATEGORIES = [
  { id: 1,  name: "Belleza & SPA",              emoji: "💅", color: "#ff007a" },
  { id: 2,  name: "Gastronomía & Snacks",       emoji: "🍔", color: "#ffb703" },
  { id: 3,  name: "Servicios Profesionales",    emoji: "🤝", color: "#556b2f" },
  { id: 4,  name: "Educación",                  emoji: "🎓", color: "#00b4d8" },
  { id: 5,  name: "Fitness & Deportes",         emoji: "💪", color: "#f77f00" },
  { id: 6,  name: "Hogar & Servicios",          emoji: "🏠", color: "#00bfa6" },
  { id: 7,  name: "Construcción & Ferretería",  emoji: "🏗️", color: "#7a3e1d" },
  { id: 8,  name: "Informática & Reparación",   emoji: "💻", color: "#0077b6" },
  { id: 9,  name: "Marketing & Imprenta",       emoji: "📣", color: "#6a4c93" },
  { id:10,  name: "Moda & Joyería",             emoji: "💍", color: "#e91e63" },
  { id:11,  name: "Muebles & Decoraciones",     emoji: "🪑", color: "#9b5de5" },
  { id:12,  name: "Salud Integral",             emoji: "💊", color: "#06d6a0" },
  { id:13,  name: "Servicio Técnico",           emoji: "🔧", color: "#5d4037" },
  { id:14,  name: "Inmobiliarias",              emoji: "🏢", color: "#3f51b5" },
  { id:15,  name: "Veterinarias & Pet Shop",    emoji: "🐾", color: "#ff6600" },
  { id:16,  name: "Fiestas & Eventos",          emoji: "🎉", color: "#ff5c8a" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (name) => {
    // Navegación activa solo para Salud Integral en Fase 2
    if (name.toLowerCase() === "salud integral") {
      navigate("/salud-integral");
    }
    // Los demás quedan listos para asignarles su ruta en Fase 3
  };

  return (
    <div className="category-grid">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className="category-card"
          style={{ backgroundColor: cat.color }}
          onClick={() => handleClick(cat.name)}
          aria-label={cat.name}
        >
          <span className="category-counter">{cat.id}</span>
          <span className="category-emoji" aria-hidden="true">{cat.emoji}</span>
          <span className="category-name">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
