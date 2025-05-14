/*
 * @Author: elk
 * @Date: 2025-04-27 17:03:49
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-27 17:14:27
 * @FilePath: /vue2_project_server/src/module/system/auth/decorators/auth-user.decorator.ts
 * @Description: 认证用户装饰器
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);
