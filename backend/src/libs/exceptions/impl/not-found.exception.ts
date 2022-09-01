import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

export class NotFoundException extends BaseException {
  readonly code = ExceptionCodes.NOT_FOUND;

  constructor(message: string) {
    super(message, 404);
  }
}
