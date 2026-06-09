import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('UserService', 'FindOne')
  findOne(data: { id: string }) {
    return {
      id: data.id,
      name: 'Melak Sisay',
      email: 'melak@example.com',
    };
  }
}