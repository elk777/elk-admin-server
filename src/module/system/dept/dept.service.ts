/*
 * @Description: 部门管理-逻辑层
 * @Autor: lyf
 * @Date: 2025-05-19 20:33:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-23 15:57:00
 * @FilePath: \elk-admin-server\src\module\system\dept\dept.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { ListDeptDto } from './dto/list-dept.dto';
import { PrismaDept } from './entities/dept.entity';

// 引入prisma
import { PrismaService } from 'prisma/prisma.service';
// 引入humps库:下划线和小驼峰转换
import { camelizeKeys, decamelizeKeys } from 'humps';

@Injectable()
export class DeptService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建部门
   * @param createDeptDto: CreateDeptDto
   * @return CreateDeptDto
   */
  async create(createDeptDto: CreateDeptDto) {
    // return true;
    const deptData = await this.prisma.sys_dept.create({
      data: {
        dept_name: createDeptDto.deptName,
        parent_id: createDeptDto.parentId,
        order_num: createDeptDto.orderNum,
        email: createDeptDto.email,
        phone: createDeptDto.phone,
        leader: createDeptDto.leader,
        status: createDeptDto.status,
        remark: createDeptDto.remark,
      },
    });
    if (!deptData) {
      return '新增失败';
    } else {
      return '新增成功';
    }
  }

  /**
   * 获取部门list
   * @param param: {pageNum: number; pageSize: number}
   * @returns
   */
  async findAll({ pageNum, pageSize }: ListDeptDto): Promise<PrismaDept[]> {
    const depts = await this.prisma.sys_dept.findMany({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      orderBy: { created_at: 'desc' },
    });
    return camelizeKeys(depts);
  }

  /**
   * 获取部门详情
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<PrismaDept | string> {
    const dept = await this.prisma.sys_dept.findUnique({
      where: { dept_id: id },
    });
    if (!dept) {
      return '获取失败';
    } else {
      return camelizeKeys(dept);
    }
  }

  /**
   * 更新部门
   * @param updateDeptDto
   * @returns
   */
  async update(updateDeptDto: UpdateDeptDto) {
    const dept = await this.prisma.sys_dept.update({
      where: { dept_id: updateDeptDto.deptId },
      data: {
        dept_name: updateDeptDto.deptName,
        email: updateDeptDto.email,
        leader: updateDeptDto.leader,
        order_num: updateDeptDto.orderNum,
        parent_id: updateDeptDto.parentId,
        remark: updateDeptDto.remark,
        status: updateDeptDto.status,
        updated_at: new Date(),
      },
    });
    if (!dept) {
      return '更新失败';
    } else {
      return '更新成功';
    }
  }

  /**
   * 删除部门
   * @param id
   * @return string
   */
  async remove(id: number) {
    const dept = await this.prisma.sys_dept.delete({
      where: {
        dept_id: id,
      },
    });
    if (!dept) {
      return '删除失败';
    } else {
      return '删除成功';
    }
  }
}
