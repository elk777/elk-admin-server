/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-08 15:59:33
 * @FilePath: /vue2_project_server/src/module/system/menu/dto/list-menu.dto.ts
 * @Description: 菜单列表-dto集合
 */
import { Expose } from 'class-transformer';
export class ListMenuDto {
  @Expose({ name: 'menu_id' })
  menuId: number;

  @Expose({ name: 'menu_name' })
  menuName: string;

  @Expose({ name: 'parent_id' })
  parentId: number;

  @Expose({ name: 'order_num' })
  orderNum: number;

  @Expose({ name: 'menu_type' })
  menuType: string;

  @Expose({ name: 'visible' })
  visible: string;

  @Expose({ name: 'status' })
  status: string;

  @Expose({ name: 'perms' })
  perms: string;

  @Expose({ name: 'icon' })
  icon: string;

  @Expose({ name: 'path' })
  path: string;

  @Expose({ name: 'component' })
  component: string;

  @Expose({ name: 'query' })
  query: string;

  @Expose({ name: 'is_frame' })
  isFrame: number;

  @Expose({ name: 'is_cache' })
  isCache: number;

  @Expose({ name: 'el_flag' })
  elFlag: string;

  @Expose({ name: 'created_by' })
  createdBy: string;

  @Expose({ name: 'updated_by' })
  updatedBy: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
