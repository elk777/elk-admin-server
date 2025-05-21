/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-21 20:49:03
 * @FilePath: \elk-admin-server\src\module\system\menu\menu.service.ts
 * @Description: 菜单服务逻辑
 */
import { Injectable } from '@nestjs/common';
import { ListMenuDto } from './dto/list-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { getRoutes } from '@/utils/permission.util';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';

import { plainToInstance } from 'class-transformer';

// 引入humps库:下划线和小驼峰转换
import { camelizeKeys, decamelizeKeys } from 'humps';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  /**
   * 新增菜单
   * @param listMenuDto
   * @return ListMenuDto[]
   */
  async create(listMenuDto: ListMenuDto) {
    if (!listMenuDto.menuId) {
      delete listMenuDto.menuId;
    }
    const listFormatMenuDto = decamelizeKeys(listMenuDto);
    const role = await this.prisma.sys_menu.create({
      data: listFormatMenuDto,
    });
    if (!role) {
      return '新增失败';
    } else {
      return '新增成功';
    }
  }

  /**
   * 获取菜单列表
   * @param params
   * @returns
   */
  async getList({ pageNum, pageSize }: { pageNum: number; pageSize: number }) {
    const menus = await this.prisma.sys_menu.findMany({
      skip: (pageNum - 1) * pageSize || 0,
      take: Number(pageSize) || 100000,
    });
    return camelizeKeys(menus);
  }

  /**
   * 获取菜单详情
   * @param id
   * @return ListMenuDto[]
   */
  async findOne(id: number) {
    const menus = await this.prisma.sys_menu.findUnique({
      where: {
        menu_id: id,
      },
    });
    return camelizeKeys(menus);
  }

  /**
   * 更新菜单
   * @param id
   * @param updateMenuDto: ListMenuDto
   * @return ListMenuDto[]
   */
  async update(updateMenuDto: UpdateMenuDto) {
    const menus = await this.prisma.sys_menu.update({
      where: {
        menu_id: updateMenuDto.menuId,
      },
      data: decamelizeKeys(updateMenuDto),
    });
    if (!menus) {
      return '修改失败';
    }
    return '修改成功';
  }

  /**
   * 删除菜单
   * @param id
   * @return ListMenuDto[]
   */
  async remove(id: number) {
    const menus = await this.prisma.sys_menu.delete({
      where: {
        menu_id: id,
      },
    });
    if (!menus) {
      return '删除失败';
    }
    return '删除成功';
  }

  /**
   * 根据角色获取菜单列表
   * @param roleIds 角色ID集合
   * @returns 菜单列表
   *  */
  async getMenus(roleId: number[]) {
    // 拿到角色ID集合，查询菜单列表
    const menus = await this.prisma.sys_role.findFirst({
      where: {
        role_id: {
          in: roleId,
        },
      },
      include: {
        menus: {
          include: {
            menu: true,
          },
        },
      },
    });
    const menuData = plainToInstance(
      ListMenuDto,
      menus.menus.map((menu) => menu.menu, { excludeExtraneousValues: true }),
    );
    const formatMenus = getRoutes(menuData);
    return formatMenus;
  }
}
