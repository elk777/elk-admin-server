/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-29 17:17:44
 * @FilePath: \elk-admin-server\src\module\system\user\user.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user-dto';
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

  /**
   * 查询用户列表
   * @param params
   * @returns
   */
  async findAll({ pageNum, pageSize }: ListUserDto) {
    // 查询用户表
    const users = await this.prisma.sys_user.findMany({
      skip: (pageNum - 1) * pageSize,
      take: Number(pageSize),
      omit: {
        password: true,
      },
      include: {
        roles: {
          select: {
            role: {
              select: {
                role_id: true,
                role_name: true,
                role_label: true,
              },
            },
          },
        },
        depts: {
          select: {
            dept: {
              select: {
                dept_id: true,
                dept_name: true,
              },
            },
          },
        },
      },
    });
    const transformedUsers = users.map((user) => ({
      ...user,
      roles: user.roles.map((r) => r.role),
      depts: user.depts.map((d) => d.dept),
    }));
    return camelizeKeys(transformedUsers);
  }

  /**
   * 获取用户详情信息
   * @param params
   * @returns
   */
  async findOne(params) {
    // 查询用户表
    const user = await this.prisma.sys_user.findFirst({
      where: {
        ...params,
      },
      omit: {
        password: params.user_name ? false : true,
      },
      include: {
        roles: {
          select: {
            role: {
              select: {
                role_id: true,
                role_name: true,
                role_label: true,
              },
            },
          },
        },
        depts: {
          select: {
            dept: {
              select: {
                dept_id: true,
                dept_name: true,
              },
            },
          },
        },
      },
    });
    return camelizeKeys({
      ...user,
      deptId: user.dept_id.split(',').map((item) => +item),
      roles: user.roles.map((r) => r.role),
      roleIds: user.roles.map((r) => r.role.role_id)[0],
      depts: user.depts.map((d) => d.dept),
    });
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

  /**
   * 更新用户信息
   * @param updateUserDto
   * @returns
   */
  async update(updateUserDto: UpdateUserDto) {
    // const userId = updateUserDto.userId;
    // 辅助函数：比较两个数组是否相等
    // const isEqual = (a: T, b: T) => {
    //   if (a.length !== b.length) {
    //     return false;
    //   }
    //   const sortA = [...a].sort();
    //   const sortB = [...b].sort();
    //   return sortA.every((value, index) => value === sortB[index]);
    // };
    // 1、获取当前角色关联信息
    // const currentRoles = await this.prisma.sys_user_role.findMany({
    //   where: {
    //     user_id: userId,
    //   },
    //   select: { role_id: true },
    // });
    // 修改角色和用户绑定
    const role = this.prisma.sys_user_role.updateMany({
      where: {
        user_id: updateUserDto.userId,
      },
      data: {
        role_id: updateUserDto.roleIds,
      },
    });
    // 修改用户与部门绑定-1-N 清除旧关联，创建新关联
    const dpets = updateUserDto.deptId.split(',');
    const delDept = this.prisma.sys_user_dept.deleteMany({
      where: {
        user_id: updateUserDto.userId,
      },
    });
    const createDept = this.prisma.sys_user_dept.createMany({
      data: dpets.map((item) => {
        return {
          user_id: updateUserDto.userId,
          dept_id: Number(item),
        };
      }),
    });

    // 修改角色基本信息
    const user = this.prisma.sys_user.update({
      where: {
        user_id: updateUserDto.userId,
      },
      data: {
        user_name: updateUserDto.userName,
        nick_name: updateUserDto.nickName,
        dept_id: updateUserDto.deptId,
        sex: updateUserDto.sex,
        password: updateUserDto.password,
        phone: updateUserDto.phone,
        email: updateUserDto.email,
        remark: updateUserDto.remark,
        status: updateUserDto.status,
        updated_at: new Date(),
      },
    });
    // 事务
    const transaction = await this.prisma.$transaction([
      role,
      delDept,
      createDept,
      user,
    ]);
    if (!transaction) {
      return '更新失败';
    } else {
      return '更新成功';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
