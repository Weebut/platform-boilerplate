import {
  BaseDomainEvent,
  BaseDomainEventProps,
} from '@libs/structure/domain/base-classes/base-domain-event';

export class UserCreatedDomainEvent extends BaseDomainEvent {
  constructor(props: BaseDomainEventProps<UserCreatedDomainEvent>) {
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
