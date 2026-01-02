import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-192.png', 'favicon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Valk UI',
        short_name: 'Valk UI',
        description: 'Biblioteca moderna de componentes UI para React',
        theme_color: '#003d7a',
        background_color: '#003d7a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon-16.png',
            sizes: '16x16',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/favicon-32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/favicon-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/favicon-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/favicon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: [
      { find: /^@\/components$/, replacement: path.resolve(__dirname, '../../packages/react/src/components/index.ts') },
      { find: /^@\/lib$/, replacement: path.resolve(__dirname, '../../packages/react/src/lib/index.ts') },
      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, './src/$1') },
      { find: '@headlessui/react', replacement: path.resolve(__dirname, 'node_modules/@headlessui/react') },
      { find: /^@heroicons\/react/, replacement: path.resolve(__dirname, 'node_modules/@heroicons/react') },
      { find: 'react-chartjs-2', replacement: path.resolve(__dirname, 'node_modules/react-chartjs-2') },
      { find: 'chart.js', replacement: path.resolve(__dirname, 'node_modules/chart.js') },
      { find: 'clsx', replacement: path.resolve(__dirname, 'node_modules/clsx') },
      { find: 'tailwind-merge', replacement: path.resolve(__dirname, 'node_modules/tailwind-merge') },
    ],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['react', 'react-dom', 'react-router-dom', '@headlessui/react', '@heroicons/react', 'react-chartjs-2', 'chart.js', 'clsx', 'tailwind-merge'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})

