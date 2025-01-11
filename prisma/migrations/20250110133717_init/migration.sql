/*
  Warnings:

  - You are about to drop the column `tekik` on the `Batik` table. All the data in the column will be lost.
  - Added the required column `teknik` to the `Batik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batik" DROP COLUMN "tekik",
ADD COLUMN     "teknik" TEXT NOT NULL;
