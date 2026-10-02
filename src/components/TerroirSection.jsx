import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TerroirSection.css';
import terroirImage1 from '../assets/adega-barrica-1.webp';
import terroirImage2 from '../assets/vinha-1.webp';
import terroirImage3 from '../assets/douro-1.webp';

const TerroirSection = () => {
  const sectionRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px',
      threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          section.classList.add('reveal-section');
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

  const terroirData = [
    {
      image: terroirImage1,
      alt: "Barricas centenárias da adega",
      title: "ADEGA CENTENÁRIA",
      description: "Barricas de carvalho francês para envelhecimento premium"
    },
    {
      image: terroirImage2,
      alt: "Vinhas em socalcos do Douro",
      title: "VINHAS HISTÓRICAS",
      description: "Socalcos tradicionais com castas autóctones"
    },
    {
      image: terroirImage3,
      alt: "Paisagem majestosa do Alto Douro",
      title: "TERROIR ÚNICO",
      description: "Microclima privilegiado do Alto Douro Vinhateiro"
    }
  ];

  const facts = [
    { number: "350m", label: "Altitude", detail: "Exposição solar ideal" },
    { number: "40ha", label: "Vinhas", detail: "Castas nobres" },
    { number: "15ha", label: "Olivais", detail: "Árvores centenárias" }
  ];

  return (
    <section className="terroir-section" ref={sectionRef}>
      <div className="terroir-background-pattern"></div>
      
      <div className="terroir-container">
        <div className="terroir-title-container">
          <div className="terroir-line"></div>
          <div className="terroir-title-wrapper">
            <span className="terroir-subtitle">Excelência em Cada Detalhe</span>
            <h2 className="terroir-title">TERROIR & PROCESSO</h2>
          </div>
          <div className="terroir-line"></div>
        </div>
        
        <div className="terroir-grid">
          <div className="terroir-text-column">
            <div className="terroir-intro-wrapper">
              <p className="terroir-intro">
                O <strong>Casttêdo Valley</strong> situa-se numa das regiões mais privilegiadas do Alto Douro, 
                onde as condições climáticas únicas, os solos xistosos milenares e a tradição centenária se unem 
                para criar vinhos e azeites de caráter verdadeiramente inigualável.
              </p>
              
              <div className="terroir-heritage">
                <div className="heritage-icon">🍃</div>
                <span className="heritage-text">Património Mundial da UNESCO desde 2001</span>
              </div>
            </div>
            
            <div className="terroir-facts">
              {facts.map((fact, index) => (
                <div key={index} className={`terroir-fact ${isInView ? 'animate-fact' : ''}`} 
                     style={{ animationDelay: `${index * 0.2}s` }}>
                  <span className="fact-number">{fact.number}</span>
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-detail">{fact.detail}</span>
                </div>
              ))}
            </div>
            
            <div className="terroir-quote">
              <blockquote>
                "Cada gota carrega a essência milenar desta terra abençoada"
              </blockquote>
              <cite>— Tradição Familiar</cite>
            </div>
            
            <Link to="/terroir" className="terroir-link">
              <span className="link-text">CONHEÇA O NOSSO TERROIR</span>
              <div className="link-arrow">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                </svg>
              </div>
            </Link>
          </div>
          
          <div className="terroir-images-column">
            <div className="terroir-image-container">
              {terroirData.map((item, index) => (
                <div 
                  key={index}
                  className={`terroir-image-wrapper terroir-image-${index + 1} ${activeImage === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveImage(index)}
                  onMouseLeave={() => setActiveImage(null)}
                >
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="terroir-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h4 className="overlay-title">{item.title}</h4>
                      <p className="overlay-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="image-border"></div>
                </div>
              ))}
              
              <div className="floating-elements">
                <div className="floating-element element-1">✦</div>
                <div className="floating-element element-2">◆</div>
                <div className="floating-element element-3">✧</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerroirSection;