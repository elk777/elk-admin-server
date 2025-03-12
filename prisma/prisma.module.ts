/*
 * @Author: elk
 * @Date: 2025-03-12 16:31:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 16:32:18
 * @FilePath: /vue2_project_server/prisma/prisma.module.ts
 * @Description: 文件内容描述语
 */
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
