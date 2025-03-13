/*
 * @Author: elk
 * @Date: 2025-03-11 18:15:32
 * @LastEditors: elk
 * @LastEditTime: 2025-03-13 20:43:23
 * @FilePath: /vue2_project_server/src/main.ts
 * @Description: 入口文件配置
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入swagger配置
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger注册配置
  const options = new DocumentBuilder()
    .setTitle('vue2-elk-admin-后端服务')
    .setDescription('vue2-elk-admin-后端服务接口文档')
    .setVersion('1.0')
    .addTag('Nestjs Swagger')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 开启跨域
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
