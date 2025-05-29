/*
 * @Description: 角色管理-逻辑层
 * @Autor: lyf
 * @Date: 2025-05-14 14:09:39
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-22 19:50:28
 * @FilePath: \elk-admin-server\src\module\system\role\role.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
// 引入prisma
import { PrismaService } from 'prisma/prisma.service';

// 引入humps
import { camelizeKeys } from 'humps';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建角色
   * @param createRoleDto
   * @returns
   */
  async create(createRoleDto: CreateRoleDto) {
    // 角色权限-接收处理
    const roleKeys = createRoleDto.roleKey;
    const role = this.prisma.sys_role.create({
      data: {
        role_name: createRoleDto.roleName,
        role_label: createRoleDto.roleLabel,
        status: createRoleDto.status,
        remark: createRoleDto.remark,
        order_num: createRoleDto.orderNum,
        del_flag: createRoleDto.delFlag,
      },
    });
    const roleMenu = this.prisma.sys_role_menu.createMany({
      data: roleKeys.map((roleKey) => {
        return {
          role_id: createRoleDto.roleId,
          menu_id: roleKey,
        };
      }),
    });
    // 事务-保证角色和角色菜单表数据一致性
    const transaction = await this.prisma.$transaction([role, roleMenu]);
    if (!transaction) {
      return '新增失败';
    } else {
      return '新增成功';
    }
  }

  /**
   * 查询所有角色
   * @param pageNum
   * @param pageSize
   * @returns RoleEntity
   */
  async findAll({ pageNum, pageSize }: ListRoleDto): Promise<RoleEntity> {
    const roles = await this.prisma.sys_role.findMany({
      skip: (pageNum - 1) * pageSize,
      take: Number(pageSize),
    });
    return camelizeKeys(roles);
  }

  /**
   * 查询角色详情
   * @param id
   * @returns RoleEntity
   */
  async findOne(id: number): Promise<RoleEntity> {
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
  async update(updateRoleDto: UpdateRoleDto) {
    const { roleId, roleKey } = updateRoleDto || {};
    const role = this.prisma.sys_role.update({
      where: {
        role_id: roleId,
      },
      data: {
        role_id: updateRoleDto.roleId,
        role_name: updateRoleDto.roleName,
        role_label: updateRoleDto.roleLabel,
        status: updateRoleDto.status,
        remark: updateRoleDto.remark,
        order_num: updateRoleDto.orderNum,
        del_flag: updateRoleDto.delFlag,
        updated_at: new Date(),
      },
    });
    const delRoleMenu = this.prisma.sys_role_menu.deleteMany({
      where: {
        role_id: roleId,
      },
    });
    const createRoleMenu = this.prisma.sys_role_menu.createMany({
      data: roleKey.map((roleKey) => {
        return {
          role_id: roleId,
          menu_id: roleKey,
        };
      }),
    });
    const transaction = await this.prisma.$transaction([
      role,
      delRoleMenu,
      createRoleMenu,
    ]);
    if (!transaction) {
      return '修改失败';
    } else {
      return '修改成功';
    }
  }
  /**
   * 删除角色 - 设计到级联删除( role menu)
   * @body  {ids: number[]}
   */
  async remove(id: number) {
    const role = this.prisma.sys_role.delete({
      where: {
        role_id: id,
      },
    });
    const roleMenu = this.prisma.sys_role_menu.deleteMany({
      where: {
        role_id: id,
      },
    });
    // 事务
    const transaction = await this.prisma.$transaction([roleMenu, role]);
    if (!transaction) {
      return '删除失败';
    } else {
      return '删除成功';
    }
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
