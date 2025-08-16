import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Header.css";
import logoBranco from "../assets/cv-logo-branco.png";
import logoCobre from "../assets/cv-logo-castanho.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Verificar se estamos na HomePage
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    // Função que verifica o scroll da página
    const handleScroll = () => {
      // Pode ajustar este valor conforme necessário
      const scrolled = window.scrollY > 20;
      
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Adiciona o evento de scroll
    window.addEventListener("scroll", handleScroll);
    
    // Verifica o scroll inicial
    handleScroll();
    
    // Limpa o evento quando o componente for desmontado
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

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""} ${isHomePage ? "header--homepage" : ""}`}>
      <a href="/" className="header__text">
        <span className="logo__line1">CASTTÊDO</span>
        <span className="logo__line2">VALLEY</span>
      </a>
      
      <a href="/" className={`logo__link ${isHomePage && !isScrolled ? "logo__link--hidden" : ""}`}>
        <img 
          src={isScrolled ? logoCobre : logoBranco} 
          alt="CASTTÊDO VALLEY" 
          className="logo__image" 
        />
      </a>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
        <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
        <span className={`menu-icon__line ${isScrolled ? "menu-icon__line--scrolled" : ""}`}></span>
      </div>

      <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
        <ul>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>PORTEFÓLIO</a>
            <ul className={`dropdown__menu ${isDropdownOpen ? "dropdown__menu--open" : ""}`}>
              <li><a href="/portfolio/wines">VINHOS</a></li>
              <li><a href="/portfolio/olive-oils">AZEITES</a></li>
            </ul>
          </li>
          <li><a href="/about-us">SOBRE NÓS</a></li>
          <li><a href="/sustainability">SUSTENTABILIDADE</a></li>
          <li><a href="/history">HISTÓRIA</a></li>
          <li><a href="/contacts">CONTACTOS</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;