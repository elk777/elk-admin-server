/*
 * @Author: elk
 * @Date: 2025-03-14 16:33:32
 * @LastEditors: elk
 * @LastEditTime: 2025-03-14 16:37:02
 * @FilePath: /vue2_project_server/src/module/common/redis/redis.module.ts
 * @Description: 文件内容描述语
 */
// 从@nestjs/common导入核心模块装饰器
import { Module, Global } from '@nestjs/common';
// 导入Redis服务
import { RedisService } from './redis.service';

// 导入ioredis模块并重命名为IORedisModule
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';

// 导入配置模块和服务
import { ConfigModule, ConfigService } from '@nestjs/config';

// 将当前模块标记为全局模块，使其在整个应用中可用
@Global()
@Module({
  imports: [
    // 异步配置ioredis模块
    IORedisModule.forRootAsync({
      imports: [ConfigModule], // 依赖配置模块
      inject: [ConfigService], // 注入配置服务
      useFactory: (configService: ConfigService) => {
        // 从配置服务中获取redis配置
        const { host, port, password, db, prefix, ttl } =
          configService.get('redis');
        return {
          type: 'single', // 使用单实例模式
          options: {
            host,
            port,
            password,
            db,
            prefix,
            ttl,
          },
        };
      },
    }),
  ],
  providers: [RedisService], // 注册服务提供者
  exports: [RedisService], // 导出服务，使其可被其他模块使用
})
export class RedisModule {}
