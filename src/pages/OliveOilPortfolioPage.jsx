import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/OliveOilPortfolioPage.css";
import heroBackground from '../assets/oliveira-1.webp';
import { oliveOils as productsData } from "../mocks/products";
import { FaLeaf, FaSearch } from "react-icons/fa";
import { localizeProduct, useLang } from "../i18n";
import { COMMON } from "../i18n/common";

const TEXT = {
  pt: {
    title: "Pureza.",
    titleSeo: "Azeite Virgem Extra Biológico", // completa o h1 para o Google e leitores de ecrã (não aparece no ecrã)
    subtitle: "A essência do campo e a tradição centenária em cada gota de azeite",
    search: "Procurar por nome ou variedade...",
    all: "Todos",
    category: "Azeite Virgem Extra",
    found: (n) => `${n} ${n === 1 ? "azeite encontrado" : "azeites encontrados"}`,
    noResults: "Nenhum azeite encontrado",
    noResultsHint: "Tente uma pesquisa diferente ou remova os filtros.",
  },
  en: {
    title: "Purity.",
    titleSeo: "Organic Extra Virgin Olive Oil",
    subtitle: "The essence of the land and a century-old tradition in every drop",
    search: "Search by name or variety...",
    all: "All",
    category: "Extra Virgin Olive Oil",
    found: (n) => `${n} ${n === 1 ? "olive oil found" : "olive oils found"}`,
    noResults: "No olive oils found",
    noResultsHint: "Try a different search or clear the filters.",
  },
};

function OliveOilPortfolioPage() {
  const [oilList, setOilList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const common = COMMON[lang];

  useEffect(() => {
    const loadOils = () => {
      setLoading(true);

      const formattedOils = productsData.map(o => localizeProduct(o, lang)).map(oil => ({
        id: oil.id,
        slug: oil.slug,
        name: oil.name,
        category: TEXT[lang].category,
        briefDescription: oil.briefDescription,
        varieties: oil.varieties,
        image: oil.images && oil.images.length > 0 ? oil.images[0] : "/placeholder-image.webp",
        onmarket: oil.onmarket,
        soldout: oil.soldout,
        organic: oil.organic,
        lateHarvest: oil.lateHarvest,
        awards: oil.awards || []
      }));

      setTimeout(() => {
        setOilList(formattedOils);
        setLoading(false);
      }, 600);
    };

    loadOils();
  }, [lang]);

  // Filtrar azeites
  const filteredOils = oilList.filter(oil => {
    const matchesFilter = filter === "all" ||
                          (filter === "lateHarvest" && oil.lateHarvest);

    const matchesSearch = oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          oil.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sortedOils = [...filteredOils].sort((a, b) => {
    if (a.onmarket && !b.onmarket) return -1;
    if (!a.onmarket && b.onmarket) return 1;
    if (a.soldout && !b.soldout) return 1; // Esgotados no fim
    if (!a.soldout && b.soldout) return -1;
    return a.name.localeCompare(b.name); // Ordenar alfabeticamente como fallback
  });


  return (
    <>
      <div className="oil-catalog">
        <div className="catalog-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">
              {text.title}
              <span className="visually-hidden"> {text.titleSeo}</span>
            </h1>
            <p className="catalog-hero__subtitle">{text.subtitle}</p>
          </div>
          <div className="scroll-down-prompt">
            <div className="scroll-down-arrow"></div>
          </div>
        </div>

        <div className="catalog-content">
          <div className="catalog-filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={text.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-options">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                {text.all}
              </button>
              <button
                className={`filter-btn filter-btn--late-harvest ${filter === "lateHarvest" ? "active" : ""}`}
                onClick={() => setFilter("lateHarvest")}
              >
                {common.badges.lateHarvest}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="elegant-loader"></div>
            </div>
          ) : (
            <>
              <div className="results-count">
                {text.found(sortedOils.length)}
              </div>

              <div className="oil-grid">
                {sortedOils.map((oil) => (
                  <Link to={to(`/portfolio/olive-oils/${oil.slug}`)} className="oil-card" key={oil.id}>
                    <div className="oil-card__image-container">
                      <img src={oil.image} alt={oil.name} className="oil-card__image" />
                       {/* Badge para Esgotado */}
                       {!oil.onmarket && oil.soldout && (
                         <div className="oil-card__badge oil-card__badge--soldout">{common.badges.soldOut}</div>
                       )}
                       {oil.onmarket && !oil.soldout && (
                         <div className="oil-card__badge oil-card__badge--available">{common.badges.available}</div>
                       )}
                       {/* Adicionar badge para prémios se existirem? */}
                    </div>

                    <div className="oil-card__content">
                      <div className="oil-card__header">
                        <h2 className="oil-card__name">{oil.name.replace(/\|/g, '')}</h2> {/* Remove a barra vertical se existir */}
                      </div>

                      <div className="oil-card__category">
                        {/* Indicador de cor removido ou adaptado */}
                        {/* <span className="oil-type-indicator" style={{ backgroundColor: getTypeColor(oil.type) }}></span> */}
                        {oil.category} {/* Usar a categoria definida */}
                      </div>

                      <p className="oil-card__description">{oil.briefDescription}</p>

                      <div className="oil-card__footer">
                        <div className="oil-card__varieties">
                          <FaLeaf className="variety-icon" />
                          <span>{oil.varieties.slice(0, 2).join(", ")}{oil.varieties.length > 2 ? "..." : ""}</span>
                        </div>
                      </div>

                      <div className="oil-card__cta">
                        <span>{common.seeDetails}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {sortedOils.length === 0 && (
                <div className="no-results">
                  <h3>{text.noResults}</h3>
                  <p>{text.noResultsHint}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OliveOilPortfolioPage;