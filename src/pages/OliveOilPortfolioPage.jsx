import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/OliveOilPortfolioPage.css";
import heroBackground from '../assets/oliveira-1-tiny.jpg';
import { oliveOils as productsData } from "../mocks/products";
import { FaLeaf, FaSearch } from "react-icons/fa";

function OliveOilPortfolioPage() {
  const [oilList, setOilList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadOils = () => {
      setLoading(true);

      const formattedOils = productsData.map(oil => ({
        id: oil.id,
        slug: oil.slug,
        name: oil.name,
        category: "Azeite Virgem Extra",
        briefDescription: oil.briefDescription,
        varieties: oil.varieties,
        image: oil.images && oil.images.length > 0 ? oil.images[0] : "/placeholder-image.png",
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
    window.scrollTo(0, 0);
  }, []);

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
      <main className="oil-catalog">
        <div className="catalog-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">Pureza.</h1>
            <p className="catalog-hero__subtitle">A essência do campo e a tradição centenária em cada gota de azeite</p>
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
                placeholder="Procurar por nome ou variedade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-options">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              <button
                className={`filter-btn filter-btn--late-harvest ${filter === "lateHarvest" ? "active" : ""}`}
                onClick={() => setFilter("lateHarvest")}
              >
                Colheita Tardia
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
                {sortedOils.length} {sortedOils.length === 1 ? "azeite encontrado" : "azeites encontrados"}
              </div>

              <div className="oil-grid">
                {sortedOils.map((oil) => (
                  <Link to={`/portfolio/olive-oils/${oil.slug}`} className="oil-card" key={oil.id}>
                    <div className="oil-card__image-container">
                      <img src={oil.image} alt={oil.name} className="oil-card__image" />
                       {/* Badge para Esgotado */}
                       {!oil.onmarket && oil.soldout && (
                         <div className="oil-card__badge oil-card__badge--soldout">Esgotado</div>
                       )}
                       {oil.onmarket && !oil.soldout && (
                         <div className="oil-card__badge oil-card__badge--available">Disponível</div>
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
                        <span>Ver Detalhes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {sortedOils.length === 0 && (
                <div className="no-results">
                  <h3>Nenhum azeite encontrado</h3>
                  <p>Tente uma pesquisa diferente ou remova os filtros.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default OliveOilPortfolioPage;