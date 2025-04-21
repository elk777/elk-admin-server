/*
 * @Author: elk
 * @Date: 2025-04-18 14:12:00
 * @LastEditors: elk
 * @LastEditTime: 2025-04-18 14:21:05
 * @FilePath: /vue2_project_server/src/module/common/upload/pipe/file-upload-before.pipe.ts
 * @Description: 文件上传前管道验证
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileUploadBeforePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('🚀 ~ FileUploadBeforePipe ~ transform ~ value:', value);
    const oneKb = 1000;
    if (value.size > oneKb * 1024 * 1) {
      throw new BadRequestException('文件大小不能超过1MB');
    } else {
      return value;
    }
  }
}
