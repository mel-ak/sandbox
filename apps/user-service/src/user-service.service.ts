import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class UserServiceService {

  private readonly register = new client.Registry()
  
  constructor(){
      client.collectDefaultMetrics({
          register: this.register
      })
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
}
