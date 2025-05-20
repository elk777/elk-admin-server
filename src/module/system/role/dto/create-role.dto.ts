import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty({ description: '角色id' })
  role_id: number;
  @ApiProperty({ description: '角色名称' })
  role_name: string;
  @ApiProperty({ description: '角色标识' })
  role_label: string;
  @ApiProperty({ description: '角色状态' })
  status: string;
  @ApiProperty({ description: '角色排序' })
  order_num: number;
  @ApiProperty({ description: '删除标识' })
  del_flag: string;
  @ApiProperty({ description: '备注' })
  remark: string;
}
