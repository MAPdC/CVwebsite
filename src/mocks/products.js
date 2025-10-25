// IMPORTAÇÃO DE IMAGENS

// Imagens do Tinto Reserva Oaked 2019 (Coleção)
import vto19_1 from '../assets/vto19-1.png';
import vto19_2 from '../assets/vto19-2.jpg';
import vto19_3 from '../assets/vto19-3.jpg';

// Imagens do Tinto Reserva Unoaked 2020 (Coleção)
import vtun20_1 from '../assets/vtun20-1.png';
import vtun20_2 from '../assets/vtun20-2.jpg';
import vtun20_3 from '../assets/vtun20-3.jpg';

// Imagens do Branco Reserva Oaked 2020 (Coleção)
import vbo20_1 from '../assets/vbo20-1.png';
import vbo20_2 from '../assets/vbo20-2.jpg';
import vbo20_3 from '../assets/vbo20-3.jpg';

// Imagens do Branco Colheita Unoaked 2021 (Coleção)
import vbun21_1 from '../assets/vbun21-1.png';
import vbun21_2 from '../assets/vbun21-2.jpg';
import vbun21_3 from '../assets/vbun21-3.jpg';
import vbun21_4 from '../assets/vbun21-4.jpg';

// Imagens do Branco Colheita Curtimenta Unoaked 2023 (Coleção)
import vbcun23_1 from '../assets/vbcun23-1.png';
// É preciso mais imagens para este vinho

// Imagens do Branco Reserva Curtimenta Oaked 2023 (Coleção)
import vbco23_1 from '../assets/vbco23-1.png';
// É preciso mais imagens para este vinho

// Imagens do Branco Colheita Unoaked 2023 (No Mercado)
// Estão com as imagens da referência anterior (21) porque ainda não há fotos do 23
import vbun23_1 from '../assets/vbun21-1.png';
import vbun23_2 from '../assets/vbun21-2.jpg';
import vbun23_3 from '../assets/vbun21-3.jpg';
import vbun23_4 from '../assets/vbun21-4.jpg';

// Imagens do Branco Reserva Oaked 2022 (No Mercado)
// Estão com as imagens da referência anterior (20) porque ainda não há fotos do 22
import vbo22_1 from '../assets/vbo20-1.png';
import vbo22_2 from '../assets/vbo20-2.jpg';
import vbo22_3 from '../assets/vbo20-3.jpg';

// Imagens do Tinto Reserva Oaked 2020 (No Mercado)
// Estão com as imagens da referência anterior (19) porque ainda não há fotos do 20
import vto20_1 from '../assets/vto19-1.png';
import vto20_2 from '../assets/vto19-2.jpg';
import vto20_3 from '../assets/vto19-3.jpg';
import { text } from '@fortawesome/fontawesome-svg-core';

// Imagens do Azeite Virgem Extra Biológico Colheita Tardia
// É preciso importar as imagens usadas nos azeites
import lateharvest from '../assets/azeite.png';


