import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

@Controller()
export class UploadsController {
  private readonly s3: S3Client;
  private readonly bucket = process.env.S3_BUCKET_NAME!;
  private readonly region = 'ap-northeast-2';

  constructor() {
    const s3Config: S3ClientConfig = {
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_KEY!,
        secretAccessKey: process.env.AWS_SECRET!,
      },
    };
    this.s3 = new S3Client(s3Config);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const key = `uploads/${Date.now()}-${file.originalname}`; // where it will live in the bucket

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          //   ACL: 'public-read', // uncomment if the object must be public
        }),
      );

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
      console.log('url', url);
      return { ok: true, key, url }; // return whatever your frontend expects
    } catch (err) {
      console.error('S3 upload failed:', err);
      throw new InternalServerErrorException('S3 upload failed');
    }
  }
}
