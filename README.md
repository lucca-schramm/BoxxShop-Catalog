# BoxxShop - Página de Produto

Este projeto é uma aplicação web React que implementa uma página de produto de e-commerce moderna e responsiva. A aplicação utiliza Tailwind CSS para estilização e Zustand para gerenciamento de estado.

## Funcionalidades

- **Galeria de Imagens**
  - Imagem principal que ocupa 35% da tela
  - Miniaturas de outras imagens do produto
  - Troca de imagem principal ao clicar nas miniaturas

- **Informações do Produto**
  - Título e preço do produto
  - Seletores de variantes (Tamanho e Cor)
  - Variantes geradas dinamicamente a partir de arrays/objetos

- **Calculadora de Frete**
  - Campo para inserção de CEP
  - Validação de CEP através da API ViaCEP
  - Exibição do endereço completo após validação

- **Persistência de Dados**
  - Estado do usuário salvo no localStorage
  - Dados mantidos por 15 minutos após atualização da página
  - Seleções de variantes e endereço preservadas

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Zustand (Gerenciamento de Estado)
- Axios (Requisições HTTP)
- ViaCEP API

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

```
src/
  ├── components/
  │   ├── ProductGallery/
  │   ├── ProductVariants/
  │   ├── ShippingCalculator/
  │   └── ProductPage/
  ├── store/
  │   └── productStore.ts
  ├── App.tsx
  └── index.tsx
```

## Contribuição

Este projeto foi criado como um teste prático e está aberto para contribuições. Sinta-se à vontade para abrir issues ou enviar pull requests.
