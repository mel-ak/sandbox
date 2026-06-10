import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class UserServiceService {

  public readonly register = new client.Registry()
  
  public httpRequestsTotal: client.Counter<string>;
  public httpRequestDuration: client.Histogram<string>;
  
  constructor(){
      client.collectDefaultMetrics({
          register: this.register
      })

       this.httpRequestsTotal = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.register],
    });

    this.httpRequestDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Request duration in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
      registers: [this.register],
    });
  }
  

  // It collects the following metrics:
    // - process_cpu_user_seconds_total
    // - process_resident_memory_bytes
    // - nodejs_heap_size_total_bytes
    // - nodejs_heap_size_used_bytes
    // - nodejs_eventloop_lag_seconds

    getMetrics(){
        return this.register.metrics();
    }

    sayHello(){
        return 'Hello World!';
    }

    getUser(id: string){
        return `User ${id}`;
    }

    getUsers(){
        return ['User 1', 'User 2', 'User 3'];
    }
}
