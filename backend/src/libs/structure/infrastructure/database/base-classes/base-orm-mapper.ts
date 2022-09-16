import { BaseAggregateRoot } from '@libs/structure/domain/base-classes/base-aggregate-root';
import { CreateEntityProps } from '@libs/structure/domain/base-classes/base-entity';
import { DateVO } from '@libs/structure/domain/value-objects/date.value-object';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { BaseTypeormEntity } from './base-typeorm-entity';

export type OrmEntityProps<BaseOrmEntity> = Omit<
  BaseOrmEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface EntityProps<Props> {
  id: ID;
  props: Props;
}

export abstract class BaseOrmMapper<
  Entity extends BaseAggregateRoot<unknown>,
  OrmEntity,
> {
  constructor(
    private entityConstructor: new (props: CreateEntityProps<any>) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const { id, props } = this.toDomainProps(ormEntity);
    const ormEntityBase: BaseTypeormEntity =
      ormEntity as unknown as BaseTypeormEntity;

    return new this.entityConstructor({
      id,
      props,
      createdAt: new DateVO(ormEntityBase.createdAt),
      updatedAt: new DateVO(ormEntityBase.updatedAt),
      ...(undefined !== ormEntityBase.deletedAt && {
        deletedAt: new DateVO(ormEntityBase.deletedAt),
      }),
    });
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);

    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
      ...(undefined !== entity.deletedAt && {
        deletedAt: entity.deletedAt.value,
      }),
    });
  }
}
