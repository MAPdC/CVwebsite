// Funções de idioma que não dependem do React (usadas também no build, em scripts/generate-pages.mjs).
// O português vive na raiz ("/contacts"), o inglês em "/en" ("/en/contacts").
export const LANGS = ["pt", "en"];
const EN_PREFIX = "/en";

export const getLangFromPath = (pathname) =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "pt";

// "/en/portfolio/wines" -> "/portfolio/wines"; "/en" -> "/"
export const stripLang = (pathname) =>
  getLangFromPath(pathname) === "en" ? pathname.slice(EN_PREFIX.length) || "/" : pathname;

// Caminho PT ("/contacts") -> caminho no idioma pedido
export const localizePath = (path, lang) => {
  if (lang !== "en") return path;
  return path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
};

// Grupos de campos que o bloco `en` pode traduzir só em parte (ex.: só technical.acidity):
// os campos que faltam vêm da versão PT, em vez de o grupo inteiro ser substituído.
const NESTED = ["technical", "nutritionDeclaration", "extraInfo", "datasheets"];

// Produto com os textos do idioma pedido (campos em `product.en` substituem os PT).
// trackingName mantém o nome PT nos eventos do Umami, para as estatísticas não se dividirem por idioma.
export const localizeProduct = (product, lang) => {
  if (!product || lang !== "en" || !product.en) return product;
  const localized = { ...product, ...product.en, trackingName: product.name };
  for (const key of NESTED) {
    if (product[key] && product.en[key]) localized[key] = { ...product[key], ...product.en[key] };
  }
  return localized;
};

// "13,5%" -> "13.5%" em inglês (separador decimal)
export const formatDecimal = (value, lang) =>
  lang === "en" && typeof value === "string" ? value.replace(/(\d),(\d)/g, "$1.$2") : value;
