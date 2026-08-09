// ============================================================
// 🔔 PushNuevoNegocio.jsx — Invitación única Shopper Digital
// ============================================================

import React, { useEffect, useState } from "react";
import { suscribirPushShopper } from "../utils/pushShopper";

const PRIMERA_APERTURA = "SHOPPER_PUSH_PRIMERA_APERTURA";
const POSPUESTO_HASTA = "SHOPPER_PUSH_POSPUESTO_HASTA";
const ACEPTADO = "SHOPPER_PUSH_ACEPTADO";

const UN_DIA = 0;
const SIETE_DIAS = 7 * 24 * 60 * 60 * 1000;

function estaInstalada() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export default function PushNuevoNegocio() {
  const [visible, setVisible] = useState(false);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    if (!estaInstalada()) return;

    if (!("Notification" in window)) return;
    if (!("serviceWorker" in navigator)) return;
    if (!("PushManager" in window)) return;

    if (localStorage.getItem(ACEPTADO) === "1") return;

    if (Notification.permission === "denied") return;

    const ahora = Date.now();

    const primera = Number(
      localStorage.getItem(PRIMERA_APERTURA) || 0
    );

    // Primera apertura de la App instalada:
    // guardamos la fecha y no mostramos nada.
    if (!primera) {
      localStorage.setItem(
        PRIMERA_APERTURA,
        String(ahora)
      );
      return;
    }

    // Esperar por lo menos 24 horas.
    if (ahora - primera < UN_DIA) return;

    // Si pulsó "Ahora no", esperar 7 días.
    const pospuestoHasta = Number(
      localStorage.getItem(POSPUESTO_HASTA) || 0
    );

    if (ahora < pospuestoHasta) return;

    setVisible(true);
  }, []);

  const aceptar = async () => {
    if (procesando) return;

    setProcesando(true);

    const resultado =
      await suscribirPushShopper();

    if (resultado.ok) {
      localStorage.setItem(ACEPTADO, "1");
      localStorage.removeItem(POSPUESTO_HASTA);
      setVisible(false);
    }

    setProcesando(false);
  };

  const ahoraNo = () => {
    localStorage.setItem(
      POSPUESTO_HASTA,
      String(Date.now() + SIETE_DIAS)
    );

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.fondo}>
      <div style={styles.tarjeta}>

        <p style={styles.pregunta}>
          ¿Quieres que te avisemos cuando un nuevo negocio se incorpore al Shopper Digital?
        </p>

        <button
          type="button"
          style={styles.si}
          onClick={aceptar}
          disabled={procesando}
        >
          {procesando ? "Activando..." : "Sí"}
        </button>

        <button
          type="button"
          style={styles.no}
          onClick={ahoraNo}
          disabled={procesando}
        >
          Ahora no
        </button>

      </div>
    </div>
  );
}

const styles = {
  fondo: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background: "rgba(0,0,0,.42)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    boxSizing: "border-box"
  },

  tarjeta: {
    width: "100%",
    maxWidth: 360,
    background: "#fff",
    borderRadius: 24,
    padding: "28px 22px 22px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow: "0 18px 55px rgba(0,0,0,.25)",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  },

  pregunta: {
    margin: "0 0 24px",
    color: "#222",
    fontSize: 19,
    lineHeight: 1.4,
    fontWeight: 700
  },

  si: {
    width: "100%",
    minHeight: 52,
    border: 0,
    borderRadius: 14,
    background: "#FFD21F",
    color: "#111",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: 10
  },

  no: {
    width: "100%",
    minHeight: 48,
    border: "1px solid #ddd",
    borderRadius: 14,
    background: "#fff",
    color: "#444",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer"
  }
};