/*
  Warnings:

  - You are about to alter the column `journalImage` on the `JournalLeafs` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `JournalLeafs` MODIFY `journalImage` LONGTEXT NOT NULL;
