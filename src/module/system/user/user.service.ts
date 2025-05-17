/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-17 15:39:51
 * @FilePath: \elk-admin-server\src\module\system\user\user.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 引入prisma服务
import { PrismaService } from '../../../../prisma/prisma.service';

// 引入redis服务
import { RedisService } from '@/module/common/redis/redis.service';

// 引入权限枚举集合
import { PermissionContant } from '@/constants/permission.util.constant';

import { camelizeKeys } from 'humps';

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
    const user = await this.prisma.sys_user.findMany({
      omit: {
        password: true,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
    return user;
  }

  async findOne(params) {
    // 查询用户表
    const user = await this.prisma.sys_user.findMany({
      where: {
        ...params,
      },
    });
    return user[0];
  }

  // 关系查询，查询user关联的role
  async findOneWithRole(params) {
    // 查询用户表
    const user = await this.prisma.sys_user.findFirst({
      where: {
        ...params,
      },
      omit: {
        password: true,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    if (user) {
      const roles = user.roles.map((role) => role.role);
      (user.roles as object[]) = roles;
    }
    return camelizeKeys({
      user,
      permissions: [PermissionContant.PERMISSIONADMIN],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
