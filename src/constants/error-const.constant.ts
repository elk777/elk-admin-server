/*
 * @Author: elk
 * @Date: 2025-03-20 16:23:53
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-20 16:29:41
 * @FilePath: /vue2_project_server/src/constants/error-const.constant.ts
 * @Description: 错误枚举常量集合
 */

export enum ErrorConst {
  // 通用错误
  DEFAULT = '0: 未知错误',
  PARAMS_ERROR = '9998: 参数错误',
  SERVER_ERROR = '500: 系统错误',
  // 认证信息
  USER_NOT_FOUND = '1001: 用户不存在',
  INVALID_VERIFICATION_CODE = '1002:验证码填写有误',
  INVALID_USERNAME_PASSWORD = '1003:用户名密码有误',
}
