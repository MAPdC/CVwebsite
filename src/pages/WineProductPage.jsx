import { useParams } from "react-router-dom";
import { wines } from "../mocks/products";
import WineProductDetail from "../components/WineProductDetail";
import RelatedProducts from "../components/RelatedProducts";
import NotFoundPage from "./NotFoundPage";
import { localizeProduct, useLang } from "../i18n";

const WineProductPage = () => {
  const { slug } = useParams();
  const { lang } = useLang();

  // Encontrar o vinho atual
  const currentProduct = wines.find((p) => p.slug === slug);

  if (!currentProduct) return <NotFoundPage />;

  // Filtrar produtos relacionados (exemplo: mesma categoria, exceto o atual)
  const relatedProducts = wines.filter(
    (p) =>
      (p.category === currentProduct.category || p.type === currentProduct.type) &&
      p.slug !== currentProduct.slug
  ).slice(0, 3);

  return (
    <div className="wine-page">
      <WineProductDetail product={localizeProduct(currentProduct, lang)} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default WineProductPage;
