/*
  Warnings:

  - You are about to drop the column `price` on the `Pogs` table. All the data in the column will be lost.
  - Added the required column `current_price` to the `Pogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_price` to the `Pogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pogs" DROP COLUMN "price",
ADD COLUMN     "current_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "previous_price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "UserPogs" (
    "id" SERIAL NOT NULL,
    "pogs_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserPogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "wallet" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
