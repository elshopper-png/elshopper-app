import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Gastronomía & Snacks", key: "gastronomia", icon: "🍽️" },
    { name: "Construcción & Ferretería", key: "construccion", icon: "🏗️" },
    { name: "Salud & Bienestar", key: "salud", icon: "💊" },
    { name: "Moda & Estilo", key: "moda", icon: "👗" }
  ];

  return (
    <div className="home">
      <h1 className="title">El Shopper de Los Olivos Digital</h1>
      <p className="subtitle">
        En Los Olivos tenemos los mejores productos y servicios a un clic de distancia
      </p>

      <div className="categories-grid">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className="category-button"
            onClick={() => navigate(`/categoria/${cat.key}`)}
          >
            <span className="icon">{cat.icon}</span>
            <span className="label">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
