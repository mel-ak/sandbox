import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {


  @MessagePattern('hello')
  getHello(data: any) {
    console.log('Received:', data);

    return {
      message: 'Hello from Sandbox Service',
      payload: data,
    };
  }

  @EventPattern('user-created')
  handleUserCreated(@Payload() data: any) {
    console.log('EVENT RECEIVED');
    console.log(data);
  }
}
