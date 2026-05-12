// ============================================================
// 🏁 INDEX.JS — OMEGA-25 ESTABLE + GA4
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import AppRouter from "./AppRouter.jsx";

import "./styles/base.css";
import "./styles/tarjetas.css";

// ============================================================
// 📊 Google Analytics 4 — El Shopper Digital
// ============================================================
ReactGA.initialize("G-JBVY7WQM1J");

// ============================================================
// 📲 Tracking instalación PWA
// ============================================================
window.addEventListener("appinstalled", () => {
  ReactGA.event({
    category: "PWA",
    action: "Installed",
    label: "El Shopper Digital",
  });
});

// ============================================================
// 🔙 Listener Universal — Puente de Madera OMEGA-25
// ============================================================
window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "O25_VOLVER") return;
  window.history.back();
});

// ============================================================
// 🚫 Service Worker DESACTIVADO SOLO EN DESARROLLO
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