import { useCallback, useEffect, useRef, useState } from "react";

// Copia texto para a área de transferência e devolve o resultado, para mostrar uma confirmação
// discreta (em vez de alert). status: null | "ok" | "error"; volta a null passados alguns segundos.
export default function useCopy(timeout = 3000) {
  const [status, setStatus] = useState(null);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (value) => {
    try {
      // navigator.clipboard só existe em HTTPS ou localhost
      if (!navigator.clipboard) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(value);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), timeout);
  }, [timeout]);

  return { copy, status };
}
