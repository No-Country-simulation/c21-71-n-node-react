/*
  Warnings:

  - You are about to alter the column `imageUrl` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Pet` MODIFY `imageUrl` JSON NOT NULL;
