import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import {
  createClient,
  RedisClientType,
} from 'redis';

@Injectable()
export class RedisService
  implements OnModuleInit, OnModuleDestroy
{
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    await this.client.connect();

    console.log('Redis Connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    return value ? JSON.parse(value) : null;
  }

  async set(
    key: string,
    value: unknown,
    ttl = 60,
  ) {
    await this.client.set(
      key,
      JSON.stringify(value),
      {
        EX: ttl,
      },
    );
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async exists(key: string) {
    return this.client.exists(key);
  }
}