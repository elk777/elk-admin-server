/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk
 * @LastEditTime: 2025-05-08 13:50:22
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { MenuModule } from '../menu/menu.module';
import { AuthController } from './auth.controller';
import { AuthUserController } from './controllers/auth-user.controller';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtGuard } from './guards/jwt.guard';

// 控制器列表
const controllers = [AuthController, AuthUserController];

@Module({
  imports: [
    UserModule,
    RoleModule,
    MenuModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get('jwt');
        return {
          global: true,
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [...controllers],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
