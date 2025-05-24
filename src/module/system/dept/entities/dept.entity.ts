import { sys_dept as Dept } from '@prisma/client';
export class PrismaDept implements Dept {
  dept_id: number;
  dept_name: string;
  parent_id: number;
  leader: string;
  email: string;
  phone: string;
  remark: string;
  status: string;
  ancestors: string;
  order_num: number;
  del_flag: string;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}
