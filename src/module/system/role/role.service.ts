/*
 * @Description: 角色管理-逻辑层
 * @Autor: lyf
 * @Date: 2025-05-14 14:09:39
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-20 20:53:32
 * @FilePath: \elk-admin-server\src\module\system\role\role.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// 引入prisma
import { PrismaService } from 'prisma/prisma.service';

// 引入humps
import { camelizeKeys } from 'humps';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  /**
   * 查询所有角色
   * @param pageNum
   * @param pageSize
   * @returns
   */
  async findAll({ pageNum, pageSize }: { pageNum: number; pageSize: number }) {
    const roles = await this.prisma.sys_role.findMany({
      skip: (pageNum - 1) * pageSize,
      take: Number(pageSize),
    });
    return camelizeKeys(roles);
  }

  /**
   * 查询角色详情
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const role = await this.prisma.sys_role.findFirst({
      where: {
        role_id: id,
      },
      include: {
        menus: true,
      },
    });
    let roleKey: number[] = [];
    if (role) {
      roleKey = role.menus.map((menu) => menu.menu_id);
    }
    return { ...camelizeKeys(role), roleKey };
  }

  /**
   * 修改角色详情
   * @param updateRoleDto
   * @returns
   */
  update(updateRoleDto: UpdateRoleDto) {
    const { role_id } = updateRoleDto;
    const role = this.prisma.sys_role.update({
      where: {
        role_id: role_id,
      },
      data: {
        ...updateRoleDto,
      },
    });
    return camelizeKeys(role);
  }

  /**
   * 删除角色 - 设计到级联删除( role menu)
   * @body  {ids: number[]}
   */
  async remove({ ids }: { ids: number[] }) {
    const roles = await this.prisma.sys_role.deleteMany({
      where: {
        role_id: {
          in: ids,
        },
      },
    });
    return roles;
  }
  /**
   * 根据用户id查询角色
   * @param userId
   * @returns
   */
  async findRoleByUserId(userId: number) {
    const roles = await this.prisma.sys_user_role.findMany({
      where: {
        user_id: userId,
      },
    });
    if (roles) {
      return roles.map((role) => role.role_id);
    } else {
      return [];
    }
  }
}
