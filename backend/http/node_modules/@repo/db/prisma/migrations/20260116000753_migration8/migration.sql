-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "creatorId" TEXT;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
