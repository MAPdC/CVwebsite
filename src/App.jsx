import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LANGS, getStoredLang, localizePath, useLang } from './i18n';
import { COMMON } from './i18n/common';
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

  // Camuflado (usa o HeaderInternal com tema Camuflado)
  ["/camuflado", <CamufladoLandingPage />],
  ["/camuflado/:slug", <CamufladoProductPage />],

  ["/contacts", <ContactPage />],
  ["/privacy-policies", <PrivacyPage />],

  ["/history", <UnderConstructionPage />],
  ["/sustainability", <UnderConstructionPage />],
  ["/about-us", <UnderConstructionPage />],
];

const DESCRIPTION = Object.fromEntries(LANGS.map((l) => [l, COMMON[l].meta.description]));

// Mantém o <html lang>, a descrição e as ligações hreflang de acordo com o idioma da página
function useDocumentLanguage(lang, path) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute("content", DESCRIPTION[lang]);

    const origin = window.location.origin;
    const alternates = [
      ...LANGS.map((l) => [l, localizePath(path, l)]),
      ["x-default", path],
    ];
    alternates.forEach(([hreflang, href]) => {
      let link = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = `${origin}${href}`;
    });
  }, [lang, path]);
}

// Componente para selecionar o header correto
function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, path } = useLang();

  useDocumentLanguage(lang, path);

  // À chegada ao site, abre no idioma que o visitante escolheu numa visita anterior
  useEffect(() => {
    const stored = getStoredLang();
    if (stored && stored !== lang) {
      navigate(`${localizePath(path, stored)}${location.search}${location.hash}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lista de caminhos que devem usar o header transparente
  const transparentHeaderPaths = [
    '/',                      // Home page
    '/contacts',              // Contactos
    '/portfolio/wines',       // Portefólio de vinhos
    '/portfolio/olive-oils',  // Portefólio de azeites
    // '/about-us',               // Onde nos encontrar?
    // '/sustainability'         // Sustentabilidade
    // Adicione mais caminhos conforme necessário
  ];
  
  // Verifica se o caminho atual deve usar o header transparente
  const shouldUseTransparentHeader = transparentHeaderPaths.includes(path);
  
  // Seleciona o header apropriado
  const HeaderComponent = shouldUseTransparentHeader ? Header : HeaderInternal;
  
  return (
    <>
      <HeaderComponent />
      {/* key: ao mudar de idioma a página é montada de novo, com os textos certos */}
      <main className="content" key={lang}>
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