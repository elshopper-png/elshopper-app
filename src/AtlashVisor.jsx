import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

export default function AtlashVisor() {
  const { slug } = useParams();

  // Pausar música cuando se entra al visor
  useEffect(() => {
    if (window.globalMusic) window.globalMusic.pause();

    return () => {
      if (window.globalMusic && window.musicState === "on") {
        window.globalMusic.play().catch(() => {});
      }
    };
  }, []);

  // Detección de ambiente
  const isProd = window.location.hostname.includes("vercel.app");

  // URL para ATLASH
  const atlashURL = isProd
    ? `https://atlash-o25.vercel.app/${slug}` // Producción
    : `http://localhost:5173/${slug}`;        // Local

  return (
    <iframe
      src={atlashURL}
      title={`Aviso ${slug}`}
      allow="clipboard-write *; fullscreen *"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        overflow: "hidden",
        display: "block",
      }}
    />
  );
}
