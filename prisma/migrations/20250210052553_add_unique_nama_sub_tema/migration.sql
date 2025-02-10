/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `SubTema` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubTema_nama_key" ON "SubTema"("nama");
