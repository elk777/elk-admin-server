/*
 * @Author: elk
 * @Date: 2025-03-19 10:44:33
 * @LastEditors: elk
 * @LastEditTime: 2025-03-19 11:10:34
 * @FilePath: /vue2_project_server/src/config/jwt.config.ts
 * @Description: jwt配置文件
 */
import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
  cookieSecure: boolean;
  cookieHttpOnly: boolean;
}

export default registerAs('jwt', () => ({
  secret: process.env['JWT_SECRET'],
  expiresIn: process.env['JWT_EXPIRES_IN'],
  refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'],
  cookieSecure: process.env['JWT_COOKIE_SECURE'],
  cookieHttpOnly: process.env['JWT_COOKIE_HTTPONLY'],
}));
