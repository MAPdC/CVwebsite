import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react'; // Importar ícones
import logoCobre from '../assets/cv-logo-castanho.png'; // Importar o logo correto
import "../styles/Footer.css"; // Manter o link para o CSS

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          
          <div className="footer-top">
            
            {/* Coluna da Esquerda: Navegação */}
            <div className="footer-column footer-nav-links">
              <h3 className="column-title">Navegação</h3>
              <ul className="footer-nav">
                <li><a href="/">Início</a></li>
                <li><a href="/portfolio/wines">Vinhos</a></li>
                <li><a href="/portfolio/olive-oils">Azeites</a></li>
                {/*<li><a href="/about-us">Sobre Nós</a></li>*/}
                {/*<li><a href="/history">História</a></li>*/}
                {/*<li><a href="/sustainability">Sustentabilidade</a></li>*/}
                <li><a href="/contacts">Contactos</a></li>
              </ul>
            </div>
  
            {/* Coluna Central: Logo */}
            <div className="footer-column footer-logo-container">
              <a href="/">
                <img 
                  src={logoCobre} // Usar o logo importado
                  alt="Casttêdo Valley Logo" 
                  className="footer-logo"
                />
              </a>
              {/* Título CASTTÊDO VALLEY por baixo do logo */}
              <a href="/" className="footer-logo-text">
                <span className="logo__line1">CASTTÊDO</span>
                <span className="logo__line2">VALLEY</span>
              </a>
            </div>
  
            {/* Coluna da Direita: Contactos e Redes Sociais */}
            <div className="footer-column footer-contacts">
              <h3 className="column-title">Contactos</h3>
              <div className="contact-info">
                {/* Morada em 3 linhas */}
                <p className="address-multi-line">
                  <MapPin size={14} />
                  <span>
                    Largo Padre António Veiga
                    <br />
                    5070-226, Castedo
                    <br />
                    Alijó, Portugal
                  </span>
                </p>
                
                {/* Contactos telefónicos */}
                <p>
                  <Phone size={14} />
                  <span className="phone-numbers">
                    <a href="tel:+351933305966">+351 933 305 966</a>
                    <span className="phone-separator"> / </span>
                    <a href="tel:+351933467002">+351 933 467 002</a> 
                  </span>
                </p>
                
                <p>
                  <Mail size={14} />
                  <a href="mailto:casttedovalley@gmail.com">casttedovalley@gmail.com</a>
                </p>
              </div>
              
              <h3 className="column-title social-title">Redes Sociais</h3>
              <div className="social-icons">
                <a 
                    href="https://www.facebook.com/casttedovalley10"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                    href="https://www.instagram.com/casttedovalley/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
  
          {/* Secção Inferior: Legal */}
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="/privacy-policies">POLÍTICA DE PRIVACIDADE</a>
            </div>
            <div className="copyright">
              ©{new Date().getFullYear()} por Casttêdo Valley. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;