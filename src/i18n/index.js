import { useLocation } from "react-router-dom";
import { LANGS, getLangFromPath, stripLang, localizePath } from "./lang";

// As funções sem React estão em ./lang.js; aqui ficam a preferência guardada e o hook useLang
export { LANGS, getLangFromPath, stripLang, localizePath, localizeProduct, formatDecimal } from "./lang";

// Preferência guardada no navegador quando o visitante escolhe o idioma
const STORAGE_KEY = "cv-lang";

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
