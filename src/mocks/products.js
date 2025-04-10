export const wines = [
    {
      id: "red-wine-reserve-oaked-2019", 
      name: "Reserva | Tinto Oaked", 
      year: "2019",
      description: "Sempre ligado às suas raízes, o Casttêdo Valley é um vinho que se caracteriza pela sua essência, um vinho com personalidade e com uma identidade própria, as suas vinhas gozam do encontro perfeito entre um microclima único, um solo extraído de imemoriáveis rochas de xisto, com videiras meticulosamente selecionadas, aliadas a técnicas que promovem a biodiversidade. Um \"terroir\" que garante uvas sãs e únicas, transformadas em lagares datados 1873, carregados de história e tradição aliadas às novas tecnologias na produção de vinhos marcantes.",
      briefdescription: "Um vinho intenso e elegante com notas de frutos vermelhos maduros e um toque de madeira.",
      type: "Tinto",
      category: "Douro DOC",
      varieties: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta da Barca", "Tinto Cão"],
      images: [
        "../public/images/vto19-1.png",
        "../public/images/vto19-2.jpg",
        "../public/images/vto19-3.jpg"
      ],
      sensorial: {
        visual: "Rubi profundo com reflexos violáceos",
        aroma: "Frutos vermelhos maduros, notas de especiarias e um toque balsâmico",
        paladar: "Encorpado, com taninos presentes mas sedosos. Final longo com notas de chocolate negro"
      },
      consumo: "Ideal para acompanhar carnes vermelhas grelhadas ou assadas em forno a lenha, pratos de caça, bacalhau, enchidos, queijos e patês.",
      temperatura: "16 a 18°C",
      technical: {
        alcohol: "13,5%",
        acidity: "5.3 g/L",
        sugar: "0.7 g/L",
        ph: "3.65"
      },
      awards: ["Medalha de Ouro - Concurso Mundial 2023", "92 pontos - Revista Wine Spectator"],
      highlighted: false,
      sold_out: true,
      oaked: true
    },
    // outros vinhos
  ];
  
  export const oliveOils = [
    {
      id: 1,
      name: "Azeite Virgem Extra Casttêdo",
      description: "...",
      price: 15.99
      // outras propriedades
    },
    // outros azeites
  ];