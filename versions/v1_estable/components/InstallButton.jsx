import React, { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("✅ El usuario instaló El Shopper.");
    } else {
      console.log("❌ El usuario canceló la instalación.");
    }
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <button
        onClick={handleInstallClick}
        style={{
          backgroundColor: "#d40000",
          color: "white",
          border: "none",
          padding: "10px 22px",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 3px 6px rgba(0,0,0,0.25)",
        }}
      >
        Instalar El Shopper
      </button>
    </div>
  );
}
