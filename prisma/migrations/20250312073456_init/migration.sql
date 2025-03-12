-- CreateTable
CREATE TABLE `sys_user` (
    `userid` BIGINT NOT NULL AUTO_INCREMENT,
    `deptid` BIGINT NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL DEFAULT '0',
    `avatar` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT '0',
    `remark` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `updatedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sys_user_username_key`(`username`),
    UNIQUE INDEX `sys_user_email_key`(`email`),
    UNIQUE INDEX `sys_user_phone_key`(`phone`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
