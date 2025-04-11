import "../styles/Footer.css";
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Home, Menu, CheckSquare } from 'lucide-react';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* Top section with logo and nav */}
          <div className="footer-top">
            {/* Left column */}
            <div className="footer-column">
            <a href="/" className="footer-home-link">
                <h1 className="column-title">CASTTÊDO VALLEY</h1>
              </a>
              <ul className="footer-nav">
                <li><a href="/portfolio">PORTEFÓLIO</a></li>
                <li><a href="/history">HISTÓRIA</a></li>
                <li><a href="/grape-varieties">CASTAS</a></li>
                <li><a href="/contacts">CONTACTOS</a></li>
              </ul>
            </div>
  
            {/* Center - Logo */}
            <div className="footer-column">
            <a href="/">
                <img 
                  src="/images/cv-logo-castanho.svg" 
                  alt="Casttêdo Valley Logo" 
                  className="footer-logo"
                />
              </a>
            </div>
  
            {/* Right column - Social Media */}
            <div className="footer-column">
              <h1 className="column-title">REDES SOCIAIS</h1>
              <div className="social-icons">
                <a 
                    href="https://www.facebook.com/casttedovalley10"
                    target="_blank" 
                    rel="noopener noreferrer"                
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                    href="https://www.instagram.com/casttedovalley/"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom section - Legal links */}
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="/privacy-policies">POLÍTICA DE PRIVACIDADE</a>
            </div>
            <div className="copyright">
              ©2025 por Casttêdo Valley. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;