// 从@nestjs/common导入Injectable装饰器
import { Injectable } from '@nestjs/common';

// 导入ioredis的Redis类
import { Redis } from 'ioredis';
// 从@nestjs-modules/ioredis导入InjectRedis装饰器
import { InjectRedis } from '@nestjs-modules/ioredis';

// 使用Injectable装饰器，将该类标记为可注入的服务
@Injectable()
export class RedisService {
  // 构造函数，通过依赖注入获取Redis实例
  constructor(@InjectRedis() private readonly redis: Redis) {}

  // 根据key获取存储在Redis中的值
  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
  // 设置Redis键值对，value可以是字符串或数字，可选设置过期时间（秒）
  async set(key: string, value: string | number, ttl?: number): Promise<void> {
    await this.redis.set(key, value);
    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }
  // 删除指定key的Redis数据
  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
