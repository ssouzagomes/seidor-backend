## 👨🏻‍💻 Sobre esse projeto

## 🚀 Tecnologias
- Node.js
- Express.js
- Typescript

## 💻 Utilizando o projeto

1. Clone o repositório;
2. Instale as dependências: `$ npm install`;
3. Crie o arquivo json onde serão salvos os dados: `$ npm run migrations`;
4. Execute o projeto em modo de desenvolvimento: `$ npm run dev`;
5. Execute os testes de unidade do projeto: `$ npm run test`;

## 🔍 Explicando algumas regras de negócio

- Só serão aceitas placas de carro no padrão Mercosul - `XXX 1X11` - no qual X representa letras maiúsculas e 1 representa um número.
- Não serão aceitos motoristas com exatamente o mesmo nome. Em um sistema comum essa não seria uma validação correta, porém, como este é o único atributo da tabela, além do identificador único, adicionei essa restrição.
