import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty({ description: '角色id' })
  roleId?: number;

  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty({ description: '角色标识' })
  @IsNotEmpty()
  @IsString()
  roleLabel: string;

  @ApiProperty({ description: '角色权限' })
  @IsNumber({}, { each: true }) // 数组中每个元素都必须是数字
  roleKey: number[];

  @ApiProperty({ description: '角色状态' })
  @IsString()
  status: string;

  @ApiProperty({ description: '角色排序' })
  @IsNumber()
  orderNum: number;

  @ApiProperty({ description: '删除标识' })
  @IsString()
  delFlag: string;

  @ApiProperty({ description: '备注' })
  remark: string;
}
