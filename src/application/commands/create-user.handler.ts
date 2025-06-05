import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, User>
{
  constructor(
    @Inject(UserRepositoryImpl) private readonly userRepo: UserRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    let user = await this.userRepo.findByEmail(command.email);
    if (!user)
      user = await this.userRepo.create(
        new User('', command.name, command.email, command.password)
      );

    console.log('user created successfully', user);
    return user;
  }
}
