import { useEffect, useRef, useState } from "react";

// true a partir do momento em que o elemento entra no ecrã (uma só vez): para as secções
// que aparecem com um fade. Uso: const [ref, inView] = useInView(); <section ref={ref} className={inView ? "visible" : ""}>
// (o efeito Camuflado, que se repete a cada passagem, está em useReveal.js)
export default function useInView({ threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
