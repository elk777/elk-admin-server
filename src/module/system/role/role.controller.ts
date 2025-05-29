/*
 * @Description: 角色管理-控制器
 * @Autor: lyf
 * @Date: 2025-05-14 14:09:39
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 11:10:39
 * @FilePath: \elk-admin-server\src\module\system\role\role.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

// 引入swagger
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('角色管理')
@Controller('/system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色', description: '创建角色' })
  @ApiBody({ type: CreateRoleDto })
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '获取角色列表', description: '获取角色列表' })
  @ApiQuery({
    name: 'pageNum',
    type: Number,
    description: '页码',
    required: true,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: '页数',
    required: true,
  })
  @Get('list')
  findAll(@Query() params: ListRoleDto): Promise<RoleEntity> {
    return this.roleService.findAll(params);
  }

  @ApiOperation({ summary: '获取角色详情', description: '获取角色详情' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '角色id',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: '更新角色', description: '更新角色' })
  @ApiBody({ type: UpdateRoleDto })
  @Put('')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @ApiOperation({ summary: '删除角色', description: '删除角色' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '角色id',
    required: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
