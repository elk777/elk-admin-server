/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-05-22 20:16:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 11:23:23
 * @FilePath: \elk-admin-server\src\module\system\dept\dto\list-dept.dto.ts
 */
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class ListDeptDto {
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: '页码必须为数字' })
  pageNum: number = 1;

  @ApiProperty({
    description: '页数',
    required: false,
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: '页数必须为数字' })
  pageSize: number = 10;
}
