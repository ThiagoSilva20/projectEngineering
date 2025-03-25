/*
  Warnings:

  - The `imagemDestaque` column on the `Projeto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "imagemDestaque",
ADD COLUMN     "imagemDestaque" TEXT[];
