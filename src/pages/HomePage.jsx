import "../styles/HomePage.css";
{/*import FeaturedProducts from "../components/FeaturedProducts.jsx";*/}
import HeritageSection from "../components/HeritageSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import TerroirSection from "../components/TerroirSection.jsx";
import WineCarousel from "../components/WineCarousel.jsx";
import OliveOilCarousel from "../components/OliveOilCarousel.jsx";

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

  // Function to handle author click
  const handleAuthorClick = (event) => {
    window.open('https://pt.wikipedia.org/wiki/Ant%C3%B3nio_Cabral_(escritor)', '_blank', 'noopener,noreferrer');
    // Remove focus after click to avoid the selection box when returning
    event.target.blur();
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
          <span className="transition-quote">"Aqui, Douro. O Paraíso do vinho e do suor."</span>
          <span className="transition-author">
            <span 
              className="author-link" 
              onClick={handleAuthorClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAuthorClick(e);
                }
              }}
            >
              António Joaquim Magalhães Cabral, Aqui, Douro (1979)
            </span>
          </span>
        </div>
      </div>

      {/* História & Heritage Section */}
      <HeritageSection />

      {/* FeaturedProducts com animação */}
      {/*
      <div ref={featuredProductsRef}>
        <FeaturedProducts />
      </div>
      */}

      {/* Wine Carousel */}
      <WineCarousel />

      {/* Olive Oil Carousel */}
      <OliveOilCarousel />

      {/*Terroir Section */}
      <TerroirSection />
    
      {/* Awards Section */}
      <AwardsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

    </div>
  );
};

export default HomePage;