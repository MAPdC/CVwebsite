import { useMemo } from 'react';
import useInView from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { wines, oliveOils } from '../mocks/products.js'; // Importar os dados
import { Award, Star } from 'lucide-react'; // Ícones para estilo
import { localizeProduct, useLang } from '../i18n';
import { COMMON } from '../i18n/common';

const TEXT = {
  pt: {
    subtitle: 'Reconhecimento & Prestígio',
    title: 'Distinções',
  },
  en: {
    subtitle: 'Recognition & Prestige',
    title: 'Awards',
  },
};

// Os 3 produtos com mais prémios (os dados são estáticos: calculado uma vez), com a secção de cada um
const AWARDED = [
  ...wines.map((product) => ({ product, basePath: "/portfolio/wines" })),
  ...oliveOils.map((product) => ({ product, basePath: "/portfolio/olive-oils" })),
]
  .filter(({ product }) => product.awards?.length > 0)
  .sort((a, b) => b.product.awards.length - a.product.awards.length)
  .slice(0, 3);

const AwardsSection = () => {
  const [sectionRef, isVisible] = useInView();
  const { lang, to } = useLang();
  const text = TEXT[lang];

  const awardedProducts = useMemo(
    () => AWARDED.map(({ product, basePath }) => ({ ...localizeProduct(product, lang), basePath })),
    [lang]
  );

  if (awardedProducts.length === 0) {
    return null; // Não renderiza a secção se não houver produtos premiados no mercado
  }


  return (
    <section
      ref={sectionRef}
      className={`highlight-awards-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="section-glow" />
      <div className="section-line-top" />
      <div className="highlight-awards-container">
        {/* Header da Secção */}
        <div className="highlight-awards-header">
          <div className="highlight-awards-subtitle">
             {text.subtitle}
          </div>
          <h2 className="highlight-awards-title">{text.title}</h2>
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
            const productUrl = to(`${product.basePath}/${product.slug}`);
            // Pega em todas as medalhas
            const allMedalUrls = product.awards.map((award) => award.medal).filter(Boolean);

            return (
              <Link to={productUrl} className="award-card" key={product.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="award-card-image-wrapper">
                  <img
                    src={product.images[0]}
                    alt="" // nome no título do cartão
                    className="award-card-image"
                    loading="lazy"
                  />
                  <div className="award-card-image-overlay"></div>
                  {allMedalUrls.length > 0 && (
                    <div className="award-card-medals-stack">
                      {allMedalUrls.map((medalUrl, medalIndex) => (
                        <img
                          key={medalIndex}
                          src={medalUrl}
                          alt="" // os prémios estão escritos por baixo
                          className="award-card-medal-stacked"
                          loading="lazy"
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
                    {product.awards.map((award) => (
                      <div className="award-card-details-item" key={award.title}>
                        {/* Opcional: Mostrar a medalha pequena ao lado de cada descrição */}
                        {award.medal && <img src={award.medal} alt="" className="award-medal-icon-small" loading="lazy" />}
                        <span className="award-name">{award.title}</span>
                        {award.score && <span className="award-score">({award.score} pts)</span>}
                      </div>
                    ))}
                  </div>
                  {/* FIM DA MODIFICAÇÃO */}

                  <span className="award-card-link">
                    {COMMON[lang].seeDetails} <span className="arrow">→</span>
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