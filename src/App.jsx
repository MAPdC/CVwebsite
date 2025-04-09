import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import VarietiesPage from './pages/VarietiesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import WinePortfolioPage from './pages/WinePortfolioPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/wines" element={<WinePortfolioPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/grape-varieties" element={<VarietiesPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/privacy-policies" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;