import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdCard.css";

export default function AdCard({ ad }) {
  const navigate = useNavigate();

  return (
    <div
      className="ad-card"
      onClick={() => navigate(`/negocio/${ad.slug}`)}
    >
      <img src={ad.image} alt={ad.name} className="ad-image" />
      <div className="ad-info">
        <h3 className="ad-name">{ad.name}</h3>
        <p className="ad-desc">{ad.description}</p>
      </div>
    </div>
  );
}
