import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [DeptController],
  providers: [DeptService, PrismaService],
})
export class DeptModule {}
