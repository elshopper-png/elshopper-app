import React from "react";
import Visor from "../core/Visor"; // Ajustar la ruta si tu Visor está en otro folder

export default function AtlashSaul() {
  return (
    <Visor>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "177.78%"  // Mantiene formato vertical 9:16
        }}
      >
        <iframe
          title="Anuncio Dr. Saúl Garrido (ATLASH)"
          src="/atlash/index.html?slug=saul-garrido"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none"
          }}
          loading="lazy"
        />
      </div>
    </Visor>
  );
}
