// ============================================================
// 🏁 INDEX.JS — OMEGA-25 ESTABLE
// ------------------------------------------------------------
// - Service Worker desactivado SOLO en desarrollo
// - Producción intacta (PWA lista para reactivarse)
// - Listener O25_VOLVER activo
// - Compatible con CRA + Vercel
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";

import "./styles/base.css";
import "./styles/tarjetas.css";

// ============================================================
// 🔙 Listener Universal — Puente de Madera OMEGA-25
// ============================================================
window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "O25_VOLVER") return;
  window.history.back();
});

// ============================================================
// 🚫 Service Worker DESACTIVADO SOLO EN DESARROLLO
// ------------------------------------------------------------
// - Evita pantallas blancas en localhost
// - No afecta producción
// - Permite reactivar PWA cuando toque
// ============================================================
if (
  process.env.NODE_ENV !== "production" &&
  "serviceWorker" in navigator
) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

// ============================================================
// 🚀 Render principal de React
// ============================================================
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
