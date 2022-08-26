import {
  DomainPrimitive,
  BaseValueObject,
} from '@libs/structure/domain/base-classes/base-value-object';

export abstract class ID extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }

  protected abstract validate({ value }: DomainPrimitive<string>): void;
}
