import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  const whatsappNumber = "51999999999"; // Reemplaza con tu número
  const message = encodeURIComponent("¡Hola! Quiero anunciar en El Shopper.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="whatsapp-container">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-text">¿Quieres anunciar?</span>
      </a>
    </div>
  );
}

export default WhatsAppButton;
