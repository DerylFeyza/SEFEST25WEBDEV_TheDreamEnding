/*
  Warnings:

  - Added the required column `dailyCarbonSaving` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyWasteReduction` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "dailyCarbonSaving" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dailyWasteReduction" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "SustainabilityImpact" (
    "id" TEXT NOT NULL,
    "rental_id" TEXT NOT NULL,
    "carbon_savings" DOUBLE PRECISION NOT NULL,
    "waste_reduction" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SustainabilityImpact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SustainabilityImpact_rental_id_key" ON "SustainabilityImpact"("rental_id");

-- AddForeignKey
ALTER TABLE "SustainabilityImpact" ADD CONSTRAINT "SustainabilityImpact_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
