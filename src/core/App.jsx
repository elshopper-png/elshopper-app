// src/App.jsx — versión correcta O25
import React, { useEffect } from "react";
import AppRouter from "./AppRouter";

export default function App() {
  useEffect(() => {
    const pauseMusicOnly = () => {
      // Solo PAUSA. No toques window.musicState (para que al volver se reanude)
      const m = window.globalMusic || window.__O25_MUSIC__;
      if (m && !m.paused) {
        try { m.pause(); } catch (e) {}
      }
    };

    const onVisibilityChange = () => {
      // Cuando la app queda en background
      if (document.hidden) pauseMusicOnly();
    };

    // ✅ visibilitychange va en DOCUMENT
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ✅ estos cubren salida/cambio de app en móviles y desktop
    window.addEventListener("pagehide", pauseMusicOnly);
    window.addEventListener("blur", pauseMusicOnly);
    window.addEventListener("beforeunload", pauseMusicOnly);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", pauseMusicOnly);
      window.removeEventListener("blur", pauseMusicOnly);
      window.removeEventListener("beforeunload", pauseMusicOnly);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <AppRouter />
    </div>
  );
}
