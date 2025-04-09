import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedProducts.css';

import wineImage from '../assets/old-references.jpg';
import oliveOilImage from '../assets/azeite.png';

const FeaturedProducts = () => {
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const section = sectionRef.current;
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
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
      <section className="featured-products" ref={sectionRef}>
        <div className="featured-container">
          <h2 className="featured-heading">
            <span className="featured-line"></span>
            AS NOSSAS RELÍQUIAS
            <span className="featured-line"></span>
          </h2>
          
          <div className="featured-grid">
            <div className="featured-item">
              <div className="featured-image-container">
                <img src={wineImage} alt="Vinhos Casttêdo Valley" className="featured-image" />
                <div className="featured-overlay">
                  <span className="featured-category">VINHOS</span>
                  <p className="featured-description">
                    Da essência das nossas vinhas de encosta, nascidos do terroir único do Douro, 
                    os nossos vinhos guardam a alma da região em cada garrafa.
                  </p>
                  <Link to="/vinhos" className="featured-link">EXPLORAR</Link>
                </div>
              </div>
            </div>
            
            <div className="featured-item">
              <div className="featured-image-container">
                <img src={oliveOilImage} alt="Azeites Casttêdo Valley" className="featured-image" />
                <div className="featured-overlay">
                  <span className="featured-category">AZEITES</span>
                  <p className="featured-description">
                    Colhidas à mão e prensadas a frio, as nossas azeitonas produzem 
                    azeites biológicos de qualidade inigualável.
                  </p>
                  <Link to="/azeites" className="featured-link">EXPLORAR</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default FeaturedProducts;