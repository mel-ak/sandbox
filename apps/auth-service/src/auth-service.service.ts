import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('NOTIFICATION_SERVICE')
  private readonly notificationClient: ClientProxy,
  ) {}

  async register(email: string, password: string) {
    const user = this.userRepository.create({
      email,
      password,
    });

    const savedUser = await this.userRepository.save(user);

    this.notificationClient.emit(
      'user.created',
      {
        id: savedUser.id,
        email: savedUser.email,
      },
    );

    return savedUser;
  }
}
