import { useEffect, useRef, useState } from "react";
import { getPackshotTransform } from "../utils/packshotTransform";

// Galeria das páginas de produto (vinhos, azeites e Camuflado): imagem grande e miniaturas.
// A primeira imagem é a garrafa (packshot), ampliada para ocupar o painel; as outras são fotografias.
// labels: { gallery, viewImage(n), image(n), noImage } no idioma da página
// note: texto opcional por cima da imagem (ex.: "Imagem ilustrativa")
function ProductGallery({ images: allImages, alt, labels, note = null, resetKey }) {
  const images = (allImages || []).filter((url) => typeof url === "string" && url.trim() !== "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [packshotTransform, setPackshotTransform] = useState(null);
  const imageRef = useRef(null);

  // Outro produto: volta à primeira imagem (o scroll para o topo é feito pelo ScrollToTop)
  useEffect(() => {
    setActiveIndex(0);
    setPackshotTransform(null);
  }, [resetKey]);

  // Zoom da garrafa (só na primeira imagem); recalculado quando a janela muda de tamanho
  const updatePackshot = () => {
    const img = imageRef.current;
    if (activeIndex !== 0 || !img || !img.complete) return;
    try {
      setPackshotTransform(getPackshotTransform(img));
    } catch {
      setPackshotTransform(null); // sem acesso aos píxeis: mostra a imagem tal como está
    }
  };

  useEffect(() => {
    updatePackshot(); // imagem já em cache: o onLoad pode ter disparado antes
    window.addEventListener("resize", updatePackshot);
    return () => window.removeEventListener("resize", updatePackshot);
  }, [activeIndex, resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const isPackshot = activeIndex === 0;
  const mainImage = images[activeIndex];

  return (
    <aside className="wd-media">
      <div className={`wd-media__stage ${isPackshot ? "wd-media__stage--packshot" : "wd-media__stage--photo"}`}>
        {mainImage ? (
          <img
            key={mainImage}
            src={mainImage}
            alt={isPackshot ? alt : `${alt} — ${labels.image(activeIndex + 1)}`}
            ref={imageRef}
            className="wd-media__image"
            onLoad={updatePackshot}
            style={isPackshot && packshotTransform ? { "--crop": packshotTransform } : undefined}
          />
        ) : (
          <span className="wd-media__placeholder">{labels.noImage}</span>
        )}
      </div>

      {note && mainImage && <p className="wd-media__note">{note}</p>}

      {images.length > 1 && (
        <div className="wd-thumbs" role="group" aria-label={labels.gallery}>
          {images.map((imageUrl, index) => (
            <button
              type="button"
              key={imageUrl}
              className={`wd-thumb ${index === activeIndex ? "wd-thumb--active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={labels.viewImage(index + 1)}
              aria-pressed={index === activeIndex}
            >
              <img src={imageUrl} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default ProductGallery;
