import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

// Copiar manualmente íconos y manifiesto a dist/
const copyPublicFiles = () => {
  const publicDir = path.resolve(__dirname, "public");
  const distDir = path.resolve(__dirname, "dist");
  if (!fs.existsSync(publicDir)) return;
  fs.readdirSync(publicDir).forEach(file => {
    if (
      file.endsWith(".png") ||
      file.endsWith(".webmanifest") ||
      file.endsWith(".json") ||
      file.endsWith(".mp3")
    ) {
      fs.copyFileSync(path.join(publicDir, file), path.join(distDir, file));
    }
  });
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "pwa-512x512-maskable.png"
      ],
      manifest: {
        name: "El Shopper Los Olivos Digital",
        short_name: "El Shopper",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    }),
    {
      name: "copy-public-files",
      closeBundle: copyPublicFiles
    }
  ]
});
