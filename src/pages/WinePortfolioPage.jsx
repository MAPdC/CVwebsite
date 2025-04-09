import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Header from "../components/Header";
//import Footer from "../components/Footer";
import "../styles/WinePortfolioPage.css";

// Ícones para elementos visuais
import { FaWineGlassAlt, FaSearch } from "react-icons/fa";

function WinePortfolioPage() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simula busca de vinhos da API
    const fetchWines = async () => {
      setLoading(true);
      
      // Mock data - substituir por chamada de API real
      const mockWines = [
        {
          id: "reserva-especial-2020",
          name: "Reserva Especial",
          year: "2020",
          type: "Tinto",
          category: "Douro DOC",
          briefDescription: "Um vinho elegante com notas de frutos vermelhos e um toque de madeira.",
          varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz"],
          image: "/images/vinho-1.jpg",
          price: "45,00€",
          highlighted: true
        },
        {
          id: "grande-reserva-2019",
          name: "Grande Reserva",
          year: "2019",
          type: "Tinto",
          category: "Douro DOC",
          briefDescription: "Complexo e estruturado, com taninos aveludados e final persistente.",
          varieties: ["Touriga Nacional", "Touriga Franca"],
          image: "/images/vinho-2.jpg",
          price: "65,00€",
          highlighted: true
        },
        {
          id: "colheita-seleccionada-2021",
          name: "Colheita Seleccionada",
          year: "2021",
          type: "Branco",
          category: "Douro DOC",
          briefDescription: "Aroma a frutas tropicais com notas minerais e frescura vibrante.",
          varieties: ["Arinto", "Viosinho"],
          image: "/images/vinho-3.jpg",
          price: "28,00€",
          highlighted: false
        },
        {
          id: "vinhas-velhas-2018",
          name: "Vinhas Velhas",
          year: "2018",
          type: "Tinto",
          category: "Douro DOC",
          briefDescription: "Intenso e concentrado, produzido a partir de vinhas com mais de 80 anos.",
          varieties: ["Field Blend"],
          image: "/images/vinho-4.jpg",
          price: "55,00€",
          highlighted: false
        },
        {
          id: "rose-tradicional-2022",
          name: "Rosé Tradicional",
          year: "2022",
          type: "Rosé",
          category: "Douro DOC",
          briefDescription: "Delicado e refrescante, com aromas de frutas vermelhas e final seco.",
          varieties: ["Touriga Nacional", "Tinta Roriz"],
          image: "/images/vinho-5.jpg",
          price: "22,00€",
          highlighted: false
        },
        {
          id: "reserva-branco-2021",
          name: "Reserva Branco",
          year: "2021",
          type: "Branco",
          category: "Douro DOC",
          briefDescription: "Encorpado e complexo, envelhecido em barrica, com notas cítricas e minerais.",
          varieties: ["Arinto", "Gouveio", "Viosinho"],
          image: "/images/vinho-6.jpg",
          price: "38,00€",
          highlighted: true
        }
      ];
      
      // Adicionar um pequeno delay para simular carregamento
      setTimeout(() => {
        setWines(mockWines);
        setLoading(false);
      }, 600);
    };

    fetchWines();
    
    // Scroll para o topo ao carregar
    window.scrollTo(0, 0);
  }, []);

  // Filtrar vinhos baseado no tipo e termo de busca
  const filteredWines = wines.filter(wine => {
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
        <div className="catalog-hero">
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
                  <Link to={`/product/${wine.id}`} className="wine-card" key={wine.id}>
                    <div className="wine-card__image-container">
                      <img src={wine.image} alt={`${wine.name} ${wine.year}`} className="wine-card__image" />
                      {wine.highlighted && (
                        <div className="wine-card__badge">Destaque</div>
                      )}
                    </div>
                    
                    <div className="wine-card__content">
                      <div className="wine-card__header">
                        <h2 className="wine-card__name">{wine.name}</h2>
                        <span className="wine-card__year">{wine.year}</span>
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