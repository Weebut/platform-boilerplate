export class SendEmailJob {
  constructor(props: SendEmailJob) {
    this.from = props.from;
    this.to = props.to;
    this.subject = props.subject;
    this.body = props.body;
  }

  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly body: string;
}
