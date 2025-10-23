import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Manter a importação
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { wines } from '../mocks/products.js'; // Verifique o caminho
import "../styles/WineCarousel.css"; // Verifique o caminho

const WineCard = ({ wine, isHovered, setIsHovered }) => {
  return (
    // O div wrapper do cartão agora é o elemento clicável que leva aos detalhes
    <Link to={`/portfolio/wines/${wine.slug}`} className={`wine-card-premium ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ textDecoration: 'none', color: 'inherit' }} // Garante que não parece um link padrão
    >
      <div className="wine-card-shimmer" />

      <div className="wine-badges-premium">
        {wine.oaked && <span className="badge-premium oaked">Oaked</span>}
        {wine.curtimenta && <span className="badge-premium curtimenta">Curtimenta</span>}
      </div>

      <div className="wine-image-wrapper-premium">
        <img
          src={wine.images[0]}
          alt={wine.name}
          className="wine-image-premium"
        />
      </div>

      <div className="wine-info-premium">
        <div className="wine-category-premium">{wine.category}</div>
        <h3 className="wine-name-premium">{wine.name}</h3>
        <div className="wine-year-premium">{wine.year}</div>
        <p className="wine-description-premium">{wine.briefdescription}</p>

        <div className="wine-varieties-premium">
          {wine.varieties.slice(0, 2).map((variety, idx) => (
            <span key={idx} className="variety-tag-premium">{variety}</span>
          ))}
          {wine.varieties.length > 2 && (
            <span className="variety-more-premium">+{wine.varieties.length - 2}</span>
          )}
        </div>

        {/* REMOVIDO o Link/Botão 'Ver Portefólio' daqui */}

      </div>
    </Link> // Fechar o Link que envolve o cartão
  );
};

const WineCarouselPremium = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const availableWines = wines.filter(wine => wine.onmarket);
  const totalSlides = availableWines.length;

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleWines = () => {
    if (totalSlides === 0) return [];
    if (totalSlides === 1) return [{ wine: availableWines[0], position: 0 }];
    if (totalSlides === 2) {
      return [
        { wine: availableWines[currentIndex % 2], position: 0 },
        { wine: availableWines[(currentIndex + 1) % 2], position: 1 }
      ];
    }
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      visible.push({ wine: availableWines[index], position: i });
    }
    return visible;
  };

  if (totalSlides === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="wine-carousel-premium"
      className={`wine-carousel-premium ${isVisible ? 'visible' : ''}`}
    >
      <div className="wine-carousel-glow" />
      <div className="wine-carousel-line-top" />

      <div className="wine-carousel-container-premium">
        {/* Header (Título, Subtítulo, Ornamento) - Mantém-se igual */}
        <div className="wine-carousel-header-premium">
          <div className="wine-carousel-subtitle-premium">
            <Sparkles size={12} />
            <span>A Nossa Seleção</span>
            <Sparkles size={12} />
          </div>
          <h2 className="wine-carousel-title-premium">VINHOS</h2>
          <div className="wine-carousel-ornament">
            <div className="ornament-line-left" />
            <div className="ornament-diamond" />
            <div className="ornament-line-right" />
          </div>
        </div>

        {/* Wrapper do Carrossel (Botões + Grelha) - Mantém-se igual */}
        <div className={`wine-carousel-wrapper-premium ${totalSlides < 3 ? 'justify-center' : ''}`}>
          {totalSlides > 1 && (
             <button onClick={prevSlide} className="carousel-nav-premium prev" aria-label="Vinho anterior">
               <ChevronLeft size={20} />
             </button>
          )}
          <div className={`wine-cards-grid-premium ${totalSlides === 1 ? 'single' : totalSlides === 2 ? 'double' : 'triple'}`}>
            {getVisibleWines().map(({ wine, position }) => (
              <WineCard
                key={`${wine.id}-${position}`}
                wine={wine}
                isHovered={hoveredCard === `${wine.id}-${position}`}
                setIsHovered={(hovered) => setHoveredCard(hovered ? `${wine.id}-${position}` : null)}
              />
            ))}
          </div>
          {totalSlides > 1 && (
            <button onClick={nextSlide} className="carousel-nav-premium next" aria-label="Próximo vinho">
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Indicadores - Mantêm-se iguais */}
        {totalSlides > 1 && (
          <div className="wine-carousel-indicators-premium">
            {availableWines.map((_, index) => (
              <button key={index} className={`indicator-premium ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Ir para vinho ${index + 1}`} />
            ))}
          </div>
        )}

        {/* ADICIONADO: Link geral para o portefólio */}
        <div className="carousel-portfolio-link-container">
          <Link to="/portfolio/wines" className="carousel-portfolio-link">
            Ver Todo o Portefólio
            <ArrowRight size={16} className="portfolio-link-arrow" />
          </Link>
        </div>
        {/* Fim da adição */}

      </div>
    </section>
  );
};

export default WineCarouselPremium;