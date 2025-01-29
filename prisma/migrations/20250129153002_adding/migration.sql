/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `JournalLeafs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `JournalLeafs_uuid_key` ON `JournalLeafs`(`uuid`);
