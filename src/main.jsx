import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Variáveis globais primeiro (src/styles/tokens.css é a única fonte de :root)
import './styles/tokens.css'
// CSS de todos os componentes e páginas, por ordem fixa (ver o próprio ficheiro)
import './styles/components.js'
import App from './App.jsx'

// Fontes alojadas no próprio site (antes vinham do Google Fonts).
// Só o subconjunto latino, e apenas os pesos que o site já carregava.
import '@fontsource/cormorant-sc/latin-500.css'
import '@fontsource/cormorant/latin-300.css'
import '@fontsource/cormorant/latin-400.css'
import '@fontsource/cormorant/latin-500.css'
import '@fontsource/cormorant/latin-600.css'
import '@fontsource/cormorant/latin-700.css'
import '@fontsource/cormorant/latin-300-italic.css'
import '@fontsource/cormorant/latin-400-italic.css'
import '@fontsource/cormorant/latin-500-italic.css'
import '@fontsource/cormorant/latin-600-italic.css'
import '@fontsource/cormorant/latin-700-italic.css'
import '@fontsource/work-sans/latin-300.css'
import '@fontsource/work-sans/latin-400.css'
import '@fontsource/work-sans/latin-500.css'
import '@fontsource/work-sans/latin-600.css'
// Montserrat e Playfair Display (Camuflado e rótulos): antes eram ficheiros completos em public/fonts (~96 KB cada)
import '@fontsource/montserrat/latin-300.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-400-italic.css'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
