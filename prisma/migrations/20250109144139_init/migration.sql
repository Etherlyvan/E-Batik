-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batik" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "warna" TEXT NOT NULL,
    "tekik" TEXT NOT NULL,
    "jenis_kain" TEXT NOT NULL,
    "pewarna" TEXT NOT NULL,
    "bentuk" TEXT NOT NULL,
    "histori" TEXT NOT NULL,
    "dimensi" TEXT NOT NULL,

    CONSTRAINT "Batik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Batik" ADD CONSTRAINT "Batik_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
