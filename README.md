## Sistema de Agendamento para Barbearia 💈

API REST para gerenciamento de agendamentos de barbearia, eliminando a necessidade de controle manual via WhatsApp. Desenvolvida com Node.js, TypeScript, Prisma ORM e MySQL.

---

## Funcionalidades 🛠️

- Cadastro e autenticação de barbeiros com JWT
- Middleware de autenticação para proteção de rotas
- CRUD completo de serviços
- Cadastro de clientes
- Criação de agendamentos com validações de negócio
- Confirmação e cancelamento de agendamentos
- Listagem de agendamentos por data

---

## Tecnologias 💻

- **Node.js** — Runtime JavaScript
- **TypeScript** — Tipagem estática
- **Express** — Framework HTTP
- **Prisma ORM** — Comunicação com banco de dados
- **MySQL** — Banco de dados relacional
- **JWT** — Autenticação e controle de acesso
- **Bcrypt** — Hash de senhas

---

## Arquitetura 📐

O projeto segue uma arquitetura em camadas (Controller → Service → Repository), garantindo separação de responsabilidades e facilidade de manutenção.
```
src/
├── modules/
│   ├── barbeiros/
│   │   ├── barbeiros.controller.ts
│   │   ├── barbeiros.service.ts
│   │   ├── barbeiros.repository.ts
│   │   └── barbeiros.routes.ts
│   ├── clientes/
│   ├── servicos/
│   └── agendamentos/
├── shared/
│   └── middlewares/
│       └── auth.middleware.ts
├── config/
│   └── prisma.ts
├── app.ts
└── server.ts
```

---

## Rotas da API 🔗

### Barbeiros
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /barbeiros | Cadastro de barbeiro | ❌ |
| POST | /login | Login do barbeiro | ❌ |

### Serviços
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /servicos | Listar serviços | ❌ |
| POST | /servicos | Criar serviço | ✅ |
| PUT | /servicos/:id | Atualizar serviço | ✅ |
| DELETE | /servicos/:id | Deletar serviço | ✅ |

### Clientes
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /clientes | Cadastrar cliente | ❌ |

### Agendamentos
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /agendamentos | Criar agendamento | ❌ |
| GET | /agendamentos?data= | Listar por data | ✅ |
| PUT | /agendamentos/:id | Atualizar status | ✅ |
| DELETE | /agendamentos/:id | Deletar agendamento | ✅ |

---

## Como executar ▶️

1. Clone o repositório:
```bash
git clone https://github.com/leonardonascferreira/barbearia-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o `.env`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/barbearia_db"
JWT_SECRET="sua_chave_secreta"
```

4. Execute as migrations:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

---

## Contato 📧

- [LinkedIn](https://linkedin.com/in/leonardonascferreira)
- [E-mail](mailto:leonardonascferreira@gmail.com)
