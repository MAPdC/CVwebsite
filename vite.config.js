import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 78 },
      webp: { quality: 78 },
    }),
  ],
  build: {
    // Lista de ficheiros gerados por página, usada por scripts/generate-pages.mjs
    // para pré-carregar o código de cada página (e apagada a seguir)
    manifest: true,
  },
  // Testes (npm test): ambiente de browser simulado; ver src/test/setup.js
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: ['node_modules', 'dist', 'src/_draft'],
  },
})
