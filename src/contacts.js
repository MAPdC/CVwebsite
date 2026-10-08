// Contactos da Casttêdo Valley, usados nos contactos, no rodapé, na política de privacidade
// e no "Pedir informações" das páginas de produto.
export const EMAIL = "casttedovalley@gmail.com";

// [número para o link tel:, como se mostra]
export const PHONES = [
  ["+351933305966", "+351 933 305 966"],
  ["+351933467002", "+351 933 467 002"],
];

// Coordenadas da adega (as mesmas dos dados estruturados em src/seo/pages.js)
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=41.225723,-7.465944";

// Link de email com assunto e texto já preenchidos
export const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
