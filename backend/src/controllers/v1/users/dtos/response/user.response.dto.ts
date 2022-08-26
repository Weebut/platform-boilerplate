import { User as UserEntity } from '@components/users/domain/entities/user.entity';
import { User } from '@interface-adapters/interfaces/users/user.interface';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';
import { PortfolioResponse } from './portfolio.response.dto';

export class UserResponse extends BaseResponse implements User {
  constructor(user: UserEntity) {
    super(user);

    const props = user.getCopy();
    this.email = props.email.value;
    this.name = {
      familyName: props.name.familyName,
      givenName: props.name.givenName,
      nickName: props.name.nickname,
    };
    this.portfolios =
      props.portfolios?.map((portfolio) => new PortfolioResponse(portfolio)) ??
      [];
  }

  readonly email: string;
  readonly name: {
    familyName: string;
    givenName: string;
    nickName: string;
  };
  readonly portfolios: PortfolioResponse[];
}
