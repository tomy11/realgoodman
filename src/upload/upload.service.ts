import { Injectable } from '@nestjs/common';
import { UploadDto } from './dto/upload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Upload } from './schemas/upload.schema';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {}

  async findAll(): Promise<UploadDto> {
    try {
      const result: any = await this.uploadModel.find();

      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  async getById(id: number): Promise<UploadDto> {
    try {
      const result: any = await this.uploadModel.findOne({
        where: { id: id },
      });

      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  async saveUpload(upload: UploadDto): Promise<UploadDto> {
    try {
      const input: UploadDto = {
        originalname: upload.originalname,
        filename: upload.filename,
        fieldname: upload.fieldname,
        encoding: upload.encoding,
        mimetype: upload.mimetype,
        destination: upload.destination,
        path: upload.path,
        size: upload.size,
        user: upload.user,
      };
      const result = new this.uploadModel(input);
      await result.save();
      return result;
    } catch (error) {
      console.log('error ', error);
    }
  }

  async saveMultiUpload(upload: UploadDto[] = []): Promise<UploadDto[]> {
    try {
      const multiUpload: UploadDto[] = [];
      for (const n of upload) {
        const input: UploadDto = {
          originalname: n.originalname,
          filename: n.filename,
          fieldname: n.fieldname,
          encoding: n.encoding,
          mimetype: n.mimetype,
          destination: n.destination,
          path: n.path,
          size: n.size,
          user: n.user,
        };
        const result = new this.uploadModel(input);
        await result.save();
        multiUpload.push(input);
      }

      return multiUpload;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
