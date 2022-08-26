import { UsersRepositoryPort } from '@components/users/database/repositories/users.repository.port';
import { UnitOfWorkProviderName } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { BaseCommandHandler } from '@libs/structure/domain/base-classes/base-command-handler';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler extends BaseCommandHandler<void> {
  constructor(
    @Inject(UnitOfWorkProviderName)
    protected readonly unitOfWork: UnitOfWorkPort,
  ) {
    super(unitOfWork);
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    const usersRepository: UsersRepositoryPort =
      this.unitOfWork.getUsersRepository(command.correlationId);

    const found = await usersRepository.findOneByIdOrThrow(command.userId);
    await usersRepository.delete(found);
  }
}
