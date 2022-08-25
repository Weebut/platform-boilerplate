import {
  BaseCommand,
  BaseCommandProps,
} from '@libs/structure/domain/base-classes/base-command';

export class DeleteUserCommand extends BaseCommand {
  constructor(props: BaseCommandProps<DeleteUserCommand>) {
    super(props);
    this.userId = props.userId;
  }

  readonly userId: string;
}
