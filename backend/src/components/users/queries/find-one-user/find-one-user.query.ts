import { BaseQuery } from '@libs/structure/domain/base-classes/base-query';

export class FindOneUserQuery extends BaseQuery {
  constructor(props: FindOneUserQuery) {
    super();
    this.userId = props.userId;
  }

  readonly userId: string;
}
