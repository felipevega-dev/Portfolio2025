import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Felipe Vega | Portfolio",
        short_name: "FV Portfolio",
        description: "Portfolio de Felipe Vega, desarrollador de software especializado en tecnologías web modernas",
        start_url: "/",
        display: "standalone",
        background_color: "#111827",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        lang: "es"
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,json,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.toString().includes('/api');
            },
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
