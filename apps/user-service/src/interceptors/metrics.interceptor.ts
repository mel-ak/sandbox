import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserServiceService } from '../user-service.service';

@Injectable()
export class MetricsInterceptor
  implements NestInterceptor
{
  constructor(
    private readonly monitoring: UserServiceService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest();

    const response = context
      .switchToHttp()
      .getResponse();

    const start = process.hrtime();

    return next.handle().pipe(
      tap(() => {
        const diff = process.hrtime(start);

        const duration =
          diff[0] + diff[1] / 1e9;

        const labels = {
          method: request.method,
          route:
            request.route?.path ||
            request.url,
          status_code:
            response.statusCode.toString(),
        };

        this.monitoring.httpRequestsTotal.inc(
          labels,
        );

        this.monitoring.httpRequestDuration.observe(
          labels,
          duration,
        );
      }),
    );
  }
}