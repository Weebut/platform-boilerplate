import { Module } from '@nestjs/common';
import { NeutralController } from './neutral.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [NeutralController],
})
export class NeutralControllersModule {}
