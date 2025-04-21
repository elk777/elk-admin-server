/*
 * @Author: elk
 * @Date: 2025-04-17 15:50:45
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-21 15:03:14
 * @FilePath: /vue2_project_server/src/module/common/upload/upload.controller.ts
 * @Description: 上传模块-控制器
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { Public } from '@/common/decorators/jwt.decorator';

import { FileUploadBeforePipe } from './pipe/file-upload-before.pipe';

@Controller('upload')
@ApiTags('上传模块')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @ApiOperation({
    summary: '上传文件',
    description: '单个文件的上传接口、未接收参数',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传文件',
    type: CreateUploadDto,
    required: true,
  })
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log('🚀 ~ UploadController ~ create ~ file:', file);
    return '上传了，成功不成功不知道，反正我上传了';
  }

  @Post('files')
  @Public()
  @ApiOperation({
    summary: '上传多个文件',
    description: '多个文件的上传接口、未接收参数',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('🚀 ~ UploadController ~ creates ~ files:', files);
    return '上传了多个文件，成功不成功不知道，反正我上传了!!!';
  }
}
