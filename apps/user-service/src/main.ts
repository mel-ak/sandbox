import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app =
  await NestFactory.create(UserServiceModule);

  await app.listen(3093);
  console.log('User Service Running on port 3093');
}
bootstrap();
