/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-17 19:32:44
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
      /**
       * 设置配置模块为全局模块，这样在整个应用中都可以使用配置服务
       */
      isGlobal: true,
      /**
       * 指定环境变量文件的路径，根据当前环境加载对应的 .env 文件
       */
      envFilePath: envPath,
      /**
       * 加载配置对象，将所有配置对象的值合并到配置服务中
       */
      load: [...Object.values(confg)],
      /**
       * 使用 Joi 模式验证环境变量，确保环境变量的格式和类型符合要求
       */
      validationSchema: configJoiSchema,
      /**
       * 验证选项，用于控制验证过程的行为
       */
      validationOptions: {
        /**
         * 允许环境变量中存在未定义的键，避免因未知键而导致验证失败
         */
        allowUnknown: true,
        /**
         * 验证失败时，立即停止
         */
        abortEarly: true,
      },
      /**
       * 启用配置缓存，提高配置读取的性能
       */
      cache: true,
    }),
    RedisModule,
    LoggerModule,
  ],
})
export class AppModule {}
