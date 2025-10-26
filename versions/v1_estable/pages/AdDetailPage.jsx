import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdDetailPage.css";

export default function AdDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="ad-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅️
      </button>
      <h2>Negocio: {slug.replace("-", " ").toUpperCase()}</h2>
      <p>Detalle próximamente...</p>
    </div>
  );
}
