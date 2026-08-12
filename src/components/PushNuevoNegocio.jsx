// ============================================================
// 🔔 PushNuevoNegocio.jsx — Invitación Push Shopper Digital
// PRODUCCIÓN LIMPIA
// ============================================================

import React, { useEffect, useState } from "react";

import {
  suscribirPushShopper,
  sincronizarPushShopper
} from "../utils/pushShopper";

const PRIMERA_APERTURA = "SHOPPER_PUSH_PRIMERA_APERTURA";
const POSPUESTO_HASTA = "SHOPPER_PUSH_POSPUESTO_HASTA";
const ACEPTADO = "SHOPPER_PUSH_ACEPTADO";

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
  const [nuevoAnunciante, setNuevoAnunciante] = useState(null);

  // ==========================================================
  // 🔔 CONTROL UNIVERSAL DEL ESTADO PUSH
  // ==========================================================
  useEffect(() => {
    let cancelado = false;

    const comprobarPush = async () => {
      if (!estaInstalada()) return;

      if (
        !("Notification" in window) ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        return;
      }

      if (Notification.permission === "denied") {
        return;
      }

      let registration;

      try {
        registration = await navigator.serviceWorker.ready;
      } catch (error) {
        console.error("❌ No se pudo obtener Service Worker:", error);
        return;
      }

      let subscription;

      try {
        subscription = await registration.pushManager.getSubscription();
      } catch (error) {
        console.error("❌ No se pudo comprobar PushSubscription:", error);
        return;
      }

      if (cancelado) return;

      if (subscription) {
        localStorage.setItem(ACEPTADO, "1");

        const resultado = await sincronizarPushShopper();

        console.log("🔄 Push vigente sincronizado:", resultado);
        return;
      }

      localStorage.removeItem(ACEPTADO);

      const ahora = Date.now();
      const primera = Number(
        localStorage.getItem(PRIMERA_APERTURA) || 0
      );

      if (!primera) {
        localStorage.setItem(PRIMERA_APERTURA, String(ahora));
        return;
      }


      const pospuestoHasta = Number(
        localStorage.getItem(POSPUESTO_HASTA) || 0
      );

      if (ahora < pospuestoHasta) {
        return;
      }

      if (!cancelado) {
        setVisible(true);
      }
    };

    comprobarPush();

    return () => {
      cancelado = true;
    };
  }, []);

  // ==========================================================
  // 🔔 NUEVO ANUNCIANTE — SHOPPER ABIERTA
  // BroadcastChannel — Service Worker → React
  // ==========================================================
  useEffect(() => {
    if (!("BroadcastChannel" in window)) {
      return;
    }

    const canalShopper = new BroadcastChannel(
      "shopper-push-interno"
    );

    canalShopper.onmessage = (event) => {
      if (
        !event.data ||
        event.data.type !== "SHOPPER_NUEVO_ANUNCIANTE"
      ) {
        return;
      }

      setNuevoAnunciante({
        titulo: event.data.titulo || "El Shopper Digital",
        mensaje:
          event.data.mensaje || "Tenemos un nuevo anunciante.",
        url: event.data.url || "/"
      });
    };

    return () => {
      canalShopper.close();
    };
  }, []);

  const aceptar = async () => {
    if (procesando) return;

    setProcesando(true);

    const resultado = await suscribirPushShopper();

    console.log("🔔 Resultado suscripción Push:", resultado);

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

  if (nuevoAnunciante) {
    const verAnunciante = () => {
      const destino = nuevoAnunciante.url || "/";
      setNuevoAnunciante(null);
      window.location.href = destino;
    };

    const cerrarNuevoAnunciante = () => {
      setNuevoAnunciante(null);
    };

    return (
      <div style={styles.fondo}>
        <div style={styles.tarjeta}>
          <p style={styles.pregunta}>
            {nuevoAnunciante.titulo}
          </p>

          <p
            style={{
              margin: "0 0 22px",
              color: "#444",
              fontSize: 17,
              lineHeight: 1.45
            }}
          >
            {nuevoAnunciante.mensaje}
          </p>

          <button
            type="button"
            style={styles.si}
            onClick={verAnunciante}
          >
            Ver anunciante
          </button>

          <button
            type="button"
            style={styles.no}
            onClick={cerrarNuevoAnunciante}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  if (!visible) {
    return null;
  }

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
