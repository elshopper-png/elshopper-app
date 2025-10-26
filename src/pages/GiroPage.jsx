import React from "react";
import "./GiroPage.css";

const anunciadores = [
  {
    nombre: "Tienda Renova Plus",
    descripcion: "💊 Renova Plus devuelve energía, fortalece cabello y uñas, y revitaliza tu piel desde dentro. ¡Una dosis al día para verte y sentirte mejor!",
    banner: "/anunciadores/renova/banner.jpg",
    color: "#FDE68A",
    link: "https://google.com" // Temporal hasta enlazar con Fase 3
  },
  {
    nombre: "Centro de Bienestar Vida Sana",
    descripcion: "🌿 Terapias naturales, masajes relajantes y tratamientos para el cuerpo y el alma. Tu salud en buenas manos.",
    banner: "/anunciadores/vidasana/banner.jpg",
    color: "#B9FBC0",
    link: "https://google.com"
  },
  {
    nombre: "Farmacia Salud Total",
    descripcion: "💚 Productos farmacéuticos, vitaminas y atención personalizada. ¡Todo para tu bienestar diario!",
    banner: "/anunciadores/saludtotal/banner.jpg",
    color: "#A0E7E5",
    link: "https://google.com"
  }
];

export default function GiroPage() {
  return (
    <div className="giro-page">
      <h2 className="giro-title">Salud Integral</h2>
      <div className="tarjetas-grid">
        {anunciadores.map((a, index) => (
          <div
            key={index}
            className="tarjeta"
            style={{ backgroundColor: a.color }}
            onClick={() => window.open(a.link, "_blank")}
          >
            <img src={a.banner} alt={a.nombre} className="banner" />
            <h3 className="nombre">{a.nombre}</h3>
            <p className="descripcion">{a.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );<div id="omega5-test">✅ CSS Omega-5 activo</div>

}
