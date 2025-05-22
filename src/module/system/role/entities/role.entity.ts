/*
 * @Description: 角色-实体类-数据库映射
 * @Autor: lyf
 * @Date: 2025-05-14 14:09:39
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-22 15:17:19
 * @FilePath: \elk-admin-server\src\module\system\role\entities\role.entity.ts
 */
import { sys_role as Role } from '@prisma/client';
export class RoleEntity implements Role {
  role_id: number;
  role_name: string;
  role_label: string;
  status: string;
  remark: string;
  order_num: number;
  del_flag: string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
}
