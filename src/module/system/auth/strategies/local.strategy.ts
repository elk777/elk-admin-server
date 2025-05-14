/*
 * @Author: elk
 * @Date: 2025-03-20 16:50:51
 * @LastEditors: elk
 * @LastEditTime: 2025-05-06 17:09:25
 * @FilePath: /vue2_project_server/src/module/system/auth/strategies/local.strategy.ts
 * @Description: local验证策略
 */
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@/module/system/auth/auth.service';
import { BizException } from '@/common/exceptions/biz.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new UnauthorizedException(ErrorConst.INVALID_USERNAME_PASSWORD);
    // }
    if (typeof user !== 'object') {
      throw new BizException(user);
    }
    return user;
  }
}
