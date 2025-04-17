import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeaderInternal from './components/HeaderInternal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import WinePortfolioPage from './pages/WinePortfolioPage';
import OliveOilPortfolioPage from './pages/OliveOilPortfolioPage';
import WineProductPage from './pages/WineProductPage';
import FindUsPage from './pages/FindUsPage';

// Componente para selecionar o header correto
function PageLayout() {
  const location = useLocation();
  
  // Lista de caminhos que devem usar o header transparente
  const transparentHeaderPaths = [
    '/',                      // Home page
    '/contacts',              // Contactos
    '/portfolio/wines',       // Portefólio de vinhos
    '/portfolio/olive-oils',  // Portefólio de azeites
    '/find-us',               // Onde nos encontrar?
    '/sustainability'         // Sustentabilidade
    // Adicione mais caminhos conforme necessário
  ];
  
  // Verifica se o caminho atual deve usar o header transparente
  const shouldUseTransparentHeader = transparentHeaderPaths.includes(location.pathname);
  
  // Seleciona o header apropriado
  const HeaderComponent = shouldUseTransparentHeader ? Header : HeaderInternal;
  
  return (
    <>
      <HeaderComponent />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/wines" element={<WinePortfolioPage />} />
          <Route path="/portfolio/wines/:slug" element={<WineProductPage />} />
          <Route path="/portfolio/olive-oils" element={<OliveOilPortfolioPage />} />
          <Route path="/find-us" element={<FindUsPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/privacy-policies" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;