import { ArgumentNotProvidedException } from '@libs/exceptions';
import { nanoid } from 'nanoid';
import { Guard } from '../guard';
import { UUID } from '../value-objects/uuid.value-object';

export type BaseCommandProps<T> = Omit<T, 'correlationId' | 'id'> &
  Partial<BaseCommand>;

export class BaseCommand {
  readonly id: string;
  readonly correlationId: string;

  constructor(props: any) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty',
      );
    }

    this.correlationId = props.correlationId || nanoid(8);
    this.id = props.id || UUID.generate().unpack();
  }
}
