/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk
 * @LastEditTime: 2025-03-16 10:12:00
 * @FilePath: /vue2_project_server/src/module/system/user/user.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 引入prisma服务
import { PrismaService } from '../../../../prisma/prisma.service';

// 引入redis服务
import { RedisService } from '@/module/common/redis/redis.service';

@Injectable()
export class UserService {
  // 注入prisma服务
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
  // 注入config服务
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll({ pageNum, pageSize }: { pageNum: number; pageSize: number }) {
    // 查询用户表
    const user = await this.prisma.sys_user.findMany();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
