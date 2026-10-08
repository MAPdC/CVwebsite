import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPackshotTransform } from "../utils/packshotTransform";
import { formatDecimal, useLang } from "../i18n";
import { COMMON } from "../i18n/common";
import ProductEnquiry from "./ProductEnquiry";

const TEXT = {
  pt: {
    comingSoon: "Em breve",
    appellation: "Denominação",
    vintage: "Colheita",
    type: "Tipo",
    variety: "Casta",
    varieties: "Castas",
    maturation: "Maturação",
    alcohol: "Teor alcoólico",
    acidity: "Acidez total",
    sugar: "Açúcares residuais",
    image: (n) => `imagem ${n}`,
    noImage: "Imagem não disponível",
    illustrative: "Imagem ilustrativa: o rótulo pode mostrar outra colheita.",
    gallery: "Imagens do vinho",
    viewImage: (n) => `Ver imagem ${n}`,
    breadcrumb: "Navegação",
    serveAt: "Servir a",
    theWine: "O Vinho",
    tasting: "Prova",
    tastingNotes: "Notas de prova",
    pairing: "Harmonização",
    notAvailable: "Informação não disponível.",
    techSheet: "Ficha Técnica",
    download: "Descarregar ficha técnica",
    awards: "Distinções",
  },
  en: {
    comingSoon: "Soon",
    appellation: "Appellation",
    vintage: "Vintage",
    type: "Style",
    variety: "Grape variety",
    varieties: "Grape varieties",
    maturation: "Ageing",
    alcohol: "Alcohol",
    acidity: "Total acidity",
    sugar: "Residual sugar",
    image: (n) => `image ${n}`,
    noImage: "Image not available",
    illustrative: "Illustrative image: the label may show a different vintage.",
    gallery: "Wine images",
    viewImage: (n) => `View image ${n}`,
    breadcrumb: "Breadcrumb",
    serveAt: "Serve at",
    theWine: "The Wine",
    tasting: "Tasting",
    tastingNotes: "Tasting notes",
    pairing: "Food pairing",
    notAvailable: "Information not available.",
    techSheet: "Technical Sheet",
    download: "Download technical sheet",
    awards: "Awards",
  },
};

