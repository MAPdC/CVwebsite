import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LANGS, getStoredLang, localizePath, useLang } from './i18n';
import { COMMON } from './i18n/common';
import usePageMeta from './seo/usePageMeta';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import WinePortfolioPage from './pages/WinePortfolioPage';
import OliveOilPortfolioPage from './pages/OliveOilPortfolioPage';
import WineProductPage from './pages/WineProductPage';
import OliveOilProductPage from './pages/OliveOilProductPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import CamufladoLandingPage from './pages/CamufladoLandingPage';
import CamufladoProductPage from './pages/CamufladoProductPage';
import LanguageSuggestion from './components/LanguageSuggestion';

// Páginas do site (caminhos PT). Cada uma existe também em inglês com o prefixo "/en".
const PAGES = [
  ["/", <HomePage />],
  ["/portfolio/wines", <WinePortfolioPage />],
  ["/portfolio/wines/:slug", <WineProductPage />],
  ["/portfolio/olive-oils", <OliveOilPortfolioPage />],
  ["/portfolio/olive-oils/:slug", <OliveOilProductPage />],

  // Camuflado (o header ganha o tema Camuflado nestas páginas)
  ["/camuflado", <CamufladoLandingPage />],
  ["/camuflado/:slug", <CamufladoProductPage />],

  ["/contacts", <ContactPage />],
  ["/privacy-policies", <PrivacyPage />],

  ["/history", <UnderConstructionPage />],
  ["/sustainability", <UnderConstructionPage />],
  ["/about-us", <UnderConstructionPage />],
];

// Páginas com hero de ecrã inteiro: o header começa transparente por cima da imagem
const TRANSPARENT_HEADER_PATHS = new Set(["/", "/contacts", "/portfolio/wines", "/portfolio/olive-oils"]);

// Leva o foco para o conteúdo (link "Saltar para o conteúdo"), sem alterar o URL
const skipToContent = (e) => {
  e.preventDefault();
  document.getElementById("conteudo")?.focus();
};

function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, path } = useLang();

  usePageMeta();

  // À chegada ao site, abre no idioma que o visitante escolheu numa visita anterior
  useEffect(() => {
    const stored = getStoredLang();
    if (stored && stored !== lang) {
      navigate(`${localizePath(path, stored)}${location.search}${location.hash}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={skipToContent}>
        {COMMON[lang].skip}
      </a>
      <ScrollToTop />
      <Header transparent={TRANSPARENT_HEADER_PATHS.has(path)} />
      {/* key: ao mudar de idioma a página é montada de novo, com os textos certos.
          tabIndex -1: recebe o foco ao mudar de página, para o leitor de ecrã anunciar o conteúdo novo */}
      <main id="conteudo" tabIndex={-1} className="content" key={lang}>
        <Routes>
          {LANGS.flatMap((l) =>
            PAGES.map(([pagePath, element]) => {
              const routePath = localizePath(pagePath, l);
              return <Route key={routePath} path={routePath} element={element} />;
            })
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <LanguageSuggestion />
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