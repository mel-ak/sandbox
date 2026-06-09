import { Controller, Get } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Get()
  getHello(): string {
    return this.notificationServiceService.getHello();
  }


  @EventPattern('user.created')
  handleUserCreated(
    @Payload() data: any,
  ) {
    console.log(
      `SMS SENT TO ${data.email}`,
    );
  }
}
