import React, { useEffect, useRef } from "react";
import "../styles/SustainabilitySection.css";
import sustainabilityBg from "../assets/sustainability-1-mudar.jpg"; // Imagem de fundo (você precisará substituir)

const SustainabilitySection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="sustainability-section" ref={sectionRef}>
      <div className="sustainability-bg">
        <img src={sustainabilityBg} alt="Vinhedos sustentáveis" className="sustainability-image" />
      </div>
      
      <div className="sustainability-overlay">
        <div className="section-header">
          <div className="section-line"></div>
          <h2 className="section-title">SUSTENTABILIDADE</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="sustainability-content" ref={contentRef}>
          <p className="sustainability-tagline">
            "Na Casttêdo Valley, respeitamos a terra que nos dá vida. Nosso compromisso com práticas 
            sustentáveis é tão importante quanto a qualidade dos nossos vinhos."
          </p>
          
          <div className="sustainability-practices">
            <div className="practice-item">
              <div className="practice-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8z"></path>
                  <path d="M12 6a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4z"></path>
                  <path d="M15.5 8.5L12 12"></path>
                </svg>
              </div>
              <h3 className="practice-title">AGRICULTURA ORGÂNICA</h3>
              <p className="practice-description">
                Cultivamos nossas vinhas sem pesticidas químicos, 
                utilizando métodos naturais de controle biológico.
              </p>
            </div>
            
            <div className="practice-item">
              <div className="practice-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18"></path>
                  <path d="M16 7l-4-4-4 4"></path>
                  <path d="M16 17l-4 4-4-4"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </div>
              <h3 className="practice-title">GESTÃO HÍDRICA</h3>
              <p className="practice-description">
                Implementamos sistemas avançados de irrigação por gotejamento, 
                reduzindo o consumo de água em até 60%.
              </p>
            </div>
            
            <div className="practice-item">
              <div className="practice-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2"></path>
                  <path d="M12 21v2"></path>
                  <path d="M4.22 4.22l1.42 1.42"></path>
                  <path d="M18.36 18.36l1.42 1.42"></path>
                  <path d="M1 12h2"></path>
                  <path d="M21 12h2"></path>
                  <path d="M4.22 19.78l1.42-1.42"></path>
                  <path d="M18.36 5.64l1.42-1.42"></path>
                </svg>
              </div>
              <h3 className="practice-title">ENERGIA RENOVÁVEL</h3>
              <p className="practice-description">
                Nossa adega é alimentada 100% por energia solar, 
                reduzindo nossa pegada de carbono significativamente.
              </p>
            </div>
            
            <div className="practice-item">
              <div className="practice-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10h20"></path>
                  <path d="M12 2v8"></path>
                  <path d="M19 15l1.88-1.88a3.11 3.11 0 0 0 0-4.4 3.11 3.11 0 0 0-4.4 0L12 13.17l-4.24-4.24a3.11 3.11 0 0 0-4.4 0 3.11 3.11 0 0 0 0 4.4L12 22l7-7z"></path>
                </svg>
              </div>
              <h3 className="practice-title">BIODIVERSIDADE</h3>
              <p className="practice-description">
                Preservamos 30% da nossa propriedade como reserva natural, 
                promovendo a biodiversidade e o equilíbrio ecológico.
              </p>
            </div>
          </div>
          
          <div className="sustainability-commitment">
            <p>
              Nosso compromisso com a sustentabilidade se estende além da vinha. 
              Desde a produção até o engarrafamento, cada etapa é cuidadosamente 
              planejada para minimizar o impacto ambiental e preservar o terroir 
              único do Vale do Douro para as gerações futuras.
            </p>
            <a href="/sustentabilidade" className="sustainability-link">
              CONHEÇA NOSSAS PRÁTICAS
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;