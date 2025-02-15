/*
  Warnings:

  - You are about to drop the column `histori` on the `Batik` table. All the data in the column will be lost.
  - Added the required column `histori` to the `BatikTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batik" DROP COLUMN "histori";

-- AlterTable
ALTER TABLE "BatikTranslation" ADD COLUMN     "histori" TEXT NOT NULL;
