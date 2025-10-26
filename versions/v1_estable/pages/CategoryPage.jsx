import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleAds } from "../data/sampleAds";
import AdCard from "../components/AdCard";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const ads = sampleAds[slug] || [];

  return (
    <div className="category-page">
      <header className="category-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅️
        </button>
        <h2 className="category-title">{slug.replace("-", " ").toUpperCase()}</h2>
      </header>

      <div className="ad-list">
        {ads.map((ad, i) => (
          <AdCard key={i} ad={ad} />
        ))}
      </div>
    </div>
  );
}
