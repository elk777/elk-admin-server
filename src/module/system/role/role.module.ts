/*
 * @Author: elk
 * @Date: 2025-05-07 15:27:02
 * @LastEditors: elk
 * @LastEditTime: 2025-05-07 15:46:42
 * @FilePath: /vue2_project_server/src/module/system/role/role.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
