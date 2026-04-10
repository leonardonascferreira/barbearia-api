import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.BARBER_NAME
  const email = process.env.BARBER_EMAIL
  const password = process.env.BARBER_PASSWORD

  if (!name || !email || !password) {
    throw new Error(
      'Defina BARBER_NAME, BARBER_EMAIL e BARBER_PASSWORD no .env antes de rodar o seed.'
    )
  }

  // Verifica se o barbeiro já existe para evitar duplicata em re-execuções.
  const existing = await prisma.barber.findUnique({
    where: { email: barberEmail },
  });

  if (existing) {
    console.log(`Barbeiro já cadastrado: ${existing.email}`);
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const barber = await prisma.barber.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
  });

  console.log(`Barbeiro criado: ${barber.name} (${barber.email})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });