import React, { useRef, useState } from "react";

const CATEGORIES = [
  { nombre: "Belleza & SPA", emoji: "💅", color: "#FF006E" },
  { nombre: "Construcción & Ferretería", emoji: "🏗️", color: "#7A3E1D" },
  { nombre: "Educación & Cursos", emoji: "🎓", color: "#00B4D8" },
  { nombre: "Fitness & Deportes", emoji: "💪", color: "#F77F00" },
  { nombre: "Gastronomía & Snacks", emoji: "🍔", color: "#FFB703" },
  { nombre: "Hogar & Servicios", emoji: "🏠", color: "#4CC9F0" },
  { nombre: "Informática & Reparación", emoji: "🖥️", color: "#FF9F1C" },
  { nombre: "Inmobiliarias", emoji: "🏢", color: "#C1121F" },
  { nombre: "Marketing & Imprenta", emoji: "🖨️", color: "#06D6A0" },
  { nombre: "Moda & Joyería", emoji: "💍", color: "#9D4EDD" },
  { nombre: "Muebles & Decoraciones", emoji: "🛋️", color: "#4361EE" },
  { nombre: "Salud Integral", emoji: "🩺", color: "#2EC4B6" },
  { nombre: "Servicio Técnico", emoji: "🔧", color: "#3A0CA3" },
  { nombre: "Servicios Profesionales", emoji: "📋", color: "#0F82D1" },
];

const WHATSAPP_NUMBER = "51993490886";
const WHATSAPP_TEXT =
  "Hola, quisiera publicar mi negocio en El Shopper de Los Olivos Digital. Gracias. 😊";

export default function Home() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        await a.play();
        setOn(true);
      } catch {}
    }
  };

  return (
    <div className="page-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/logo.png" alt="El Shopper" className="header_logo" />
        <h1>El Shopper Digital – Los Olivos</h1>
        <p>En Los Olivos tenemos los mejores productos y servicios a un clic de distancia.</p>
      </header>

      {/* Música flotante */}
      <button className={`music ${on ? "music--on" : ""}`} onClick={toggleMusic}>
        {on ? "🎶" : "🔇"}
      </button>
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop style={{ display: "none" }} />

      {/* Cuadrícula de giros */}
      <main>
        <h2 className="center">Giros Comerciales</h2>
        <div className="grid-giros">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.nombre}
              className="giro-card"
              style={{ backgroundColor: cat.color }}
              type="button"
            >
              <span style={{ fontSize: "48px", marginBottom: "8px" }}>{cat.emoji}</span>
              <span className="giro-title">{cat.nombre}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Botón WhatsApp */}
      <a
        className="wa_btn"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="wa_icon">💬</span>
        <span className="wa_text">Publica tu negocio</span>
      </a>

      <footer>© {new Date().getFullYear()} El Shopper. Todos los derechos reservados.</footer>
    </div>
  );
}
import React, { useRef, useState } from "react";
import "./styles.css"; // ✅ se asegura de cargar el CSS global

const CATEGORIES = [
  { nombre: "Belleza & SPA", emoji: "💅", color: "#FF006E" },
  { nombre: "Construcción & Ferretería", emoji: "🏗️", color: "#7A3E1D" },
  { nombre: "Educación & Cursos", emoji: "🎓", color: "#00B4D8" },
  { nombre: "Fitness & Deportes", emoji: "💪", color: "#F77F00" },
  { nombre: "Gastronomía & Snacks", emoji: "🍔", color: "#FFB703" },
  { nombre: "Hogar & Servicios", emoji: "🏠", color: "#4CC9F0" },
  { nombre: "Informática & Reparación", emoji: "🖥️", color: "#FF9F1C" },
  { nombre: "Inmobiliarias", emoji: "🏢", color: "#C1121F" },
  { nombre: "Marketing & Imprenta", emoji: "🖨️", color: "#06D6A0" },
  { nombre: "Moda & Joyería", emoji: "💍", color: "#9D4EDD" },
  { nombre: "Muebles & Decoraciones", emoji: "🛋️", color: "#4361EE" },
  { nombre: "Salud Integral", emoji: "🩺", color: "#2EC4B6" },
  { nombre: "Servicio Técnico", emoji: "🔧", color: "#3A0CA3" },
  { nombre: "Servicios Profesionales", emoji: "📋", color: "#0F82D1" },
];

const WHATSAPP_NUMBER = "51993490886";
const WHATSAPP_TEXT =
  "Hola, quisiera publicar mi negocio en El Shopper de Los Olivos Digital. Gracias. 😊";

export default function Home() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        await a.play();
        setOn(true);
      } catch {}
    }
  };

  return (
    <div className="page-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/logo.png" alt="El Shopper" className="header_logo" />
        <h1>El Shopper Digital – Los Olivos</h1>
        <p>En Los Olivos tenemos los mejores productos y servicios a un clic de distancia.</p>
      </header>

      {/* Música flotante */}
      <button className={`music ${on ? "music--on" : ""}`} onClick={toggleMusic}>
        {on ? "🎶" : "🔇"}
      </button>
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop style={{ display: "none" }} />

      {/* Cuadrícula de giros */}
      <main>
        <h2 className="center">Giros Comerciales</h2>
        <div className="grid-giros">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.nombre}
              className="giro-card"
              style={{ backgroundColor: cat.color }}
              type="button"
            >
              <span style={{ fontSize: "48px", marginBottom: "8px" }}>{cat.emoji}</span>
              <span className="giro-title">{cat.nombre}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Botón WhatsApp */}
      <a
        className="wa_btn"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="wa_icon">💬</span>
        <span className="wa_text">Publica tu negocio</span>
      </a>

      <footer>© {new Date().getFullYear()} El Shopper. Todos los derechos reservados.</footer>
    </div>
  );
}
