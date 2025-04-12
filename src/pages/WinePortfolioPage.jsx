import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/WinePortfolioPage.css";
import heroBackground from '../assets/old-references.jpg';
import { wines } from "../mocks/products"; // Importando os vinhos do arquivo products.js

// Ícones para elementos visuais
import { FaWineGlassAlt, FaSearch } from "react-icons/fa";

function WinePortfolioPage() {
  const [wineList, setWineList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Agora usamos os dados do arquivo products.js
    const loadWines = () => {
      setLoading(true);
      
      // Mapeamos os dados do arquivo products.js para o formato que precisamos
      const formattedWines = wines.map(wine => ({
        id: wine.id,
        slug: wine.slug,
        name: wine.name,
        year: wine.year,
        type: wine.type,
        category: wine.category,
        briefDescription: wine.briefdescription || wine.description.substring(0, 100) + "...",
        varieties: wine.varieties,
        image: wine.images && wine.images.length > 0 ? wine.images[0] : "/images/vinho-default.jpg",
        highlighted: wine.highlighted || false,
        sold_out: wine.sold_out
      }));
      
      // Adicionar um pequeno delay para simular carregamento
      setTimeout(() => {
        setWineList(formattedWines);
        setLoading(false);
      }, 600);
    };

    loadWines();
    
    // Scroll para o topo ao carregar
    window.scrollTo(0, 0);
  }, []);

  // Filtrar vinhos baseado no tipo e termo de busca
  const filteredWines = wineList.filter(wine => {
    const matchesFilter = filter === "all" || wine.type.toLowerCase() === filter;
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          wine.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          wine.year.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Destaque vinhos em destaque primeiro
  const sortedWines = [...filteredWines].sort((a, b) => {
    if (a.highlighted && !b.highlighted) return -1;
    if (!a.highlighted && b.highlighted) return 1;
    return 0;
  });

  return (
    <>
      
      <main className="wine-catalog">
        <div className="catalog-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">Excelência.</h1>
            <p className="catalog-hero__subtitle">Descubra a expressão do terroir do Douro em cada garrafa</p>
          </div>
        </div>
        
        <div className="catalog-content">
          <div className="catalog-filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Procurar por nome, casta ou ano..." 
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
                className={`filter-btn ${filter === "tinto" ? "active" : ""}`}
                onClick={() => setFilter("tinto")}
              >
                Tintos
              </button>
              <button 
                className={`filter-btn ${filter === "branco" ? "active" : ""}`}
                onClick={() => setFilter("branco")}
              >
                Brancos
              </button>
              <button 
                className={`filter-btn ${filter === "rosé" ? "active" : ""}`}
                onClick={() => setFilter("rosé")}
              >
                Rosés
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
                {sortedWines.length} {sortedWines.length === 1 ? "vinho" : "vinhos"} encontrados
              </div>
              
              <div className="wine-grid">
                {sortedWines.map((wine) => (
                  <Link to={`/portfolio/wines/${wine.slug}`} className="wine-card" key={wine.id}>
                    <div className="wine-card__image-container">
                      <img src={wine.image} alt={`${wine.name} ${wine.year}`} className="wine-card__image" />
                      {wine.highlighted && (
                        <div className="wine-card__badge">Destaque</div>
                      )}
                      {wine.sold_out && (
                        <div className="wine-card__badge sold-out">Esgotado</div>
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
                        
                        <div className="wine-card__price">{wine.price}</div>
                      </div>
                      
                      <div className="wine-card__cta">
                        <span>Ver Detalhes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {sortedWines.length === 0 && (
                <div className="no-results">
                  <h3>Nenhum vinho encontrado</h3>
                  <p>Tente uma busca diferente ou remova os filtros.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
    </>
  );
}

export default WinePortfolioPage;