/*
  Warnings:

  - A unique constraint covering the columns `[senha]` on the table `Barbeiro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Barbeiro_senha_key` ON `Barbeiro`(`senha`);

-- CreateIndex
CREATE UNIQUE INDEX `Cliente_telefone_key` ON `Cliente`(`telefone`);
