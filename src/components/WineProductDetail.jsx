import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Thermometer, Info, GlassWater, BookOpen, Star } from "lucide-react";

// Importar o novo CSS (caminho corrigido)
import "/src/styles/WineProductDetail.css";

function WineProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState("caracteristicas");
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Efeito para inicializar imagens e rolar para o topo
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (product && product.images && Array.isArray(product.images)) {
      const validImages = product.images.filter(url => typeof url === 'string' && url.trim() !== '');
      
      if (validImages.length > 0) {
        setMainImage(validImages[0]);
        setThumbnailImages(validImages);
        setActiveImageIndex(0);
      } else {
        setMainImage(null);
        setThumbnailImages([]);
        setActiveImageIndex(0);
      }
    }
  }, [product]);
  
  // Função para trocar a imagem principal
  const changeMainImage = (index) => {
    if (thumbnailImages[index]) {
      setMainImage(thumbnailImages[index]);
      setActiveImageIndex(index);
    }
  };
  
  // Verifica se o produto está disponível
  if (!product) {
    return (
      <div className="new-product-loading">
        <div className="elegant-loader"></div>
      </div>
    );
  }

  return (
    <main className="new-wine-detail">
      {/* --- Secção Hero --- */}
      <section className="new-wine-hero">
        <div className="new-wine-breadcrumb">
          <Link to="/">Início</Link> / 
          <Link to={"/portfolio/wines"}>Vinhos</Link> / 
          <span>{product.name}</span>
        </div>
        <h1 className="new-wine-title">{product.name}</h1>
        <div className="new-wine-category">{product.category}</div>
      </section>
      
      {/* --- Conteúdo Principal (Layout Flexível) --- */}
      <section className="new-wine-content">
        
        {/* --- Galeria de Imagens (Lado Esquerdo) --- */}
        <div className="new-wine-gallery">
          <div className="gallery-main-container">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={`${product.name} - imagem principal`}
                className="gallery-main-image"
              />
            ) : (
              <div className="image-placeholder">
                <span>Imagem não disponível</span>
              </div>
            )}
          </div>
          
          <div className="gallery-thumbnails">
            {thumbnailImages.map((imageUrl, index) => (
              <div 
                className={`thumbnail-item ${index === activeImageIndex ? 'active' : ''}`}
                key={index}
                onClick={() => changeMainImage(index)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && changeMainImage(index)}
                tabIndex={0}
                role="button"
                aria-label={`Ver imagem ${index + 1}`}
              >
                <img 
                  src={imageUrl}
                  alt={`${product.name} - miniatura ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* --- Informações do Vinho (Lado Direito) --- */}
        <div className="new-wine-info">
          <div className="info-description">
            <p>{product.description}</p>
          </div>
          
          <div className="info-tabs">
            <div className="tabs-header">
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
              {product.awards && product.awards.length > 0 && (
                <button 
                  className={`tab-button ${activeTab === "premios" ? "active" : ""}`}
                  onClick={() => setActiveTab("premios")}
                >
                  Prémios
                </button>
              )}
            </div>
            
            <div className="tabs-content">
              {/* -- Tab Características -- */}
              {activeTab === "caracteristicas" && (
                <div className="tab-panel">
                  <div className="content-section">
                    <h3><BookOpen size={18} /> Castas</h3>
                    <ul className="varieties-list">
                      {product.varieties.map((variety, index) => (
                        <li key={index}>{variety}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-section">
                    <h3><Info size={18} /> Características Sensoriais</h3>
                    <p>{product.sensorial || "Informação não disponível."}</p>
                  </div>
                  
                  <div className="content-section">
                    <h3><GlassWater size={18} /> Sugestão de Consumo</h3>
                    <p>{product.consumo || "Informação não disponível."}</p>
                  </div>
                  
                  <div className="content-section temperature">
                    <h3><Thermometer size={18} /> Temperatura Recomendada</h3>
                    <div className="temperature-display">
                      <span className="temperature-value">{product.temperatura || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* -- Tab Detalhes Técnicos -- */}
              {activeTab === "tecnico" && (
                <div className="tab-panel">
                  <div className="technical-specs">
                    <div className="tech-item">
                      <span className="tech-label">Teor Alcoólico</span>
                      <span className="tech-value">{product.technical.alcohol || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">Acidez Total</span>
                      <span className="tech-value">{product.technical.acidity || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">Açúcares Residuais</span>
                      <span className="tech-value">{product.technical.sugar || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">pH</span>
                      <span className="tech-value">{product.technical.ph || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* -- Tab Prémios -- */}
              {activeTab === "premios" && (
                <div className="tab-panel">
                  <ul className="awards-list">
                    {product.awards.map((award, index) => (
                      <li key={index} className="award-item">
                        <Award size={20} className="award-icon" />
                        <div className="award-details">
                          <span className="award-text">{award[2]}</span>
                          {award[3] && <span className="award-points">({award[3]} pts)</span>}
                        </div>
                        {award[1] && (
                          <img 
                            src={award[1]} 
                            alt="Medalha" 
                            className="award-medal-image"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WineProductDetail;