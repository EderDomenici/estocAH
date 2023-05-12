-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorVenda" DOUBLE PRECISION,
    "estoque" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrada" (
    "idEntrada" SERIAL NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorCompra" DOUBLE PRECISION NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Entrada_pkey" PRIMARY KEY ("idEntrada")
);

-- CreateTable
CREATE TABLE "Saida" (
    "id" SERIAL NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "totalVenda" DOUBLE PRECISION,
    "name" TEXT NOT NULL,

    CONSTRAINT "Saida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItensVenda" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "saidaId" INTEGER,

    CONSTRAINT "ItensVenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saida" ADD CONSTRAINT "Saida_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVenda" ADD CONSTRAINT "ItensVenda_saidaId_fkey" FOREIGN KEY ("saidaId") REFERENCES "Saida"("id") ON DELETE SET NULL ON UPDATE CASCADE;
