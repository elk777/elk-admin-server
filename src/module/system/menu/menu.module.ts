/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: elk
 * @LastEditTime: 2025-05-08 13:48:53
 * @FilePath: /vue2_project_server/src/module/system/menu/menu.module.ts
 * @Description: 菜单模块
 */
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
  exports: [MenuService],
})
export class MenuModule {}
