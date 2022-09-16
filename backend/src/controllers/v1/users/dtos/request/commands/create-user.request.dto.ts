import { UserOrmEntity } from '@components/users/database/orm-entities/user.orm-entity';
import { CreateUser } from '@interface-adapters/interfaces/users/create-user.interface';
import { PickType } from '@nestjs/swagger';

export class CreateUserRequest
  extends PickType(UserOrmEntity, [
    'email',
    'nickname',
    'familyName',
    'givenName',
  ])
  implements CreateUser {}
