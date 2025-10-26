import React from "react";
import { useNavigate } from "react-router-dom";
import "./SaludIntegral.css";

export default function SaludIntegral() {
  const navigate = useNavigate();

  // 🔹 rutas absolutas (public/anunciadores/...)
  const cards = [
    "/anunciadores/renova-plus/card1.png",
    "/anunciadores/renova-plus/card2.png",
    "/anunciadores/renova-plus/card3.png",
    "/anunciadores/renova-plus/card4.png",
  ];

  return (
    <div className="salud-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅
      </button>

      <div className="cards-container">
        {cards.map((src, i) => (
          <div key={i} className="card-wrapper">
            <img src={src} alt={`Tarjeta ${i + 1}`} className="card-img" />
          </div>
        ))}
      </div>
    </div>
  );
}
