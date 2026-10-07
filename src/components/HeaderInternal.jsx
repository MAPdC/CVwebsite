import { useState } from "react";
import "../styles/Header.css";
import logoCobre from "../assets/cv-logo-castanho.webp";
import LanguageSwitch from "./LanguageSwitch";
import { useLang } from "../i18n";
import { COMMON } from "../i18n/common";

function HeaderInternal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { lang, path, to } = useLang();
  const text = COMMON[lang].nav;

  // Verificar se estamos no universo Camuflado
  const isCamuflado = path.startsWith('/camuflado');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`header header--scrolled ${isCamuflado ? "header--camuflado" : ""}`}>
      <a href={to("/")} className="header__text">
        <span className="logo__line1">CASTTÊDO</span>
        <span className="logo__line2">VALLEY</span>
      </a>
      
      <a href={to("/")} className="logo__link">
        <img 
          src={logoCobre}
          alt="CASTTÊDO VALLEY" 
          className="logo__image" 
        />
      </a>

      <div className="header__actions">
        <LanguageSwitch onSelect={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }} />
        <div className="menu-icon" onClick={toggleMenu} role="button" aria-label={COMMON[lang].menu}>
          <span className="menu-icon__line menu-icon__line--scrolled"></span>
          <span className="menu-icon__line menu-icon__line--scrolled"></span>
          <span className="menu-icon__line menu-icon__line--scrolled"></span>
        </div>
      </div>

      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>{text.portfolio}</a>
            <ul className={`dropdown__menu ${isDropdownOpen ? "dropdown__menu--open" : ""}`}>
              <li><a href={to("/portfolio/wines")}>{text.wines}</a></li>
              <li><a href={to("/portfolio/olive-oils")}>{text.oliveOils}</a></li>
              <li><a href={to("/camuflado")} className="nav-item-camuflado">{text.camuflado}</a></li>
            </ul>
          </li>
          {/* <li><a href="/about-us">SOBRE NÓS</a></li>
          <li><a href="/sustainability">SUSTENTABILIDADE</a></li>
          <li><a href="/history">HISTÓRIA</a></li>
          */}
          <li><a href={to("/contacts")}>{text.contacts}</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderInternal;