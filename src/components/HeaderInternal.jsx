import { useState } from "react";
import "../styles/Header.css";
import logoCobre from "../assets/cv-logo-castanho.png";

function HeaderInternal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header header--scrolled">
      <a href="/" className="header__text">
        <span className="logo__line1">CASTTÊDO</span>
        <span className="logo__line2">VALLEY</span>
      </a>
      
      <a href="/" className="logo__link">
        <img 
          src={logoCobre}
          alt="CASTTÊDO VALLEY" 
          className="logo__image" 
        />
      </a>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className="menu-icon__line menu-icon__line--scrolled"></span>
        <span className="menu-icon__line menu-icon__line--scrolled"></span>
        <span className="menu-icon__line menu-icon__line--scrolled"></span>
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
          <li><a href="/find-us">ONDE NOS ENCONTRAR?</a></li>
          <li><a href="/contacts">CONTACTOS</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderInternal;