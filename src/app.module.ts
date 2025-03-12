/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 19:36:01
 * @FilePath: /vue2_project_server/src/app.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { SystemModule } from './module/system/system.module';

@Module({
  imports: [SystemModule],
})
export class AppModule {}
