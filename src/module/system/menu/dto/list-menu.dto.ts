/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 11:04:03
 * @FilePath: \elk-admin-server\src\module\system\menu\dto\list-menu.dto.ts
 * @Description: 菜单列表-dto集合
 */
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class ListMenuDto {
  @ApiProperty({ description: '菜单Id' })
  @Expose({ name: 'menu_id' })
  menuId?: number;

  @ApiProperty({ description: '菜单名称' })
  @Expose({ name: 'menu_name' })
  menuName: string;

  @ApiProperty({ description: '父菜单Id' })
  @Expose({ name: 'parent_id' })
  parentId: number;

  @ApiProperty({ description: '显示顺序' })
  @Expose({ name: 'order_num' })
  orderNum: number;

  @ApiProperty({ description: '菜单类型' })
  @Expose({ name: 'menu_type' })
  menuType: string;

  @ApiProperty({ description: '菜单状态' })
  @Expose({ name: 'visible' })
  visible: string;

  @ApiProperty({ description: '菜单状态' })
  @Expose({ name: 'status' })
  status: string;

  @ApiProperty({ description: '权限标识' })
  @Expose({ name: 'perms' })
  perms: string;

  @ApiProperty({ description: '菜单图标' })
  @Expose({ name: 'icon' })
  icon: string;

  @ApiProperty({ description: '菜单路径' })
  @Expose({ name: 'path' })
  path: string;

  @ApiProperty({ description: '组件路径' })
  @Expose({ name: 'component' })
  component: string;

  @ApiProperty({ description: '菜单参数' })
  @Expose({ name: 'query' })
  query: string;

  @ApiProperty({ description: '是否外链' })
  @Expose({ name: 'is_frame' })
  isFrame: number;

  @ApiProperty({ description: '是否缓存' })
  @Expose({ name: 'is_cache' })
  isCache: number;

  @ApiProperty({ description: '是否隐藏' })
  @Expose({ name: 'el_flag' })
  elFlag: string;

  @ApiProperty({ description: '创建人' })
  @Expose({ name: 'created_by' })
  createdBy: string;

  @ApiProperty({ description: '修改人' })
  @Expose({ name: 'updated_by' })
  updatedBy: string;

  @ApiProperty({ description: '创建时间' })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '修改时间' })
  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
