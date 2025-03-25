/*
 * @Author: elk
 * @Date: 2025-03-13 20:09:22
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-20 15:20:20
 * @FilePath: /vue2_project_server/src/config/schema.config.ts
 * @Description: joi验证配置文件
 */
import * as joi from 'joi';

// 定义配置文件的类型
export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'staging';
  PORT: number;
  HOST: string;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  any?: any;
}

// 定义配置文件的校验规则
export const configJoiSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
  PORT: joi.number().required().default(3000),
  HOST: joi.string().required().default('localhost'),
  DB_TYPE: joi.string().required().default('mysql'),
  DB_HOST: joi.string().required().default('127.0.0.1'),
  DB_PORT: joi.number().required().default(33061),
  DB_USER: joi.string().required().default('root'),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  REDIS_HOST: joi.string().required().default('127.0.0.1'),
  REDIS_PORT: joi.number().required().default(63795),
  REDIS_PASSWORD: joi.string().required(),
  REDIS_PREFIX: joi.string().required(),
  REDIS_DB: joi.number().required(),
  REDIS_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES_IN: joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: joi.string().required(),
  JWT_COOKIE_SECURE: joi.boolean().required().default(false),
  JWT_COOKIE_HTTPONLY: joi.boolean().required().default(true),
});
