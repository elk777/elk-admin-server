/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk
 * @LastEditTime: 2025-04-18 16:55:50
 * @FilePath: /vue2_project_server/src/main.ts
 * @Description: 入口文件配置
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入swagger配置
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 引入logger日志服务
import { LoggerService } from '@/module/common/logger/logger.service';
// 引入全局响应拦截器
import { ResponseInterceptor } from './common/Interceptors/response.interceptor';
// 引入全局异常过滤器
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';

/**
 * 从 @nestjs/platform-express 包中导入 NestExpressApplication 类型。
 * NestExpressApplication 是一个特定于 Express 平台的应用程序类型，
 * 在使用 NestJS 结合 Express 框架时，可用于更精确地定义应用程序实例的类型，
 * 从而获得更好的类型检查和代码提示。
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // swagger注册配置
  const options = new DocumentBuilder()
    .setTitle('vue2-elk-admin-后端服务')
    .setDescription('vue2-elk-admin-后端服务接口文档')
    .setVersion('1.0')
    .addTag('Nestjs Swagger')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  // 全局日志服务
  const loggerService = app.get(LoggerService);

  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor(loggerService));
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  // 开启静态资源访问
  app.useStaticAssets(join(__dirname, 'upload'), {
    //前缀名，意味着images文件夹下的资源，可以通过/Crino前缀访问，如
    prefix: '/static',
  });

  // 开启跨域
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
