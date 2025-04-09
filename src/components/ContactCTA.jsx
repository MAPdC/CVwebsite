import React, { useEffect, useRef } from "react";
import "../styles/ContactCTA.css";
import douroMapImage from "../assets/douro-map-1-mudar.jpg";

const ContactCTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const mapRef = useRef(null);

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
    
    const elements = [sectionRef, contentRef, mapRef];
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

  return (
    <section className="contact-cta-section" ref={sectionRef}>
      <div className="contact-cta-overlay">
        <div className="section-header">
          <div className="section-line"></div>
          <h2 className="section-title">CONTACTOS & VISITAS</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="contact-cta-content" ref={contentRef}>
          <p className="contact-cta-tagline">
            "Visite-nos e descubra os segredos por trás dos nossos vinhos premiados. 
            Uma experiência sensorial completa no coração do Vale do Douro."
          </p>
          
          <div className="contact-cta-container centered">
            <div className="map-container expanded" ref={mapRef}>
              <div className="map-wrapper">
                <img src={douroMapImage} alt="Mapa do Vale do Douro" className="douro-map" />
                <div className="location-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-pulse"></div>
                </div>
              </div>
              <div className="visit-info">
                <h3 className="visit-title">VISITE-NOS</h3>
                <div className="info-item">
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
                  </div>
                </div>
                <div className="info-item">
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
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>+351 933 305 966</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>casttedovalley@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;