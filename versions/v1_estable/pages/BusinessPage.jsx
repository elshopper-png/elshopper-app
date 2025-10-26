import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import belleza from "../data/belleza";
import "./BusinessPage.css";

export default function BusinessPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const business = belleza.find((b) => b.id === parseInt(id));
  if (!business) return <p>Negocio no encontrado.</p>;

  return (
    <div className="business-page">
      <button className="back-btn" onClick={() => navigate("/")}>⬅️ Atrás</button>
      <h1>{business.name}</h1>
      <p>{business.description}</p>

      <div className="icon-links">
        {business.maps && (
          <a href={business.maps} target="_blank" rel="noopener noreferrer">📍</a>
        )}
        {business.web && (
          <a href={business.web} target="_blank" rel="noopener noreferrer">🌐</a>
        )}
        {business.facebook && (
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">📱</a>
        )}
        {business.instagram && (
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">📸</a>
        )}
      </div>

      <div className="carousel">
        {business.photos.map((photo, i) => (
          <img key={i} src={photo} alt="foto" className="carousel-img" />
        ))}
      </div>

      <div className="video-carousel">
        {business.videos.map((v, i) => (
          <video key={i} src={v} controls muted className="video-thumb"></video>
        ))}
      </div>
    </div>
  );
}
