import { Module } from '@nestjs/common';
import { JwtOnlyStrategy } from './jwt-only.strategy';

@Module({
  providers: [JwtOnlyStrategy],
})
export class StrategiesModule {}
