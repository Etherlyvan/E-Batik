-- CreateTable
CREATE TABLE "TemaTranslation" (
    "id" SERIAL NOT NULL,
    "temaId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "TemaTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTemaTranslation" (
    "id" SERIAL NOT NULL,
    "subTemaId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "SubTemaTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemaTranslation_temaId_languageId_key" ON "TemaTranslation"("temaId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "SubTemaTranslation_subTemaId_languageId_key" ON "SubTemaTranslation"("subTemaId", "languageId");

-- AddForeignKey
ALTER TABLE "TemaTranslation" ADD CONSTRAINT "TemaTranslation_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemaTranslation" ADD CONSTRAINT "TemaTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTemaTranslation" ADD CONSTRAINT "SubTemaTranslation_subTemaId_fkey" FOREIGN KEY ("subTemaId") REFERENCES "SubTema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTemaTranslation" ADD CONSTRAINT "SubTemaTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
