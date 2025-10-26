import React from "react";

export default function CategoryCard({ title, emoji, count = 0, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <span className="count-badge">{count}</span>
      <div className="card-icon" aria-hidden>{emoji}</div>
      <div>
        <h4 className="card-title">{title}</h4>
      </div>
    </div>
  );
}
