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
| [Vite 6](https://vitejs.dev/) | Bundler e servidor de desenvolvimento |
| [React Router 7](https://reactrouter.com/) | Navegação client-side (SPA) |
| [Lucide React](https://lucide.dev/) | Iconografia |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones de redes sociais e pesquisa |
| CSS (um ficheiro por componente, global) | Estilização |
| GitHub Actions | CI/CD — build e deploy automático |
| GitHub Pages | Hosting |

---

## Estrutura do Projeto

```
src/
├── assets/          # Imagens, logótipos e ícones
├── components/      # Componentes reutilizáveis (Header, Footer, Carrosséis, Secções)
├── i18n/            # Idiomas (PT/EN): deteção pelo URL, textos partilhados e utilitários
├── mocks/           # Dados dos produtos (vinhos e azeites)
├── pages/           # Páginas da aplicação
├── styles/          # Ficheiros CSS por componente
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

---

## Idiomas

O site existe em português (caminhos na raiz, ex.: `/contacts`) e em inglês (os mesmos caminhos com o prefixo `/en`, ex.: `/en/contacts`). O idioma é sempre lido do URL.

- Textos partilhados (menus, rodapé, etiquetas): `src/i18n/common.js`.
- Textos de cada página: no próprio componente, num objeto `TEXT = { pt: {...}, en: {...} }`.
- Produtos: os campos PT estão no topo de cada produto em `src/mocks/`; o bloco `en` substitui os campos que mudam em inglês.
- Links internos devem passar por `to()` do hook `useLang()`, para manterem o idioma atual.

---

## Deploy

O deploy é feito automaticamente via **GitHub Actions** para o **GitHub Pages** a cada push para o branch `main`. O workflow encontra-se em `.github/workflows/deploy.yml`.

O domínio personalizado `casttedovalley.com` está configurado através do ficheiro `public/CNAME`.

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
