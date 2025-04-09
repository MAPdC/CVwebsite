import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeaderInternal from './components/HeaderInternal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import VarietiesPage from './pages/VarietiesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import WinePortfolioPage from './pages/WinePortfolioPage';

// Componente de layout para páginas internas
function InternalLayout() {
  return (
    <>
      <HeaderInternal />
      <main className="content">
        <Routes>
          <Route path="/portfolio/wines" element={<WinePortfolioPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/grape-varieties" element={<VarietiesPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/privacy-policies" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

// Componente de layout para a página inicial
function HomeLayout() {
  return (
    <>
      <Header />
      <main className="content">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/*" element={<InternalLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;