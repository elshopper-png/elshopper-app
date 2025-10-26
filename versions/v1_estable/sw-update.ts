import { Workbox } from "workbox-window";

export function enableAutoReloadOnUpdate() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    // Cuando el nuevo SW esté listo, se activa sin preguntar
    wb.addEventListener("waiting", async () => {
      await wb.messageSkipWaiting();
      wb.addEventListener("controlling", () => {
        window.location.reload();
      });
    });

    wb.register();
  }
}
