# 💈 Sistema de Agendamento para Barbearia

Este projeto é uma API para gerenciamento de barbearia, permitindo o controle de usuários (barbeiros), clientes, serviços e agendamentos.

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Prisma ORM
- MySQL
- JWT (JSON Web Token)

## 📌 Funcionalidades

### 🔐 Autenticação
- Cadastro de barbeiro
- Login com geração de token JWT
- Middleware de autenticação para rotas protegidas

### ✂️ Serviços
- CRUD completo de serviços
- Rotas protegidas por autenticação

### 👤 Clientes
- Cadastro de clientes

### 📅 Agendamentos
- Criação de agendamentos com validações
- Confirmação de agendamentos
- Cancelamento de agendamentos

## 🔒 Segurança
- Proteção de rotas com middleware de autenticação
- Uso de JWT para controle de sessão

## 📁 Estrutura do Projeto (resumida)
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── prisma/


## ⚙️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone <url-do-repositorio>

Instale as dependências:

npm install

Configure o arquivo .env:
DATABASE_URL="mysql://usuario:senha@localhost:3306/database"
JWT_SECRET="sua_chave_secreta"

Execute as migrations do Prisma:
npx prisma migrate dev

Inicie o servidor:
npm run dev
