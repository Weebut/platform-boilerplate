import { BaseEntity } from '@libs/structure/domain/base-classes/base-entity';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';
import { URL } from '../value-objects/url.value-object';

export interface CreatePortfolioProps {
  link: URL;
}

export interface PortfolioProps extends CreatePortfolioProps {
  isPublic: boolean;
}

export class PortfolioEntity extends BaseEntity<PortfolioProps> {
  static create(props: CreatePortfolioProps) {
    const id = UUID.generate();

    const portfolio = new PortfolioEntity({
      id,
      props: { ...props, isPublic: false },
    });

    return portfolio;
  }

  protected readonly _id: ID;

  get link() {
    return this.props.link;
  }

  get isPublic() {
    return this.props.isPublic;
  }

  makePublic() {
    this.props.isPublic = true;
  }

  makePrivate() {
    this.props.isPublic = false;
  }

  public validate(): void {
    // TODO : Entity business rules
  }
}
