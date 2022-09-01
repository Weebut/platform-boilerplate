import { BaseException } from '@libs/exceptions/base-classes/base-exception';

export class UserAlreadyExistsError extends BaseException {
  public readonly code = 'USER.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super('User already exists', 409, metadata);
  }
}
