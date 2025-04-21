/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-07 16:45:47
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.controller.ts
 * @Description: 鉴权模块控制器
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { ParamsVerifyPipe } from '@/common/pipes/params-verify.pipe';

import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

// 引入本地验证守卫
import { LocalAuthGuard } from './guards/local.guard';

import { Public } from '@/common/decorators/jwt.decorator';

@Controller('auth')
@ApiTags('鉴权模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // 使用本地验证守卫
  @Public() // 跳过鉴权
  @Post('login')
  @ApiOperation({ summary: '登录', description: '登录接口获取token' })
  @ApiBody({ type: CreateAuthDto })
  signIn(@Body(new ParamsVerifyPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
