import React, { useEffect, useRef } from "react";
import "../styles/AwardsSection.css";
import goldMedal from "../assets/vinduero-ouro-24.png";
import silverMedal from "../assets/vinduero-prata-19.png";
import bronzeMedal from "../assets/vinduero-ourof-24.png";
import decanter from "../assets/decanter-1-mudar.jpg";
import iwc from "../assets/iwc-1-mudar.jpg";
import mundus from "../assets/mundus-vini-1-mudar.jpg";
import reservaBottle from "../assets/vto19-1.png";

const AwardsSection = () => {
  const sectionRef = useRef(null);
  const awardsRef = useRef(null);
  const featuredRef = useRef(null);

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
    
    if (awardsRef.current) {
      observer.observe(awardsRef.current);
    }
    
    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (awardsRef.current) observer.unobserve(awardsRef.current);
      if (featuredRef.current) observer.unobserve(featuredRef.current);
    };
  }, []);

  return (
    <section className="awards-section" ref={sectionRef}>
      <div className="section-header">
        <div className="section-line"></div>
        <h2 className="section-title">RECONHECIMENTOS</h2>
        <div className="section-line"></div>
      </div>
      
      <div className="awards-container" ref={awardsRef}>
        <div className="award-item">
          <img src={decanter} alt="Decanter World Wine Awards" className="award-logo" />
          <div className="award-medals">
            <div className="medal">
              <img src={goldMedal} alt="Medalha de Ouro" />
              <span>2023</span>
            </div>
            <div className="medal">
              <img src={silverMedal} alt="Medalha de Prata" />
              <span>2022</span>
            </div>
          </div>
        </div>
        
        <div className="award-item">
          <img src={iwc} alt="International Wine Challenge" className="award-logo" />
          <div className="award-medals">
            <div className="medal">
              <img src={goldMedal} alt="Medalha de Ouro" />
              <span>2023</span>
            </div>
            <div className="medal">
              <img src={goldMedal} alt="Medalha de Ouro" />
              <span>2021</span>
            </div>
          </div>
        </div>
        
        <div className="award-item">
          <img src={mundus} alt="Mundus Vini" className="award-logo" />
          <div className="award-medals">
            <div className="medal">
              <img src={silverMedal} alt="Medalha de Prata" />
              <span>2023</span>
            </div>
            <div className="medal">
              <img src={bronzeMedal} alt="Medalha de Bronze" />
              <span>2022</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="featured-award" ref={featuredRef}>
        <div className="featured-wine">
          <img src={reservaBottle} alt="Casttêdo Valley Reserva" className="wine-bottle" />
          <div className="wine-info">
            <h3 className="wine-title">CASTTÊDO VALLEY RESERVA 2019</h3>
            <div className="award-badge">
              <img src={goldMedal} alt="Medalha de Ouro" className="featured-medal" />
              <span className="award-name">Decanter World Wine Awards 2023</span>
            </div>
            <p className="wine-notes">
              "Aromas intensos de frutos vermelhos maduros, especiarias e notas balsâmicas. 
              Na boca apresenta-se elegante, com taninos sedosos e um final longo e persistente. 
              Um vinho com excelente estrutura e potencial de guarda."
            </p>
            <div className="rating">
              <div className="stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="rating-value">95 pontos</span>
            </div>
          </div>
        </div>
        
        <a href="/awards" className="view-all-awards">
          VER TODOS OS PRÊMIOS
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
};

export default AwardsSection;