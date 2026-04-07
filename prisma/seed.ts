import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const barberEmail = "barbeiro@barbearia.com";
  const barberPassword = "123456";

  const existingBarber = await prisma.barber.findUnique({
    where: { email: barberEmail },
  });

  if (existingBarber) {
    console.log("Barbeiro já existe.");
    return;
  }

  const hashedPassword = await bcrypt.hash(barberPassword, 10);

  await prisma.barber.create({
    data: {
      name: "Leonardo Barber",
      email: barberEmail,
      password: hashedPassword,
    },
  });

  console.log("Barbeiro criado com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro ao rodar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });