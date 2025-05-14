/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-09 16:08:05
 * @FilePath: /vue2_project_server/src/module/system/menu/menu.service.ts
 * @Description: 菜单服务逻辑
 */
import { Injectable } from '@nestjs/common';
import { ListMenuDto } from './dto/list-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { transformRoutes } from '@/utils/permission.util';

// 引入prisma服务
import { PrismaService } from 'prisma/prisma.service';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  create(listMenuDto: ListMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
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
    const formatMenus = transformRoutes(menuData);
    // console.log('🚀 ~ MenuService ~ getMenus ~ formatMenus:', formatMenus);
    return formatMenus;
  }
}
