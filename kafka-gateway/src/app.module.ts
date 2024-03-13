import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

const brokers: any = ['localhost:9092'];

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'GATEWAY',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gateway',
            brokers: brokers,
          },
          consumer: {
            groupId: 'producer',
            allowAutoTopicCreation: true,
          },
          producer: {
            allowAutoTopicCreation: true,
            idempotent: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
