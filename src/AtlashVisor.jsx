import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

export default function AtlashVisor() {
  const { slug } = useParams();

  // 🔇 APAGAR MÚSICA AL ENTRAR A ATLASH
  useEffect(() => {
    // Pausar inmediatamente al entrar
    if (window.globalMusic) window.globalMusic.pause();

    // Restaurar cuando el usuario regrese
    return () => {
      if (window.globalMusic && window.musicState === "on") {
        window.globalMusic.play().catch(() => {});
      }
    };
  }, []);

  // Detecta IP del host real
  const host = window.location.hostname;

  // Ruta universal CRA ↔ ATLASH
  const atlashURL = `http://${host}:5173/${slug}`;

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
