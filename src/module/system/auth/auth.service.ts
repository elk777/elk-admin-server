/*
 * @Author: elk
 * @Date: 2025-03-11 18:18:25
 * @LastEditors: elk 
 * @LastEditTime: 2025-03-18 20:22:13
 * @FilePath: /vue2_project_server/src/module/system/auth/auth.service.ts
 * @Description: 文件内容描述语
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  signIn(createAuthDto: CreateAuthDto) {
    const { username, password, code } = createAuthDto;
    // const user = this.userService.findOne({ where: username });
    // console.log('🚀 ~ AuthService ~ signIn ~ user:', user);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
