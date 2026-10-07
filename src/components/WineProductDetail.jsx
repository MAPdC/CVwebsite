import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPackshotTransform } from "../utils/packshotTransform";
import "../styles/WineDetail.css";

// null = valor ainda por confirmar; vazio/undefined = não se aplica
const techValue = (value) => (value === null ? "Em breve" : value || "—");

// Página de detalhe de um vinho (Casttêdo Valley e Camuflado).
// O aspeto vem das variáveis --wd-* (ver WineDetail.css); cada marca pode redefini-las num wrapper.
// heroAddon: conteúdo opcional por cima do título (ex.: animal Camuflado)
function WineProductDetail({ product, basePath = "/portfolio/wines", baseLabel = "Vinhos", heroAddon = null }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [packshotTransform, setPackshotTransform] = useState(null);
  const imageRef = useRef(null);

  const images = (product?.images || []).filter((url) => typeof url === "string" && url.trim() !== "");

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setPackshotTransform(null);
  }, [product]);

  // Zoom da garrafa (só na primeira imagem); recalculado quando a janela muda de tamanho
  const updatePackshot = () => {
    const img = imageRef.current;
    if (activeImageIndex !== 0 || !img || !img.complete) return;
    try {
      setPackshotTransform(getPackshotTransform(img));
    } catch {
      setPackshotTransform(null); // sem acesso aos píxeis: mostra a imagem tal como está
    }
  };

  useEffect(() => {
    updatePackshot(); // imagem já em cache: o onLoad pode ter disparado antes
    window.addEventListener("resize", updatePackshot);
    return () => window.removeEventListener("resize", updatePackshot);
  }, [activeImageIndex, product]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) {
    return (
      <div className="new-product-loading">
        <div className="elegant-loader"></div>
      </div>
    );
  }

  // A primeira imagem é a garrafa (packshot); as restantes são fotografias de ambiente
  const isPackshot = activeImageIndex === 0;
  const mainImage = images[activeImageIndex];

  const specs = [
    ["Denominação", product.category],
    ["Colheita", product.year],
    ["Tipo", product.type],
    ["Castas", product.varieties?.join(", ")],
    product.maturation ? ["Maturação", product.maturation] : null,
    ["Teor alcoólico", techValue(product.technical?.alcohol)],
    ["Acidez total", techValue(product.technical?.acidity)],
    ["Açúcares residuais", techValue(product.technical?.sugar)],
    ["pH", techValue(product.technical?.ph)],
  ].filter(Boolean);

  return (
    <main className="wd">
      <div className="wd-layout">
        {/* --- Garrafa / galeria (fixa em desktop) --- */}
        <aside className="wd-media">
          <div className={`wd-media__stage ${isPackshot ? "wd-media__stage--packshot" : "wd-media__stage--photo"}`}>
            {mainImage ? (
              <img
                key={mainImage}
                src={mainImage}
                alt={`${product.name}${isPackshot ? "" : ` — imagem ${activeImageIndex + 1}`}`}
                ref={imageRef}
                className="wd-media__image"
                onLoad={updatePackshot}
                style={isPackshot && packshotTransform ? { "--crop": packshotTransform } : undefined}
              />
            ) : (
              <span className="wd-media__placeholder">Imagem não disponível</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="wd-thumbs" role="tablist" aria-label="Imagens do vinho">
              {images.map((imageUrl, index) => (
                <button
                  type="button"
                  key={imageUrl}
                  className={`wd-thumb ${index === activeImageIndex ? "wd-thumb--active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                  aria-selected={index === activeImageIndex}
                  role="tab"
                >
                  <img src={imageUrl} alt="" />
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* --- Conteúdo --- */}
        <article className="wd-content">
          <header className="wd-intro">
            <nav className="wd-breadcrumb" aria-label="Navegação">
              <Link to="/">Início</Link>
              <span aria-hidden="true">·</span>
              <Link to={basePath}>{baseLabel}</Link>
            </nav>

            {heroAddon}

            <p className="wd-eyebrow">
              {[product.category, product.type, product.year].filter(Boolean).join("  ·  ")}
            </p>
            <h1 className="wd-title">{product.name}</h1>
            <span className="wd-rule" aria-hidden="true" />

            {product.briefdescription && <p className="wd-lead">{product.briefdescription}</p>}

            <dl className="wd-facts">
              <div>
                <dt>{product.varieties?.length > 1 ? "Castas" : "Casta"}</dt>
                <dd>{product.varieties?.join(", ")}</dd>
              </div>
              <div>
                <dt>Teor alcoólico</dt>
                <dd>{techValue(product.technical?.alcohol)}</dd>
              </div>
              <div>
                <dt>Servir a</dt>
                <dd>{product.temperatura || "—"}</dd>
              </div>
            </dl>
          </header>

          <section className="wd-section">
            <h2 className="wd-label">O Vinho</h2>
            {/* Parágrafos separados por uma linha em branco ("\n\n") no texto do produto */}
            {(product.description || "").split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="wd-story">{paragraph}</p>
            ))}
          </section>

          <section className="wd-section">
            <h2 className="wd-label">Prova</h2>
            <dl className="wd-notes">
              <div>
                <dt>Notas de prova</dt>
                <dd>{product.sensorial || "Informação não disponível."}</dd>
              </div>
              <div>
                <dt>Harmonização</dt>
                <dd>{product.consumo || "Informação não disponível."}</dd>
              </div>
              {product.maturation && (
                <div>
                  <dt>Maturação</dt>
                  <dd>{product.maturation}</dd>
                </div>
              )}
            </dl>
          </section>

          {product.presentation && (
            <section className="wd-section">
              <blockquote className="wd-quote">{product.presentation}</blockquote>
            </section>
          )}

          <section className="wd-section">
            <h2 className="wd-label">Ficha Técnica</h2>
            <dl className="wd-specs">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            {product.datasheets && (
              <p className="wd-downloads">
                Descarregar ficha técnica
                {product.datasheets.pt && (
                  <a href={product.datasheets.pt} target="_blank" rel="noopener noreferrer">PT</a>
                )}
                {product.datasheets.en && (
                  <a href={product.datasheets.en} target="_blank" rel="noopener noreferrer">EN</a>
                )}
              </p>
            )}
          </section>

          {product.awards && product.awards.length > 0 && (
            <section className="wd-section">
              <h2 className="wd-label">Distinções</h2>
              <ul className="wd-awards">
                {product.awards.map((award, index) => (
                  <li key={index} className="wd-award">
                    {award[1] && <img src={award[1]} alt="" className="wd-award__medal" />}
                    <div>
                      <span className="wd-award__name">{award[2]}</span>
                      {award[3] && <span className="wd-award__points">{award[3]} pontos</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}

export default WineProductDetail;
