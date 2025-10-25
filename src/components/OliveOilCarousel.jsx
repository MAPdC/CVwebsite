import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Droplets } from 'lucide-react';
import { oliveOils } from '../mocks/products.js';
import "../styles/OliveOilCarousel.css";


// Cartão de Azeite (Não clicável individualmente por agora)
const OliveOilCard = ({ oil, isHovered, setIsHovered }) => {
  return (
    <div
      className={`oil-card-premium ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="oil-card-border-glow" />
      <div className="oil-card-shimmer" />

      {oil.organic && <span className="badge-premium organic">Biológico</span>}
      {oil.lateHarvest && <span className="badge-premium late-harvest">Colheita Tardia</span>}

      <div className="oil-image-wrapper-premium">
        <img
          src={oil.images} // Usa a imagem do objeto oil
          alt={oil.name}
          className="oil-image-premium"
          onError={(e) => { e.target.src = '/placeholder-image.png'; }} // Imagem de fallback
        />
        <div className="oil-image-reflection"></div>
      </div>

      <div className="oil-info-premium">
        <div className="oil-category-premium">{oil.type}</div>
        <h3 className="oil-name-premium">{oil.name}</h3>
        <p className="oil-description-premium">{oil.briefDescription}</p>

        <div className="oil-features-premium">
          {oil.varieties.slice(0, 3).map((variety, idx) => ( // Mostra até 3 variedades
              <span key={idx}><Leaf size={13} /> {variety}</span>
          ))}
          {/* Adicionar mais ícones se necessário, e.g., acidez */}
          <span title={`Acidez: ${oil.technical?.acidity || 'N/A'}`}><Droplets size={13} /> Acidez Baixa</span>
        </div>
        {/* Botão individual removido */}
      </div>
    </div>
  );
};

// Componente Principal
const OliveOilCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const availableOils = oliveOils.filter(oil => oil.onmarket && !oil.soldout); // Filtra disponíveis
  const totalSlides = availableOils.length;

  useEffect(() => {
    // Observer para animação (igual ao WineCarousel)
    const observer = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && setIsVisible(true)), { threshold: 0.2 });
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const nextSlide = () => setCurrentIndex((p) => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides);
  const goToSlide = (index) => setCurrentIndex(index);

  const getVisibleOils = () => {
    // Lógica para mostrar 1, 2 ou 3 cartões (igual ao WineCarousel)
    if (totalSlides === 0) return [];
    if (totalSlides === 1) return [{ oil: availableOils[0], position: 0 }];
    if (totalSlides === 2) return [ { oil: availableOils[currentIndex % 2], position: 0 }, { oil: availableOils[(currentIndex + 1) % 2], position: 1 }];
    const visible = [];
    for (let i = 0; i < 3; i++) visible.push({ oil: availableOils[(currentIndex + i) % totalSlides], position: i });
    return visible;
  };

  if (totalSlides === 0) return null; // Não renderiza se não houver azeites

  return (
    <section
      ref={sectionRef}
      id="olive-oil-carousel-premium"
      className={`olive-oil-carousel-premium ${isVisible ? 'visible' : ''}`}
    >
      <div className="olive-oil-bg-pattern" />
      <div className="olive-oil-line-top" />

      <div className="olive-oil-container-premium">
        {/* Cabeçalho */}
        <div className="olive-oil-header-premium">
          <div className="olive-oil-subtitle-premium">
            <Leaf size={14} /> <span>Ouro Líquido do Douro</span> <Leaf size={14} />
          </div>
          <h2 className="olive-oil-title-premium">AZEITES</h2>
          <div className="olive-oil-ornament">
            <div className="ornament-line-left" /> <Droplets size={10} className="ornament-droplet"/> <div className="ornament-line-right" />
          </div>
        </div>

        {/* Wrapper do Carrossel */}
        <div className={`olive-oil-wrapper-premium ${totalSlides < 3 ? 'justify-center' : ''}`}>
          {totalSlides > 1 && <button onClick={prevSlide} className="carousel-nav-premium oil-nav prev" aria-label="Azeite anterior"><ChevronLeft size={20} /></button>}
          {/* Grelha de Cartões */}
          <div className={`olive-oil-cards-grid-premium ${totalSlides === 1 ? 'single' : totalSlides === 2 ? 'double' : 'triple'}`}>
            {getVisibleOils().map(({ oil, position }) => (
              <OliveOilCard key={oil.id || `oil-${position}`} oil={oil} isHovered={hoveredCard === (oil.id || `oil-${position}`)} setIsHovered={(h) => setHoveredCard(h ? (oil.id || `oil-${position}`) : null)} />
            ))}
          </div>
          {totalSlides > 1 && <button onClick={nextSlide} className="carousel-nav-premium oil-nav next" aria-label="Próximo azeite"><ChevronRight size={20} /></button>}
        </div>

        {/* Indicadores */}
        {totalSlides > 1 && (
          <div className="olive-oil-indicators-premium">
            {availableOils.map((_, index) => <button key={index} className={`indicator-premium oil-indicator ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Ir para azeite ${index + 1}`} />)}
          </div>
        )}

        {/* Link Geral */}
        <div className="carousel-portfolio-link-container oil-link-container">
          <Link to="/portfolio/olive-oils" className="carousel-portfolio-link oil-link">
            VER TODO O PORTEFÓLIO <ArrowRight size={16} className="portfolio-link-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OliveOilCarousel;