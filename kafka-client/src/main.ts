import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const brokers: any = ['localhost:9092'];

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'client1',
          brokers: brokers,
        },
        consumer: {
          groupId: 'consumers',
          allowAutoTopicCreation: true,
        },
        producer: {
          allowAutoTopicCreation: true,
          idempotent: false,
        },
      },
    },
  );

  await app.listen();
  if (app) {
    console.clear();
    logger.verbose('CLIENT: [ON], KAFKA: [ON]');
  } else {
    console.clear();
    logger.error('CLIENT: [OFF], KAFKA: [OFF]');
  }
}

bootstrap();
