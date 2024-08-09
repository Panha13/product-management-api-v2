/*
  Warnings:

  - You are about to drop the column `type` on the `unit` table. All the data in the column will be lost.
  - You are about to drop the column `values` on the `unit` table. All the data in the column will be lost.
  - Added the required column `name` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unit` DROP COLUMN `type`,
    DROP COLUMN `values`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
