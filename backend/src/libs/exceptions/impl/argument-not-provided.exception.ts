import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends BaseException {
  readonly code = ExceptionCodes.ARGUMENT_NOT_PROVIDED;

  constructor(message: string) {
    super(message, 400);
  }
}
