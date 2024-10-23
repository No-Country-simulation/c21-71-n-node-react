/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `shelterId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `imageUrl`,
    ADD COLUMN `shelterId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `roleId` INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE `Shelter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shelter_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL DEFAULT 3,

    UNIQUE INDEX `Shelter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `petId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shelter` ADD CONSTRAINT `Shelter_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_shelterId_fkey` FOREIGN KEY (`shelterId`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
