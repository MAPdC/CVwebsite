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

// Código de cada página (React.lazy em App.jsx): o HTML de cada rota pré-carrega o seu ficheiro,
// para o browser o descarregar em paralelo com o bundle principal (e não só depois dele).
const MANIFEST_DIR = path.join(DIST, ".vite");
const manifest = JSON.parse(await fs.readFile(path.join(MANIFEST_DIR, "manifest.json"), "utf8"));
const PAGE_MODULES = [
  // [caminho base, ficheiro da página]: o primeiro que corresponder ("/" está no bundle principal).
  // Um prefixo terminado em "/" apanha as páginas de produto dessa secção.
  ["/portfolio/wines/", "src/pages/WineProductPage.jsx"],
  ["/portfolio/wines", "src/pages/WinePortfolioPage.jsx"],
  ["/portfolio/olive-oils/", "src/pages/OliveOilProductPage.jsx"],
  ["/portfolio/olive-oils", "src/pages/OliveOilPortfolioPage.jsx"],
  ["/camuflado/", "src/pages/CamufladoProductPage.jsx"],
  ["/camuflado", "src/pages/CamufladoLandingPage.jsx"],
  ["/contacts", "src/pages/ContactPage.jsx"],
  ["/privacy-policies", "src/pages/PrivacyPage.jsx"],
  ["/history", "src/pages/UnderConstructionPage.jsx"],
  ["/sustainability", "src/pages/UnderConstructionPage.jsx"],
  ["/about-us", "src/pages/UnderConstructionPage.jsx"],
];
const entryFile = manifest["index.html"].file;

function preloadsFor(basePath) {
  const match = PAGE_MODULES.find(([prefix]) => (prefix.endsWith("/") ? basePath.startsWith(prefix) : basePath === prefix));
  if (!match) return [];
  if (!manifest[match[1]]) throw new Error(`${match[1]} não está no manifest do Vite`);
  const files = new Set();
  const collect = (key) => {
    const chunk = manifest[key];
    if (!chunk || chunk.file === entryFile || files.has(chunk.file)) return;
    files.add(chunk.file);
    (chunk.imports || []).forEach(collect);
  };
  collect(match[1]);
  return [...files].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`);
}

// Fotografia do hero da página inicial: sem isto o browser só a descobre depois de executar o JavaScript.
// Os "media" têm de ser os mesmos do <picture> em HomePage.jsx, para descarregar só a versão certa.
const HERO_IMAGES = [
  ["src/assets/douro-1-tiny.webp", "(orientation: landscape)"],
  ["src/assets/douro-1-portrait.webp", "(orientation: portrait)"],
];

function heroPreloads(basePath) {
  if (basePath !== "/") return [];
  return HERO_IMAGES.map(([src, media]) => {
    if (!manifest[src]) throw new Error(`${src} não está no manifest do Vite`);
    return `<link rel="preload" as="image" href="/${manifest[src].file}" media="${media}" fetchpriority="high">`;
  });
}

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
    ...(page.basePath ? preloadsFor(page.basePath) : []),
    ...(page.basePath ? heroPreloads(page.basePath) : []),
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

// O manifest só serve para este script: não é publicado
await fs.rm(MANIFEST_DIR, { recursive: true, force: true });

console.log(`✓ ${pages.length} páginas geradas, ${indexable.length} no sitemap, mais 404.html`);
