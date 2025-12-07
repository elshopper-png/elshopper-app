import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

export default function AtlashVisor() {
  const { slug } = useParams();

  // Pausar música
  useEffect(() => {
    if (window.globalMusic) window.globalMusic.pause();

    return () => {
      if (window.globalMusic && window.musicState === "on") {
        window.globalMusic.play().catch(() => {});
      }
    };
  }, []);

  // Detectar si estamos en producción
  const isProd = window.location.hostname.includes("vercel.app");

  // URL correcta del visor externo
  const atlashURL = isProd
    ? `https://atlash-o25.vercel.app/${slug}`  // Producción
    : `http://localhost:5173/${slug}`;          // Local

  return (
    <iframe
      src={atlashURL}
      title={`Aviso ${slug}`}
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
