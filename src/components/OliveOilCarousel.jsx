import React, { useState, useEffect } from 'react';
import { oliveOils } from '../mocks/products.js';

const OliveOilCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('olive-oil-carousel');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === oliveOils.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? oliveOils.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (oliveOils.length === 0) return null;

  return (
    <section 
      id="olive-oil-carousel" 
      className={`olive-oil-carousel ${isVisible ? 'visible' : ''}`}
    >
      <div className="carousel-container">
        <div className="section-header">
          <span className="section-subtitle">TRADIÇÃO MEDITERRÂNICA</span>
          <h2 className="section-title">Azeites Premium</h2>
          <div className="title-ornament">
            <div className="ornament-line"></div>
            <div className="ornament-olive"></div>
            <div className="ornament-line"></div>
          </div>
          <p className="section-description">
            Do nosso olival centenário, extraímos os melhores azeites virgens extra,
            preservando sabores ancestrais numa produção artesanal de excelência.
          </p>
        </div>

        <div className="carousel-wrapper">
          <button 
            className="carousel-nav prev" 
            onClick={prevSlide}
            aria-label="Azeite anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <div className="carousel-track">
            <div 
              className="carousel-slides"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {oliveOils.map((oil, index) => (
                <div key={oil.id} className="carousel-slide">
                  <div className="oil-card">
                    <div className="oil-image-container">
                      <div className="oil-bottle">
                        <div className="bottle-shadow"></div>
                        <div className="bottle-body">
                          <div className="bottle-neck"></div>
                          <div className="bottle-label">
                            <div className="label-logo">CV</div>
                            <div className="label-text">EXTRA</div>
                            <div className="label-subtext">VIRGIN</div>
                          </div>
                        </div>
                        <div className="oil-level"></div>
                      </div>
                      <div className="oil-glow"></div>
                    </div>
                    <div className="oil-content">
                      <div className="oil-category">Azeite Virgem Extra</div>
                      <h3 className="oil-name">{oil.name}</h3>
                      <p className="oil-description">{oil.description}</p>
                      
                      <div className="oil-features">
                        <div className="feature">
                          <div className="feature-icon">🌿</div>
                          <span>100% Natural</span>
                        </div>
                        <div className="feature">
                          <div className="feature-icon">⚱️</div>
                          <span>Extração a Frio</span>
                        </div>
                        <div className="feature">
                          <div className="feature-icon">🏺</div>
                          <span>Origem Douro</span>
                        </div>
                      </div>

                      <div className="oil-price-section">
                        <span className="oil-price">€{oil.price}</span>
                        <button className="oil-cta">
                          Encomendar
                          <span className="cta-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-nav next" 
            onClick={nextSlide}
            aria-label="Próximo azeite"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div className="carousel-indicators">
          {oliveOils.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para azeite ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .olive-oil-carousel {
          padding: 120px 0;
          background: linear-gradient(135deg, #2d4a22 0%, #3a5f2c 50%, #2d4a22 100%);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s ease-out;
        }

        .olive-oil-carousel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(139, 165, 78, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(107, 142, 35, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 48%, rgba(85, 107, 47, 0.05) 50%, transparent 52%);
        }

        .olive-oil-carousel.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
          color: white;
        }

        .section-subtitle {
          font-family: 'AgathoRegularCAPS', serif;
          font-size: 0.9rem;
          letter-spacing: 3px;
          color: #8ba54e;
          margin-bottom: 20px;
          display: block;
        }

        .section-title {
          font-family: 'Cormorant', serif;
          font-size: 3.5rem;
          font-weight: 300;
          color: white;
          margin: 0;
          letter-spacing: 2px;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .title-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
        }

        .ornament-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, #8ba54e, transparent);
        }

        .ornament-olive {
          width: 12px;
          height: 8px;
          background: #8ba54e;
          border-radius: 50%;
          margin: 0 20px;
          position: relative;
        }

        .ornament-olive::after {
          content: '';
          position: absolute;
          top: -2px;
          right: -8px;
          width: 4px;
          height: 8px;
          background: #6b8e23;
          border-radius: 2px;
          transform: rotate(15deg);
        }

        .section-description {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .carousel-track {
          flex: 1;
          overflow: hidden;
          border-radius: 20px;
          margin: 0 60px;
        }

        .carousel-slides {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .carousel-slide {
          min-width: 100%;
          display: flex;
          justify-content: center;
        }

        .oil-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,243,240,0.9));
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 50px;
          max-width: 900px;
          width: 100%;
          display: flex;
          gap: 60px;
          align-items: center;
          box-shadow: 
            0 25px 50px rgba(0,0,0,0.2),
            0 10px 20px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.4s ease;
          position: relative;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .oil-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 
            0 40px 80px rgba(0,0,0,0.25),
            0 20px 40px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .oil-image-container {
          position: relative;
          min-width: 250px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .oil-bottle {
          position: relative;
          width: 120px;
          height: 320px;
          transition: transform 0.4s ease;
        }

        .oil-card:hover .oil-bottle {
          transform: scale(1.05) rotate(2deg);
        }

        .bottle-shadow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 30px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%);
          border-radius: 50%;
        }

        .bottle-body {
          width: 100%;
          height: 280px;
          background: linear-gradient(145deg, #2d5016, #3a6b1f, #2d5016);
          border-radius: 8px 8px 25px 25px;
          position: relative;
          box-shadow: 
            inset -8px 0 15px rgba(0,0,0,0.3),
            inset 8px 0 15px rgba(255,255,255,0.1),
            0 8px 20px rgba(45, 80, 22, 0.4);
        }

        .bottle-neck {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 60px;
          background: linear-gradient(145deg, #1a2e0d, #2d5016);
          border-radius: 4px 4px 0 0;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .bottle-neck::after {
          content: '';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 20px;
          background: #8ba54e;
          border-radius: 50% 50% 0 0;
        }

        .bottle-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 100px;
          background: linear-gradient(145deg, #f8f6f3, #ede8e0);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 4px 8px rgba(0,0,0,0.2),
            inset 0 1px 2px rgba(255,255,255,0.8);
        }

        .label-logo {
          font-family: 'AgathoRegularCAPS', serif;
          font-size: 1.2rem;
          font-weight: bold;
          color: #2d5016;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .label-text {
          font-family: 'Cormorant', serif;
          font-size: 0.7rem;
          color: #8ba54e;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .label-subtext {
          font-family: 'Cormorant', serif;
          font-size: 0.6rem;
          color: #6b8e23;
          margin-top: 2px;
        }

        .oil-level {
          position: absolute;
          bottom: 20px;
          left: 10px;
          right: 10px;
          height: 180px;
          background: linear-gradient(180deg, 
            rgba(218, 165, 32, 0.9) 0%, 
            rgba(184, 134, 11, 0.8) 50%, 
            rgba(139, 165, 78, 0.7) 100%);
          border-radius: 0 0 20px 20px;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
        }

        .oil-level::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.3) 50%, 
            transparent 100%);
          animation: oil-shimmer 3s ease-in-out infinite;
        }

        @keyframes oil-shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 0.8; transform: translateX(100%); }
        }

        .oil-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(139, 165, 78, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow-pulse 4s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }

        .oil-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .oil-category {
          font-family: 'AgathoRegularCAPS', serif;
          font-size: 0.8rem;
          letter-spacing: 2px;
          color: #8ba54e;
          text-transform: uppercase;
        }

        .oil-name {
          font-family: 'Cormorant', serif;
          font-size: 2.4rem;
          font-weight: 400;
          color: #2d4a22;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 1px;
        }

        .oil-description {
          color: #5a6b4a;
          line-height: 1.6;
          font-size: 1.1rem;
          margin: 0;
        }

        .oil-features {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 165, 78, 0.1);
          padding: 10px 16px;
          border-radius: 25px;
          border: 1px solid rgba(139, 165, 78, 0.2);
        }

        .feature-icon {
          font-size: 1.2rem;
        }

        .feature span {
          font-size: 0.9rem;
          color: #2d4a22;
          font-weight: 500;
        }

        .oil-price-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }

        .oil-price {
          font-family: 'Cormorant', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #8ba54e;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .oil-cta {
          background: linear-gradient(135deg, #8ba54e, #6b8e23);
          color: white;
          border: none;
          padding: 16px 35px;
          border-radius: 50px;
          font-family: 'AgathoRegularCAPS', serif;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 20px rgba(139, 165, 78, 0.3);
        }

        .oil-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(139, 165, 78, 0.4);
          background: linear-gradient(135deg, #6b8e23, #556b2f);
        }

        .cta-arrow {
          transition: transform 0.3s ease;
          font-size: 1.2rem;
        }

        .oil-cta:hover .cta-arrow {
          transform: translateX(5px);
        }

        .carousel-nav {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(139, 165, 78, 0.3);
          border-radius: 50%;
          width: 65px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #8ba54e;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .carousel-nav:hover {
          background: #8ba54e;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(139, 165, 78, 0.4);
          border-color: #8ba54e;
        }

        .carousel-nav svg {
          width: 22px;
          height: 22px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-top: 60px;
        }

        .indicator {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.4);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #8ba54e;
          border-color: #8ba54e;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(139, 165, 78, 0.5);
        }

        .indicator:hover {
          border-color: #8ba54e;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 0 20px;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .oil-card {
            flex-direction: column;
            text-align: center;
            padding: 40px 30px;
            gap: 40px;
          }

          .oil-image-container {
            height: 300px;
            min-width: auto;
          }

          .oil-bottle {
            width: 100px;
            height: 280px;
          }

          .carousel-track {
            margin: 0 40px;
          }

          .carousel-nav {
            width: 55px;
            height: 55px;
          }

          .carousel-nav svg {
            width: 18px;
            height: 18px;
          }

          .oil-price-section {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }

          .oil-features {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .olive-oil-carousel {
            padding: 80px 0;
          }

          .carousel-track {
            margin: 0 30px;
          }

          .oil-card {
            padding: 30px 20px;
          }

          .section-title {
            font-size: 2rem;
          }

          .oil-name {
            font-size: 2rem;
          }

          .section-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OliveOilCarousel;