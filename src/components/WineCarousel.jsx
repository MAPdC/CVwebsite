import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { wines } from '../mocks/products.js';
import { localizeProduct, useLang } from '../i18n';
import { COMMON } from '../i18n/common';

const TEXT = {
  pt: {
    subtitle: 'A Nossa Seleção',
    title: 'Vinhos',
    prev: 'Vinho anterior',
    next: 'Próximo vinho',
    goTo: (n) => `Ir para vinho ${n}`,
    portfolio: 'Ver todo o portefólio',
  },
  en: {
    subtitle: 'Our Selection',
    title: 'Wines',
    prev: 'Previous wine',
    next: 'Next wine',
    goTo: (n) => `Go to wine ${n}`,
    portfolio: 'View the full portfolio',
  },
};

const WineCard = ({ wine }) => {
  const { lang, to } = useLang();
  const badges = COMMON[lang].badges;

  // O efeito ao passar o rato (ou com o foco do teclado) é feito em CSS: :hover / :focus-visible
  return (
    <Link to={to(`/portfolio/wines/${wine.slug}`)} className="wine-card-premium"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="wine-card-shimmer" />

      <div className="wine-badges-premium">
        {wine.oaked && <span className="badge-premium oaked">{badges.oaked}</span>}
        {wine.curtimenta && <span className="badge-premium curtimenta">{badges.curtimenta}</span>}
      </div>

      <div className="wine-image-wrapper-premium">
        <img
          src={wine.images[0]}
          alt="" // o nome já está no título do cartão (dentro do mesmo link)
          className="wine-image-premium"
          loading="lazy"
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
      </div>
    </Link>
  );
};

const WineCarouselPremium = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { lang, to } = useLang();
  const text = TEXT[lang];

  const availableWines = wines.filter(wine => wine.onmarket).map(wine => localizeProduct(wine, lang));
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
        <div className="wine-carousel-header-premium">
          <div className="wine-carousel-subtitle-premium">
            <Sparkles size={12} />
            <span>{text.subtitle}</span>
            <Sparkles size={12} />
          </div>
          <h2 className="wine-carousel-title-premium">{text.title}</h2>
          <div className="wine-carousel-ornament">
            <div className="ornament-line-left" />
            <div className="ornament-diamond" />
            <div className="ornament-line-right" />
          </div>
        </div>

        <div className={`wine-carousel-wrapper-premium ${totalSlides < 3 ? 'justify-center' : ''}`}>
          {totalSlides > 1 && (
             <button onClick={prevSlide} className="carousel-nav-premium prev" aria-label={text.prev}>
               <ChevronLeft size={20} />
             </button>
          )}
          <div className={`wine-cards-grid-premium ${totalSlides === 1 ? 'single' : totalSlides === 2 ? 'double' : 'triple'}`}>
            {getVisibleWines().map(({ wine, position }) => (
              <WineCard
                key={`${wine.id}-${position}`}
                wine={wine}
              />
            ))}
          </div>
          {totalSlides > 1 && (
            <button onClick={nextSlide} className="carousel-nav-premium next" aria-label={text.next}>
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="wine-carousel-indicators-premium">
            {availableWines.map((_, index) => (
              <button key={index} className={`indicator-premium ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={text.goTo(index + 1)} />
            ))}
          </div>
        )}

        <div className="carousel-portfolio-link-container">
          <Link to={to("/portfolio/wines")} className="carousel-portfolio-link">
            {text.portfolio}
            <ArrowRight size={16} className="portfolio-link-arrow" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WineCarouselPremium;