import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern('register')
  register(@Payload() payload: any) {
    return this.authServiceService.register(
      payload.email,
      payload.password,
    );
  }
}
