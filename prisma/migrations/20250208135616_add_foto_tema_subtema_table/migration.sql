/*
  Warnings:

  - You are about to drop the column `foto` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Batik` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batik" DROP COLUMN "foto",
DROP COLUMN "tema",
ADD COLUMN     "kode" TEXT;

-- CreateTable
CREATE TABLE "Foto" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "batikId" INTEGER NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tema" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "batikId" INTEGER NOT NULL,

    CONSTRAINT "Tema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTema" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "temaId" INTEGER NOT NULL,

    CONSTRAINT "SubTema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "Batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "Batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTema" ADD CONSTRAINT "SubTema_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
