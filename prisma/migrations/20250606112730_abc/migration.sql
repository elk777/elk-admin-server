/*
  Warnings:

  - The primary key for the `sys_dict_data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `sys_dict_data` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sys_user` MODIFY `dept_id` VARCHAR(10) NULL;
