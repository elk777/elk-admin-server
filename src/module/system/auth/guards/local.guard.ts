/*
 * @Author: elk
 * @Date: 2025-03-20 18:27:40
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-09 11:25:43
 * @FilePath: /vue2_project_server/src/module/system/auth/guards/local.guard.ts
 * @Description: 本地认证守卫
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
