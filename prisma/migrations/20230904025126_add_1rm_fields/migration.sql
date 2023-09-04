/*
  Warnings:

  - You are about to drop the column `orm` on the `Set` table. All the data in the column will be lost.
  - Added the required column `bryzcki1rm` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `epley1rm` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wathan1rm` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "orm",
ADD COLUMN     "bryzcki1rm" INTEGER NOT NULL,
ADD COLUMN     "epley1rm" INTEGER NOT NULL,
ADD COLUMN     "wathan1rm" INTEGER NOT NULL;
