import React, { useEffect, useRef, useState } from "react";
import { Music2 } from "lucide-react";

export default function MusicPlayer() {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    // El mp3 está en /public, así que se sirve como /theme.mp3
    const audio = new Audio("/theme.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;

    const onReady = () => setReady(true);
    audio.addEventListener("canplaythrough", onReady, { once: true });

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      clearInterval(fadeRef.current);
      if (!audio.paused) audio.pause();
    };
  }, []);

  const fadeInTo = (target = 0.8, step = 0.02, everyMs = 100) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearInterval(fadeRef.current);
    audio.volume = 0;
    let v = 0;
    fadeRef.current = setInterval(() => {
      v += step;
      if (v >= target) {
        audio.volume = target;
        clearInterval(fadeRef.current);
      } else {
        audio.volume = v;
      }
    }, everyMs);
  };

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      // Si aún no está listo, intentamos igualmente; algunos navegadores lo permiten tras gesto
      try {
        await audio.play();
        fadeInTo(0.8);
        setPlaying(true);
      } catch (err) {
        console.warn("El navegador bloqueó la reproducción, reintentando al cargar…", err);
        // En cuanto quede listo, probamos de nuevo
        if (!ready) {
          const tryWhenReady = async () => {
            try {
              await audio.play();
              fadeInTo(0.8);
              setPlaying(true);
            } catch (e) {
              console.error("Sigue bloqueado:", e);
            }
          };
          audio.addEventListener("canplaythrough", tryWhenReady, { once: true });
        }
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      title={playing ? "Pausar música" : (ready ? "Reproducir música" : "Cargando…")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: playing ? "#d3d3d3" : "#0d6efd", // azul → gris
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        cursor: ready ? "pointer" : "wait",
        transition: "all 0.3s ease",
        zIndex: 1000,
        opacity: ready ? 1 : 0.7,
      }}
      disabled={!ready && !playing}
    >
      <Music2 size={30} />
    </button>
  );
}
