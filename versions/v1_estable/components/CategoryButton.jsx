import React from "react";
import "./CategoryButton.css";

export default function CategoryButton({ name, color }) {
  const match = name.match(
    /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\ufe0f)\s*(.*)$/u
  );
  const emoji = match ? match[1] : "";
  const text = match ? match[2] : name;

  return (
    <button
      className="category-btn"
      style={{ backgroundColor: color }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {emoji && <span className="category-btn__emoji">{emoji}</span>}
      <span className="category-btn__text">{text}</span>
    </button>
  );
}
