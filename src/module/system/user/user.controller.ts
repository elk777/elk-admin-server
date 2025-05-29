/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-28 15:06:36
 * @FilePath: \elk-admin-server\src\module\system\user\user.controller.ts
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from './dto/list-user-dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('/system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增用户
  @Post('create')
  @ApiOperation({ summary: '用户管理-新增用户', description: '新增用户' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 获取用户列表
  @Get('/list')
  @ApiOperation({
    summary: '用户管理-获取用户列表',
    description: '获取用户列表',
  })
  @ApiQuery({ type: ListUserDto })
  list(@Query() params: ListUserDto) {
    return this.userService.findAll(params);
  }
  // 获取用户详情
  @Get(':id')
  @ApiOperation({
    summary: '用户管理-获取用户详情',
    description: '获取用户详情',
  })
  @ApiParam({ name: 'id', description: '用户ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ user_id: +id });
  }

  // 修改用户
  @Put('')
  @ApiOperation({
    summary: '用户管理-修改用户',
    description: '修改用户',
  })
  @ApiBody({ type: UpdateUserDto })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  // 删除用户
  @Delete(':id')
  @ApiOperation({ summary: '用户管理-删除用户', description: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
