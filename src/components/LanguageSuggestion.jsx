import { useState } from "react";
import { Link } from "react-router-dom";
import { getStoredLang, localizePath, storeLang, useLang } from "../i18n";
import "../styles/LanguageSwitch.css";

const DISMISS_KEY = "cv-lang-banner";

// Mostrar só a quem tem o navegador noutra língua e ainda não escolheu nem fechou o aviso
const shouldSuggest = () => {
  try {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const prefersPortuguese = languages.some((l) => l?.toLowerCase().startsWith("pt"));
    return !prefersPortuguese && !getStoredLang() && localStorage.getItem(DISMISS_KEY) !== "1";
  } catch {
    return false;
  }
};

// Barra discreta (sempre em inglês) que sugere a versão inglesa nas páginas em português
function LanguageSuggestion() {
  const { lang, path } = useLang();
  const [visible, setVisible] = useState(shouldSuggest);

  if (lang !== "pt" || !visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // sem armazenamento: o aviso volta a aparecer na próxima visita
    }
    setVisible(false);
  };

  return (
    <aside className="lang-suggestion" lang="en" aria-label="Language">
      <p>This website is also available in English.</p>
      <Link
        to={localizePath(path, "en")}
        className="lang-suggestion__cta"
        hrefLang="en"
        onClick={() => {
          storeLang("en");
          setVisible(false);
        }}
        data-umami-event="idioma"
        data-umami-event-idioma="en"
        data-umami-event-origem="aviso"
      >
        View in English
      </Link>
      <button type="button" className="lang-suggestion__close" onClick={dismiss} aria-label="Close">
        ×
      </button>
    </aside>
  );
}

export default LanguageSuggestion;
