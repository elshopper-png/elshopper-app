// src/components/PWABanner.jsx
// Wrapper O25 — Solo muestra banner en ANDROID
// iOS ya no verá ningún aviso de instalación.

import React from "react";
import PWABannerAndroid from "./PWABannerAndroid";

// Detectar Android
function isAndroid() {
  return /Android/i.test(window.navigator.userAgent || "");
}

// Detectar si la app ya está en modo standalone (instalada)
function isStandalone() {
  if (window.matchMedia) {
    try {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
    } catch (e) {
      // silencioso
    }
  }

  // Soporte antiguo (iOS PWA, por si acaso)
  if (window.navigator.standalone) return true;

  return false;
}

export default function PWABanner() {
  // 🔒 Solo Android, nunca iOS
// PRUEBA UX TEMPORAL
// if (!isAndroid()) return null;
  // Si ya está instalada, no mostrar nada
  if (isStandalone()) return null;

  // Dejar que PWABannerAndroid maneje su propia lógica de visible / dismiss
  return <PWABannerAndroid />;
}
