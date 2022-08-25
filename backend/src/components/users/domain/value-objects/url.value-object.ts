import { ArgumentOutOfRangeException } from '@libs/exceptions';
import {
  BaseValueObject,
  DomainPrimitive,
} from '@libs/structure/domain/base-classes/base-value-object';
import { Guard } from '@libs/structure/domain/guard';

export class URL extends BaseValueObject<string> {
  static minURLLength = 5;
  static maxURLLength = 320;

  constructor(value: string) {
    super({ value });
    this.props.value = URL.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, URL.minURLLength, URL.maxURLLength)) {
      throw new ArgumentOutOfRangeException('URL');
    }

    // TODO : Validate more!
  }

  static format(url: string): string {
    return url.trim();
  }
}
