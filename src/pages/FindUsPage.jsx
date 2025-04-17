// FindUsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/FindUsPage.css";
import vineyard from "../assets/douro-1.jpg"; // Assumindo que existe esta imagem
// Importar imagens de exemplo para os estabelecimentos (você precisará ter essas imagens)
import restaurantImage from "../assets/test-gray-1.png"; // Exemplo
import retailerImage from "/images/garrafeira-fgp-1.jpg"; // Exemplo
import wineshopImage from "/images/garrafeira-fgp-1.jpg"; // Exemplo
import hotelImage from "../assets/test-gray-1.png"; // Exemplo
// Importar ícones do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const FindUsPage = () => {
  const [activeRegion, setActiveRegion] = useState("todas");
  const [availableRegions, setAvailableRegions] = useState([]);
  const pageRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Todos os filtros possíveis (mantido para referência de rótulos)
  const allFilters = [
    { id: "all", label: "Todos" },
    { id: "restaurant", label: "Restaurantes" },
    { id: "retailer", label: "Revendedores" },
    { id: "wineshop", label: "Garrafeiras" },
    { id: "hotel", label: "Hotéis" }
  ];
  
  // Regiões do país - será filtrado para mostrar apenas as que têm estabelecimentos
  const allRegions = [
    { id: "norte", name: "Norte" },
    { id: "centro", name: "Centro" },
    { id: "lisboa", name: "Lisboa" },
    { id: "oeste", name: "Oeste" },
    { id: "alentejo", name: "Alentejo" },
    { id: "algarve", name: "Algarve" },
    { id: "madeira", name: "Madeira" },
    { id: "acores", name: "Açores" },
    { id: "todas", name: "Todas" } // Movido para o final
  ];
  
  // Função para obter imagem principal baseada nos tipos de estabelecimento
  const getMainImageByTypes = (types) => {
    // Prioridade: 1. wineshops, 2. retailers, 3. restaurants, 4. hotels
    if (types.includes("wineshop")) return wineshopImage;
    if (types.includes("retailer")) return retailerImage;
    if (types.includes("restaurant")) return restaurantImage;
    if (types.includes("hotel")) return hotelImage;
    return retailerImage; // Imagem padrão
  };
  
  // Dados dos locais (exemplo)
  const locations = [
    {
        id: 1,
        name: "Garrafeira FGP",
        types: ["wineshop", "retailer"],
        region: "oeste",
        address: "Rua Gil Eanes, 33, Bombarral",
        contact: "+351 262 287 201",
        email: "garrafeira@fgp.pt",
        website: "https://www.fgp.pt/store/",
        image: "/images/garrafeira-fgp-1.jpg",
        instagram: "https://www.instagram.com/garrafeirafgp/",
        facebook: "https://www.facebook.com/GarrafeiraFGP",
        products: []
      },
      {
        id: 2,
        name: "MyWines",
        types: ["retailer"],
        region: "lisboa",
        address: null,
        contact: "+351 965 056 114",
        email: null,
        website: null,
        image: "/images/my-wines-3.png",
        instagram: "https://www.instagram.com/mywinesportugal",
        facebook: "https://www.facebook.com/mywinesportugal",
        products: []
      },
      {
        id: 3,
        name: "À do Nuno",
        types: ["restaurant"],
        region: "algarve",
        address: "N125, Cxp 214, 8135-032, Vale da Venda, Almancil, Loulé",
        contact: "+351 915 859 414",
        email: null,
        website: null,
        image: "/images/a-do-nuno-2.png",
        instagram: "https://www.instagram.com/adonuno/",
        facebook: "https://www.facebook.com/adonuno.pt/?locale=pt_BR",
        products: []
      },
      {
        id: 4,
        name: "Pastor Wine",
        types: ["retailer"],
        region: "algarve",
        address: null,
        contact: "+351 938 214 850",
        email: "info@pastorwine.pt",
        website: "https://www.pastorwine.pt/pt/",
        image: "/images/pastor-wine-4.png",
        instagram: "https://www.instagram.com/pastorwine/",
        facebook: null,
        products: []
      },
      {
        id: 5,
        name: "Field Blend",
        types: ["retailer", "wineshop"],
        region: "madeira",
        address: "Estrada da Boa Nova 76E, Funchal",
        contact: null,
        email: "info@fieldblend.pt",
        website: "http://www.fieldblend.pt/",
        image: "/images/field-blend-2.png",
        instagram: "https://www.instagram.com/field.blend/",
        facebook: "https://www.facebook.com/profile.php?id=100089206597347&locale=pt_BR",
        products: []
      },
      {
        id: 6,
        name: "Do Norte",
        types: ["restaurant"],
        region: "lisboa",
        address: "Avenida 25 de Abril, 5, Leceia, Oeiras",
        contact: "+351 938 374 616",
        email: null,
        website: null,
        image: "/images/do-norte-1.jpg",
        instagram: "https://www.instagram.com/donorte.restaurante/",
        facebook: "https://www.facebook.com/profile.php?id=61572728714889&locale=pt_BR",
        products: []
      }
  ];

  // Função para determinar quais regiões têm estabelecimentos
  const getAvailableRegions = () => {
    // Obter todas as regiões que têm pelo menos um estabelecimento
    const regionsWithLocations = new Set(locations.map(location => location.region));
    
    // Filtrar a lista de regiões para incluir apenas as que têm estabelecimentos, mais a opção "todas"
    return allRegions.filter(region => 
      region.id === "todas" || regionsWithLocations.has(region.id)
    );
  };
  
  // Inicializar as regiões disponíveis quando o componente montar
  useEffect(() => {
    setAvailableRegions(getAvailableRegions());
  }, []);
  
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
    
    if (pageRef.current) {
      observer.observe(pageRef.current);
    }
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calcular estilo parallax
  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.4}px)`
  };

  // Filtrar locais por região
  const filteredLocations = locations.filter(location => {
    return (activeRegion === "todas" || location.region === activeRegion);
  });

  // Renderiza os tipos de estabelecimento
  const renderLocationTypes = (locationTypes) => {
    if (locationTypes.length === 1) {
      // Se só tem um tipo, mostrar o label desse tipo
      return allFilters.find(f => f.id === locationTypes[0])?.label;
    } else {
      // Se tem múltiplos tipos, mostrar uma lista separada por "/"
      return locationTypes
        .map(type => allFilters.find(f => f.id === type)?.label)
        .join(" / ");
    }
  };

  // Função para mudar a região
  const handleRegionChange = (regionId) => {
    setActiveRegion(regionId);
  };

  return (
    <div className="find-us-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="find-us-hero parallax-scroll">
        <div className="find-us-container parallax-bg" style={parallaxStyle}>
          <img 
            src={vineyard} 
            alt="Vinhedos Casttêdo Valley" 
            className="find-us-image"
          />
        </div>
        <div className="find-us-overlay">
          <h1 className="find-us-title">ONDE ENCONTRAR</h1>
          <p className="find-us-subtitle">DESCUBRA ONDE DESFRUTAR DOS NOSSOS PRODUTOS</p>
          <p className="find-us-tagline">
            Explore os lugares selecionados onde pode encontrar os vinhos e azeites Casttêdo Valley. 
            Uma presença marcada pela qualidade e exclusividade em alguns dos melhores 
            estabelecimentos do país.
          </p>
        </div>
        <div className="find-us-scroll">
          <span className="scroll-text">DESCUBRA</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* Conteúdo da página */}
      <div className="find-us-content">
        <div className="find-us-intro">
          <h2>A NOSSA PRESENÇA</h2>
          <div className="find-us-separator"></div>
          <p>
            Os vinhos e azeites Casttêdo Valley estão disponíveis em estabelecimentos 
            cuidadosamente selecionados, que partilham os nossos valores de excelência e tradição. 
            Descubra onde pode encontrar os nossos produtos pelo país, desde restaurantes 
            premiados a garrafeiras especializadas.
          </p>
        </div>

        {/* Seletor de região - apenas regiões com estabelecimentos + "todas" no fim */}
        <div className="region-selector">
          <h3>SELECIONE A SUA REGIÃO</h3>
          <div className="region-tabs">
            {availableRegions.map(region => (
              <button 
                key={region.id}
                className={`region-tab ${activeRegion === region.id ? 'active' : ''}`}
                onClick={() => handleRegionChange(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de locais */}
        <div className="locations-container">
          {filteredLocations.length > 0 ? (
            filteredLocations.map(location => (
              <div className="location-card" key={location.id}>
                <div className="location-image-container">
                  <img 
                    src={location.image || getMainImageByTypes(location.types)} 
                    alt={location.name} 
                    className="location-image"
                  />
                </div>
                <div className="location-header">
                  <h3 className="location-name">{location.name}</h3>
                  <span className="location-type">
                    {renderLocationTypes(location.types)}
                  </span>
                </div>
                <div className="location-details">
                  {location.address && (
                    <p className="location-address">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {location.address}
                    </p>
                  )}
                  {location.contact && (
                    <p className="location-contact">
                      <FontAwesomeIcon icon={faPhone} /> {location.contact}
                    </p>
                  )}
                  {location.email && (
                    <p className="location-email">
                      <FontAwesomeIcon icon={faEnvelope} /> {location.email}
                    </p>
                  )}
                  {location.website && (
                    <p className="location-website">
                      <FontAwesomeIcon icon={faGlobe} /> 
                      <a href={location.website} target="_blank" rel="noopener noreferrer">
                        {location.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </p>
                  )}
                  
                  {/* Social Media Icons */}
                  <div className="location-social">
                    {location.instagram && (
                      <a 
                        href={location.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon instagram"
                        title="Instagram"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                    {location.facebook && (
                      <a 
                        href={location.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon facebook"
                        title="Facebook"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-locations">
              <p>Não encontrámos locais com os critérios selecionados.</p>
              <p>Por favor, tente outra região.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUsPage;