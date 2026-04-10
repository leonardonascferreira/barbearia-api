# Barbershop Appointment System 💈

REST API para gerenciamento de agendamentos de barbearia, eliminando o controle manual via WhatsApp. Construída com Node.js, TypeScript, Prisma ORM e MySQL.

---

## Funcionalidades 🛠️

- Autenticação do barbeiro via e-mail + senha com JWT
- Middleware de autenticação para proteção de rotas
- CRUD completo de serviços
- Cadastro de clientes (criação automática no primeiro agendamento)
- Criação de agendamentos com validações de negócio:
  - Horário deve ser no futuro
  - Colisão de horários considerando a **duração do serviço**
  - Horário dentro do funcionamento da barbearia (08h–18h)
- Confirmação, conclusão e cancelamento com **transições de status validadas**
- Listagem de agendamentos por data
- Consulta de **horários disponíveis** por dia, barbeiro e serviço

---

## Tech Stack 💻

- **Node.js** — runtime JavaScript
- **TypeScript** — tipagem estática
- **Express** — framework HTTP
- **Prisma ORM** — comunicação com banco de dados
- **MySQL** — banco de dados relacional
- **JWT** — autenticação e controle de acesso
- **Bcrypt** — hash de senha

---

## Arquitetura 📐

O projeto segue arquitetura em camadas (Controller → Service → Repository), garantindo separação de responsabilidades e facilidade de manutenção.

```
src/
├── modules/
│   ├── barbers/
│   │   ├── barbers.controller.ts   ← recebe e responde requisições HTTP
│   │   ├── barbers.service.ts      ← regras de negócio
│   │   ├── barbers.repository.ts   ← acesso ao banco via Prisma
│   │   └── barbers.routes.ts       ← definição das rotas
│   ├── clients/
│   ├── services/
│   └── appointments/
├── shared/
│   └── middlewares/
│       └── auth.middleware.ts      ← validação JWT + injeção de req.user
├── config/
│   └── prisma.ts                   ← singleton do PrismaClient
├── app.ts                          ← setup do Express
└── server.ts                       ← ponto de entrada
prisma/
├── schema.prisma                   ← modelos e enum AppointmentStatus
├── seed.ts                         ← criação do barbeiro fixo
└── migrations/
```

---

## Decisões de Design 🧠

### Barbeiro único via seed
O endpoint `POST /barbers` foi removido. O barbeiro é criado uma única vez via `npx prisma db seed`, lendo as credenciais do `.env`. Isso impede que qualquer pessoa crie uma conta com privilégios administrativos pela API pública.

### Login por e-mail (não username)
O campo `username` foi substituído por `email` único no modelo `Barber`. E-mail é mais natural para recuperação de conta e menos ambíguo.

### Agendamento sem clientId
`POST /appointments` aceita `clientPhone`, `clientName` e `clientEmail` diretamente. O backend localiza o cliente existente pelo telefone ou cria um novo automaticamente. Isso elimina a necessidade do frontend chamar `POST /clients` separadamente antes de agendar.

### Colisão por intervalo (não por horário exato)
A verificação de conflito considera a **duração do serviço**. Se um corte dura 60 minutos e começa às 10h, o horário das 10h30 também fica bloqueado para o mesmo barbeiro.

### Status como enum
`AppointmentStatus` é um enum Prisma com quatro valores: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELED`. As transições válidas são:
```
PENDING   → CONFIRMED | CANCELED
CONFIRMED → COMPLETED | CANCELED
COMPLETED → (terminal)
CANCELED  → (terminal)
```

### req.user no middleware
O middleware de autenticação injeta o payload do JWT em `req.user` para que as rotas autenticadas acessem o contexto do barbeiro sem redecodificar o token.

---

## Rotas da API 🔗

### Autenticação
| Método | Rota     | Descrição            | Auth |
|--------|----------|----------------------|------|
| POST   | /login   | Login do barbeiro    | ❌   |

### Serviços
| Método | Rota           | Descrição              | Auth |
|--------|----------------|------------------------|------|
| GET    | /services      | Listar serviços        | ❌   |
| POST   | /services      | Criar serviço          | ✅   |
| PUT    | /services/:id  | Atualizar serviço      | ✅   |
| DELETE | /services/:id  | Remover serviço        | ✅   |

### Clientes
| Método | Rota           | Descrição              | Auth |
|--------|----------------|------------------------|------|
| POST   | /clients       | Cadastrar cliente      | ❌   |
| PUT    | /clients/:id   | Atualizar cliente      | ✅   |
| DELETE | /clients/:id   | Remover cliente        | ✅   |

### Agendamentos
| Método | Rota                          | Descrição                           | Auth |
|--------|-------------------------------|-------------------------------------|------|
| POST   | /appointments                 | Criar agendamento                   | ❌   |
| GET    | /availability?date=&barberId=&serviceId= | Horários disponíveis     | ❌   |
| GET    | /appointments?date=           | Listar agendamentos do dia          | ✅   |
| PUT    | /appointments/:id             | Atualizar status                    | ✅   |
| DELETE | /appointments/:id             | Remover agendamento                 | ✅   |

---

## Exemplos de Payload 📋

### POST /login
```json
{
  "email": "barbeiro@email.com",
  "password": "suaSenha"
}
```

### POST /appointments
```json
{
  "scheduledAt": "2026-04-15T10:00:00.000Z",
  "barberId": 1,
  "serviceId": 2,
  "clientPhone": "11999999999",
  "clientName": "João Silva",
  "clientEmail": "joao@email.com"
}
```
> `clientName` é obrigatório apenas no primeiro agendamento do cliente.
> `clientEmail` é sempre opcional.

### PUT /appointments/:id
```json
{ "status": "CONFIRMED" }
```

### GET /availability
```
GET /availability?date=2026-04-15&barberId=1&serviceId=2
```
Retorna lista de slots livres:
```json
[
  { "time": "2026-04-15T08:00:00.000Z" },
  { "time": "2026-04-15T08:30:00.000Z" }
]
```

---

## Como Rodar ▶️

### 1. Clone o repositório
```bash
git clone https://github.com/leonardonascferreira/barbearia-api
cd barbearia-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o `.env`
```env
DATABASE_URL="mysql://user:password@localhost:3306/barbershop_db"
JWT_SECRET="sua_chave_secreta_jwt"

# Credenciais do barbeiro para o seed
BARBER_NAME="Seu Nome"
BARBER_EMAIL="barbeiro@email.com"
BARBER_PASSWORD="sua_senha_segura"
```

### 4. Execute as migrations
```bash
npx prisma migrate dev
```

### 5. Crie o barbeiro via seed
```bash
npx prisma db seed
```

### 6. Inicie o servidor
```bash
npm run dev
```

---

## Contato 📧
- [LinkedIn](https://linkedin.com/in/leonardonascferreira)
- [E-mail](mailto:leonardonascferreira@gmail.com)
