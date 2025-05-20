/*
 * @Author: elk
 * @Date: 2025-03-12 19:34:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-19 20:35:10
 * @FilePath: \elk-admin-server\src\module\system\system.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { DicModule } from './dic/dic.module';
import { DeptModule } from './dept/dept.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoleModule,
    MenuModule,
    DicModule,
    DeptModule,
  ],
})
export class SystemModule {}
