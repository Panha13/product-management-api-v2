/*
  Warnings:

  - Made the column `unit_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_unit_id_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `unit_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `unit` MODIFY `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
