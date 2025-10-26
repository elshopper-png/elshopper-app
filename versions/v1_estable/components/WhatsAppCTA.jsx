// ============================================================
// WhatsAppCTA.jsx — Omega-5 Fase 2.4
// ============================================================

import React from "react";
import "./WhatsAppCTA.css";

export default function WhatsAppCTA() {
  const phone = "51993490886";
  const text = "Hola, quisiera publicar mi negocio en El Shopper de Los Olivos Digital. Gracias 😊";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="wa-cta">
      <img src="/icons/whatsapp.svg" alt="WhatsApp" className="wa-icon" />
      ¿Quieres publicar?
    </a>
  );
}
