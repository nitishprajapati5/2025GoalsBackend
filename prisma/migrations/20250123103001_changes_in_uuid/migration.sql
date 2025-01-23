-- CreateTable
CREATE TABLE `Journal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `journalName` VARCHAR(191) NOT NULL,
    `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,

    INDEX `Journal_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalLeafs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `journalId` INTEGER NOT NULL,
    `journalTitle` VARCHAR(191) NOT NULL,
    `journalDescription` VARCHAR(191) NULL,
    `journalContent` LONGTEXT NOT NULL,
    `journalImage` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,

    INDEX `JournalLeafs_journalId_fkey`(`journalId`),
    INDEX `JournalLeafs_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Registration_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Registration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalLeafs` ADD CONSTRAINT `JournalLeafs_journalId_fkey` FOREIGN KEY (`journalId`) REFERENCES `Journal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalLeafs` ADD CONSTRAINT `JournalLeafs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Registration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
