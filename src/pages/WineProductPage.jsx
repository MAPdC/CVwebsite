import { useParams } from "react-router-dom";
import { wines } from "../mocks/products";
import WineProductDetail from "../components/WineProductDetail";
import RelatedProducts from "../components/RelatedProducts";

const WineProductPage = () => {
  const { slug } = useParams();

  // Encontrar o vinho atual
  const currentProduct = wines.find((p) => p.slug === slug);

  if (!currentProduct) return <p>Produto não encontrado.</p>;

  // Filtrar produtos relacionados (exemplo: mesma categoria, exceto o atual)
  const relatedProducts = wines.filter(
    (p) =>
      (p.category === currentProduct.category || p.type === currentProduct.type) &&
      p.slug !== currentProduct.slug
  ).slice(0, 4);

  return (
    <div className="wine-page">
      <WineProductDetail product={currentProduct} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default WineProductPage;
