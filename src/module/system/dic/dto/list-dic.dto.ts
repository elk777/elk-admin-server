/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-05-24 14:57:48
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-24 14:59:28
 * @FilePath: \elk-admin-server\src\module\system\dic\dto\list-dic.dto.ts
 */
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ListDicDto {
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  @IsNumber({}, { message: '页码必须为数字' })
  @Type(() => Number)
  pageNum: number;

  @ApiProperty({
    description: '页数',
    required: false,
    default: 10,
  })
  @IsNumber({}, { message: '页数必须为数字' })
  @Type(() => Number)
  pageSize: number;
}
