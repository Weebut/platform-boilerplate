import { Global, Module } from '@nestjs/common';
import { DomainEventsPubSub } from './domain-events-pubsub';

export const DomainEventsPubSubName = 'DomainEventsPubSub';

@Global()
@Module({
  providers: [
    {
      provide: DomainEventsPubSubName,
      useClass: DomainEventsPubSub,
    },
  ],
  exports: [DomainEventsPubSubName],
})
export class DomainEventsPubSubModule {}
