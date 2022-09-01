import { ArgumentInvalidException } from '@libs/exceptions';
import { DomainPrimitive } from '@libs/structure/domain/base-classes/base-value-object';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { v4 as uuidV4, validate } from 'uuid';

export class UUID extends ID {
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): UUID {
    return new UUID(uuidV4());
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new ArgumentInvalidException('Incorrect UUID format');
    }
  }
}
