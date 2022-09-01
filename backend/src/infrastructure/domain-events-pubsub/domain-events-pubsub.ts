import { BaseAggregateRoot } from '@libs/structure/domain/base-classes/base-aggregate-root';
import { BaseDomainEvent } from '@libs/structure/domain/base-classes/base-domain-event';
import { DomainEventsPubSubPort } from '@libs/structure/domain/ports/domain-events-pubsub.port';
import { LoggerPort } from '@libs/structure/domain/ports/logger.port';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DomainEventsPubSub implements DomainEventsPubSubPort {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publishEvents(
    aggregate: BaseAggregateRoot<unknown>,
    logger: LoggerPort,
    correlationId?: string,
  ): Promise<void> {
    logger.debug(
      `[${aggregate.domainEvents.map(
        (event) => event.constructor.name,
      )}] published ${aggregate.id.value}`,
    );

    const promises = aggregate.domainEvents.map((event: BaseDomainEvent) => {
      if (correlationId && !event.correlationId) {
        event.correlationId = correlationId;
      }
      return this.publish(event, logger);
    });

    await Promise.all(promises);

    aggregate.clearEvents();
  }

  private async publish(
    event: BaseDomainEvent,
    logger: LoggerPort,
  ): Promise<void> {
    const eventName: string = event.constructor.name;

    try {
      logger.debug(`[${eventName}] handling ${event.aggregateId}`);
      await this.eventEmitter.emitAsync(eventName, event);
    } catch (err) {
      // TODO : Handle this error
    }
  }
}
