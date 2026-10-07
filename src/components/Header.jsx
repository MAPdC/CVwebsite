import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logoBranco from "../assets/cv-logo-branco.webp";
import logoCobre from "../assets/cv-logo-castanho.webp";
import LanguageSwitch from "./LanguageSwitch";
import { useLang } from "../i18n";
import { COMMON } from "../i18n/common";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { lang, path, to } = useLang();
  const text = COMMON[lang].nav;
  
  // Verificar se estamos na HomePage
  const isHomePage = path === '/' || path === '/home';
  
  // Verificar se estamos no universo Camuflado
  const isCamuflado = path.startsWith('/camuflado');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Função para fechar o menu ao clicar num link (muito útil em mobile)
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    // Adicionada classe dinâmica header--camuflado
    <header className={`header ${isScrolled ? "header--scrolled" : ""} ${isHomePage ? "header--homepage" : ""} ${isCamuflado ? "header--camuflado" : ""}`}>
      
      {/* Uso de Link em vez de a href */}
      <Link to={to("/")} className="header__text" onClick={closeMenu}>
        <span className="logo__line1">CASTTÊDO</span>
        <span className="logo__line2">VALLEY</span>
      </Link>
      
      <Link to={to("/")} className={`logo__link ${isHomePage && !isScrolled ? "logo__link--hidden" : ""}`} onClick={closeMenu}>
        <img 
          src={isScrolled ? logoCobre : logoBranco} 
          alt="CASTTÊDO VALLEY" 
          className="logo__image" 
        />
      </Link>

      <div className="header__actions">
        <LanguageSwitch onSelect={closeMenu} />
        <div className="menu-icon" onClick={toggleMenu} role="button" aria-label={COMMON[lang].menu}>
          <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
          <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
          <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
        </div>
      </div>

      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>{text.portfolio}</a>
            <ul className={`dropdown__menu ${isDropdownOpen ? "dropdown__menu--open" : ""}`}>
              <li><Link to={to("/portfolio/wines")} onClick={closeMenu}>{text.wines}</Link></li>
              <li><Link to={to("/portfolio/olive-oils")} onClick={closeMenu}>{text.oliveOils}</Link></li>
              {/* Item Camuflado com classe própria */}
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