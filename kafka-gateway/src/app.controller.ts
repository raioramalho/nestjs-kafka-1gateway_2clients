import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { topicList } from './topic.list';

@Controller('/')
export class AppController implements OnModuleInit {
  private readonly logger: Logger;
  constructor(
    @Inject('GATEWAY')
    private readonly client: ClientKafka,
  ) {
    this.logger = new Logger(AppController.name);
  }
  async onModuleInit() {
    topicList.forEach(async (topic) => {
      this.client.subscribeToResponseOf(topic);
      await this.client.connect().then(() => {
        this.logger.verbose('Gateway connected');
      });
    });
  }

  @Post('carga1')
  async appPost1(@Body() body: any) {
    this.logger.verbose('POST ["/carga1"]');
    return await this.client.send('first-topic', body).toPromise();
  }

  @Post('carga2')
  async appPost2(@Body() body: any) {
    this.logger.verbose('POST ["/carga2"]');
    return await this.client.send('second-topic', body).toPromise();
  }
}
