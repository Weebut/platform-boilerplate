import { BaseAggregateRoot } from '../base-classes/base-aggregate-root';
import { LoggerPort } from './logger.port';

export interface DomainEventsPubSubPort {
  publishEvents(
    aggregate: BaseAggregateRoot<unknown>,
    logger: LoggerPort,
    correlationId?: string,
  ): Promise<void>;
}
