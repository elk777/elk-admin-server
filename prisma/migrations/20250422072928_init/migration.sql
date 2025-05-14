/*
  Warnings:

  - The primary key for the `sys_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `deptid` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `sys_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `sys_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `sys_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `sys_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `sys_user_username_key` ON `sys_user`;

-- AlterTable
ALTER TABLE `sys_user` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `deptid`,
    DROP COLUMN `nickname`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `updatedBy`,
    DROP COLUMN `userid`,
    DROP COLUMN `username`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` VARCHAR(191) NULL,
    ADD COLUMN `del_flag` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `dept_id` INTEGER NULL,
    ADD COLUMN `nick_name` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `sex` VARCHAR(191) NULL DEFAULT '0',
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL DEFAULT '0',
    MODIFY `remark` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `sys_user_user_name_key` ON `sys_user`(`user_name`);
