import React from "react";
import "./Home_clean.css";

const CATEGORIES = [
  { nombre: "Belleza & SPA", emoji: "💅", color: "#FF006E" },
  { nombre: "Construcción & Ferretería", emoji: "🏗️", color: "#C35A13" },
  { nombre: "Educación & Cursos", emoji: "🎓", color: "#0077B6" },
  { nombre: "Fitness & Deportes", emoji: "💪", color: "#7209B7" },
  { nombre: "Gastronomía & Snacks", emoji: "🍔", color: "#FFB703" },
  { nombre: "Hogar & Servicios", emoji: "🏡", color: "#52B788" },
  { nombre: "Informática & Reparación", emoji: "💻", color: "#4361EE" },
  { nombre: "Inmobiliarias", emoji: "🏢", color: "#008080" },
  { nombre: "Marketing & Imprenta", emoji: "📰", color: "#FB5607" },
  { nombre: "Moda & Joyería", emoji: "💍", color: "#D90368" },
  { nombre: "Muebles & Decoraciones", emoji: "🛋️", color: "#6930C3" },
  { nombre: "Salud Integral", emoji: "🧘", color: "#AACC00" },
  { nombre: "Servicio Técnico", emoji: "🛠️", color: "#495057" },
  { nombre: "Servicios Profesionales", emoji: "📑", color: "#8D5A5A" },
];

export default function HomeClean() {
  return (
    <div className="home-container">
      <img src="/logo.png" alt="Logo El Shopper" className="logo" />
      <h1>EL SHOPPER<br />DE LOS OLIVOS DIGITAL</h1>
      <p className="lema">
        En Los Olivos tenemos los mejores productos y servicios<br />¡a un CLIC de distancia!
      </p>

      <div className="grid-categorias">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.nombre}
            className="categoria-btn"
            style={{ backgroundColor: cat.color }}
          >
            <span className="emoji">{cat.emoji}</span>
            <span className="nombre">{cat.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
