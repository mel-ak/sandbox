import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthServiceModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5673'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    );

  await app.listen();

  console.log('Auth Service Running');
}

bootstrap();