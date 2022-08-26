import { ArgumentNotProvidedException } from '@libs/exceptions';
import { Guard } from '@libs/structure/domain/guard';
import { convertPropsToObject } from '@libs/utils/convert-props-to-object.util';

export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type BaseValueObjectProps<T> = T extends Primitives | Date
  ? DomainPrimitive<T>
  : T;

export abstract class BaseValueObject<T> {
  protected readonly props: BaseValueObjectProps<T>;

  constructor(props: BaseValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  protected abstract validate(props: BaseValueObjectProps<T>): void;

  static isValueObject(obj: unknown): obj is BaseValueObject<unknown> {
    return obj instanceof BaseValueObject;
  }

  public equals(object?: BaseValueObject<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(object);
  }

  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const propsCopy = convertPropsToObject(this.props);

    return Object.freeze(propsCopy);
  }

  private checkIfEmpty(props: BaseValueObjectProps<T>): void {
    if (
      Guard.isEmpty(props) ||
      (this.isDomainPrimitive(props) && Guard.isEmpty(props.value))
    ) {
      throw new ArgumentNotProvidedException('Property cannot be empty');
    }
  }

  private isDomainPrimitive(
    object: unknown,
  ): object is DomainPrimitive<T & (Primitives | Date)> {
    if (Object.prototype.hasOwnProperty.call(object, 'value')) {
      return true;
    }
    return false;
  }
}
