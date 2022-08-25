import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import Bull from 'bull';
import { EnvironmentConfigModule } from '../environment/environment.module';
import { EnvironmentConfigService } from '../environment/environment.service';

const getBullModuleOptions = (config: EnvironmentConfigService) => {
  return {
    host: config.getRedisHost(),
    port: config.getRedisPort(),
  } as Bull.QueueOptions;
};

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getBullModuleOptions,
    }),
  ],
})
export class BullConfigModule {}
