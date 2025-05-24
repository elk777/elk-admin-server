/*
 * @Description: 部门管理模块-控制器
 * @Autor: lyf
 * @Date: 2025-05-19 20:33:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-24 14:03:01
 * @FilePath: \elk-admin-server\src\module\system\dept\dept.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { ListDeptDto } from './dto/list-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('部门管理')
@Controller('/system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiOperation({ summary: '创建部门', description: '创建部门' })
  @ApiBody({ type: CreateDeptDto })
  @Post()
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @ApiOperation({ summary: '获取部门列表', description: '获取部门列表' })
  @ApiQuery({ type: ListDeptDto })
  @Get('/list')
  findAll(@Query() params: ListDeptDto) {
    return this.deptService.findAll(params);
  }

  @ApiOperation({ summary: '获取部门详情', description: '获取部门详情' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @ApiOperation({ summary: '更新部门信息', description: '更新部门信息' })
  @ApiBody({ type: UpdateDeptDto })
  @Put('')
  update(@Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(updateDeptDto);
  }

  @ApiOperation({ summary: '删除部门', description: '删除部门' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }
}
