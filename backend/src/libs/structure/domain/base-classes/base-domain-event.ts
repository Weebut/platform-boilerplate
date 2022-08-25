import { ArgumentNotProvidedException } from '@libs/exceptions';
import { Guard } from '@libs/structure/domain/guard';
import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';

export type BaseDomainEventProps<T> = Omit<
  T,
  'id' | 'correlationId' | 'dateOccurred'
> &
  Omit<BaseDomainEvent, 'id' | 'correlationId' | 'dateOccurred'> & {
    correlationId?: string;
    dateOccurred?: number;
  };

export abstract class BaseDomainEvent {
  public readonly id: string;

  public readonly aggregateId: string;
  public readonly dateOccurred: number;
  public correlationId: string;
  public causationId?: string;

  constructor(props: BaseDomainEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }
    this.id = UUID.generate().unpack();
    this.aggregateId = props.aggregateId;
    this.dateOccurred = props.dateOccurred || Date.now();
    if (props.correlationId) this.correlationId = props.correlationId;
  }
}
