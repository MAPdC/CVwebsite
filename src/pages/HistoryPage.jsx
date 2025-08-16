import React, { useEffect, useRef, useState } from "react";
import "../styles/HistoryPage.css";

// Imagens - substitua pelos caminhos corretos
import vintagePhoto from "../assets/douro-1.jpg";
import familyPortrait from "../assets/douro-1.jpg";
import vineyardEvolution from "../assets/douro-1.jpg";
import modernCellar from "../assets/douro-1.jpg";

const HistoryPage = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Observar todos os elementos com classe .timeline-item
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
    
    // Observar seções principais
    if (heroRef.current) observer.observe(heroRef.current);
    if (timelineRef.current) observer.observe(timelineRef.current);
    
    // Handle scroll para efeito parallax
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      timelineItems.forEach(item => observer.unobserve(item));
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (timelineRef.current) observer.unobserve(timelineRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.3}px)`
  };

  return (
    <div className="history-page">
      {/* Hero Section */}
      <section className="history-hero" ref={heroRef}>
        <div className="history-hero-container" style={parallaxStyle}>
          <img 
            src={vintagePhoto} 
            alt="Foto histórica da Casttêdo Valley" 
            className="history-hero-image"
          />
        </div>
        <div className="history-hero-overlay">
          <h1 className="history-hero-title">NOSSA HISTÓRIA</h1>
          <p className="history-hero-subtitle">CINCO GERAÇÕES DE TRADIÇÃO</p>
          <p className="history-hero-tagline">
            "Desde 1873, a família Casttêdo cultiva mais que vinhas: 
            cultiva sonhos, tradições e a paixão pela excelência que se transmite 
            de geração em geração."
          </p>
        </div>
        <div className="history-hero-year">
          <span className="hero-line"></span>
          1873 - 2024
          <span className="hero-line"></span>
        </div>
      </section>

      {/* Introdução */}
      <section className="history-intro">
        <div className="container">
          <div className="intro-content">
            <h2 className="section-title">A NOSSA JORNADA</h2>
            <p className="intro-text">
              No coração do Vale do Douro, onde o rio serpenteia entre colinas douradas, 
              nasceu um sonho que se transformou em legado. A história da Casttêdo Valley 
              é a história de uma família apaixonada pela terra, pelo vinho e pela 
              preservação de tradições milenares.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="container">
          <h2 className="section-title">MARCOS HISTÓRICOS</h2>
          
          <div className="timeline">
            {/* 1873 - Fundação */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-year">1873</div>
                <h3>O INÍCIO DE TUDO</h3>
                <p>
                  António Casttêdo adquire as primeiras parcelas de terra no Vale do Douro, 
                  plantando as primeiras vinhas da família. Com apenas algumas hectares e 
                  um sonho imenso, inicia-se a tradição vinícola que perdura até hoje.
                </p>
                <div className="timeline-image">
                  <img src={vintagePhoto} alt="Fundação em 1873" />
                </div>
              </div>
            </div>

            {/* 1920 - Segunda Geração */}
            <div className="timeline-item right">
              <div className="timeline-content">
                <div className="timeline-year">1920</div>
                <h3>EXPANSÃO E INOVAÇÃO</h3>
                <p>
                  Manuel Casttêdo, filho de António, moderniza a produção e expande 
                  os vinhedos. Introduz novas técnicas de vinificação e constrói a 
                  primeira adega de pedra da propriedade, muitas das suas estruturas 
                  ainda hoje utilizadas.
                </p>
                <div className="timeline-image">
                  <img src={familyPortrait} alt="Segunda geração" />
                </div>
              </div>
            </div>

            {/* 1965 - Terceira Geração */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-year">1965</div>
                <h3>RECONHECIMENTO INTERNACIONAL</h3>
                <p>
                  Sob a liderança de José Casttêdo, a quinta obtém os primeiros 
                  prémios internacionais. A qualidade dos vinhos Casttêdo Valley 
                  conquista mercados europeus e estabelece a marca como referência 
                  de excelência.
                </p>
                <div className="timeline-image">
                  <img src={vineyardEvolution} alt="Reconhecimento internacional" />
                </div>
              </div>
            </div>

            {/* 1990 - Quarta Geração */}
            <div className="timeline-item right">
              <div className="timeline-content">
                <div className="timeline-year">1990</div>
                <h3>TECNOLOGIA E TRADIÇÃO</h3>
                <p>
                  Maria e Carlos Casttêdo assumem a direção, equilibrando tradição 
                  familiar com tecnologia moderna. Investem em equipamentos de ponta 
                  e técnicas sustentáveis, mantendo sempre o respeito pela terra 
                  e pelas práticas ancestrais.
                </p>
                <div className="timeline-image">
                  <img src={modernCellar} alt="Modernização" />
                </div>
              </div>
            </div>

            {/* 2020 - Quinta Geração */}
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-year">2020</div>
                <h3>NOVA ERA, MESMA PAIXÃO</h3>
                <p>
                  Ana Sofia Casttêdo representa a quinta geração, trazendo inovação 
                  digital e práticas de agricultura biológica. Mantém viva a paixão 
                  familiar enquanto projeta a marca para o futuro, conquistando novos 
                  mercados globais.
                </p>
                <div className="timeline-image">
                  <img src={familyPortrait} alt="Quinta geração" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Filosofia */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">NOSSOS VALORES</h2>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🍇</div>
              <h3>TRADIÇÃO</h3>
              <p>
                Preservamos técnicas ancestrais transmitidas de geração em geração, 
                mantendo viva a essência do nosso terroir único.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>SUSTENTABILIDADE</h3>
              <p>
                Cuidamos da terra com responsabilidade, praticando agricultura 
                sustentável para preservar o ambiente para futuras gerações.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">⭐</div>
              <h3>EXCELÊNCIA</h3>
              <p>
                Buscamos constantemente a perfeição em cada garrafa, desde a 
                seleção das uvas até ao momento da degustação.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">👥</div>
              <h3>FAMÍLIA</h3>
              <p>
                Somos mais que uma empresa: somos uma família unida pela paixão 
                do vinho e pelo amor à nossa terra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Final */}
      <section className="final-quote">
        <div className="container">
          <div className="quote-content">
            <blockquote>
              "Cada garrafa de Casttêdo Valley carrega consigo 150 anos de história, 
              cinco gerações de paixão e o terroir único do Vale do Douro. 
              É mais que vinho: é a nossa herança líquida."
            </blockquote>
            <cite>— Ana Sofia Casttêdo, 5ª Geração</cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryPage;