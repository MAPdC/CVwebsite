import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeritageSection.css';
import heritageBgImage from '../assets/adega-barrica-1.jpg';

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
          <span className="heritage-line"></span>
          <h2 className="heritage-title">A NOSSA HISTÓRIA</h2>
          <span className="heritage-line"></span>
        </div>
        
        <div className="heritage-info">
          <p className="heritage-year-highlighted">1873</p>
          <p className="heritage-text">
            Desde a fundação da nossa adega familiar nas encostas do Douro até aos dias de hoje, 
            cinco gerações dedicaram suas vidas a aperfeiçoar a arte de produzir vinhos e azeites excepcionais.
            A tradição e o conhecimento transmitido através dos tempos, aliados à inovação, fazem 
            do Casttêdo Valley um símbolo de excelência e qualidade.
          </p>
          <Link to="/historia" className="heritage-link">
            DESCUBRA A NOSSA JORNADA
            <span className="heritage-link-arrow">→</span>
          </Link>
        </div>
        
        <div className="heritage-timeline">
          <div className="timeline-item">
            <span className="timeline-date">1873</span>
            <span className="timeline-dot"></span>
            <span className="timeline-label">Fundação</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <span className="timeline-date">1924</span>
            <span className="timeline-dot"></span>
            <span className="timeline-label">Primeiro Prêmio</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <span className="timeline-date">1967</span>
            <span className="timeline-dot"></span>
            <span className="timeline-label">Modernização</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <span className="timeline-date">2021</span>
            <span className="timeline-dot"></span>
            <span className="timeline-label">Certificação Bio</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;