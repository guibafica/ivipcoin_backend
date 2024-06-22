<h1 align="center">ivipcoin</h1>

<h2 align="center"> *** EM CONSTRUÇÃO *** </h2>

## About this Project

Aplicação de gerenciamento de tarefas.

A aplicação deve ser capaz de criar, atualizar e excluir tarefas. As tarefas devem ter um título e uma descrição. O back-end deve ser responsável por armazenar as tarefas em um banco de dados Firebase e disponibilizá-las para o front-end.

## Funcionalidades

- Requisitos Obrigatório:

  - Implementar autenticação de usuários.
  - Implementar paginação na listagem de tarefas.
  - Implementar busca de tarefas.
  - Implementar filtros na listagem de tarefas.

- Frontend

  - As tarefas devem ser exibidas em uma lista na tela.

- Backend
  - Responsável por armazenar as tarefas em um banco de dados Firebase.
  - Disponibiliza as tarefas para o frontend.
  - Rotas para criar, atualizar e excluir tarefas.

## Tecnologias do projeto

- React.JS: Biblioteca JavaScript de código aberto para construir interfaces de usuário.
- Material UI: Biblioteca de componentes de interface de usuário.
- Node.js: Ambiente de execução JavaScript que permite executar código JavaScript no lado do servidor.
- TypeScript: Superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem estática.
- Banco de Dados Firebase: Plataforma desenvolvida pelo Google que oferece diversos serviços para facilitar o desenvolvimento de aplicativos.
- Express: Framework web minimalista e flexível para Node.js.
- Radix: Coleção de componentes JavaScript para construir interfaces de usuário.
- Date-fns: Biblioteca moderna e simples para manipulação de datas em JavaScript.
- Lucide: Biblioteca de ícones para React.
- Sonner: Biblioteca para utilização de toast.
- Tailwind: Framework de CSS altamente personalizável e de baixo nível para desenvolvimento de interfaces web.
- Zod: Biblioteca JavaScript desenvolvida para validação de dados de forma eficiente e declarativa.

# Como rodar o projeto

Versão do node utilizada: v20.9.0

## Aplicação

```bash
# Para instalar as dependências do projeto
yarn
```

- Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_CLIENT_EMAIL=your_client_email
     FIREBASE_PRIVATE_KEY="your_private_key"
```

```bash
# Roda a aplicação -> http://localhost:5173
yarn dev
```

# Author

Made with 💚 by Guilherme Bafica 👋

[![LinkedIn Badge](https://img.shields.io/badge/-GuilhermeBafica-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/guilhermebafica/)](https://www.linkedin.com/in/guilhermebafica/)
