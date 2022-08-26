import { UsersRepositoryPort } from '@components/users/database/repositories/users.repository.port';
import { BaseUnitOfWork } from '../base-classes/base-unit-of-work';

export interface UnitOfWorkPort extends BaseUnitOfWork {
  getUsersRepository(correlationId: string): UsersRepositoryPort;
}
