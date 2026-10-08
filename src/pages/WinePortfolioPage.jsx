import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heroBackground from '../assets/old-references-tiny.webp';
import placeholder from '../assets/cv-logo-castanho.webp';
import { wines } from "../mocks/products";
import { FaWineGlassAlt, FaSearch } from "react-icons/fa";
import { localizeProduct, useLang } from "../i18n";
import { COMMON } from "../i18n/common";

const TEXT = {
  pt: {
    title: "Excelência.",
    titleSeo: "Vinhos DOC Douro", // completa o h1 para o Google e leitores de ecrã (não aparece no ecrã)
    subtitle: "Descubra a expressão do terroir do Douro em cada garrafa",
    search: "Procurar por nome, casta ou ano...",
    searchLabel: "Pesquisar vinhos",
    filterLabel: "Filtrar por tipo",
    all: "Todos",
    found: (n) => `${n} ${n === 1 ? "vinho encontrado" : "vinhos encontrados"}`,
    noResults: "Nenhum vinho encontrado",
    noResultsHint: "Tente uma pesquisa diferente ou remova os filtros.",
  },
  en: {
    title: "Excellence.",
    titleSeo: "Douro DOC Wines",
    subtitle: "Discover the expression of Douro terroir in every bottle",
    search: "Search by name, grape variety or vintage...",
    searchLabel: "Search wines",
    filterLabel: "Filter by style",
    all: "All",
    found: (n) => `${n} ${n === 1 ? "wine found" : "wines found"}`,
    noResults: "No wines found",
    noResultsHint: "Try a different search or clear the filters.",
  },
};

function WinePortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const common = COMMON[lang];

  // Os dados são estáticos (src/mocks/products.js): calculados logo, sem esperas
  const wineList = useMemo(
    () =>
      wines.map((w) => localizeProduct(w, lang)).map((wine) => ({
        id: wine.id,
        slug: wine.slug,
        name: wine.name,
        year: wine.year,
        type: wine.type,
        category: wine.category,
        briefDescription: wine.briefdescription || (wine.description ?? "").substring(0, 100) + "...",
        varieties: wine.varieties,
        image: wine.images?.[0] ?? placeholder,
        onmarket: wine.onmarket || false,
        collection: wine.collection || false,
        awards: wine.awards || []
      })),
    [lang]
  );

  // Filtrar vinhos baseado no tipo e termo de busca
  const filteredWines = wineList.filter(wine => {
    const matchesFilter = filter === "all" || wine.type.toLowerCase() === filter;
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          wine.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          wine.year.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Ordenar vinhos - Vinhos "Disponível" aparecem primeiro
  const sortedWines = [...filteredWines].sort((a, b) => {
    if (a.onmarket && !b.onmarket) return -1;
    if (!a.onmarket && b.onmarket) return 1;
    return 0;
  });

  return (
    <>
      
      <div className="wine-catalog">
        <div className="catalog-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">
              {text.title}
              <span className="visually-hidden"> {text.titleSeo}</span>
            </h1>
            <p className="catalog-hero__subtitle">{text.subtitle}</p>
          </div>
          {/* Indicador de Scroll para baixo */}
          <div className="scroll-down-prompt">
            <div className="scroll-down-arrow"></div>
          </div>
        </div>
        
        <div className="catalog-content">
          <div className="catalog-filters">
            <div className="search-bar" role="search">
              <label htmlFor="wine-search" className="visually-hidden">{text.searchLabel}</label>
              <FaSearch className="search-icon" aria-hidden="true" />
              <input
                id="wine-search"
                autoComplete="off" 
                type="text" 
                placeholder={text.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-options" role="group" aria-label={text.filterLabel}>
              <button
                type="button"
                aria-pressed={filter === "all"}
                className={`filter-btn ${filter === "all" ? "active-all" : ""}`}
                onClick={() => setFilter("all")}
              >
                {text.all}
              </button>
              <button
                type="button"
                aria-pressed={filter === "tinto"}
                className={`filter-btn ${filter === "tinto" ? "active-tinto" : ""}`}
                onClick={() => setFilter("tinto")}
              >
                {common.wineTypes.Tinto}
              </button>
              <button
                type="button"
                aria-pressed={filter === "branco"}
                className={`filter-btn ${filter === "branco" ? "active-branco" : ""}`}
                onClick={() => setFilter("branco")}
              >
                {common.wineTypes.Branco}
              </button>
              {/*
              <button 
                className={`filter-btn ${filter === "rosé" ? "active-rose" : ""}`}
                onClick={() => setFilter("rosé")}
              >
                Rosés
              </button>
              */}
            </div>
          </div>
          
          <>
            <div className="results-count" role="status">
              {text.found(sortedWines.length)}
            </div>
            
            <div className="wine-grid">
              {sortedWines.map((wine) => (
                <Link to={to(`/portfolio/wines/${wine.slug}`)} className="wine-card" key={wine.id}>
                  <div className="wine-card__image-container">
                    <img src={wine.image} alt={`${wine.name} ${wine.year}`} className="wine-card__image" />
                    
                    {/* Badge para Disponível ou Coleção */}
                    {wine.onmarket && (
                      <div className="wine-card__badge wine-card__badge--onmarket">{common.badges.available}</div>
                    )}
                    {wine.collection && (
                      <div className="wine-card__badge wine-card__badge--collection">{common.badges.collection}</div>
                    )}
                    
                    {/* Mostrar Medalhas */}
                    {wine.awards && wine.awards.length > 0 && (
                      <div className="wine-card__awards">
                        {wine.awards.map((award, index) => (
                          <div key={index} className="wine-card__award" title={`${award[2]} (${award[3]})`}>
                            <img src={award[1]} alt={award[2]} className="award-medal" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="wine-card__content">
                    <div className="wine-card__header">
                      <h2 className="wine-card__name">{wine.name}</h2>
                    </div>
                    
                    <div className="wine-card__category">
                      <span className="wine-type-indicator" style={{
                        backgroundColor: 
                          wine.type.toLowerCase() === "tinto" ? "#7b0323" : 
                          wine.type.toLowerCase() === "branco" ? "#f0e68c" : 
                          "#e8a7b9"
                      }}></span>
                      {wine.category}
                    </div>
                    
                    <p className="wine-card__description">{wine.briefDescription}</p>
                    
                    <div className="wine-card__footer">
                      <div className="wine-card__varieties">
                        <FaWineGlassAlt className="variety-icon" />
                        <span>{wine.varieties.slice(0, 2).join(", ")}{wine.varieties.length > 2 ? "..." : ""}</span>
                      </div>
                    </div>
                    
                    <div className="wine-card__cta">
                      <span>{common.seeDetails}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {sortedWines.length === 0 && (
              <div className="no-results">
                <h3>{text.noResults}</h3>
                <p>{text.noResultsHint}</p>
              </div>
            )}
          </>
        </div>
      </div>
      
    </>
  );
}

export default WinePortfolioPage;