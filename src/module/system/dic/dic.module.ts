import { Module } from '@nestjs/common';
import { DicService } from './dic.service';
import { DicController } from './dic.controller';

@Module({
  controllers: [DicController],
  providers: [DicService],
})
export class DicModule {}
