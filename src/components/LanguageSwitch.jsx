import { Link, useLocation } from "react-router-dom";
import { LANGS, localizePath, storeLang, useLang } from "../i18n";
import { COMMON } from "../i18n/common";

// Seletor PT | EN: leva à mesma página no outro idioma e memoriza a escolha
function LanguageSwitch({ className = "", onSelect }) {
  const { lang, path } = useLang();
  const { search, hash } = useLocation();

  return (
    <nav className={`lang-switch ${className}`} aria-label={COMMON[lang].language}>
      {LANGS.map((code, i) => (
        <span key={code} className="lang-switch__item">
          {i > 0 && <span className="lang-switch__sep" aria-hidden="true">|</span>}
          {code === lang ? (
            <span className="lang-switch__link lang-switch__link--active" aria-current="true">
              {code.toUpperCase()}
            </span>
          ) : (
            <Link
              to={`${localizePath(path, code)}${search}${hash}`}
              className="lang-switch__link"
              hrefLang={code}
              lang={code}
              onClick={() => {
                storeLang(code);
                onSelect?.();
              }}
              data-umami-event="idioma"
              data-umami-event-idioma={code}
            >
              {code.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export default LanguageSwitch;
