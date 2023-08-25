# Galeria de Produtos - Documentação
Este projeto é uma aplicação web que permite aos usuários visualizar, adicionar, editar e excluir fotos de produtos. Ele utiliza a biblioteca React para criar uma interface de usuário interativa e o Firebase para armazenar as imagens e os metadados relacionados.

# Componentes Principais
App.tsx
Este é o componente principal da aplicação, responsável por gerenciar o estado geral da galeria de produtos e renderizar outros componentes, como PhotoList e Form. Principais características:

Carrega e exibe as fotos iniciais ao montar o componente.
Manipula a exclusão de fotos.
Permite filtrar as fotos por nome, descrição, categoria e liga.
Renderiza componentes diferentes com base no estado, incluindo indicador de carregamento e mensagens quando não há fotos.

EditModal.tsx
Este componente permite editar informações de uma foto. Ele é exibido dentro do componente PhotoItem quando o botão "Editar" é clicado. Principais características:

Mantém um estado local para rastrear informações da foto sendo editada.
Ao clicar em "Salvar", atualiza as informações da foto e envia para o servidor.
Renderiza um modal de edição somente quando ativado.
PhotoItem.tsx
Este componente exibe os detalhes de uma foto individual na galeria. Ele também permite excluir e editar fotos. Principais características:

Controla o estado local para determinar se o modal de edição está aberto.
Define funções para lidar com cliques nos botões de exclusão e edição.
Renderiza o modal de edição quando necessário.
PhotoList.tsx
Este componente renderiza a lista de fotos, aplicando o filtro de pesquisa e passando as funções de exclusão para os itens individuais PhotoItem. Principais características:

Aplica o filtro de pesquisa às fotos com base nas propriedades da foto.
Mapeia e renderiza os itens individuais da galeria.

Form.tsx
Este componente é responsável pelo formulário de upload de fotos. Ele aceita informações do usuário, como nome, descrição, categoria e outras propriedades, e as envia para o servidor para upload. Principais características:

Mantém um estado local para controlar o estado do upload e a pré-visualização da imagem.
Manipula o envio do formulário e o upload da imagem para o servidor.
Mostra uma pré-visualização da imagem selecionada.
Utilização do Firebase
O aplicativo utiliza o Firebase para armazenar e recuperar imagens e metadados associados. Os seguintes arquivos são relevantes para essa integração:

firebase.js
Este arquivo configura a conexão com o Firebase, permitindo o uso de serviços de armazenamento.

services/photos.js
Este arquivo contém funções para interagir com o serviço de fotos no Firebase:

getAll: Recupera todas as fotos da galeria com seus metadados.
getFilteredPhotos: Recupera fotos filtradas com base em critérios de pesquisa.
sentPhotos: Faz o upload de uma nova foto para o Firebase.
deletePhoto: Exclui uma foto do Firebase.
editPhoto: Edita os metadados de uma foto existente no Firebase.

# Como Executar o Projeto
Clone o repositório para o seu ambiente local.
Instale as dependências utilizando o comando npm install.
Inicie o servidor de desenvolvimento com npm start.
Acesse o projeto no navegador em http://localhost:3000.

# Aviso
Este projeto foi criado para fins educacionais e práticos. Certifique-se de ter compreendido as implicações do uso do Firebase e outras tecnologias antes de implementar em um ambiente de produção.
