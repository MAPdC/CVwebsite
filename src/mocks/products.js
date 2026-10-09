// IMPORTAÇÃO DE IMAGENS

// Imagens do Tinto Reserva Oaked 2019 (Coleção)
import vto19_1 from '../assets/vto19-1.webp';
import vto19_2 from '../assets/vto19-2.webp';
import vto19_3 from '../assets/vto19-3.webp';

// Imagens do Tinto Reserva Unoaked 2020 (Coleção)
import vtun20_1 from '../assets/vtun20-1.webp';
import vtun20_2 from '../assets/vtun20-2.webp';
import vtun20_3 from '../assets/vtun20-3.webp';

// Imagens do Branco Reserva Oaked 2020 (Coleção)
import vbo20_1 from '../assets/vbo20-1.webp';
import vbo20_2 from '../assets/vbo20-2.webp';
import vbo20_3 from '../assets/vbo20-3.webp';

// Imagens do Branco Colheita Unoaked 2021 (Coleção)
import vbun21_1 from '../assets/vbun21-1.webp';
import vbun21_2 from '../assets/vbun21-2.webp';
import vbun21_3 from '../assets/vbun21-3.webp';
import vbun21_4 from '../assets/vbun21-4.webp';

// Imagens do Branco Colheita Curtimenta Unoaked 2023 (Coleção)
import vbcun23_1 from '../assets/vbcun23-1.webp';
// É preciso mais imagens para este vinho

// Imagens do Branco Reserva Curtimenta Oaked 2023 (Coleção)
import vbco23_1 from '../assets/vbco23-1.webp';
// É preciso mais imagens para este vinho

// Imagens do Branco Colheita Unoaked 2023 (Coleção)
// Estão com as imagens da referência anterior (21) porque ainda não há fotos do 23
import vbun23_1 from '../assets/vbun21-1.webp';
import vbun23_2 from '../assets/vbun21-2.webp';
import vbun23_3 from '../assets/vbun21-3.webp';
import vbun23_4 from '../assets/vbun21-4.webp';

// Imagens do Branco Reserva Oaked 2022 (No Mercado)
// Estão com as imagens da referência anterior (20) porque ainda não há fotos do 22
import vbo22_1 from '../assets/vbo20-1.webp';
import vbo22_2 from '../assets/vbo20-2.webp';
import vbo22_3 from '../assets/vbo20-3.webp';

// Imagens do Tinto Reserva Oaked 2020 (No Mercado)
// Estão com as imagens da referência anterior (19) porque ainda não há fotos do 20
import vto20_1 from '../assets/vto19-1.webp';
import vto20_2 from '../assets/vto19-2.webp';
import vto20_3 from '../assets/vto19-3.webp';

// Imagens do Tinto Reserva Unoaked 2021 (No Mercado)
// Estão com as imagens da referência anterior (20) porque ainda não há fotos do 21
import vtun21_1 from '../assets/vtun20-1.webp';
import vtun21_2 from '../assets/vtun20-2.webp';
import vtun21_3 from '../assets/vtun20-3.webp';

// Imagens do Branco Colheita Unoaked 2024 (No Mercado)
// Estão com as imagens da referência anterior (23, que usa as do 21) porque ainda não há fotos do 24
import vbun24_1 from '../assets/vbun21-1.webp';
import vbun24_2 from '../assets/vbun21-2.webp';
import vbun24_3 from '../assets/vbun21-3.webp';
import vbun24_4 from '../assets/vbun21-4.webp';

// Imagens do Azeite Virgem Extra Biológico Colheita Tardia
// É preciso importar as imagens usadas nos azeites
import lateharvest from '../assets/azeite.webp';

// Imagens de prémios
import ourof23 from '../assets/vinduero-ourof-23.webp';
import ouro24 from '../assets/vinduero-ouro-24.webp';
import ouro22 from '../assets/vinduero-ouro-22.webp';
import ourof24 from '../assets/vinduero-ourof-24.webp';


// --- Textos partilhados ---

