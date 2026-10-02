import { useEffect, useRef } from "react";

// Adiciona a classe "is-revealed" ao elemento quando entra no ecrã e retira-a quando sai,
// para o efeito de revelação Camuflado (.camuflado-reveal) se repetir a cada passagem.
export default function useReveal(threshold = 0.6) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      entry.target.classList.toggle("is-revealed", entry.isIntersecting);
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
