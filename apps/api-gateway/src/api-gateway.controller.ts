import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
      @Inject('SANDBOX_SERVICE')
      private readonly sandboxClient: ClientProxy,

      @Inject('AUTH_SERVICE')
      private readonly authClient: ClientProxy,
    ) {}

  @Get()
  async test() {
    return this.sandboxClient.send('hello', {
      name: 'Melak',
    });
  }

  @Get('event')
  async event() {
    this.sandboxClient.emit('user-created', {
      id: 1,
      name: 'Melak',
      email: 'melak@gmail.com',
    });

    return {
      message: 'Event Published',
    };
  }

  @Post('register')
  register(
    @Body() body: any,
  ) {
    return this.authClient.send(
      'register',
      body,
    );
  }
}
