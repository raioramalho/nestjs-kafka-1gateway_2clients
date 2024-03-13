import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(AppController.name);
  }

  @MessagePattern('first-topic')
  async returnPost1(@Payload() payload: any) {
    this.logger.verbose(
      `MessagePattern: ['first-topic']: ${JSON.stringify(payload)}`,
    );
    return payload;
  }

  @MessagePattern('second-topic')
  async returnPost2(@Payload() payload: any) {
    this.logger.log(
      `MessagePattern: ['second-topic']: ${JSON.stringify(payload)}`,
    );
    return payload;
  }
}
