/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-21 16:05:07
 * @FilePath: /vue2_project_server/src/app.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { SystemModule } from './module/system/system.module';
import { RedisModule } from './module/common/redis/redis.module';
import { LoggerModule } from './module/common/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
// 配置文件
import confg from '@/config/index';

// 配置文件校验
import { configJoiSchema } from '@/config/schema.config';

// 加载环境变量
const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

console.log('🚀 ~ 当前启动的环境:', process.env.NODE_ENV);
@Module({
  imports: [
    SystemModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath,
      load: [...Object.values(confg)],
      validationSchema: configJoiSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      cache: true,
    }),
    RedisModule,
    LoggerModule,
  ],
})
export class AppModule {}
