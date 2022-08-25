import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

export class NotUpdatedException extends BaseException {
  readonly code = ExceptionCodes.NOT_UPDATED;

  constructor(message: string) {
    super(message, 400);
  }
}
