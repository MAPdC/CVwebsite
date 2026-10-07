import { useParams } from "react-router-dom";
import { camufladoProducts } from "../mocks/camufladoProducts";
import WineProductDetail from "../components/WineProductDetail";
import RelatedProducts from "../components/RelatedProducts";
import NotFoundPage from "./NotFoundPage";
import useReveal from "../hooks/useReveal";
import { localizeProduct, useLang } from "../i18n";
import "../styles/CamufladoProductPage.css";

const CamufladoProductPage = () => {
  const { slug } = useParams();
  const revealRef = useReveal();
  const { lang } = useLang();

  const currentProduct = localizeProduct(camufladoProducts.find((p) => p.slug === slug), lang);

  if (!currentProduct) return <NotFoundPage />;

  // Os outros vinhos Camuflado
  const relatedProducts = camufladoProducts.filter((p) => p.slug !== currentProduct.slug);

  const animal = (
    <img
      ref={revealRef}
      src={currentProduct.animalLogo}
      alt={currentProduct.animal}
      className="camuflado-product__animal camuflado-reveal"
    />
  );

  return (
    <div
      className="wine-page theme-camuflado camuflado-product"
      style={{ "--camuflado-accent": `var(--camuflado-accent-${currentProduct.accent})` }}
    >
      <WineProductDetail
        product={currentProduct}
        basePath="/camuflado"
        baseLabel="Camuflado"
        heroAddon={animal}
      />
      <RelatedProducts
        products={relatedProducts}
        title={lang === "en" ? "More from Camuflado" : "Outros Camuflados"}
        basePath="/camuflado"
      />
    </div>
  );
};

export default CamufladoProductPage;