// Descrição da marca, igual em quase todos os vinhos (em inglês: EN_DESCRIPTION)
const PT_DESCRIPTION = "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.";

// Um prémio: imagem da medalha, nome e pontuação. Todos são do concurso Vinduero.
// Em inglês, o bloco `en` repete a lista com os nomes traduzidos.
const award = (medal, title, score) => ({ organizer: "Vinduero", medal, title, score });


// --- Textos em inglês ---
// Baseados nas fichas técnicas EN (MATERIAL/Fichas Técnicas/.../EN), revistos para inglês idiomático.
// Cada produto tem um bloco `en` com os campos que mudam; os restantes vêm da versão PT.

const EN_INTRO = "Always true to its roots, Casttêdo Valley is a wine defined by its essence: a wine of personality, with an identity all its own. Our vineyards enjoy the perfect meeting of a unique microclimate and soils born of ancient schist, planted with meticulously selected vines and farmed with practices that promote biodiversity. This terroir yields healthy, distinctive grapes";

const EN_DESCRIPTION = `${EN_INTRO}, which are transformed in granite lagares dating from 1873, where history and tradition meet modern winemaking to craft wines of remarkable character.`;

const EN_RED_PAIRING = "Grilled or wood-oven roasted red meats, game, bacalhau (salt cod), charcuterie, cheeses and pâtés.";
const EN_RED_OAKED_NOTES = "An intense, elegant nose in harmony with a full-bodied, structured palate and a long finish, marked by ripe red fruit and nuances of vanilla and cocoa gracefully imparted by the oak.";
const EN_RED_UNOAKED_NOTES = "An intense, elegant nose in harmony with a full-bodied, structured palate and a long finish, marked by notes of ripe red fruit compote.";
const EN_WHITE_OAKED_NOTES = "A fresh nose with hints of vanilla. The palate is citrusy, intense and structured, balancing fresh fruit and oak, with an elegant, persistent finish.";
const EN_WHITE_OAKED_PAIRING = "Poultry, grilled or fried fish, cooked shellfish, starters and fried snacks, or simply on its own.";
const EN_WHITE_HARVEST_NOTES = "Fresh floral notes on the nose. The palate is striking, with citrus flavours, vibrant natural acidity and a pleasantly persistent finish.";

const EN_SERVE_RED = "16–18°C / 61–64°F";
const EN_SERVE_WHITE = "8–10°C / 46–50°F";


