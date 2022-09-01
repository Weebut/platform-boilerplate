import { ComponentsModule } from '@components/components.module';
import { BullConfigModule } from '@infrastructure/configs/bull/bull.module';
import { EnvironmentConfigModule } from '@infrastructure/configs/environment/environment.module';
import { EventEmitterConfigModule } from '@infrastructure/configs/event-emitter/event-emitter.module';
import { TypeormConfigModule } from '@infrastructure/configs/typeorm/typeorm.module';
import { UnitOfWorkModule } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { DomainEventsPubSubModule } from '@infrastructure/domain-events-pubsub/domain-events-pubsub.module';
import { Module } from '@nestjs/common';
import { StrategiesModule } from './auth/strategies/strategies.module';
import { NeutralControllersModule } from './controllers/neutral/neutral-controllers.module';
import { V1ControllersModule } from './controllers/v1/v1-controllers.module';

@Module({
  imports: [
    BullConfigModule,
    EnvironmentConfigModule,
    EventEmitterConfigModule,
    TypeormConfigModule,
    StrategiesModule,
    UnitOfWorkModule,
    DomainEventsPubSubModule,
    ComponentsModule,
    NeutralControllersModule,
    V1ControllersModule,
  ],
})
export class AppModule {}
