import { PortfolioEntity } from '@components/users/domain/entities/portfolio.entity';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';

export class PortfolioResponse extends BaseResponse {
  constructor(portfolio: PortfolioEntity) {
    super(portfolio);

    const props = portfolio.getCopy();
    this.link = props.link.value;
  }

  readonly link: string;
}
