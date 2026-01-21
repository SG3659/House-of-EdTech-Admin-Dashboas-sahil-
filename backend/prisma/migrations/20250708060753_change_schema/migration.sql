/*
  Warnings:

  - You are about to drop the column `submittedAt` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `submittedBy` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" DROP COLUMN "submittedAt",
DROP COLUMN "submittedBy",
ALTER COLUMN "reviewedAt" SET DEFAULT CURRENT_TIMESTAMP;
