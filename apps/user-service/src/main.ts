import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';

async function bootstrap() {
  const app =
  await NestFactory.create(UserServiceModule);

  app.useGlobalInterceptors(
  app.get(MetricsInterceptor),
);

  await app.listen(3093);
  console.log('User Service Running on port 3093');
}
bootstrap();
