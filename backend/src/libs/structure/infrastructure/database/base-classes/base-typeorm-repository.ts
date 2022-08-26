import { NotFoundException } from '@libs/exceptions';
import { BaseAggregateRoot } from '@libs/structure/domain/base-classes/base-aggregate-root';
import { DomainEventsPubSubPort } from '@libs/structure/domain/ports/domain-events-pubsub.port';
import { LoggerPort } from '@libs/structure/domain/ports/logger.port';
import {
  DataWithPaginationMeta,
  FindManyPaginatedParams,
  QueryParams,
  RepositoryPort,
} from '@libs/structure/domain/ports/repository.port';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseOrmMapper } from './base-orm-mapper';

export abstract class BaseTypeormRepository<
  Entity extends BaseAggregateRoot<unknown>,
  EntityProps,
  OrmEntity,
> implements RepositoryPort<Entity, EntityProps>
{
  protected constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: BaseOrmMapper<Entity, OrmEntity>,
    protected readonly logger: LoggerPort,
    protected readonly eventPubSub: DomainEventsPubSubPort,
  ) {}

  /**
   * Specify relations to other tables.
   * For example: `relations = ['user', ...]`
   */
  protected abstract relations: string[];

  protected tableName = this.repository.metadata.tableName;

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): FindOptionsWhere<OrmEntity>;

  async save(entity: Entity): Promise<Entity> {
    entity.validate(); // Protecting invariant before saving
    const ormEntity = this.mapper.toOrmEntity(entity);
    const result = await this.repository.save(ormEntity);
    await this.eventPubSub.publishEvents(
      entity,
      this.logger,
      this.correlationId,
    );
    this.logger.debug(
      `[${entity.constructor.name}] persisted ${entity.id.value}`,
    );
    return this.mapper.toDomainEntity(result);
  }

  async saveMultiple(entities: Entity[]): Promise<Entity[]> {
    const ormEntities = entities.map((entity) => {
      entity.validate();
      return this.mapper.toOrmEntity(entity);
    });
    const result = await this.repository.save(ormEntities);
    await Promise.all(
      entities.map((entity) =>
        this.eventPubSub.publishEvents(entity, this.logger, this.correlationId),
      ),
    );
    this.logger.debug(
      `[${entities}]: persisted ${entities.map((entity) => entity.id)}`,
    );
    return result.map((entity) => this.mapper.toDomainEntity(entity));
  }

  async findOne(
    params: QueryParams<EntityProps> = {},
  ): Promise<Entity | undefined> {
    const where = this.prepareQuery(params);
    const found = await this.repository.findOne({
      where,
      relations: this.relations,
    });
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneOrThrow(params: QueryParams<EntityProps> = {}): Promise<Entity> {
    const found = await this.findOne(params);
    if (!found) {
      throw new NotFoundException('Not found');
    }
    return found;
  }

  async findOneByIdOrThrow(id: ID | string): Promise<Entity> {
    const found = await this.repository.findOne({
      where: {
        id: id instanceof ID ? id.value : id,
      } as FindOptionsWhere<unknown>,
    });
    if (!found) {
      throw new NotFoundException('Not found');
    }
    return this.mapper.toDomainEntity(found);
  }

  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
      relations: this.relations,
    });

    return result.map((item) => this.mapper.toDomainEntity(item));
  }

  async findManyPaginated({
    params = {},
    pagination,
    orderBy,
  }: FindManyPaginatedParams<EntityProps>): Promise<
    DataWithPaginationMeta<Entity[]>
  > {
    const [data, count] = await this.repository.findAndCount({
      skip: pagination?.skip,
      take: pagination?.limit,
      where: this.prepareQuery(params),
      order: orderBy as any,
      relations: this.relations,
    });

    const result: DataWithPaginationMeta<Entity[]> = {
      data: data.map((item) => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    };

    return result;
  }

  async delete(entity: Entity): Promise<Entity> {
    entity.validate();
    await this.repository.remove(this.mapper.toOrmEntity(entity));
    await this.eventPubSub.publishEvents(
      entity,
      this.logger,
      this.correlationId,
    );
    this.logger.debug(
      `[${entity.constructor.name}] deleted ${entity.id.value}`,
    );
    return entity;
  }

  protected correlationId?: string;

  setCorrelationId(correlationId: string): this {
    this.correlationId = correlationId;
    this.setContext();
    return this;
  }

  private setContext() {
    if (this.correlationId) {
      this.logger.setContext(`${this.constructor.name}:${this.correlationId}`);
    } else {
      this.logger.setContext(this.constructor.name);
    }
  }
}
