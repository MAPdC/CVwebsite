import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/OliveOilPortfolioPage.css";
import heroBackground from '../assets/oliveira-1.jpg'; // Presumo que queira manter esta imagem de fundo
// Importa os dados reais do ficheiro products.js
import { oliveOils as productsData } from "../mocks/products";

// Ícones para elementos visuais
import { FaLeaf, FaSearch } from "react-icons/fa";

function OliveOilPortfolioPage() {
  // Renomeado para oilList para consistência com 'wines' na outra página
  const [oilList, setOilList] = useState([]);
  const [loading, setLoading] = useState(true);
  // O filtro agora pode ser baseado noutra propriedade se 'type' não for adequado
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Agora usamos os dados do arquivo products.js
    const loadOils = () => {
      setLoading(true);

      // Mapeamos os dados do arquivo products.js para o formato necessário
      // Adicionamos/adaptamos os campos conforme a estrutura em products.js
      const formattedOils = productsData.map(oil => ({
        id: oil.id, // Usar o ID numérico
        slug: oil.slug, // Usar o slug existente
        name: oil.name,
        // 'year' não existe nos dados do azeite em products.js, removemos ou deixamos em branco
        // type: oil.type, // O 'type' em products.js é "Virgem Extra", talvez não sirva para filtrar como antes (Intenso/Médio/Suave)
        // Adaptar o 'type' para filtro ou usar outra propriedade? Por agora, vamos usar 'organic' e 'lateHarvest' para filtros
        category: "Azeite Virgem Extra", // Categoria genérica ou adaptar se houver mais info
        briefDescription: oil.briefDescription, // Usar briefDescription
        varieties: oil.varieties,
        // A imagem em products.js parece estar num array, usamos a primeira
        image: oil.images && oil.images.length > 0 ? oil.images[0] : "/placeholder-image.png", // Usar placeholder se não houver imagem
        // 'price' não existe nos dados, removemos
        onmarket: oil.onmarket,
        soldout: oil.soldout,
        organic: oil.organic,
        lateHarvest: oil.lateHarvest,
        // 'highlighted' não existe, removemos a lógica de ordenação baseada nele ou adaptamos
        awards: oil.awards || [] // Adicionamos prémios se existirem
      }));

      // Simular carregamento
      setTimeout(() => {
        setOilList(formattedOils);
        setLoading(false);
      }, 600);
    };

    loadOils();
    window.scrollTo(0, 0);
  }, []);

  // Filtrar azeites
  const filteredOils = oilList.filter(oil => {
    // Adaptação do filtro: 'all', 'organic', 'lateHarvest'
    const matchesFilter = filter === "all" ||
                          (filter === "organic" && oil.organic) ||
                          (filter === "lateHarvest" && oil.lateHarvest);

    const matchesSearch = oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          oil.varieties.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
                          // Não podemos pesquisar por ano
    return matchesFilter && matchesSearch;
  });

  // Ordenar: Disponíveis primeiro, depois talvez por nome? (Removido 'highlighted')
  const sortedOils = [...filteredOils].sort((a, b) => {
    if (a.onmarket && !b.onmarket) return -1;
    if (!a.onmarket && b.onmarket) return 1;
    if (a.soldout && !b.soldout) return 1; // Esgotados no fim
    if (!a.soldout && b.soldout) return -1;
    return a.name.localeCompare(b.name); // Ordenar alfabeticamente como fallback
  });

  // Função para definir a cor do indicador (removida ou adaptada, pois 'type' mudou)
  // Poderíamos basear na acidez se estivesse disponível num formato comparável

  return (
    <>
      <main className="oil-catalog">
        {/* Hero Section Mantida */}
        <div className="catalog-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="catalog-hero__content">
            <h1 className="catalog-hero__title">Pureza.</h1>
            <p className="catalog-hero__subtitle">A essência do campo e a tradição centenária em cada gota de azeite</p>
          </div>
        </div>

        <div className="catalog-content">
          {/* Filtros Adaptados */}
          <div className="catalog-filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Procurar por nome ou variedade..." // Removido 'ano'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botões de Filtro Adaptados */}
            <div className="filter-options">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              <button
                className={`filter-btn ${filter === "organic" ? "active" : ""}`}
                onClick={() => setFilter("organic")}
              >
                Biológico
              </button>
              <button
                className={`filter-btn ${filter === "lateHarvest" ? "active" : ""}`}
                onClick={() => setFilter("lateHarvest")}
              >
                Colheita Tardia
              </button>
              {/* Remover/Adaptar filtros Intenso/Médio/Suave se não aplicável */}
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="elegant-loader"></div>
            </div>
          ) : (
            <>
              <div className="results-count">
                {sortedOils.length} {sortedOils.length === 1 ? "azeite" : "azeites"} encontrados
              </div>

              {/* Grid de Azeites Adaptada */}
              <div className="oil-grid">
                {sortedOils.map((oil) => (
                  // O Link agora usa o 'slug'
                  <Link to={`/portfolio/olive-oils/${oil.slug}`} className="oil-card" key={oil.id}>
                    <div className="oil-card__image-container">
                      <img src={oil.image} alt={oil.name} className="oil-card__image" />
                      {/* Badges para Biológico e Colheita Tardia */}
                      {oil.organic && (
                        <div className="oil-card__badge oil-card__badge--organic">Biológico</div>
                      )}
                       {/* Badge para Esgotado ou Disponível */}
                       {!oil.onmarket && oil.soldout && (
                         <div className="oil-card__badge oil-card__badge--soldout">Esgotado</div>
                       )}
                       {oil.lateHarvest && !oil.organic && ( // Só mostra se não for biológico para não sobrepor
                         <div className="oil-card__badge oil-card__badge--lateharvest">Colheita Tardia</div>
                       )}
                       {oil.onmarket && !oil.soldout && !oil.organic && !oil.lateHarvest && (
                         <div className="oil-card__badge oil-card__badge--available">Disponível</div>
                       )}
                       {/* Adicionar badge para prémios se existirem? */}
                    </div>

                    <div className="oil-card__content">
                      <div className="oil-card__header">
                        <h2 className="oil-card__name">{oil.name.replace(/\|/g, '')}</h2> {/* Remove a barra vertical se existir */}
                        {/* Remover oil.year se não existir */}
                      </div>

                      <div className="oil-card__category">
                        {/* Indicador de cor removido ou adaptado */}
                        {/* <span className="oil-type-indicator" style={{ backgroundColor: getTypeColor(oil.type) }}></span> */}
                        {oil.category} {/* Usar a categoria definida */}
                      </div>

                      <p className="oil-card__description">{oil.briefDescription}</p>

                      <div className="oil-card__footer">
                        <div className="oil-card__varieties">
                          <FaLeaf className="variety-icon" />
                          <span>{oil.varieties.slice(0, 2).join(", ")}{oil.varieties.length > 2 ? "..." : ""}</span>
                        </div>
                        {/* Preço removido */}
                        {/* <div className="oil-card__price">{oil.price}</div> */}
                      </div>

                      <div className="oil-card__cta">
                        <span>Ver Detalhes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {sortedOils.length === 0 && (
                <div className="no-results">
                  <h3>Nenhum azeite encontrado</h3>
                  <p>Tente uma busca diferente ou remova os filtros.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default OliveOilPortfolioPage;