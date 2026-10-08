// Preparação dos testes (vite.config.js → test.setupFiles).
// O jsdom simula o browser, mas não tem algumas APIs que o site usa: aqui ficam versões vazias.
import "@testing-library/jest-dom/vitest";

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverStub;

window.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

// Sem canvas no jsdom: o recorte das garrafas (packshotTransform) cai no try/catch e mostra a foto inteira
HTMLCanvasElement.prototype.getContext = () => null;

// Limpa o que cada teste montou (sem as variáveis globais do Vitest, o Testing Library não o faz sozinho)
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
afterEach(cleanup);
