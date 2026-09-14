import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Calmspace',
        short_name: 'Calmspace',
        description: 'A calm local-first space for tasks, notes and planning.',
        theme_color: '#c8d6ff',
        background_color: '#dfe7ff',
        display: 'standalone',
        start_url: './',
        icons: [
          { src: 'pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      },
      workbox: { navigateFallback: './index.html' }
    })
  ]
});
