import { User, UserProps } from '@components/users/domain/entities/user.entity';
import { FindUsersQuery } from '@components/users/queries/find-users/find-users.query';
import { DomainEventsPubSubName } from '@infrastructure/domain-events-pubsub/domain-events-pubsub.module';
import { ContextLogger } from '@infrastructure/logger/context-logger';
import { NotFoundException } from '@libs/exceptions';
import { DomainEventsPubSubPort } from '@libs/structure/domain/ports/domain-events-pubsub.port';
import { QueryParams } from '@libs/structure/domain/ports/repository.port';
import { BaseTypeormRepository } from '@libs/structure/infrastructure/database/base-classes/base-typeorm-repository';
import { removeUndefinedProps } from '@libs/utils/remove-undefined-props.util';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { UserOrmMapper } from '../orm-mappers/user.orm.mapper';
import { UsersRepositoryPort } from './users.repository.port';

@Injectable()
export class UsersRepository
  extends BaseTypeormRepository<User, UserProps, UserOrmEntity>
  implements UsersRepositoryPort
{
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly usersRepository: Repository<UserOrmEntity>,
    @Inject(DomainEventsPubSubName)
    eventPubSub: DomainEventsPubSubPort,
  ) {
    super(
      usersRepository,
      new UserOrmMapper(User, UserOrmEntity),
      new ContextLogger(UsersRepository.name),
      eventPubSub,
    );
  }

  protected relations: string[] = ['portfolios'];

  private async findOneById(id: string): Promise<UserOrmEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: this.relations,
    });

    return user;
  }

  async findOneByIdOrThrow(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  private async findOneByEmail(
    email: string,
  ): Promise<UserOrmEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findOneByEmailOrThrow(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email);
    if (found) {
      return true;
    }
    return false;
  }

  async findUsers(query: FindUsersQuery): Promise<User[]> {
    const where: FindOptionsWhere<UserOrmEntity> = removeUndefinedProps(query);
    const users = await this.repository.find({
      where,
      relations: this.relations,
    });
    return users.map((user) => this.mapper.toDomainEntity(user));
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): FindOptionsWhere<UserOrmEntity> {
    const where: FindOptionsWhere<UserOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }

    if (params.name?.familyName) {
      where.familyName = params.name.familyName;
    }

    if (params.name?.givenName) {
      where.givenName = params.name.givenName;
    }

    if (params.name?.nickname) {
      where.nickname = params.name.nickname;
    }

    return where;
  }
}
