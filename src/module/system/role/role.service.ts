import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// 引入prisma
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  /**
   * 根据用户id查询角色
   * @param userId
   * @returns
   */
  async findRoleByUserId(userId: number) {
    const roles = await this.prisma.sys_user_role.findMany({
      where: {
        user_id: userId,
      },
    });
    if (roles) {
      return roles.map((role) => role.role_id);
    } else {
      return [];
    }
  }
}
