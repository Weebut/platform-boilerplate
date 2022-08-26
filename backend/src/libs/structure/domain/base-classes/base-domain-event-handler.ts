import { BaseDomainEvent } from '@libs/structure/domain/base-classes/base-domain-event';

export abstract class BaseDomainEventHandler {
  abstract handle(event: BaseDomainEvent): Promise<void>;
}
