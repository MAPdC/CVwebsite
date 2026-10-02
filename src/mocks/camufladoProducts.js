// IMPORTAÇÃO DE IMAGENS

// Garrafas Camuflado 2024
import tn_un_1 from '../assets/camuflado-touriga-nacional-unoaked-2024.webp';
import tn_oak_1 from '../assets/camuflado-touriga-nacional-oaked-2024.webp';
import tc_un_1 from '../assets/camuflado-tinta-carvalha-unoaked-2024.webp';

// Animais (logótipos)
import lebre from '../assets/camuflado-lebre-azul.webp';
import raposa from '../assets/camuflado-raposa-vermelho.webp';

const description = 'Entre a diversidade floral que reveste as nossas vinhas, a fauna auxiliar e cinegética encontra refúgio, alimento e camuflagem, onde passeia livremente entre as videiras. É deste ecossistema vivo que nasce um vinho inesperado: uvas tintas que se transformam, como se numa metamorfose, num branco luminoso, envolto em mistério e complexidade, onde a frescura e a elegância se revelam a cada momento.';

const presentation = 'Há um detalhe oculto nesta garrafa. Fique atento ao rótulo à medida que a temperatura varia.';

const datasheets = (slug) => ({
  pt: `/fichas/camuflado/pt/${slug}.pdf`,
  en: `/fichas/camuflado/en/${slug}.pdf`,
});

// accent: "lebre" | "lebre-oaked" | "raposa" -> cor do vinho (ver --camuflado-accent-* em index.css)
// technical: acidez, açúcares e pH a null até termos os valores (a página mostra "Em breve")
export const camufladoProducts = [
  {
    id: 1,
    slug: 'blanc-de-noirs-touriga-nacional-unoaked-2024',
    name: 'Branco de Uvas Tintas - Touriga Nacional Unoaked 2024',
    year: '2024',
    type: 'Branco',
    category: 'Douro DOC',
    animal: 'Lebre',
    accent: 'lebre',
    animalLogo: lebre,
    description,
    // RASCUNHO
    briefdescription: 'Touriga Nacional vinificada em branco: floral, fresca e com a acidez natural das bagas.',
    varieties: ["Touriga Nacional"],
    images: [
        tn_un_1
    ],
    sensorial: "Aroma com notas florais frescas, sabor de bagas com acidez natural, que lhe dá persistência e elegância.",
    consumo: "Peixes, frutos do mar, queijos frescos ou simplesmente só.",
    temperatura: "8 a 10°C",
    technical: {
        alcohol: "13%",
        acidity: null,
        sugar: null,
        ph: null
    },
    awards: [],
    onmarket: true,
    collection: false,
    oaked: false,
    presentation,
    maturation: null,
    datasheets: datasheets('blanc-de-noirs-touriga-nacional-unoaked-2024'),
  },
  {
    id: 2,
    slug: 'blanc-de-noirs-touriga-nacional-oaked-2024',
    name: 'Branco de Uvas Tintas - Touriga Nacional Oaked 2024',
    year: '2024',
    type: 'Branco',
    category: 'Douro DOC',
    animal: 'Lebre',
    accent: 'lebre-oaked',
    animalLogo: lebre,
    description,
    // RASCUNHO
    briefdescription: 'A mesma Touriga Nacional, agora com passagem por barrica de carvalho português: frutos secos, especiarias e um toque de côco.',
    varieties: ["Touriga Nacional"],
    images: [
        tn_oak_1
    ],
    sensorial: "Aroma com notas florais frescas, onde apresenta notas suaves de frutos secos, especiarias e ligeiras notas de côco, aliado a um sabor de bagas com acidez natural, que lhe dá persistência e elegância.",
    consumo: "Peixes, frutos do mar, queijos frescos ou simplesmente só.",
    temperatura: "8 a 10°C",
    technical: {
        alcohol: "13%",
        acidity: null,
        sugar: null,
        ph: null
    },
    awards: [],
    onmarket: true,
    collection: false,
    oaked: true,
    presentation,
    maturation: "Barrica de Carvalho Português",
    datasheets: datasheets('blanc-de-noirs-touriga-nacional-oaked-2024'),
  },
  {
    id: 3,
    slug: 'blanc-de-noirs-tinta-carvalha-unoaked-2024',
    name: 'Branco de Uvas Tintas - Tinta Carvalha Unoaked 2024',
    year: '2024',
    type: 'Branco',
    category: 'Douro DOC',
    animal: 'Raposa',
    accent: 'raposa',
    animalLogo: raposa,
    description,
    // RASCUNHO
    briefdescription: 'Tinta Carvalha vinificada em branco: notas florais com lichias e ameixas, fresca e persistente.',
    varieties: ["Tinta Carvalha"],
    images: [
        tc_un_1
    ],
    sensorial: "Aroma marcado por notas florais frescas, subtilmente entrelaçadas com ligeiras notas de lichias e ameixas. Revela um sabor de bagas com acidez natural, que lhe dá persistência e elegância.",
    consumo: "Peixes, frutos do mar, queijos frescos ou simplesmente só.",
    temperatura: "8 a 10°C",
    technical: {
        alcohol: "13%",
        acidity: null,
        sugar: null,
        ph: null
    },
    awards: [],
    onmarket: true,
    collection: false,
    oaked: false,
    presentation,
    maturation: null,
    datasheets: datasheets('blanc-de-noirs-tinta-carvalha-unoaked-2024'),
  },
];
