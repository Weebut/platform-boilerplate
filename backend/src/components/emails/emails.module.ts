import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendEmailWhenUserIsCreatedDomainEventHandler } from './applications/event-handlers/send-email-when-user-created.event-handler';
import { SendEmailJobConsumer } from './applications/job-consumers/send-email.job-consumer';
import { emailJobConsumerName } from './constants/job-consumer';

const eventHandlers = [SendEmailWhenUserIsCreatedDomainEventHandler];

const jobConsumers = [SendEmailJobConsumer];

@Module({
  imports: [BullModule.registerQueue({ name: emailJobConsumerName })],
  providers: [...eventHandlers, ...jobConsumers],
})
export class EmailsModule {}
