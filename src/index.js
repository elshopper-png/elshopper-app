// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";

import "./styles/base.css";
import "./styles/tarjetas.css";

// ============================================================
// 🧩 Listener Universal O25_VOLVER — Puente de Madera OMEGA-25
// ============================================================
window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "O25_VOLVER") return;
  window.history.back();
});

// ============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

// ============================================================
// 🧩 Registro del Service Worker O25 solo en producción
// ============================================================
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    const swUrl = `/service-worker.js`; // 🔥 RUTA CORRECTA PARA VERCEL

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
