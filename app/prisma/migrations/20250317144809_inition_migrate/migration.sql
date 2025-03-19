-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "imagemDestaque" TEXT,
    "descricao" TEXT NOT NULL,
    "cliente" TEXT,
    "localizacao" TEXT,
    "ano" INTEGER NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagemAdicional" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "ImagemAdicional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagemAdicional" ADD CONSTRAINT "ImagemAdicional_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
