import { ComponentsModule } from '@components/components.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ComponentsModule, CqrsModule],
  controllers: [UsersController],
})
export class V1ControllersModule {}
