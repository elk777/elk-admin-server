/*
 * @Description: 字典管理-控制器
 * @Autor: lyf
 * @Date: 2025-05-17 16:28:08
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-17 16:29:13
 * @FilePath: \elk-admin-server\src\module\system\dic\dic.controller.ts
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
import { DicService } from './dic.service';
import { CreateDicDto } from './dto/create-dic.dto';
import { UpdateDicDto } from './dto/update-dic.dto';

@Controller('/system/dic')
export class DicController {
  constructor(private readonly dicService: DicService) {}

  @Post()
  create(@Body() createDicDto: CreateDicDto) {
    return this.dicService.create(createDicDto);
  }

  @Get('list')
  findAll() {
    return this.dicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDicDto: UpdateDicDto) {
    return this.dicService.update(+id, updateDicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dicService.remove(+id);
  }
}
