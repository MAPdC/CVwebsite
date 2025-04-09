import React, { useEffect, useRef, useState } from "react";
import "../styles/TestimonialsSection.css";
import client1 from "../assets/client-3-mudar.jpg";
import client2 from "../assets/client-2-mudar.jpg";
import client3 from "../assets/client-1-mudar.jpg";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Marcelo Rebelo",
      role: "Sommelier, Hotel Vintage Porto",
      image: client1,
      quote: "O Casttêdo Reserva é um exemplo extraordinário do potencial do Douro. Apresenta complexidade, elegância e uma identidade única que reflete perfeitamente o terroir duriense. Um vinho que tenho orgulho em recomendar aos nossos hóspedes mais exigentes."
    },
    {
      id: 2,
      name: "Sofia Mendes",
      role: "Chef, Restaurante Terra",
      image: client2,
      quote: "Os vinhos da Casttêdo Valley tornaram-se essenciais na minha carta. A sua versatilidade gastronómica e o equilíbrio perfeito entre tradição e modernidade fazem deles parceiros ideais para a minha cozinha, que valoriza os produtos locais e sazonais."
    },
    {
      id: 3,
      name: "António Pereira",
      role: "Crítico de Vinhos",
      image: client3,
      quote: "Casttêdo Valley representa o que há de melhor no novo Douro: respeito pela tradição aliado a técnicas modernas de vinificação. O resultado são vinhos de grande carácter, precisão e frescura, que expressam genuinamente a singularidade das suas vinhas centenárias."
    }
  ];

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
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
    
    // Auto slide functionality can be added here if desired
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-background"></div>
      
      <div className="section-header">
        <div className="section-line"></div>
        <h2 className="section-title">EXPERIÊNCIAS</h2>
        <div className="section-line"></div>
      </div>
      
      <div className="testimonials-container">
        <div className="testimonials-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div className="testimonial-slide" key={testimonial.id}>
              <div className="testimonial-content">
                <div className="quote-symbol">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-image-container">
                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="slider-arrow prev" onClick={prevSlide}>
          <span>←</span>
        </button>
        <button className="slider-arrow next" onClick={nextSlide}>
          <span>→</span>
        </button>
        
        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;