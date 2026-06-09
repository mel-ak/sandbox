import { Controller, Get, Param } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ) {
    return this.userServiceService.getUser(
      Number(id),
    );
  }
}
