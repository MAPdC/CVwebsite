import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/WineProductDetail.css";

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
      } else {
        setMainImage(null);
        setThumbnailImages([]);
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
    return <div className="loading-container"><div className="elegant-loader"></div></div>;
  }

  return (
    <>
      <main className="product-detail">
        <div className="product-detail__hero">
          <div className="product-detail__breadcrumb">
            <Link to="/">Início</Link> / 
            <Link to={"/portfolio/wines"}>Vinhos</Link> / 
            <span>{product.name}</span>
          </div>
          
          <h1 className="product-detail__title">{product.name}</h1>
          <div className="product-detail__category">{product.category}</div>
        </div>
        
        <section className="product-detail__content">
          <div className="product-detail__gallery">
            <div className="gallery__main">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={`${product.name} - imagem principal`}
                />
              ) : (
                <div className="image-placeholder">
                  <span>Imagem não disponível</span>
                </div>
              )}
            </div>
            
            <div className="gallery__thumbnails">
              {thumbnailImages.map((imageUrl, index) => (
                <div 
                  className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                  key={index}
                  onClick={() => changeMainImage(index)}
                >
                  <img 
                    src={imageUrl}
                    alt={`${product.name} - miniatura ${index + 1}`}
                  />
                </div>
              ))}
              
              {thumbnailImages.length === 0 && (
                <div className="thumbnail">
                  <div className="thumbnail-placeholder">
                    <span>Sem imagens</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="product-detail__info">
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
                      <p>{product.sensorial}</p>
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
      </main>
    </>
  );
}

export default WineProductDetail;