import React from "react";
import "./Home.css";
import MusicPlayer from "./MusicPlayer";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Íconos a color con emojis para mantener su color pleno.
 * Los botones usan colores sólidos vivos + efecto 3D.
 * El nombre se divide en 2 líneas con " & ".
 */
const categories = [
  { name: "Abogados", icon: "⚖️", color: "#8B4513", count: 4 },
  { name: "Belleza & SPA", icon: "💅", color: "#e75480", count: 6 },
  { name: "Computación & Reparación", icon: "💻", color: "#7065f0", count: 3 },
  { name: "Construcción & Ferretería", icon: "🛠️", color: "#f5a623", count: 5 },
  { name: "Educación & Capacitación", icon: "🎓", color: "#0096FF", count: 7 },
  { name: "Empleos", icon: "💼", color: "#10ac84", count: 2 },
  { name: "Fitness & Deporte", icon: "🏋️", color: "#1e90ff", count: 8 },
  { name: "Hogar & Servicios", icon: "🏠", color: "#ff8c00", count: 9 },
  { name: "Inmobiliarias", icon: "🏢", color: "#4682b4", count: 6 },
  { name: "Marketing & Imprenta", icon: "🖨️", color: "#9370db", count: 10 },
  { name: "Moda & Joyería", icon: "💍", color: "#c71585", count: 11 },
  { name: "Muebles & Decoración", icon: "🪑", color: "#b5651d", count: 12 },
  { name: "Nutrición & Bienestar", icon: "🥦", color: "#28a745", count: 13 },
  { name: "Salud Integral", icon: "🩺", color: "#ff4444", count: 14 },
  { name: "Servicio Técnico", icon: "🔧", color: "#008080", count: 15 },
  { name: "Veterinarias & Pet Shop", icon: "🐾", color: "#ff6f61", count: 17 },
];

export default function Home() {
  return (
    <div className="home">
      {/* Botón musical flotante (no tapa el contenido) */}
      <MusicPlayer />

      <header className="header fade-title">
        <img src="/logo.png" alt="El Shopper Logo" className="logo" />
        <h1 className="title">
          EL SHOPPER
          <span className="title-sub">DE LOS OLIVOS DIGITAL</span>
        </h1>
        <p className="tagline">
          En Los Olivos tenemos los mejores productos y servicios a un clic de distancia
        </p>
      </header>

      {/* Grid de categorías */}
      <section className="categories-grid">
        {categories
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name, "es"))
          .map((cat, idx) => (
            <div
              key={idx}
              className="category-card"
              style={{ backgroundColor: cat.color }}
              onClick={() => alert(`Muy pronto: ${cat.name}`)}
            >
              <div className="category-count">{cat.count}</div>
              <div className="category-icon" aria-hidden="true">
                {cat.icon}
              </div>
              <div className="category-name">
                {cat.name.split(" & ").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* CTA de WhatsApp */}
      <footer className="footer">
        <a
          href="https://wa.me/51993490886?text=Hola,%20deseo%20publicar%20en%20la%20app%20El%20Shopper.%20%C2%BFPodr%C3%ADan%20brindarme%20informaci%C3%B3n?"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <FaWhatsapp className="whatsapp-icon" />
        ¿Quieres anunciar?
        </a>
      </footer>
    </div>
  );
}
