/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Client, Transport, ClientKafka } from '@nestjs/microservices';

const brokers: any = ['localhost:9092'];

export class KafkaClientService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'gateway',
        brokers: brokers,
      },
      consumer: {
        groupId: 'producers',
        allowAutoTopicCreation: true,
      },
      producer: {
        allowAutoTopicCreation: true,
        idempotent: false,
      },
    },
  })
  private readonly client: ClientKafka;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(KafkaClientService.name);
  }

  async emit(topic: string, message: any): Promise<void> {
    try {
      this.logger.verbose(`Emit on [ ${topic} ]`);
      await this.client.connect(); // Connect to Kafka before emitting
      return await this.client.emit(topic, message).toPromise(); // Await the emission and convert it to a promise
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to emit message',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async send(topic: string, message: any): Promise<void> {
    try {
      this.logger.verbose(`Send on [ ${topic} ]`);
      await this.client.connect(); // Connect to Kafka before sending
      return await this.client.send(topic, message).toPromise(); // Await the sending and convert it to a promise
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to send message',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
