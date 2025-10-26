import React, { useRef, useState } from "react";
import "./MusicPlayer.css";
import { Music2 } from "lucide-react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio("/music.mp3"));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <button
      className={`music-button ${playing ? "playing" : ""}`}
      onClick={togglePlay}
      title={playing ? "Detener música" : "Reproducir música"}
    >
      <Music2 size={22} />
    </button>
  );
}
