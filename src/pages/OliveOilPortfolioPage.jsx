import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/OliveOilPortfolioPage.css";

// Ícones para elementos visuais
import { FaLeaf, FaSearch } from "react-icons/fa";

function OliveOilPortfolioPage() {
  const [oliveOils, setOliveOils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simula busca de azeites da API
    const fetchOliveOils = async () => {
      setLoading(true);
      
      // Mock data - substituir por chamada de API real
      const mockOliveOils = [
        {
          id: "azeite-virgem-extra-premium",
          name: "Virgem Extra Premium",
          year: "2023",
          type: "Intenso",
          category: "Douro DOP",
          briefDescription: "Azeite de sabor intenso com notas de amêndoa verde e um final picante persistente.",
          varieties: ["Cobrançosa", "Verdeal"],
          image: "/images/azeite-1.jpg",
          price: "32,50€",
          highlighted: true
        },
        {
          id: "azeite-selecao-especial",
          name: "Seleção Especial",
          year: "2023",
          type: "Suave",
          category: "Douro DOP",
          briefDescription: "Delicado e equilibrado, com toques frutados e um final herbáceo muito agradável.",
          varieties: ["Galega", "Cordovil"],
          image: "/images/azeite-2.jpg",
          price: "29,00€",
          highlighted: true
        },
        {
          id: "azeite-monovarietal",
          name: "Monovarietal Cobrançosa",
          year: "2022",
          type: "Médio",
          category: "Douro DOP",
          briefDescription: "Complexo e elegante, com notas de maçã verde e toques de tomate maduro.",
          varieties: ["Cobrançosa"],
          image: "/images/azeite-3.jpg",
          price: "26,50€",
          highlighted: false
        },
        {
          id: "azeite-biologico",
          name: "Azeite Biológico",
          year: "2023",
          type: "Médio",
          category: "Douro DOP",
          briefDescription: "Produzido com azeitonas de cultura biológica, tem aromas herbáceos e sabor equilibrado.",
          varieties: ["Cordovil", "Cobrançosa"],
          image: "/images/azeite-4.jpg",
          price: "28,00€",
          highlighted: false
        },
        {
          id: "azeite-grande-escolha",
          name: "Grande Escolha",
          year: "2022",
          type: "Intenso",
          category: "Douro DOP",
          briefDescription: "Aromático e encorpado, com intensas notas de ervas aromáticas e pimenta verde.",
          varieties: ["Picual", "Cobrançosa", "Verdeal"],
          image: "/images/azeite-5.jpg",
          price: "38,00€",
          highlighted: true
        },
        {
          id: "azeite-tradicional",
          name: "Tradicional",
          year: "2023",
          type: "Suave",
          category: "Douro DOP",
          briefDescription: "Azeite clássico com notas de amêndoa doce e um final subtilmente picante.",
          varieties: ["Galega", "Madural"],
          image: "/images/azeite-6.jpg",
          price: "24,50€",
          highlighted: false
        }
      ];
      
      // Adicionar um pequeno delay para simular carregamento
      setTimeout(() => {
        setOliveOils(mockOliveOils);
        setLoading(false);
      }, 600);
    };

    fetchOliveOils();
    
    // Scroll para o topo ao carregar
    window.scrollTo(0, 0);
  }, []);

  // Filtrar azeites baseado no tipo e termo de busca
  const filteredOliveOils = oliveOils.filter(oil => {
    const matchesFilter = filter === "all" || oil.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = oil.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          oil.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          oil.year.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Destaque azeites em destaque primeiro
  const sortedOliveOils = [...filteredOliveOils].sort((a, b) => {
    if (a.highlighted && !b.highlighted) return -1;
    if (!a.highlighted && b.highlighted) return 1;
    return 0;
  });

  return (
    <>
      <main className="oil-catalog">
        <div className="catalog-hero">
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">Pureza.</h1>
            <p className="catalog-hero__subtitle">A essência do campo e a tradição centenária em cada gota de azeite</p>
          </div>
        </div>
        
        <div className="catalog-content">
          <div className="catalog-filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Procurar por nome, variedade ou ano..." 
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
                className={`filter-btn ${filter === "intenso" ? "active" : ""}`}
                onClick={() => setFilter("intenso")}
              >
                Intenso
              </button>
              <button 
                className={`filter-btn ${filter === "médio" ? "active" : ""}`}
                onClick={() => setFilter("médio")}
              >
                Médio
              </button>
              <button 
                className={`filter-btn ${filter === "suave" ? "active" : ""}`}
                onClick={() => setFilter("suave")}
              >
                Suave
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
                {sortedOliveOils.length} {sortedOliveOils.length === 1 ? "azeite" : "azeites"} encontrados
              </div>
              
              <div className="oil-grid">
                {sortedOliveOils.map((oil) => (
                  <Link to={`/product/oil/${oil.id}`} className="oil-card" key={oil.id}>
                    <div className="oil-card__image-container">
                      <img src={oil.image} alt={`${oil.name} ${oil.year}`} className="oil-card__image" />
                      {oil.highlighted && (
                        <div className="oil-card__badge">Destaque</div>
                      )}
                    </div>
                    
                    <div className="oil-card__content">
                      <div className="oil-card__header">
                        <h2 className="oil-card__name">{oil.name}</h2>
                        <span className="oil-card__year">{oil.year}</span>
                      </div>
                      
                      <div className="oil-card__category">
                        <span className="oil-type-indicator" style={{
                          backgroundColor: 
                            oil.type.toLowerCase() === "intenso" ? "#4b6c22" : 
                            oil.type.toLowerCase() === "médio" ? "#7d9b4c" : 
                            "#c1d37f"
                        }}></span>
                        {oil.category}
                      </div>
                      
                      <p className="oil-card__description">{oil.briefDescription}</p>
                      
                      <div className="oil-card__footer">
                        <div className="oil-card__varieties">
                          <FaLeaf className="variety-icon" />
                          <span>{oil.varieties.slice(0, 2).join(", ")}{oil.varieties.length > 2 ? "..." : ""}</span>
                        </div>
                        
                        <div className="oil-card__price">{oil.price}</div>
                      </div>
                      
                      <div className="oil-card__cta">
                        <span>Ver Detalhes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {sortedOliveOils.length === 0 && (
                <div className="no-results">
                  <h3>Nenhum azeite encontrado</h3>
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

export default OliveOilPortfolioPage;