// Página de detalhe de um vinho (Casttêdo Valley e Camuflado).
// O aspeto vem das variáveis --wd-* (ver WineDetail.css); cada marca pode redefini-las num wrapper.
// heroAddon: conteúdo opcional por cima do título (ex.: animal Camuflado)
function WineProductDetail({ product, basePath = "/portfolio/wines", baseLabel, heroAddon = null }) {
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const common = COMMON[lang];

  // null = valor ainda por confirmar; vazio/undefined = não se aplica
  const techValue = (value) => (value === null ? text.comingSoon : formatDecimal(value, lang) || "—");
  const wineType = (type) => common.wineTypes[type] || type;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [packshotTransform, setPackshotTransform] = useState(null);
  const imageRef = useRef(null);

  const images = (product?.images || []).filter((url) => typeof url === "string" && url.trim() !== "");

  // Outro produto: volta à primeira imagem (o scroll para o topo é feito pelo ScrollToTop)
  const productKey = product?.slug;
  useEffect(() => {
    setActiveImageIndex(0);
    setPackshotTransform(null);
  }, [productKey]);

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

  // Valores analíticos ainda por confirmar (null) ficam fora da ficha até existirem
  const analysis = [
    [text.alcohol, product.technical?.alcohol],
    [text.acidity, product.technical?.acidity],
    [text.sugar, product.technical?.sugar],
    ["pH", product.technical?.ph],
  ]
    .filter(([, value]) => value !== null)
    .map(([label, value]) => [label, techValue(value)]);

  const specs = [
    [text.appellation, product.category],
    [text.vintage, product.year],
    [text.type, wineType(product.type)],
    [text.varieties, product.varieties?.join(", ")],
    product.maturation ? [text.maturation, product.maturation] : null,
    ...analysis,
  ].filter(Boolean);

  return (
    <div className="wd">
      <div className="wd-layout">
        {/* --- Garrafa / galeria (fixa em desktop) --- */}
        <aside className="wd-media">
          <div className={`wd-media__stage ${isPackshot ? "wd-media__stage--packshot" : "wd-media__stage--photo"}`}>
            {mainImage ? (
              <img
                key={mainImage}
                src={mainImage}
                alt={`${product.name}${isPackshot ? "" : ` — ${text.image(activeImageIndex + 1)}`}`}
                ref={imageRef}
                className="wd-media__image"
                onLoad={updatePackshot}
                style={isPackshot && packshotTransform ? { "--crop": packshotTransform } : undefined}
              />
            ) : (
              <span className="wd-media__placeholder">{text.noImage}</span>
            )}
          </div>

          {/* Fotos de uma colheita anterior (ver illustrativeImages em products.js) */}
          {product.illustrativeImages && mainImage && (
            <p className="wd-media__note">{text.illustrative}</p>
          )}

          {images.length > 1 && (
            <div className="wd-thumbs" role="tablist" aria-label={text.gallery}>
              {images.map((imageUrl, index) => (
                <button
                  type="button"
                  key={imageUrl}
                  className={`wd-thumb ${index === activeImageIndex ? "wd-thumb--active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={text.viewImage(index + 1)}
                  aria-selected={index === activeImageIndex}
                  role="tab"
                >
                  <img src={imageUrl} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* --- Conteúdo --- */}
        <article className="wd-content">
          <header className="wd-intro">
            <nav className="wd-breadcrumb" aria-label={text.breadcrumb}>
              <Link to={to("/")}>{common.nav.home}</Link>
              <span aria-hidden="true">·</span>
              <Link to={to(basePath)}>{baseLabel ?? common.nav.wines}</Link>
            </nav>

            {heroAddon}

            <p className="wd-eyebrow">
              {[product.category, wineType(product.type), product.year].filter(Boolean).join("  ·  ")}
            </p>
            <h1 className="wd-title">{product.name}</h1>
            <span className="wd-rule" aria-hidden="true" />

            {product.briefdescription && <p className="wd-lead">{product.briefdescription}</p>}

            <dl className="wd-facts">
              <div>
                <dt>{product.varieties?.length > 1 ? text.varieties : text.variety}</dt>
                <dd>{product.varieties?.join(", ")}</dd>
              </div>
              <div>
                <dt>{text.alcohol}</dt>
                <dd>{techValue(product.technical?.alcohol)}</dd>
              </div>
              <div>
                <dt>{text.serveAt}</dt>
                <dd>{product.temperatura || "—"}</dd>
              </div>
            </dl>
          </header>

          <section className="wd-section">
            <h2 className="wd-label">{text.theWine}</h2>
            {/* Parágrafos separados por uma linha em branco ("\n\n") no texto do produto */}
            {(product.description || "").split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="wd-story">{paragraph}</p>
            ))}
          </section>

          <section className="wd-section">
            <h2 className="wd-label">{text.tasting}</h2>
            <dl className="wd-notes">
              <div>
                <dt>{text.tastingNotes}</dt>
                <dd>{product.sensorial || text.notAvailable}</dd>
              </div>
              <div>
                <dt>{text.pairing}</dt>
                <dd>{product.consumo || text.notAvailable}</dd>
              </div>
              {product.maturation && (
                <div>
                  <dt>{text.maturation}</dt>
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
            <h2 className="wd-label">{text.techSheet}</h2>
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
                {text.download}
                {product.datasheets.pt && (
                  <a
                    href={product.datasheets.pt}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="ficha-tecnica"
                    data-umami-event-produto={product.trackingName ?? product.name}
                    data-umami-event-idioma="pt"
                  >PT</a>
                )}
                {product.datasheets.en && (
                  <a
                    href={product.datasheets.en}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="ficha-tecnica"
                    data-umami-event-produto={product.trackingName ?? product.name}
                    data-umami-event-idioma="en"
                  >EN</a>
                )}
              </p>
            )}
          </section>

          {product.awards && product.awards.length > 0 && (
            <section className="wd-section">
              <h2 className="wd-label">{text.awards}</h2>
              <ul className="wd-awards">
                {product.awards.map((award, index) => (
                  <li key={index} className="wd-award">
                    {award[1] && <img src={award[1]} alt="" className="wd-award__medal" />}
                    <div>
                      <span className="wd-award__name">{award[2]}</span>
                      {award[3] && <span className="wd-award__points">{award[3]} {common.points}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ProductEnquiry product={product} name={baseLabel ? `${baseLabel} ${product.name}` : product.name} />
        </article>
      </div>
    </div>
  );
}

export default WineProductDetail;
