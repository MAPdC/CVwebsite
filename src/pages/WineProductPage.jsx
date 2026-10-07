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

  // Produtos relacionados: alterna vinhos disponíveis e de coleção, com os do mesmo tipo (tinto/branco) primeiro
  const others = wines.filter((p) => p.slug !== currentProduct.slug);
  const sameTypeFirst = (list) =>
    [...list].sort((a, b) => (b.type === currentProduct.type) - (a.type === currentProduct.type));
  const available = sameTypeFirst(others.filter((p) => p.onmarket));
  const collection = sameTypeFirst(others.filter((p) => !p.onmarket));

  const relatedProducts = [];
  for (let i = 0; relatedProducts.length < 3 && (i < available.length || i < collection.length); i++) {
    if (available[i]) relatedProducts.push(available[i]);
    if (collection[i]) relatedProducts.push(collection[i]);
  }
  relatedProducts.splice(3);

  return (
    <div className="wine-page">
      <WineProductDetail product={localizeProduct(currentProduct, lang)} />
      <RelatedProducts products={relatedProducts} showStatus />
    </div>
  );
};

export default WineProductPage;
