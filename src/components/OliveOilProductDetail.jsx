import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Leaf, Info, Utensils, Microscope, HeartPulse, Box } from "lucide-react";
import { formatDecimal, useLang } from "../i18n";
import { COMMON } from "../i18n/common";
import "../styles/OliveOilProductDetail.css";

const TEXT = {
  pt: {
    noNutrition: "Informação nutricional não disponível.",
    nutrition: {
      energy: "Energia",
      fat: "Lípidos",
      saturatedFat: "dos quais Saturados",
      carbohydrates: "Hidratos de Carbono",
      sugars: "dos quais Açúcares",
      protein: "Proteínas",
      salt: "Sal"
    },
    noExtra: "Sem informações adicionais.",
    storage: "Conservação:",
    availability: "Disponibilidade:",
    defaultType: "Azeite Virgem Extra",
    mainImage: "imagem principal",
    noImage: "Imagem não disponível",
    viewImage: (n) => `Ver imagem ${n}`,
    thumbnail: (n) => `miniatura ${n}`,
    tabs: { features: "Características", technical: "Detalhes Técnicos", nutrition: "Info Nutricional", awards: "Prémios" },
    varieties: "Variedades",
    sensory: "Notas Sensoriais",
    pairing: "Harmonização",
    notAvailable: "Informação não disponível.",
    acidity: "Acidez",
    peroxide: "Índice de Peróxidos",
    nutritionTitle: "Declaração Nutricional",
    per100: "(por 100ml)",
    otherInfo: "Outras Informações",
    medal: "Medalha",
  },
  en: {
    noNutrition: "Nutrition information not available.",
    nutrition: {
      energy: "Energy",
      fat: "Fat",
      saturatedFat: "of which saturates",
      carbohydrates: "Carbohydrate",
      sugars: "of which sugars",
      protein: "Protein",
      salt: "Salt"
    },
    noExtra: "No additional information.",
    storage: "Storage:",
    availability: "Availability:",
    defaultType: "Extra Virgin Olive Oil",
    mainImage: "main image",
    noImage: "Image not available",
    viewImage: (n) => `View image ${n}`,
    thumbnail: (n) => `thumbnail ${n}`,
    tabs: { features: "Profile", technical: "Technical Details", nutrition: "Nutrition", awards: "Awards" },
    varieties: "Olive Varieties",
    sensory: "Tasting Notes",
    pairing: "Food Pairing",
    notAvailable: "Information not available.",
    acidity: "Acidity",
    peroxide: "Peroxide Value",
    nutritionTitle: "Nutrition Declaration",
    per100: "(per 100 ml)",
    otherInfo: "Further Information",
    medal: "Medal",
  },
};

function OliveOilProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState("caracteristicas");
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const common = COMMON[lang];

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
    if (!nutrition) return <p>{text.noNutrition}</p>;

    const translations = text.nutrition;

    const displayOrder = ['energy', 'fat', 'saturatedFat', 'carbohydrates', 'sugars', 'protein', 'salt'];

    return (
      <ul className="nutrition-list">
        {displayOrder.map(key => {
          if (nutrition.hasOwnProperty(key) && translations[key]) {
            const label = translations[key];
            const value = formatDecimal(nutrition[key], lang);
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
    if (!extra) return <p>{text.noExtra}</p>;
    return (
      <ul className="extra-info-list">
        {extra.store && <li><strong>{text.storage}</strong> {extra.store}</li>}
        {extra.available && <li><strong>{text.availability}</strong> {extra.available}</li>}
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
          <Link to={to("/")}>{common.nav.home}</Link> / 
          <Link to={to("/portfolio/olive-oils")}>{common.nav.oliveOils}</Link> / 
          <span>{product.name.replace(/\|/g, '').trim()}</span>
        </div>
        <h1 className="new-oil-title">{product.name.replace(/\|/g, '').trim()}</h1>
        <div className="new-oil-category">{product.type || text.defaultType}</div>
        {/* Badges para Biológico e Colheita Tardia */}
        <div className="new-oil-badges">
          {product.organic && <span className="badge organic"><Leaf size={14}/> {common.badges.organic}</span>}
          {product.lateHarvest && <span className="badge late-harvest">{common.badges.lateHarvest}</span>}
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
                alt={`${product.name} - ${text.mainImage}`}
                className="gallery-main-image"
              />
            ) : (
              <div className="image-placeholder">
                <span>{text.noImage}</span>
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
                aria-label={text.viewImage(index + 1)}
              >
                <img 
                  src={imageUrl}
                  alt={`${product.name} - ${text.thumbnail(index + 1)}`}
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
                {text.tabs.features}
              </button>
              <button 
                className={`tab-button ${activeTab === "tecnico" ? "active" : ""}`}
                onClick={() => setActiveTab("tecnico")}
              >
                {text.tabs.technical}
              </button>
              <button 
                className={`tab-button ${activeTab === "adicional" ? "active" : ""}`}
                onClick={() => setActiveTab("adicional")}
              >
                {text.tabs.nutrition}
              </button>
              {product.awards && product.awards.length > 0 && (
                <button 
                  className={`tab-button ${activeTab === "premios" ? "active" : ""}`}
                  onClick={() => setActiveTab("premios")}
                >
                  {text.tabs.awards}
                </button>
              )}
            </div>
            
            <div className="tabs-content">
              {/* -- Tab Características -- */}
              {activeTab === "caracteristicas" && (
                <div className="tab-panel">
                  <div className="content-section">
                    <h3><Leaf size={18} /> {text.varieties}</h3>
                    <ul className="varieties-list">
                      {product.varieties.map((variety, index) => (
                        <li key={index}>{variety}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-section">
                    <h3><Info size={18} /> {text.sensory}</h3>
                    <p>{product.sensory || text.notAvailable}</p>
                  </div>
                  
                  <div className="content-section">
                    <h3><Utensils size={18} /> {text.pairing}</h3>
                    <p>{product.pairing || text.notAvailable}</p>
                  </div>
                </div>
              )}
              
              {/* -- Tab Detalhes Técnicos -- */}
              {activeTab === "tecnico" && (
                <div className="tab-panel">
                  <div className="technical-specs">
                    <div className="tech-item">
                      <span className="tech-label">{text.acidity}</span>
                      <span className="tech-value">{formatDecimal(product.technical.acidity, lang) || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">{text.peroxide}</span>
                      <span className="tech-value">{formatDecimal(product.technical.peroxide, lang) || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">K232</span>
                      <span className="tech-value">{formatDecimal(product.technical.k232, lang) || "N/A"}</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-label">K268 / ΔK</span>
                      <span className="tech-value">{formatDecimal(product.technical.k268, lang) || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* -- Tab Info Adicional -- */}
              {activeTab === "adicional" && (
                <div className="tab-panel">
                  {product.nutritionDeclaration && (
                    <div className="content-section">
                      <h3><HeartPulse size={18} /> {text.nutritionTitle} <span className="nutrition-note">{text.per100}</span></h3>
                      {renderNutrition(product.nutritionDeclaration)}
                    </div>
                  )}
                  {product.extraInfo && (
                    <div className="content-section">
                      <h3><Box size={18} /> {text.otherInfo}</h3>
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
                            alt={text.medal} 
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