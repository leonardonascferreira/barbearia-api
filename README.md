## Sistema de Agendamento para Barbearia 💈

Este é um **sistema de agendamento para barbearia** desenvolvido em **Node.js com TypeScript**, utilizando **Prisma ORM** e banco de dados **MySQL**.  
O projeto foi desenvolvido como **projeto acadêmico**, com foco na construção de uma API REST completa, aplicando conceitos reais de back-end como autenticação, organização em camadas e regras de negócio.

---

## Funcionalidades 🛠️

* Cadastro e login de barbeiros com autenticação via JWT;
* Middleware de autenticação para proteção de rotas;
* CRUD completo de serviços com autenticação;
* Cadastro de clientes;
* Criação de agendamentos com validações;
* Confirmação de agendamentos;
* Cancelamento de agendamentos;

---

## Tecnologias e Conceitos 💻

* **Node.js** – Construção da API;
* **TypeScript** – Tipagem estática e melhor organização do código;
* **Prisma ORM** – Manipulação e comunicação com o banco de dados;
* **MySQL** – Armazenamento de dados;
* **JWT (JSON Web Token)** – Autenticação e controle de acesso;
* **Middleware de autenticação** – Proteção de rotas;
* **Arquitetura em camadas** – Separação entre controllers, services e middlewares;
* **Validação de regras de negócio** – Controle de agendamentos;

---

## Como usar ▶️

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/database"
```

4. Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

---

## Estrutura do Projeto 📁
```bash
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── prisma/
```

## Contato 📧
- [Meu E-mail](mailto:leonardonascferreira@gmail.com)
