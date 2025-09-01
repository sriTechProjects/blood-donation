/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "public"."Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_email_key" ON "public"."Recipient"("email");
