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
});
