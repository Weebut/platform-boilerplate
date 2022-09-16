import { PortfolioEntity } from '@components/users/domain/entities/portfolio.entity';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioResponse extends BaseResponse {
  constructor(portfolio: PortfolioEntity) {
    super(portfolio);

    const props = portfolio.getCopy();
    this.link = props.link.value;
  }

  @ApiProperty()
  readonly link: string;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;

  @ApiProperty()
  readonly deletedAt?: string;
}
