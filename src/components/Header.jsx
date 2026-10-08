import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoBranco from "../assets/cv-logo-branco.webp";
import logoCobre from "../assets/cv-logo-castanho.webp";
import LanguageSwitch from "./LanguageSwitch";
import { useLang } from "../i18n";
import { COMMON } from "../i18n/common";

// Header do site. transparent: começa transparente por cima do hero e ganha fundo ao fazer scroll
function Header({ transparent = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const { pathname } = useLocation();
  const { lang, path, to } = useLang();
  const common = COMMON[lang];
  const text = common.nav;

  const solid = !transparent || isScrolled;
  const isHomePage = path === "/";
  const isCamuflado = path.startsWith("/camuflado");

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Ao mudar de página o menu fecha (acerto durante o render, sem efeito: https://react.dev/learn/you-might-not-need-an-effect)
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }

  // Menu aberto: foco no primeiro item; Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!isMenuOpen) return;
    navRef.current?.querySelector("a, button")?.focus();
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const headerClass = [
    "header",
    solid && "header--scrolled",
    isHomePage && "header--homepage",
    isCamuflado && "header--camuflado",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClass}>
      <Link to={to("/")} className="header__text" onClick={closeMenu}>
        <span className="logo__line1">CASTTÊDO</span>
        <span className="logo__line2">VALLEY</span>
      </Link>

      {/* Logótipo decorativo: o link de texto acima já leva à página inicial */}
      <Link
        to={to("/")}
        className={`logo__link ${isHomePage && !solid ? "logo__link--hidden" : ""}`}
        onClick={closeMenu}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={solid ? logoCobre : logoBranco} alt="" className="logo__image" />
      </Link>

      <div className="header__actions">
        <LanguageSwitch onSelect={closeMenu} />
        <button
          type="button"
          ref={menuButtonRef}
          className="menu-icon"
          aria-label={common.menu}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className={`menu-icon__line ${solid ? "menu-icon__line--scrolled" : ""}`} />
          ))}
        </button>
      </div>

      <nav
        id="site-nav"
        ref={navRef}
        className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}
        aria-label={common.mainNav}
        inert={!isMenuOpen}
      >
        <ul>
          <li className="dropdown">
            <button
              type="button"
              className="dropdown__toggle"
              aria-expanded={isDropdownOpen}
              aria-controls="nav-portfolio"
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              {text.portfolio}
            </button>
            <ul id="nav-portfolio" className={`dropdown__menu ${isDropdownOpen ? "dropdown__menu--open" : ""}`}>
              <li><Link to={to("/portfolio/wines")} onClick={closeMenu}>{text.wines}</Link></li>
              <li><Link to={to("/portfolio/olive-oils")} onClick={closeMenu}>{text.oliveOils}</Link></li>
              <li>
                <Link to={to("/camuflado")} className="nav-item-camuflado" onClick={closeMenu}>
                  {text.camuflado}
                </Link>
              </li>
            </ul>
          </li>
          <li><Link to={to("/contacts")} onClick={closeMenu}>{text.contacts}</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
