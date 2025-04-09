import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInclude: ['**/*.otf'], // Garante que as fonts sejam incluídas no build
  },
})
