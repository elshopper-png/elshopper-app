// ============================================================
// 💬 WhatsAppCTA.jsx — Versión funcional y final
// ============================================================

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppCTA() {
  // ✅ Número en formato internacional (sin +)
  const phoneNumber = "51993490886";

  // ✅ Mensaje prellenado
  const message =
    "Hola, deseo publicar mi aviso en el Shopper Digital, necesito información, gracias 📲";

  // ✅ Codificación correcta del texto
  const encodedMessage = encodeURIComponent(message);

  // ✅ Enlace WhatsApp universal
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div style={{ textAlign: "center", marginTop: "28px", marginBottom: "24px" }}>
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50px",
          padding: "12px 24px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaWhatsapp size={28} style={{ marginRight: "10px" }} />
        ¿Quieres publicar?
      </a>
    </div>
  );
}
