import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LANGS, getStoredLang, localizePath, useLang } from './i18n';
import { COMMON } from './i18n/common';
import usePageMeta from './seo/usePageMeta';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
// A página inicial e a 404 vêm no bundle principal; as restantes são carregadas só quando são abertas
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const WinePortfolioPage = lazy(() => import('./pages/WinePortfolioPage'));
const OliveOilPortfolioPage = lazy(() => import('./pages/OliveOilPortfolioPage'));
const WineProductPage = lazy(() => import('./pages/WineProductPage'));
const OliveOilProductPage = lazy(() => import('./pages/OliveOilProductPage'));
const UnderConstructionPage = lazy(() => import('./pages/UnderConstructionPage'));
const CamufladoLandingPage = lazy(() => import('./pages/CamufladoLandingPage'));
const CamufladoProductPage = lazy(() => import('./pages/CamufladoProductPage'));
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
        {/* key: um erro numa página não bloqueia as outras (repõe ao mudar de página) */}
        <ErrorBoundary key={path}>
          <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
            <Routes>
              {LANGS.flatMap((l) =>
                PAGES.map(([pagePath, element]) => {
                  const routePath = localizePath(pagePath, l);
                  return <Route key={routePath} path={routePath} element={element} />;
                })
              )}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
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