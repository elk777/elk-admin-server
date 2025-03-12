/*
 * @Author: elk
 * @Date: 2025-03-12 19:34:31
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 19:35:25
 * @FilePath: /vue2_project_server/src/module/system/system.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class SystemModule {}
