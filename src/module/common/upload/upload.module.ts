/*
 * @Author: elk
 * @Date: 2025-04-17 15:50:45
 * @LastEditors: elk 
 * @LastEditTime: 2025-04-18 16:40:53
 * @FilePath: /vue2_project_server/src/module/common/upload/upload.module.ts
 * @Description: 文件内容描述语
 */
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [
    /**
     * 异步注册 Multer 模块，用于处理文件上传。
     * 使用 useFactory 函数来异步配置 Multer 模块的选项。
     */
    MulterModule.registerAsync({
      /**
       * 异步工厂函数，返回 Multer 模块的配置选项。
       * @returns {Promise<object>} 包含 Multer 配置选项的对象。
       */
      useFactory: async () => ({
        // 设置文件上传的限制
        limits: {
          // 设置单个文件的最大大小为 200MB
          fileSize: 1024 * 1024 * 200,
        },
        // 配置文件存储方式为磁盘存储
        storage: diskStorage({
          // 指定文件上传后的存储目录，将文件存储在项目根目录下的 upload 文件夹中
          // 这里的文件需跟app.module.ts中的ServeStaticModule.forRoot()中的rootPath保持一致,否则访问不到
          destination: join(__dirname, '../../', '../upload'),
          /**
           * 自定义文件名生成规则。
           * @param {Request} req - 请求对象。
           * @param {Express.Multer.File} file - 上传的文件对象。
           * @param {Function} cb - 回调函数，用于返回生成的文件名。
           */
          filename: (req, file, cb) => {
            // 生成一个带有时间戳的文件名，避免文件名冲突
            const filename = `${Date.now()}-${file.originalname}`;
            // 调用回调函数，返回生成的文件名，第一个参数为错误信息，这里设为 null 表示没有错误
            return cb(null, filename);
          },
        }),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
