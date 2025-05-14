/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-08 13:44:05
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.controller.ts
 * @Description: 鉴权模块控制器
 */
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
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

  @Post('logout')
  @Public() // 跳过鉴权
  @ApiOperation({ summary: '登出', description: '登出接口' })
  logout(@Request() req) {
    const { user } = req;
    if (user) {
      return this.authService.signOut(`${user.username}&${user.sub}`);
    }
    return true;
  }
}
