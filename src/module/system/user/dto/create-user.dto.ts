/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-12 18:16:20
 * @FilePath: /vue2_project_server/src/user/dto/create-user.dto.ts
 * @Description: 文件内容描述语
 */
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '用户名', required: true })
  username: string;
  @ApiProperty({ description: '密码', required: true })
  password: string;
}
