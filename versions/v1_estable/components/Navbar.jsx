import React from "react";
import "./Navbar.css";
import logo from "/public/icons/elshopper-512.png"; // ✅ ruta correcta

export default function Navbar() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="El Shopper Logo" className="logo" />
        <div className="text-container">
          <h1 className="title">
            EL SHOPPER <br /> DE LOS OLIVOS DIGITAL
          </h1>
          <p className="subtitle">
            En Los Olivos tenemos los mejores productos y servicios <br />
            a un clic de distancia.
          </p>
        </div>
      </div>
    </header>
  );
}
