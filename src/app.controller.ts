import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ListBucketsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';

@Controller()
export class AppController {
  private logger;
  private throwErrors = false;
  private s3Client;

  constructor(private readonly appService: AppService) {
    this.logger = new Logger('controller');
    this.s3Client = new S3Client({ region: 'eu-central-1' });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kill')
  kill(): void {
    this.throwErrors = true;
  }

  @Get('up')
  up() {
    if (this.throwErrors) {
      this.logger.log('bad health');
      throw new Error();
    }

    this.logger.log('health ok');

    return { health: 'ok' };
  }

  @Get('env')
  listEnv() {
    return process.env;
  }

  @Get('s3')
  async s3(): Promise<any> {
    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) {
      return 'please configure BUCKET_NAME environment variable';
    }

    return await this.s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName }),
    );
  }
}
