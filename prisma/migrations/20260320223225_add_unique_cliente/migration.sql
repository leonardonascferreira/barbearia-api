/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Barbeiro_senha_key` ON `barbeiro`;

-- CreateIndex
CREATE UNIQUE INDEX `Cliente_email_key` ON `Cliente`(`email`);
