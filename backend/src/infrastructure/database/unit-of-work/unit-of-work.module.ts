import { TypeormUnitOfWork } from '@infrastructure/database/unit-of-work/typeorm.unit-of-work';
import { DomainEventsPubSubName } from '@infrastructure/domain-events-pubsub/domain-events-pubsub.module';
import { ContextLogger } from '@infrastructure/logger/context-logger';
import { DomainEventsPubSubPort } from '@libs/structure/domain/ports/domain-events-pubsub.port';
import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const UnitOfWorkProviderName = 'UnitOfWork';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: UnitOfWorkProviderName,
      inject: [DataSource, DomainEventsPubSubName],
      useFactory: (source: DataSource, pubsub: DomainEventsPubSubPort) =>
        new TypeormUnitOfWork(source, new ContextLogger(), pubsub),
    },
  ],
  exports: [UnitOfWorkProviderName],
})
export class UnitOfWorkModule {}
