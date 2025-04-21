/*
 * @Author: elk
 * @Date: 2025-04-17 15:50:45
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-17 17:02:19
 * @FilePath: /vue2_project_server/src/module/common/upload/dto/create-upload.dto.ts
 * @Description: 文件内容描述语
 */
import { ApiProperty } from '@nestjs/swagger';
export class CreateUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
