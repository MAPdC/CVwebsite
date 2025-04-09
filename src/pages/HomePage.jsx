import "../styles/HomePage.css";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import HeritageSection from "../components/HeritageSection.jsx";
import TerroirSection from "../components/TerroirSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import SustainabilitySection from "../components/SustainabilitySection.jsx";
import ContactCTA from "../components/ContactCTA.jsx";


import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/douro-1.jpg";

const HomePage = () => {
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
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
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      if (transitionRef.current) {
        observer.unobserve(transitionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax transform
  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.4}px)`
  };

  return (
    <div className="home">
      {/* Hero Section with Parallax */}
      <section className="hero parallax-scroll" ref={heroRef}>
        <div className="hero-container parallax-bg" style={parallaxStyle}>
          <img 
            src={heroImage} 
            alt="Vista panorâmica do Casttêdo Valley" 
            className="hero-image"
          />
        </div>
        <div className="hero-overlay">
          <h1 className="hero-title">CASTTÊDO VALLEY</h1>
          <p className="hero-subtitle">TRADIÇÃO EM CADA GOTA</p>
          <p className="hero-tagline">
            "Da essência de um terroir único, nascem vinhos com personalidade única.
            Entre vinhas cuidadosamente selecionadas e técnicas herdadas de gerações 
            aliadas às novas tecnologias, criamos vinhos que contam a história da nossa 
            família e da nossa terra."
          </p>
          <a href="/portfolio" className="hero-button">DESCUBRA</a>
        </div>
        <div className="hero-year">
          <span className="hero-line"></span>
          DESDE 1873
          <span className="hero-line"></span>
        </div>
      </section>

      {/* Transition Element */}
      <div className="hero-transition" ref={transitionRef}>
        <div className="transition-content">
          <span className="transition-quote">"O vinho é poesia engarrafada"</span>
          <span className="transition-author">- Robert Louis Stevenson</span>
        </div>
      </div>

      {/* FeaturedProducts com animação */}
      <FeaturedProducts />
      
      {/* História & Heritage Section */}
      <HeritageSection />
      
      {/* Terroir & Processo Section */}
      <TerroirSection />
      
      {/* Awards Section */}
      <AwardsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Sustainability Section */}
      <SustainabilitySection />
      
      {/* Contact CTA Section */}
      <ContactCTA />

    </div>
  );
};

export default HomePage;