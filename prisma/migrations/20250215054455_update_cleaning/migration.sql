/*
  Warnings:

  - Added the required column `updatedAt` to the `SubTema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tema` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SubTema_nama_key";

-- AlterTable
ALTER TABLE "SubTema" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tema" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
