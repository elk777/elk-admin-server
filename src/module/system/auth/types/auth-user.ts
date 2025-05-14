/*
 * @Author: elk
 * @Date: 2025-04-27 17:09:05
 * @LastEditors: elk
 * @LastEditTime: 2025-04-27 17:10:13
 * @FilePath: /vue2_project_server/src/module/system/auth/types/auth-user.ts
 * @Description: 认证用户类型定义
 */
import { Request } from 'express';
export interface IAuthUser extends Request {
  user: {
    sub: string;
    username: string;
  };
}
