import { User as UserEntity } from '@components/users/domain/entities/user.entity';
import { User } from '@interface-adapters/interfaces/users/user.interface';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PortfolioResponse } from './portfolio.response.dto';

export class UserResponse extends BaseResponse implements User {
  constructor(user: UserEntity) {
    super(user);

    const props = user.getCopy();
    this._email = props.email.value;
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
  @Exclude()
  private readonly _email: string;

  @ApiProperty()
  @Expose({ groups: ['role:user', 'role:admin'] })
  readonly name: {
    familyName: string;
    givenName: string;
    nickName: string;
  };
  @ApiProperty()
  @Expose()
  @Expose({ groups: ['role:user', 'role:admin'] })
  readonly portfolios: PortfolioResponse[];

  @ApiProperty()
  @Expose()
  @Expose({ groups: ['role:user', 'role:admin'] })
  readonly createdAt: string;

  @ApiProperty()
  @Expose()
  @Expose({ groups: ['role:admin'] })
  readonly updatedAt: string;

  @ApiProperty()
  @Expose()
  @Expose({ groups: ['role:admin'] })
  readonly deletedAt?: string;
}
