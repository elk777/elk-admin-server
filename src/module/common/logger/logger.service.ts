/*
 * @Author: elk
 * @Date: 2025-03-17 18:07:38
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-17 19:39:00
 * @FilePath: /vue2_project_server/src/module/common/logger/logger.service.ts
 * @Description: 文件内容描述语
 */
// 从@nestjs/common导入Injectable装饰器
import { Injectable } from '@nestjs/common';
// 从winston导入日志相关功能
import { createLogger, format, transports, Logger } from 'winston';
// 导入winston-daily-rotate-file用于日志文件轮转
import 'winston-daily-rotate-file';

// 使用Injectable装饰器，将该类标记为可注入的服务
@Injectable()
export class LoggerService {
  private logger: Logger; // 日志记录器实例
  constructor() {
    // 初始化日志记录器
    this.logger = createLogger({
      level: 'info', // 默认日志级别
      format: format.combine(
        // 日志格式组合
        format.timestamp({
          // 时间戳格式
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(({ message, timestamp, level, ...metadata }) => {
          // 自定义日志格式
          let LogMessage = `${timestamp} ${level}: ${message}`;
          if (Object.keys(metadata).length > 0) {
            if (metadata.message !== 'message') {
              LogMessage += ` - ${JSON.stringify(metadata, null, 2)}`;
            }
          }
          return LogMessage;
        }),
      ),
      transports: [
        // 日志传输方式
        new transports.Console({
          // 控制台输出
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.DailyRotateFile({
          // 每日轮转文件输出
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true, // 是否压缩归档
          maxSize: '20m', // 单个文件最大大小
          maxFiles: '14d', // 保留天数
          level: 'info', // 日志级别
          format: format.combine(
            // 文件日志格式
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.printf((info) => {
              const paramsInfo = JSON.parse(JSON.stringify(info));
              return `${info.timestamp} [${info.level}]: ${info.message} ${
                Object.keys(info).length > 0 ? JSON.stringify(paramsInfo) : ''
              }`;
            }),
          ),
        }),
      ],
    });
  }

  // 记录日志信息，支持附加参数
  log(message: string, params: object = {}) {
    if (typeof params === 'object' && Object.keys(params).length > 0) {
      // 如果有附加参数，将参数与消息合并
      const logMessage = {
        message,
        ...params,
        level: 'info', // 日志级别为info
      };
      this.logger.log(logMessage); // 记录日志
    } else {
      // 如果没有附加参数，只记录消息
      this.logger.log({ message, level: 'info' });
    }
  }

  // 记录错误日志，支持附加参数和堆栈跟踪
  error(message: string, params: object = {}, trace = '') {
    if (typeof params === 'object' && Object.keys(params).length > 0) {
      const logMessage = {
        message,
        ...params,
        level: 'error', // 日志级别为error
        trace, // 堆栈跟踪信息
      };
      this.logger.error(logMessage); // 记录错误日志
    } else {
      this.logger.error({ message, level: 'error' });
    }
  }
  // 记录警告日志，支持附加参数
  warn(message: string, params: object = {}) {
    if (typeof params === 'object' && Object.keys(params).length > 0) {
      const logMessage = {
        message,
        ...params,
        level: 'warn', // 日志级别为warn
      };
      this.logger.warn(logMessage); // 记录警告日志
    } else {
      this.logger.warn({ message, level: 'warn' });
    }
  }
  // 记录调试日志，支持附加参数
  debug(message: string, params: object = {}) {
    if (typeof params === 'object' && Object.keys(params).length > 0) {
      const logMessage = {
        message,
        ...params,
        level: 'debug', // 日志级别为debug
      };
      this.logger.debug(logMessage); // 记录调试日志
    } else {
      this.logger.debug({ message, level: 'debug' });
    }
  }
  // 记录信息日志，支持附加参数
  info(message: string, params: object = {}) {
    if (typeof params === 'object' && Object.keys(params).length > 0) {
      const logMessage = {
        message,
        ...params,
        level: 'info', // 日志级别为info
      };
      this.logger.info(logMessage); // 记录信息日志
    } else {
      this.logger.info({ message, level: 'info' });
    }
  }
}
