/*
  Warnings:

  - The primary key for the `Batik` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_kain` on the `Batik` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Batik` table. All the data in the column will be lost.
  - The `id` column on the `Batik` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jenisKain` to the `Batik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Batik` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Batik` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Batik" DROP CONSTRAINT "Batik_user_id_fkey";

-- AlterTable
ALTER TABLE "Batik" DROP CONSTRAINT "Batik_pkey",
DROP COLUMN "jenis_kain",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jenisKain" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Batik_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";
