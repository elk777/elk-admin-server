/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-05-22 20:16:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-23 14:02:41
 * @FilePath: \elk-admin-server\src\module\system\dept\dto\list-dept.dto.ts
 */
import { IsInt, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class ListDeptDto {
  @ApiProperty({
    description: '页码',
  })
  @Min(1, { message: '页码最小为1' })
  @Type(() => Number)
  @IsNumber({}, { message: '页码必须为数字' })
  pageNum: number;

  @ApiProperty({
    description: '页数',
  })
  @Type(() => Number)
  @Min(10, { message: '页数最小为10' })
  @IsInt({ message: '页数必须为数字' })
  pageSize: number;
}
