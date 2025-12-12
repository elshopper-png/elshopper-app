// src/core/SharePage.jsx (CRA)

import { useParams } from "react-router-dom";

export default function SharePage() {
  const { slug } = useParams();

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      
      {/* Aviso ATLASH */}
      <iframe
        src={`https://atlash-025.vercel.app/${slug}`}
        title={`Aviso ${slug}`}
        style={{
          width: "100%",
          height: "100vh",
          border: "none"
        }}
      />

      {/* CTA solo para compartir */}
      <div style={{
        padding: 16,
        textAlign: "center",
        background: "#f5f5f5"
      }}>
        <p style={{ marginBottom: 12 }}>
          Descubre más ofertas en Los Olivos
        </p>

        <a
          href="https://elshopper-pwa.vercel.app"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            background: "#e6007e",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          📲 Descargar El Shopper
        </a>
      </div>
    </div>
  );
}
