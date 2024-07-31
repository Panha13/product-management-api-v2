/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Products_code_key` ON `Products`(`code`);
