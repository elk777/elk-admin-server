/*
 * @Author: elk
 * @Date: 2025-03-20 18:27:40
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-20 18:56:09
 * @FilePath: /vue2_project_server/src/module/system/auth/guards/local.guard.ts
 * @Description: 本地认证守卫
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
