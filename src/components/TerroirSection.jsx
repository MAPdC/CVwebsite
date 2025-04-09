import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TerroirSection.css';
import terroirImage1 from '../assets/vinha-1.jpg';
import terroirImage2 from '../assets/olival-1-mudar.jpg';
import terroirImage3 from '../assets/processo-1-mudar.jpg';

const TerroirSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('reveal-section');
          observer.unobserve(section);
        }
      });
    }, observerOptions);
    
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="terroir-section" ref={sectionRef}>
      <div className="terroir-container">
        <div className="terroir-title-container">
          <span className="terroir-line"></span>
          <h2 className="terroir-title">TERROIR & PROCESSO</h2>
          <span className="terroir-line"></span>
        </div>
        
        <div className="terroir-grid">
          <div className="terroir-text-column">
            <p className="terroir-intro">
              O Casttêdo Valley está localizado numa das regiões mais privilegiadas do Alto Douro, 
              onde as condições climáticas únicas, os solos xistosos e a tradição centenária se unem 
              para criar vinhos e azeites de caráter inigualável.
            </p>
            <div className="terroir-facts">
              <div className="terroir-fact">
                <span className="fact-number">350m</span>
                <span className="fact-label">Altitude</span>
              </div>
              <div className="terroir-fact">
                <span className="fact-number">40ha</span>
                <span className="fact-label">Vinhas</span>
              </div>
              <div className="terroir-fact">
                <span className="fact-number">15ha</span>
                <span className="fact-label">Olivais</span>
              </div>
            </div>
            <Link to="/terroir" className="terroir-link">
              CONHEÇA O NOSSO TERROIR
              <span className="terroir-link-arrow">→</span>
            </Link>
          </div>
          
          <div className="terroir-images-column">
            <div className="terroir-image-container">
              <img src={terroirImage1} alt="Vinhas do Douro" className="terroir-image terroir-image-1" />
              <img src={terroirImage2} alt="Olivais" className="terroir-image terroir-image-2" />
              <img src={terroirImage3} alt="Processo de produção" className="terroir-image terroir-image-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerroirSection;