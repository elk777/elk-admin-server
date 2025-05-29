import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class ListRoleDto {
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: '页码必须为数字' })
  @Type(() => Number)
  pageNum?: number = 1;

  @ApiProperty({
    description: '页数',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber({}, { message: '页数必须为数字' })
  @Type(() => Number)
  pageSize?: number = 10;
}
