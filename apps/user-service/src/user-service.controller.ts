import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }

  @GrpcMethod('UserService')
  findOne(data: { id: string }) {
    return {
      id: data.id,
      name: 'Melak',
    };
  }
}
