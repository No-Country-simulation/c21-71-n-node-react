/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_petId_fkey`;

-- AlterTable
ALTER TABLE `Pet` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Image`;
