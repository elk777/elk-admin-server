/*
 * @Author: elk
 * @Date: 2025-04-27 16:25:23
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-29 13:53:00
 * @FilePath: \elk-admin-server\src\module\system\auth\controllers\auth-user.controller.ts
 * @Description: 登录-用户信息-控制器
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '@/module/system/user/user.service';
import { RoleService } from '@/module/system/role/role.service';
import { MenuService } from '@/module/system/menu/menu.service';
import { AuthUser } from '../decorators/auth-user.decorator';
import type { IAuthUser } from '../types/auth-user';

@ApiTags('登录认证-用户信息模块')
@Controller('')
export class AuthUserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
  ) {}

  // 获取用户详情
  @Get('getUserInfo')
  @ApiOperation({
    summary: '登录认证-返回用户信息',
    description: '获取用户详情',
  })
  findOne(@AuthUser() req: IAuthUser) {
    const userId = req.user.sub;
    return this.userService.findOneWithRole({ user_id: userId });
  }
  // 获取用户菜单
  @Get('generateRouters')
  @ApiOperation({
    summary: '登录认证-返回用户菜单',
    description: '获取用户菜单',
  })
  async generateRouters(@AuthUser() req: IAuthUser) {
    const userId = Number(req.user.sub);
    const roleIds = await this.roleService.findRoleByUserId(userId);
    return this.menuService.getMenus(roleIds);
  }
}
