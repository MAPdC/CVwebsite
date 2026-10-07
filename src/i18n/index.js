import { useLocation } from "react-router-dom";

// Idiomas do site. O português vive na raiz ("/contacts"), o inglês em "/en" ("/en/contacts").
export const LANGS = ["pt", "en"];
const EN_PREFIX = "/en";

// Preferência guardada no navegador quando o visitante escolhe o idioma
const STORAGE_KEY = "cv-lang";

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

export const getStoredLang = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
};

export const storeLang = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // navegação privada / armazenamento bloqueado: a escolha só não fica memorizada
  }
};

// Idioma atual (vem do URL) e ajudas para links
export function useLang() {
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);
  return {
    lang,
    path: stripLang(pathname), // caminho sem o prefixo de idioma
    to: (path) => localizePath(path, lang),
  };
}

// Produto com os textos do idioma pedido (campos em `product.en` substituem os PT).
// trackingName mantém o nome PT nos eventos do Umami, para as estatísticas não se dividirem por idioma.
export const localizeProduct = (product, lang) =>
  product && lang === "en" && product.en
    ? { ...product, ...product.en, trackingName: product.name }
    : product;

// "13,5%" -> "13.5%" em inglês (separador decimal)
export const formatDecimal = (value, lang) =>
  lang === "en" && typeof value === "string" ? value.replace(/(\d),(\d)/g, "$1.$2") : value;
