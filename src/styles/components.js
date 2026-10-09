// CSS dos componentes e páginas, todos no bundle principal e por esta ordem.
// As páginas são carregadas à parte (React.lazy em App.jsx), mas o CSS fica aqui: vários ficheiros
// partilham nomes de classes (ex.: .catalog-hero, .filter-btn) e o resultado depende da ordem.
// Nas páginas de portefólio essas classes estão limitadas à raiz (.wine-catalog / .oil-catalog):
// sem isso o CSS do azeite, carregado depois, mudava a cor e o hover dos filtros dos vinhos.
// Ao criar um componente com CSS próprio, acrescentar o import aqui (não no componente).
import "./Header.css";
import "./LanguageSwitch.css";
import "./Footer.css";
import "./HomePage.css";
import "./HeritageSection.css";
import "./CamufladoSection.css";
import "./AwardsSection.css";
import "./WineCarousel.css";
import "./OliveOilCarousel.css";
import "./ContactPage.css";
import "./PrivacyPage.css";
import "./NotFoundPage.css";
import "./WinePortfolioPage.css";
import "./OliveOilPortfolioPage.css";
import "./WineDetail.css";
import "./RelatedProducts.css";
import "./OliveOilDetail.css";
import "./UnderConstructionPage.css";
import "./CamufladoLandingPage.css";
import "./CamufladoProductPage.css";
