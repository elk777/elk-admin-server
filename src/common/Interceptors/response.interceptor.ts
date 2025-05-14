/*
 * @Author: elk
 * @Date: 2025-03-16 14:42:13
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-24 17:12:32
 * @FilePath: /vue2_project_server/src/common/Interceptors/response.interceptor.ts
 * @Description: 统一的响应拦截器处理
 */
// 从@nestjs/common导入所需的装饰器和接口
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// 导入RxJS的Observable
import { Observable } from 'rxjs';
// 导入RxJS的map操作符
import { map, tap } from 'rxjs/operators';

// 导入自定义的ApiResponse接口
import { ApiResponse } from '@/common/interfaces/api-response';

// 引入日志服务
import { LoggerService } from '@/module/common/logger/logger.service';
import { Request } from 'express';

// 使用Injectable装饰器，将该类标记为可注入的拦截器
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  // 构造函数，接收LoggerService实例
  constructor(private readonly logger: LoggerService) {}
  // 实现拦截器方法，用于处理响应数据
  intercept(
    context: ExecutionContext, // 执行上下文
    next: CallHandler, // 下一个处理程序
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, params, query, body, headers } = request;
    this.logger.log('请求信息', {
      method,
      url,
      params,
      query,
      body,
      headers,
    });
    return next.handle().pipe(
      tap((data) => {
        this.logger.log('响应信息', {
          url,
          method,
          status: 200,
          msg: '请求成功',
          data,
        });
      }),
      // 使用map操作符转换响应数据
      map((data) => ({
        code: 200, // 响应状态码
        message: '请求成功', // 响应消息
        data, // 实际响应数据
      })),
    );
  }
}
