-- CreateTable
CREATE TABLE "Pogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Pogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_name_key" ON "Pogs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_ticker_symbol_key" ON "Pogs"("ticker_symbol");
