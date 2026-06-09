import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
      @Inject('SANDBOX_SERVICE')
      private readonly sandboxClient: ClientProxy,
    ) {}

  @Get()
  async test() {
    return this.sandboxClient.send('hello', {
      name: 'Melak',
    });
  }
}
