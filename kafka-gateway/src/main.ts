import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    logger.debug(`Starting backend in [ http://localhost:3000 ]`);
  });
}
bootstrap();
