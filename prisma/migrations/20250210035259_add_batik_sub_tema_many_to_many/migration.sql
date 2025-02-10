-- CreateTable
CREATE TABLE "_BatikSubTema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BatikSubTema_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BatikSubTema_B_index" ON "_BatikSubTema"("B");

-- AddForeignKey
ALTER TABLE "_BatikSubTema" ADD CONSTRAINT "_BatikSubTema_A_fkey" FOREIGN KEY ("A") REFERENCES "Batik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatikSubTema" ADD CONSTRAINT "_BatikSubTema_B_fkey" FOREIGN KEY ("B") REFERENCES "SubTema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
