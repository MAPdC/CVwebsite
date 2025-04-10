import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ProductDetail.css";

// Componentes
import RelatedProducts from "../components/RelatedProducts";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("caracteristicas");

  useEffect(() => {
    // Simulação de carregamento de dados - substituir pelo fetch real
    const fetchProduct = async () => {
      setLoading(true);
      
      // Exemplo - substituir por API real
      const mockProduct = {
        id: productId,
        name: "Reserva Especial 2020",
        type: "vinho", // ou "azeite"
        category: "Douro DOC",
        description: "Um vinho de excelência que reflete a riqueza do terroir do Douro. Envelhecido em barricas de carvalho francês durante 18 meses, este vinho apresenta uma complexidade única e um final de boca persistente.",
        images: [
          "/images/vinho-principal.jpg",
          "/images/vinho-garrafa.jpg",
          "/images/vinho-detalhe.jpg"
        ],
        price: "45,00€",
        varieties: ["Touriga Nacional (40%)", "Touriga Franca (30%)", "Tinta Roriz (30%)"],
        sensorial: {
          visual: "Rubi profundo com reflexos violáceos",
          aroma: "Frutos vermelhos maduros, notas de especiarias e um toque balsâmico",
          paladar: "Encorpado, com taninos presentes mas sedosos. Final longo com notas de chocolate negro"
        },
        consumo: "Ideal para acompanhar carnes vermelhas, caça e queijos curados",
        temperatura: "16-18°C",
        technical: {
          alcohol: "14.5%",
          acidity: "5.3 g/L",
          sugar: "0.7 g/L",
          ph: "3.65"
        },
        awards: ["Medalha de Ouro - Concurso Mundial 2023", "92 pontos - Revista Wine Spectator"]
      };
      
      setProduct(mockProduct);
      setLoading(false);
      
      // Scroll to top when page loads
      window.scrollTo(0, 0);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <>
        {/*<Header />*/}
        <div className="loading-container">
          <div className="elegant-loader"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {/*<Header />*/}
      
      <main className="product-detail">
        <div className="product-detail__hero">
          <div className="product-detail__breadcrumb">
            <Link to="/">Início</Link> / 
            <Link to={`/portfolio/${product.type === "vinho" ? "wines" : "olive-oils"}`}>
              {product.type === "vinho" ? "Vinhos" : "Azeites"}
            </Link> / 
            <span>{product.name}</span>
          </div>
          
          <h1 className="product-detail__title">{product.name}</h1>
          <div className="product-detail__category">{product.category}</div>
        </div>
        
        <section className="product-detail__content">
          <div className="product-detail__gallery">
            <div className="gallery__main">
              <img src={product.images[0]} alt={product.name} />
            </div>
            
            <div className="gallery__thumbnails">
              {product.images.map((image, index) => (
                <div className="thumbnail" key={index}>
                  <img src={image} alt={`${product.name} - vista ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-detail__info">
            <div className="product-info__price">{product.price}</div>
            
            <div className="product-info__description">
              <p>{product.description}</p>
            </div>
            
            <div className="product-info__tabs">
              <div className="tabs__header">
                <button 
                  className={`tab-button ${activeTab === "caracteristicas" ? "active" : ""}`}
                  onClick={() => setActiveTab("caracteristicas")}
                >
                  Características
                </button>
                <button 
                  className={`tab-button ${activeTab === "tecnico" ? "active" : ""}`}
                  onClick={() => setActiveTab("tecnico")}
                >
                  Detalhes Técnicos
                </button>
                <button 
                  className={`tab-button ${activeTab === "premios" ? "active" : ""}`}
                  onClick={() => setActiveTab("premios")}
                >
                  Prémios
                </button>
              </div>
              
              <div className="tabs__content">
                {activeTab === "caracteristicas" && (
                  <div className="tab-content">
                    <div className="content-section">
                      <h3>Castas</h3>
                      <ul className="varieties-list">
                        {product.varieties.map((variety, index) => (
                          <li key={index}>{variety}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="content-section">
                      <h3>Características Sensoriais</h3>
                      
                      <div className="sensorial-item">
                        <h4>Visual</h4>
                        <p>{product.sensorial.visual}</p>
                      </div>
                      
                      <div className="sensorial-item">
                        <h4>Aroma</h4>
                        <p>{product.sensorial.aroma}</p>
                      </div>
                      
                      <div className="sensorial-item">
                        <h4>Paladar</h4>
                        <p>{product.sensorial.paladar}</p>
                      </div>
                    </div>
                    
                    <div className="content-section">
                      <h3>Sugestão de Consumo</h3>
                      <p>{product.consumo}</p>
                    </div>
                    
                    <div className="content-section temperature">
                      <h3>Temperatura Recomendada</h3>
                      <div className="temperature-display">
                        <span className="temperature-icon">🌡️</span>
                        <span className="temperature-value">{product.temperatura}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "tecnico" && (
                  <div className="tab-content">
                    <div className="technical-specs">
                      <div className="tech-item">
                        <span className="tech-label">Teor Alcoólico</span>
                        <span className="tech-value">{product.technical.alcohol}</span>
                      </div>
                      
                      <div className="tech-item">
                        <span className="tech-label">Acidez Total</span>
                        <span className="tech-value">{product.technical.acidity}</span>
                      </div>
                      
                      <div className="tech-item">
                        <span className="tech-label">Açúcares Residuais</span>
                        <span className="tech-value">{product.technical.sugar}</span>
                      </div>
                      
                      <div className="tech-item">
                        <span className="tech-label">pH</span>
                        <span className="tech-value">{product.technical.ph}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "premios" && (
                  <div className="tab-content">
                    <ul className="awards-list">
                      {product.awards.map((award, index) => (
                        <li key={index} className="award-item">
                          <span className="award-medal">🏅</span>
                          <span className="award-text">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="related-products">
          <h2 className="section-title">Outras Sugestões</h2>
          <RelatedProducts currentProductId={productId} productType={product.type} />
        </section>
      </main>
      
    </>
  );
}

export default ProductDetail;