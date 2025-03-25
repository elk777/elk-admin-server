/*
 * @Author: elk
 * @Date: 2025-03-21 18:43:56
 * @LastEditors: elk
 * @LastEditTime: 2025-03-21 18:44:07
 * @FilePath: /vue2_project_server/src/common/decorators/jwt.decorator.ts
 * @Description: jwt 装饰器
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
