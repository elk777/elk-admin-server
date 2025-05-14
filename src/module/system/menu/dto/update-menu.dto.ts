/*
 * @Author: elk
 * @Date: 2025-05-07 15:29:02
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-08 15:25:37
 * @FilePath: /vue2_project_server/src/module/system/menu/dto/update-menu.dto.ts
 * @Description: 文件内容描述语
 */
import { PartialType } from '@nestjs/mapped-types';
import { ListMenuDto } from './list-menu.dto';

export class UpdateMenuDto extends PartialType(ListMenuDto) {}
