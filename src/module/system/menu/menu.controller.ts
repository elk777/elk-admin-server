/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-17 16:11:12
 * @FilePath: \elk-admin-server\src\module\system\menu\menu.controller.ts
 * @Description: 文件内容描述语
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ListMenuDto } from './dto/list-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
