/*
 * @Author: elk
 * @Date: 2025-03-17 19:31:37
 * @LastEditors: elk
 * @LastEditTime: 2025-03-17 19:32:11
 * @FilePath: /vue2_project_server/src/module/common/logger/logger.module.ts
 * @Description: 文件内容描述语
 */
import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
