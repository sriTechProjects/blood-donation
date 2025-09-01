/*
  Warnings:

  - Added the required column `email` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Donor" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Recipient" ADD COLUMN     "email" TEXT NOT NULL;
