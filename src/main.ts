import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  setInterval(() => {
    logger.log('at the next beep its ' + new Date());
  }, 1000);
}
bootstrap();
