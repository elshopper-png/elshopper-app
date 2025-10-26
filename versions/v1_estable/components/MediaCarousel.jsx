import React, { useState, useEffect, useRef } from "react";
import "./MediaCarousel.css";

export default function MediaCarousel({ items }) {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <div className="carousel-container">
      {items.map((item, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === current ? "active" : ""}`}
        >
          {item.type === "image" ? (
            <img src={item.src} alt={item.alt} />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              controls={false}
              autoPlay
              muted={false}
              loop
            />
          )}
        </div>
      ))}
      <div className="carousel-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
