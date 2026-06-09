import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../sandbox/src/app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app =
  await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath:
          join(
            process.cwd(),
            'libs/shared/src/proto/user.proto',
          ),
      },
    },
  );

  await app.listen();
}
bootstrap();