export const wines = [
    {
      id: 1,
      slug: "red-reserve-oaked-2019", 
      name: "Tinto Reserva Oaked 2019", 
      year: "2019",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso e elegante com notas de frutos vermelhos maduros e um toque de madeira.",
      type: "red",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"],
      images: [
        vto19_1,
        vto19_2,
        vto19_3
      ],
      sensorial: "Aroma intenso e elegante, em harmonia com o sabor encorpado, estruturado e persistente, marcado por notas a frutos vermelhos bem maduros e nuances de baunilha e cacau elegantemente cedidos pela madeira.",
      consumo: "Carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperatura: "16 a 18°C",
      technical: {
        alcohol: "13,5%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [award(ourof23, "Medalha de Ouro em Feminino 2023", "90,00")],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: false,
      maturation: "Barrica de Carvalho Francês e Americano",
      en: {
        name: "Reserve Red Oaked 2019",
        description: EN_DESCRIPTION,
        briefdescription: "An intense, elegant red with notes of ripe red fruit and a touch of oak.",
        sensorial: EN_RED_OAKED_NOTES,
        consumo: EN_RED_PAIRING,
        temperatura: EN_SERVE_RED,
        awards: [award(ourof23, "Gold Medal, Women's Jury 2023", "90.00")],
        maturation: "French and American oak barrels",
      }
    },
    {
      id: 2,
      slug: "red-reserve-unoaked-2020", 
      name: "Tinto Reserva Unoaked 2020", 
      year: "2020",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso, elegante e frutado com notas de compota de frutos vermelhos bem maduros.",
      type: "red",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"],
      images: [
        vtun20_1,
        vtun20_2,
        vtun20_3
      ],
      sensorial: "Aroma intenso e elegante, em harmonia com o sabor encorpado, estruturado e persistente, marcado por notas de compota de frutos vermelhos bem maduros.",
      consumo: "Carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperatura: "16 a 18°C",
      technical: {
        alcohol: "14,5%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [award(ouro24, "Medalha de Ouro 2024", "92,55"), award(ourof24, "Medalha de Ouro em Feminino 2024", "92,93")],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: false,
      en: {
        name: "Reserve Red Unoaked 2020",
        description: EN_DESCRIPTION,
        briefdescription: "Intense, elegant and fruit-driven, with notes of ripe red fruit compote.",
        sensorial: EN_RED_UNOAKED_NOTES,
        consumo: EN_RED_PAIRING,
        temperatura: EN_SERVE_RED,
        awards: [award(ouro24, "Gold Medal 2024", "92.55"), award(ourof24, "Gold Medal, Women's Jury 2024", "92.93")],
      }
    },
    {
      id: 3,
      slug: "white-reserve-oaked-2020", 
      name: "Branco Reserva Oaked 2020", 
      year: "2020",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho estruturado e elegante com equilíbrio entre a frescura e a madeira.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbo20_1,
        vbo20_2,
        vbo20_3
      ],
      sensorial: "Aroma fresco com notas de baunilha, na boca é cítrico, intenso e estruturado com equilíbrio entre a fruta fresca e a madeira, mostrando a sua elegância e persistência no final de boca.",
      consumo: "Carne de aves, peixes grelhados e fritos, mariscos confecionados, entradas e lanches com fritos ou simplesmente só.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [award(ouro22, "Medalha de Ouro 2022", "90,77")],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: false,
      maturation: "Barrica de Carvalho Francês",
      en: {
        name: "Reserve White Oaked 2020",
        description: EN_DESCRIPTION,
        briefdescription: "A structured, elegant white that balances freshness and oak.",
        sensorial: EN_WHITE_OAKED_NOTES,
        consumo: EN_WHITE_OAKED_PAIRING,
        temperatura: EN_SERVE_WHITE,
        awards: [award(ouro22, "Gold Medal 2022", "90.77")],
        maturation: "French oak barrels",
      }
    },
    {
      id: 4,
      slug: "white-harvest-unoaked-2021", 
      name: "Branco Colheita Unoaked 2021", 
      year: "2021",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho leve e vibrante, com notas cítricas refrescantes.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbun21_1,
        vbun21_2,
        vbun21_3,
        vbun21_4
      ],
      sensorial: "Aroma com notas florais frescas, na boca é notável, com o sabor cítrico de acidez natural vibrante e de agradável persistência.",
      consumo: "Peixes, mariscos, sushi, pratos picantes e salgados, francesinha, saladas ou simplesmente só.",
      temperatura: "6 a 8°C",
      technical: {
        alcohol: "13,0%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: false,
      en: {
        name: "Harvest White Unoaked 2021",
        description: EN_DESCRIPTION,
        briefdescription: "Light and vibrant, with refreshing citrus notes.",
        sensorial: EN_WHITE_HARVEST_NOTES,
        consumo: "Fish, shellfish, sushi, spicy and savoury dishes, the francesinha (Porto's signature sandwich), salads, or simply on its own.",
        temperatura: "6–8°C / 43–46°F",
      }
    },
    {
      id: 5,
      slug: "white-harvest-unoaked-2023", 
      illustrativeImages: true, // fotos de uma colheita anterior: o rótulo mostra outro ano
      name: "Branco Colheita Unoaked 2023", 
      year: "2023",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho leve e vibrante, com notas cítricas refrescantes perfeito para partilhar entre amigos.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbun23_1,
        vbun23_2,
        vbun23_3,
        vbun23_4
      ],
      sensorial: "Aroma com notas florais frescas, na boca é notável, com o sabor cítrico de acidez natural vibrante e de agradável persistência.",
      consumo: "Peixe, mariscos, sushi, ceviche, pratos picantes e salgados, saladas ou simplesmente só.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "12,5%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: false,
      en: {
        name: "Harvest White Unoaked 2023",
        description: EN_DESCRIPTION,
        briefdescription: "Light and vibrant, with refreshing citrus notes. Made for sharing with friends.",
        sensorial: EN_WHITE_HARVEST_NOTES,
        consumo: "Fish, shellfish, sushi, ceviche, spicy and savoury dishes, salads, or simply on its own.",
        temperatura: EN_SERVE_WHITE,
      }
    },
    {
      id: 6,
      slug: "white-reserve-oaked-2022", 
      illustrativeImages: true, // fotos de uma colheita anterior: o rótulo mostra outro ano
      name: "Branco Reserva Oaked 2022", 
      year: "2022",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas.\n\nO Branco Reserva 2022 distingue-se pela intensidade de cor, aroma e sabor, resultado das condições edafoclimáticas de um ano excecionalmente seco. Estas originaram uvas mais concentradas em cor e compostos fenólicos, mas de baixo rendimento líquido, levando à antecipação da vindima em cerca de 10 dias. Fiéis ao princípio de respeitar a qualidade natural da uva, o vinho reflete essa intensidade. A maturação em barricas de carvalho francês equilibrou a fruta madura com a complexidade da madeira, criando um vinho elegante, harmonioso e de carácter marcante.",
      briefdescription: "Um vinho estruturado e elegante com equilíbrio entre a frescura e a madeira.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbo22_1,
        vbo22_2,
        vbo22_3
      ],
      sensorial: "Aroma fresco com notas de baunilha, na boca é cítrico, intenso e estruturado com equilíbrio entre a fruta fresca e a madeira, mostrando a sua elegância e persistência no final de boca.",
      consumo: "Carne de aves, peixes grelhados e fritos, mariscos confecionados, entradas e lanches com fritos ou simplesmente só.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: true,
      curtimenta: false,
      maturation: "Barrica de Carvalho Francês",
      en: {
        name: "Reserve White Oaked 2022",
        description: `${EN_INTRO}.\n\nThe 2022 Reserve White stands out for the intensity of its colour, aroma and flavour, the result of the soil and climate conditions of an exceptionally dry year. These produced grapes more concentrated in colour and phenolic compounds, but with low juice yields, bringing the harvest forward by around ten days. True to our principle of respecting the natural quality of the fruit, the wine reflects that intensity. Maturation in French oak barrels balanced the ripe fruit with the complexity of the oak, creating an elegant, harmonious wine of striking character.`,
        briefdescription: "A structured, elegant white that balances freshness and oak.",
        sensorial: EN_WHITE_OAKED_NOTES,
        consumo: EN_WHITE_OAKED_PAIRING,
        temperatura: EN_SERVE_WHITE,
        maturation: "French oak barrels",
      }
    },
    {
      id: 7,
      slug: "white-harvest-curtimenta-unoaked-2023", 
      name: "Branco Colheita Curtimenta Unoaked 2023",
      year: "2023",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso com sabor encorpado marcado por notas de casca de laranja.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbcun23_1
      ],
      sensorial: "Aroma intenso com sabor encorpado, estruturado e persistente, marcado por notas de casca de laranja, pêssego, pêra e manga bem maduros.",
      consumo: "Carnes e peixes grelhados, cozinha exótica, queijos e patês.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: null,
        sugar: null, 
        ph: null
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: true,
      en: {
        name: "Harvest Orange Wine Unoaked 2023",
        description: EN_DESCRIPTION,
        briefdescription: "An intense, full-bodied orange wine, marked by notes of orange peel.",
        sensorial: "An intense nose and a full-bodied, structured, persistent palate, marked by notes of orange peel and ripe peach, pear and mango.",
        consumo: "Grilled meat and fish, richly spiced cuisines, cheeses and pâtés.",
        temperatura: EN_SERVE_WHITE,
      }
    },
    {
      id: 8,
      slug: "white-reserve-curtimenta-oaked-2023", 
      name: "Branco Reserva Curtimenta Oaked 2023", 
      year: "2023",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso, encorpado e persistente com notas da cresta dos cortiços.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbco23_1
      ],
      sensorial: "Aroma intenso com sabor encorpado e persistente, notas estruturadas de pêssego, pêra e laranja e com nuances de cacau, coco e a cresta dos cortiços.",
      consumo: "Leitão, borrego e cabrito assados no forno a lenha, pratos de caça, bacalhau, comidas exóticas intensas, enchidos, queijos e patês.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: true,
      maturation: "Barrica de Carvalho Português",
      en: {
        name: "Reserve Orange Wine Oaked 2023",
        description: EN_DESCRIPTION,
        briefdescription: "Intense, full-bodied and persistent, with notes of honeycomb.",
        sensorial: "An intense nose and a full-bodied, persistent palate, with structured notes of peach, pear and orange and nuances of cocoa, coconut and honeycomb.",
        consumo: "Wood-oven roast suckling pig, lamb and kid, game, bacalhau (salt cod), bold, richly spiced dishes, charcuterie, cheeses and pâtés.",
        temperatura: EN_SERVE_WHITE,
        maturation: "Portuguese oak barrels",
      }
    },
    {
      id: 9,
      slug: "red-reserve-oaked-2020", 
      illustrativeImages: true, // fotos de uma colheita anterior: o rótulo mostra outro ano
      name: "Tinto Reserva Oaked 2020", 
      year: "2020",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso e elegante com notas de frutos vermelhos maduros e nuances de madeira.",
      type: "red",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"], // COLOCAR % DE CADA CASTA?
      images: [
        vto20_1,
        vto20_2,
        vto20_3
      ],
      sensorial: "Aroma intenso e elegante, em harmonia com o sabor encorpado, estruturado e persistente, marcado por notas a frutos vermelhos bem maduros e nuances de baunilha e cacau elegantemente cedidos pela madeira.",
      consumo: "Carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperatura: "16 a 18°C",
      technical: {
        alcohol: "13,5%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: true,
      curtimenta: false,
      maturation: "Barrica de Carvalho Francês e Americano",
      en: {
        name: "Reserve Red Oaked 2020",
        description: EN_DESCRIPTION,
        briefdescription: "An intense, elegant red with notes of ripe red fruit and subtle oak.",
        sensorial: EN_RED_OAKED_NOTES,
        consumo: EN_RED_PAIRING,
        temperatura: EN_SERVE_RED,
        maturation: "French and American oak barrels",
      }
    },
    {
      id: 10,
      slug: "red-reserve-unoaked-2021",
      illustrativeImages: true, // fotos de uma colheita anterior: o rótulo mostra outro ano
      name: "Tinto Reserva Unoaked 2021",
      year: "2021",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho intenso, elegante e frutado com notas de compota de frutos vermelhos bem maduros.",
      type: "red",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"],
      images: [
        vtun21_1,
        vtun21_2,
        vtun21_3
      ],
      sensorial: "Aroma intenso e elegante, em harmonia com o sabor encorpado, estruturado e persistente, marcado por notas de compota de frutos vermelhos bem maduros.",
      consumo: "Carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperatura: "16 a 18°C",
      technical: {
        alcohol: "14%",
        acidity: null, // null = "Em breve" (as fichas técnicas não têm estes valores)
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: false,
      curtimenta: false,
      en: {
        name: "Reserve Red Unoaked 2021",
        description: EN_DESCRIPTION,
        briefdescription: "Intense, elegant and fruit-driven, with notes of ripe red fruit compote.",
        sensorial: EN_RED_UNOAKED_NOTES,
        consumo: EN_RED_PAIRING,
        temperatura: EN_SERVE_RED,
      }
    },
    {
      id: 11,
      slug: "white-harvest-unoaked-2024",
      illustrativeImages: true, // fotos de uma colheita anterior: o rótulo mostra outro ano
      name: "Branco Colheita Unoaked 2024",
      year: "2024",
      description: PT_DESCRIPTION,
      briefdescription: "Um vinho leve e vibrante, com notas cítricas refrescantes perfeito para partilhar entre amigos.",
      type: "white",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbun24_1,
        vbun24_2,
        vbun24_3,
        vbun24_4
      ],
      sensorial: "Aroma com notas florais frescas, na boca é notável, com o sabor cítrico de acidez natural vibrante e de agradável persistência.",
      consumo: "Peixe, mariscos, sushi, ceviche, pratos picantes e salgados, saladas ou simplesmente só.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "12%",
        acidity: null,
        sugar: null,
        ph: null
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: false,
      curtimenta: false,
      en: {
        name: "Harvest White Unoaked 2024",
        description: EN_DESCRIPTION,
        briefdescription: "Light and vibrant, with refreshing citrus notes. Made for sharing with friends.",
        sensorial: EN_WHITE_HARVEST_NOTES,
        consumo: "Fish, shellfish, sushi, ceviche, spicy and savoury dishes, salads, or simply on its own.",
        temperatura: EN_SERVE_WHITE,
      }
    },
  ];
  
  export const oliveOils = [
    {
      id: 1,
      slug: "organic-extra-virgin-olive-oil-late-harvest",
      name: "Azeite Virgem Extra | Biológico & Colheita Tardia",
      description: "Azeite de categoria superior obtido diretamente de azeitonas, unicamente por processos mecânicos. Produzido a partir de azeitonas cultivadas em modo biológico, colhidas tardiamente para garantir um sabor mais intenso e complexo.",
      briefDescription: "Um azeite de colheita tardia feita no mês de Dezembro, perfeito para gastronomia gourmet.",
      type: "Virgem Extra",
      varieties: ["Cordovil", "Cobrançosa", "Verdeal"],
      images: [
        lateharvest
      ],
      sensory: "No sabor é ligeiramente picante e amargo com notas marcantes de amêndoa. É sedoso e aveludado. Com um aroma subtil a rama de tomateiro e a folhas verdes de oliveira moídas com azeitonas maduras.",
      pairing: "Pratos delicados. Peixes, carnes e legumes cozidos a vapor, pão torrado com ligeiro toque de alho e ervas aromáticas.",
      technical: {
        acidity: "≤ 0,4%",
        peroxide: "≤ 20 meqO2/kg",
        k232: "≤ 2,50",
        k268: "≤ 0,22"
      },
      nutritionDeclaration: {
        energy: "3421 kJ / 821 kcal",
        fat: "91,2 g",
        saturatedFat: "13,1 g",
        carbohydrates: "0 g",
        sugars: "0 g",
        protein: "0 g",
        salt: "0 g"
      },
      extraInfo: {
        store: "Conservar ao abrigo da luz, ar, fontes de calor e odores intensos.",
        available: "Disponível em garrafas de 500ml."
      },
      awards: [],
      onmarket: true,
      soldout: false,
      organic: true,
      lateHarvest: true,
      en: {
        name: "Extra Virgin Olive Oil | Organic & Late Harvest",
        description: "Superior category olive oil obtained directly from olives and solely by mechanical means. Made from organically grown olives, harvested late in the season for a more intense and complex flavour.",
        briefDescription: "A late-harvest olive oil, picked in December. Perfect for fine dining.",
        type: "Extra Virgin",
        sensory: "Lightly pungent and bitter on the palate, with pronounced notes of almond and a silky, velvety texture. The nose offers subtle hints of tomato leaf and freshly crushed green olive leaves with ripe olives.",
        pairing: "Delicate dishes: steamed fish, meat and vegetables, or toasted bread with a light touch of garlic and aromatic herbs.",
        extraInfo: {
          store: "Store away from light, air, heat and strong odours.",
          available: "Available in 500 ml bottles."
        },
      },
    },
    // outros azeites
  ];