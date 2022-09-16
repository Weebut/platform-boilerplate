import { User as UserEntity } from '@components/users/domain/entities/user.entity';
import { User } from '@interface-adapters/interfaces/users/user.interface';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: {
    familyName: string;
    givenName: string;
    nickName: string;
  };
  @ApiProperty()
  readonly portfolios: PortfolioResponse[];

  @ApiProperty()
  readonly createdAt: string;
  @ApiProperty()
  readonly updatedAt: string;
  @ApiProperty()
  readonly deletedAt?: string;
}
