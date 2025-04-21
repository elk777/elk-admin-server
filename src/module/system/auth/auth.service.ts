/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk
 * @LastEditTime: 2025-04-09 11:20:50
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/module/common/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
  ) {}

  async validateUser(username: string, pass: string) {
    console.log('🚀 ~ AuthService ~ validateUser ~ validateUser:');
    const user = await this.userService.findOne({ username });
    console.log('🚀 ~ AuthService ~ validateUser ~ user:', user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async signIn(createAuthDto: CreateAuthDto) {
    console.log('🚀 ~ AuthService ~ signIn ~ signIn:');
    const { username } = createAuthDto;
    const user = await this.userService.findOne({ username });
    const payload = {
      username,
      sub: user.userid,
      timeOut: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    };
    const token = this.jwtService.sign(payload);
    // 缓存token
    await this.redis.set(`${username}&${user.userid}`, token, 60 * 60 * 24);
    return {
      access_token: token,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
