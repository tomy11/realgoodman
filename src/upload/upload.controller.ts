import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/fileUploading';
import { UploadService } from './upload.service';
import { Role } from '../utils/role.enum';
import { Roles } from '../utils/roles.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/image/:id')
  @Roles(Role.User)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: number,
  ) {
    //console.log('file : ', file, ' user id ', userId);
    const fileReq: any = {
      originalname: file.originalname,
      filename: file.filename,
      fieldname: file.fieldname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      path: file.path,
      size: file.size,
      user: userId,
    };

    await this.uploadService.saveUpload(fileReq);
  }
}
