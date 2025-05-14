/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-08 15:52:49
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/module/common/redis/redis.service';
import { ErrorConst } from '@/constants/error-const.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  /**
   * @description: 本地验证逻辑处理
   * @param {string} username
   * @param {string} pass
   * @return {*} 通过验证返回用户信息，否则返回null
   */
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne({ user_name: username });
    if (user) {
      if (user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return ErrorConst.INVALID_USERNAME_PASSWORD;
    }
    return ErrorConst.USER_NOT_FOUND;
  }
  /**
   * @description: 登录逻辑处理
   * @param {CreateAuthDto} createAuthDto
   * @return {*} {Promise<{ access_token: string }>}
   */
  async signIn(createAuthDto: CreateAuthDto) {
    const { username } = createAuthDto;
    const user = await this.userService.findOne({ user_name: username });
    const payload = {
      username,
      sub: user.user_id,
      timeOut: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    };
    const token = this.jwtService.sign(payload);
    // 缓存token
    await this.redis.set(`${username}&${user.user_id}`, token, 60 * 60 * 24);
    return {
      token,
    };
  }

  async signOut(tokenKey: string) {
    // 从前端的请求头中拿到token，然后删除缓存
    await this.redis.del(tokenKey);
    return '退出成功';
  }
}
