import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react'; // Ícones
import heroBackground from '../assets/douro-1.jpg'; // Imagem de fundo
import '../styles/NotFoundPage.css'; // Novo CSS

const NotFoundPage = () => {
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
        <h2 className="not-found-title">Página Não Encontrada</h2>
        <p className="not-found-text">
          Pedimos desculpa, mas a página que procura não existe.
        </p>
        <Link to="/" className="not-found-link">
          <ArrowLeft size={16} />
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;