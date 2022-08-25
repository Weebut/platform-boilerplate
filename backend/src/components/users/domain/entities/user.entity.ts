import { Email } from '@components/users/domain/value-objects/email.value-object';
import { Name } from '@components/users/domain/value-objects/name.value-object';
import { BaseAggregateRoot } from '@libs/structure/domain/base-classes/base-aggregate-root';
import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';
import { UserCreatedDomainEvent } from '../events/user-created.domain-event';
import { PortfolioEntity } from './portfolio.entity';
import { UserRoles } from './user.type';

export interface CreateUserProps {
  email: Email;
  name: Name;
}

export interface UserProps extends CreateUserProps {
  role: UserRoles;
  portfolios: PortfolioEntity[];
}

export class User extends BaseAggregateRoot<UserProps> {
  static create(props: CreateUserProps) {
    const id = UUID.generate();

    const user = new User({
      id,
      props: { ...props, role: UserRoles.GUEST, portfolios: [] },
    });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id.value,
        email: props.email.unpack(),
        ...props.name.unpack(),
      }),
    );

    return user;
  }

  protected readonly _id: UUID;

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get role() {
    return this.props.role;
  }

  makeAdmin() {
    this.props.role = UserRoles.ADMIN;
  }

  makeModerator() {
    this.props.role = UserRoles.MODERATOR;
  }

  someBusinessLogic() {
    // TODO : Place business logic here
  }

  validate(): void {
    if (!this.props.portfolios) {
      throw new Error('Portfolios should be defined');
    }
  }
}
