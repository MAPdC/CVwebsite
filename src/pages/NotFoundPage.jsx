import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react'; // Ícones
import heroBackground from '../assets/douro-1.webp'; // Imagem de fundo
import '../styles/NotFoundPage.css'; // Novo CSS
import { useLang } from '../i18n';
import { COMMON } from '../i18n/common';

const TEXT = {
  pt: { title: 'Página Não Encontrada', text: 'Pedimos desculpa, mas a página que procura não existe.' },
  en: { title: 'Page Not Found', text: 'Sorry, the page you are looking for does not exist.' },
};

const NotFoundPage = () => {
  const { lang, to } = useLang();
  const text = TEXT[lang];

  useEffect(() => {
    // Garante que a página abre no topo
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="not-found-page" 
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="not-found-overlay" />
      
      <div className="not-found-content">
        <div className="not-found-icon">
          <Compass size={64} />
        </div>
        <h1 className="not-found-404">404</h1>
        <h2 className="not-found-title">{text.title}</h2>
        <p className="not-found-text">
          {text.text}
        </p>
        <Link to={to("/")} className="not-found-link">
          <ArrowLeft size={16} />
          {COMMON[lang].backHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;