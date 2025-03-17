/*
 * @Author: elk
 * @Date: 2025-03-16 11:29:16
 * @LastEditors: elk
 * @LastEditTime: 2025-03-17 19:42:25
 * @FilePath: /vue2_project_server/src/common/filters/all-exceptions.filter.ts
 * @Description: 统一的错误处理过滤器
 */
// 从@nestjs/common导入所需的装饰器和接口
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// 从express导入Response和Request类型
import { Response, Request } from 'express';

// 引入日志服务
import { LoggerService } from '@/module/common/logger/logger.service';

// 使用Catch装饰器，指定捕获HttpException类型的异常
@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  // 实现catch方法，处理捕获的异常
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取HTTP上下文
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const request = ctx.getRequest<Request>(); // 获取请求对象
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // 获取状态码，默认为500
    const message =
      exception instanceof HttpException ? exception.message : '服务器错误'; // 获取错误信息，默认为'服务器错误'
    // 返回统一的错误响应格式
    response.status(status).json({
      code: status, // 状态码
      message, // 错误信息
      timestamp: new Date().toISOString(), // 时间戳
      path: request.url, // 请求路径
    });
    const { headers, url, params, query, body, method } = request;
    this.logger.log('请求信息', {
      headers,
      url,
      params,
      query,
      body,
      method,
    });
    this.logger.log('响应信息', {
      url,
      method,
      status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
