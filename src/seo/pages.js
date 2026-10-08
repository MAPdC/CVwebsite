// Título, descrição e dados estruturados (Schema.org) de cada página, nos dois idiomas.
// Fonte única: usada no browser (usePageMeta) e no build (scripts/generate-pages.mjs),
// que gera um HTML por página com estes metadados já preenchidos.
import { wines, oliveOils } from "../mocks/products";
import { camufladoProducts } from "../mocks/camufladoProducts";
import { LANGS, localizePath, localizeProduct } from "../i18n/lang";

export const SITE_URL = "https://www.casttedovalley.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200×630, em public/
const BRAND = "Casttêdo Valley";

// Coordenadas da adega
const GEO = { latitude: 41.225723, longitude: -7.465944 };

const STATIC_PAGES = {
  "/": {
    pt: {
      title: "Casttêdo Valley | Vinhos DOC Douro e Azeite Biológico",
      description: "Vinhos DOC Douro e azeite virgem extra biológico de uma quinta familiar em Castedo, Alijó, com lagares de granito de 1873.",
    },
    en: {
      title: "Casttêdo Valley | Douro DOC Wines & Organic Olive Oil",
      description: "Fine Douro DOC wines and organic extra virgin olive oil from a family estate in Castedo, Alijó, with granite lagares dating from 1873.",
    },
  },
  "/portfolio/wines": {
    pt: {
      title: "Vinhos DOC Douro",
      description: "Tintos e brancos DOC Douro da Casttêdo Valley: reservas, colheitas e vinhos de curtimenta, com notas de prova e prémios.",
    },
    en: {
      title: "Douro DOC Wines",
      description: "Douro DOC reds and whites from Casttêdo Valley: reserves, harvest wines and orange wines, with tasting notes and awards.",
    },
  },
  "/portfolio/olive-oils": {
    pt: {
      title: "Azeite Virgem Extra Biológico",
      description: "Azeite virgem extra biológico de colheita tardia, das variedades Cordovil, Cobrançosa e Verdeal, produzido no Douro.",
    },
    en: {
      title: "Organic Extra Virgin Olive Oil",
      description: "Late-harvest organic extra virgin olive oil from Cordovil, Cobrançosa and Verdeal olives, produced in the Douro.",
    },
  },
  "/camuflado": {
    pt: {
      title: "Camuflado | Branco de Uvas Tintas",
      description: "Camuflado: brancos de uvas tintas de Touriga Nacional e Tinta Carvalha, Douro DOC, com um rótulo que guarda um segredo.",
    },
    en: {
      title: "Camuflado | Blanc de Noirs",
      description: "Camuflado: Douro DOC blanc de noirs from Touriga Nacional and Tinta Carvalha, with a label that keeps a secret.",
    },
  },
  "/contacts": {
    pt: {
      title: "Contactos e Visitas",
      description: "Morada, telefone e email da Casttêdo Valley em Castedo, Alijó. Provas de vinho e visitas à adega e às vinhas por marcação.",
    },
    en: {
      title: "Contact & Visits",
      description: "Address, phone and email for Casttêdo Valley in Castedo, Alijó. Wine tastings, winery and vineyard visits by appointment.",
    },
  },
  "/privacy-policies": {
    pt: {
      title: "Política de Privacidade",
      description: "Como a Casttêdo Valley trata os seus dados: website sem cookies, estatísticas anónimas e os seus direitos ao abrigo do RGPD.",
    },
    en: {
      title: "Privacy Policy",
      description: "How Casttêdo Valley handles your data: a cookie-free website, anonymous statistics and your rights under the GDPR.",
    },
  },
  // Páginas ainda em construção: fora do Google e do sitemap até terem conteúdo
  "/history": { noindex: true, pt: { title: "Em desenvolvimento", description: "" }, en: { title: "Coming soon", description: "" } },
  "/sustainability": { noindex: true, pt: { title: "Em desenvolvimento", description: "" }, en: { title: "Coming soon", description: "" } },
  "/about-us": { noindex: true, pt: { title: "Em desenvolvimento", description: "" }, en: { title: "Coming soon", description: "" } },
};

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Winery",
  "@id": `${SITE_URL}/#organizacao`,
  name: BRAND,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: OG_IMAGE,
  email: "casttedovalley@gmail.com",
  telephone: "+351933305966",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Largo Padre António Veiga",
    postalCode: "5070-226",
    addressLocality: "Castedo, Alijó",
    addressRegion: "Vila Real",
    addressCountry: "PT",
  },
  geo: { "@type": "GeoCoordinates", ...GEO },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,
  sameAs: ["https://www.facebook.com/casttedovalley10", "https://www.instagram.com/casttedovalley/"],
};

// Secções com páginas de produto: caminho base, nome no breadcrumb e título do produto
const SECTIONS = [
  { list: wines, path: "/portfolio/wines", name: { pt: "Vinhos", en: "Wines" }, title: (p) => p.name },
  { list: oliveOils, path: "/portfolio/olive-oils", name: { pt: "Azeites", en: "Olive Oils" }, title: (p) => p.name.replace(/\s*\|\s*/g, " ") },
  // "Branco de Uvas Tintas - Touriga Nacional Unoaked 2024" → "Camuflado Touriga Nacional Unoaked 2024"
  { list: camufladoProducts, path: "/camuflado", name: { pt: "Camuflado", en: "Camuflado" }, title: (p) => p.name.replace(/^.*?-\s*/, "Camuflado ") },
];

function buildPages() {
  const pages = [];

  const add = (basePath, metaFor, { noindex = false, jsonLd } = {}) => {
    for (const lang of LANGS) {
      const meta = metaFor(lang);
      pages.push({
        basePath,
        path: localizePath(basePath, lang),
        lang,
        title: basePath === "/" ? meta.title : `${meta.title} | ${BRAND}`,
        description: meta.description,
        noindex,
        jsonLd: jsonLd ? jsonLd(lang, meta) : null,
        alternates: [...LANGS.map((l) => [l, localizePath(basePath, l)]), ["x-default", basePath]],
      });
    }
  };

  for (const [basePath, page] of Object.entries(STATIC_PAGES)) {
    const withOrganization = basePath === "/" || basePath === "/contacts";
    add(basePath, (lang) => page[lang], {
      noindex: page.noindex,
      jsonLd: withOrganization ? () => ORGANIZATION : undefined,
    });
  }

  for (const section of SECTIONS) {
    for (const product of section.list) {
      const basePath = `${section.path}/${product.slug}`;
      add(
        basePath,
        (lang) => {
          const p = localizeProduct(product, lang);
          return { title: section.title(p), description: p.briefdescription ?? p.briefDescription ?? "" };
        },
        {
          jsonLd: (lang, meta) => ({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Início", item: `${SITE_URL}${localizePath("/", lang)}` },
              { "@type": "ListItem", position: 2, name: section.name[lang], item: `${SITE_URL}${localizePath(section.path, lang)}` },
              { "@type": "ListItem", position: 3, name: meta.title },
            ],
          }),
        }
      );
    }
  }

  return pages;
}

const PAGES = buildPages();
const BY_PATH = new Map(PAGES.map((page) => [page.path, page]));

export const getAllPages = () => PAGES;

// Metadados da página para um caminho do URL (null se a página não existir)
export const getPageMeta = (pathname) => BY_PATH.get(pathname.replace(/\/+$/, "") || "/") ?? null;
