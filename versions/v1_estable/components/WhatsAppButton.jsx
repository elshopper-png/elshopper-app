import React from "react";

export default function WhatsappButton() {
  const phone = "51993490886";
  const message = encodeURIComponent(
    "Hola 👋, deseo información para publicar en El Shopper Digital, gracias 🙏"
  );
  const whatsappLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      <img src="/icons/whatsapp.svg" alt="WhatsApp" style={styles.icon} />
      <span style={styles.text}>¿Quieres publicar?</span>
    </a>
  );
}

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    color: "white",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "17px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    animation: "pulse 2s infinite",
  },
  icon: {
    width: "28px",
    height: "28px",
    marginRight: "10px",
  },
  text: {
    letterSpacing: "0.3px",
  },
};

// Animación de brillo suave
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  const keyframes = `
    @keyframes pulse {
      0% { box-shadow: 0 0 5px #25D366; }
      50% { box-shadow: 0 0 15px #25D366; }
      100% { box-shadow: 0 0 5px #25D366; }
    }
  `;
  try {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  } catch {}
}
