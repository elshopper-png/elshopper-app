import React, { useRef, useState, useEffect } from "react";
import { Music2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch((err) => console.log("Autoplay bloqueado:", err));
      setPlaying(true);
    }
  };

  // Pausar automáticamente cuando la app pierde foco
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (document.hidden && audio && !audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Detener audio al desmontar componente
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div
      onClick={togglePlay}
      style={{
        position: "fixed",
        bottom: "22px",
        right: "22px",
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        backgroundColor: playing ? "#666" : "#007BFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
        transition: "background-color 0.3s ease",
        animation: playing
          ? "pulse 1.6s infinite ease-in-out"
          : "none"
      }}
      title={playing ? "Detener música" : "Reproducir música"}
    >
      <Music2 size={32} color="white" />
      <audio ref={audioRef} src="/theme.mp3" preload="auto" loop />
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 10px rgba(0, 123, 255, 0.6); transform: scale(1); }
            50% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.9); transform: scale(1.07); }
            100% { box-shadow: 0 0 10px rgba(0, 123, 255, 0.6); transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
