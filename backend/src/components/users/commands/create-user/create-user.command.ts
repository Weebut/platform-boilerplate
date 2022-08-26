import {
  BaseCommand,
  BaseCommandProps,
} from '@libs/structure/domain/base-classes/base-command';

export class CreateUserCommand extends BaseCommand {
  constructor(props: BaseCommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.familyName = props.familyName;
    this.givenName = props.givenName;
    this.nickname = props.nickname;
  }

  readonly email: string;

  readonly familyName: string;

  readonly givenName: string;

  readonly nickname: string;
}
