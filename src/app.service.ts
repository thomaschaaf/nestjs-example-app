import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello to the pod: ' + process.env.HOSTNAME;
  }
}
