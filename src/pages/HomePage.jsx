import "../styles/HomePage.css";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import HeritageSection from "../components/HeritageSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";

import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/douro-1.jpg";
import logoBranco from "../assets/cv-logo-branco.png";

const HomePage = () => {
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
  const featuredProductsRef = useRef(null);
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
          <div className="hero-logo">
            <img 
              src={logoBranco} 
              alt="Casttêdo Valley Logo" 
              className="hero-logo-image"
            />
          </div>
          <h1 className="hero-title">CASTTÊDO VALLEY</h1>
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
      <div ref={featuredProductsRef}>
        <FeaturedProducts />
      </div>
      
      {/* História & Heritage Section */}
      <HeritageSection />
    
      {/* Awards Section */}
      <AwardsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

    </div>
  );
};

export default HomePage;