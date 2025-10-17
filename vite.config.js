import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

const copyPublicFiles = () => ({
  name: 'copy-public-files',
  closeBundle() {
    const publicDir = path.resolve(__dirname, 'public');
    const distDir = path.resolve(__dirname, 'dist');
    const files = [
      'apple-touch-icon.png',
      'favicon.png',
      'logo.png',
      'pwa-192x192.png',
      'pwa-512x512.png',
      'pwa-512x512-maskable.png',
      'manifest.webmanifest'
    ];

    files.forEach(file => {
      const src = path.join(publicDir, file);
      const dest = path.join(distDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✅ Copiado: ${file}`);
      } else {
        console.warn(`⚠️ No encontrado: ${file}`);
      }
    });
  }
});

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
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ]
      }
    }),
    copyPublicFiles(),
  ],
  build: { outDir: 'dist' },
});
