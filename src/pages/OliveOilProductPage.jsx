import { useParams } from "react-router-dom";
import { oliveOils } from "../mocks/products";
import OliveOilProductDetail from "../components/OliveOilProductDetail";
import RelatedProducts from "../components/RelatedProducts";
import NotFoundPage from "./NotFoundPage";
import { localizeProduct, useLang } from "../i18n";

const OliveOilProductPage = () => {
  const { slug } = useParams();
  const { lang } = useLang();

  const currentProduct = oliveOils.find((oil) => oil.slug === slug);

  if (!currentProduct) return <NotFoundPage />;

  // Os outros azeites (a secção não aparece enquanto houver só um)
  const relatedProducts = oliveOils.filter((oil) => oil.slug !== currentProduct.slug).slice(0, 3);

  return (
    <div className="oil-product-page">
      <OliveOilProductDetail product={localizeProduct(currentProduct, lang)} />
      <RelatedProducts
        products={relatedProducts}
        title={lang === "en" ? "Explore other olive oils" : "Explore outros azeites"}
        basePath="/portfolio/olive-oils"
      />
    </div>
  );
};

export default OliveOilProductPage;
