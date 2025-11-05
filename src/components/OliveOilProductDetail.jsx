import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Leaf, Info, Utensils, Microscope, HeartPulse, Box } from "lucide-react";
import "../styles/OliveOilProductDetail.css";

function OliveOilProductDetail({ product }) {
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
  
  // Helper para renderizar a declaração nutricional
  const renderNutrition = (nutrition) => {
    if (!nutrition) return <p>Informação nutricional não disponível.</p>;

    const translations = {
      energy: "Energia",
      fat: "Lípidos",
      saturatedFat: "dos quais Saturados",
      carbohydrates: "Hidratos de Carbono",
      sugars: "dos quais Açúcares",
      protein: "Proteínas",
      salt: "Sal"
    };

    const displayOrder = ['energy', 'fat', 'saturatedFat', 'carbohydrates', 'sugars', 'protein', 'salt'];

    return (
      <ul className="nutrition-list">
        {displayOrder.map(key => {
          if (nutrition.hasOwnProperty(key) && translations[key]) {
            const label = translations[key];
            const value = nutrition[key];
            const isSubItem = key === 'saturatedFat' || key === 'sugars';
            return (
              <li key={key} className={isSubItem ? 'sub-item' : ''}>
                <span>{label}</span>
                <span>{value}</span>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  // Helper para renderizar informações extras
  const renderExtraInfo = (extra) => {
    if (!extra) return <p>Sem informações adicionais.</p>;
    return (
      <ul className="extra-info-list">
        {extra.store && <li><strong>Conservação:</strong> {extra.store}</li>}
        {extra.available && <li><strong>Disponibilidade:</strong> {extra.available}</li>}
      </ul>
    );
  };
  
  // Verifica se o produto está disponível
  if (!product) {
    return (
      <div className="new-oil-loading">
        <div className="elegant-loader"></div>
      </div>
    );
  }

  return (
    <main className="new-oil-detail">
      {/* --- Secção Hero --- */}
      <section className="new-oil-hero">
        <div className="new-oil-breadcrumb">
          <Link to="/">Início</Link> / 
          <Link to={"/portfolio/olive-oils"}>Azeites</Link> / 
          <span>{product.name.replace(/\|/g, '').trim()}</span>
        </div>
        <h1 className="new-oil-title">{product.name.replace(/\|/g, '').trim()}</h1>
        <div className="new-oil-category">{product.type || 'Azeite Virgem Extra'}</div>
        {/* Badges para Biológico e Colheita Tardia */}
        <div className="new-oil-badges">
          {product.organic && <span className="badge organic"><Leaf size={14}/> Biológico</span>}
          {product.lateHarvest && <span className="badge late-harvest">Colheita Tardia</span>}
        </div>
      </section>
      
      {/* --- Conteúdo Principal (Layout Flexível) --- */}
      <section className="new-oil-content">
        
        {/* --- Galeria de Imagens (Lado Esquerdo) --- */}
        <div className="new-oil-gallery">
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
        
        {/* --- Informações do Azeite (Lado Direito) --- */}
        <div className="new-oil-info">
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
              <button 
                className={`tab-button ${activeTab === "adicional" ? "active" : ""}`}
                onClick={() => setActiveTab("adicional")}
              >
                Info Nutricional
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
                    <h3><Leaf size={18} /> Variedades</h3>
                    <ul className="varieties-list">
                      {product.varieties.map((variety, index) => (
                        <li key={index}>{variety}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-section">
                    <h3><Info size={18} /> Notas Sensoriais</h3>
                    <p>{product.sensory || "Informação não disponível."}</p>
                  </div>
                  
                  <div className="content-section">
                    <h3><Utensils size={18} /> Harmonização</h3>
                    <p>{product.pairing || "Informação não disponível."}</p>
                  </div>
                </div>
              )}
              
              {/* -- Tab Detalhes Técnicos -- */}
              {activeTab === "tecnico" && (
                <div className="tab-panel">
                  <div className="technical-specs">
                    <div className="tech-item">
                      <span className="tech-label">Acidez</span>
                      <span className="tech-value">{product.technical.acidity || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">Índice de Peróxidos</span>
                      <span className="tech-value">{product.technical.peroxide || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">K232</span>
                      <span className="tech-value">{product.technical.k232 || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">K268 / ΔK</span>
                      <span className="tech-value">{product.technical.k268 || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* -- Tab Info Adicional -- */}
              {activeTab === "adicional" && (
                <div className="tab-panel">
                  {product.nutritionDeclaration && (
                    <div className="content-section">
                      <h3><HeartPulse size={18} /> Declaração Nutricional <span className="nutrition-note">(por 100ml)</span></h3>
                      {renderNutrition(product.nutritionDeclaration)}
                    </div>
                  )}
                  {product.extraInfo && (
                    <div className="content-section">
                      <h3><Box size={18} /> Outras Informações</h3>
                      {renderExtraInfo(product.extraInfo)}
                    </div>
                  )}
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

export default OliveOilProductDetail;