import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    NotificationServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5673'],
        queue: 'notification_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();

  console.log('Notification Service Running');
}

bootstrap();