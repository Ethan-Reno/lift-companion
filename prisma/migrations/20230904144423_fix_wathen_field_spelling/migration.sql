/*
  Warnings:

  - You are about to drop the column `wathan1rm` on the `Set` table. All the data in the column will be lost.
  - Added the required column `wathen1rm` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "wathan1rm",
ADD COLUMN     "wathen1rm" INTEGER NOT NULL;