export const wines = [
    {
      id: 1,
      slug: "red-reserve-oaked-2019", 
      name: "Tinto Reserva Oaked 2019", 
      year: "2019",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso e elegante com notas de frutos vermelhos maduros e um toque de madeira.",
      type: "Tinto",
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
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0.0"
      },
      awards: [["/images/logo-vinduero.png", "/images/vinduero-ourof-23.png", "Medalha de Ouro em Feminino 2023","90,00"]],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: false
    },
    {
      id: 2,
      slug: "red-reserve-unoaked-2020", 
      name: "Tinto Reserva Unoaked 2020", 
      year: "2020",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso, elegante e frutado com notas de compota de frutos vermelhos bem maduros.",
      type: "Tinto",
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
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0"
      },
      awards: [["/images/logo-vinduero.png", "/images/vinduero-ouro-24.png", "Medalha de Ouro 2024","92,55"], ["/images/logo-vinduero.png", "/images/vinduero-ourof-24.png", "Medalha de Ouro em Feminino 2024", "92,93"]],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: false
    },
    {
      id: 3,
      slug: "white-reserve-oaked-2020", 
      name: "Branco Reserva Oaked 2020", 
      year: "2020",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho estruturado e elegante com equilíbrio entre a frescura e a madeira.",
      type: "Branco",
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
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0"
      },
      awards: [["/images/logo-vinduero.png", "/images/vinduero-ouro-22.png", "Medalha de Ouro 2022","90,77"]],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: false
    },
    {
      id: 4,
      slug: "white-harvest-unoaked-2021", 
      name: "Branco Colheita Unoaked 2021", 
      year: "2021",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho leve e vibrante, com notas cítricas refrescantes.",
      type: "Branco",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbun21_1,
        vbun21_2,
        vbun21_3,
        vbun21_4
      ],
      sensorial: "Aroma com notas florais frescas, na boca é notável, com o sabor cítrico de acidez natural vibrante e de agradável persistência.",
      consumo: "Peixes, mariscos, shushi, pratos picantes e salgados, francesinha, saladas ou simplesmente só.",
      temperatura: "6 a 8°C",
      technical: {
        alcohol: "13,0%",
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0"
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: false
    },
    {
      id: 5,
      slug: "white-harvest-unoaked-2023", 
      name: "Branco Colheita Unoaked 2023", 
      year: "2023",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho leve e vibrante, com notas cítricas refrescantes perfeito para partilhar entre amigos.",
      type: "Branco",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"],
      images: [
        vbun23_1,
        vbun23_2,
        vbun23_3,
        vbun23_4
      ],
      sensorial: "Aroma com notas florais frescas, na boca é notável, com o sabor cítrico de acidez natural vibrante e de agradável persistência.",
      consumo: "Peixe, mariscos, shushi, ceviche, pratos picantes e salgados, saladas ou simplesmente só.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "12,5%",
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0"
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: false,
      curtimenta: false
    },
    {
      id: 6,
      slug: "white-reserve-oaked-2022", 
      name: "Branco Reserva Oaked 2022", 
      year: "2022",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho estruturado e elegante com equilíbrio entre a frescura e a madeira.",
      type: "Branco",
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
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0"
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: true,
      curtimenta: false
    },
    {
      id: 7,
      slug: "white-harvest-curtimenta-unoaked-2023", 
      name: "Branco Colheita Curtimenta Unoaked 2023", // NOS DETAILS COLOCAR 'CURTIMENTA' DE FORMA DIFERENTE?
      year: "2023",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso com sabor encorpado marcado por notas de casca de laranja.",
      type: "Branco",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"], // COLOCAR % DE CADA CASTA?
      images: [
        vbcun23_1
      ],
      sensorial: "Aroma intenso com sabor encorpado, estruturado e persistente, marcado por notas de casca de laranja, pêssego, pêra e manga bem maduros.",
      consumo: "Carnes e peixes grelhados, cozinha exótica, queijos e patês.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: "0.0 g/L", // VALE A PENA?
        sugar: "0.0 g/L", // VALE A PENA?
        ph: "0" // VALE A PENA?
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: false,
      curtimenta: true
    },
    {
      id: 8,
      slug: "white-reserve-curtimenta-oaked-2023", 
      name: "Branco Reserva Curtimenta Oaked 2023", 
      year: "2023",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso, encorpado e persistente com notas da cresta dos cortiços.",
      type: "Branco",
      category: "Douro DOC",
      varieties: ["Arinto", "Verdelho", "Viosinho"], // COLOCAR % DE CADA CASTA?
      images: [
        vbco23_1
      ],
      sensorial: "Aroma intenso com sabor encorpado e persistente, notas estruturadas de pêssego, pêra e laranja e com nuances de cacau, coco e a cresta dos cortiços.",
      consumo: "Leitão, borrego e cabrito assados no forno a lenha, pratos de caça, bacalhau, comidas exóticas intensas, enchidos, queijos e patês.",
      temperatura: "8 a 10°C",
      technical: {
        alcohol: "13,0%",
        acidity: "0.0 g/L", // VALE A PENA?
        sugar: "0.0 g/L", // VALE A PENA?
        ph: "0" // VALE A PENA?
      },
      awards: [],
      onmarket: false,
      collection: true,
      oaked: true,
      curtimenta: true
    },
    {
      id: 9,
      slug: "red-reserve-oaked-2020", 
      name: "Tinto Reserva Oaked 2020", 
      year: "2020",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso e elegante com notas de frutos vermelhos maduros e nuances de madeira.",
      type: "Tinto",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"], // COLOCAR % DE CADA CASTA?
      images: [
        vto20_1,
        vto20_2,
        vto20_3
      ],
      sensory: "Aroma intenso e elegante, em harmonia com o sabor encorpado, estruturado e persistente, marcado por notas a frutos vermelhos bem maduros e nuances de baunilha e cacau elegantemente cedidos pela madeira.",
      pairing: "Carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperature: "16 a 18°C",
      technical: {
        alcohol: "13,5%",
        acidity: "0.0 g/L",
        sugar: "0.0 g/L",
        ph: "0.0"
      },
      awards: [],
      onmarket: true,
      collection: false,
      oaked: true,
      curtimenta: false
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
    },
    // outros azeites
  ];