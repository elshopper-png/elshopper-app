import React from "react";
import logo from "/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <img
          className="header__logo"
          src={logo}
          alt="El Shopper Logo"
          width="110"
          height="110"
        />
        <h1 className="header__title">
          EL SHOPPER
          <br />
          DE LOS OLIVOS DIGITAL
        </h1>
        <p className="header__tagline">
          <em>En Los Olivos tenemos</em>
          <br />
          <em>los mejores productos y servicios</em>
          <br />
          <em>¡a un CLIC de distancia!</em>
        </p>
      </div>
    </header>
  );
}
