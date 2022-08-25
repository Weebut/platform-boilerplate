import { BaseCommand } from '@libs/structure/domain/base-classes/base-command';
import { BaseUnitOfWork } from './base-unit-of-work';

export abstract class BaseCommandHandler<ReturnType = never> {
  constructor(protected readonly unitOfWork: BaseUnitOfWork) {}

  abstract handle(command: BaseCommand): Promise<ReturnType>;

  execute(command: BaseCommand): Promise<ReturnType> {
    return this.unitOfWork.execute(command.correlationId, async () =>
      this.handle(command),
    );
  }
}
