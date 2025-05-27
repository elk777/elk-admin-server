/*
 * @Description: 字典管理-控制器
 * @Autor: lyf
 * @Date: 2025-05-17 16:28:08
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 10:15:24
 * @FilePath: \elk-admin-server\src\module\system\dic\dic.controller.ts
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
import { DicService } from './dic.service';
import { CreateDicDto } from './dto/create-dic.dto';
import { UpdateDicDto } from './dto/update-dic.dto';
import { ListDicDto } from './dto/list-dic.dto';

import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('字典管理')
@Controller('/system/dic')
export class DicController {
  constructor(private readonly dicService: DicService) {}

  @ApiOperation({ summary: '创建字典', description: '创建字典' })
  @ApiBody({ type: CreateDicDto })
  @Post('create')
  create(@Body() createDicDto: CreateDicDto) {
    return this.dicService.create(createDicDto);
  }

  @ApiOperation({ summary: '字典列表', description: '字典列表' })
  @ApiQuery({ type: ListDicDto })
  @Get('list')
  findAll(@Query() params: ListDicDto) {
    return this.dicService.findAll(params);
  }

  @ApiOperation({ summary: '获取字典数据', description: '获取字典数据' })
  @ApiQuery({ name: 'dicType', description: '字典类型' })
  @Get('dicData')
  getDicData(@Query('dicType') dicType: string) {
    return this.dicService.getDicData(dicType);
  }

  @ApiOperation({ summary: '字典详情', description: '字典详情' })
  @ApiParam({ name: 'id', description: '字典id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dicService.findOne(+id);
  }

  @ApiOperation({ summary: '字典修改', description: '字典修改' })
  @ApiBody({ type: UpdateDicDto })
  @Put('')
  update(@Body() updateDicDto: UpdateDicDto) {
    return this.dicService.update(updateDicDto);
  }

  @ApiOperation({ summary: '字典删除', description: '字典删除' })
  @ApiParam({ name: 'id', description: '字典id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dicService.remove(+id);
  }
}
