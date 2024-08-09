/*
  Warnings:

  - You are about to drop the column `name` on the `unit` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `unit` table. All the data in the column will be lost.
  - Added the required column `type` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `values` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unit` DROP COLUMN `name`,
    DROP COLUMN `value`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `values` JSON NOT NULL;
