import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [

    // Register Sandbox Service
    ClientsModule.register([
          {
            name: 'SANDBOX_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://localhost:5673'],
              queue: 'sandbox_queue',
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),

    // Register Auth Service
    ClientsModule.register([
        {
          name: 'AUTH_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5673'],
            queue: 'auth_queue',
            queueOptions: {
                durable: false,
              },
          },
        },
      ])
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
