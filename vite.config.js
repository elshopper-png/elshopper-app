import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.png",
        "logo.png",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
        "music.mp3",
      ],
      manifest: {
        name: "El Shopper de Los Olivos Digital",
        short_name: "El Shopper",
        description: "En Los Olivos tenemos los mejores productos y servicios ¡a un clic de distancia!",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
