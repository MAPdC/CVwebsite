// Corre depois do "vite build" (npm run build → postbuild).
// - Gera um HTML por página (ex.: dist/portfolio/wines.html), com o título, a descrição, o canonical,
//   o hreflang, o Open Graph e os dados estruturados dessa página. Assim o Google e as redes sociais
//   veem os metadados certos sem precisar de executar o JavaScript.
// - Gera o sitemap.xml e um 404.html (com noindex) para caminhos que não existem.
// Os metadados vêm de src/seo/pages.js, o mesmo ficheiro que o site usa no browser.
import { createServer } from "vite";
import fs from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve(process.argv[2] ?? "dist");

// O Vite carrega src/seo/pages.js tal como na app (resolve os imports de imagens dos produtos).
// Sem pré-análise de dependências nem websocket: o servidor só existe durante esta leitura.
const vite = await createServer({
  server: { middlewareMode: true, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
  logLevel: "error",
});
const { getAllPages, SITE_URL, OG_IMAGE } = await vite.ssrLoadModule("/src/seo/pages.js");
await vite.close();

const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function render(page) {
  const url = `${SITE_URL}${page.path}`;
  const head = [
    `<title>${esc(page.title)}</title>`,
    page.description && `<meta name="description" content="${esc(page.description)}">`,
    `<meta name="robots" content="${page.noindex ? "noindex" : "index, follow"}">`,
    !page.noindex && `<link rel="canonical" href="${url}">`,
    ...page.alternates.map(([hreflang, p]) => `<link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${p}">`),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Casttêdo Valley">`,
    `<meta property="og:title" content="${esc(page.title)}">`,
    page.description && `<meta property="og:description" content="${esc(page.description)}">`,
    !page.noindex && `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${page.lang === "en" ? "en_GB" : "pt_PT"}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    page.jsonLd && `<script type="application/ld+json">${json(page.jsonLd)}</script>`,
  ].filter(Boolean).join("\n    ");

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace(/<meta property="og:[^>]*>\s*/g, "")
    .replace(/<meta name="twitter:[^>]*>\s*/g, "")
    .replace("</head>", `  ${head}\n  </head>`);
}

const pages = getAllPages();

for (const page of pages) {
  // "/" → index.html ; "/en/portfolio/wines" → en/portfolio/wines.html
  const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  const out = path.join(DIST, file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, render(page));
}

// Caminhos que não existem: o servidor responde 404 com esta página e a app mostra "Página não encontrada"
await fs.writeFile(
  path.join(DIST, "404.html"),
  render({ path: "/", lang: "pt", title: "Página não encontrada | Casttêdo Valley", description: "", noindex: true, alternates: [], jsonLd: null })
);

const indexable = pages.filter((page) => !page.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
${page.alternates.map(([hreflang, p]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${p}"/>`).join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>
`;
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap);

console.log(`✓ ${pages.length} páginas geradas, ${indexable.length} no sitemap, mais 404.html`);
