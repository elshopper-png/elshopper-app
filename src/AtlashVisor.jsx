import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function AtlashVisor() {
  const { slug, giroSlug } = useParams();
  const navigate = useNavigate();

  // 🔇 APAGAR MÚSICA AL ENTRAR A ATLASH
  useEffect(() => {
    if (window.globalMusic) window.globalMusic.pause();

    return () => {
      if (window.globalMusic && window.musicState === "on") {
        window.globalMusic.play().catch(() => {});
      }
    };
  }, []);

  // 🎧 LISTENER UNIVERSAL O25 — PUENTE DE MADERA ✔️
  useEffect(() => {
    const handler = (event) => {
      if (event.data === "O25_VOLVER") {
        // 🔙 Regresar a las tarjetas del giro correspondiente
        navigate(`/tarjetas/${giroSlug}`);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate, giroSlug]);

  // RUTA CORRECTA UNIVERSAL (local y producción)
  const atlashURL = `/atlash/${slug}`;

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
