// ============================================================
// 📲 PWABanner.jsx — Controla qué banner mostrar (Android / iOS)
// Omega-5 / El Shopper Digital
// ============================================================

import React from "react";
import PWABannerAndroid from "./PWABannerAndroid";
import PWABannerIOS from "./PWABannerIOS";

export default function PWABanner() {
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true; // iOS

  // Si la app YA está instalada, no mostrar nada
  if (isStandalone) return null;

  return (
    <>
      {!isIOS && <PWABannerAndroid />}
      {isIOS && <PWABannerIOS />}
    </>
  );
}
