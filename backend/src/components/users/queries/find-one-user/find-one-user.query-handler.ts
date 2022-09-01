import { UsersRepository } from '@components/users/database/repositories/users.repository';
import { User } from '@components/users/domain/entities/user.entity';
import { BaseQueryHandler } from '@libs/structure/domain/base-classes/base-query-handler';
import { QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserQueryHandler extends BaseQueryHandler {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async handle(query: FindOneUserQuery): Promise<User> {
    const user = await this.usersRepository.findOneByIdOrThrow(query.userId);
    return user;
  }
}
