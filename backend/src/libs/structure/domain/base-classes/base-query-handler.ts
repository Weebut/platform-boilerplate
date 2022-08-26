import { BaseQuery } from './base-query';

export abstract class BaseQueryHandler {
  abstract handle(query: BaseQuery): Promise<unknown>;

  execute(query: BaseQuery): Promise<unknown> {
    return this.handle(query);
  }
}
