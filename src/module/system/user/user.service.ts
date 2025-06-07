/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk 
 * @LastEditTime: 2025-06-07 21:47:08
 * @FilePath: /vue2_project_server/src/module/system/user/user.service.ts
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
  async create(createUserDto: CreateUserDto) {
    // 新增用户表
    const user = await this.prisma.sys_user.create({
      data: {
        user_name: createUserDto.userName,
        password: createUserDto.password,
        dept_id: createUserDto.deptId,
        nick_name: createUserDto.nickName,
        phone: createUserDto.phone,
        email: createUserDto.email,
        avatar: createUserDto.avatar,
        sex: createUserDto.sex,
        status: createUserDto.status,
        remark: createUserDto.remark,
      },
    });
    // 新增用户角色表
    const role = this.prisma.sys_user_role.create({
      data: {
        user_id: user.user_id,
        role_id: createUserDto.roleIds,
      },
    });
    // 新增用户部门表
    const deptIds = createUserDto.deptId.split(',') || [0];
    const dept = this.prisma.sys_user_dept.createMany({
      data: deptIds.map((item) => ({
        user_id: user.user_id,
        dept_id: Number(item),
      })),
    });
    // 事务-新增用户表和用户角色表和用户部门表相应的信息
    const transaction = this.prisma.$transaction([role, dept]);
    if (!transaction) {
      return '新增失败';
    } else {
      return '新增成功';
    }
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

  /**
   * 删除用户
   * @param id
   * @returns
   * */
  async remove(id: number) {
    // 删除用户表
    const user = this.prisma.sys_user.delete({
      where: {
        user_id: id,
      },
    });
    // 删除用户角色表
    const role = this.prisma.sys_user_role.deleteMany({
      where: {
        user_id: id,
      },
    });
    // 删除用户部门表
    const dept = this.prisma.sys_user_dept.deleteMany({
      where: {
        user_id: id,
      },
    });
    // 事务
    const transaction = await this.prisma.$transaction([role, dept, user]);
    if (!transaction) {
      return '删除失败';
    } else {
      return '删除成功';
    }
  }
}
