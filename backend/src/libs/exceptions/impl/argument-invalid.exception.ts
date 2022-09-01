import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends BaseException {
  readonly code = ExceptionCodes.ARGUMENT_INVALID;

  constructor(message: string) {
    super(message, 400);
  }
}
