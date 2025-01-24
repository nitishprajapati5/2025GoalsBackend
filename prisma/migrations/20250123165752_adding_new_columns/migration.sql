/*
  Warnings:

  - Added the required column `journalDate` to the `JournalLeafs` table without a default value. This is not possible if the table is not empty.
  - Made the column `journalImage` on table `JournalLeafs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `JournalLeafs` ADD COLUMN `journalDate` DATETIME(3) NOT NULL,
    MODIFY `journalImage` LONGBLOB NOT NULL;
