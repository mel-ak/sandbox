import { Controller, Get, Header, Param } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}


  @Get('metrics')
  @Header('Content-Type', 'text/plain')
  metrics(){
      return this.userServiceService.getMetrics();
  }

  @Get('hello')
  hello(){
      return this.userServiceService.sayHello();
  }

}
