// ============================================================
// 📲 PWABannerAndroid.jsx — Banner de instalación para Android
// Omega-5 / El Shopper Digital
// ============================================================

import React, { useEffect, useState } from "react";
import "../styles/pwa-banner.css";

export default function PWABannerAndroid() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const instalar = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✔ Usuario instaló la PWA");
    } else {
      console.log("❌ Usuario rechazó instalación");
    }

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="pwa-banner">
      <div className="pwa-banner-content">
        <h3 className="pwa-title">Instala El Shopper Digital</h3>
        <p className="pwa-subtitle">Acceso rápido y directo desde tu pantalla</p>

        <button className="pwa-install-btn" onClick={instalar}>
          Instalar ahora
        </button>

        <button className="pwa-close-btn" onClick={() => setVisible(false)}>
          ✕
        </button>
      </div>
    </div>
  );
}
