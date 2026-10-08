import { useState } from 'react';
import useInView from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Droplets } from 'lucide-react';
import { oliveOils } from '../mocks/products.js';
import placeholder from "../assets/cv-logo-castanho.webp";
import { formatDecimal, localizeProduct, useLang } from '../i18n';
import { COMMON } from '../i18n/common';

const TEXT = {
  pt: {
    acidity: 'Acidez',
    subtitle: 'Ouro Líquido do Douro',
    title: 'Azeites',
    prev: 'Azeite anterior',
    next: 'Próximo azeite',
    goTo: (n) => `Ir para azeite ${n}`,
    portfolio: 'Ver todo o portefólio',
  },
  en: {
    acidity: 'Acidity',
    subtitle: 'Liquid Gold from the Douro',
    title: 'Olive Oils',
    prev: 'Previous olive oil',
    next: 'Next olive oil',
    goTo: (n) => `Go to olive oil ${n}`,
    portfolio: 'View the full portfolio',
  },
};


// Imagem que falhou: mostra o logótipo. Desliga o handler antes, para não entrar em ciclo se o logótipo também falhar
const showPlaceholder = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = placeholder;
};

// Cartão de Azeite (abre a página do azeite)
const OliveOilCard = ({ oil }) => {
  const { lang, to } = useLang();
  const badges = COMMON[lang].badges;
  const text = TEXT[lang];

  return (
    <Link
      to={to(`/portfolio/olive-oils/${oil.slug}`)}
      className="oil-card-premium" // efeito ao passar o rato / com foco: :hover e :focus-visible no CSS
      style={{ textDecoration: 'none' }}
    >
      <div className="oil-card-border-glow" />
      <div className="oil-card-shimmer" />

      {oil.organic && <span className="badge-premium organic">{badges.organic}</span>}
      {oil.lateHarvest && <span className="badge-premium late-harvest">{badges.lateHarvest}</span>}

      <div className="oil-image-wrapper-premium">
        <img
          src={oil.images[0]}
          alt="" // o nome já está no título do cartão
          className="oil-image-premium"
          onError={showPlaceholder}
          loading="lazy"
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
          {/* O valor real da análise (antes era uma etiqueta fixa "Acidez Baixa") */}
          {oil.technical?.acidity && (
            <span><Droplets size={13} aria-hidden="true" /> {text.acidity} {formatDecimal(oil.technical.acidity, lang)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

// Componente Principal
const OliveOilCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isVisible] = useInView();
  const { lang, to } = useLang();
  const text = TEXT[lang];

  const availableOils = oliveOils.filter(oil => oil.onmarket && !oil.soldout).map(oil => localizeProduct(oil, lang)); // Filtra disponíveis
  const totalSlides = availableOils.length;

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
            <Leaf size={14} /> <span>{text.subtitle}</span> <Leaf size={14} />
          </div>
          <h2 className="olive-oil-title-premium">{text.title}</h2>
          <div className="olive-oil-ornament">
            <div className="ornament-line-left" /> <Droplets size={10} className="ornament-droplet"/> <div className="ornament-line-right" />
          </div>
        </div>

        {/* Wrapper do Carrossel */}
        <div className={`olive-oil-wrapper-premium ${totalSlides < 3 ? 'justify-center' : ''}`}>
          {totalSlides > 1 && <button onClick={prevSlide} className="carousel-nav-premium oil-nav prev" aria-label={text.prev}><ChevronLeft size={20} /></button>}
          {/* Grelha de Cartões */}
          <div className={`olive-oil-cards-grid-premium ${totalSlides === 1 ? 'single' : totalSlides === 2 ? 'double' : 'triple'}`}>
            {getVisibleOils().map(({ oil, position }) => (
              <OliveOilCard key={oil.id || `oil-${position}`} oil={oil} />
            ))}
          </div>
          {totalSlides > 1 && <button onClick={nextSlide} className="carousel-nav-premium oil-nav next" aria-label={text.next}><ChevronRight size={20} /></button>}
        </div>

        {/* Indicadores */}
        {totalSlides > 1 && (
          <div className="olive-oil-indicators-premium">
            {availableOils.map((_, index) => <button key={index} className={`indicator-premium oil-indicator ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={text.goTo(index + 1)} aria-current={index === currentIndex ? "true" : undefined} />)}
          </div>
        )}

        {/* Link Geral */}
        <div className="carousel-portfolio-link-container oil-link-container">
          <Link to={to("/portfolio/olive-oils")} className="carousel-portfolio-link oil-link">
            {text.portfolio} <ArrowRight size={16} className="portfolio-link-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OliveOilCarousel;