// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";

// Estilos generales (Fase 1 y Fase 2 intactos)
import "./styles/base.css";
import "./styles/tarjetas.css";

// ============================================================
// 🧩 Listener Universal O25_VOLVER — Puente Facebook OMEGA-25
// ============================================================
window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "O25_VOLVER") return;

  // Puente de madera: volver sin inteligencia
  window.history.back();
});

// ============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

// ============================================================
// 🧩 Registro del Service Worker O25 (solo en producción)
// ============================================================
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("✅ Service Worker registrado:", registration.scope);
      })
      .catch((error) => {
        console.log("❌ Error al registrar el Service Worker:", error);
      });
  });
}
