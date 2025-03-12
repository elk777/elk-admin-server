/*
 * @Author: elk
 * @Date: 2025-03-12 14:26:02
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 18:28:23
 * @FilePath: /vue2_project_server/prisma/prisma.service.ts
 * @Description: 文件内容描述语
 */
/**
 * 导入 NestJS 相关的模块和装饰器
 * INestApplication 用于表示 NestJS 应用程序实例
 * Injectable 是一个装饰器，用于将类标记为可注入的提供者
 * OnModuleInit 是一个生命周期钩子接口，用于在模块初始化完成后执行特定操作
 */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
/**
 * 导入 Prisma 客户端，用于与数据库进行交互
 */
import { PrismaClient } from '@prisma/client';

/**
 * 使用 @Injectable 装饰器将 PrismaService 类标记为可注入的提供者
 */
@Injectable()
/**
 * PrismaService 类继承自 PrismaClient，并实现了 OnModuleInit 接口
 * 用于在模块初始化时连接到数据库，并在应用程序关闭时进行清理操作
 */
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * onModuleInit 方法是 OnModuleInit 接口的实现
   * 在模块初始化完成后，该方法会被调用，用于连接到数据库
   */
  async onModuleInit() {
    // 调用 PrismaClient 的 $connect 方法，连接到数据库
    await this.$connect();
  }

  /**
   * enableShutdownHooks 方法用于启用应用程序的关闭钩子
   * 当 Prisma 客户端即将退出时，会触发 'beforeExit' 事件
   * 在该事件中，会调用 app.close() 方法关闭 NestJS 应用程序
   * @param app - NestJS 应用程序实例
   */
  // async enableShutdownHooks(app: INestApplication) {
  //   // 监听 Prisma 客户端的 'beforeExit' 事件
  //   this.$on('beforeExit', async () => {
  //     // 调用 NestJS 应用程序的 close 方法，关闭应用程序
  //     await app.close();
  //   });
  // }
}
