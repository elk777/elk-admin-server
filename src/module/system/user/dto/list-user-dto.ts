/*
 * @Description: 请求参数-dto
 * @Autor: lyf
 * @Date: 2025-05-27 15:34:15
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 15:36:59
 * @FilePath: \elk-admin-server\src\module\system\user\dto\list-user-dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class ListUserDto {
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '页码必须为数字' })
  pageNum?: number = 1;

  @ApiProperty({
    description: '页码',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '页码必须为数字' })
  pageSize?: number = 10;
}
