import { BaseException } from '../base-classes/base-exception';
import { ExceptionCodes } from '../types/exception.type';

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends BaseException {
  readonly code = ExceptionCodes.ARGUMENT_OUT_OF_RANGE;

  constructor(message: string) {
    super(message, 400);
  }
}
