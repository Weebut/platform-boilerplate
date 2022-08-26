import { UsersModule } from '@components/users/users.module';
import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [UsersModule, EmailsModule],
})
export class ComponentsModule {}
