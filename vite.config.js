import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
    assetsInclude: ['/public/fonts/*.woff2'], // Garante que as fonts sejam incluídas no build
  },
})
