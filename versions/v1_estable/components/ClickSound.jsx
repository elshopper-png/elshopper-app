export default function ClickSound() {
  const audio = new Audio("/music.mp3");
  audio.volume = 0.8;
  audio.play();
}
