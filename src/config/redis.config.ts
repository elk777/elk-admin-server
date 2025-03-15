/*
 * @Author: elk
 * @Date: 2025-03-14 16:04:22
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-15 15:10:33
 * @FilePath: /vue2_project_server/src/config/redis.config.ts
 * @Description: redis配置文件
 */
// 从@nestjs/config模块导入registerAs函数，用于注册配置命名空间
import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
  prefix: string;
  ttl: number;
  retryStrategy: (times: number) => number;
}

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST, // Redis服务器地址
  port: Number(process.env.REDIS_PORT), // Redis服务器端口
  password: process.env.REDIS_PASSWORD, // Redis访问密码
  db: process.env.DB, // 使用的数据库编号
  prefix: process.env.REDIS_PREFIX, // 键名前缀
  ttl: 60 * 60 * 24 * 7, // 默认7天，键值过期时间（秒）
  retryStrategy: (times: number) => {
    // 重试策略，times为当前重试次数
    return Math.min(times * 100, 3000); // 每次重试间隔时间（毫秒），最大不超过3000ms
  },
}));
