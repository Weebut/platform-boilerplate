import { UsersRepository } from '@components/users/database/repositories/users.repository';
import { User } from '@components/users/domain/entities/user.entity';
import { BaseQueryHandler } from '@libs/structure/domain/base-classes/base-query-handler';
import { QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler extends BaseQueryHandler {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async handle(query: FindUsersQuery): Promise<User[]> {
    const users = await this.usersRepository.findUsers(query);
    return users;
  }
}
