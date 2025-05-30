-- CreateTable
CREATE TABLE `sys_user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_id` INTEGER NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `nick_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `sex` VARCHAR(191) NULL DEFAULT '0',
    `avatar` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT '0',
    `del_flag` VARCHAR(191) NOT NULL DEFAULT '0',
    `remark` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `sys_user_email_key`(`email`),
    UNIQUE INDEX `sys_user_phone_key`(`phone`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dept` (
    `dept_id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `dept_name` VARCHAR(191) NOT NULL,
    `ancestors` VARCHAR(191) NULL,
    `order_num` INTEGER NULL DEFAULT 0,
    `leader` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT '0',
    `del_flag` VARCHAR(191) NULL DEFAULT '0',
    `remark` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `sys_dept_phone_key`(`phone`),
    UNIQUE INDEX `sys_dept_email_key`(`email`),
    PRIMARY KEY (`dept_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `role_label` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL DEFAULT '0',
    `order_num` INTEGER NULL DEFAULT 0,
    `del_flag` VARCHAR(191) NULL DEFAULT '0',
    `remark` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NULL,
    `order_num` INTEGER NULL DEFAULT 0,
    `menu_type` VARCHAR(191) NULL,
    `visible` VARCHAR(191) NULL DEFAULT '0',
    `status` VARCHAR(191) NULL DEFAULT '0',
    `perms` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL DEFAULT '#',
    `path` VARCHAR(191) NULL DEFAULT '',
    `component` VARCHAR(191) NULL,
    `query` VARCHAR(191) NULL,
    `is_frame` VARCHAR(191) NULL DEFAULT '1',
    `is_cache` VARCHAR(191) NULL DEFAULT '0',
    `remark` VARCHAR(191) NULL,
    `el_flag` VARCHAR(191) NULL DEFAULT '0',
    `created_by` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_role` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `sys_user_role_role_id_fkey`(`role_id`),
    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role_menu` (
    `role_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,

    INDEX `sys_role_menu_menu_id_fkey`(`menu_id`),
    PRIMARY KEY (`role_id`, `menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_dept` (
    `user_id` INTEGER NOT NULL,
    `dept_id` INTEGER NOT NULL,

    INDEX `sys_user_dept_dept_id_idx`(`dept_id`),
    PRIMARY KEY (`user_id`, `dept_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_type` (
    `dict_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_name` VARCHAR(191) NULL,
    `dict_type` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `create_by` VARCHAR(191) NULL DEFAULT '',
    `create_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NULL DEFAULT '',
    `update_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sys_dict_type_dict_name_key`(`dict_name`),
    UNIQUE INDEX `sys_dict_type_dict_type_key`(`dict_type`),
    PRIMARY KEY (`dict_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_code` VARCHAR(255) NOT NULL,
    `dict_label` VARCHAR(191) NOT NULL,
    `dict_value` VARCHAR(191) NOT NULL,
    `dict_sort` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `create_by` VARCHAR(191) NULL DEFAULT '',
    `create_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_user_role` ADD CONSTRAINT `sys_user_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_role` ADD CONSTRAINT `sys_user_role_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `sys_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_menu` ADD CONSTRAINT `sys_role_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_role_menu` ADD CONSTRAINT `sys_role_menu_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_dept` ADD CONSTRAINT `sys_user_dept_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept`(`dept_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user_dept` ADD CONSTRAINT `sys_user_dept_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `sys_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
