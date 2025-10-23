import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { wines } from '../mocks/products.js';
import "../styles/WineCarousel.css";

const WineCard = ({ wine, isHovered, setIsHovered }) => {
  return (
    <div
      className={`wine-card-premium ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="wine-card-shimmer" />

      <div className="wine-badges-premium">
        {wine.oaked && (
          <span className="badge-premium oaked">Oaked</span>
        )}
        {wine.curtimenta && (
          <span className="badge-premium curtimenta">Curtimenta</span>
        )}
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
            <span key={idx} className="variety-tag-premium">
              {variety}
            </span>
          ))}
          {wine.varieties.length > 2 && (
            <span className="variety-more-premium">
              +{wine.varieties.length - 2}
            </span>
          )}
        </div>

        <button className="wine-cta-premium">
          Descobrir Mais
          <ArrowRight size={16} className="cta-arrow-premium" />
        </button>
      </div>
    </div>
  );
};

const WineCarouselPremium = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const autoplayRef = useRef(null);

  const availableWines = wines.filter(wine => wine.onmarket);
  const totalSlides = availableWines.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, isPaused]);

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
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      visible.push({ wine: availableWines[index], position: i });
    }
    return visible;
  };

  if (availableWines.length === 0) return null;

  return (
    <section 
      ref={sectionRef}
      id="wine-carousel-premium"
      className={`wine-carousel-premium ${isVisible ? 'visible' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="wine-carousel-glow" />
      <div className="wine-carousel-line-top" />

      <div className="wine-carousel-container-premium">
        <div className="wine-carousel-header-premium">
          <div className="wine-carousel-subtitle-premium">
            <Sparkles size={14} />
            <span>Nossa Seleção</span>
            <Sparkles size={14} />
          </div>
          
          <h2 className="wine-carousel-title-premium">
            Vinhos Disponíveis
          </h2>

          <div className="wine-carousel-ornament">
            <div className="ornament-line-left" />
            <div className="ornament-diamond" />
            <div className="ornament-line-right" />
          </div>
        </div>

        <div className="wine-carousel-wrapper-premium">
          <button
            onClick={prevSlide}
            className="carousel-nav-premium prev"
            aria-label="Vinho anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="wine-cards-grid-premium">
            {getVisibleWines().map(({ wine, position }) => (
              <WineCard 
                key={`${wine.id}-${position}`} 
                wine={wine}
                isHovered={hoveredCard === `${wine.id}-${position}`}
                setIsHovered={(hovered) => setHoveredCard(hovered ? `${wine.id}-${position}` : null)}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="carousel-nav-premium next"
            aria-label="Próximo vinho"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="wine-carousel-indicators-premium">
          {availableWines.map((_, index) => (
            <button
              key={index}
              className={`indicator-premium ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para vinho ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WineCarouselPremium;