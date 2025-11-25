import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/components$/, replacement: path.resolve(__dirname, '../../packages/react/src/components/index.ts') },
      { find: /^@\/lib$/, replacement: path.resolve(__dirname, '../../packages/react/src/lib/index.ts') },
      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, './src/$1') },
      { find: '@headlessui/react', replacement: path.resolve(__dirname, 'node_modules/@headlessui/react') },
      { find: 'react-chartjs-2', replacement: path.resolve(__dirname, 'node_modules/react-chartjs-2') },
      { find: 'chart.js', replacement: path.resolve(__dirname, 'node_modules/chart.js') },
    ],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['react', 'react-dom', 'react-router-dom', '@headlessui/react', 'react-chartjs-2', 'chart.js'],
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

