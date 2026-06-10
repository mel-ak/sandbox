import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
    
@Module({
  imports: [
  
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService, MetricsInterceptor],
})
export class UserServiceModule {}
