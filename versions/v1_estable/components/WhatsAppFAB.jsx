import React from "react";
import "./WhatsAppCTA.css";

export default function WhatsAppFAB() {
  // ✅ Tu número real de WhatsApp (solo números, sin + ni espacios)
  const phoneNumber = "51993490886"; // <-- reemplaza por el tuyo

  // ✅ Mensaje predeterminado
  const message = encodeURIComponent("¡Hola! Quiero publicar en El Shopper.");

  // ✅ URL de WhatsApp con tu número y texto
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/icons/whatsapp.svg" alt="WhatsApp" className="whatsapp-icon" />
      <span className="whatsapp-text">¿Quieres publicar?</span>
    </a>
  );
}
