-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_mapId_fkey";

-- DropForeignKey
ALTER TABLE "mapElements" DROP CONSTRAINT "mapElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "mapElements" DROP CONSTRAINT "mapElements_mapId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "mapId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "mapElements" ALTER COLUMN "mapId" DROP NOT NULL,
ALTER COLUMN "elementId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spaceElements" ALTER COLUMN "elementId" DROP NOT NULL,
ALTER COLUMN "spaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE SET NULL ON UPDATE CASCADE;
