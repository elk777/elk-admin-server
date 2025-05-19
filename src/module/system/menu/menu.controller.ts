/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-19 20:11:23
 * @FilePath: \elk-admin-server\src\module\system\menu\menu.controller.ts
 * @Description: 文件内容描述语
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
import { MenuService } from './menu.service';
import { ListMenuDto } from './dto/list-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('菜单管理')
@Controller('/system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: ListMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({ summary: '获取菜单列表', description: '获取菜单列表' })
  @ApiQuery({ name: 'pageNum', description: '页码' })
  @ApiQuery({ name: 'pageSize', description: '页数' })
  @Get('/list')
  getList(@Query() params: { pageNum: number; pageSize: number }) {
    return this.menuService.getList(params);
  }

  @ApiOperation({ summary: '获取菜单详情', description: '获取菜单详情' })
  @ApiQuery({ name: 'id', description: '菜单id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @ApiOperation({ summary: '更新菜单', description: '更新菜单' })
  @ApiBody({ type: ListMenuDto })
  @Put('')
  update(@Body() updateMenuDto: ListMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @ApiOperation({ summary: '删除菜单', description: '删除菜单' })
  @ApiQuery({ name: 'id', description: '菜单id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
