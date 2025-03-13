/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk
 * @LastEditTime: 2025-03-13 18:23:15
 * @FilePath: /vue2_project_server/src/module/system/user/user.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 引入prisma服务
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class UserService {
  // 注入prisma服务
  constructor(private prisma: PrismaService) {}
  // 注入config服务
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // 查询用户表
    const user = await this.prisma.sys_user.findMany();
    // console.log('🚀 ~ UserService ~ findAll ~ user:', user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
