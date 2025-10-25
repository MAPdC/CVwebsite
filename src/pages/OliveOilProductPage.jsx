// src/pages/OliveOilProductPage.jsx
import { useParams } from "react-router-dom";
// Importar dados de azeites e vinhos (para produtos relacionados mistos, se desejar)
import { oliveOils, wines } from "../mocks/products";
// Importar o novo componente de detalhe
import OliveOilProductDetail from "../components/OliveOilProductDetail";
// Importar componente de produtos relacionados (reutilizado)
import RelatedProducts from "../components/RelatedProducts";
// Importar o CSS do WineProductDetail serve como base, mas pode criar um específico se precisar
import "../styles/WineProductDetail.css"; // Reutiliza estilos gerais da página de produto

const OliveOilProductPage = () => {
  const { slug } = useParams(); // Obtém o slug da URL

  // Encontrar o azeite atual usando o slug
  const currentProduct = oliveOils.find((oil) => oil.slug === slug);

  // Se o azeite não for encontrado, exibe mensagem
  if (!currentProduct) {
    return (
        <div style={{ padding: '120px 20px', textAlign: 'center' }}>
            <h2>Azeite não encontrado</h2>
            <p>O produto que procura pode não existir ou ter sido movido.</p>
            <Link to="/portfolio/olive-oils">Voltar ao Portefólio de Azeites</Link>
        </div>
    );
  }

  // Filtrar produtos relacionados:
  // Opção 1: Apenas outros azeites
  const relatedOliveOils = oliveOils.filter(
    (oil) => oil.slug !== currentProduct.slug // Exclui o azeite atual
  ).slice(0, 3); // Limita a 3 produtos

  // Opção 2: Misturar azeites e vinhos (exemplo)
  // const relatedWines = wines.slice(0, 2); // Pega 2 vinhos
  // const relatedOtherOils = oliveOils.filter(oil => oil.slug !== currentProduct.slug).slice(0, 1); // Pega 1 outro azeite
  // const mixedRelatedProducts = [...relatedOtherOils, ...relatedWines];

  // Escolher a lógica de produtos relacionados que preferir
  const relatedProducts = relatedOliveOils; // Usando apenas outros azeites

  // Adapta os produtos relacionados para o formato esperado por RelatedProducts (se necessário)
  // O componente RelatedProducts espera 'slug' e 'images[0]' para o Link e a Imagem.
  // Como tanto vinhos quanto azeites agora têm esses campos, deve funcionar diretamente.

  return (
    // Usar uma classe geral para a página se necessário estilizar a página em si
    <div className="oil-product-page">
      {/* Renderiza o componente de detalhe com o azeite encontrado */}
      <OliveOilProductDetail product={currentProduct} />

      {/* Renderiza a secção de produtos relacionados */}
      {/* O título pode ser personalizado */}
      <RelatedProducts products={relatedProducts} title="Explore Outros Azeites" />
      {/* Ou se usar misto: <RelatedProducts products={mixedRelatedProducts} title="Pode Também Gostar" /> */}
    </div>
  );
};

export default OliveOilProductPage;