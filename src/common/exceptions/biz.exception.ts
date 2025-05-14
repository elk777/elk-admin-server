/*
 * @Author: elk
 * @Date: 2025-04-25 15:51:17
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-25 16:53:52
 * @FilePath: /vue2_project_server/src/common/exceptions/biz.exception.ts
 * @Description: 业务通用自定义异常
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorConst } from '@/constants/error-const.constant';

export class BusinessException extends HttpException {
  private errorCode: number;

  constructor(error: ErrorConst | string) {
    // 如果是非业务异常(ErrorConst)，直接抛出
    if (!error.includes(':')) {
      super(
        HttpException.createBody({
          code: 200,
          message: error,
        }),
        HttpStatus.OK,
      );
      this.errorCode = 200;
      return;
    }
    // 如果是业务异常(ErrorConst)，则解析错误码和错误信息
    const [code, message] = error.split(':');
    super(
      HttpException.createBody({
        code: Number(code),
        message,
      }),
      HttpStatus.OK,
    );
    this.errorCode = Number(code);
  }
  getErrorCode() {
    return this.errorCode;
  }
}

export { BusinessException as BizException };
