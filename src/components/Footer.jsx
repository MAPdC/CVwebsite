import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react'; // Importar ícones
import logoCobre from '../assets/cv-logo-castanho.webp'; // Importar o logo correto
import "../styles/Footer.css"; // Manter o link para o CSS
import { useLang } from '../i18n';
import { COMMON } from '../i18n/common';
import { COMPLAINTS_BOOK_URL } from '../legal';
import livroReclamacoes from '../assets/livro-reclamacoes.png';

const Footer = () => {
    const { lang, to } = useLang();
    const nav = COMMON[lang].nav;
    const text = COMMON[lang].footer;

    return (
      <footer className="footer">
        <div className="footer-container">
          
          <div className="footer-top">
            
            {/* Coluna da Esquerda: Navegação */}
            <div className="footer-column footer-nav-links">
              <h3 className="column-title">{text.navigation}</h3>
              <ul className="footer-nav">
                <li><Link to={to("/")}>{nav.home}</Link></li>
                <li><Link to={to("/portfolio/wines")}>{nav.wines}</Link></li>
                <li><Link to={to("/portfolio/olive-oils")}>{nav.oliveOils}</Link></li>
                <li><Link to={to("/camuflado")}>{nav.camuflado}</Link></li>
                {/*<li><a href="/about-us">Sobre Nós</a></li>*/}
                {/*<li><a href="/history">História</a></li>*/}
                {/*<li><a href="/sustainability">Sustentabilidade</a></li>*/}
                <li><Link to={to("/contacts")}>{nav.contacts}</Link></li>
              </ul>
            </div>
  
            {/* Coluna Central: Logo */}
            <div className="footer-column footer-logo-container">
              {/* Logótipo decorativo: o título por baixo já leva à página inicial */}
              <Link to={to("/")} tabIndex={-1} aria-hidden="true">
                <img src={logoCobre} alt="" className="footer-logo" />
              </Link>
              {/* Título CASTTÊDO VALLEY por baixo do logo */}
              <Link to={to("/")} className="footer-logo-text">
                <span className="logo__line1">CASTTÊDO</span>
                <span className="logo__line2">VALLEY</span>
              </Link>
            </div>
  
            {/* Coluna da Direita: Contactos e Redes Sociais */}
            <div className="footer-column footer-contacts">
              <h3 className="column-title">{text.contacts}</h3>
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
                    <a href="tel:+351933305966" data-umami-event="telefone" data-umami-event-local="rodape">+351 933 305 966</a>
                    <span className="phone-separator"> / </span>
                    <a href="tel:+351933467002" data-umami-event="telefone" data-umami-event-local="rodape">+351 933 467 002</a>
                  </span>
                </p>
                
                <p>
                  <Mail size={14} />
                  <a href="mailto:casttedovalley@gmail.com" data-umami-event="email" data-umami-event-local="rodape">casttedovalley@gmail.com</a>
                </p>
              </div>
              
              <h3 className="column-title social-title">{text.social}</h3>
              <div className="social-icons">
                <a 
                    href="https://www.facebook.com/casttedovalley10"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    data-umami-event="rede-social"
                    data-umami-event-rede="facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                    href="https://www.instagram.com/casttedovalley/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    data-umami-event="rede-social"
                    data-umami-event-rede="instagram"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
  
          {/* Secção Inferior: Legal */}
          <div className="footer-bottom">
            <div className="footer-links">
              <Link to={to("/privacy-policies")}>{text.privacy}</Link>
              {/* Identificação de quem explora o site e resolução de litígios (secção da página de privacidade) */}
              <Link to={to("/privacy-policies#informacao-legal")}>{text.legalInfo}</Link>
              {/* Ícone oficial do Livro de Reclamações Eletrónico (obrigatório, visível e com ligação à plataforma) */}
              <a
                href={COMPLAINTS_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-complaints"
                data-umami-event="livro-reclamacoes"
              >
                <img src={livroReclamacoes} alt={text.complaints} width="219" height="40" />
              </a>
            </div>
            <div className="copyright">
              {text.rights(new Date().getFullYear())}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;