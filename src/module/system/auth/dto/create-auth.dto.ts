/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-24 16:11:51
 * @FilePath: /vue2_project_server/src/module/system/auth/dto/create-auth.dto.ts
 * @Description: 登录信息dto
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
export class CreateAuthDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为字符串' })
  username: string;
  @ApiProperty({ description: '密码', required: true })
  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(/^[a-zA-Z0-9]{6,20}$/, {
    message: '密码必须为6-20位字母或数字',
  })
  password: string;
  @ApiProperty({ description: '验证码' })
  // @MinLength(4, { message: '验证码长度不能小于4' })
  // @MaxLength(4, { message: '验证码长度不能大于4' })
  code: string;
}
