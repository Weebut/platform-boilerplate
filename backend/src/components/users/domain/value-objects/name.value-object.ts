import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { BaseValueObject } from '@libs/structure/domain/base-classes/base-value-object';
import { Guard } from '@libs/structure/domain/guard';

interface NameProps {
  familyName: string;
  givenName: string;
  nickname: string;
}

export class Name extends BaseValueObject<NameProps> {
  static minNameLength = 1;
  static maxNameLength = 32;
  static minNicknameLength = 2;
  static maxNicknameLength = 32;

  constructor(props: NameProps) {
    super({
      familyName: Name.formatName(props.familyName),
      givenName: Name.formatName(props.givenName),
      nickname: Name.formatName(props.nickname),
    });
  }

  get familyName() {
    return this.props.familyName;
  }

  get givenName() {
    return this.props.givenName;
  }

  get nickname() {
    return this.props.nickname;
  }

  protected validate(props: NameProps): void {
    if (
      !Guard.lengthIsBetween(
        props.familyName,
        Name.minNameLength,
        Name.maxNameLength,
      )
    ) {
      throw new ArgumentOutOfRangeException('family name is out of range');
    }
    if (
      !Guard.lengthIsBetween(
        props.givenName,
        Name.minNameLength,
        Name.maxNameLength,
      )
    ) {
      throw new ArgumentOutOfRangeException('given name is out of range');
    }
    if (
      !Guard.lengthIsBetween(
        props.nickname,
        Name.minNicknameLength,
        Name.maxNicknameLength,
      )
    ) {
      throw new ArgumentOutOfRangeException('nickname is out of range');
    }
  }

  static formatName(name: string): string {
    // TODO : Do more!
    return name.trim();
  }
}
