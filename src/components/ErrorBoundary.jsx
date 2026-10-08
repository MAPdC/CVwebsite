import { Component } from "react";

const RELOAD_KEY = "cv-reload-after-chunk-error"; // hora (ms) do último recarregamento automático

// Depois de um novo deploy, os ficheiros JS antigos de cada página deixam de existir:
// quem tinha o site aberto recebe este erro ao mudar de página. Recarregar resolve.
const isChunkLoadError = (error) =>
  /dynamically imported module|Importing a module script failed|Failed to fetch|ChunkLoadError/i.test(
    String(error?.message || error)
  );

// Apanha erros ao mostrar uma página: em vez de um ecrã branco, mostra uma mensagem
// (o header e o rodapé continuam visíveis) e regista o erro no Umami.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (isChunkLoadError(error)) {
      try {
        // No máximo uma vez a cada 10 s, para não entrar em ciclo se o problema for outro
        const last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
        if (Date.now() - last > 10000) {
          sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
          window.location.reload();
          return;
        }
      } catch {
        // sem sessionStorage: mostra a mensagem
      }
    }
    window.umami?.track("erro-js", {
      mensagem: String(error?.message || error).slice(0, 200),
      pagina: window.location.pathname,
    });
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    const en = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/");
    return (
      <div className="error-fallback" role="alert">
        <h1>{en ? "Something went wrong" : "Ocorreu um erro"}</h1>
        <p>{en ? "Please reload the page. If the problem persists, contact us." : "Recarregue a página. Se o problema continuar, contacte-nos."}</p>
        <button type="button" onClick={() => window.location.reload()}>
          {en ? "Reload page" : "Recarregar página"}
        </button>
      </div>
    );
  }
}
