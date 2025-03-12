/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 18:17:56
 * @FilePath: /vue2_project_server/src/user/user.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// 引入prisma服务
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
