/*
  Warnings:

  - Added the required column `imageType` to the `JournalLeafs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `JournalLeafs` ADD COLUMN `imageType` VARCHAR(191) NOT NULL;
