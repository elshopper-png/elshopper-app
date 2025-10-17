import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const categories = {
    gastronomia: {
      title: "Gastronomía & Snacks",
      description: "Restaurantes, snacks y todo para disfrutar de la buena comida.",
      image: "/assets/categories/gastronomia.jpg"
    },
    construccion: {
      title: "Construcción & Ferretería",
      description: "Todo lo que necesitas para tus proyectos de hogar o negocio.",
      image: "/assets/categories/construccion.jpg"
    },
    salud: {
      title: "Salud & Bienestar",
      description: "Centros médicos, farmacias y servicios de salud integral.",
      image: "/assets/categories/salud.jpg"
    },
    moda: {
      title: "Moda & Estilo",
      description: "Ropa, calzado y accesorios con lo último de la tendencia.",
      image: "/assets/categories/moda.jpg"
    }
  };

  const category = categories[name.toLowerCase()] || {
    title: "Categoría no encontrada",
    description: "Lo sentimos, esta categoría no existe.",
    image: "/assets/categories/default.jpg"
  };

  return (
    <div className="category-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Volver
      </button>

      <img
        src={category.image}
        alt={category.title}
        className="category-image"
      />

      <h1>{category.title}</h1>
      <p>{category.description}</p>
    </div>
  );
}
