import React, { useState, useEffect } from "react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Crear audio global solo una vez
    if (!window.globalMusic) {
      const audio = new Audio(process.env.PUBLIC_URL + "/music.mp3");
      audio.loop = true;
      audio.volume = 0.7;
      audio.preload = "auto";
      window.globalMusic = audio;
      window.musicState = "off";
    }

    // Restaurar estado previo
    if (window.musicState === "on") {
      window.globalMusic.play().catch(() => {});
      setPlaying(true);
    }

    // 🔇 PARCHE O25: detener música cuando la app pierde foco
    const handleVisibility = () => {
      if (document.hidden) {
        if (window.globalMusic) window.globalMusic.pause();
      } else {
        if (window.globalMusic && window.musicState === "on") {
          window.globalMusic.play().catch(() => {});
        }
      }
    };

    const handlePageHide = () => {
      if (window.globalMusic) window.globalMusic.pause();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  const toggleMusic = () => {
    const m = window.globalMusic;
    if (!m) return;

    if (playing) {
      m.pause();
      window.musicState = "off";
      setPlaying(false);
    } else {
      m.play().catch(() => {});
      window.musicState = "on";
      setPlaying(true);
    }
  };

  return (
    <button className="music-toggle" onClick={toggleMusic}>
      {playing ? "🔊" : "🔇"}
    </button>
  );
}
