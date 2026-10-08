import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// A cada mudança de página: volta ao topo e põe o foco no <main>, para o leitor de ecrã
// anunciar a página nova. Não mexe no 1.º carregamento nem em links para âncoras (#secção).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    document.getElementById("conteudo")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}
