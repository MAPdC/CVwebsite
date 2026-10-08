// Textos partilhados por vários componentes (menus, rodapé, etiquetas de produto).
// Os textos próprios de cada página ficam junto do respetivo componente;
// títulos e descrições para o Google e redes sociais estão em src/seo/pages.js.
export const COMMON = {
  pt: {
    nav: {
      portfolio: "Portefólio",
      wines: "Vinhos",
      oliveOils: "Azeites",
      camuflado: "Camuflado",
      contacts: "Contactos",
      home: "Início",
    },
    footer: {
      navigation: "Navegação",
      contacts: "Contactos",
      social: "Redes Sociais",
      privacy: "Política de Privacidade",
      complaints: "Livro de Reclamações",
      legalInfo: "Informação Legal",
      rights: (year) => `©${year} por Casttêdo Valley. Todos os direitos reservados.`,
    },
    menu: "Menu", // o estado (aberto/fechado) é anunciado pelo aria-expanded
    mainNav: "Navegação principal",
    skip: "Saltar para o conteúdo",
    language: "Idioma",
    wineTypes: { red: "Tinto", white: "Branco" }, // chaves = type em products.js
    badges: {
      oaked: "Oaked",
      unoaked: "Unoaked",
      curtimenta: "Curtimenta",
      organic: "Biológico",
      lateHarvest: "Colheita Tardia",
      available: "Disponível",
      collection: "Coleção",
      soldOut: "Esgotado",
    },
    seeDetails: "Ver detalhes",
    points: "pontos",
    backHome: "Voltar à Página Inicial",
  },
  en: {
    nav: {
      portfolio: "Portfolio",
      wines: "Wines",
      oliveOils: "Olive Oils",
      camuflado: "Camuflado",
      contacts: "Contact",
      home: "Home",
    },
    footer: {
      navigation: "Explore",
      contacts: "Contact",
      social: "Follow Us",
      privacy: "Privacy Policy",
      complaints: "Complaints Book",
      legalInfo: "Legal Information",
      rights: (year) => `©${year} Casttêdo Valley. All rights reserved.`,
    },
    menu: "Menu",
    mainNav: "Main navigation",
    skip: "Skip to content",
    language: "Language",
    wineTypes: { red: "Red", white: "White" },
    badges: {
      oaked: "Oaked",
      unoaked: "Unoaked",
      curtimenta: "Orange Wine",
      organic: "Organic",
      lateHarvest: "Late Harvest",
      available: "Available",
      collection: "Collection",
      soldOut: "Sold Out",
    },
    seeDetails: "View details",
    points: "points",
    backHome: "Back to Home",
  },
};
