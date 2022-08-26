import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { DeleteUserCommand } from '@components/users/commands/delete-user/delete-user.command';
import { User } from '@components/users/domain/entities/user.entity';
import { UserAlreadyExistsError } from '@components/users/errors/create-user.error';
import { FindOneUserQuery } from '@components/users/queries/find-one-user/find-one-user.query';
import { FindUsersQuery } from '@components/users/queries/find-users/find-users.query';
import { CreateUserRequest } from '@controllers/v1/users/dtos/request/commands/create-user.request.dto';
import { v1 } from '@infrastructure/configs/versions/v1';
import { ConflictException } from '@libs/exceptions';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { IdResponse } from '@libs/structure/interface-adapters/dtos/id-response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { usersRouteRoot } from './constants/route';
import { FindUsersRequest } from './dtos/request/queries/find-users.request.dto';
import { UserResponse } from './dtos/response/user.response.dto';

@Controller({ version: v1, path: usersRouteRoot })
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Public()
  async create(@Body() body: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body);
    try {
      const result: ID = await this.commandBus.execute(command);

      return new IdResponse(result.value);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }

  @Get()
  @Auth('read:users')
  async findUsers(@Query() queries: FindUsersRequest) {
    const query = new FindUsersQuery(queries);
    const result = await this.queryBus.execute(query);

    return result.map((user: User) => new UserResponse(user));
  }

  @Get(':userId')
  @Auth('read:users')
  async findUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const query = new FindOneUserQuery({ userId });
    const result = await this.queryBus.execute(query);

    return new UserResponse(result);
  }

  @Delete(':userId')
  @Auth('delete:users')
  async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    const command = new DeleteUserCommand({ userId });
    await this.commandBus.execute(command);
  }
}
