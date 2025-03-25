/*
 * @Author: elk
 * @Date: 2025-03-20 15:58:54
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-25 18:28:02
 * @FilePath: /vue2_project_server/src/module/system/auth/guards/jwt.guard.ts
 * @Description: jwt 守卫
 */
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/common/decorators/jwt.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  /**
   * 检查路由是否可以被激活
   * @param {ExecutionContext} context - 执行上下文
   * @returns {boolean | Promise<boolean> | Observable<boolean>} - 如果路由是公开的或者用户通过验证，则返回true，否则返回false
   */
  canActivate(context: ExecutionContext) {
    // 检查路由处理程序或控制器类上是否有 @Public 装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 如果路由是公开的，则直接返回true，否则调用父类的 canActivate 方法进行验证
    return isPublic || super.canActivate(context);
  }

  /**
   * 处理验证请求的结果
   * @param {Error} err - 验证过程中发生的错误
   * @param {any} user - 验证通过后的用户信息
   * @param {any} info - 验证过程中的额外信息
   * @returns {any} - 如果验证通过，则返回用户信息，否则抛出 UnauthorizedException
   */
  handleRequest(err, user, info) {
    // 如果有错误或者用户信息不存在，则抛出错误或者 UnauthorizedException
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // 验证通过，返回用户信息
    return user;
  }
}
