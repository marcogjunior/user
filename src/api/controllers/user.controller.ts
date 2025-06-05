import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { GetUserByEmailQuery } from '../../application/queries/get-user-by-email.query';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(CommandBus) private readonly commandBus: CommandBus,
    @Inject(QueryBus) private readonly queryBus: QueryBus
  ) {}
  onModuleInit() {}
  @Post()
  @ApiBody({ type: () => CreateUserDto })
  async createUser(@Body() body: CreateUserDto) {
    const createUserCommand = new CreateUserCommand();
    createUserCommand.email = body.email;
    createUserCommand.name = body.name;
    createUserCommand.password = body.password;
    return this.commandBus.execute(createUserCommand);
  }

  @Get(':email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'User email address',
    example: 'user@example.com',
  })
  async listUsers(@Param('email') email: string) {
    const query = new GetUserByEmailQuery(email);
    return this.queryBus.execute(query);
  }
}
