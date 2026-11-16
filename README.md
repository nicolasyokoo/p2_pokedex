
# Pokédex Explorer

Projeto acadêmico desenvolvido em React, com o objetivo de
criar uma aplicação web interativa para consultar, cadastrar,
editar e gerenciar Pokémon da primeira geração.

## Tecnologias utilizadas

- React 18
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Context API
- localStorage
- Git e GitHub

## Funcionalidades do sistema

- Visualização dos 151 Pokémon da primeira geração
- Pesquisa de Pokémon por nome ou número
- Filtros por tipo e situação de captura
- Ordenação por nome ou número
- Visualização de detalhes dos Pokémon
- Cadastro de novos Pokémon
- Edição de informações e atributos
- Exclusão de Pokémon
- Sistema de favoritos
- Marcação de Pokémon capturados
- Dashboard com estatísticas da coleção
- Upload de imagens personalizadas
- Exportação dos dados em JSON
- Armazenamento local das informações

## Estrutura do projeto

- public/ - Arquivos públicos da aplicação
- src/pages/ - Páginas do sistema
- src/components/ - Componentes reutilizáveis
- src/context/ - Gerenciamento de estados com Context API
- src/data/ - Dados iniciais dos Pokémon
- src/utils/ - Funções auxiliares
- src/App.js - Configuração das rotas
- src/styles.css - Estilização da aplicação

## Como executar o projeto

### Pré-requisitos

É necessário possuir Node.js e npm instalados.

### Instalação

1. Clone o repositório:

git clone https://github.com/nicolasyokoo/p2_pokedex.git

2. Entre na pasta do projeto:

cd p2_pokedex

3. Instale as dependências:

npm install

4. Inicie a aplicação:

npm start

5. Abra no navegador:

http://localhost:3000

No Windows PowerShell, caso o comando npm seja bloqueado,
utilize npm.cmd install e npm.cmd start.

## Armazenamento de dados

O projeto utiliza localStorage para armazenar as alterações
realizadas pelo usuário.

Os Pokémon cadastrados, modificados, favoritos e capturados
permanecem salvos no navegador, mesmo após atualizar a página.

Não é necessário configurar banco de dados ou servidor PHP.

## Integrantes e responsabilidades

### Nicolas - Cadastro e gerenciamento

- Cadastro de novos Pokémon
- Edição e gerenciamento dos registros
- Gerenciamento de estado com Context API
- Processamento de imagens personalizadas

### Felipe - Pokédex e consulta

- Página inicial e listagem dos Pokémon
- Pesquisa, filtros e ordenação
- Visualização de detalhes
- Favoritos e capturas
- Dados iniciais dos Pokémon

### João - Estrutura e interface

- Estrutura da aplicação React
- Configuração de rotas com React Router
- Componentes de navegação
- Estilização e organização visual
- Integração dos componentes da interface

## Objetivo acadêmico

Aplicar conceitos de desenvolvimento web utilizando React,
componentização, gerenciamento de estados, navegação entre
páginas, operações CRUD e persistência local de dados.

## Observações

Os Pokémon originais possuem dados iniciais, sendo que
alguns atributos são simplificados e podem ser editados.

As imagens oficiais são carregadas de um serviço externo
e precisam de conexão com a internet.

Projeto desenvolvido para fins educacionais.
