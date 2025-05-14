/*
 * @Author: elk
 * @Date: 2025-03-19 11:24:56
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-08 13:36:28
 * @FilePath: /vue2_project_server/src/module/system/auth/strategies/jwt.strategy.ts
 * @Description: jwt 认证策略
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import type { JwtConfig } from '@/config/jwt.config';
import { RedisService } from '@/module/common/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly redis: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: configService.get<JwtConfig>('jwt').secret,
    });
  }
  async validate(payload: any) {
    // redis查询token
    const token = await this.redis.get(`${payload.username}&${payload.sub}`);
    // 如果token不存在，则抛出异常
    if (!token) {
      throw new UnauthorizedException('token 已过期');
    }
    return payload;
  }
}
