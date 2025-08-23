
# E-commerce Next.js (Página de Produto + Carrinho)

Projeto de e-commerce desenvolvido em Next.js + TypeScript, seguindo MVC, SOLID, integração com API RESTful, e usando Material UI.

---

## Principais Tecnologias e Bibliotecas

- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- [React Context API](https://react.dev/reference/react/createContext) (para carrinho)
- Estrutura recomendada: src/ (components, models, controllers, services, context, pages)

---

## Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/dhnasci/loja-next.git
cd loja-next
```

2. **Instale as dependências principais:**

```bash
npm install
```
ou
```bash
yarn
```

3. **Instale as bibliotecas obrigatórias:**

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```
ou
```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure a URL do backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3010
```

---

## Rodando o Projeto

```bash
npm run dev
```
ou
```bash
yarn dev
```

Acesse o sistema em [http://localhost:3000](http://localhost:3000)

---

## Estrutura das Principais Pastas

```
src/
  components/         # Componentes de UI (ProductDetails, CartSummary, etc)
  controllers/        # Lógicas de integração com a API (CartController, ProductController)
  services/           # Lógicas de negócio (ProductService, etc)
  repositories/       # Acesso externo à API (ProductRepository, etc)
  context/            # Estado global (ex: CartContext)
  models/             # Tipos/Interfaces TypeScript (Product, CartItem)
  pages/              # Rotas/Páginas Next.js (ex: index.tsx, product/[id].tsx)
  styles/             # (globals.css e outros arquivos de estilo)
```

---

## Funcionalidades

- Exibe lista de produtos e página de detalhes do produto
- Permite adicionar produtos ao carrinho (persistência via API)
- Mostra e gerencia carrinho (resumo lateral/flutuante)
- Suporte a preço promocional
- Estrutura pronta para extensão (serviços, repositórios, controllers separados)

---

## Observações

- Certifique-se de que sua **API REST** (node/Java/spring etc) esteja rodando no endereço configurado (`NEXT_PUBLIC_API_URL`).
- Estrutura pronta para outros endpoints, é só criar componente/page/Controller/Repository/Service conforme padrão.
- Se for utilizar upload de imagem como arquivo, será necessário adaptar o form e a API.

---

## Scripts úteis

- `npm run dev` / `yarn dev`: inicia o servidor em modo desenvolvimento
- `npm run build` / `yarn build`: build de produção
- `npm start` / `yarn start`: executa o build de produção

---

## Licença

MIT

---
