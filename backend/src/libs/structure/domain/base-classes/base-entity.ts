import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from '@libs/exceptions';
import { DateVO } from '@libs/structure/domain/value-objects/date.value-object';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { convertPropsToObject } from '@libs/utils/convert-props-to-object.util';
import { Guard } from '../guard';

export interface BaseEntityProps {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface CreateEntityProps<T> {
  id: ID;
  props: T;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export abstract class BaseEntity<EntityProps> {
  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityProps<EntityProps>) {
    this.validateProps(props);

    const now = DateVO.now();

    this.setId(id);
    this.props = props;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;

    this.validate();
  }

  protected abstract _id: ID; // Implement freely
  protected readonly props: EntityProps;
  private readonly _createdAt: DateVO;
  private _updatedAt: DateVO;

  get id() {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is BaseEntity<unknown> {
    return entity instanceof BaseEntity;
  }

  public equals(object?: BaseEntity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!BaseEntity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  public getCopy(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    };

    return Object.freeze(result);
  }

  public abstract validate(): void;
  public validateProps(props: EntityProps): void {
    const maxProps = 100;

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
    if (Object.keys(props).length > maxProps) {
      throw new ArgumentOutOfRangeException(
        `Entity props should not have more than ${maxProps} properties`,
      );
    }
  }
}
