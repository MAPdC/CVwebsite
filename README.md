# Casttêdo Valley — Website Institucional

Website institucional desenvolvido para a **Casttêdo Valley**, uma empresa familiar produtora de vinhos DOC Douro e azeites biológicos, com raízes que remontam a 1873.

🌐 **[casttedovalley.com](https://casttedovalley.com)**

---

## Sobre o Projeto

Este projeto nasceu da necessidade de uma presença digital que reflita a identidade e os valores da marca — elegância, tradição e autenticidade — enquanto apresenta o portefólio de produtos a potenciais clientes e visitantes.

O website inclui:

- Página inicial com apresentação da marca e destaque de produtos
- Portefólio de vinhos com páginas de produto individuais (ficha técnica, notas de prova, prémios)
- Portefólio de azeites com estrutura equivalente
- Página de contactos com morada, informações de acesso e experiências disponíveis
- Página de política de privacidade
- Versão em inglês de todo o site (caminhos com o prefixo `/en`), com seletor PT | EN no cabeçalho
- Páginas em desenvolvimento: História, Sustentabilidade e Sobre Nós

---

## Stack Tecnológica

| Tecnologia | Utilização |
|---|---|
| [React 19](https://react.dev/) | Framework de UI |
| [Vite 8](https://vite.dev/) | Bundler e servidor de desenvolvimento |
| [React Router 7](https://reactrouter.com/) | Navegação client-side (SPA) |
| [Lucide React](https://lucide.dev/) | Iconografia |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones de redes sociais e pesquisa |
| CSS (um ficheiro por componente, global) | Estilização |
| Cloudflare Pages | Hosting, build e deploy automático |

---

## Estrutura do Projeto

```
src/
├── assets/          # Imagens, logótipos e ícones
├── components/      # Componentes reutilizáveis (Header, Footer, Carrosséis, Secções, galeria e prémios dos produtos)
├── hooks/           # Comportamentos partilhados (aparecer ao entrar no ecrã, copiar texto)
├── i18n/            # Idiomas (PT/EN): deteção pelo URL, textos partilhados e utilitários
├── mocks/           # Dados dos produtos (vinhos, azeites e Camuflado)
├── seo/             # Título, descrição e dados estruturados de cada página
├── pages/           # Páginas da aplicação
├── styles/          # Ficheiros CSS por componente (variáveis globais em tokens.css)
├── contacts.js      # Email, telefones e mapa
├── legal.js         # Identificação legal, Livro de Reclamações e RAL
├── App.jsx          # Roteamento principal e layout
└── main.jsx         # Ponto de entrada
```

---

## Correr Localmente

**Pré-requisitos:** Node.js 22 (versão indicada em `.nvmrc`)

```bash
# Clonar o repositório
git clone https://github.com/MAPdC/CVwebsite.git
cd CVwebsite

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor fica disponível em `http://localhost:5173`, só neste computador.

Para testar no telemóvel, use `npm run dev:lan`: o servidor fica acessível a toda a rede local, por isso use-o apenas em redes de confiança (nunca em Wi-Fi pública).

```bash
# Build de produção
npm run build

# Pré-visualizar o build
npm run preview
```

### Antes de fazer merge

O CI corre isto em cada PR, mas convém confirmar antes:

```bash
npm run lint -- --max-warnings=0
npm test -- --run
npm run build && npm run preview
```

Algumas coisas só existem no build, por isso o `npm run dev` não as mostra: a compressão das imagens, as páginas HTML geradas por `scripts/generate-pages.mjs` (títulos, sitemap, pré-carregamentos) e as estatísticas do Umami (só contam em `www.casttedovalley.com`). A pré-visualização do Cloudflare de cada branch é a forma mais fiel de rever uma alteração.

---

## Idiomas

O site existe em português (caminhos na raiz, ex.: `/contacts`) e em inglês (os mesmos caminhos com o prefixo `/en`, ex.: `/en/contacts`). O idioma é sempre lido do URL.

- Textos partilhados (menus, rodapé, etiquetas): `src/i18n/common.js`.
- Textos de cada página: no próprio componente, num objeto `TEXT = { pt: {...}, en: {...} }`.
- Produtos: os campos PT estão no topo de cada produto em `src/mocks/`; o bloco `en` substitui os campos que mudam em inglês.
- Links internos devem passar por `to()` do hook `useLang()`, para manterem o idioma atual.

---

## Deploy

O site está alojado no **Cloudflare Pages**, ligado a este repositório:

- Cada push para o branch `main` publica o site em `www.casttedovalley.com`.
- Cada push para outro branch gera uma pré-visualização em `<branch>.casttedovalley.pages.dev`, útil para rever alterações antes de as integrar.
- Build: `npm run build`, pasta de saída `dist`, Node 22 (variável `NODE_VERSION` no projeto e `.nvmrc`).

O DNS do domínio é gerido no Cloudflare (o registo continua na Namecheap). O domínio sem www (`casttedovalley.com`) redireciona com 301 para o www através de uma Redirect Rule do Cloudflare.

---

## Estado do Desenvolvimento

| Página | Estado |
|---|---|
| Início | ✅ Concluída |
| Portefólio de Vinhos | ✅ Concluída |
| Portefólio de Azeites | ✅ Concluída |
| Contactos | ✅ Concluída |
| Política de Privacidade | ✅ Concluída |
| História | 🚧 Em desenvolvimento |
| Sustentabilidade | 🚧 Em desenvolvimento |
| Sobre Nós | 🚧 Em desenvolvimento |

---

## Autor

Desenvolvido por **Miguel Cunha**
- GitHub: [@MAPdC](https://github.com/MAPdC)
