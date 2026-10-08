// Integridade dos dados dos produtos: apanha erros ao acrescentar ou editar um produto
// (slug repetido, campo em falta, tradução esquecida, ficha técnica que não existe).
import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { oliveOils, wines } from "./products";
import { camufladoProducts } from "./camufladoProducts";

const LISTS = { wines, oliveOils, camufladoProducts };

describe.each(Object.entries(LISTS))("%s", (_, list) => {
  it("tem ids e slugs únicos, com slugs só em minúsculas, números e hífenes", () => {
    const ids = list.map((p) => p.id);
    const slugs = list.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(list.map((p) => [p.slug, p]))("%s tem os campos obrigatórios nos dois idiomas", (_, p) => {
    expect(p.name).toBeTruthy();
    expect(p.en?.name, "falta o nome em inglês (en.name)").toBeTruthy();
    expect(p.description).toBeTruthy();
    expect(p.en?.description ?? p.description).toBeTruthy();
    expect(p.briefdescription ?? p.briefDescription).toBeTruthy();
    expect(p.images?.length).toBeGreaterThan(0);
    for (const image of p.images) expect(typeof image).toBe("string");
    expect(p.varieties?.length).toBeGreaterThan(0);
    expect(p.technical).toBeTypeOf("object");
  });

  it("as fichas técnicas existem em public/", () => {
    for (const p of list) {
      for (const url of Object.values(p.datasheets ?? {})) {
        expect(fs.existsSync(`public${url}`), `${p.slug}: ${url}`).toBe(true);
      }
    }
  });

  it("cada prémio tem medalha e nome", () => {
    for (const p of list) {
      for (const award of p.awards ?? []) {
        expect(award.medal, `${p.slug}: medalha`).toBeTruthy();
        expect(award.title, `${p.slug}: nome do prémio`).toBeTruthy();
      }
    }
  });
});

describe("vinhos", () => {
  it("cada vinho é Tinto ou Branco (o filtro do portefólio depende disto)", () => {
    for (const w of wines) expect(["red", "white"]).toContain(w.type);
  });

  it("um vinho à venda não está marcado como coleção", () => {
    for (const w of wines) expect(w.onmarket && w.collection, w.slug).toBeFalsy();
  });
});
