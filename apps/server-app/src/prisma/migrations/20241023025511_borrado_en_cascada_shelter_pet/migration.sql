-- DropForeignKey
ALTER TABLE `Pet` DROP FOREIGN KEY `Pet_shelterId_fkey`;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_shelterId_fkey` FOREIGN KEY (`shelterId`) REFERENCES `Shelter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
