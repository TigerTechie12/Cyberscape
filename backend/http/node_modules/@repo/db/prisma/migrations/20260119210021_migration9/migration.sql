/*
  Warnings:

  - Added the required column `thumbnail` to the `Maps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Maps" ADD COLUMN     "thumbnail" TEXT NOT NULL;
