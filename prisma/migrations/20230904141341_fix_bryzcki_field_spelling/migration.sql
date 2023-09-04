/*
  Warnings:

  - You are about to drop the column `bryzcki1rm` on the `Set` table. All the data in the column will be lost.
  - Added the required column `brzycki1rm` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "bryzcki1rm",
ADD COLUMN     "brzycki1rm" INTEGER NOT NULL;
