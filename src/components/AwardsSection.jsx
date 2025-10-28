import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { wines, oliveOils } from '../mocks/products.js'; // Importar os dados
import '../styles/AwardsSection.css'; // Criaremos este CSS a seguir
import { Award, Star } from 'lucide-react'; // Ícones para estilo

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Combina vinhos e azeites e filtra os que têm prémios
  const allProducts = [...wines, ...oliveOils];
  const awardedProducts = allProducts
    .filter(p => p.awards && p.awards.length > 0) // Filtra produtos no mercado com prémios
    // Ordena para mostrar talvez os com mais prémios ou mais recentes primeiro (opcional)
    .sort((a, b) => b.awards.length - a.awards.length)
    .slice(0, 3); // Limita a 3 produtos em destaque

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  if (awardedProducts.length === 0) {
    return null; // Não renderiza a secção se não houver produtos premiados no mercado
  }

  const getProductUrl = (product) => {
    // Determina se é vinho ou azeite pelo slug ou outra propriedade única
    // Esta é uma suposição, ajuste se necessário
    if (product.slug.includes('red') || product.slug.includes('white')) {
      return `/portfolio/wines/${product.slug}`;
    } else {
      return `/portfolio/olive-oils/${product.slug}`;
    }
  };


  return (
    <section
      ref={sectionRef}
      className={`highlight-awards-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="highlight-awards-container">
        {/* Header da Secção */}
        <div className="highlight-awards-header">
          <div className="highlight-awards-subtitle">
             Reconhecimento & Prestígio
          </div>
          <h2 className="highlight-awards-title">DISTINÇÕES</h2>
          <div className="highlight-awards-ornament">
            <div className="ornament-line-left" />
            <Award size={14} className="ornament-icon"/>
            <div className="ornament-line-right" />
          </div>
        </div>

        {/* Grelha de Produtos Premiados */}
        <div className="highlight-awards-grid">
          {awardedProducts.map((product, index) => {
            // Código novo dentro do .map(product => { ... })
            const productUrl = getProductUrl(product);
            // Pega em todas as medalhas
            const allMedalUrls = product.awards.map(award => award[1]).filter(Boolean);

            return (
              <Link to={productUrl} className="award-card" key={product.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="award-card-image-wrapper">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="award-card-image"
                  />
                  <div className="award-card-image-overlay"></div>
                  {allMedalUrls.length > 0 && (
                    <div className="award-card-medals-stack">
                      {allMedalUrls.map((medalUrl, medalIndex) => (
                        <img
                          key={medalIndex}
                          src={medalUrl}
                          alt={`Medalha ${medalIndex + 1}`}
                          className="award-card-medal-stacked"
                          style={{ zIndex: allMedalUrls.length - medalIndex }} // Para empilhar corretamente
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="award-card-info">
                  <h3 className="award-card-name">{product.name}</h3>
                  <div className="award-card-category">{product.category || product.type}</div>

                  {/* MODIFICAÇÃO AQUI: Iterar sobre todos os prémios */}
                  <div className="award-card-details-list">
                    {product.awards.map((award, awardIndex) => (
                      <div className="award-card-details-item" key={awardIndex}>
                        {/* Opcional: Mostrar a medalha pequena ao lado de cada descrição */}
                        {award[1] && <img src={award[1]} alt="Medalha pequena" className="award-medal-icon-small" />}
                        <span className="award-name">{award[2]}</span>
                        {award[3] && <span className="award-score">({award[3]} pts)</span>}
                      </div>
                    ))}
                  </div>
                  {/* FIM DA MODIFICAÇÃO */}

                  <span className="award-card-link">
                    Ver Detalhes <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;