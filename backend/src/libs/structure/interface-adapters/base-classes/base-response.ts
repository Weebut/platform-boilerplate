import { BaseEntityProps } from '@libs/structure/domain/base-classes/base-entity';
import { IdResponse } from '@libs/structure/interface-adapters/dtos/id-response.dto';

export class BaseResponse extends IdResponse {
  constructor(entity: BaseEntityProps) {
    super(entity.id.value);
    this.createdAt = entity.createdAt.value.toISOString();
    this.updatedAt = entity.updatedAt.value.toISOString();
  }

  readonly createdAt: string;
  readonly updatedAt: string;
}
