## Barbershop Appointment System 💈
REST API for managing barbershop appointments, eliminating the need for manual scheduling via WhatsApp. Built with Node.js, TypeScript, Prisma ORM and MySQL.

---

## Features 🛠️
- Barber registration and authentication with JWT
- Authentication middleware for route protection
- Full CRUD for services
- Client registration
- Appointment creation with business validations
- Appointment confirmation and cancellation
- Appointment listing by date

---

## Tech Stack 💻
- **Node.js** — JavaScript runtime
- **TypeScript** — Static typing
- **Express** — HTTP framework
- **Prisma ORM** — Database communication
- **MySQL** — Relational database
- **JWT** — Authentication and access control
- **Bcrypt** — Password hashing

---

## Architecture 📐
The project follows a layered architecture (Controller → Service → Repository), ensuring separation of concerns and ease of maintenance.
```
src/
├── modules/
│   ├── barbers/
│   │   ├── barbers.controller.ts
│   │   ├── barbers.service.ts
│   │   ├── barbers.repository.ts
│   │   └── barbers.routes.ts
│   ├── clients/
│   ├── services/
│   └── appointments/
├── shared/
│   └── middlewares/
│       └── auth.middleware.ts
├── config/
│   └── prisma.ts
├── app.ts
└── server.ts
```

---

## API Routes 🔗

### Barbers
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /barbers | Register barber | ❌ |
| POST | /login | Barber login | ❌ |

### Services
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /services | List services | ❌ |
| POST | /services | Create service | ✅ |
| PUT | /services/:id | Update service | ✅ |
| DELETE | /services/:id | Delete service | ✅ |

### Clients
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /clients | Register client | ❌ |
| PUT | /clients/:id | Update client | ✅ |
| DELETE | /clients/:id | Delete client | ✅ |

### Appointments
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /appointments | Create appointment | ❌ |
| GET | /appointments?date= | List by date | ✅ |
| PUT | /appointments/:id | Update status | ✅ |
| DELETE | /appointments/:id | Delete appointment | ✅ |

---

## Getting Started ▶️

1. Clone the repository:
```bash
git clone https://github.com/leonardonascferreira/barbearia-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/barbershop_db"
JWT_SECRET="your_secret_key"
```

4. Run migrations:
```bash
npx prisma migrate dev
```

5. Start the server:
```bash
npm run dev
```

---

## Contact 📧
- [LinkedIn](https://linkedin.com/in/leonardonascferreira)
- [E-mail](mailto:leonardonascferreira@gmail.com)
