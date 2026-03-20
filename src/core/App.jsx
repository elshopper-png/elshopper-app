// src/App.jsx — O25 FINAL (apaga música al salir desde Portada o Tarjetas)
import React, { useEffect } from "react";
import AppRouter from "./AppRouter";

export default function App() {
  useEffect(() => {
    const pauseMusicOnly = () => {
      const m = window.globalMusic || window.__O25_MUSIC__;
      if (m && !m.paused) {
        try { m.pause(); } catch (e) {}
      }
    };

    const handleVisibility = () => {
      // cuando pasa a background (cambiar app / home / lock / etc.)
      if (document.hidden) pauseMusicOnly();
    };

    // ✅ listeners base (desktop + mobile)
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", pauseMusicOnly);
    window.addEventListener("blur", pauseMusicOnly);

    // ✅ page lifecycle (PWA/móviles)
    document.addEventListener("freeze", pauseMusicOnly);

    // ✅ watchdog: cubre casos donde NO llega el evento (muy común en PWA)
    const watchdog = setInterval(() => {
      if (document.hidden) pauseMusicOnly();
    }, 600);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", pauseMusicOnly);
      window.removeEventListener("blur", pauseMusicOnly);
      document.removeEventListener("freeze", pauseMusicOnly);
      clearInterval(watchdog);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <AppRouter />
    </div>
  );
}
