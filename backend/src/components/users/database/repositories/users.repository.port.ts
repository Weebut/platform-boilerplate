import { RepositoryPort } from '@libs/structure/domain/ports/repository.port';
import { User, UserProps } from '../../domain/entities/user.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface UsersRepositoryPort extends RepositoryPort<User, UserProps> {
  findOneByIdOrThrow(id: string): Promise<User>;
  findOneByEmailOrThrow(email: string): Promise<User>;
  exists(email: string): Promise<boolean>;
}
