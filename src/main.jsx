import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./pages/CategoryPage";
import MusicPlayer from "./MusicPlayer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:name" element={<CategoryPage />} />
      </Routes>
      <MusicPlayer />
    </BrowserRouter>
  </React.StrictMode>
);
