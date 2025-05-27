import { Module } from '@nestjs/common';
import { DicService } from './dic.service';
import { DicController } from './dic.controller';

import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [DicController],
  providers: [DicService, PrismaService],
})
export class DicModule {}
