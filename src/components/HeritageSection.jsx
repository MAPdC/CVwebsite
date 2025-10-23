import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeritageSection.css';
import heritageBgImage from '../assets/padre-antonio-veiga-douro.jpg';

const HeritageSection = () => {
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
    <section className="heritage-section" ref={sectionRef}>
      <div className="heritage-background">
        <div className="heritage-overlay"></div>
        <img src={heritageBgImage} alt="Adega histórica Casttêdo" className="heritage-bg-image" />
      </div>
      
      <div className="heritage-content">
        <div className="heritage-title-container">
          <h2 className="heritage-title">A NOSSA HISTÓRIA</h2>
        </div>
        
        <div className="heritage-info">
          <p className="heritage-year-highlighted">1873</p>
          <p className="heritage-intro-text">
            A referência mais antiga associada ao Casttêdo Valley remonta a 1873, data em que se ergueram os nossos lagares de granito.
          </p>
          <p className="heritage-text">
            A arte da produção de vinhos e azeites é uma tradição familiar que se estende há, pelo menos, quatro gerações. 
            As vinhas e oliveiras herdadas de geração em geração foram alvo de várias reestruturações e modernizações ao longo dos anos,
            respeitando sempre a tradição e o terroir único do Douro.
          </p>
          <Link to="/historia" className="heritage-link">
            SAIBA MAIS SOBRE O NOSSO LEGADO
            <span className="heritage-link-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;