import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@libs/exceptions';
import {
  BaseValueObject,
  DomainPrimitive,
} from '@libs/structure/domain/base-classes/base-value-object';
import { Guard } from '@libs/structure/domain/guard';

export class Email extends BaseValueObject<string> {
  static minEmailLength = 5;
  static maxEmailLength = 320;

  constructor(value: string) {
    super({ value });
    this.props.value = Email.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (
      !Guard.lengthIsBetween(value, Email.minEmailLength, Email.maxEmailLength)
    ) {
      throw new ArgumentOutOfRangeException('Email');
    }
    if (!value.includes('@')) {
      throw new ArgumentInvalidException('Email has incorrect format');
    }

    // TODO : Validate more!
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
