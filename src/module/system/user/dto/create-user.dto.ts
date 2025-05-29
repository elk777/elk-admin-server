/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-29 15:24:37
 * @FilePath: \elk-admin-server\src\module\system\user\dto\create-user.dto.ts
 * @Description: 文件内容描述语
 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateUserDto {
  @ApiProperty({ description: '用户ID' })
  userId?: number;
  @ApiProperty({ description: '用户名', required: true })
  userName: string;
  @ApiProperty({ description: '密码', required: true })
  password: string;
  @ApiProperty({ description: '手机号' })
  phone?: string;
  @ApiProperty({ description: '邮箱' })
  email?: string;
  @ApiProperty({ description: '昵称', required: true })
  nickName: string;
  @ApiProperty({ description: '头像' })
  avatar?: string;
  @ApiProperty({ description: '性别' })
  sex?: string;
  @ApiProperty({ description: '状态' })
  status?: string;
  @ApiProperty({ description: '角色ID' })
  roleIds?: number;
  @ApiProperty({ description: '部门ID' })
  deptIds?: number[];
  @ApiProperty({ description: '创建人' })
  createBy?: string;
  @ApiProperty({ description: '创建时间' })
  createdAt?: Date;
  @ApiProperty({ description: '更新人' })
  updateBy?: string;
  @ApiProperty({ description: '更新时间' })
  updatedAt?: Date;
  @ApiProperty({ description: '删除标志' })
  delFlag?: string;
  @ApiProperty({ description: '备注' })
  remark?: string;

  deptId?: string;
  depts?: unknown[];
  roles?: unknown[];
}
