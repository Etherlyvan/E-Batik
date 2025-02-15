/*
  Warnings:

  - You are about to drop the column `bentuk` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `jenisKain` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `pewarna` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `teknik` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `warna` on the `Batik` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batik" DROP COLUMN "bentuk",
DROP COLUMN "jenisKain",
DROP COLUMN "pewarna",
DROP COLUMN "teknik",
DROP COLUMN "warna";

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatikTranslation" (
    "id" SERIAL NOT NULL,
    "batikId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "warna" TEXT NOT NULL,
    "teknik" TEXT NOT NULL,
    "jenisKain" TEXT NOT NULL,
    "pewarna" TEXT NOT NULL,
    "bentuk" TEXT NOT NULL,

    CONSTRAINT "BatikTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BatikTranslation_batikId_languageId_key" ON "BatikTranslation"("batikId", "languageId");

-- AddForeignKey
ALTER TABLE "BatikTranslation" ADD CONSTRAINT "BatikTranslation_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "Batik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatikTranslation" ADD CONSTRAINT "BatikTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
