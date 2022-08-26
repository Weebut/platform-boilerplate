import { emailJobConsumerName } from '@components/emails/constants/job-consumer';
import { SendEmailJob } from '@components/emails/jobs/send-email/send-email.job';
import { UserCreatedDomainEvent } from '@components/users/domain/events/user-created.domain-event';
import { UnitOfWorkProviderName } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { BaseDomainEventHandler } from '@libs/structure/domain/base-classes/base-domain-event-handler';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { InjectQueue } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

export class SendEmailWhenUserIsCreatedDomainEventHandler extends BaseDomainEventHandler {
  constructor(
    @Inject(UnitOfWorkProviderName)
    protected readonly unitOfWork: UnitOfWorkPort,
    @InjectQueue(emailJobConsumerName)
    private readonly queue: Queue,
  ) {
    super();
  }

  @OnEvent(UserCreatedDomainEvent.name)
  async handle(event: UserCreatedDomainEvent) {
    const { email, nickname } = event;

    // TODO
    await this.queue.add(
      new SendEmailJob({
        from: 'no-reply@example.com',
        to: email,
        subject: `${nickname} 님 가입을 환영합니다.`,
        body: '안녕하세요. 저희 서비스에 가입하신 것을 환영합니다.',
      }),
    );

    // Do something more ex) Save logs
  }
}
