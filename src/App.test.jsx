// Monta cada página do site (PT e EN) como um visitante a abriria e confirma o essencial:
// a página aparece, tem um único <main> e um único <h1>, e o título do separador é o certo.
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { PageLayout } from "./App";
import { getAllPages } from "./seo/pages";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <PageLayout />
    </MemoryRouter>
  );

describe.each(getAllPages().map((page) => [page.path, page]))("%s", (path, page) => {
  it("abre com um <main>, um <h1> e o título certo", async () => {
    renderAt(path);
    // as páginas são carregadas à parte (React.lazy): espera que apareçam
    const headings = await screen.findAllByRole("heading", { level: 1 }, { timeout: 5000 });
    expect(headings).toHaveLength(1);
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(screen.queryByRole("alert")).toBeNull(); // sem a mensagem de erro do ErrorBoundary
    await waitFor(() => expect(document.title).toBe(page.title));
    expect(document.documentElement.lang).toBe(page.lang);
  });
});

describe("idioma escolhido numa visita anterior", () => {
  afterEach(() => localStorage.clear());

  it("a página inicial abre no idioma guardado", async () => {
    localStorage.setItem("cv-lang", "en");
    renderAt("/");
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));
  });

  it("um link direto para outra página abre no idioma do link", async () => {
    localStorage.setItem("cv-lang", "en");
    renderAt("/contacts");
    await screen.findAllByRole("heading", { level: 1 }, { timeout: 5000 });
    await waitFor(() => expect(document.title).toBe("Contactos e Visitas | Casttêdo Valley"));
    expect(document.documentElement.lang).toBe("pt");
  });
});

describe("página que não existe", () => {
  it("mostra a 404 com noindex", async () => {
    renderAt("/en/pagina-inventada");
    expect(await screen.findByText("404")).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe("Page not found | Casttêdo Valley"));
    expect(document.querySelector('meta[name="robots"]').content).toBe("noindex");
  });
});
