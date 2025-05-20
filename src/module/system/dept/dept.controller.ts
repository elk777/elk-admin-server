/*
 * @Description: 部门管理模块-控制器
 * @Autor: lyf
 * @Date: 2025-05-19 20:33:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-19 20:34:05
 * @FilePath: \elk-admin-server\src\module\system\dept\dept.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@Controller('/system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get('/list')
  findAll() {
    return this.deptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(+id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }
}
