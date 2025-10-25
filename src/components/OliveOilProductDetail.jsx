// src/components/OliveOilProductDetail.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Importar o CSS específico para o detalhe do azeite
import "../styles/OliveOilProductDetail.css";

// Ícones (pode ajustar conforme necessário)
import { Leaf, Droplets, Info, Utensils, HeartPulse, Microscope, CircleAlert, Box } from 'lucide-react';

function OliveOilProductDetail({ product }) {
  // Estado para a tab ativa, inicializado com 'caracteristicas'
  const [activeTab, setActiveTab] = useState("caracteristicas");
  // Estado para a imagem principal exibida
  const [mainImage, setMainImage] = useState(null);
  // Estado para a lista de URLs das miniaturas
  const [thumbnailImages, setThumbnailImages] = useState([]);
  // Estado para o índice da imagem ativa (para destacar a miniatura)
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Efeito para inicializar as imagens e rolar a página para o topo quando o produto muda
  useEffect(() => {
    window.scrollTo(0, 0); // Garante que a página começa no topo

    // Verifica se o produto e suas imagens são válidos
    if (product && product.images && Array.isArray(product.images)) {
      // Filtra URLs de imagem válidas (não vazias)
      const validImages = product.images.filter(url => typeof url === 'string' && url.trim() !== '');

      if (validImages.length > 0) {
        setMainImage(validImages[0]); // Define a primeira imagem válida como principal
        setThumbnailImages(validImages); // Define todas as imagens válidas como miniaturas
        setActiveImageIndex(0); // Reseta o índice ativo
      } else {
        // Caso não haja imagens válidas, limpa os estados
        setMainImage(null);
        setThumbnailImages([]);
        setActiveImageIndex(0);
      }
    } else {
      // Caso o produto ou imagens sejam inválidos
      setMainImage(null);
      setThumbnailImages([]);
      setActiveImageIndex(0);
    }
  }, [product]); // Re-executa o efeito quando o 'product' mudar

  // Função para mudar a imagem principal ao clicar numa miniatura
  const changeMainImage = (index) => {
    if (thumbnailImages[index]) {
      setMainImage(thumbnailImages[index]);
      setActiveImageIndex(index);
    }
  };

  // Se o produto ainda não carregou, exibe um loader
  if (!product) {
    return <div className="loading-container"><div className="elegant-loader"></div></div>;
  }

  // **** MODIFICAÇÃO AQUI ****
  // Helper para renderizar a declaração nutricional com traduções
  const renderNutrition = (nutrition) => {
    if (!nutrition) return <p>Informação nutricional não disponível.</p>;

    // Mapeamento das chaves para Português
    const translations = {
      energy: "Energia",
      fat: "Lípidos",
      saturatedFat: "dos quais Saturados",
      carbohydrates: "Hidratos de Carbono",
      sugars: "dos quais Açúcares",
      protein: "Proteínas",
      salt: "Sal"
    };

    // Ordem desejada para exibição
    const displayOrder = ['energy', 'fat', 'saturatedFat', 'carbohydrates', 'sugars', 'protein', 'salt'];

    return (
      <ul className="nutrition-list">
        {displayOrder.map(key => {
          // Verifica se a chave existe nos dados e tem tradução
          if (nutrition.hasOwnProperty(key) && translations[key]) {
            const label = translations[key];
            const value = nutrition[key];
            // Aplica indentação para "dos quais"
            const isSubItem = key === 'saturatedFat' || key === 'sugars';
            return (
              <li key={key} className={isSubItem ? 'sub-item' : ''}>
                <strong>{label}:</strong> {value}
              </li>
            );
          }
          return null; // Não renderiza se a chave não existir ou não tiver tradução
        })}
      </ul>
    );
  };
  // **** FIM DA MODIFICAÇÃO ****

   // Helper para renderizar informações extras
   const renderExtraInfo = (extra) => {
    if (!extra) return <p>Sem informações adicionais.</p>;
    return (
      <ul className="extra-info-list">
        {extra.store && <li><Box size={16} /> <strong>Conservação:</strong> {extra.store}</li>}
        {extra.available && <li><CircleAlert size={16} /> <strong>Disponibilidade:</strong> {extra.available}</li>}
      </ul>
    );
  };


  return (
    <>
      {/* Usar classes CSS com prefixo 'oil-detail__' */}
      <main className="oil-detail">
        {/* Secção Hero com Breadcrumbs e Título */}
        <div className="oil-detail__hero">
          <div className="oil-detail__breadcrumb">
            <Link to="/">Início</Link> /
            <Link to={"/portfolio/olive-oils"}>Azeites</Link> /
            {/* O nome pode precisar de limpeza (remover barras, etc.) */}
            <span>{product.name.replace(/\|/g, '').trim()}</span>
          </div>

          <h1 className="oil-detail__title">{product.name.replace(/\|/g, '').trim()}</h1>
          {/* Categoria pode ser mais específica se disponível nos dados */}
          <div className="oil-detail__category">{product.type || 'Azeite Virgem Extra'}</div>
           {/* Badges para Biológico e Colheita Tardia */}
           <div className="oil-detail__badges">
            {product.organic && <span className="badge organic"><Leaf size={12}/> Biológico</span>}
            {product.lateHarvest && <span className="badge late-harvest">Colheita Tardia</span>}
          </div>
        </div>

        {/* Conteúdo Principal: Galeria e Informações */}
        <section className="oil-detail__content">
          {/* Galeria de Imagens */}
          <div className="oil-detail__gallery">
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
                  // Acessibilidade: permite focar e ativar com teclado
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') changeMainImage(index); }}
                  role="button"
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <img
                    src={imageUrl}
                    alt={`${product.name} - miniatura ${index + 1}`}
                  />
                </div>
              ))}
              {/* Placeholder se não houver miniaturas */}
              {thumbnailImages.length === 0 && (
                <div className="thumbnail">
                  <div className="thumbnail-placeholder">
                    <span>Sem imagens</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Azeite (Descrição + Tabs) */}
          <div className="oil-detail__info">
            {/* Descrição Principal */}
            <div className="oil-info__description">
              <p>{product.description}</p>
            </div>

            {/* Sistema de Tabs */}
            <div className="oil-info__tabs">
              <div className="tabs__header">
                {/* Botão Tab: Características */}
                <button
                  className={`tab-button ${activeTab === "caracteristicas" ? "active" : ""}`}
                  onClick={() => setActiveTab("caracteristicas")}
                  aria-selected={activeTab === "caracteristicas"}
                  role="tab"
                >
                  Características
                </button>
                {/* Botão Tab: Detalhes Técnicos */}
                <button
                  className={`tab-button ${activeTab === "tecnico" ? "active" : ""}`}
                  onClick={() => setActiveTab("tecnico")}
                  aria-selected={activeTab === "tecnico"}
                  role="tab"
                >
                  Detalhes Técnicos
                </button>
                 {/* Botão Tab: Info Adicional */}
                 <button
                  className={`tab-button ${activeTab === "adicional" ? "active" : ""}`}
                  onClick={() => setActiveTab("adicional")}
                  aria-selected={activeTab === "adicional"}
                  role="tab"
                >
                  Info Adicional
                </button>
                {/* Prémios podem ser adicionados se existirem dados */}
                 {product.awards && product.awards.length > 0 && (
                   <button
                     className={`tab-button ${activeTab === "premios" ? "active" : ""}`}
                     onClick={() => setActiveTab("premios")}
                     aria-selected={activeTab === "premios"}
                      role="tab"
                   >
                     Prémios
                   </button>
                 )}
              </div>

              {/* Conteúdo das Tabs */}
              <div className="tabs__content" role="tabpanel">
                {/* Conteúdo Tab: Características */}
                {activeTab === "caracteristicas" && (
                  <div className="tab-content">
                    {/* Secção Variedades */}
                    <div className="content-section">
                      <h3><Leaf size={18} /> Variedades</h3>
                      <ul className="varieties-list">
                        {product.varieties.map((variety, index) => (
                          <li key={index}>{variety}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Secção Sensorial */}
                    {product.sensory && (
                      <div className="content-section">
                        <h3><Info size={18} /> Características Sensoriais</h3>
                        <p>{product.sensory}</p>
                      </div>
                    )}
                    {/* Secção Harmonização */}
                    {product.pairing && (
                      <div className="content-section">
                        <h3><Utensils size={18} /> Sugestão de Consumo</h3>
                        <p>{product.pairing}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Conteúdo Tab: Detalhes Técnicos */}
                {activeTab === "tecnico" && product.technical && (
                  <div className="tab-content">
                    <div className="technical-specs">
                      {/* Mapeia os detalhes técnicos */}
                      {Object.entries(product.technical).map(([key, value]) => {
                         // Converte a chave para um rótulo mais legível
                         let label = key.charAt(0).toUpperCase() + key.slice(1);
                         if (key === 'peroxide') label = 'Índice de Peróxidos';
                         if (key === 'k232') label = 'K232';
                         if (key === 'k268') label = 'K268 / ΔK'; // Ajustado
                         if (key === 'acidity') label = 'Acidez';
                         return (
                            <div className="tech-item" key={key}>
                              <span className="tech-label"><Microscope size={14} /> {label}</span>
                              <span className="tech-value">{value}</span>
                            </div>
                         );
                      })}
                    </div>
                  </div>
                )}

                {/* Conteúdo Tab: Info Adicional */}
                {activeTab === "adicional" && (
                    <div className="tab-content">
                        {/* Secção Declaração Nutricional */}
                        {product.nutritionDeclaration && (
                        <div className="content-section">
                            <h3><HeartPulse size={18} /> Declaração Nutricional <span className="nutrition-note">(por 100ml)</span></h3>
                            {renderNutrition(product.nutritionDeclaration)}
                        </div>
                        )}
                        {/* Secção Extra Info */}
                        {product.extraInfo && (
                        <div className="content-section">
                            <h3><Info size={18} /> Outras Informações</h3>
                             {renderExtraInfo(product.extraInfo)}
                        </div>
                        )}
                    </div>
                )}

                 {/* Conteúdo Tab: Prémios (se existirem) */}
                 {activeTab === "premios" && product.awards && product.awards.length > 0 && (
                   <div className="tab-content">
                     <ul className="awards-list">
                       {product.awards.map((awardData, index) => (
                         <li key={index} className="award-item">
                           {/* Assume que awardData é um array [logoUrl, medalUrl, description, points] */}
                           {awardData[1] && <img src={awardData[1]} alt="Medalha" className="award-medal-icon" />}
                           <span className="award-text">
                             {awardData[2]}
                             {awardData[3] && ` (${awardData[3]} pts)`}
                           </span>
                           {/* {awardData[0] && <img src={awardData[0]} alt="Logo Competição" className="award-competition-logo" />} */}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
              </div> {/* fim tabs__content */}
            </div> {/* fim oil-info__tabs */}
          </div> {/* fim oil-detail__info */}
        </section> {/* fim oil-detail__content */}
      </main>
    </>
  );
}

export default OliveOilProductDetail;