import { CreateUserCommandHandler } from '@components/users/commands/create-user/create-user.command-handler';
import { DeleteUserCommandHandler } from '@components/users/commands/delete-user/delete-user.command-handler';
import { UserOrmEntity } from '@components/users/database/orm-entities/user.orm-entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioOrmEntity } from './database/orm-entities/portfolio.orm-entity';
import { UsersRepository } from './database/repositories/users.repository';
import { FindOneUserQueryHandler } from './queries/find-one-user/find-one-user.query-handler';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';

const repositories = [UsersRepository];

const commandHandlers = [CreateUserCommandHandler, DeleteUserCommandHandler];

const queryHandlers = [FindUsersQueryHandler, FindOneUserQueryHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, PortfolioOrmEntity]),
    CqrsModule,
  ],
  providers: [...commandHandlers, ...queryHandlers, ...repositories],
})
export class UsersModule {}
