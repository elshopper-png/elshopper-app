import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import fs from 'fs';

// Asegura que el icono apple-touch-icon.png se copie en el build
const copyAppleIcon = () => {
  return {
    name: 'copy-apple-touch-icon',
    closeBundle() {
      const src = resolve(__dirname, 'public/apple-touch-icon.png');
      const dest = resolve(__dirname, 'dist/apple-touch-icon.png');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('✅ Copiado apple-touch-icon.png al build');
      } else {
        console.warn('⚠️ No se encontró public/apple-touch-icon.png');
      }
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'logo.png',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-512x512-maskable.png'
      ],
      manifest: {
        name: 'El Shopper Los Olivos Digital',
        short_name: 'El Shopper',
        description: 'Directorio comercial digital de Los Olivos con los mejores productos y servicios',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    }),
    copyAppleIcon(),
  ],
  build: {
    outDir: 'dist',
  },
});
