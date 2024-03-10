# Projeto de Sistema de Gerenciamento de Clientes
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=dark&style=for-the-badge)

## Tecnologias Utilizadas
<img align="center" alt="Matheusxr77-NodeJs" height="50" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg">
<img align="center" alt="Matheusxr77-React" height="50" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
<img align="center" alt="Matheusxr77-JavaScript" height="50" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
<img align="center" alt="Matheusxr77-Postgresql" height="50" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-plain.svg">
<img align="center" alt="Matheusxr77-Postman" height="50" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-plain.svg">

## Como Executar
Siga cada passo cuidadosamente para garantir uma execução plena do projeto.

+ Pré-requisitos:
- Antes de começar, certifique-se de ter instalado:
    ```
    npm install pg
    npm instal express
    npm install body-parser
    npm install dotenv
    npm install jest
    npm install express
    npm install supertest --save-dev
    npm install -g create-react-app
    npm install axios
    ```

- Clone este repositório em sua máquina local usando o seguinte comando:
    ```
    bash Copy code git clone https://github.com/Matheusxr77/Projeto-Gerenciamento-Clientes.git
    ```

- Observe a conexão com seu banco de dados em backend/config/conexão.js:
    ```
    database: 'database-name'
    password: 'your-password'
    ```

- Inicie o projeto na url local após o uso do comando:
    ```
    node app.js
    ```

## Instruções
Uma empresa que realiza limpeza em residências enfrenta desafios no gerenciamento de seus clientes e busca uma solução eficiente para cadastrar e visualizar as informações que hoje são controladas em planilhas. Para centralizar as informações e ajudar na expansão da empresa, ela deseja uma plataforma onde seja possível gerenciar os seus clientes. O sistema deve ser composto por um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React.
A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone.
Na plataforma criada deve ser possível:
+ Listar os seus clientes e filtrar com base nas informações cadastradas
+ Cadastrar clientes novos
Suponha que, além de cadastrar e visualizar clientes, a empresa deseja otimizar as rotas de atendimento para maximizar a eficiência na visitação dos clientes. Considere um mapa bidimensional representando a localização dos clientes, onde cada ponto cartesiano possui um cliente. Cada cliente cadastrado possui uma coordenada X e uma coordenada Y nesse mapa.
O objetivo é calcular a rota partindo da empresa (0,0) e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.
O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.
Implemente um botão na tela de clientes que, ao ser clicado, abre uma modal e mostra a ordem de visitação dos clientes na rota calculada. A visualização pode ser a mais simples possível mostrando uma lista dos clientes na ordem que devem ser visitados do primeiro ao último cliente da rota.
Ao desenvolver essa segunda parte, altere a rota de cadastro e visualização para que seja possível cadastrar e visualizar as coordenadas X e Y dos clientes da empresa.