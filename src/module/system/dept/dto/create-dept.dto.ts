import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';
export class CreateDeptDto {
  @ApiProperty({
    description: '部门id',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: '部门id必须为数字' })
  deptId?: number;

  @ApiProperty({
    description: '父部门id',
    example: 1,
  })
  @IsNumber({}, { message: '父部门id必须为数字' })
  parentId?: number;

  @ApiProperty({
    description: '部门名称',
    example: '部门名称',
  })
  @IsNotEmpty({ message: '部门名称不能为空' })
  @IsString({ message: '部门名称必须为字符串' })
  deptName: string;

  @ApiProperty({
    description: '部门负责人',
    example: '部门负责人',
  })
  @IsOptional()
  @IsString({ message: '部门负责人必须为字符串' })
  leader: string;

  @ApiProperty({
    description: '显示顺序',
    example: 1,
  })
  @IsNumber({}, { message: '显示顺序必须为数字' })
  orderNum: number;

  @ApiProperty({
    description: '部门状态',
    example: '1',
  })
  @IsString({ message: '部门状态必须为字符串' })
  status: string;

  @ApiProperty({
    description: '备注',
    example: '备注',
  })
  @IsOptional()
  @IsString({ message: '备注必须为字符串' })
  remark: string;

  @ApiProperty({ description: '部门邮箱', example: '部门邮箱' })
  @IsOptional()
  @IsEmail({}, { message: '部门邮箱格式不正确' })
  email: string;

  @ApiProperty({
    description: '部门电话',
    example: '部门电话',
  })
  @IsOptional()
  phone: string;
}
