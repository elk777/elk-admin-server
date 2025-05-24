/*
 * @Author: elk
 * @Date: 2025-03-18 19:46:28
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-23 13:58:42
 * @FilePath: \elk-admin-server\src\common\pipes\params-verify.pipe.ts
 * @Description: 参数验证管道
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BizException } from '@/common/exceptions/biz.exception';

@Injectable()
export class ParamsVerifyPipe implements PipeTransform {
  // 参数转换和验证方法
  async transform(value: any, metadata: ArgumentMetadata) {
    // 验证是否为类
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    // 将普通对象转换为DTO实例
    const DTO = plainToInstance(metadata.metatype, value);
    // 验证DTO实例
    const errors = await validate(DTO);
    // 如果有验证错误，抛出异常
    if (errors.length > 0) {
      throw new HttpException(this.handleError(errors), HttpStatus.BAD_REQUEST);
    }
    // 验证通过,返回DTO实例
    return DTO;
  }

  // 判断是否需要验证的类型
  private toValidate(metatype: Function): boolean {
    // 不需要验证的基本类型
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  // 处理验证错误信息
  private handleError(errors: any[]) {
    // 将错误信息转换为更友好的格式
    const messages = errors.map((error) => {
      return Object.values({
        paramName: error.property, // 参数名称
        message: Object.values(error.constraints), // 验证失败信息
      });
    });
    return messages;
  }
}
