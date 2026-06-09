import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/redis';

@Injectable()
export class UserServiceService {

  constructor(
    private readonly redis: RedisService,
  ) {}
  
  async getUser(id: number) {
    const cacheKey = `user:${id}`;

    const cached =
      await this.redis.get(cacheKey);

    if (cached) {
      console.log('CACHE HIT');

      return cached;
    }

    console.log('DATABASE HIT');

    const user = {
      id,
      name: 'Melak',
      email: 'melak@example.com',
    };

    await this.redis.set(
      cacheKey,
      user,
      300,
    );

    return user;
  }
}
