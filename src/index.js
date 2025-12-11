// ============================================================
// 🏁 INDEX.JS — Versión estable OMEGA-25
// ------------------------------------------------------------
// - SIN Service Worker (previene pantalla blanca en móviles)
// - Listener O25_VOLVER funcionando
// - Compatible con CRA y con Vercel
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
// 🚫 DESACTIVACIÓN TOTAL DEL SERVICE WORKER (100% seguro)
// ------------------------------------------------------------
// * Evita pantalla blanca en Android
// * Evita SW viejo de CRA
// * Evita SW duplicados en Vercel
// ============================================================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister());
  });
  navigator.serviceWorker.ready.then((reg) => {
    reg.unregister();
  }).catch(() => {});
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
