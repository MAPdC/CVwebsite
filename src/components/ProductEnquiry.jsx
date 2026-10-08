import { useLang } from "../i18n";
import { EMAIL, PHONES, mailto } from "../contacts";

const TEXT = {
  pt: {
    label: "Encomendas",
    title: { wine: "Quer este vinho?", oil: "Quer este azeite?" },
    status: {
      available: "Vendemos diretamente na adega e por encomenda. Escreva-nos para saber o preço, a disponibilidade e as opções de envio.",
      collection: "Vinho de coleção, em quantidade limitada. Escreva-nos para saber se ainda há garrafas disponíveis e qual o preço.",
      soldOut: "Esgotado de momento. Escreva-nos para saber quando volta a estar disponível.",
    },
    cta: "Pedir informações",
    or: "ou ligue",
    subject: (name) => `Pedido de informações: ${name}`,
    body: (name) => `Olá,\n\nGostaria de receber informações sobre: ${name} (preço e disponibilidade).\n\nObrigado.`,
  },
  en: {
    label: "Orders",
    title: { wine: "Interested in this wine?", oil: "Interested in this olive oil?" },
    status: {
      available: "We sell directly from the winery and to order. Write to us for prices, availability and shipping options.",
      collection: "A collection wine, in limited quantities. Write to us to check availability and price.",
      soldOut: "Currently sold out. Write to us to find out when it will be available again.",
    },
    cta: "Enquire",
    or: "or call",
    subject: (name) => `Enquiry: ${name}`,
    body: (name) => `Hello,\n\nI would like more information about: ${name} (price and availability).\n\nThank you.`,
  },
};

const statusOf = (product) => (product.soldout ? "soldOut" : product.collection ? "collection" : "available");

// Fim da página de produto: como encomendar, com o email já preenchido com o nome do produto.
// O endereço e o telefone ficam visíveis para quem não tem um programa de email configurado.
function ProductEnquiry({ product, name = product.name, kind = "wine" }) {
  const { lang } = useLang();
  const text = TEXT[lang];
  const tracking = product.trackingName ?? product.name;
  const [tel, telLabel] = PHONES[0];

  return (
    <section className="wd-section wd-enquiry">
      <h2 className="wd-label">{text.label}</h2>
      <p className="wd-enquiry__title">{text.title[kind]}</p>
      <p className="wd-enquiry__text">{text.status[statusOf(product)]}</p>
      <div className="wd-enquiry__actions">
        <a
          className="wd-enquiry__cta"
          href={mailto(text.subject(name), text.body(name))}
          data-umami-event="pedido-info"
          data-umami-event-produto={tracking}
          data-umami-event-meio="email"
        >
          {text.cta}
        </a>
        <span className="wd-enquiry__alt">
          {text.or}{" "}
          <a
            href={`tel:${tel}`}
            data-umami-event="pedido-info"
            data-umami-event-produto={tracking}
            data-umami-event-meio="telefone"
          >
            {telLabel}
          </a>
        </span>
      </div>
      <p className="wd-enquiry__email">{EMAIL}</p>
    </section>
  );
}

export default ProductEnquiry;
