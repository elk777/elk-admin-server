/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:35
 * @LastEditors: elk
 * @LastEditTime: 2025-04-27 16:29:28
 * @FilePath: /vue2_project_server/src/module/system/user/user.controller.ts
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('/system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增用户
  @Post('')
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
  @ApiParam({ name: 'pageNum', description: '页码' })
  @ApiParam({ name: 'pageSize', description: '每页数量' })
  list(@Query() params: { pageNum: number; pageSize: number }) {
    return this.userService.findAll(params);
  }

  // 修改用户
  @Patch('')
  @ApiOperation({
    summary: '个人中心|用户管理-修改用户',
    description: '修改用户',
  })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // 删除用户
  @Delete(':id')
  @ApiOperation({ summary: '用户管理-删除用户', description: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
