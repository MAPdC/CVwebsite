import React, { useEffect } from 'react';
import { Construction, ArrowLeft } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Para o botão de voltar
import '../styles/UnderConstructionPage.css'; // Novo CSS

const UnderConstructionPage = () => {
  useEffect(() => {
    // Garante que a página abre no topo
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="under-construction-page">
      <div className="construction-container">
        <div className="construction-icon">
          <Construction size={64} />
        </div>
        <h1 className="construction-title">Em Desenvolvimento</h1>
        <p className="construction-text">
          Estamos a trabalhar arduamente para lhe trazer esta nova secção.
          <br />
          Por favor, volte mais tarde.
        </p>
        <Link to="/" className="construction-home-link">
          <ArrowLeft size={16} />
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default UnderConstructionPage;