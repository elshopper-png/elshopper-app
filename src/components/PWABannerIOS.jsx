// ============================================================
// 📱 PWABannerIOS — Banner Premium para iPhone/iPad (Omega-5)
// ============================================================

import React, { useEffect, useState } from "react";
import "../styles/PWABannerIOS.css";

export default function PWABannerIOS() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const standalone = window.navigator.standalone === true;

    // Mostrar SOLO si:
    // - Es iOS
    // - No está instalada como app
    if (isIos && !standalone) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="pwa-banner-ios slide-up">
      <img
        src="/icons/pwa/app-icon-96.png"
        alt="El Shopper App Icon"
        className="pwa-ios-icon"
      />

      <div className="pwa-ios-text">
        <div className="pwa-title">El Shopper Digital</div>

        <div className="pwa-subtitle">
          El Shopper de Los Olivos ahora es una app. Instálala gratis.<br />
          Pulsa <strong>Compartir</strong> → <strong>Agregar a inicio</strong>
        </div>
      </div>

      <button className="pwa-close" onClick={() => setShow(false)}>×</button>
    </div>
  );
}
