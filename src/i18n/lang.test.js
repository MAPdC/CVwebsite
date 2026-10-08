import { describe, expect, it } from "vitest";
import { formatDecimal, getLangFromPath, localizePath, localizeProduct, stripLang } from "./lang";

describe("idioma a partir do URL", () => {
  it("reconhece o prefixo /en e só ele", () => {
    expect(getLangFromPath("/")).toBe("pt");
    expect(getLangFromPath("/contacts")).toBe("pt");
    expect(getLangFromPath("/en")).toBe("en");
    expect(getLangFromPath("/en/contacts")).toBe("en");
    expect(getLangFromPath("/english")).toBe("pt"); // não é o prefixo /en
  });

  it("converte caminhos entre idiomas", () => {
    expect(stripLang("/en")).toBe("/");
    expect(stripLang("/en/portfolio/wines")).toBe("/portfolio/wines");
    expect(stripLang("/portfolio/wines")).toBe("/portfolio/wines");
    expect(localizePath("/", "en")).toBe("/en");
    expect(localizePath("/contacts", "en")).toBe("/en/contacts");
    expect(localizePath("/contacts", "pt")).toBe("/contacts");
  });

  it("ida e volta dá o mesmo caminho", () => {
    for (const path of ["/", "/contacts", "/portfolio/wines/red-reserve-oaked-2020"]) {
      expect(stripLang(localizePath(path, "en"))).toBe(path);
    }
  });
});

describe("textos dos produtos", () => {
  it("usa ponto decimal em inglês", () => {
    expect(formatDecimal("13,5%", "en")).toBe("13.5%");
    expect(formatDecimal("13,5%", "pt")).toBe("13,5%");
    expect(formatDecimal(null, "en")).toBe(null);
  });

  it("aplica o bloco en e guarda o nome PT para as estatísticas", () => {
    const product = { name: "Tinto", year: "2020", en: { name: "Red" } };
    expect(localizeProduct(product, "en")).toMatchObject({ name: "Red", year: "2020", trackingName: "Tinto" });
    expect(localizeProduct(product, "pt")).toBe(product);
    expect(localizeProduct(undefined, "en")).toBeUndefined();
  });

  it("traduz parte de um grupo de campos sem perder os outros", () => {
    const product = { name: "Azeite", technical: { acidity: "≤ 0,4%", peroxide: "8" }, en: { technical: { acidity: "≤ 0.4%" } } };
    expect(localizeProduct(product, "en").technical).toEqual({ acidity: "≤ 0.4%", peroxide: "8" });
  });
});
