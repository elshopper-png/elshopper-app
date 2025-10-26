// ============================================================
// CategoryGrid.jsx — Omega-5 Auditado (Fase 2)
// Grid 2x8, sin flechas ni footer, con contómetros y “press”
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryGrid.css";

const SLUGS = {
  "belleza & spa": "/belleza-spa",
  "gastronomía & snacks": "/gastronomia-snacks",
  "servicios profesionales": "/servicios-profesionales",
  "educación & cursos": "/educacion-cursos",
  "fitness & deportes": "/fitness-deportes",
  "hogar & servicios": "/hogar-servicios",
  "construcción & ferretería": "/construccion-ferreteria",
  "informática & reparación": "/informatica-reparacion",
  "marketing & imprenta": "/marketing-imprenta",
  "moda & joyería": "/moda-joyeria",
  "muebles & decoraciones": "/muebles-decoraciones",
  "salud integral": "/salud-integral",
  "servicio técnico": "/servicio-tecnico",
  "inmobiliarias": "/inmobiliarias",
  "veterinarias & pet shop": "/veterinarias-pet-shop",
  "fiestas & eventos": "/fiestas-eventos",
};

const CATEGORIES = [
  { id: 1,  name: "Belleza & SPA",              emoji: "✂️",  color: "#FF006F" },
  { id: 2,  name: "Gastronomía & Snacks",       emoji: "🍔",  color: "#FFB703" },
  { id: 3,  name: "Servicios Profesionales",    emoji: "🧑‍💼", color: "#4F7F73" },
  { id: 4,  name: "Educación & Cursos",         emoji: "🎓",  color: "#00B4D8" },
  { id: 5,  name: "Fitness & Deportes",         emoji: "💪",  color: "#FF7700" },
  { id: 6,  name: "Hogar & Servicios",          emoji: "🏠",  color: "#87C9E7" },
  { id: 7,  name: "Construcción & Ferretería",  emoji: "🏗️",  color: "#8B4513" },
  { id: 8,  name: "Informática & Reparación",   emoji: "🖥️",  color: "#2D6DE0" },
  { id: 9,  name: "Marketing & Imprenta",       emoji: "🖨️",  color: "#7C4DFF" },
  { id: 10, name: "Moda & Joyería",             emoji: "💍",  color: "#F2994A" },
  { id: 11, name: "Muebles & Decoraciones",     emoji: "🛋️",  color: "#9B59B6" },
  { id: 12, name: "Salud Integral",             emoji: "💊",  color: "#06D6A0" },
  { id: 13, name: "Servicio Técnico",           emoji: "🛠️",  color: "#203A43" },
  { id: 14, name: "Inmobiliarias",              emoji: "🏢",  color: "#1ABC9C" },
  { id: 15, name: "Veterinarias & Pet Shop",    emoji: "🐾",  color: "#FF6600" },
  { id: 16, name: "Fiestas & Eventos",          emoji: "🎉",  color: "#FF5C8A" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    const key = name.trim().toLowerCase();
    const fixed = SLUGS[key];
    if (fixed) return navigate(fixed);

    // fallback seguro
    const slug = key.replace(/ & /g, "-").replace(/\s+/g, "-");
    navigate(`/${slug}`);
  };

  return (
    <div className="catgrid__wrap">
      <div className="catgrid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="catgrid__card"
            style={{ backgroundColor: cat.color }}
            onClick={() => handleCardClick(cat.name)}
          >
            <span className="catgrid__counter">0</span>
            <span className="catgrid__emoji" aria-hidden="true">{cat.emoji}</span>
            <span className="catgrid__name">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
