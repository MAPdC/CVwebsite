// Metadados de cada página (o que o Google e as redes sociais veem): títulos únicos,
// descrições, versões PT/EN ligadas entre si, e todos os produtos com página.
import { describe, expect, it } from "vitest";
import { getAllPages, getPageMeta } from "./pages";
import { oliveOils, wines } from "../mocks/products";
import { camufladoProducts } from "../mocks/camufladoProducts";

const pages = getAllPages();
const indexable = pages.filter((p) => !p.noindex);

describe("páginas do site", () => {
  it("não há caminhos repetidos", () => {
    const paths = pages.map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("cada página indexável tem título e descrição, e os títulos não se repetem", () => {
    for (const p of indexable) {
      expect(p.title, p.path).toBeTruthy();
      expect(p.description, `${p.path}: descrição`).toBeTruthy();
      expect(p.description.length, `${p.path}: descrição longa demais para o Google`).toBeLessThanOrEqual(170);
    }
    const titles = indexable.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("cada página existe em PT e EN, e aponta para as duas versões (hreflang)", () => {
    for (const p of pages) {
      const langs = Object.fromEntries(p.alternates);
      expect(Object.keys(langs).sort()).toEqual(["en", "pt", "x-default"]);
      expect(getPageMeta(langs.pt), `${p.path}: versão PT`).not.toBeNull();
      expect(getPageMeta(langs.en), `${p.path}: versão EN`).not.toBeNull();
    }
  });

  it("todos os produtos têm página nos dois idiomas", () => {
    const expected = [
      ...wines.map((p) => `/portfolio/wines/${p.slug}`),
      ...oliveOils.map((p) => `/portfolio/olive-oils/${p.slug}`),
      ...camufladoProducts.map((p) => `/camuflado/${p.slug}`),
    ];
    for (const path of expected) {
      expect(getPageMeta(path), path).not.toBeNull();
      expect(getPageMeta(`/en${path}`), `/en${path}`).not.toBeNull();
    }
  });

  it("as páginas em construção ficam fora do Google", () => {
    for (const path of ["/history", "/sustainability", "/about-us", "/en/history"]) {
      expect(getPageMeta(path)?.noindex, path).toBe(true);
    }
  });

  it("caminhos desconhecidos não têm metadados (e a app mostra a 404)", () => {
    expect(getPageMeta("/nao-existe")).toBeNull();
    expect(getPageMeta("/portfolio/wines/vinho-inventado")).toBeNull();
  });

  it("aceita o caminho com barra no fim", () => {
    expect(getPageMeta("/contacts/")).toEqual(getPageMeta("/contacts"));
  });
});
