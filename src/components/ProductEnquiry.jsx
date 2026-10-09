import { FaWhatsapp } from "react-icons/fa";
import { useLang } from "../i18n";
import { EMAIL, PHONES, mailto, whatsapp } from "../contacts";

const TEXT = {
  pt: {
    label: "Encomendas",
    title: { wine: "Onde encontrar este vinho", oil: "Onde encontrar este azeite" },
    status: {
      available: "Para mais informações, contacte-nos.",
      collection: "Vinho de coleção, em quantidade limitada. Fale connosco para saber se ainda há garrafas disponíveis e qual o preço.",
      soldOut: "Esgotado de momento. Fale connosco para saber quando volta a estar disponível.",
    },
    cta: "Pedir informações",
    or: "Ou fale connosco por telefone ou WhatsApp:",
    call: (label) => `Ligar para ${label}`,
    whatsapp: (label) => `WhatsApp para ${label}`,
    subject: (name) => `Pedido de informações: ${name}`,
    body: (name) => `Olá,\n\nGostaria de receber mais informações sobre: ${name}.\n\nLocalidade: \n\nObrigado.`,
    message: (name) => `Olá, gostaria de receber mais informações sobre: ${name}.`,
  },
  en: {
    label: "Orders",
    title: { wine: "Where to find this wine", oil: "Where to find this olive oil" },
    status: {
      available: "For more information, please get in touch.",
      collection: "A collection wine, in limited quantities. Get in touch to check availability and price.",
      soldOut: "Currently sold out. Get in touch to find out when it will be available again.",
    },
    cta: "Enquire",
    or: "Or reach us by phone or WhatsApp:",
    call: (label) => `Call ${label}`,
    whatsapp: (label) => `WhatsApp ${label}`,
    subject: (name) => `Enquiry: ${name}`,
    body: (name) => `Hello,\n\nI would like more information about: ${name}.\n\nLocation: \n\nThank you.`,
    message: (name) => `Hello, I would like more information about: ${name}.`,
  },
};

const statusOf = (product) => (product.soldout ? "soldOut" : product.collection ? "collection" : "available");

// Fim da página de produto: como encomendar, com o email e o WhatsApp já preenchidos com o nome
// do produto. O endereço e os telefones ficam visíveis para quem não tem um programa de email.
function ProductEnquiry({ product, name = product.name, kind = "wine" }) {
  const { lang } = useLang();
  const text = TEXT[lang];
  const tracking = product.trackingName ?? product.name;
  const track = (meio) => ({
    "data-umami-event": "pedido-info",
    "data-umami-event-produto": tracking,
    "data-umami-event-meio": meio,
  });

  return (
    <section className="wd-section wd-enquiry">
      <h2 className="wd-label">{text.label}</h2>
      <p className="wd-enquiry__title">{text.title[kind]}</p>
      <p className="wd-enquiry__text">{text.status[statusOf(product)]}</p>
      <a className="wd-enquiry__cta" href={mailto(text.subject(name), text.body(name))} {...track("email")}>
        {text.cta}
      </a>
      <p className="wd-enquiry__alt">{text.or}</p>
      <ul className="wd-enquiry__phones">
        {PHONES.map(([tel, label]) => (
          <li key={tel}>
            <a href={`tel:${tel}`} aria-label={text.call(label)} {...track("telefone")}>
              {label}
            </a>
            <a
              className="wd-enquiry__whatsapp"
              href={whatsapp(tel, text.message(name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={text.whatsapp(label)}
              {...track("whatsapp")}
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp
            </a>
          </li>
        ))}
      </ul>
      <p className="wd-enquiry__email">{EMAIL}</p>
    </section>
  );
}

export default ProductEnquiry;
