// ============================================================
// 🔔 PushNuevoNegocio.jsx — Invitación Push Shopper Digital
// PRODUCCIÓN LIMPIA
// ============================================================

import React, { useEffect, useState } from "react";

import {
  suscribirPushShopper,
  sincronizarPushShopper
} from "../utils/pushShopper";


const PRIMERA_APERTURA =
  "SHOPPER_PUSH_PRIMERA_APERTURA";

const POSPUESTO_HASTA =
  "SHOPPER_PUSH_POSPUESTO_HASTA";

const ACEPTADO =
  "SHOPPER_PUSH_ACEPTADO";


const UN_DIA =
  24 * 60 * 60 * 1000;

const SIETE_DIAS =
  7 * 24 * 60 * 60 * 1000;


// ============================================================
// Detectar PWA instalada
// ============================================================

function estaInstalada() {
  return (
    window.matchMedia?.(
      "(display-mode: standalone)"
    ).matches ||
    window.navigator.standalone === true
  );
}


// ============================================================
// COMPONENTE
// ============================================================

export default function PushNuevoNegocio() {

  const [visible, setVisible] =
    useState(false);

  const [procesando, setProcesando] =
    useState(false);


  // ==========================================================
  // 🔔 CONTROL UNIVERSAL DEL ESTADO PUSH
  // ==========================================================

  useEffect(() => {

    let cancelado = false;


    const comprobarPush = async () => {

      // Solo PWA instalada.
      if (!estaInstalada()) {
        return;
      }


      // Comprobar capacidades.
      if (
        !("Notification" in window) ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        return;
      }


      // Si el usuario bloqueó las notificaciones,
      // no insistimos.
      if (
        Notification.permission ===
        "denied"
      ) {
        return;
      }


      // Esperar Service Worker activo.
      let registration;

      try {

        registration =
          await navigator
            .serviceWorker
            .ready;

      } catch (error) {

        console.error(
          "❌ No se pudo obtener Service Worker:",
          error
        );

        return;
      }


      // ======================================================
      // FUENTE DE VERDAD:
      // PushSubscription REAL.
      // ======================================================

      let subscription;

      try {

        subscription =
          await registration
            .pushManager
            .getSubscription();

      } catch (error) {

        console.error(
          "❌ No se pudo comprobar PushSubscription:",
          error
        );

        return;
      }


      if (cancelado) {
        return;
      }


      // ======================================================
      // EXISTE SUSCRIPCIÓN REAL
      // ======================================================

      if (subscription) {

        localStorage.setItem(
          ACEPTADO,
          "1"
        );


        const resultado =
          await sincronizarPushShopper();


        console.log(
          "🔄 Push vigente sincronizado:",
          resultado
        );

        return;
      }


      // ======================================================
      // NO EXISTE SUSCRIPCIÓN REAL
      // ======================================================

      localStorage.removeItem(
        ACEPTADO
      );


      const ahora =
        Date.now();


      const primera =
        Number(
          localStorage.getItem(
            PRIMERA_APERTURA
          ) || 0
        );


      // Primera apertura:
      // guardar momento y no mostrar todavía.
      if (!primera) {

        localStorage.setItem(
          PRIMERA_APERTURA,
          String(ahora)
        );

        return;
      }


      // Esperar 24 horas.
      if (
        ahora - primera < UN_DIA
      ) {
        return;
      }


      // Respetar "Ahora no".
      const pospuestoHasta =
        Number(
          localStorage.getItem(
            POSPUESTO_HASTA
          ) || 0
        );


      if (
        ahora < pospuestoHasta
      ) {
        return;
      }


      // Mostrar invitación real.
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
  // BOTÓN SÍ
  // ==========================================================

  const aceptar = async () => {

    if (procesando) {
      return;
    }


    setProcesando(true);


    const resultado =
      await suscribirPushShopper();


    console.log(
      "🔔 Resultado suscripción Push:",
      resultado
    );


    if (resultado.ok) {

      localStorage.setItem(
        ACEPTADO,
        "1"
      );


      localStorage.removeItem(
        POSPUESTO_HASTA
      );


      setVisible(false);
    }


    setProcesando(false);
  };


  // ==========================================================
  // BOTÓN AHORA NO
  // ==========================================================

  const ahoraNo = () => {

    localStorage.setItem(
      POSPUESTO_HASTA,
      String(
        Date.now() +
        SIETE_DIAS
      )
    );


    setVisible(false);
  };


  if (!visible) {
    return null;
  }


  // ==========================================================
  // INTERFAZ
  // ==========================================================

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
          {
            procesando
              ? "Activando..."
              : "Sí"
          }
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


// ============================================================
// ESTILOS
// ============================================================

const styles = {

  fondo: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background:
      "rgba(0,0,0,.42)",
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
    padding:
      "28px 22px 22px",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow:
      "0 18px 55px rgba(0,0,0,.25)",
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
    border:
      "1px solid #ddd",
    borderRadius: 14,
    background: "#fff",
    color: "#444",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer"
  }
};