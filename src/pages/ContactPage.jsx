import React, { useEffect, useRef, useState } from "react";
import "../styles/ContactPage.css";
// Assumindo que este caminho está correto para a sua estrutura de projeto
import douroMapImage from "../assets/maps-2.jpg";
// Imagem de fundo do hero
import heroBackground from "../assets/maps-2.jpg";

const ContactPage = () => {
  // Refs para animações de scroll
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const mapRef = useRef(null);
  const heroRef = useRef(null);
  const additionalInfoRef = useRef(null);

  // Estado para controlar a exibição do popup de info do horário
  const [showScheduleInfo, setShowScheduleInfo] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Observar todos os elementos que devem ser animados
    const elements = [heroRef, sectionRef, contentRef, mapRef, additionalInfoRef];
    elements.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      elements.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Função para copiar o email para a área de transferência
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("casttedovalley@gmail.com");
    alert("Email copiado para a área de transferência!");
  };

  // Função para copiar o telefone para a área de transferência
  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText("+351 933 305 966");
    alert("Telefone copiado para a área de transferência!");
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-image" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">CONTACTOS</h1>
            <p className="hero-subtitle">Descubra o nosso mundo no coração do Vale do Douro</p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section" ref={sectionRef}>
        <div className="contact-overlay">
          <div className="section-header">
            <div className="section-line"></div>
            <h2 className="section-title">CONTACTOS & VISITAS</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-content" ref={contentRef}>
            <p className="contact-tagline">
              "Visite-nos e descubra os segredos por trás dos nossos vinhos premiados. 
              Uma experiência sensorial completa no coração do Vale do Douro."
            </p>
            
            <div className="contact-container">
              <div className="map-container" ref={mapRef}>
                <div className="map-wrapper">
                  <img src={douroMapImage} alt="Mapa do Vale do Douro" className="douro-map" />
                  <div className="location-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-pulse"></div>
                  </div>
                  {/* Tooltip na localização */}
                  <div className="location-tooltip">Casttêdo Valley</div>
                </div>
                
                <div className="visit-info">
                  <h3 className="visit-title">VISITE-NOS</h3>
                  
                  <div className="info-item clickable" onClick={() => window.open("https://maps.google.com/?q=Largo Padre António Veiga, 5070-226, Castedo, Alijó, Portugal", "_blank")}>
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="info-text">
                      <p>Casttêdo Valley</p>
                      <p>Largo Padre António Veiga</p>
                      <p>5070-226, Castedo, Alijó, Portugal</p>
                      <p className="hint">Clique para abrir no mapa</p>
                    </div>
                  </div>
                  
                  <div className="info-item" 
                       onMouseEnter={() => setShowScheduleInfo(true)}
                       onMouseLeave={() => setShowScheduleInfo(false)}>
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="info-text">
                      <p>Horário Flexível</p>
                      <p className="hint">Passe o mouse para ver detalhes</p>
                      {showScheduleInfo && (
                        <div className="schedule-popup">
                          <p>Segunda a Sexta: 10h - 17h</p>
                          <p>Sábado: 11h - 16h</p>
                          <p>Domingo: Fechado</p>
                          <p><strong>Marcação prévia recomendada</strong></p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="info-item clickable" onClick={copyPhoneToClipboard}>
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="info-text">
                      <p>+351 933 305 966</p>
                      <p className="hint">Clique para copiar</p>
                    </div>
                  </div>
                  
                  <div className="info-item clickable" onClick={copyEmailToClipboard}>
                    <div className="info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="info-text">
                      <p>casttedovalley@gmail.com</p>
                      <p className="hint">Clique para copiar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional information section */}
      <section className="additional-info-section" ref={additionalInfoRef}>
        <div className="additional-info-content">
          <div className="section-subheader">
            <div className="section-subline"></div>
            <h3 className="section-subtitle">EXPERIÊNCIAS</h3>
            <div className="section-subline"></div>
          </div>
          
          <div className="experiences-grid">
            <div className="experience-card">
              <div className="experience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h4>Prova de Vinhos</h4>
              <p>Degustação dos nossos premiados vinhos do Douro, acompanhados de explicações sobre o processo de produção.</p>
            </div>
            
            <div className="experience-card">
              <div className="experience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h4>Visita às Vinhas</h4>
              <p>Passeio guiado pelas vinhas centenárias com vista panorâmica para o rio Douro.</p>
            </div>
            
            <div className="experience-card">
              <div className="experience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h4>Harmonização</h4>
              <p>Degustação de vinhos acompanhados de produtos regionais selecionados para realçar os seus sabores.</p>
            </div>
            
            <div className="experience-card">
              <div className="experience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h4>Visita à Adega</h4>
              <p>Conheça os processos de vinificação e envelhecimento que tornam os nossos vinhos tão especiais.</p>
            </div>
          </div>
          
          <div className="reservation-notice">
            <div className="notice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="notice-text">
              <h4>Reserva Prévia</h4>
              <p>Para garantir a melhor experiência possível, recomendamos que faça a sua reserva com pelo menos 48 horas de antecedência através do nosso telefone ou email.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to reach us section */}
      <section className="how-to-reach-section">
        <div className="how-to-reach-content">
          <div className="section-subheader">
            <div className="section-subline"></div>
            <h3 className="section-subtitle">COMO CHEGAR</h3>
            <div className="section-subline"></div>
          </div>
          
          <div className="directions-container">
            <div className="directions-item">
              <div className="directions-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="directions-text">
                <h4>De Carro</h4>
                <p>Do Porto: Siga a A4 em direção a Vila Real, depois a N322 até Alijó e siga as indicações para Castedo.</p>
                <p>De Lisboa: Siga a A1 até Santarém, depois a A23 até Vila Real e continue como acima.</p>
              </div>
            </div>
            
            <div className="directions-item">
              <div className="directions-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17H5a2 2 0 0 0-2 2 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1 2 2 0 0 0-2-2z"></path>
                  <path d="M4 11h16a1 1 0 0 0 1-1 2 2 0 0 0-2-2H5a2 2 0 0 0-2 2 1 1 0 0 0 1 1z"></path>
                  <path d="M21 7H3c-.6 0-1-.4-1-1V5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v1c0 .6-.4 1-1 1z"></path>
                </svg>
              </div>
              <div className="directions-text">
                <h4>De Comboio</h4>
                <p>Linha do Douro até à estação de Pinhão, depois táxi até Castedo (aproximadamente 15 minutos).</p>
              </div>
            </div>
            
            <div className="directions-item">
              <div className="directions-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
              <div className="directions-text">
                <h4>De Barco</h4>
                <p>Cruzeiro no Douro até Pinhão, depois táxi até Castedo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with copyright */}
      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} Casttêdo Valley. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ContactPage;