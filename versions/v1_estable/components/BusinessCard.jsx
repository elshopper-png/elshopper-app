import React from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessCard.css";

export default function BusinessCard({ business }) {
  const navigate = useNavigate();

  return (
    <div
      className="business-card"
      onClick={() => navigate(`/business/${business.id}`)}
    >
      <img src={business.image} alt={business.name} className="business-img" />
      <h3 className="business-name">{business.name}</h3>
      <p className="business-desc">{business.short}</p>
    </div>
  );
}
