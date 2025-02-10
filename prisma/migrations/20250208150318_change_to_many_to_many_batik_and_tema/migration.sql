/*
  Warnings:

  - You are about to drop the column `batikId` on the `Tema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tema" DROP CONSTRAINT "Tema_batikId_fkey";

-- AlterTable
ALTER TABLE "Tema" DROP COLUMN "batikId";

-- CreateTable
CREATE TABLE "_BatikTema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BatikTema_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BatikTema_B_index" ON "_BatikTema"("B");

-- AddForeignKey
ALTER TABLE "_BatikTema" ADD CONSTRAINT "_BatikTema_A_fkey" FOREIGN KEY ("A") REFERENCES "Batik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatikTema" ADD CONSTRAINT "_BatikTema_B_fkey" FOREIGN KEY ("B") REFERENCES "Tema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
