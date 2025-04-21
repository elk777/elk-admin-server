/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-18 16:52:50
 * @FilePath: /vue2_project_server/src/app.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { SystemModule } from './module/system/system.module';
import { RedisModule } from './module/common/redis/redis.module';
import { LoggerModule } from './module/common/logger/logger.module';
import { UploadModule } from './module/common/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// 引入静态资源访问
import { ServeStaticModule } from '@nestjs/serve-static';
// 配置文件
import confg from '@/config/index';

// 配置文件校验
import { configJoiSchema } from '@/config/schema.config';

// 加载环境变量
const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

console.log('🚀 ~ 当前启动的环境:', process.env.NODE_ENV);
@Module({
  imports: [
    /**
     * 配置静态资源服务模块
     * 使用 NestJS 的 ServeStaticModule 来提供静态资源访问服务。
     * 该服务允许客户端通过指定的 URL 路径访问服务器上的静态文件。
     *
     * @param rootPath - 静态资源文件所在的根目录，使用 join 方法将当前文件所在目录与 'upload' 拼接。
     * @param serveRoot - 客户端访问静态资源时使用的基础路径。
     */
    ServeStaticModule.forRoot({
      // 静态资源文件的根目录，将当前文件所在目录与 'upload' 目录拼接
      rootPath: join(__dirname, 'upload'),
      // 客户端访问静态资源的基础路径，访问 /static 路径即可访问到 rootPath 下的静态文件
      serveRoot: '/static',
    }),

    SystemModule,
    RedisModule,
    LoggerModule,
    UploadModule,
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
  ],
})
export class AppModule {}
