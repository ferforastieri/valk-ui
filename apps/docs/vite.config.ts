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
    ],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 3000,
    open: true
  }
})

