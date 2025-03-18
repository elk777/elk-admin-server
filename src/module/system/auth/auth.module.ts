/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-18 18:51:02
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
