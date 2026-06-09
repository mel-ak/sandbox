import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

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
}
