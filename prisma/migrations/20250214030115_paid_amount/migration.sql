/*
  Warnings:

  - Added the required column `paid_amount` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "paid_amount" INTEGER NOT NULL;
