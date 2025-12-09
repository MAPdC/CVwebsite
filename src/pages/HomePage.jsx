import "../styles/HomePage.css";
import HeritageSection from "../components/HeritageSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import WineCarousel from "../components/WineCarousel.jsx";
import OliveOilCarousel from "../components/OliveOilCarousel.jsx";

import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/douro-1-tiny.jpg";
import logoBranco from "../assets/cv-logo-branco.png";

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
            alt="Vista panorâmica do Vale do Douro" 
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

      {/* História & Heritage Section */}
      <HeritageSection />

      {/* Wine Carousel */}
      <WineCarousel />

      {/* Olive Oil Carousel */}
      <OliveOilCarousel />

      {/*
      <TerroirSection /> 
      */}
    
      {/* Awards Section */}
      <AwardsSection />
      
      {/*
      <TestimonialsSection />
      */}

    </div>
  );
};

export default HomePage;