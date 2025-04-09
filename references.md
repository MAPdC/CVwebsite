# display

A propriedade display CSS define se um elemento é tratado como um bloco ou elemento inline e o layout usado para seus filhos, como layout de fluxo, grid ou flex.

## display: flex;
O que faz: Ativa o modelo de layout Flexbox

Impacto no projeto:
- Transforma o elemento #root num container flexível
- Permite organizar os elementos filhos (Header, Main, Footer) em coluna

Por que usar?:
- Facilita o alinhamento vertical dos componentes principais
- Resolve problemas comuns de posicionamento de footer

# flex-direction

## flex-direction: column

O que faz: Define a direção dos itens flexíveis

Comportamento:

<div id="root">
  <Header />    <!-- Item 1 (topo) -->
  <Main />      <!-- Item 2 (meio) -->
  <Footer />    <!-- Item 3 (fundo) -->
</div>

Vantagem: Mantém a estrutura lógica do documento (sem precisar de floats ou position absolute)

# min-height: 100vh;

O que faz: Estabelece a altura mínima

Unidade vh:
- 1vh = 1% da altura da viewport (tela visível)
- 100vh = Altura total da janela do navegador

Importância:
- Garante que o conteúdo ocupe pelo menos toda a altura da tela
- Fundamental para manter o footer sempre no fundo em páginas com pouco conteúdo

# background-color: var(--bg-white);
O que faz: Define a cor de fundo

Sistema de variáveis:
- --bg-white deve estar definido no :root (ex: :root { --bg-white: #ffffff; })
- Permite mudanças globais consistentes

# color: var(--text-light);
O que faz: Define a cor do texto padrão

Hierarquia:
- Esta cor será herdada por todos os elementos internos (a menos que sobrescrita)
