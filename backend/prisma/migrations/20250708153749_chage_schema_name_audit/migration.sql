/*
  Warnings:

  - You are about to drop the column `adminName` on the `AuditLog` table. All the data in the column will be lost.
  - Added the required column `adminEmail` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "adminName",
ADD COLUMN     "adminEmail" TEXT NOT NULL;
