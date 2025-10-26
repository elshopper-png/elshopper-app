import React, { useState, useRef } from "react";
import "./MusicButton.css";
import musicFile from "/music.mp3";

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicFile));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  return (
    <button className={`music-btn ${playing ? "active" : ""}`} onClick={togglePlay}>
      🎵
    </button>
  );
}
