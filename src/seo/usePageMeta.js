import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta, SITE_URL } from "./pages";
import { getLangFromPath } from "../i18n/lang";

const NOT_FOUND_TITLE = {
  pt: "Página não encontrada | Casttêdo Valley",
  en: "Page not found | Casttêdo Valley",
};

// Cria ou atualiza uma tag do <head>
function upsert(selector, tag, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

// Mantém <html lang>, título, descrição, canonical, Open Graph e hreflang de acordo com a página atual.
// O HTML gerado no build já traz estes valores; isto atualiza-os ao navegar dentro do site.
export default function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = getLangFromPath(pathname);
    const page = getPageMeta(pathname);

    document.documentElement.lang = lang;
    document.title = page?.title ?? NOT_FOUND_TITLE[lang];
    upsert('meta[name="robots"]', "meta", {
      name: "robots",
      content: !page || page.noindex ? "noindex" : "index, follow",
    });
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    if (!page) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
      return;
    }

    const url = `${SITE_URL}${page.path}`;
    upsert('meta[name="description"]', "meta", { name: "description", content: page.description });
    upsert('link[rel="canonical"]', "link", { rel: "canonical", href: url });
    upsert('meta[property="og:title"]', "meta", { property: "og:title", content: page.title });
    upsert('meta[property="og:description"]', "meta", { property: "og:description", content: page.description });
    upsert('meta[property="og:url"]', "meta", { property: "og:url", content: url });
    upsert('meta[property="og:locale"]', "meta", { property: "og:locale", content: lang === "en" ? "en_GB" : "pt_PT" });

    for (const [hreflang, path] of page.alternates) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = `${SITE_URL}${path}`;
      document.head.appendChild(link);
    }
  }, [pathname]);
}
