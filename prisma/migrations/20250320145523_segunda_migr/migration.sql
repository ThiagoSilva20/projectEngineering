/*
  Warnings:

  - You are about to drop the `ImagemAdicional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagemAdicional" DROP CONSTRAINT "ImagemAdicional_projetoId_fkey";

-- AlterTable
ALTER TABLE "Projeto" ADD COLUMN     "imagensAdicionais" TEXT[];

-- DropTable
DROP TABLE "ImagemAdicional";
