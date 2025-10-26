import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [open, setOpen] = useState(false);
  const [isiOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone
    );

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone) return null;

  const onInstall = async () => {
    if (!deferredPrompt) { setOpen(false); return; }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setOpen(false);
  };

  const iOSHelp = isiOS && !deferredPrompt;

  return open || iOSHelp ? (
    <div className="install-modal-backdrop" onClick={() => setOpen(false)}>
      <div className="install-modal" onClick={(e)=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Agregar <strong>El Shopper</strong> a tu pantalla principal</h3>
        <p>Instala la app para acceso rápido, pantalla completa y mejor rendimiento offline.</p>
        {iOSHelp ? (
          <p>En iPhone/iPad: toca <strong>Compartir</strong> → <strong>Agregar a pantalla de inicio</strong>.</p>
        ) : (
          <div className="install-actions">
            <button className="btn btn-ghost" onClick={()=>setOpen(false)}>Luego</button>
            <button className="btn btn-primary" onClick={onInstall}>Instalar</button>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
