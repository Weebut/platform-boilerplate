import { emailJobConsumerName } from '@components/emails/constants/job-consumer';
import { SendEmailJob } from '@components/emails/jobs/send-email/send-email.job';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(emailJobConsumerName)
export class SendEmailJobConsumer {
  constructor() {
    // TODO : Inject "Send email service"
  }

  @Process()
  async send(job: Job<SendEmailJob>) {
    setTimeout(() => {
      console.log(`Email sent to ${job.data.to}`, job.data);
    }, 2000);

    // TODO : Send email
  }
}
