/*
 * @Author: elk
 * @Date: 2025-03-16 15:24:41
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-17 16:31:16
 * @FilePath: /vue2_project_server/src/common/interfaces/api-response.ts
 * @Description: api响应接口定义
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  code: number;
  message: string;
  error: string;
  path: string;
  timestamp: string;
}
