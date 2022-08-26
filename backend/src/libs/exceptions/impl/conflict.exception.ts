import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

export class ConflictException extends BaseException {
  readonly code = ExceptionCodes.CONFLICT;

  constructor(message: string) {
    super(message, 409);
  }
}
