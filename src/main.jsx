import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // ✅ usa el styles.css que está dentro de src
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onNeedRefresh() {
    location.reload();
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
