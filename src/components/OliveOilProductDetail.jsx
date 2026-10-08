import { Link } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import AwardList from "./AwardList";
import { formatDecimal, useLang } from "../i18n";
import { COMMON } from "../i18n/common";
import ProductEnquiry from "./ProductEnquiry";

const TEXT = {
  pt: {
    nutrition: {
      energy: "Energia",
      fat: "Lípidos",
      saturatedFat: "dos quais saturados",
      carbohydrates: "Hidratos de carbono",
      sugars: "dos quais açúcares",
      protein: "Proteínas",
      salt: "Sal",
    },
    category: "Categoria",
    defaultType: "Virgem Extra",
    varieties: "Variedades",
    acidity: "Acidez",
    peroxide: "Índice de peróxidos",
    image: (n) => `imagem ${n}`,
    noImage: "Imagem não disponível",
    gallery: "Imagens do azeite",
    viewImage: (n) => `Ver imagem ${n}`,
    breadcrumb: "Navegação",
    theOil: "O Azeite",
    tasting: "Prova",
    sensory: "Notas sensoriais",
    pairing: "Harmonização",
    notAvailable: "Informação não disponível.",
    analysis: "Análise",
    nutritionTitle: "Declaração Nutricional",
    per100: "por 100 ml",
    care: "Conservação",
    storage: "Conservar",
    format: "Formato",
    awards: "Distinções",
  },
  en: {
    nutrition: {
      energy: "Energy",
      fat: "Fat",
      saturatedFat: "of which saturates",
      carbohydrates: "Carbohydrate",
      sugars: "of which sugars",
      protein: "Protein",
      salt: "Salt",
    },
    category: "Category",
    defaultType: "Extra Virgin",
    varieties: "Olive varieties",
    acidity: "Acidity",
    peroxide: "Peroxide value",
    image: (n) => `image ${n}`,
    noImage: "Image not available",
    gallery: "Olive oil images",
    viewImage: (n) => `View image ${n}`,
    breadcrumb: "Breadcrumb",
    theOil: "The Olive Oil",
    tasting: "Tasting",
    sensory: "Tasting notes",
    pairing: "Food pairing",
    notAvailable: "Information not available.",
    analysis: "Analysis",
    nutritionTitle: "Nutrition Declaration",
    per100: "per 100 ml",
    care: "Storage",
    storage: "Keep",
    format: "Format",
    awards: "Awards",
  },
};

const NUTRITION_ORDER = ["energy", "fat", "saturatedFat", "carbohydrates", "sugars", "protein", "salt"];
const NUTRITION_SUB = ["saturatedFat", "sugars"];

// Página de detalhe de um azeite: mesmo layout da página dos vinhos (WineDetail.css),
// com o verde-oliva em OliveOilDetail.css e as secções próprias de um azeite.
function OliveOilProductDetail({ product }) {
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const common = COMMON[lang];

  if (!product) {
    return (
      <div className="new-product-loading">
        <div className="elegant-loader"></div>
      </div>
    );
  }


  // "Azeite Virgem Extra | Biológico & Colheita Tardia" → título antes da barra
  const [title] = product.name.split("|").map((part) => part.trim());
  const fullName = product.name.replace(/\s*\|\s*/g, " ");
  const type = product.type || text.defaultType;
  const value = (v) => formatDecimal(v, lang) || "—";

  const eyebrow = [
    product.organic && common.badges.organic,
    product.lateHarvest && common.badges.lateHarvest,
  ].filter(Boolean);

  const specs = [
    [text.category, type],
    [text.varieties, product.varieties?.join(", ")],
    [text.acidity, value(product.technical?.acidity)],
    [text.peroxide, value(product.technical?.peroxide)],
    ["K232", value(product.technical?.k232)],
    ["K268 / ΔK", value(product.technical?.k268)],
  ];

  const nutrition = product.nutritionDeclaration;
  const extra = product.extraInfo;

  return (
    <div className="wd oil-detail">
      <div className="wd-layout">
        {/* --- Garrafa / galeria (fixa em desktop) --- */}
        <ProductGallery images={product.images} alt={fullName} labels={text} resetKey={product.slug} />

        {/* --- Conteúdo --- */}
        <article className="wd-content">
          <header className="wd-intro">
            <nav className="wd-breadcrumb" aria-label={text.breadcrumb}>
              <Link to={to("/")}>{common.nav.home}</Link>
              <span aria-hidden="true">·</span>
              <Link to={to("/portfolio/olive-oils")}>{common.nav.oliveOils}</Link>
            </nav>

            {eyebrow.length > 0 && <p className="wd-eyebrow">{eyebrow.join("  ·  ")}</p>}
            <h1 className="wd-title">{title}</h1>
            <span className="wd-rule" aria-hidden="true" />

            {product.briefDescription && <p className="wd-lead">{product.briefDescription}</p>}

            <dl className="wd-facts">
              <div>
                <dt>{text.varieties}</dt>
                <dd>{product.varieties?.join(", ")}</dd>
              </div>
              <div>
                <dt>{text.acidity}</dt>
                <dd>{value(product.technical?.acidity)}</dd>
              </div>
              <div>
                <dt>{text.category}</dt>
                <dd>{type}</dd>
              </div>
            </dl>
          </header>

          <section className="wd-section">
            <h2 className="wd-label">{text.theOil}</h2>
            {(product.description || "").split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="wd-story">{paragraph}</p>
            ))}
          </section>

          <section className="wd-section">
            <h2 className="wd-label">{text.tasting}</h2>
            <dl className="wd-notes">
              <div>
                <dt>{text.sensory}</dt>
                <dd>{product.sensory || text.notAvailable}</dd>
              </div>
              <div>
                <dt>{text.pairing}</dt>
                <dd>{product.pairing || text.notAvailable}</dd>
              </div>
            </dl>
          </section>

          <section className="wd-section">
            <h2 className="wd-label">{text.analysis}</h2>
            <dl className="wd-specs">
              {specs.map(([label, specValue]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{specValue}</dd>
                </div>
              ))}
            </dl>
          </section>

          {nutrition && (
            <section className="wd-section">
              <h2 className="wd-label">
                {text.nutritionTitle}
                <span className="oil-detail__label-note">{text.per100}</span>
              </h2>
              <dl className="wd-specs">
                {NUTRITION_ORDER.filter((key) => nutrition[key] !== undefined).map((key) => (
                  <div key={key} className={NUTRITION_SUB.includes(key) ? "oil-detail__sub" : undefined}>
                    <dt>{text.nutrition[key]}</dt>
                    <dd>{formatDecimal(nutrition[key], lang)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {extra && (extra.store || extra.available) && (
            <section className="wd-section">
              <h2 className="wd-label">{text.care}</h2>
              <dl className="wd-notes">
                {extra.store && (
                  <div>
                    <dt>{text.storage}</dt>
                    <dd>{extra.store}</dd>
                  </div>
                )}
                {extra.available && (
                  <div>
                    <dt>{text.format}</dt>
                    <dd>{extra.available}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          <AwardList awards={product.awards} title={text.awards} />

          <ProductEnquiry product={product} name={fullName} kind="oil" />
        </article>
      </div>
    </div>
  );
}

export default OliveOilProductDetail;
