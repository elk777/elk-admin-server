/*
 * @Author: elk
 * @Date: 2025-03-13 15:42:48
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-15 12:25:56
 * @FilePath: /vue2_project_server/src/config/database.config.ts
 * @Description: 数据库配置文件
 */
import { registerAs } from '@nestjs/config';
/**
 * 导出一个默认的函数，用于配置数据库连接选项
 * @returns {Object} 包含数据库连接选项的对象
 */
// 定义一个接口，用于描述数据库连接配置
export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  subscribers: string[];
}

// 导出一个默认的函数，用于配置数据库连接选项
export default registerAs(
  'database',
  (): DatabaseConfig => ({
    // 数据库类型，从环境变量中获取
    type: process.env['DB_TYPE'],
    // 数据库主机地址，从环境变量中获取
    host: process.env['DB_HOST'],
    // 数据库端口号，从环境变量中获取
    port: Number(process.env['DB_PORT']),
    // 数据库用户名，从环境变量中获取
    username: process.env['DB_USER'],
    // 数据库用户密码，从环境变量中获取
    password: process.env['DB_PASSWORD'],
    // 要连接的数据库名称，从环境变量中获取
    database: process.env['DB_NAME'],
    // 是否自动同步数据库结构，设置为 true 时，应用启动时会自动更新数据库结构
    synchronize: true,
    // 是否启用数据库日志，设置为 false 时，不记录数据库操作日志
    logging: false,
    // 实体文件的路径，使用通配符匹配所有实体文件
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // 迁移文件的路径，使用通配符匹配所有迁移文件
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    // 订阅者列表，这里为空，表示不使用订阅者
    subscribers: [],
  }),
);
