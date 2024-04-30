-- CreateTable
CREATE TABLE "_PogsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PogsToUser_AB_unique" ON "_PogsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PogsToUser_B_index" ON "_PogsToUser"("B");

-- AddForeignKey
ALTER TABLE "_PogsToUser" ADD CONSTRAINT "_PogsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PogsToUser" ADD CONSTRAINT "_PogsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
